
import React, { useState } from 'react';
import { Language, JobType } from '../../types';

// Mock Translations for Web App
const WEB_TRANSLATIONS = {
  [Language.ENGLISH]: {
    tagline: "Find jobs closer to home.",
    subtagline: "Save time and money on transport.",
    enterCode: "Enter Invitation Code",
    continue: "Continue",
    idLabel: "ID Number",
    locLabel: "Nearest Location",
    expLabel: "Experience (Years)",
    queueTitle: "You are in the Queue!",
    queueBody: "We will SMS you when a job near %LOC% matches your profile.",
    startOver: "Log Out",
    login: "Member Login",
    register: "New Registration",
    dashboard: "My Dashboard",
    welcome: "Welcome back, ",
    update: "Update Profile",
    saved: "Changes Saved Successfully!",
    status_queued: "Queued",
    status_employed: "Employed"
  },
  [Language.ZULU]: {
    tagline: "Thola umsebenzi eduze kwasekhaya.",
    subtagline: "Yonga isikhathi nemali yokugibela.",
    enterCode: "Faka ikhodi yesimemo",
    continue: "Qhubeka",
    idLabel: "Inombolo Kamazisi",
    locLabel: "Indawo",
    expLabel: "Iminyaka Yesipiliyoni",
    queueTitle: "Usemgqeni!",
    queueBody: "Sizokuthumelela i-SMS uma umsebenzi e-%LOC% uvela.",
    startOver: "Phuma",
    login: "Ngena",
    register: "Bhalisa",
    dashboard: "Ideshibhodi Yami",
    welcome: "Siyakwamukela, ",
    update: "Vuselela Iphrofayili",
    saved: "Izinguquko Zigciniwe!",
    status_queued: "Usemgqeni",
    status_employed: "Uyaqashwa"
  },
  [Language.XHOSA]: {
    tagline: "Fumana umsebenzi kufuphi nasekhaya.",
    subtagline: "Yonga ixesha kunye nemali yokuhamba.",
    enterCode: "Faka ikhowudi yesimemo",
    continue: "Qhubeka",
    idLabel: "Inombolo Yesazisi",
    locLabel: "Indawo",
    expLabel: "Imyaka yamava",
    queueTitle: "Usemgceni!",
    queueBody: "Siza kuthumela i-SMS xa umsebenzi e-%LOC% ukhona.",
    startOver: "Phuma",
    login: "Ngena",
    register: "Bhalisa",
    dashboard: "Ideshibhodi Yam",
    welcome: "Wamkelekile, ",
    update: "Hlaziya Iprofayile",
    saved: "Zigciniwe!",
    status_queued: "Usemgceni",
    status_employed: "Uyaqeshwa"
  },
  [Language.SOTHO]: {
    tagline: "Fumana mosebetsi haufi le lapeng.",
    subtagline: "Boloka nako le chelete ya lipalangoang.",
    enterCode: "Kenya khoutu",
    continue: "Tsoela pele",
    idLabel: "Nomoro ya ID",
    locLabel: "Sebaka",
    expLabel: "Lilemo tsa boiphihlelo",
    queueTitle: "O moleng!",
    queueBody: "Re tla o romella SMS ha mosebetsi wa %LOC% o hlaha.",
    startOver: "Tsoa",
    login: "Kena",
    register: "Ngolisa",
    dashboard: "Dashboard ea Ka",
    welcome: "Rea u amohela, ",
    update: "Ntlafatsa Boemo",
    saved: "Liphetoho li bolokiloe!",
    status_queued: "O moleng",
    status_employed: "Oa sebetsa"
  },
  [Language.AFRIKAANS]: {
    tagline: "Vind werk nader aan die huis.",
    subtagline: "Spaar tyd en geld op vervoer.",
    enterCode: "Voer kode in",
    continue: "Gaan voort",
    idLabel: "ID Nommer",
    locLabel: "Naaste Dorp",
    expLabel: "Jare Ondervinding",
    queueTitle: "Jy is in die tou!",
    queueBody: "Ons sal jou SMS wanneer 'n werk naby %LOC% beskikbaar is.",
    startOver: "Teken Uit",
    login: "Teken In",
    register: "Nuwe Registrasie",
    dashboard: "My Paneel",
    welcome: "Welkom terug, ",
    update: "Dateer Profiel Op",
    saved: "Veranderinge Gestoor!",
    status_queued: "In die tou",
    status_employed: "In Diens"
  }
};

