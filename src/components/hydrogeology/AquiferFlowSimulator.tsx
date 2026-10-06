'use client';

import React, { useState } from 'react';
import { HYDRO_SCENARIOS } from '@/lib/mock-data';
import { HydroScenario } from '@/lib/types';
import { 
  Droplets, 
  ShieldAlert, 
  CheckCircle2, 
  Layers, 
  Activity, 
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

export const AquiferFlowSimulator: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<'conductive' | 'barrier' | 'connected'>('conductive');

  const currentScenario = HYDRO_SCENARIOS.find((s) => s.id === activeScenarioId) || HYDRO_SCENARIOS[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#062D20]">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-2">
          <Droplets className="w-4 h-4" />
          <span>HYDROGEOLOGIE & IMPACT HYDRAULIQUE DES FAILLES</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Connectivité Hydrogéologique & <span className="text-gradient-emerald">Rôle des Failles</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Déterminer si les failles détectées par gravimétrie et IA agissent comme des chenaux conducteurs d'eau souterraine ou comme des écrans étanches compartimentant les aquifères.
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex flex-wrap gap-3">
        {HYDRO_SCENARIOS.map((sc) => {
          const isActive = activeScenarioId === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => setActiveScenarioId(sc.id)}
              className={`flex-1 min-w-[240px] p-4 rounded-2xl border text-left transition-all ${
                isActive
                  ? 'bg-emerald-950/90 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                  : 'bg-emerald-950/40 border-emerald-800/40 hover:bg-emerald-950/60 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-slate-100">{sc.title}</span>
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sc.color }} />
              </div>
              <p className="text-xs text-slate-400 leading-tight">{sc.subtitle}</p>
            </button>
          );
        })}
      </div>

      {/* Interactive Animated Subsurface Aquifer Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Interactive SVG Subsurface Visualization */}
        <div className="lg:col-span-7 glass-panel p-5 rounded-3xl border border-emerald-800/40 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-sm text-slate-100">Coupe Subsurface 2D & Écoulement Particulaire</h3>
            </div>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
              Scénario: {currentScenario.id.toUpperCase()}
            </span>
          </div>

          <div className="relative aspect-[16/10] w-full bg-[#03150F] rounded-2xl border border-emerald-900/60 overflow-hidden shadow-inner p-2">
            <svg viewBox="0 0 400 240" className="w-full h-full">
              <defs>
                <linearGradient id="aquiferGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E4835" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#06281E" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              {/* Surface Topography */}
              <path d="M 0,40 Q 200,30 400,45 L 400,240 L 0,240 Z" fill="#041B13" />

              {/* Aquifer Compartment A (Left side) */}
              <rect x="20" y="60" width="160" height="120" rx="8" fill="url(#aquiferGrad)" stroke="#166548" strokeWidth="1.5" />
              <text x="30" y="80" fill="#34D399" fontSize="11" fontWeight="bold">AQUIFÈRE A (Bloc Est)</text>
              <text x="30" y="95" fill="#94A3B8" fontSize="9">Nappe libre / Grès</text>

              {/* Aquifer Compartment B (Right side - down-thrown) */}
              <rect x="220" y="100" width="160" height="110" rx="8" fill="url(#aquiferGrad)" stroke="#166548" strokeWidth="1.5" />
              <text x="230" y="120" fill="#34D399" fontSize="11" fontWeight="bold">AQUIFÈRE B (Bloc Ouest)</text>
              <text x="230" y="135" fill="#94A3B8" fontSize="9">Nappe captive / Calcaire</text>

              {/* Fault Zone (Inclined central plane) */}
              <line 
                x1="175" y1="40" 
                x2="215" y2="220" 
                stroke={currentScenario.id === 'barrier' ? '#EF4444' : '#06B6D4'} 
                strokeWidth={currentScenario.id === 'barrier' ? '6' : '3'} 
                strokeDasharray={currentScenario.id === 'barrier' ? 'none' : '4 2'}
                className="animate-fault-pulse" 
              />
              <text x="165" y="32" fill="#06B6D4" fontSize="10" fontWeight="bold">Zone de Faille (60°)</text>

              {/* Piezometric Wells */}
              {/* Well 1 */}
              <line x1="80" y1="35" x2="80" y2="130" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="80" cy="35" r="4" fill="#F59E0B" />
              <text x="65" y="25" fill="#FDE68A" fontSize="8" fontWeight="bold">Forage W-01</text>

              {/* Well 2 */}
              <line x1="300" y1="42" x2="300" y2="160" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="300" cy="42" r="4" fill="#F59E0B" />
              <text x="285" y="32" fill="#FDE68A" fontSize="8" fontWeight="bold">Forage W-02</text>

              {/* Flow Particles Paths according to active scenario */}
              {activeScenarioId === 'conductive' && (
                <>
                  {/* Water particles cross fault smoothly */}
                  <path d="M 40,110 L 175,110 L 210,130 L 360,130" fill="none" stroke="#34D399" strokeWidth="2" className="animate-water-flow" />
                  <path d="M 40,140 L 180,140 L 215,160 L 360,160" fill="none" stroke="#06B6D4" strokeWidth="2" className="animate-water-flow" />
                  <text x="140" y="200" fill="#34D399" fontSize="9" fontWeight="bold">🌊 Écoulement traversant fluide</text>
                </>
              )}

              {activeScenarioId === 'barrier' && (
                <>
                  {/* Particles stop and bounce upwards along barrier */}
                  <path d="M 40,110 L 175,110 L 165,60" fill="none" stroke="#EF4444" strokeWidth="2" className="animate-water-flow" />
                  <path d="M 40,140 L 180,140 L 170,80" fill="none" stroke="#F59E0B" strokeWidth="2" className="animate-water-flow" />
                  <circle cx="180" cy="110" r="5" fill="#EF4444" opacity="0.8" />
                  <text x="140" y="200" fill="#EF4444" fontSize="9" fontWeight="bold">🛑 Blocage étanche (Saut piézométrique)</text>
                </>
              )}

              {activeScenarioId === 'connected' && (
                <>
                  {/* Ramified multi-compartment paths */}
                  <path d="M 40,110 Q 150,110 190,70 Q 250,70 360,130" fill="none" stroke="#06B6D4" strokeWidth="2" className="animate-water-flow" />
                  <path d="M 40,140 L 195,140 L 215,190 L 360,190" fill="none" stroke="#34D399" strokeWidth="2" className="animate-water-flow" />
                  <text x="140" y="200" fill="#06B6D4" fontSize="9" fontWeight="bold">🔀 Réseau connecté multi-nappes</text>
                </>
              )}
            </svg>
          </div>
        </div>

        {/* Right Scientific Details Panel */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-emerald-800/40 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
            <h3 className="font-bold text-base text-slate-100">{currentScenario.title}</h3>
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentScenario.color }} />
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">{currentScenario.description}</p>

          <div className="space-y-3 text-xs pt-2">
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40 space-y-1">
              <div className="font-bold text-emerald-300">Effet Piézométrique:</div>
              <div className="text-slate-300">{currentScenario.piezometricEffect}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-800/40 space-y-1">
              <div className="font-bold text-cyan-300">Signature Hydrochimique & Salinité:</div>
              <div className="text-slate-300">{currentScenario.hydrochemistryEffect}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/60 border border-amber-800/40 space-y-1">
              <div className="font-bold text-amber-300">Comportement des Particules d'Eau:</div>
              <div className="text-slate-300">{currentScenario.flowBehavior}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
