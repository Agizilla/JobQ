
import React, { useState } from 'react';

export const PlanDiagram: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number | null>(1);

  const togglePhase = (phase: number) => {
    setActivePhase(activePhase === phase ? null : phase);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto p-8 bg-white">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Master Plan & Architecture</h2>
        <p className="text-gray-600">
          Roadmap for the "Apply Once, Wait for Call" ecosystem.
        </p>
      </div>
      
      <div className="relative max-w-4xl mx-auto w-full">
        {/* Central Spine */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 md:-translate-x-1/2"></div>

        {/* Phase 1 */}
        <div 
          className={`flex flex-col md:flex-row items-start md:items-center mb-12 relative z-10 cursor-pointer group`}
          onClick={() => togglePhase(1)}
        >
          <div className="md:w-1/2 p-4 md:text-right pl-12 md:pl-4">
            <h3 className={`text-xl font-bold transition-colors ${activePhase === 1 ? 'text-jobq-blue' : 'text-gray-500 group-hover:text-jobq-blue'}`}>
                Phase 1: The "Passive" Database
            </h3>
            <div className={`transition-all duration-500 overflow-hidden ${activePhase === 1 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
               <p className="text-gray-600 text-sm">
                   We build a "Queue" system. Users do not search. They sign up and wait. The database is optimized for "Oldest Signup First" sorting within a geolocation radius.
               </p>
            </div>
          </div>
          
          <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-md transition-all duration-300 flex items-center justify-center z-20 ${activePhase === 1 ? 'bg-jobq-blue scale-110' : 'bg-gray-300'}`}>
             <span className="text-white text-xs font-bold">1</span>
          </div>
          
          <div className="md:w-1/2 p-4 pl-12 md:pl-4 w-full">
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activePhase === 1 ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
              <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 text-sm shadow-inner">
                <h4 className="font-bold text-blue-900 mb-2">Core Logic:</h4>
                <ul className="space-y-2 text-blue-800">
                  <li className="flex items-start">
                    <span className="mr-2">🔐</span> 
                    <span><strong>Privacy:</strong> ID Numbers are hashed (SHA-256) before storage.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">⏳</span>
                    <span><strong>Queue Logic:</strong> `signup_timestamp` is the primary sorting key after location.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">📍</span>
                    <span><strong>Fixed Locations:</strong> Direct Employers have hardcoded locations to prevent abuse.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div 
          className={`flex flex-col md:flex-row items-start md:items-center mb-12 relative z-10 cursor-pointer group`}
          onClick={() => togglePhase(2)}
        >
          <div className="md:w-1/2 p-4 md:text-right pl-12 md:pl-4 md:order-1 md:text-left">
            <h3 className={`text-xl font-bold transition-colors ${activePhase === 2 ? 'text-jobq-red' : 'text-gray-500 group-hover:text-jobq-red'}`}>
                Phase 2: Interfaces
            </h3>
             <div className={`transition-all duration-500 overflow-hidden ${activePhase === 2 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 text-sm">
                    USSD for the masses (Multi-language). Web Portal for employers (Wizard style for Store Managers, Filters for Recruiters).
                </p>
             </div>
          </div>
          
          <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-md transition-all duration-300 flex items-center justify-center z-20 md:order-2 ${activePhase === 2 ? 'bg-jobq-red scale-110' : 'bg-gray-300'}`}>
             <span className="text-white text-xs font-bold">2</span>
          </div>

          <div className="md:w-1/2 p-4 pl-12 md:pl-4 w-full md:order-3">
             <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activePhase === 2 ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                <div className="space-y-3">
                    <div className="bg-gray-100 p-3 rounded-lg border-l-4 border-gray-600">
                        <span className="font-bold block text-sm text-gray-800">Seeker Interface</span>
                        <span className="text-xs text-gray-600">Apply Once. No "Search" button. Sit back and wait.</span>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                        <span className="font-bold block text-sm text-purple-800">Employer Wizard</span>
                        <span className="text-xs text-purple-700">"I need a Cashier". System does the rest. No job posting.</span>
                    </div>
                </div>
             </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div 
          className={`flex flex-col md:flex-row items-start md:items-center mb-12 relative z-10 cursor-pointer group`}
          onClick={() => togglePhase(3)}
        >
          <div className="md:w-1/2 p-4 md:text-right pl-12 md:pl-4">
            <h3 className={`text-xl font-bold transition-colors ${activePhase === 3 ? 'text-jobq-green' : 'text-gray-500 group-hover:text-jobq-green'}`}>
                Phase 3: Feedback Loops
            </h3>
            <div className={`transition-all duration-500 overflow-hidden ${activePhase === 3 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-600 text-sm">
                    Managing the "Human Element". Flags for unanswered calls, employment status badges, and criminal record verification.
                </p>
            </div>
          </div>
          
          <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full border-4 border-white shadow-md transition-all duration-300 flex items-center justify-center z-20 ${activePhase === 3 ? 'bg-jobq-green scale-110' : 'bg-gray-300'}`}>
              <span className="text-white text-xs font-bold">3</span>
          </div>

          <div className="md:w-1/2 p-4 pl-12 md:pl-4 w-full">
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activePhase === 3 ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'}`}>
                <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200 shadow-inner">
                    <h4 className="font-bold text-yellow-900 mb-2 text-sm">Logic Rules:</h4>
                    <ul className="space-y-2 text-xs text-yellow-800">
                        <li className="flex items-center">
                            <span className="w-4 h-4 border border-yellow-600 rounded mr-2 flex items-center justify-center">!</span>
                            If Call_Outcome = "No Answer", increment `missed_call_count`.
                        </li>
                        <li className="flex items-center">
                            <span className="w-4 h-4 border border-yellow-600 rounded mr-2 flex items-center justify-center">↓</span>
                            Sort Order: `missed_call_count` ASC, `distance` ASC, `signup_date` ASC.
                        </li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
         <h4 className="font-bold mb-4 text-gray-800 text-lg">✅ Immediate Action Items (Click to expand):</h4>
         <div className="grid gap-3">
             <NextStepItem 
                number={1} 
                title="Approve Database Schema" 
                content={
                  <div className="font-mono text-xs bg-gray-900 text-green-400 p-4 rounded overflow-x-auto">
<pre>{`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Security: Never store plain text IDs
  hashed_id_number TEXT UNIQUE NOT NULL, 
  
  -- Geolocation Point (PostGIS)
  location GEOGRAPHY(POINT) NOT NULL,
  
  -- Preferences
  job_types TEXT[] NOT NULL, -- e.g. ['Cashier', 'Cleaner']
  
  -- The "Queue" Logic
  signup_timestamp TIMESTAMPTZ DEFAULT NOW(),
  
  -- Status Flags
  is_employed BOOLEAN DEFAULT FALSE,
  criminal_record_verified BOOLEAN DEFAULT FALSE,
  
  -- Penalty Logic
  missed_call_count INT DEFAULT 0,
  last_contacted_at TIMESTAMPTZ
);`}</pre>
                  </div>
                }
             />
             <NextStepItem 
                number={2} 
                title="Multi-Language Strategy" 
                content="I have updated the USSD and Web App to include language selection. We will maintain a JSON translation file for: English, isiZulu, isiXhosa, Afrikaans, and Sesotho. The Employer Portal will remain English-only as requested."
             />
         </div>
      </div>
    </div>
  );
};

const NextStepItem = ({number, title, content}: {number: number, title: string, content: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div 
            className={`border rounded-lg transition-all duration-200 overflow-hidden ${isOpen ? 'bg-white border-jobq-blue shadow-md' : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
        >
            <div 
                className="flex items-center p-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold mr-4 transition-colors ${isOpen ? 'bg-jobq-blue text-white' : 'bg-white border text-gray-500'}`}>
                    {number}
                </div>
                <span className={`font-medium flex-1 ${isOpen ? 'text-jobq-blue' : 'text-gray-700'}`}>{title}</span>
                <span className="text-gray-400 text-xs px-2">{isOpen ? 'Hide' : 'Details'}</span>
            </div>
            
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-3 pt-0 pl-14 pr-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 bg-blue-50/30">
                    {content}
                </div>
            </div>
        </div>
    )
}
