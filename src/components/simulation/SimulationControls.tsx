'use client';

import React from 'react';
import { SimulationParameters } from '@/lib/types';
import { Sliders, RotateCcw, Info } from 'lucide-react';

interface SimulationControlsProps {
  params: SimulationParameters;
  onChange: (newParams: SimulationParameters) => void;
  onReset: () => void;
}

export const SimulationControls: React.FC<SimulationControlsProps> = ({
  params,
  onChange,
  onReset
}) => {
  const updateParam = (key: keyof SimulationParameters, value: number) => {
    onChange({
      ...params,
      [key]: value
    });
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-emerald-800/40 space-y-4">
      <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-sm text-slate-100">Panneau de Contrôle Scientifique 3D</h3>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-slate-300 text-xs border border-emerald-800/40 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-emerald-400" /> Réinitialiser
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        {/* Dip angle */}
        <div className="space-y-1 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
          <div className="flex justify-between font-semibold text-slate-200">
            <span>Pendage faille (dip_deg)</span>
            <span className="text-emerald-400 font-mono">{params.dip_deg}°</span>
          </div>
          <input
            type="range"
            min="10"
            max="85"
            value={params.dip_deg}
            onChange={(e) => updateParam('dip_deg', Number(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
          />
        </div>

        {/* Density Contrast */}
        <div className="space-y-1 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
          <div className="flex justify-between font-semibold text-slate-200">
            <span>Contraste de densité (rho)</span>
            <span className="text-emerald-400 font-mono">{params.rho} kg/m³</span>
          </div>
          <input
            type="range"
            min="50"
            max="800"
            step="10"
            value={params.rho}
            onChange={(e) => updateParam('rho', Number(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
          />
        </div>

        {/* Fault Position X0 */}
        <div className="space-y-1 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
          <div className="flex justify-between font-semibold text-slate-200">
            <span>Position faille (fault_x0)</span>
            <span className="text-emerald-400 font-mono">{(params.fault_x0 / 1000).toFixed(1)} km</span>
          </div>
          <input
            type="range"
            min="-5000"
            max="5000"
            step="250"
            value={params.fault_x0}
            onChange={(e) => updateParam('fault_x0', Number(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
          />
        </div>

        {/* Top Depth z_top */}
        <div className="space-y-1 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
          <div className="flex justify-between font-semibold text-slate-200">
            <span>Profondeur toit (z_top)</span>
            <span className="text-emerald-400 font-mono">{params.z_top} m</span>
          </div>
          <input
            type="range"
            min="50"
            max="1500"
            step="25"
            value={params.z_top}
            onChange={(e) => updateParam('z_top', Number(e.target.value))}
            className="w-full accent-emerald-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
          />
        </div>

        {/* Bruit Gravimétrique noise_mgal */}
        <div className="space-y-1 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
          <div className="flex justify-between font-semibold text-slate-200">
            <span>Bruit de mesure (noise_mgal)</span>
            <span className="text-cyan-400 font-mono">{params.noise_mgal} mGal</span>
          </div>
          <input
            type="range"
            min="0"
            max="0.2"
            step="0.01"
            value={params.noise_mgal}
            onChange={(e) => updateParam('noise_mgal', Number(e.target.value))}
            className="w-full accent-cyan-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
          />
        </div>

        {/* Voxel cell size */}
        <div className="space-y-1 bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/40">
          <div className="flex justify-between font-semibold text-slate-200">
            <span>Taille Voxel (cell)</span>
            <span className="text-amber-300 font-mono">{params.cell} m</span>
          </div>
          <input
            type="range"
            min="25"
            max="250"
            step="25"
            value={params.cell}
            onChange={(e) => updateParam('cell', Number(e.target.value))}
            className="w-full accent-amber-400 h-1.5 bg-emerald-950 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
