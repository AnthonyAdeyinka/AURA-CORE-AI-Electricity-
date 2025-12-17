
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 border-r border-slate-800 p-6 flex flex-col h-full sticky top-0">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
          <i className="fas fa-bolt text-white text-xl"></i>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight">AURA <span className="text-emerald-500 font-light italic">Core</span></h1>
          <p className="text-[10px] text-slate-500 tracking-widest uppercase">Track C / MARRG</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-500/10 text-emerald-500 rounded-xl transition-all">
          <i className="fas fa-chart-line"></i>
          <span className="font-medium">Live Insights</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
          <i className="fas fa-shield-alt"></i>
          <span className="font-medium">Leakage Shield</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
          <i className="fas fa-microchip"></i>
          <span className="font-medium">Bridge Health</span>
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 rounded-xl transition-all">
          <i className="fas fa-cog"></i>
          <span className="font-medium">Settings</span>
        </button>
      </nav>

      <div className="mt-auto glass-card p-4 rounded-xl border-emerald-500/20">
        <p className="text-xs font-bold text-emerald-400 mb-2 uppercase">Status</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <p className="text-xs text-slate-400">AI Engine Ready</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