export const JobSeekerApp: React.FC = () => {
  const [view, setView] = useState<'LANDING' | 'REGISTER' | 'LOGIN' | 'DASHBOARD'>('LANDING');
  const [lang, setLang] = useState<Language>(Language.ENGLISH);
  
  // Registration State
  const [regStep, setRegStep] = useState(0);
  const [regData, setRegData] = useState<any>({});

  // UI State
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Mock User Profile for Dashboard
  const [userProfile, setUserProfile] = useState({
     name: "Thabo Molefe",
     idNumber: "9501015800080",
     isEmployed: false,
     lookingCloser: false,
     contactPreference: "Anytime",
     phoneNumber: "072 123 4567",
     jobType: "Cashier",
     location: "Soweto",
     experienceYears: 2,
     queueRank: 14,
     distanceFromCenter: "0.5 km"
  });

  const t = (key: keyof typeof WEB_TRANSLATIONS[Language.ENGLISH]) => {
      return WEB_TRANSLATIONS[lang][key] || WEB_TRANSLATIONS[Language.ENGLISH][key];
  };

  const handleRegisterNext = (data: any) => {
    const newData = { ...regData, ...data };
    setRegData(newData);
    if (regStep === 3) {
        // Complete Registration
        setView('DASHBOARD');
        setUserProfile(prev => ({
            ...prev,
            location: newData.location || prev.location,
            jobType: newData.job || prev.jobType,
            experienceYears: parseInt(newData.exp) || 0
        }));
    } else {
        setRegStep(regStep + 1);
    }
  };

  const handleLogin = (code: string) => {
      // Mock Login Validation
      if (code.length > 3) {
          setView('DASHBOARD');
      }
  };

  const handleUpdateProfile = () => {
      setIsSaving(true);
      setSuccessMsg(null);
      
      // Simulate network request
      setTimeout(() => {
          setIsSaving(false);
          setSuccessMsg(t('saved'));
          
          // Hide success message after 3 seconds
          setTimeout(() => {
              setSuccessMsg(null);
          }, 3000);
      }, 1000);
  };

  return (
    <div className="h-full bg-gray-100 flex justify-center overflow-y-auto font-sans">
      <div className="w-full max-w-md bg-white shadow-xl min-h-screen border-x border-gray-200 flex flex-col">
        {/* Header */}
        <div className="bg-jobq-blue p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('LANDING')}>
             <div className="font-black text-3xl text-jobq-red tracking-tighter" style={{ textShadow: '1px 1px 0 #fff' }}>job</div>
             <div className="font-black text-3xl text-jobq-green -ml-2" style={{ textShadow: '1px 1px 0 #000' }}>Q</div>
          </div>
          <div className="text-white/80 text-sm font-medium">{t('dashboard')}</div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          {view === 'LANDING' && (
             <div className="space-y-6 animate-in fade-in duration-300">
                 <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{t('tagline')}</h1>
                    <p className="text-gray-600 text-sm">{t('subtagline')}</p>
                 </div>

                 <div className="space-y-3">
                     <button 
                        onClick={() => setView('LOGIN')}
                        className="w-full bg-white border-2 border-jobq-blue text-jobq-blue font-bold py-4 rounded-lg shadow-sm hover:bg-blue-50 transition-colors"
                     >
                        {t('login')}
                     </button>
                     <button 
                        onClick={() => { setRegStep(0); setView('REGISTER'); }}
                        className="w-full bg-jobq-blue text-white font-bold py-4 rounded-lg shadow hover:bg-blue-700 transition-colors"
                     >
                        {t('register')}
                     </button>
                 </div>

                 <div className="mt-8 pt-8 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 text-center">Language / Ulimi</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <LangMiniButton lang={Language.ENGLISH} label="English" current={lang} onClick={setLang} />
                        <LangMiniButton lang={Language.ZULU} label="isiZulu" current={lang} onClick={setLang} />
                        <LangMiniButton lang={Language.XHOSA} label="isiXhosa" current={lang} onClick={setLang} />
                        <LangMiniButton lang={Language.SOTHO} label="Sesotho" current={lang} onClick={setLang} />
                        <LangMiniButton lang={Language.AFRIKAANS} label="Afrikaans" current={lang} onClick={setLang} />
                    </div>
                 </div>
             </div>
          )}

          {view === 'LOGIN' && (
             <div className="animate-in slide-in-from-right duration-300">
                 <button onClick={() => setView('LANDING')} className="text-sm text-gray-500 mb-4">← Back</button>
                 <h2 className="text-xl font-bold text-gray-800 mb-6">{t('login')}</h2>
                 <StepInvitation 
                    label={t('enterCode')} 
                    btnLabel={t('continue')} 
                    onNext={handleLogin} 
                 />
             </div>
          )}

          {view === 'REGISTER' && (
             <div className="animate-in slide-in-from-right duration-300">
                <button onClick={() => setView('LANDING')} className="text-sm text-gray-500 mb-4">← Back</button>
                {regStep === 0 && <StepInvitation label={t('enterCode')} btnLabel={t('continue')} onNext={(code) => handleRegisterNext({ inviteCode: code })} />}
                {regStep === 1 && <StepPersonalDetails idLabel={t('idLabel')} locLabel={t('locLabel')} expLabel={t('expLabel')} onNext={(details) => handleRegisterNext(details)} />}
                {regStep === 2 && <StepJobPreferences onNext={(prefs) => handleRegisterNext(prefs)} />}
                {regStep === 3 && (
                    <div className="text-center py-10">
                         <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">✅</span>
                        </div>
                        <h2 className="text-xl font-bold mb-2">{t('queueTitle')}</h2>
                        <p className="text-gray-600 mb-6">{t('queueBody').replace('%LOC%', regData.location || 'area')}</p>
                        <button onClick={() => setView('DASHBOARD')} className="bg-jobq-blue text-white px-6 py-2 rounded-full font-bold">
                            Go to Dashboard
                        </button>
                    </div>
                )}
             </div>
          )}

          {view === 'DASHBOARD' && (
             <div className="animate-in fade-in duration-500 space-y-6 pb-10">
                {/* Welcome Card */}
                <div className="bg-gradient-to-r from-jobq-blue to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <h2 className="text-2xl font-bold mb-1">{t('welcome')} {userProfile.name.split(' ')[0]}!</h2>
                    <p className="opacity-80 text-sm">{userProfile.idNumber}</p>
                    <div className="mt-4 flex items-center space-x-2">
                        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                           {userProfile.jobType}
                        </div>
                        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                           📍 {userProfile.location}
                        </div>
                    </div>
                </div>

                {/* Queue Status */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl">
                        ACTIVE
                    </div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-2">Queue Status</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-4xl font-black text-gray-800">#{userProfile.queueRank}</span>
                        <span className="text-gray-500 text-sm">in line for {userProfile.location}</span>
                    </div>
                    <div className="mt-2 w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-3/4"></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Estimated wait: 2-5 days</p>
                </div>

                {/* Profile Management */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase border-b pb-2">Settings</h3>
                    
                    {/* Employment Toggle */}
                    <div>
                        <label className="flex items-center justify-between cursor-pointer group select-none">
                            <span className="text-gray-700 font-medium">I am currently Employed</span>
                            <div 
                                onClick={() => setUserProfile(p => ({...p, isEmployed: !p.isEmployed}))}
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${userProfile.isEmployed ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${userProfile.isEmployed ? 'translate-x-6' : ''}`}></div>
                            </div>
                        </label>
                        {userProfile.isEmployed && (
                            <div className="mt-2 bg-yellow-50 p-3 rounded border border-yellow-200 animate-in slide-in-from-top-2">
                                <label className="flex items-center space-x-2 text-sm text-yellow-800 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={userProfile.lookingCloser} 
                                        onChange={(e) => setUserProfile(p => ({...p, lookingCloser: e.target.checked}))}
                                        className="rounded text-jobq-blue focus:ring-jobq-blue w-4 h-4" 
                                    />
                                    <span>I am looking for a job closer to home</span>
                                </label>
                            </div>
                        )}
                    </div>

                    {/* Job Type Selection */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Current Job Focus</label>
                        <select 
                            value={userProfile.jobType}
                            onChange={(e) => setUserProfile(p => ({...p, jobType: e.target.value}))}
                            className="w-full p-2 border rounded bg-gray-50 focus:bg-white focus:border-jobq-blue"
                        >
                            {[JobType.CASHIER, JobType.PETROL_ATTENDANT, JobType.CLEANER, JobType.SECURITY, JobType.WAITER, JobType.RECEPTIONIST].map(j => (
                                <option key={j} value={j}>{j}</option>
                            ))}
                        </select>
                    </div>

                    {/* Experience */}
                    <div>
                         <label className="block text-xs text-gray-500 mb-1">Experience (Years)</label>
                         <input 
                            type="number" 
                            min="0"
                            max="30"
                            value={userProfile.experienceYears}
                            onChange={(e) => setUserProfile(p => ({...p, experienceYears: parseInt(e.target.value)}))}
                            className="w-full p-2 border rounded bg-gray-50"
                         />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Contact Number</label>
                        <input 
                            type="tel" 
                            value={userProfile.phoneNumber}
                            onChange={(e) => setUserProfile(p => ({...p, phoneNumber: e.target.value}))}
                            className="w-full p-2 border rounded bg-gray-50 focus:bg-white focus:ring-jobq-blue focus:border-jobq-blue"
                        />
                    </div>

                    {/* Preferences */}
                    <div>
                        <label className="block text-xs text-gray-500 mb-1">Best time to call</label>
                        <select 
                            value={userProfile.contactPreference}
                            onChange={(e) => setUserProfile(p => ({...p, contactPreference: e.target.value}))}
                            className="w-full p-2 border rounded bg-gray-50"
                        >
                            <option value="Anytime">Anytime</option>
                            <option value="After 17:00">After 17:00 (5 PM)</option>
                            <option value="Weekends Only">Weekends Only</option>
                        </select>
                    </div>
                    
                    {successMsg && (
                        <div className="p-3 bg-green-100 text-green-800 rounded-lg text-sm font-bold text-center animate-in fade-in slide-in-from-top">
                            {successMsg}
                        </div>
                    )}

                    <button 
                        onClick={handleUpdateProfile}
                        disabled={isSaving}
                        className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold text-sm hover:bg-black transition-colors disabled:opacity-50 flex justify-center items-center"
                    >
                        {isSaving ? (
                           <>
                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                             </svg>
                             Saving...
                           </>
                        ) : t('update')}
                    </button>
                </div>

                <button onClick={() => setView('LANDING')} className="w-full text-center text-red-500 text-sm font-medium py-2">
                    {t('startOver')}
                </button>
             </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 p-4 text-center border-t text-xs text-gray-400">
           JobQ (Pty) Ltd &copy; 2025
        </div>
      </div>
    </div>
  );
};

const LangMiniButton = ({lang, label, current, onClick}: {lang: Language, label: string, current: Language, onClick: (l: Language) => void}) => (
    <button 
        onClick={() => onClick(lang)} 
        className={`p-2 rounded text-xs font-bold border transition-all ${current === lang ? 'bg-jobq-blue text-white border-jobq-blue' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
    >
        {label}
    </button>
);

const StepInvitation = ({ label, btnLabel, onNext }: { label: string, btnLabel: string, onNext: (code: string) => void }) => {
  const [code, setCode] = useState('');
  return (
    <div>
      <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
      <input 
        type="tel" 
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-jobq-blue focus:ring-jobq-blue mb-4"
        placeholder="123456789"
      />
      <button 
        onClick={() => onNext(code)}
        disabled={!code}
        className="w-full bg-jobq-blue text-white font-bold py-4 rounded-lg shadow hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {btnLabel}
      </button>
    </div>
  );
};

const StepPersonalDetails = ({ idLabel, locLabel, expLabel, onNext }: { idLabel: string, locLabel: string, expLabel: string, onNext: (data: any) => void }) => {
    const [exp, setExp] = useState('');
    const [loc, setLoc] = useState('');

    return (
      <div className="space-y-4">
        <h3 className="font-bold text-lg border-b pb-2">Details</h3>
        <div>
           <label className="block text-sm text-gray-600">First Name</label>
           <input type="text" className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>
        <div>
           <label className="block text-sm text-gray-600">{idLabel}</label>
           <input type="tel" className="w-full p-3 border rounded-lg bg-gray-50" />
        </div>
        <div>
           <label className="block text-sm text-gray-600">{expLabel}</label>
           <input type="number" className="w-full p-3 border rounded-lg bg-gray-50" value={exp} onChange={(e) => setExp(e.target.value)} />
        </div>
        <div>
           <label className="block text-sm text-gray-600">{locLabel}</label>
           <select className="w-full p-3 border rounded-lg bg-white" onChange={(e) => setLoc(e.target.value)}>
              <option value="">Select...</option>
              <option value="Soweto">Soweto</option>
              <option value="Tembisa">Tembisa</option>
              <option value="Alexandra">Alexandra</option>
           </select>
        </div>
        <div className="pt-2">
            <button onClick={() => onNext({ location: loc, exp: exp })} className="w-full bg-jobq-blue text-white p-3 rounded font-bold">Next</button>
        </div>
      </div>
    );
};

const StepJobPreferences = ({ onNext }: { onNext: (data: any) => void }) => {
    return (
        <div className="space-y-4">
        <h3 className="font-bold text-lg border-b pb-2">Preference</h3>
        <div className="grid grid-cols-2 gap-3">
            {['Cashier', 'Security', 'Cleaner', 'Driver', 'Waiter', 'Receptionist'].map(job => (
                <button 
                  key={job}
                  onClick={() => onNext({ job })}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-jobq-blue hover:bg-blue-50 font-bold text-gray-700 text-sm"
                >
                    {job}
                </button>
            ))}
        </div>
      </div>
    )
}
