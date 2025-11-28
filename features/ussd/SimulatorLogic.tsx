
import React, { useState } from 'react';
import { NokiaPhone } from './NokiaPhone';
import { Language } from '../../types';

type UserMode = 'SEEKER' | 'EMPLOYER';

const TRANSLATIONS = {
  [Language.ENGLISH]: {
    welcome: "Welcome to JobQ\n1. Register\n2. About JobQ",
    invite: "Enter Invitation Code:",
    idPrompt: "Reply with ID Number:",
    expPrompt: "Enter years of experience (e.g. 2):",
    location: "Select Nearest Town:\n1. Soweto\n2. Tembisa\n3. Alex",
    success: "You are in the Queue! We will SMS you when a job finds YOU.",
    invalid: "Invalid Code."
  },
  [Language.ZULU]: {
    welcome: "Siyakwamukela kwi-JobQ\n1. Bhalisa\n2. Mayelana",
    invite: "Faka ikhodi yesimemo:",
    idPrompt: "Phendula ngenombolo kamazisi:",
    expPrompt: "Iminyaka yesipiliyoni (sib. 2):",
    location: "Khetha indawo:\n1. Soweto\n2. Tembisa\n3. Alex",
    success: "Ulayini! Sizokuthumelela i-SMS uma umsebenzi uvela.",
    invalid: "Ikhodi ayilungile."
  },
  [Language.XHOSA]: {
    welcome: "Wamkelekile kwi-JobQ\n1. Bhalisa\n2. Malunga",
    invite: "Faka ikhowudi yesimemo:",
    idPrompt: "Phendula ngenombolo yesazisi:",
    expPrompt: "Iminyaka yamava (umz. 2):",
    location: "Khetha indawo:\n1. Soweto\n2. Tembisa\n3. Alex",
    success: "Usemgceni! Siza kuthumela i-SMS.",
    invalid: "Ikhowudi ayilunganga."
  },
  [Language.SOTHO]: {
    welcome: "Rea u amohela JobQ\n1. Ngolisa\n2. Mabapi",
    invite: "Kenya khoutu:",
    idPrompt: "Kenya nomoro ya ID:",
    expPrompt: "Lilemo tsa boiphihlelo:",
    location: "Kgetha toropo:\n1. Soweto\n2. Tembisa\n3. Alex",
    success: "O moleng! Re tla o romella SMS.",
    invalid: "Khoutu ha e sebetse."
  },
  [Language.AFRIKAANS]: {
    welcome: "Welkom by JobQ\n1. Registreer\n2. Oor Ons",
    invite: "Voer uitnodigingskode in:",
    idPrompt: "Antwoord met ID Nommer:",
    expPrompt: "Jare ondervinding (bv. 2):",
    location: "Kies Dorp:\n1. Soweto\n2. Tembisa\n3. Alex",
    success: "Jy is in die tou! Ons sal jou SMS.",
    invalid: "Ongeldige kode."
  }
};

