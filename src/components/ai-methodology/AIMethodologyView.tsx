'use client';

import React, { useState } from 'react';
import { ML_MODELS_COMPARISON } from '@/lib/mock-data';
import { 
  BrainCircuit, 
  Sparkles, 
  CheckCircle2, 
  BarChart3, 
  Zap, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

export const AIMethodologyView: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('Random Forest');

  const PIPELINE_NODES = [
    { id: 1, title: 'Attributs (Features)', desc: '[g, dG/dX, dG/dY, VDR, THDR, Tilt, Theta]', color: 'border-emerald-500 text-emerald-300' },
    { id: 2, title: 'Entraînement (Training)', desc: 'Fit sur 80% des grilles synthétiques voxels', color: 'border-cyan-500 text-cyan-300' },
    { id: 3, title: 'Validation', desc: 'Cross-validation K-Fold & courbe ROC-AUC', color: 'border-amber-500 text-amber-300' },
    { id: 4, title: 'Prédiction', desc: 'Inférence sur grilles inconnues', color: 'border-blue-500 text-blue-300' },
    { id: 5, title: 'Carte Probabiliste', desc: 'Grille 2D continue p(x,y) in [0, 1]', color: 'border-emerald-400 text-emerald-300' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#072E20]">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
          <BrainCircuit className="w-4 h-4" />
          <span>MÉTHODOLOGIE APPRENTISSAGE AUTOMATIQUE (IA)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Intelligence Artificielle & <span className="text-gradient-emerald">Machine Learning</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Comparaison rigoureuse des modèles supervisés (Random Forest, XGBoost, CNN 2D) pour l'extraction automatique des linéaments de faille sous couverture géologique.
        </p>
      </div>

      {/* Animated AI Pipeline Diagram (Requirement #18) */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-800/40 bg-[#06241A]/70 space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          Chaîne de Traitement du Classificateur IA
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-center">
          {PIPELINE_NODES.map((node, idx) => (
            <React.Fragment key={node.id}>
              <div className={`p-4 rounded-2xl bg-emerald-950/80 border ${node.color} shadow-md space-y-1`}>
                <div className="text-[10px] font-mono font-bold text-slate-400">ÉTAPE 0{node.id}</div>
                <div className="font-bold text-xs">{node.title}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{node.desc}</div>
              </div>
              {idx < PIPELINE_NODES.length - 1 && (
                <div className="hidden sm:flex justify-center text-emerald-500">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Comparative Table of ML Models (Requirement #18) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          Tableau Comparatif des Modèles d'IA
        </h2>

        <div className="glass-panel rounded-2xl border border-emerald-800/40 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#051C14] text-emerald-300 font-mono text-[11px] uppercase border-b border-emerald-800/50">
                <tr>
                  <th className="p-4">Modèle IA</th>
                  <th className="p-4">ROC-AUC</th>
                  <th className="p-4">Précision / F1</th>
                  <th className="p-4">Points Forts</th>
                  <th className="p-4">Limites / Faiblesses</th>
                  <th className="p-4">Interprétabilité</th>
                  <th className="p-4">Cas d'usage recommandé</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/40 bg-[#03150F] text-slate-300">
                {ML_MODELS_COMPARISON.map((m) => (
                  <tr key={m.name} className="hover:bg-emerald-950/50 transition-colors">
                    <td className="p-4 font-bold text-slate-100 flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-emerald-400" />
                      {m.name}
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-300 text-sm">{m.auc}</td>
                    <td className="p-4 font-mono text-cyan-300">{m.precision} / {m.f1}</td>
                    <td className="p-4 max-w-xs">{m.strength}</td>
                    <td className="p-4 max-w-xs text-slate-400">{m.weakness}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                        m.interpretability === 'Haute'
                          ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                          : m.interpretability === 'Moyenne'
                          ? 'bg-cyan-900/80 text-cyan-300 border border-cyan-600'
                          : 'bg-amber-900/80 text-amber-300 border border-amber-600'
                      }`}>
                        {m.interpretability}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-200">{m.useCase}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
