
import React, { useState } from 'react';

export const TechDocs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'DB' | 'FLOW' | 'USECASE' | 'EDGE'>('DB');

  return (
    <div className="h-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Tech Header */}
      <div className="bg-gray-900 text-white p-6 border-b border-gray-800 shadow-md">
        <h1 className="text-2xl font-mono font-bold text-blue-400">System Architecture & Documentation</h1>
        <p className="text-gray-400 text-sm font-mono mt-1">JobQ Version 2.4.1 // Technical Specification</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white px-6">
        <TechTab label="Database Schema" active={activeTab === 'DB'} onClick={() => setActiveTab('DB')} icon="🗄️" />
        <TechTab label="Data Flows" active={activeTab === 'FLOW'} onClick={() => setActiveTab('FLOW')} icon="🔄" />
        <TechTab label="Edge Functions" active={activeTab === 'EDGE'} onClick={() => setActiveTab('EDGE')} icon="⚡" />
        <TechTab label="Use Cases" active={activeTab === 'USECASE'} onClick={() => setActiveTab('USECASE')} icon="👥" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'DB' && <DatabaseSchemaView />}
        {activeTab === 'FLOW' && <DataFlowView />}
        {activeTab === 'EDGE' && <EdgeFunctionsView />}
        {activeTab === 'USECASE' && <UseCasesView />}
      </div>
    </div>
  );
};

const TechTab = ({ label, active, onClick, icon }: any) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-4 text-sm font-bold border-b-2 transition-colors ${
      active ? 'border-blue-500 text-blue-600 bg-blue-50' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    }`}
  >
    <span>{icon}</span>
    <span>{label}</span>
  </button>
);

// --- Views ---

const DatabaseSchemaView = () => (
  <div className="max-w-4xl mx-auto space-y-8">
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mr-2">POSTGRESQL</span>
        Core Tables
      </h3>
      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm font-mono text-green-400">
          <pre>{`-- 1. Users (Job Seekers)
CREATE TABLE public.job_seekers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Security: Hashed to protect privacy until hired
    hashed_id_number TEXT UNIQUE NOT NULL, 
    first_name TEXT,
    surname TEXT,
    
    -- Profile
    job_types TEXT[] NOT NULL, -- e.g. ['CASHIER', 'CLEANER']
    experience_years INT DEFAULT 0, -- Added for filtering
    is_employed BOOLEAN DEFAULT FALSE,
    looking_closer BOOLEAN DEFAULT FALSE,
    criminal_record_clear BOOLEAN DEFAULT NULL, -- NULL = Unverified
    
    -- Contact Info (Encrypted at rest preferably)
    phone_number TEXT NOT NULL,
    contact_preference_time TEXT DEFAULT 'Anytime',
    
    -- Location (PostGIS for Radius Search)
    location_name TEXT,
    location_coords GEOGRAPHY(POINT) NOT NULL,
    
    -- Queue Logic Priority Fields
    missed_call_count INT DEFAULT 0,
    last_contacted_at TIMESTAMPTZ
);

-- 2. Employers
CREATE TABLE public.employers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL, -- 'RETAIL', 'SECURITY', etc.
    is_recruiter BOOLEAN DEFAULT FALSE, -- True = Filter Mode, False = Wizard Mode
    fixed_location_coords GEOGRAPHY(POINT) -- For Store Managers (Spar, etc)
);

