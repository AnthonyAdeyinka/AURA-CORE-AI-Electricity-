
import React, { useState, useEffect } from 'react';
import { MeterData, MeterStatus } from '../types';
import { analyzeMeterAnomaly } from '../services/geminiService';
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from 'recharts';

interface MeterCardProps {
  meter: MeterData;
}

const MeterCard: React.FC<MeterCardProps> = ({ meter }) => {
  const [aiAnalysis, setAiAnalysis] = useState<string>('Generating AI insight...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      const result = await analyzeMeterAnomaly(meter);
      setAiAnalysis(result);
      setLoading(false);
    };
    fetchAnalysis();
  }, [meter]);

  const getStatusColor = (status: MeterStatus) => {
    switch (status) {
      case MeterStatus.HEALTHY: return 'text-green-400 border-green-400';
      case MeterStatus.WARNING: return 'text-yellow-400 border-yellow-400';
      case MeterStatus.CRITICAL: return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const chartData = meter.loadSignature.map((val, idx) => ({ time: idx, load: val }));

  return (
    <div className="glass-card p-6 rounded-2xl transition-all hover:scale-[1.01]">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{meter.id}</h3>
          <p className="text-sm text-slate-400">{meter.location} • {meter.manufacturer}</p>
        </div>
        <span className={`px-3 py-1 rounded-full border text-xs font-bold uppercase ${getStatusColor(meter.status)}`}>
          {meter.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-slate-800/50 p-3 rounded-xl">
          <p className="text-xs text-slate-500 uppercase">Balance</p>
          <p className="text-xl font-mono text-emerald-400">{meter.remainingCredit} <span className="text-sm">kWh</span></p>
        </div>
        <div className="bg-slate-800/50 p-3 rounded-xl">
          <p className="text-xs text-slate-500 uppercase">Expected Depletion</p>
          <p className="text-xl font-mono text-blue-400">{new Date(meter.predictionDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="h-24 w-full mb-6">
        <p className="text-xs text-slate-500 mb-2">Load Signature (24h Capture)</p>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="load" stroke="#10b981" strokeWidth={2} dot={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-xl relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <i className="fas fa-robot text-indigo-400"></i>
          <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Aura Intelligence</span>
        </div>
        {loading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-3 bg-indigo-500/20 rounded w-full"></div>
            <div className="h-3 bg-indigo-500/20 rounded w-2/3"></div>
          </div>
        ) : (
          <p className="text-sm text-slate-300 leading-relaxed italic">
            "{aiAnalysis}"
          </p>
        )}
      </div>
    </div>
  );
};

export default MeterCard;
