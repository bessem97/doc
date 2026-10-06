'use client';

import React from 'react';
import { RESEARCH_ROADMAP_PHASES } from '@/lib/mock-data';
import { 
  Milestone, 
  Clock, 
  BookOpen, 
  ExternalLink
} from 'lucide-react';

export const ResearchRoadmapView: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#072E20]">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
          <Milestone className="w-4 h-4" />
          <span>FEUILLE DE ROUTE — THÈSE DE DOCTORAT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Feuille de Route & <span className="text-gradient-emerald">Planning Scientifique</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Chronologie des 8 phases majeures du projet de doctorat mené par Samar Khlifi sous la direction du Dr. Hakim Gabtni.
        </p>
      </div>

      {/* Animated 8-Phase Timeline */}
      <div className="space-y-6 relative before:absolute before:left-4 sm:before:left-1/2 before:top-4 before:bottom-4 before:w-0.5 before:bg-emerald-800/40">
        {RESEARCH_ROADMAP_PHASES.map((m, idx) => {
          const isCompleted = m.status === 'COMPLETED';
          const isInProgress = m.status === 'IN_PROGRESS';
          const isEven = idx % 2 === 0;

          const badgeStyle = isCompleted
            ? 'border-emerald-400 text-emerald-400 shadow-md shadow-emerald-500/30'
            : isInProgress
            ? 'border-cyan-400 text-cyan-400 animate-pulse'
            : 'border-slate-700 text-slate-500';

          return (
            <div
              key={m.phase}
              className={`relative flex flex-col sm:flex-row items-start ${
                isEven ? 'sm:flex-row-reverse' : ''
              } gap-6 group`}
            >
              {/* Timeline Center Badge Node */}
              <div className={`absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 w-8 h-8 rounded-full bg-[#041D14] border-2 flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${badgeStyle}`}>
                <span className="text-xs font-bold font-mono">{m.phase}</span>
              </div>

              {/* Card Container */}
              <div className="ml-10 sm:ml-0 sm:w-1/2 px-2">
                <div className={`glass-panel p-5 rounded-2xl border transition-all ${
                  isInProgress
                    ? 'border-cyan-500/50 bg-cyan-950/30 shadow-lg shadow-cyan-500/10'
                    : isCompleted
                    ? 'border-emerald-800/50 bg-emerald-950/40'
                    : 'border-emerald-900/30 bg-[#041610]/60 opacity-80'
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isCompleted
                        ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-600'
                        : isInProgress
                        ? 'bg-cyan-900/80 text-cyan-300 border border-cyan-600'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isCompleted ? 'Terminé' : isInProgress ? 'En cours' : 'Planifié'}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {m.duration}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-100">{m.title}</h3>
                  <p className="text-xs text-emerald-400 font-medium mb-3">{m.subtitle}</p>

                  <div className="p-3 rounded-xl bg-[#03140E] border border-emerald-900/50 space-y-1.5 text-xs text-slate-300">
                    <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Livrables clés:</div>
                    <ul className="space-y-1 text-[11px]">
                      {m.deliverables.map((d, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* References Section (Requirement #23) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-[#06241A]/70 space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          Référence Bibliographique Internationale Majeure
        </h2>

        <div className="p-5 rounded-2xl bg-emerald-950/80 border border-emerald-700/50 space-y-3 text-xs">
          <div className="font-semibold text-slate-100 leading-relaxed text-sm">
            Yang, H., Xiao, F., Jia, H., Zhou, Y., & Jiang, S. (2026).
          </div>
          <div className="text-emerald-300 font-medium italic text-sm">
            "Automated fault interpretation from gravity and magnetic data in covered areas using machine learning: A case study of the Eastern Tianshan orogenic belt."
          </div>
          <div className="text-slate-400">
            Journal of Applied Geophysics, 245, 106040.
          </div>

          <div className="pt-2 border-t border-emerald-800/50 flex items-center justify-between">
            <span className="text-emerald-400 font-mono text-[11px]">DOI: 10.1016/j.jappgeo.2025.106040</span>
            <a
              href="https://doi.org/10.1016/j.jappgeo.2025.106040"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
            >
              <span>Accéder à la publication (DOI)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
