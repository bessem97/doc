'use client';

import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid,
  Legend
} from 'recharts';
import { 
  BarChart3, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  TrendingUp, 
  Activity,
  Layers
} from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

const ROC_CURVE_DATA = [
  { fpr: 0.0, tpr: 0.0 },
  { fpr: 0.02, tpr: 0.35 },
  { fpr: 0.05, tpr: 0.68 },
  { fpr: 0.10, tpr: 0.84 },
  { fpr: 0.15, tpr: 0.91 },
  { fpr: 0.25, tpr: 0.95 },
  { fpr: 0.40, tpr: 0.97 },
  { fpr: 1.0, tpr: 1.0 }
];

const FEATURE_IMPORTANCE_DATA = [
  { name: 'THDR', importance: 34.2 },
  { name: 'Tilt Angle', importance: 22.8 },
  { name: 'VDR', importance: 18.5 },
  { name: 'Theta Map', importance: 12.1 },
  { name: 'dG / dX', importance: 6.4 },
  { name: 'dG / dY', importance: 3.8 },
  { name: 'g (Bouguer)', importance: 2.2 }
];

export const ScientificResultsView: React.FC = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#072E20]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <DataBadge type="SYNTHETIC" label="RÉSULTATS SYNTHÉTIQUES D'ÉVALUATION" />
          <span className="text-xs font-mono text-emerald-400">Random Forest Benchmark</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Résultats & <span className="text-gradient-emerald">Performances IA</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Évaluation des métriques de détection de faille (ROC-AUC, Précision, Rappel) et analyse d'importance de la contribution des attributs gravimétriques.
        </p>
      </div>

      {/* Distinction Notice (Requirement #29) */}
      <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-100">Avertissement de Rigueur Scientifique:</span> Les résultats présentés ci-dessous correspondent aux performances obtenues sur le modèle synthétique 3D (Partie A). Les résultats sur le cas réel tunisien (Partie B) sont en cours d'intégration et seront calculés après calibration finale des pesées gravimétriques de terrain.
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Score ROC-AUC</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">0.942</div>
          <div className="text-[10px] text-emerald-300/80">Excellente discrimination</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Précision</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">91.8%</div>
          <div className="text-[10px] text-cyan-300/80">Faible taux de faux positifs</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Rappel (Recall)</div>
          <div className="text-2xl font-bold text-emerald-300 font-mono">90.5%</div>
          <div className="text-[10px] text-slate-400">Détection continue</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">F1-Score</div>
          <div className="text-2xl font-bold text-amber-300 font-mono">0.911</div>
          <div className="text-[10px] text-amber-300/80">Équilibre optimal</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Longueur Faille</div>
          <div className="text-2xl font-bold text-slate-100 font-mono">20.0 km</div>
          <div className="text-[10px] text-slate-400">Continuité restituée</div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 space-y-1">
          <div className="text-[10px] text-slate-400 font-medium">Zones Connectées</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">3 Zones</div>
          <div className="text-[10px] text-emerald-300/80">Compartiments isolés</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ROC Curve Chart */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-3xl border border-emerald-800/40 space-y-4">
          <div className="border-b border-emerald-900/50 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Courbe ROC (Receiver Operating Characteristic)
            </h3>
            <span className="text-xs font-mono text-emerald-400">AUC = 0.942</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ROC_CURVE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#0E4835" />
                <XAxis dataKey="fpr" stroke="#94A3B8" fontSize={10} label={{ value: 'Taux Faux Positifs (FPR)', position: 'insideBottom', offset: -5, fill: '#94A3B8', fontSize: 10 }} />
                <YAxis stroke="#94A3B8" fontSize={10} label={{ value: 'Taux Vrais Positifs (TPR)', angle: -90, position: 'insideLeft', fill: '#94A3B8', fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: '#041B13', borderColor: '#166548', borderRadius: '8px', color: '#F1F5F9', fontSize: '11px' }} />
                <Line type="monotone" dataKey="tpr" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#34D399' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature Importance Bar Chart */}
        <div className="lg:col-span-6 glass-panel p-5 rounded-3xl border border-emerald-800/40 space-y-4">
          <div className="border-b border-emerald-900/50 pb-3 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Importance Relative des Attributs Gravimétriques (%)
            </h3>
            <span className="text-xs font-mono text-cyan-300">Gini Importance</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FEATURE_IMPORTANCE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#0E4835" />
                <XAxis type="number" stroke="#94A3B8" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#94A3B8" fontSize={10} width={80} />
                <Tooltip contentStyle={{ backgroundColor: '#041B13', borderColor: '#166548', borderRadius: '8px', color: '#F1F5F9', fontSize: '11px' }} />
                <Bar dataKey="importance" fill="#06B6D4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
