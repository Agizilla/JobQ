
import React, { useState, useEffect } from 'react';
import { JobType, JobSeeker, ApplicationStatus } from '../../types';

type EmployerMode = 'DIRECT' | 'RECRUITER';

export const EmployerPortal: React.FC = () => {
  const [mode, setMode] = useState<EmployerMode>('DIRECT');
  const [selectedJobType, setSelectedJobType] = useState<JobType | null>(null);
  
  // Filter State for Recruiter Mode
  const [filterClearRecord, setFilterClearRecord] = useState(false);
  const [filterEmployed, setFilterEmployed] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchRadius, setSearchRadius] = useState(20); // Default 20km
  const [minExperience, setMinExperience] = useState(0); // 0 Years by default
  
  // Modal State
  const [previewCandidate, setPreviewCandidate] = useState<JobSeeker | null>(null);
  
  // Hardcoded "Fixed" Location for Direct Employer (e.g., Spar Manager)
  const FIXED_STORE_LOCATION = "Spar, Jabulani Mall, Soweto";

  // Initial Mock Data
  const [candidates, setCandidates] = useState<JobSeeker[]>([
    { 
      id: '1', 
      name: 'Mr. Thabo Molefe', 
      hashedId: '...', 
      location: 'Jabulani, Soweto', 
      jobType: JobType.CASHIER, 
      experience: '2 Years',
      experienceYears: 2,
      distance: '0.5 km',
      signupDate: new Date('2024-01-15'),
      isEmployed: false,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '072 123 4567',
      contactPreferenceTime: 'Anytime',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg',
      coreSkills: ['Speed Point', 'Cash Balancing', 'Customer Service'],
      lastJobTitle: 'Cashier',
      lastEmployer: 'Shoprite Zola'
    },
    { 
      id: '2', 
      name: 'Mr. Sipho Zulu', 
      hashedId: '...', 
      location: 'Zola, Soweto', 
      jobType: JobType.CASHIER, 
      experience: '6 Months',
      experienceYears: 0.5,
      distance: '1.2 km',
      signupDate: new Date('2024-02-01'),
      isEmployed: true,
      criminalRecordClear: false,
      missedCallCount: 0,
      phoneNumber: '083 555 9876',
      contactPreferenceTime: 'After 17:00',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
      coreSkills: ['Packing', 'Stock Taking'],
      lastJobTitle: 'Shelf Packer',
      lastEmployer: 'Pick n Pay'
    },
    { 
      id: '3', 
      name: 'Mr. Johan van der Merwe', 
      hashedId: '...', 
      location: 'Roodepoort', 
      jobType: JobType.SECURITY, 
      experience: '10 Years',
      experienceYears: 10,
      distance: '1.5 km',
      signupDate: new Date('2023-12-01'),
      isEmployed: true,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '082 111 2222',
      contactPreferenceTime: 'Shift Dependent',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
      coreSkills: ['PSIRA Grade A', 'Armed Response', 'CCTV Monitoring'],
      lastJobTitle: 'Response Office',
      lastEmployer: 'ADT Security'
    },
    { 
      id: '4', 
      name: 'Ms. Nandi Dlamini', 
      hashedId: '...', 
      location: 'Protea Glen', 
      jobType: JobType.PETROL_ATTENDANT, 
      experience: '1 Year',
      experienceYears: 1,
      distance: '5.0 km',
      signupDate: new Date('2024-02-10'),
      isEmployed: false,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '071 222 3333',
      contactPreferenceTime: 'Anytime',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
      coreSkills: ['Oil Checks', 'Tyre Pressure', 'Forecourt Safety'],
      lastJobTitle: 'Attendant',
      lastEmployer: 'Engen Garage'
    },
    { 
      id: '5', 
      name: 'Mr. Pieter Botha', 
      hashedId: '...', 
      location: 'Florida', 
      jobType: JobType.SECURITY, 
      experience: '5 Years',
      experienceYears: 5,
      distance: '8.2 km',
      signupDate: new Date('2024-01-05'),
      isEmployed: true,
      criminalRecordClear: true,
      missedCallCount: 1,
      phoneNumber: '082 444 5555',
      contactPreferenceTime: 'After 18:00',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/men/66.jpg',
      coreSkills: ['Access Control', 'Patrols', 'Dog Handling'],
      lastJobTitle: 'Guard',
      lastEmployer: 'Fidelity'
    },
    { 
      id: '6', 
      name: 'Mrs. Grace Mokoena', 
      hashedId: '...', 
      location: 'Diepkloof', 
      jobType: JobType.CLEANER, 
      experience: 'None',
      experienceYears: 0,
      distance: '12 km',
      signupDate: new Date('2024-02-15'),
      isEmployed: false,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '073 666 7777',
      contactPreferenceTime: 'Anytime',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
      coreSkills: ['Office Cleaning', 'Ironing', 'Chemical Safety'],
      lastJobTitle: 'Domestic Worker',
      lastEmployer: 'Private Household'
    },
    { 
      id: '7', 
      name: 'Mr. Willem Smith', 
      hashedId: '...', 
      location: 'Krugersdorp', 
      jobType: JobType.SECURITY, 
      experience: 'Senior (15 Yrs)',
      experienceYears: 15,
      distance: '14 km',
      signupDate: new Date('2024-02-20'),
      isEmployed: false,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '076 123 1234',
      contactPreferenceTime: 'Anytime',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
      coreSkills: ['Site Management', 'Staff Rostering', 'Risk Assessment'],
      lastJobTitle: 'Site Supervisor',
      lastEmployer: 'Stallion Security'
    },
    { 
      id: '8', 
      name: 'Miss Bianca Nel', 
      hashedId: '...', 
      location: 'Dobsonville', 
      jobType: JobType.WAITER, 
      experience: '3 Years',
      experienceYears: 3,
      distance: '2.5 km',
      signupDate: new Date('2024-02-25'),
      isEmployed: false,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '079 555 4321',
      contactPreferenceTime: 'Anytime',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
      coreSkills: ['Micros POS', 'Silver Service', 'Wine Pairing'],
      lastJobTitle: 'Waitress',
      lastEmployer: 'Spur Steak Ranches'
    },
    { 
      id: '9', 
      name: 'Mr. Kyle Venter', 
      hashedId: '...', 
      location: 'Braamfontein', 
      jobType: JobType.WAITER, 
      experience: 'Student',
      experienceYears: 0,
      distance: '15 km',
      signupDate: new Date('2024-02-26'),
      isEmployed: false,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '084 999 8888',
      contactPreferenceTime: 'Weekends Only',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      coreSkills: ['Cocktail Mixing', 'Tray Service', 'Friendly Attitude'],
      lastJobTitle: 'Barman',
      lastEmployer: 'News Cafe'
    },
    {
      id: '10',
      name: 'Miss Angelique Du Preez',
      hashedId: '...',
      location: 'Sandton',
      jobType: JobType.RECEPTIONIST,
      experience: '4 Years',
      experienceYears: 4,
      distance: '18 km',
      signupDate: new Date('2024-01-10'),
      isEmployed: true,
      criminalRecordClear: true,
      missedCallCount: 0,
      phoneNumber: '082 909 0909',
      contactPreferenceTime: 'After 17:00',
      status: ApplicationStatus.QUEUED,
      avatarUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      coreSkills: ['Switchboard', 'Microsoft Office', 'Diary Management'],
      lastJobTitle: 'Front Desk Admin',
      lastEmployer: 'Dr. Smit & Partners'
    }
  ]);

  // Live Queue Simulation: Add a new candidate every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCandidates(prev => {
        // Cap the list size to prevent it from growing indefinitely
        if (prev.length >= 15) return prev; 
        
        const newCandidate: JobSeeker = generateRandomCandidate();
        return [...prev, newCandidate];
      });
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Helper to update status
  const handleStatusChange = (id: string, newStatus: ApplicationStatus, incrementMissedCalls: boolean = false) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === id) {
        return { 
          ...c, 
          status: newStatus,
          missedCallCount: incrementMissedCalls ? c.missedCallCount + 1 : c.missedCallCount
        };
      }
      return c;
    }));
  };

  // Filter Candidates based on Mode and Inputs
  const filteredCandidates = candidates.filter(c => {
      // Direct Mode: Filter by Selected Job Type
      if (mode === 'DIRECT' && selectedJobType && c.jobType !== selectedJobType) return false;

      if (mode === 'RECRUITER') {
          // Recruiter Filter: Criminal Record
          if (filterClearRecord && !c.criminalRecordClear) return false;
          // Recruiter Filter: Employed
          if (filterEmployed && !c.isEmployed) return false;
          
          // Recruiter Filter: Experience
          if (c.experienceYears < minExperience) return false;

          // Recruiter Filter: Location Search (Case Insensitive Partial Match)
          if (searchLocation && !c.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;

          // Recruiter Filter: Radius (Parsing string "1.5 km" to float)
          const distVal = parseFloat(c.distance);
          if (!isNaN(distVal) && distVal > searchRadius) return false;
      }
      return true;
  });

  // Sorting Logic
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (a.missedCallCount !== b.missedCallCount) return a.missedCallCount - b.missedCallCount;
    const distA = parseFloat(a.distance);
    const distB = parseFloat(b.distance);
    if (distA !== distB) return distA - distB;
    return a.signupDate.getTime() - b.signupDate.getTime();
  });

  return (
    <div className="h-full bg-gray-50 flex flex-col overflow-hidden font-sans relative">
      {/* Modal / Lightbox */}
      {previewCandidate && (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setPreviewCandidate(null)}
        >
            <div 
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={(e) => e.stopPropagation()} // Prevent close on click inside
            >
                <div className="relative h-72 bg-gray-200">
                    <img 
                        src={previewCandidate.avatarUrl?.replace('thumbnail', 'large')} 
                        alt={previewCandidate.name} 
                        className="w-full h-full object-cover"
                    />
                    <button 
                        onClick={() => setPreviewCandidate(null)}
                        className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                    >
                        ✕
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                        <h2 className="text-3xl font-black text-white leading-tight">{previewCandidate.name}</h2>
                        <p className="text-white/80 font-medium">{previewCandidate.jobType}</p>
                    </div>
                </div>
                <div className="p-6 space-y-6">
                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Last Employment</h3>
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-lg">
                                🏢
                            </div>
                            <div>
                                <div className="font-bold text-gray-800">{previewCandidate.lastJobTitle}</div>
                                <div className="text-sm text-gray-500">{previewCandidate.lastEmployer}</div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Core Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {previewCandidate.coreSkills.map((skill, i) => (
                                <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                        <span>📍 {previewCandidate.location}</span>
                        <span>🎓 {previewCandidate.experience} Exp</span>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm z-10">
        <div className="flex items-center space-x-1">
             <span className="text-3xl font-black text-jobq-red">job</span>
             <span className="text-3xl font-black text-jobq-blue">Q</span>
             <div className="ml-4 flex flex-col">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {mode === 'DIRECT' ? 'Store Manager View' : 'Recruiter View'}
                </span>
                {mode === 'DIRECT' && (
                    <span className="text-[10px] text-gray-400">📍 {FIXED_STORE_LOCATION}</span>
                )}
             </div>
        </div>
        <div className="flex items-center space-x-4">
            <button 
                onClick={() => {
                    setMode(mode === 'DIRECT' ? 'RECRUITER' : 'DIRECT');
                    setFilterClearRecord(false); // Reset filter on switch
                    setFilterEmployed(false); // Reset filter on switch
                    setSearchLocation('');
                    setSearchRadius(20);
                    setMinExperience(0);
                }}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded border border-gray-300 transition-colors"
            >
                Switch to {mode === 'DIRECT' ? 'Recruiter' : 'Direct'} Mode
            </button>
            <div className="h-8 w-8 bg-jobq-blue rounded-full text-white flex items-center justify-center font-bold text-xs">
                JM
            </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar / Wizard Controls */}
        <aside className="w-80 bg-white border-r border-gray-200 p-6 flex flex-col overflow-y-auto">
          
          {mode === 'DIRECT' ? (
              // DIRECT MODE: Simple Wizard
              <div className="space-y-8 animate-in fade-in slide-in-from-left duration-300">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h3 className="text-lg font-bold text-blue-900 mb-2">Who do you need today?</h3>
                      <p className="text-xs text-blue-700">
                          We will find verified candidates closest to <strong className="font-semibold">{FIXED_STORE_LOCATION}</strong>.
                      </p>
                  </div>

                  <div className="space-y-3">
                      <label className="text-xs font-bold text-gray-500 uppercase">Select Position</label>
                      {[JobType.CASHIER, JobType.PETROL_ATTENDANT, JobType.CLEANER, JobType.SECURITY, JobType.WAITER, JobType.RECEPTIONIST].map(type => (
                          <button
                            key={type}
                            onClick={() => setSelectedJobType(type)}
                            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                selectedJobType === type 
                                ? 'border-jobq-green bg-green-50 shadow-md' 
                                : 'border-gray-100 hover:border-gray-300 bg-white'
                            }`}
                          >
                             <span className={`block font-bold ${selectedJobType === type ? 'text-green-800' : 'text-gray-700'}`}>{type}</span>
                             {selectedJobType === type && <span className="text-xs text-green-600">Searching Queue...</span>}
                          </button>
                      ))}
                  </div>
              </div>
          ) : (
              // RECRUITER MODE: Filters
              <div className="space-y-6 animate-in fade-in slide-in-from-left duration-300">
                <h3 className="font-bold text-gray-800">Advanced Filters</h3>
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Search Location</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Soweto, Sandton" 
                        className="w-full p-2 border rounded bg-gray-50 text-sm focus:ring-jobq-blue focus:border-jobq-blue"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                    />
                </div>
                
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Radius (Max Distance)</label>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            className="w-full accent-jobq-blue"
                            value={searchRadius}
                            onChange={(e) => setSearchRadius(parseInt(e.target.value))} 
                        />
                        <span className="text-xs font-bold text-gray-600 w-12 text-right">{searchRadius} km</span>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Min Experience</label>
                    <div className="flex items-center space-x-2">
                        <input 
                            type="range" 
                            min="0" 
                            max="10" 
                            className="w-full accent-jobq-blue"
                            value={minExperience}
                            onChange={(e) => setMinExperience(parseInt(e.target.value))} 
                        />
                        <span className="text-xs font-bold text-gray-600 w-16 text-right">
                            {minExperience === 0 ? 'Any' : `${minExperience} Yrs`}
                        </span>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Candidate Flags</label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer mb-3">
                        <input 
                            type="checkbox" 
                            className="text-jobq-blue rounded" 
                            checked={filterClearRecord}
                            onChange={(e) => setFilterClearRecord(e.target.checked)}
                        />
                        <span>Criminal Record Clear Only</span>
                    </label>
                    <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                        <input 
                            type="checkbox" 
                            className="text-jobq-blue rounded" 
                            checked={filterEmployed}
                            onChange={(e) => setFilterEmployed(e.target.checked)}
                        />
                        <span>Employed (Looking closer)</span>
                    </label>
                </div>
              </div>
          )}
        </aside>

        {/* Results Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-gray-50">
           {!selectedJobType && mode === 'DIRECT' ? (
               <div className="h-full flex flex-col items-center justify-center text-gray-400">
                   <span className="text-6xl mb-4">👈</span>
                   <p>Select a job position to see the queue.</p>
               </div>
           ) : (
               <>
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            {mode === 'DIRECT' ? 'Queue Results' : 'Search Results'}
                        </h1>
                        <p className="text-sm text-gray-500">
                            Sorted by: <span className="font-mono bg-gray-200 px-1 rounded">Proximity + Queue Time</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-400 animate-pulse">● Live Queue Updates</span>
                        <span className="text-sm font-bold text-jobq-blue bg-blue-100 px-3 py-1 rounded-full">
                            {sortedCandidates.length} Candidates Found
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 pb-20">
                    {sortedCandidates.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">
                            <span className="text-2xl block mb-2">🔍</span>
                            No candidates match your filters.
                        </div>
                    ) : (
                        sortedCandidates.map((c, index) => (
                            <CandidateCard 
                                key={c.id} 
                                candidate={c} 
                                rank={index + 1} 
                                onStatusChange={handleStatusChange}
                                onPreview={() => setPreviewCandidate(c)}
                            />
                        ))
                    )}
                </div>
               </>
           )}
        </main>
      </div>
    </div>
  );
};

const CandidateCard: React.FC<{
    candidate: JobSeeker, 
    rank: number, 
    onStatusChange: (id: string, status: ApplicationStatus, incrementMissedCalls?: boolean) => void,
    onPreview: () => void
}> = ({ candidate, rank, onStatusChange, onPreview }) => {
    
    // Check status for framing
    const isInterviewScheduled = candidate.status === ApplicationStatus.INTERVIEW_SCHEDULED;
    const isRevealed = candidate.status !== ApplicationStatus.QUEUED;

    return (
        <div className={`
            bg-white rounded-xl p-4 border-2 transition-all flex items-center justify-between group relative overflow-hidden
            ${isInterviewScheduled ? 'border-green-500 shadow-lg bg-green-50/20' : ''}
            ${!isInterviewScheduled && candidate.missedCallCount > 0 ? 'border-red-100 bg-red-50/30' : ''}
            ${!isInterviewScheduled && candidate.missedCallCount === 0 ? 'border-gray-200 hover:border-jobq-blue hover:shadow-md' : ''}
        `}>
            {/* Scheduled Badge */}
            {isInterviewScheduled && (
                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10 shadow-sm">
                    INTERVIEW SCHEDULED
                </div>
            )}

            {/* Left: Info */}
            <div className="flex items-center space-x-4">
                {/* Avatar */}
                <div 
                    className="h-16 w-16 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-50 flex-shrink-0 shadow-sm cursor-pointer hover:border-jobq-blue hover:scale-105 transition-all"
                    onClick={onPreview}
                    title="Click to view full profile"
                >
                    {candidate.avatarUrl ? (
                        <img src={candidate.avatarUrl} alt={candidate.name} className="h-full w-full object-cover" />
                    ) : (
                        <div className="h-full w-full flex items-center justify-center text-2xl text-gray-300">?</div>
                    )}
                </div>

                <div>
                    <h3 className="font-bold text-gray-900 text-lg flex items-center">
                        {candidate.name}
                        {candidate.criminalRecordClear ? (
                            <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-1 rounded border border-green-200" title="Verified Clear Record">🛡️ CLEAR</span>
                        ) : (
                            <span className="ml-2 text-[10px] bg-gray-100 text-gray-500 px-1 rounded border border-gray-200" title="Record Not Verified">⚠️ UNVERIFIED</span>
                        )}
                        {candidate.isEmployed && (
                            <span className="ml-2 text-[10px] bg-yellow-100 text-yellow-800 px-1 rounded border border-yellow-200">EMPLOYED</span>
                        )}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center"><span className="mr-1">📍</span> {candidate.distance} away</span>
                        <span className="flex items-center"><span className="mr-1">💼</span> {candidate.experience}</span>
                        <span className="flex items-center text-gray-400 text-xs">Joined: {candidate.signupDate.toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center space-x-4">
                {candidate.missedCallCount > 0 && !isInterviewScheduled && (
                    <div className="text-right">
                         <span className="block text-xs font-bold text-red-600 uppercase">Not Answering</span>
                         <span className="text-[10px] text-red-400">{candidate.missedCallCount} attempts failed</span>
                    </div>
                )}
                
                {isRevealed ? (
                    <div className="flex items-center space-x-3 animate-in fade-in slide-in-from-right duration-300">
                         <div className="text-right mr-2">
                            <div className="text-lg font-mono font-bold tracking-wider text-gray-800">
                                {candidate.phoneNumber || "No Number"}
                            </div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-wide">
                                Prefers: {candidate.contactPreferenceTime || "Anytime"}
                            </div>
                        </div>

                        {!isInterviewScheduled ? (
                            <div className="flex flex-col space-y-1">
                                <button 
                                    onClick={() => onStatusChange(candidate.id, ApplicationStatus.INTERVIEW_SCHEDULED)}
                                    className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition-colors shadow-sm"
                                >
                                    Schedule Interview
                                </button>
                                <button 
                                    onClick={() => onStatusChange(candidate.id, ApplicationStatus.QUEUED, true)} // Reset/Reject logic with PENALTY
                                    className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded hover:bg-gray-300 transition-colors"
                                >
                                    Call Failed / Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded border border-green-200 font-bold">
                                ✓ Scheduled
                            </div>
                        )}
                    </div>
                ) : (
                    <button 
                        onClick={() => onStatusChange(candidate.id, ApplicationStatus.CONTACT_REVEALED)}
                        className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-jobq-blue hover:text-white hover:border-jobq-blue transition-all shadow-sm"
                    >
                        Reveal Contact
                    </button>
                )}
            </div>
        </div>
    );
}

// --- Random Generator Helpers ---
function generateRandomCandidate(): JobSeeker {
    const jobType = [JobType.CASHIER, JobType.PETROL_ATTENDANT, JobType.CLEANER, JobType.SECURITY, JobType.WAITER, JobType.RECEPTIONIST][Math.floor(Math.random() * 6)];
    
    let name = "";
    let gender = "M"; 
    let skills: string[] = [];
    let lastJob = "";
    let lastEmp = "";
    
    // Logic for determining Gender/Name/Skills pool based on job type
    if (jobType === JobType.SECURITY) {
        gender = Math.random() > 0.1 ? "M" : "F"; 
        skills = ["PSIRA Grade C", "Access Control", "Patrol", "CCTV", "Firearm Competency"];
        lastJob = "Security Guard";
        lastEmp = ["ADT", "Fidelity", "Stallion", "Chubb", "Mamba Security"][Math.floor(Math.random() * 5)];
    } else if (jobType === JobType.CLEANER) {
        gender = Math.random() > 0.2 ? "F" : "M";
        skills = ["Deep Cleaning", "Ironing", "Window Cleaning", "Chemical Safety"];
        lastJob = "Cleaner";
        lastEmp = ["Private Household", "Bidvest Cleaning", "Prestige Cleaning"][Math.floor(Math.random() * 3)];
    } else if (jobType === JobType.WAITER) {
        gender = Math.random() > 0.5 ? "M" : "F";
        skills = ["Tray Service", "Upselling", "POS System", "Menu Knowledge"];
        lastJob = ["Waiter", "Waitress", "Runner"][Math.floor(Math.random() * 3)];
        lastEmp = ["Spur", "Ocean Basket", "Mugg & Bean", "Wimpy", "RocoMamas"][Math.floor(Math.random() * 5)];
    } else if (jobType === JobType.RECEPTIONIST) {
        gender = "F";
        skills = ["Switchboard", "Admin", "Filing", "MS Office", "Scheduling"];
        lastJob = "Receptionist";
        lastEmp = ["Dr. Office", "Law Firm", "Avis", "Hotel Desk"][Math.floor(Math.random() * 4)];
    } else if (jobType === JobType.CASHIER) {
        gender = Math.random() > 0.4 ? "F" : "M";
        skills = ["Cash Handling", "Till Operation", "Customer Service", "Packing"];
        lastJob = "Cashier";
        lastEmp = ["Shoprite", "Pick n Pay", "Spar", "Woolworths", "Boxer"][Math.floor(Math.random() * 5)];
    } else if (jobType === JobType.PETROL_ATTENDANT) {
        gender = "M";
        skills = ["Oil Check", "Tyre Pressure", "Car Wash", "Customer Service"];
        lastJob = "Attendant";
        lastEmp = ["Engen", "Shell", "BP", "Caltex", "Total"][Math.floor(Math.random() * 5)];
    }

    // Pick 3 random skills
    const selectedSkills = skills.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Name Pools (Existing logic maintained)
    const malesWhite = ["Johan", "Pieter", "Willem", "Gert", "Francois", "Marius", "Chris", "Andre", "Stephan", "Hendrik", "Jaco"];
    const femalesWhite = ["Bianca", "Susan", "Annelie", "Chantelle", "Monique", "Liezel"];
    const surnamesWhite = ["Van Der Merwe", "Botha", "Smith", "Venter", "Coetzee", "Nel", "Du Preez", "Fourie", "Kruger", "Van Wyk", "Swanepoel"];

    const malesBlack = ["Bongani", "Kagiso", "Mpho", "Thandi", "Sibusiso", "Lucky", "Innocent", "Sipho", "Thabo", "Vusi"];
    const femalesBlack = ["Precious", "Gugulethu", "Lerato", "Nomsa", "Grace", "Maria", "Lindiwe", "Zanele", "Faith"];
    const surnamesBlack = ["Nkosi", "Molefe", "Zulu", "Khumalo", "Dlamini", "Mokoena", "Ngcobo", "Mazibuko", "Sithole", "Twala"];

    const malesEnglish = ["Jason", "Kyle", "Chad", "Brandon", "Liam", "Ethan"];
    const femalesEnglish = ["Jessica", "Tiffany", "Ashley", "Megan", "Chloe"];
    const surnamesEnglish = ["Jones", "Williams", "Taylor", "Brown", "Davies"];

    const femalesElegant = ["Angelique", "Dominique", "Genevieve", "Chantal", "Natasha", "Tatiana", "Victoria", "Savannah", "Charmaine", "Desiree"];

    if (jobType === JobType.SECURITY && Math.random() > 0.4) {
        const fname = gender === "M" ? malesWhite[Math.floor(Math.random() * malesWhite.length)] : femalesWhite[Math.floor(Math.random() * femalesWhite.length)];
        const sname = surnamesWhite[Math.floor(Math.random() * surnamesWhite.length)];
        const title = gender === "M" ? "Mr." : (Math.random() > 0.5 ? "Mrs." : "Ms.");
        name = `${title} ${fname} ${sname}`;
    } else if (jobType === JobType.WAITER && Math.random() > 0.3) {
        const useWhite = Math.random() > 0.5;
        const fname = gender === "M" 
            ? (useWhite ? malesEnglish[Math.floor(Math.random() * malesEnglish.length)] : malesBlack[Math.floor(Math.random() * malesBlack.length)])
            : (useWhite ? femalesEnglish[Math.floor(Math.random() * femalesEnglish.length)] : femalesBlack[Math.floor(Math.random() * femalesBlack.length)]);
        const sname = useWhite ? surnamesEnglish[Math.floor(Math.random() * surnamesEnglish.length)] : surnamesBlack[Math.floor(Math.random() * surnamesBlack.length)];
        const title = gender === "M" ? "Mr." : "Miss"; 
        name = `${title} ${fname} ${sname}`;
    } else if (jobType === JobType.RECEPTIONIST) {
        const fname = femalesElegant[Math.floor(Math.random() * femalesElegant.length)];
        const sname = Math.random() > 0.5 ? surnamesWhite[Math.floor(Math.random() * surnamesWhite.length)] : surnamesEnglish[Math.floor(Math.random() * surnamesEnglish.length)];
        name = `Miss ${fname} ${sname}`;
    } else {
        const fname = gender === "M" ? malesBlack[Math.floor(Math.random() * malesBlack.length)] : femalesBlack[Math.floor(Math.random() * femalesBlack.length)];
        const sname = surnamesBlack[Math.floor(Math.random() * surnamesBlack.length)];
        const title = gender === "M" ? "Mr." : (Math.random() > 0.6 ? "Mrs." : "Ms.");
        name = `${title} ${fname} ${sname}`;
    }

    const locs = ["Soweto", "Tembisa", "Diepsloot", "Alex", "Orange Farm", "Cosmo City"];
    const isEmployed = Math.random() > 0.7;
    const dist = (Math.random() * 10).toFixed(1);
    
    const avatarId = Math.floor(Math.random() * 99);
    const avatarUrl = `https://randomuser.me/api/portraits/${gender === 'M' ? 'men' : 'women'}/${avatarId}.jpg`;

    const expYears = jobType === JobType.WAITER || jobType === JobType.RECEPTIONIST ? Math.floor(Math.random() * 4) + 1 : Math.floor(Math.random() * 10);

    return {
        id: Math.random().toString(36).substr(2, 9),
        name: name,
        hashedId: "hash_" + Math.random(),
        location: locs[Math.floor(Math.random() * locs.length)],
        jobType: jobType,
        experience: `${expYears} Years`,
        experienceYears: expYears,
        distance: dist + " km",
        signupDate: new Date(),
        isEmployed: isEmployed,
        criminalRecordClear: Math.random() > 0.2,
        missedCallCount: 0,
        phoneNumber: "0" + Math.floor(600000000 + Math.random() * 300000000),
        contactPreferenceTime: isEmployed ? "After 17:00" : "Anytime",
        status: ApplicationStatus.QUEUED,
        avatarUrl: avatarUrl,
        coreSkills: selectedSkills,
        lastJobTitle: lastJob,
        lastEmployer: lastEmp
    };
}
