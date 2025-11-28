import React, { useState, useEffect } from 'react';
import { USSDState } from '../../types';

interface NokiaPhoneProps {
  screenContent: string;
  onKeyPress: (key: string) => void;
  isLoading?: boolean;
}

export const NokiaPhone: React.FC<NokiaPhoneProps> = ({ screenContent, onKeyPress, isLoading }) => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  const handlePress = (key: string) => {
    setPressedKey(key);
    onKeyPress(key);
    setTimeout(() => setPressedKey(null), 200);
  };

  return (
    <div className="flex items-center justify-center h-full p-4 bg-gray-200">
      <div className="relative w-[300px] h-[600px] bg-[#333] rounded-[40px] shadow-2xl p-6 border-4 border-[#1a1a1a] select-none">
        
        {/* Brand */}
        <div className="text-center text-gray-400 font-bold mb-4 tracking-widest text-xs">NOKIA</div>

        {/* Speaker */}
        <div className="mx-auto w-16 h-2 bg-gray-600 rounded-full mb-4"></div>

        {/* Screen */}
        <div className="bg-[#9ea78f] h-48 w-full rounded-md border-4 border-gray-500 shadow-inner p-2 font-retro text-lg leading-tight text-black relative overflow-hidden">
          {isLoading ? (
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="animate-pulse">Loading...</span>
             </div>
          ) : (
            <div className="whitespace-pre-wrap">{screenContent}</div>
          )}
          {/* Status Bar */}
          <div className="absolute bottom-1 right-1 flex space-x-1">
             <div className="w-1 h-3 bg-black opacity-20"></div>
             <div className="w-1 h-4 bg-black opacity-40"></div>
             <div className="w-1 h-5 bg-black"></div>
          </div>
          <div className="absolute bottom-1 left-1 text-xs">JobQ</div>
        </div>

        {/* Navigation Keys */}
        <div className="mt-6 mb-4 flex justify-between px-2">
          <button 
            onClick={() => handlePress('SOFT_LEFT')}
            className="w-16 h-8 bg-gray-300 rounded-t-lg active:bg-gray-400 shadow-sm border-b-2 border-gray-400"
          ></button>
           <button 
            onClick={() => handlePress('MENU')}
            className="w-16 h-8 bg-blue-500 rounded-lg active:bg-blue-600 shadow-sm border-b-4 border-blue-700 mx-2"
          ></button>
          <button 
            onClick={() => handlePress('SOFT_RIGHT')}
            className="w-16 h-8 bg-gray-300 rounded-t-lg active:bg-gray-400 shadow-sm border-b-2 border-gray-400"
          ></button>
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3 px-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((key) => (
            <button
              key={key}
              onClick={() => handlePress(key)}
              className={`
                h-10 rounded-lg font-bold text-xl shadow-md border-b-4 transition-transform
                ${pressedKey === key ? 'translate-y-1 border-b-0 bg-gray-400' : 'bg-gray-100 border-gray-300'}
                flex flex-col items-center justify-center
              `}
            >
              <span className="text-black">{key}</span>
       {key === '1' && <span className="text-[8px] text-gray-500 -mt-1">oo</span>}
              {key === '2' && <span className="text-[8px] text-gray-500 -mt-1">abc</span>}
              {key === '3' && <span className="text-[8px] text-gray-500 -mt-1">def</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};