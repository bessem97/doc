'use client';

import React, { useState } from 'react';
import { MOCK_TUNISIAN_WELLS } from '@/lib/mock-data';
import { 
  MapPin, 
  Layers, 
  Database, 
  CheckCircle2, 
  Info, 
  Sparkles,
  FileCode2,
  ExternalLink
} from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

export const TunisianCaseStudyView: React.FC = () => {
  const [activeLayers, setActiveLayers] = useState<{
    bouguer: boolean;
    faultProb: boolean;
    knownFaults: boolean;
    wells: boolean;
    piezo: boolean;
  }>({
    bouguer: true,
    faultProb: true,
    knownFaults: true,
    wells: true,
    piezo: false
  });

  const toggleLayer = (key: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#072E20]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <DataBadge type="REAL" label="PARTIE B — CAS RÉEL TERRAIN TUNISIEN" />
          <span className="text-xs font-mono text-emerald-400">Application Thèse</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Application au Cas Réel <span className="text-gradient-emerald">Tunisien</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Application de la méthodologie d'IA sur une plaine structurée tunisienne bénéficiant de couvert gravimétrique haute résolution et de coupes de forages d'étalonnage.
        </p>
      </div>

      {/* Main Map GIS Interactive Demonstrator Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Layer Controls */}
        <div className="lg:col-span-4 glass-panel p-5 rounded-3xl border border-emerald-800/40 space-y-4">
          <div className="border-b border-emerald-900/50 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Couches SIG / GeoJSON Prêtes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Sélectionnez les calques géophysiques</p>
          </div>

          <div className="space-y-2 text-xs font-medium">
            <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 cursor-pointer hover:bg-emerald-900/50">
              <div className="flex items-center gap-2 text-emerald-300">
                <input
                  type="checkbox"
                  checked={activeLayers.bouguer}
                  onChange={() => toggleLayer('bouguer')}
                  className="accent-emerald-400 rounded"
                />
                <span>Anomalie de Bouguer</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">GeoTIFF</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 cursor-pointer hover:bg-emerald-900/50">
              <div className="flex items-center gap-2 text-cyan-300">
                <input
                  type="checkbox"
                  checked={activeLayers.faultProb}
                  onChange={() => toggleLayer('faultProb')}
                  className="accent-cyan-400 rounded"
                />
                <span>Prédictions Probabilistes IA</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Random Forest</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 cursor-pointer hover:bg-emerald-900/50">
              <div className="flex items-center gap-2 text-amber-300">
                <input
                  type="checkbox"
                  checked={activeLayers.knownFaults}
                  onChange={() => toggleLayer('knownFaults')}
                  className="accent-amber-400 rounded"
                />
                <span>Failles Cartographiées (Terrain)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">GeoJSON</span>
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/40 cursor-pointer hover:bg-emerald-900/50">
              <div className="flex items-center gap-2 text-emerald-400">
                <input
                  type="checkbox"
                  checked={activeLayers.wells}
                  onChange={() => toggleLayer('wells')}
                  className="accent-emerald-400 rounded"
                />
                <span>Puits & Forages (Piezométrie)</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">CSV / Points</span>
            </label>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 text-[11px] text-slate-300 space-y-1">
            <div className="font-semibold text-emerald-400 flex items-center gap-1">
              <Info className="w-3.5 h-3.5" /> Architecture Données Réelles
            </div>
            <p>
              Prêt pour l'intégration directe des fichiers de pesées gravimétriques réelles de Tunisie (Formats raster GeoTIFF, shapefiles et CSV).
            </p>
          </div>
        </div>

        {/* Right Map Rendering Container */}
        <div className="lg:col-span-8 glass-panel p-5 rounded-3xl border border-emerald-800/40 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
            <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              Zone d'Étude Tunisienne — Démonstrateur Cartographique
            </h3>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800/50">
              Coordonnées: 36.4° N, 9.8° E
            </span>
          </div>

          {/* Interactive Styled Map Viewport */}
          <div className="relative aspect-[16/10] w-full bg-[#02130D] rounded-2xl border border-emerald-900/60 overflow-hidden shadow-inner flex flex-col justify-between p-4">
            {/* Map Grid SVG */}
            <svg viewBox="0 0 400 240" className="w-full h-full absolute inset-0 opacity-80">
              {/* Background Topography contours */}
              <path d="M 0,80 Q 120,40 240,100 T 400,60" fill="none" stroke="#0E4835" strokeWidth="1" />
              <path d="M 0,140 Q 180,110 300,160 T 400,120" fill="none" stroke="#0E4835" strokeWidth="1" />

              {/* Bouguer Anomaly Layer */}
              {activeLayers.bouguer && (
                <g opacity="0.4">
                  <circle cx="140" cy="110" r="70" fill="#06B6D4" filter="blur(20px)" />
                  <circle cx="280" cy="150" r="90" fill="#10B981" filter="blur(25px)" />
                </g>
              )}

              {/* Fault Probability Layer */}
              {activeLayers.faultProb && (
                <path d="M 120,20 C 140,80 180,140 210,220" fill="none" stroke="#34D399" strokeWidth="4" strokeDasharray="6 3" className="animate-fault-pulse" />
              )}

              {/* Known Geological Faults Layer */}
              {activeLayers.knownFaults && (
                <path d="M 110,30 C 135,85 170,130 200,210" fill="none" stroke="#F59E0B" strokeWidth="2" />
              )}

              {/* Wells Layer */}
              {activeLayers.wells && MOCK_TUNISIAN_WELLS.map((w, idx) => {
                const cx = 100 + idx * 110;
                const cy = 80 + idx * 40;
                return (
                  <g key={w.id}>
                    <circle cx={cx} cy={cy} r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text x={cx + 10} y={cy + 4} fill="#F1F5F9" fontSize="9" fontWeight="bold" fontFamily="monospace">
                      {w.name} ({w.piezoHead}m)
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend Overlay */}
            <div className="relative z-10 self-start glass-panel p-2.5 rounded-xl border border-emerald-800/50 text-[10px] space-y-1 font-mono">
              <div className="font-bold text-slate-200">LÉGENDE CARTE TUNISIENNE</div>
              <div className="flex items-center gap-1.5 text-emerald-300">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Axe de faille détecté par IA
              </div>
              <div className="flex items-center gap-1.5 text-amber-300">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" /> Faille géologique affleurante
              </div>
              <div className="flex items-center gap-1.5 text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Forage d'étalonnage
              </div>
            </div>

            {/* Integration Notice */}
            <div className="relative z-10 self-end bg-emerald-950/80 p-2 rounded-lg border border-emerald-800/60 text-[10px] text-emerald-300 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Données réelles de terrain prêtes pour le branchement API
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
