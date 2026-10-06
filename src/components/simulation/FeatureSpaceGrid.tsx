'use client';

import React from 'react';
import { GEOPHYSICAL_ATTRIBUTES_INFO } from '@/lib/simulation-engine';
import { AttributeType } from '@/lib/types';
import { Sparkles, BrainCircuit, Activity } from 'lucide-react';

interface FeatureSpaceGridProps {
  activeAttribute?: AttributeType;
  onSelectAttribute?: (attr: AttributeType) => void;
}

export const FeatureSpaceGrid: React.FC<FeatureSpaceGridProps> = ({
  activeAttribute,
  onSelectAttribute
}) => {
  return (
    <div className="space-y-4 my-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-emerald-400" />
          Espace de Caractéristiques IA (7 Attributs Gravimétriques)
        </h3>
        <span className="text-xs text-emerald-400 font-mono">Features = [g, dG/dX, dG/dY, VDR, THDR, Tilt, Theta]</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {GEOPHYSICAL_ATTRIBUTES_INFO.map((attr) => {
          const isSelected = activeAttribute === attr.id;

          return (
            <div
              key={attr.id}
              onClick={() => onSelectAttribute && (attr.id === 'g' || attr.id === 'thdr' || attr.id === 'vdr' || attr.id === 'tilt' || attr.id === 'theta') && onSelectAttribute(attr.id as AttributeType)}
              className={`glass-panel p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'border-emerald-400 bg-emerald-950/90 shadow-lg shadow-emerald-500/20'
                  : 'border-emerald-800/40 hover:border-emerald-500/50 hover:bg-emerald-950/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-extrabold text-sm text-emerald-400 font-mono">{attr.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-slate-300 font-mono border border-emerald-800/50">
                  {attr.unit}
                </span>
              </div>

              <h4 className="text-xs font-bold text-slate-200 mb-1">{attr.fullName}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{attr.definition}</p>

              <div className="pt-2 border-t border-emerald-900/50 text-[10px] space-y-1">
                <div className="text-emerald-300 font-medium">Rôle IA: {attr.role}</div>
                <div className="text-slate-400 font-mono">Exemple: <span className="text-cyan-300">{attr.exampleValue}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
