import React from 'react';
import { Camera, Layers } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 px-4 md:px-8 flex items-center justify-between border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
          <Layers className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            ChromaKey AI
          </h1>
          <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <span className="text-sm text-slate-500 font-medium px-3 py-1 bg-slate-800 rounded-full border border-slate-700">
          v1.0.0
        </span>
      </div>
    </header>
  );
};

export default Header;
