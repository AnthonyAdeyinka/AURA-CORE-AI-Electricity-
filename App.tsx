
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import MeterCard from './components/MeterCard';
import { MOCK_METERS } from './constants';
import { MeterStatus } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALL' | 'CRITICAL' | 'WARNING'>('ALL');

  const filteredMeters = MOCK_METERS.filter(m => {
    if (activeTab === 'ALL') return true;
    return m.status === activeTab;
  });

  const stats = {
    total: MOCK_METERS.length,
    critical: MOCK_METERS.filter(m => m.status === MeterStatus.CRITICAL).length,
    warning: MOCK_METERS.filter(m => m.status === MeterStatus.WARNING).length,
    healthy: MOCK_METERS.filter(m => m.status === MeterStatus.HEALTHY).length,
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-8 bg-gradient-to-br from-[#05070a] to-[#0f172a]">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Fleet Intelligence</h2>
            <p className="text-slate-400">Monitoring 2.4k national MARRG nodes via backend bridge.</p>
          </div>
          <div className="flex gap-4">
            <button className="glass-card px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors">
              <i className="fas fa-download"></i> Export Data
            </button>
            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
              <i className="fas fa-user text-slate-400"></i>
            </div>
          </div>
        </header>

        {/* Global KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-emerald-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Total Meters</p>
            <p className="text-3xl font-mono font-bold">{stats.total}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-red-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Critical Alarms</p>
            <p className="text-3xl font-mono font-bold text-red-400">{stats.critical}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-yellow-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">Warnings</p>
            <p className="text-3xl font-mono font-bold text-yellow-400">{stats.warning}</p>
          </div>
          <div className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500">
            <p className="text-xs font-bold text-slate-500 uppercase mb-1">System Health</p>
            <p className="text-3xl font-mono font-bold text-blue-400">98.2%</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-6 mb-8 border-b border-slate-800 pb-4">
          <button 
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 font-bold transition-all relative ${activeTab === 'ALL' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            All Meters
            {activeTab === 'ALL' && <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 rounded-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('CRITICAL')}
            className={`px-4 py-2 font-bold transition-all relative ${activeTab === 'CRITICAL' ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Anomalies Detected
            {activeTab === 'CRITICAL' && <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500 rounded-full"></div>}
          </button>
        </div>

        {/* Meter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredMeters.length > 0 ? (
            filteredMeters.map(meter => (
              <MeterCard key={meter.id} meter={meter} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center glass-card rounded-3xl">
              <i className="fas fa-search text-4xl text-slate-700 mb-4"></i>
              <p className="text-slate-400">No meters found in this category.</p>
            </div>
          )}
        </div>

        {/* Bottom Alert Bar */}
        <div className="mt-12 bg-red-500/10 border border-red-500/30 p-6 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center animate-pulse">
              <i className="fas fa-exclamation-triangle text-white text-xl"></i>
            </div>
            <div>
              <h4 className="font-bold text-white">Revenue Leakage Alert</h4>
              <p className="text-slate-400 text-sm">Cluster in Ikeja showing 15% discrepancy between feeder output and meter consumption.</p>
            </div>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-bold transition-all">
            Dispatch Field Team
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;
