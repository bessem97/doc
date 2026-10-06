'use client';

import React from 'react';
import Link from 'next/link';
import { ThreeGeologyHero } from './ThreeGeologyHero';
import { 
  ArrowRight, 
  Box, 
  BrainCircuit, 
  Compass, 
  Sparkles, 
  Activity, 
  Zap, 
  Layers, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-b from-[#041D14] via-[#072E20] to-[#041610] text-slate-100 overflow-hidden rounded-3xl border border-emerald-900/50 my-2 p-6 sm:p-8 md:p-10 shadow-2xl">
      {/* Background Grid & Spotlights */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* 10-Second Scientific Story visual transformation strip */}
      <div className="relative z-10 mb-8 p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/40 backdrop-blur-md overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[700px] text-[11px] font-medium text-emerald-300">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-500/30">
            <span className="font-bold text-slate-100">GÉOLOGIE</span>
          </div>
          <span className="text-emerald-500">➔</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-500/30">
            <span className="font-bold text-slate-100">FAILLES</span>
          </div>
          <span className="text-emerald-500">➔</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-500/30">
            <span className="font-bold text-emerald-400">GRAVIMÉTRIE</span>
          </div>
          <span className="text-emerald-500">➔</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-500/30">
            <span className="font-bold text-emerald-300">ATTRIBUTS (THDR, VDR)</span>
          </div>
          <span className="text-emerald-500">➔</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-cyan-900/60 border border-cyan-500/30">
            <span className="font-bold text-cyan-300">MACHINE LEARNING</span>
          </div>
          <span className="text-cyan-500">➔</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-900/60 border border-amber-500/30">
            <span className="font-bold text-amber-300">CONNECTIVITÉ AQUIFÈRE</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <DataBadge type="SYNTHETIC" label="RERESEARCH DEMONSTRATOR 3D" />
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-900/50 text-emerald-300 border border-emerald-500/30">
              Doctorat Samar Khlifi
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-100 leading-tight">
              Failles & Connectivité <span className="text-gradient-emerald">Aquifère</span>
            </h1>
            <h2 className="text-base sm:text-lg font-semibold text-emerald-400">
              Caractérisation géophysique automatisée par Intelligence Artificielle
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-mono">
              AI-driven geophysical fault characterization and aquifer connectivity
            </p>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            De la simulation gravimétrique 3D à la caractérisation hydrogéologique des structures de faille. Une approche novatrice combinant le forward modelling gravimétrique, les filtres dérivés multi-échelles (THDR, VDR, Tilt) et le Machine Learning.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/simulation"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105"
            >
              <Box className="w-4 h-4" />
              <span>Voir la simulation 3D</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/idea"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 shadow-md transition-all hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>Explorer le projet</span>
            </Link>

            <Link
              href="/ai-methodology"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-xs sm:text-sm text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
              <span>Méthodologie IA</span>
            </Link>
          </div>

          {/* Floating Key Metrics Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-emerald-900/50">
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
              <div className="text-[10px] text-slate-400 font-medium">Anomalie g</div>
              <div className="text-sm font-bold text-emerald-300 mt-0.5">+12.4 mGal</div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
              <div className="text-[10px] text-slate-400 font-medium">Probabilité IA</div>
              <div className="text-sm font-bold text-cyan-300 mt-0.5">87.3%</div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
              <div className="text-[10px] text-slate-400 font-medium">Connectivité</div>
              <div className="text-sm font-bold text-emerald-400 mt-0.5">Conductrice</div>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/40">
              <div className="text-[10px] text-slate-400 font-medium">Modèle IA</div>
              <div className="text-sm font-bold text-amber-300 mt-0.5">Random Forest</div>
            </div>
          </div>
        </div>

        {/* Right 3D Scene Column */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div className="w-full max-w-lg aspect-square glass-panel rounded-3xl p-3 border border-emerald-500/30 shadow-2xl overflow-hidden">
            <ThreeGeologyHero />
          </div>
        </div>
      </div>
    </section>
  );
};
