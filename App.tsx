
import React, { useState } from 'react';
import { PlanDiagram } from './components/PlanDiagram';
import { TechStack } from './components/TechStack';
import { SimulatorLogic } from './features/ussd/SimulatorLogic';
import { JobSeekerApp } from './features/web/JobSeekerApp';
import { EmployerPortal } from './features/employer/EmployerPortal';
import { GrapevineCode } from './features/ussd/GrapevineCode';
import { PresentationDeck } from './features/presentation/PresentationDeck';
import { TechDocs } from './features/docs/TechDocs';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.PLAN);

  const renderContent = () => {
    switch (currentView) {
      case AppView.PLAN:
        return <PlanDiagram />;
      case AppView.STACK:
        return <TechStack />;
      case AppView.SIMULATOR:
        return <SimulatorLogic />;
      case AppView.MOBILE_WEB: 
      case AppView.JOB_SEEKER_PORTAL:
        return <JobSeekerApp />;
      case AppView.EMPLOYER_PORTAL:
      case AppView.JOB_PROVIDER_PORTAL:
      case AppView.RECRUITER_PORTAL: 
        return <EmployerPortal />;
      case AppView.USSD_CODE:
        return <GrapevineCode />;
      case AppView.PRESENTATION:
        return <PresentationDeck />;
      case AppView.TECH_DOCS:
        return <TechDocs />;
      default:
        return <PlanDiagram />;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-gray-100 font-sans print:bg-white">
      {/* Sidebar Menu - Hidden when printing */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-2xl z-20 print:hidden">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold tracking-tighter">
            <span className="text-jobq-red">job</span>
            <span className="text-jobq-blue">Q</span>
            <span className="text-gray-400 font-normal text-sm block mt-1">Prototype Suite</span>
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-1 mb-6">
             <MenuButton 
              active={currentView === AppView.PRESENTATION} 
              onClick={() => setCurrentView(AppView.PRESENTATION)}
              icon="📽️"
              label="Investor Deck"
            />
          </div>

          <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-1">Strategy</div>
          <MenuButton 
            active={currentView === AppView.PLAN} 
            onClick={() => setCurrentView(AppView.PLAN)}
            icon="🗺️"
            label="Plan & Flow"
          />
           <MenuButton 
            active={currentView === AppView.STACK} 
            onClick={() => setCurrentView(AppView.STACK)}
            icon="🛠️"
            label="Tech Stack"
          />

          <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-1 mt-6">Technical</div>
          <MenuButton 
            active={currentView === AppView.TECH_DOCS} 
            onClick={() => setCurrentView(AppView.TECH_DOCS)}
            icon="📘"
            label="Documentation"
          />
          <MenuButton 
            active={currentView === AppView.USSD_CODE} 
            onClick={() => setCurrentView(AppView.USSD_CODE)}
            icon="📝"
            label="USSD Code Generator"
          />

          <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-1 mt-6">Portals (User)</div>
          <MenuButton 
            active={currentView === AppView.JOB_SEEKER_PORTAL} 
            onClick={() => setCurrentView(AppView.JOB_SEEKER_PORTAL)}
            icon="📱"
            label="Job Seeker Portal"
          />
          
          <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-1 mt-6">Portals (Business)</div>
          <MenuButton 
            active={currentView === AppView.JOB_PROVIDER_PORTAL} 
            onClick={() => setCurrentView(AppView.JOB_PROVIDER_PORTAL)}
            icon="🏭"
            label="Job Provider Portal"
          />
          <MenuButton 
            active={currentView === AppView.RECRUITER_PORTAL} 
            onClick={() => setCurrentView(AppView.RECRUITER_PORTAL)}
            icon="🕵️"
            label="Recruiter Portal"
          />

          <div className="text-xs font-bold text-gray-500 uppercase px-2 mb-1 mt-6">Dev Tools</div>
          <MenuButton 
            active={currentView === AppView.SIMULATOR} 
            onClick={() => setCurrentView(AppView.SIMULATOR)}
            icon="📟"
            label="USSD Simulator"
          />
        </nav>
        
        <div className="p-4 border-t border-gray-700 text-xs text-gray-500">
          Version 2.4.0 (Beta)
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden bg-gray-200 print:bg-white print:overflow-visible print:h-auto">
        {renderContent()}
      </main>
    </div>
  );
};

interface MenuButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all ${
      active 
        ? 'bg-blue-600 text-white shadow-lg' 
        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
    }`}
  >
    <span className="text-lg">{icon}</span>
    <span className="font-medium text-sm text-left">{label}</span>
  </button>
);

export default App;
