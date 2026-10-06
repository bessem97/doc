import React from 'react';
import { DataTypeTag } from '@/lib/types';
import { Database, Cpu, Sparkles } from 'lucide-react';

interface DataBadgeProps {
  type: DataTypeTag;
  label?: string;
  className?: string;
}

export const DataBadge: React.FC<DataBadgeProps> = ({ type, label, className = '' }) => {
  if (type === 'REAL') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 shadow-sm ${className}`}>
        <Database className="w-3.5 h-3.5 text-emerald-400" />
        {label || 'DONNÉES RÉELLES TERRAIN'}
      </span>
    );
  }

  if (type === 'SYNTHETIC') {
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm ${className}`}>
        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
        {label || 'MODÈLE SYNTHÉTIQUE 3D'}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-500/40 shadow-sm ${className}`}>
      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
      {label || 'DÉMO PROTOTYPE'}
    </span>
  );
};