export const SimulatorLogic: React.FC = () => {
  const [mode, setMode] = useState<UserMode>('SEEKER');
  const [selectedLang, setSelectedLang] = useState<Language>(Language.ENGLISH);
  // Step -1 is Language Selection
  const [step, setStep] = useState(-1); 
  
  // Text displayed currently
  const [screenText, setScreenText] = useState("Select Language:\n1. English\n2. isiZulu\n3. isiXhosa\n4. Sesotho\n5. Afrikaans");
  
  const [inputBuffer, setInputBuffer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resetSession = (newMode: UserMode) => {
    setMode(newMode);
    setStep(-1); // Always start at lang selection for demo consistency
    setInputBuffer("");
    
    if (newMode === 'SEEKER') {
      setScreenText("Select Language:\n1. English\n2. isiZulu\n3. isiXhosa\n4. Sesotho\n5. Afrikaans");
    } else {
      // Employer portal is English only per requirements
      setStep(0); 
      setScreenText("JobQ Provider Portal\n1. View Active Candidates\n2. My Profile\n3. Help");
    }
  };

  const getTranslatedText = (key: keyof typeof TRANSLATIONS[Language.ENGLISH], lang: Language) => {
     return TRANSLATIONS[lang][key] || TRANSLATIONS[Language.ENGLISH][key];
  };

  const processSeekerInput = (input: string) => {
      let nextScreen = "";
      let nextStep = step;
      
      // Language Selection State
      if (step === -1) {
          let lang = Language.ENGLISH;
          if (input === '1') lang = Language.ENGLISH;
          if (input === '2') lang = Language.ZULU;
          if (input === '3') lang = Language.XHOSA;
          if (input === '4') lang = Language.SOTHO;
          if (input === '5') lang = Language.AFRIKAANS;
          
          setSelectedLang(lang);
          // Move to "Welcome" logic (which is technically step 0 in previous flow, but let's skip to invite for flow speed)
          nextScreen = getTranslatedText('welcome', lang);
          nextStep = 0;
      } 
      else {
          const t = (key: any) => getTranslatedText(key, selectedLang);

          switch (step) {
            case 0: // Welcome Menu
              if (input === '1') {
                nextScreen = t('invite');
                nextStep = 1;
              } else {
                nextScreen = "JobQ connects you to jobs near home.\n\n0. Back";
                nextStep = 0;
              }
              break;
            case 1: // Invite Code
              if (input === '123456789') {
                nextScreen = t('idPrompt');
                nextStep = 2;
              } else {
                nextScreen = `${t('invalid')}\n${t('invite')}`;
                nextStep = 1;
              }
              break;
            case 2: // ID Input
              // Ask for experience next
              nextScreen = t('expPrompt');
              nextStep = 25; // Intermediate step
              break;
            case 25: // Experience Input
               nextScreen = t('location');
               nextStep = 3;
               break;
            case 3: // Location
              // Simulating "Wait in queue" logic
              nextScreen = t('success');
              nextStep = 4; // End
              break;
            case 4:
               nextScreen = "Session Ended.";
               break;
            default:
              nextScreen = "Error. Restarting.";
              nextStep = -1;
          }
      }
      setScreenText(nextScreen);
      setStep(nextStep);
  };

  // Employer Flow (English Only, No Posting)
  const processEmployerInput = (input: string) => {
      let nextScreen = "";
      let nextStep = step;

      switch (step) {
        case 0: // Main Menu
          if (input === '1') {
            nextScreen = "Active Candidates Near You:\n1. Thabo M (0.5km)\n2. Sipho Z (1.2km)\n\nSelect to view details.";
            nextStep = 1;
          } else {
             nextScreen = "JobQ Help\nEmail support@jobq.co.za\n\n0. Back";
          }
          break;
        case 1: // Select Candidate
          if (input === '1') {
             nextScreen = "Thabo M.\nExp: 2 Years\nStatus: Clear Record\n\n1. Request Contact\n0. Back";
             nextStep = 2;
          } else {
             nextScreen = "Sipho Z.\nExp: 6 Months\nStatus: Employed\n\n1. Request Contact\n0. Back";
             nextStep = 2;
          }
          break;
        case 2: // Action
          if (input === '1') {
             nextScreen = "SMS Sent to Candidate.\nIf they accept, you will receive their number.\n\n1. Main Menu";
             nextStep = 3;
          } else {
             nextStep = 0;
             nextScreen = "JobQ Provider Portal\n1. View Active Candidates\n2. My Profile\n3. Help";
          }
          break;
        case 3:
           nextStep = 0;
           nextScreen = "JobQ Provider Portal\n1. View Active Candidates\n2. My Profile\n3. Help";
           break;
        default:
           resetSession('EMPLOYER');
           return;
      }

      setScreenText(nextScreen);
      setStep(nextStep);
  };

  const processInput = (input: string) => {
    setIsLoading(true);
    setTimeout(() => {
      if (mode === 'SEEKER') {
        processSeekerInput(input);
      } else {
        processEmployerInput(input);
      }
      setInputBuffer("");
      setIsLoading(false);
    }, 600);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'SOFT_LEFT' || key === 'MENU') {
      if (inputBuffer.length > 0 || (mode === 'EMPLOYER' && (step === 3))) {
         processInput(inputBuffer);
      }
      return;
    }
    if (key === 'SOFT_RIGHT') {
      setInputBuffer(prev => prev.slice(0, -1));
      return;
    }
    if (key === '#') {
       processInput(inputBuffer);
       return;
    }
    setInputBuffer(prev => prev + key);
  };

  return (
    <div className="flex flex-col h-full items-center">
      {/* Mode Toggle */}
      <div className="bg-gray-200 p-2 rounded-full flex space-x-2 mb-4 mt-4">
        <button 
          onClick={() => resetSession('SEEKER')}
          className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${mode === 'SEEKER' ? 'bg-jobq-green text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
        >
          Job Seeker
        </button>
        <button 
          onClick={() => resetSession('EMPLOYER')}
          className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${mode === 'EMPLOYER' ? 'bg-purple-600 text-white shadow' : 'text-gray-600 hover:bg-gray-300'}`}
        >
          Employer
        </button>
      </div>

      <div className="bg-gray-800 text-white px-4 py-2 rounded text-center text-sm mb-2 shadow-md">
        Simulating: <strong>{mode === 'SEEKER' ? '*120*5627#' : '*120*5627*1#'}</strong>
      </div>

      <NokiaPhone 
        screenContent={step === 4 || step === 3 ? screenText : `${screenText}\n\n${inputBuffer}`} 
        onKeyPress={handleKeyPress} 
        isLoading={isLoading}
      />
      
      <div className="p-4 text-center text-sm text-gray-500 max-w-xs">
           <span>Type on the keypad. Press # or Left Button to Send.</span>
      </div>
    </div>
  );
};