-- 3. Interactions (Audit Trail)
CREATE TABLE public.interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employer_id UUID REFERENCES public.employers(id),
    job_seeker_id UUID REFERENCES public.job_seekers(id),
    interaction_type TEXT NOT NULL, -- 'REVEAL', 'CALL_FAIL', 'INTERVIEW'
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES for Speed
CREATE INDEX idx_seeker_location ON public.job_seekers USING GIST (location_coords);
CREATE INDEX idx_seeker_exp ON public.job_seekers (experience_years);
CREATE INDEX idx_seeker_signup ON public.job_seekers (created_at);`}</pre>
        </code>
      </div>
    </div>
    
    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
      <h4 className="font-bold text-yellow-800 mb-2">Queue Sorting Logic (SQL View)</h4>
      <p className="text-sm text-yellow-900 font-mono">
        ORDER BY <br/>
        &nbsp;&nbsp;missed_call_count ASC, <span className="text-gray-500">-- Reliable people first</span><br/>
        &nbsp;&nbsp;ST_Distance(location_coords, $employer_loc) ASC, <span className="text-gray-500">-- Closest first</span><br/>
        &nbsp;&nbsp;created_at ASC <span className="text-gray-500">-- Longest waiter first</span>
      </p>
    </div>
  </div>
);

const EdgeFunctionsView = () => (
  <div className="max-w-4xl mx-auto space-y-6">
    <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
        <h3 className="font-bold text-purple-900">Why Edge Functions?</h3>
        <p className="text-sm text-purple-800">
            USSD sessions are stateless and time-sensitive (timeouts occur in ~120s). 
            Edge functions (Serverless) spin up instantly to handle the HTTP callbacks from the USSD Gateway (Grapevine),
            perform the DB lookup, and return the text menu string in milliseconds.
        </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FunctionCard 
            name="ussd-handler" 
            trigger="HTTP POST (Webhook)"
            desc="Main entry point. Parses the USSD string (*120*...), retrieves session state from Redis/DB, and routes to specific logic steps."
        />
        <FunctionCard 
            name="geo-matcher" 
            trigger="Internal Call"
            desc="Takes user input (e.g., 'Soweto'), resolves to Lat/Long via Google Maps API (cached), and updates user profile."
        />
        <FunctionCard 
            name="invite-validator" 
            trigger="DB Trigger"
            desc="Runs when a code is entered. Checks validity. If valid, links the new user to the referrer for 'Viral Growth' tracking."
        />
         <FunctionCard 
            name="queue-algorithm" 
            trigger="Scheduled Cron"
            desc="Runs nightly. recalculates 'Queue Rank' for dashboard display so users can see their progress."
        />
    </div>
  </div>
);

const FunctionCard = ({name, trigger, desc}: any) => (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-2">
            <span className="font-mono font-bold text-blue-600 text-sm">{name}</span>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase">{trigger}</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
    </div>
)

const DataFlowView = () => (
  <div className="max-w-5xl mx-auto">
    <h3 className="font-bold text-gray-800 mb-6 text-xl">1. End-to-End Flow: From Sign Up to Interview</h3>
    
    <div className="relative flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-4">
        {/* Step 1 */}
        <FlowStep 
            step="1" 
            title="Registration" 
            actor="Job Seeker" 
            details="Dials USSD. System captures ID, Experience & Location. Record created in DB."
            color="bg-blue-100 border-blue-300"
        />
        
        <Arrow />

        {/* Step 2 */}
        <FlowStep 
            step="2" 
            title="Wait Pool" 
            actor="System" 
            details="User is passive. System calculates distance to all fixed employer points. Rank is established."
            color="bg-gray-100 border-gray-300"
        />

        <Arrow />

        {/* Step 3 */}
        <FlowStep 
            step="3" 
            title="Discovery" 
            actor="Employer" 
            details="Logs into Web Portal. Selects Job Type. Query executes: Find nearest + oldest signup + min experience."
            color="bg-purple-100 border-purple-300"
        />

        <Arrow />

        {/* Step 4 */}
        <FlowStep 
            step="4" 
            title="Reveal & Contact" 
            actor="Employer" 
            details="Clicks 'Reveal Contact'. Phone # decrypted. Employer calls seeker. Outcome recorded."
            color="bg-green-100 border-green-300"
        />

         <Arrow />

        {/* Step 5 */}
        <FlowStep 
            step="5" 
            title="Interview" 
            actor="System" 
            details="Employer clicks 'Schedule Interview'. SMS sent to Seeker. Status updates to 'INTERVIEWING'."
            color="bg-yellow-100 border-yellow-300"
        />
    </div>

    <div className="mt-16">
        <h3 className="font-bold text-gray-800 mb-6 text-xl">2. USSD Menu Flow</h3>
        <div className="bg-gray-900 p-8 rounded-xl overflow-x-auto">
            <div className="font-mono text-sm text-white whitespace-pre leading-relaxed">
{`START (*120*5627#)
  │
  ├── Language Selection
  │
  └── Welcome Screen
       │
       ├── 1. Register
       │    │
       │    ├── Enter Invite Code
       │    │
       │    ├── Enter ID Number
       │    │
       │    ├── Enter Years Experience (0-20)
       │    │
       │    └── Select Location
       │
       └── 2. Check Status`}
            </div>
        </div>
    </div>
  </div>
);

const FlowStep = ({step, title, actor, details, color}: any) => (
    <div className={`w-full md:w-48 p-4 rounded-xl border-2 ${color} shadow-sm relative`}>
        <div className="absolute -top-3 -left-3 w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-white">
            {step}
        </div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">{actor}</div>
        <h4 className="font-bold text-gray-800 mb-2">{title}</h4>
        <p className="text-xs text-gray-600 leading-snug">{details}</p>
    </div>
);

const Arrow = () => (
    <div className="hidden md:flex items-center justify-center h-32 w-12">
        <span className="text-gray-300 text-4xl">➔</span>
    </div>
)

const UseCasesView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <UseCaseColumn 
            actor="Job Seeker" 
            icon="👷"
            goals={[
                "Register without data (USSD)",
                "Input Experience Years",
                "Check queue position",
                "Update contact preference"
            ]}
        />
        <UseCaseColumn 
            actor="Store Manager" 
            icon="🏪"
            goals={[
                "Find staff immediately",
                "View candidates near store",
                "Log call outcomes"
            ]}
        />
        <UseCaseColumn 
            actor="Recruiter" 
            icon="🕵️‍♀️"
            goals={[
                "Search multiple areas",
                "Filter by Experience Level",
                "Filter by Criminal Record",
                "Bulk Interview Scheduling"
            ]}
        />
    </div>
);

const UseCaseColumn = ({actor, icon, goals}: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex items-center space-x-3">
            <span className="text-2xl">{icon}</span>
            <h3 className="font-bold text-gray-800">{actor}</h3>
        </div>
        <div className="p-6">
            <ul className="space-y-3">
                {goals.map((g: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                        <span className="mr-2 text-green-500">✓</span>
                        {g}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
