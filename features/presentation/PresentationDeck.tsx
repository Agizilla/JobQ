
import React, { useState, useEffect } from 'react';

export const PresentationDeck: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
  };

  useEffect(() => {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slides = [
      { title: "Cover", component: <CoverSlide /> },
      { title: "Vision", component: <VisionSlide /> },
      { title: "The Problem", component: <ProblemSlide /> },
      { title: "Current Inefficiency", component: <InefficiencySlide /> },
      { title: "The Solution", component: <SolutionSlide /> },
      { title: "How It Works (Seeker)", component: <SeekerJourneySlide /> },
      { title: "How It Works (Employer)", component: <EmployerJourneySlide /> },
      { title: "Product: USSD", component: <ProductUSSDSlide /> },
      { title: "Product: Web", component: <ProductWebSlide /> },
      { title: "Target Market", component: <MarketSlide /> },
      { title: "Business Model", component: <BusinessModelSlide /> },
      { title: "Strategic Disruption", component: <DisruptionSlide /> },
      { title: "Marketing Strategy", component: <MarketingSlide /> },
      { title: "Competitive Edge", component: <CompetitiveEdgeSlide /> },
      { title: "SWOT Analysis", component: <SWOTSlide /> },
      { title: "Future Tech: The Swap", component: <SwapSlide /> },
      { title: "The Team", component: <TeamSlide /> },
      { title: "Financial Projections", component: <FinancialsSlide /> },
      { title: "Roadmap", component: <RoadmapSlide /> },
      { title: "The Investment", component: <AskSlide /> },
  ];

  const next = () => setCurrentSlide(c => Math.min(c + 1, slides.length - 1));
  const prev = () => setCurrentSlide(c => Math.max(c - 1, 0));

  return (
    <div className="h-full flex flex-col bg-gray-100 overflow-hidden relative font-sans text-gray-800">
       {/* Toolbar */}
       <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-20 print:hidden">
          <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-4 font-bold text-gray-500 text-sm uppercase tracking-wider">JobQ Investor Deck</span>
          </div>
          <div className="flex items-center space-x-6">
             <span className="text-xs font-mono text-gray-400">SLIDE {currentSlide + 1} OF {slides.length}</span>
             <div className="space-x-2">
                <button onClick={prev} disabled={currentSlide === 0} className="px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-30 text-sm">Prev</button>
                <button onClick={next} disabled={currentSlide === slides.length - 1} className="px-3 py-1 bg-gray-900 text-white rounded hover:bg-black disabled:opacity-30 text-sm">Next</button>
             </div>
             <button onClick={() => window.print()} className="ml-4 text-blue-600 font-bold text-sm hover:underline">Print PDF</button>
          </div>
       </div>
       
       {/* Slide Stage */}
       <div className="flex-1 overflow-hidden flex items-center justify-center p-8 bg-gray-200 print:p-0 print:block print:bg-white print:overflow-visible">
          <div className="aspect-video w-full max-w-6xl bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col relative print:shadow-none print:w-full print:max-w-none print:h-screen print:rounded-none print:break-after-page">
              {slides[currentSlide].component}
          </div>
          
          {/* Hidden Container for Print All Slides */}
          <div className="hidden print:block">
             {slides.map((s, i) => (
                 <div key={i} className="print-page h-screen w-screen overflow-hidden relative page-break-after-always">
                     {s.component}
                 </div>
             ))}
          </div>
       </div>
    </div>
  );
};

// --- SLIDE 1 ---
const CoverSlide = () => (
    <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="z-10 text-center">
            <div className="flex items-center justify-center mb-6">
                <span className="text-7xl font-black text-red-500 tracking-tighter" style={{textShadow: '4px 4px 0 #000'}}>job</span>
                <span className="text-7xl font-black text-blue-500 -ml-2" style={{textShadow: '4px 4px 0 #000'}}>Q</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">The "Apply Once" Ecosystem</h1>
            <p className="text-xl text-blue-200 font-light">Bridging the gap between township labor and local employment.</p>
            <div className="mt-12 flex space-x-4 justify-center text-sm text-gray-400">
                <span>CONFIDENTIAL</span>
                <span>•</span>
                <span>SERIES A PITCH</span>
                <span>•</span>
                <span>2025</span>
            </div>
        </div>
    </div>
);

// --- SLIDE 2 ---
const VisionSlide = () => (
    <div className="h-full flex p-12 bg-white relative overflow-hidden">
        <div className="w-1/2 pr-12 flex flex-col justify-center z-10">
            <div className="text-jobq-blue font-bold tracking-widest uppercase mb-4">Our Vision</div>
            <h2 className="text-5xl font-black mb-8 text-gray-900 leading-tight">Alleviating poverty through <span className="text-jobq-red">efficiency.</span></h2>
            <p className="text-xl text-gray-600 leading-relaxed">
                "To get a small amount of money, on a monthly basis, from a massive user base, for solving a huge problem they face daily."
            </p>
        </div>
        <div className="w-1/2 bg-gray-50 rounded-2xl p-8 flex flex-col justify-center relative">
            <div className="absolute top-4 right-4 text-6xl opacity-10">🇿🇦</div>
            <h3 className="font-bold text-gray-800 mb-6 border-b pb-2">The Context (StatsSA Census 2011-2022)</h3>
            <div className="space-y-6">
                 <div className="flex items-center">
                     <div className="text-4xl font-black text-gray-800 w-24">29%</div>
                     <div className="text-sm text-gray-500 ml-4">Official Unemployment Rate (higher in townships)</div>
                 </div>
                 <div className="flex items-center">
                     <div className="text-4xl font-black text-red-600 w-24">40%</div>
                     <div className="text-sm text-gray-500 ml-4">Of income spent on transport by low-income earners</div>
                 </div>
            </div>
        </div>
    </div>
);

// --- SLIDE 3 ---
const ProblemSlide = () => (
    <div className="h-full flex p-12 bg-white">
        <div className="w-1/2 pr-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">The Burden of Seeking Work</h2>
            <div className="space-y-8">
                <div className="flex items-start group">
                    <span className="text-4xl mr-6 group-hover:scale-110 transition-transform">💸</span>
                    <div>
                        <h3 className="font-bold text-xl text-gray-800">The Digital Barrier</h3>
                        <p className="text-gray-600">Data is expensive. Loading a modern job portal costs R10-R20 in airtime. Most seekers simply cannot afford to browse.</p>
                    </div>
                </div>
                <div className="flex items-start group">
                    <span className="text-4xl mr-6 group-hover:scale-110 transition-transform">🚌</span>
                    <div>
                        <h3 className="font-bold text-xl text-gray-800">Transport Poverty</h3>
                        <p className="text-gray-600">Seekers spend ~R800/month on taxis just to drop CVs at malls, often to be ignored.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
             <div className="bg-gray-100 rounded-full w-96 h-96 flex items-center justify-center relative">
                 <div className="text-8xl">🌧️</div>
                 <div className="absolute bottom-20 text-sm font-bold text-gray-500 bg-white px-4 py-1 rounded-full shadow">Waiting in the rain</div>
             </div>
        </div>
    </div>
);

// --- SLIDE 4 ---
const InefficiencySlide = () => (
    <div className="h-full flex flex-col p-12 bg-white items-center justify-center">
        <h2 className="text-3xl font-bold mb-12 text-center">The "CV Black Hole"</h2>
        <div className="flex items-center space-x-4 w-full max-w-5xl">
            <div className="flex-1 bg-red-50 p-6 rounded-xl border border-red-100 text-center h-64 flex flex-col justify-center">
                <div className="text-5xl mb-4">📄</div>
                <h3 className="font-bold text-red-900">The Paper CV</h3>
                <p className="text-xs text-red-700 mt-2">Printed at internet cafes (Cost: R5/page). Hand-delivered. Often thrown in the bin.</p>
            </div>
            <div className="text-2xl text-gray-400">➡️</div>
            <div className="flex-1 bg-red-50 p-6 rounded-xl border border-red-100 text-center h-64 flex flex-col justify-center">
                <div className="text-5xl mb-4">📞</div>
                <h3 className="font-bold text-red-900">The Chaos</h3>
                <p className="text-xs text-red-700 mt-2">Employer posts ad. 500 people call. Phone rings non-stop. Employer gets overwhelmed.</p>
            </div>
            <div className="text-2xl text-gray-400">➡️</div>
            <div className="flex-1 bg-gray-900 p-6 rounded-xl border border-gray-800 text-center h-64 flex flex-col justify-center">
                <div className="text-5xl mb-4">👻</div>
                <h3 className="font-bold text-white">Ghosting</h3>
                <p className="text-xs text-gray-400 mt-2">No feedback. No interviews. Just silence and lost money.</p>
            </div>
        </div>
    </div>
);

// --- SLIDE 5 ---
const SolutionSlide = () => (
    <div className="h-full flex flex-col p-12 bg-white">
        <div className="flex justify-between items-end mb-12 border-b pb-4">
            <div>
                <h2 className="text-4xl font-bold text-gray-900">The JobQ Solution</h2>
                <p className="text-xl text-blue-600 mt-2">Don't search. Wait.</p>
            </div>
            <div className="text-5xl">💡</div>
        </div>

        <div className="grid grid-cols-3 gap-8 h-full">
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4">#</div>
                <h3 className="font-bold text-lg mb-2">USSD First</h3>
                <p className="text-gray-600 text-sm">Works on any phone (Nokia 3310 to iPhone). No data required. *120*JOBQ# allows instant registration.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center text-2xl mb-4">📍</div>
                <h3 className="font-bold text-lg mb-2">Hyper-Local</h3>
                <p className="text-gray-600 text-sm">We match seekers to jobs within walking distance (5km). Eliminating transport costs increases retention.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center text-2xl mb-4">🛡️</div>
                <h3 className="font-bold text-lg mb-2">Verified Pool</h3>
                <p className="text-gray-600 text-sm">We pre-vet criminal records and verify IDs. Employers get a "Safe" list of candidates instantly.</p>
            </div>
        </div>
    </div>
);

// --- SLIDE 6 ---
const SeekerJourneySlide = () => (
    <div className="h-full flex p-12 bg-white items-center">
        <div className="w-1/3">
             <h2 className="text-3xl font-bold mb-4 text-jobq-blue">The Seeker Journey</h2>
             <p className="text-gray-600">From "Active Begging" to "Passive Discovery".</p>
        </div>
        <div className="w-2/3 grid grid-cols-3 gap-4">
            <div className="text-center">
                <div className="bg-gray-800 text-white rounded-lg p-4 mb-4 text-4xl font-mono">*120#</div>
                <p className="font-bold text-sm">1. Dial & Register</p>
                <p className="text-xs text-gray-500">Takes 60 seconds. Enter ID + Location.</p>
            </div>
            <div className="text-center opacity-50">
                <div className="text-4xl mb-6">😴</div>
                <p className="font-bold text-sm">2. Do Nothing</p>
                <p className="text-xs text-gray-500">Go about life. No checking ads. No printing CVs.</p>
            </div>
            <div className="text-center">
                <div className="bg-green-500 text-white rounded-lg p-4 mb-4 text-4xl">💬</div>
                <p className="font-bold text-sm">3. Get SMS</p>
                <p className="text-xs text-gray-500">"Spar Zola wants to interview you. Reply YES."</p>
            </div>
        </div>
    </div>
);

// --- SLIDE 7 ---
const EmployerJourneySlide = () => (
    <div className="h-full flex p-12 bg-white items-center">
        <div className="w-1/3">
             <h2 className="text-3xl font-bold mb-4 text-jobq-red">The Employer Journey</h2>
             <p className="text-gray-600">No posting ads. No sifting through CVs.</p>
        </div>
        <div className="w-2/3 flex space-x-4">
             <div className="flex-1 bg-white border border-gray-200 shadow-lg p-6 rounded-xl">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-2">Step 1</div>
                 <h3 className="font-bold text-lg">Log In</h3>
                 <p className="text-sm text-gray-500 mt-2">Store location is pre-set.</p>
             </div>
             <div className="flex-1 bg-white border border-gray-200 shadow-lg p-6 rounded-xl">
                 <div className="text-xs font-bold text-gray-400 uppercase mb-2">Step 2</div>
                 <h3 className="font-bold text-lg">Select "Cashier"</h3>
                 <p className="text-sm text-gray-500 mt-2">Wizard based. One click.</p>
             </div>
             <div className="flex-1 bg-jobq-blue text-white shadow-lg p-6 rounded-xl">
                 <div className="text-xs font-bold text-blue-200 uppercase mb-2">Step 3</div>
                 <h3 className="font-bold text-lg">View Top 5</h3>
                 <p className="text-sm text-blue-100 mt-2">Sorted by Distance & Experience.</p>
             </div>
        </div>
    </div>
);

// --- SLIDE 8 ---
const ProductUSSDSlide = () => (
    <div className="h-full flex p-12 bg-gray-900 text-white">
        <div className="w-1/2 pr-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Product: USSD Gateway</h2>
            <ul className="space-y-4 text-lg">
                <li className="flex items-center"><span className="text-green-400 mr-4">✓</span> Works on 100% of phones</li>
                <li className="flex items-center"><span className="text-green-400 mr-4">✓</span> 20c per session (Cheap)</li>
                <li className="flex items-center"><span className="text-green-400 mr-4">✓</span> Multi-language (Zulu, Xhosa, etc)</li>
                <li className="flex items-center"><span className="text-green-400 mr-4">✓</span> Viral invite mechanism built-in</li>
            </ul>
        </div>
        <div className="w-1/2 flex items-center justify-center">
             <div className="font-mono bg-black p-8 border-4 border-gray-700 rounded-xl text-green-400 shadow-[0_0_50px_rgba(0,255,0,0.2)]">
                 <p>Welcome to JobQ</p>
                 <p>1. Register</p>
                 <p>2. Update Profile</p>
                 <p>3. Check Status</p>
                 <p className="animate-pulse mt-4">_</p>
             </div>
        </div>
    </div>
);

// --- SLIDE 9 ---
const ProductWebSlide = () => (
    <div className="h-full flex p-12 bg-white">
        <div className="w-1/2 pr-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6">Product: Web Portals</h2>
            <div className="space-y-6">
                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-bold text-blue-900">Direct Employer</h4>
                    <p className="text-sm text-blue-700">For Store Managers. Wizard-based. "I need a cleaner". No typing.</p>
                </div>
                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                    <h4 className="font-bold text-purple-900">Recruiter Mode</h4>
                    <p className="text-sm text-purple-700">Advanced filters. "Criminal Record Clear". "Experience > 5 Years". Radius Slider.</p>
                </div>
            </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
            <div className="bg-white shadow-2xl border border-gray-200 rounded-lg w-full h-64 flex flex-col overflow-hidden">
                <div className="bg-gray-100 p-2 flex space-x-2 border-b">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 p-4 grid grid-cols-3 gap-4">
                     <div className="bg-gray-100 h-20 rounded animate-pulse"></div>
                     <div className="bg-gray-100 h-20 rounded animate-pulse"></div>
                     <div className="bg-gray-100 h-20 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    </div>
);

// --- SLIDE 10 ---
const MarketSlide = () => (
    <div className="h-full flex flex-col p-12 bg-white">
        <h2 className="text-4xl font-bold mb-8">Target Markets</h2>
        <div className="grid grid-cols-2 gap-8 h-full">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">1. The Unemployed</h3>
                <p className="text-gray-600 mb-6">Looking for ANY job, preferably close to home. Spending airtime they don't have.</p>
                <div className="text-sm font-bold text-blue-800 bg-blue-200 px-4 py-2 rounded-lg inline-block">Strategy: R10 once-off or sponsored subs.</div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-2xl font-bold text-green-900 mb-4">2. The Employed</h3>
                <p className="text-gray-600 mb-6">Have jobs but spend 30-50% of income on transport. Frustrated by commute. Want to work closer.</p>
                <div className="text-sm font-bold text-green-800 bg-green-200 px-4 py-2 rounded-lg inline-block">Strategy: Recurring monthly sub.</div>
            </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Addressable Segments</h3>
            <div className="flex justify-between text-4xl grayscale opacity-70">
                <span title="Waiters">🍽️</span>
                <span title="Cleaners">🧹</span>
                <span title="Security">👮</span>
                <span title="Petrol Attendants">⛽</span>
                <span title="Drivers">🚛</span>
                <span title="Receptionists">👩‍💼</span>
                <span title="Cashiers">🛒</span>
            </div>
        </div>
    </div>
);

// --- SLIDE 11 ---
const BusinessModelSlide = () => (
    <div className="h-full flex p-12 items-center bg-white">
        <div className="w-1/2 pr-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Revenue Model</h2>
            <p className="text-xl text-gray-600 mb-8">Scalable, Micro-transaction based.</p>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-bold text-gray-700">Annual Membership</span>
                    <span className="font-black text-green-600">R 100 / yr</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <span className="font-bold text-gray-700">Monthly Membership</span>
                    <span className="font-black text-green-600">R 10 / mo</span>
                </div>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-blue-50 border-blue-200">
                    <div>
                        <span className="font-bold text-blue-900 block">Sponsor A Seeker</span>
                        <span className="text-xs text-blue-600">Employed pay for Unemployed</span>
                    </div>
                    <span className="font-black text-blue-600">Variable</span>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
                    <div className="flex items-center">
                        <span className="text-2xl mr-3">🔓</span>
                        <div>
                            <h4 className="font-bold">Recruitment Agents</h4>
                            <p className="text-xs text-gray-400">100% Free Access. No barriers to entry. We want them to clear the queue.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-1/2 pl-8 flex items-center justify-center">
             <div className="bg-green-100 rounded-full w-64 h-64 flex items-center justify-center flex-col text-green-800 animate-bounce shadow-lg">
                 <span className="text-4xl font-black">R 1</span>
                 <span className="text-sm font-bold uppercase">Daily Top-up</span>
             </div>
        </div>
    </div>
);

// --- SLIDE 12 ---
const DisruptionSlide = () => (
    <div className="h-full flex flex-col p-12 bg-white">
        <h2 className="text-4xl font-bold mb-8">Strategic Disruption</h2>
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="border-b-2 border-gray-800">
                    <th className="py-4 text-gray-400 uppercase text-sm">Metric</th>
                    <th className="py-4 text-red-600">The Old Way</th>
                    <th className="py-4 text-green-600 font-black">The JobQ Way</th>
                </tr>
            </thead>
            <tbody className="text-lg">
                <tr className="border-b border-gray-100">
                    <td className="py-6 font-bold text-gray-700">Cost to Apply</td>
                    <td className="py-6 text-red-500">~R50 (Transport + Print)</td>
                    <td className="py-6 text-green-700">R 0 (Data Free)</td>
                </tr>
                <tr className="border-b border-gray-100">
                    <td className="py-6 font-bold text-gray-700">Feedback Loop</td>
                    <td className="py-6 text-red-500">None (Ghosting)</td>
                    <td className="py-6 text-green-700">Real-time Queue Rank</td>
                </tr>
                <tr className="border-b border-gray-100">
                    <td className="py-6 font-bold text-gray-700">Employer Effort</td>
                    <td className="py-6 text-red-500">Sifting 100s of CVs</td>
                    <td className="py-6 text-green-700">View Top 3 Verified</td>
                </tr>
                <tr>
                    <td className="py-6 font-bold text-gray-700">Seeker Benefit</td>
                    <td className="py-6 text-red-500">Active Begging</td>
                    <td className="py-6 text-green-700">Passive Discovery (+ R800 Savings)</td>
                </tr>
            </tbody>
        </table>
    </div>
);

// --- SLIDE 13 ---
const MarketingSlide = () => (
    <div className="h-full flex p-12 bg-white">
        <div className="w-1/2 pr-8">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Marketing Strategy</h2>
            <div className="space-y-6">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-4xl mr-4">🚐</span>
                    <div>
                        <h4 className="font-bold">Taxi Branding</h4>
                        <p className="text-sm text-gray-600">High visibility in target transport nodes.</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <span className="text-4xl mr-4">⛪</span>
                    <div>
                        <h4 className="font-bold">Community Activation</h4>
                        <p className="text-sm text-gray-600">Partner with Churches & Schools for bulk signups.</p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <span className="text-4xl mr-4">🤝</span>
                    <div>
                        <h4 className="font-bold">Strategic Partnerships</h4>
                        <p className="text-sm text-gray-600">Discounted subs for <strong>Vodacom/MTN</strong> users. Free for <strong>Capitec</strong> acc holders.</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
            <div className="text-9xl opacity-20">📢</div>
        </div>
    </div>
);

// --- SLIDE 14 ---
const CompetitiveEdgeSlide = () => (
    <div className="h-full flex p-12 bg-gray-900 text-white">
        <div className="w-full">
            <h2 className="text-4xl font-bold mb-8">Competitive Edge</h2>
            <div className="grid grid-cols-2 gap-8">
                <div className="border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">1. We are NEW</h3>
                    <p className="text-gray-400">Legacy players are stuck with "Search & Apply" models. We own the "Queue" model.</p>
                </div>
                <div className="border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">2. Free for Employers</h3>
                    <p className="text-gray-400">Competitors charge employers to post ads. We charge seekers small amounts. This removes the barrier for small businesses to hire.</p>
                </div>
                <div className="border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">3. Political Endorsement</h3>
                    <p className="text-gray-400">Targeting endorsement from parties (DA/ANC) as a tool for poverty alleviation.</p>
                </div>
                <div className="border border-gray-700 p-6 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-400 mb-2">4. The Data</h3>
                    <p className="text-gray-400">We will own the most accurate, real-time map of labor supply in SA.</p>
                </div>
            </div>
        </div>
    </div>
);

// --- SLIDE 15 ---
const SWOTSlide = () => (
    <div className="h-full p-12 bg-white">
        <h2 className="text-4xl font-bold mb-8">SWOT Analysis</h2>
        <div className="grid grid-cols-2 gap-4 h-4/5">
            <div className="bg-green-50 p-6 rounded-xl border-t-4 border-green-500">
                <h3 className="font-bold text-green-900 mb-2">STRENGTHS</h3>
                <ul className="text-sm text-green-800 list-disc pl-4 space-y-1">
                    <li>Technical Founder Team</li>
                    <li>USSD Familiarity (80% Market)</li>
                    <li>First Mover on "Queue" Model</li>
                </ul>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border-t-4 border-red-500">
                <h3 className="font-bold text-red-900 mb-2">WEAKNESSES</h3>
                <ul className="text-sm text-red-800 list-disc pl-4 space-y-1">
                    <li>Easy to duplicate tech</li>
                    <li>Reliance on Telco Gateways</li>
                </ul>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl border-t-4 border-blue-500">
                <h3 className="font-bold text-blue-900 mb-2">OPPORTUNITIES</h3>
                <ul className="text-sm text-blue-800 list-disc pl-4 space-y-1">
                    <li>Mobile Money Integration (M-Pesa)</li>
                    <li>Data Analytics Sales</li>
                    <li>Expansion to Africa (Kenya/Nigeria)</li>
                </ul>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl border-t-4 border-yellow-500">
                <h3 className="font-bold text-yellow-900 mb-2">THREATS</h3>
                <ul className="text-sm text-yellow-800 list-disc pl-4 space-y-1">
                    <li>Big Corp (LinkedIn) entry</li>
                    <li>Political Interference</li>
                </ul>
            </div>
        </div>
    </div>
);

// --- SLIDE 16 ---
const SwapSlide = () => (
    <div className="h-full flex flex-col items-center justify-center bg-indigo-900 text-white p-12">
        <div className="bg-indigo-800 p-3 rounded-full mb-6 text-xs font-bold tracking-widest uppercase">Future Tech</div>
        <h2 className="text-5xl font-bold mb-6">The "Swap" Algorithm</h2>
        <p className="text-xl text-indigo-200 text-center max-w-2xl mb-12">
            "What if two security guards, living in Soweto and Tembisa, working in Tembisa and Soweto respectively, could just swap jobs?"
        </p>
        <div className="flex items-center space-x-8 text-4xl">
            <span>🏠</span>
            <span>↔️</span>
            <span>🏠</span>
        </div>
        <p className="mt-8 text-sm text-indigo-300">Potential Impact: Billions saved in national transport costs.</p>
    </div>
);

// --- SLIDE 17 ---
const TeamSlide = () => (
    <div className="h-full flex p-12 bg-white">
        <h2 className="text-4xl font-bold mb-12 w-1/3">The Team</h2>
        <div className="w-2/3 grid grid-cols-1 gap-6">
            <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div>
                    <h3 className="font-bold text-lg">Gerrit van Deventer (Founder)</h3>
                    <p className="text-sm text-gray-600">Technical Lead. 2 Years "In the field" research in townships.</p>
                </div>
            </div>
            <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-xl">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div>
                    <h3 className="font-bold text-lg">Johann Eloff (Director)</h3>
                    <p className="text-sm text-gray-600">Software Engineering & Strategy.</p>
                </div>
            </div>
             <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl text-gray-400">
                <span className="mr-2">🕵️</span> We are looking for a Non-Technical Co-Founder (Sales/Polticial)
            </div>
        </div>
    </div>
);

// --- SLIDE 18 ---
const FinancialsSlide = () => (
    <div className="h-full flex p-12 bg-white">
        <div className="w-full">
            <h2 className="text-4xl font-bold mb-8 text-gray-900">Financial Projections</h2>
            <div className="flex items-end space-x-4 h-64 mb-8 items-baseline">
                <div className="flex-1 flex flex-col justify-end items-center group">
                    <div className="w-full bg-red-400 h-12 rounded-t-lg opacity-50 relative"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-red-600">Burn</span></div>
                    <div className="w-full bg-green-500 h-2 rounded-t-lg relative"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600">Rev</span></div>
                    <span className="mt-2 text-xs font-bold">Y1</span>
                </div>
                <div className="flex-1 flex flex-col justify-end items-center group">
                    <div className="w-full bg-red-400 h-16 rounded-t-lg opacity-50"></div>
                    <div className="w-full bg-green-500 h-32 rounded-t-lg relative"><span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-green-600">Break Even</span></div>
                    <span className="mt-2 text-xs font-bold">Y2</span>
                </div>
                <div className="flex-1 flex flex-col justify-end items-center group">
                    <div className="w-full bg-red-400 h-20 rounded-t-lg opacity-50"></div>
                    <div className="w-full bg-green-500 h-64 rounded-t-lg"></div>
                    <span className="mt-2 text-xs font-bold">Y3</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">CAC</div>
                    <div className="font-bold text-xl">R 2.50</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">LTV</div>
                    <div className="font-bold text-xl">R 150.00</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Margin</div>
                    <div className="font-bold text-xl">90%</div>
                </div>
            </div>
        </div>
    </div>
);

// --- SLIDE 19 ---
const RoadmapSlide = () => (
  <div className="h-full flex flex-col p-12 bg-white">
    <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800">Strategic Roadmap</h2>
        <span className="text-6xl">🛣️</span>
    </div>
    
    <div className="grid grid-cols-4 gap-4 h-full content-center">
        {/* Phase 1 */}
        <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex flex-col shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <div className="text-xs font-bold text-blue-600 uppercase">Q3-Q4 2025</div>
                <span className="bg-blue-200 text-blue-800 text-[10px] px-2 rounded-full font-bold">CURRENT</span>
            </div>
            <h3 className="font-bold text-lg mb-2 text-blue-900">Build & Beta</h3>
            <ul className="text-sm space-y-2 text-gray-600 flex-1">
                <li>• MVP Development Finalization</li>
                <li>• Closed Beta Testing</li>
                <li>• Soweto Pilot Launch</li>
            </ul>
            <div className="h-2 bg-blue-200 mt-4 rounded-full overflow-hidden"><div className="h-full bg-blue-600 w-1/2"></div></div>
        </div>

        {/* Phase 2 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2">Q1-Q2 2026</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Market Entry</h3>
            <ul className="text-sm space-y-2 text-gray-600 flex-1">
                <li>• Official Gauteng Launch</li>
                <li>• Marketing Activation (Taxi Branding)</li>
                <li>• Target: 10k Active Users</li>
            </ul>
            <div className="h-2 bg-gray-100 mt-4 rounded-full"></div>
        </div>

        {/* Phase 3 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col opacity-80">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2">Q3-Q4 2026</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Growth & Scale</h3>
            <ul className="text-sm space-y-2 text-gray-600 flex-1">
                <li>• Banking Partner Integration (Capitec)</li>
                <li>• National Rollout (KZN, WC)</li>
                <li>• Target: 100k Users</li>
            </ul>
            <div className="h-2 bg-gray-100 mt-4 rounded-full"></div>
        </div>

        {/* Phase 4 */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col opacity-60">
            <div className="text-xs font-bold text-gray-500 uppercase mb-2">2027+</div>
            <h3 className="font-bold text-lg mb-2 text-gray-800">Expansion</h3>
            <ul className="text-sm space-y-2 text-gray-600 flex-1">
                <li>• SADC Region Expansion</li>
                <li>• M-Pesa Integration (Kenya)</li>
                <li>• Series A Funding Round</li>
            </ul>
            <div className="h-2 bg-gray-100 mt-4 rounded-full"></div>
        </div>
    </div>
  </div>
);

// --- SLIDE 20 ---
const AskSlide = () => (
    <div className="h-full flex p-12 bg-gray-900 text-white items-center justify-center text-center">
        <div>
            <h2 className="text-5xl font-bold mb-8">The Ask</h2>
            <div className="text-8xl font-black text-green-400 mb-4">R 2,500,000</div>
            <p className="text-2xl text-gray-400 mb-12">For 15% Equity</p>
            
            <div className="grid grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
                 <div className="border-t-4 border-blue-500 pt-4">
                     <div className="font-bold text-xl mb-2">40% Product</div>
                     <p className="text-gray-400 text-sm">Finalizing the Geo-Matching Algorithm & Backend Scale.</p>
                 </div>
                 <div className="border-t-4 border-green-500 pt-4">
                     <div className="font-bold text-xl mb-2">40% Marketing</div>
                     <p className="text-gray-400 text-sm">Taxi Branding, Flyers, and Community Activation costs.</p>
                 </div>
                 <div className="border-t-4 border-purple-500 pt-4">
                     <div className="font-bold text-xl mb-2">20% Operations</div>
                     <p className="text-gray-400 text-sm">Legal, WASP Fees, and initial Server Costs.</p>
                 </div>
            </div>

            <div className="mt-16">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform">
                    Contact Us: info@jobq.co.za
                </button>
            </div>
        </div>
    </div>
);
