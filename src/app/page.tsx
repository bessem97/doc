'use client';

import React from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/hero/HeroSection';
import { 
  Box, 
  BrainCircuit, 
  Droplets, 
  Map, 
  ArrowRight, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  Database
} from 'lucide-react';
import { DataBadge } from '@/components/ui/DataBadge';

export default function OverviewPage() {
  return (
    <div className="space-y-10 pb-12">
      {/* Spectacular Scientific Hero Section */}
      <HeroSection />

      {/* Part A vs Part B Research Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Part A: Synthetic Model */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-[#06241A] to-[#041B13] space-y-4">
          <div className="flex items-center justify-between">
            <DataBadge type="SYNTHETIC" label="PARTIE A — MODÈLE SYNTHÉTIQUE 3D" />
            <span className="text-xs text-emerald-400 font-mono">Partie I</span>
          </div>

          <h3 className="text-xl font-bold text-slate-100">
            Modélisation Gravimétrique 3D & Entraînement IA
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Construire des modèles synthétiques représentant des bassins aquifères faillés. Varier la géométrie des failles (pendage 10°-85°, rejet, profondeur 50-1500m, bruit gaussien 0-0.2 mGal) et générer les réponses gravimétriques pour entraîner les classificateurs Random Forest & XGBoost.
          </p>

          <Link
            href="/simulation"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-all"
          >
            <span>Explorer la simulation 3D</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Part B: Real Tunisian Case Study */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-800/40 bg-gradient-to-br from-[#06241A] to-[#041B13] space-y-4">
          <div className="flex items-center justify-between">
            <DataBadge type="REAL" label="PARTIE B — CAS RÉEL TUNISIEN" />
            <span className="text-xs text-emerald-400 font-mono">Partie II</span>
          </div>

          <h3 className="text-xl font-bold text-slate-100">
            Application à une Plaine Structurée en Tunisie
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Appliquer la méthodologie validée sur des données gravimétriques réelles (Anomalie de Bouguer, filtres spectraux THDR, VDR, Tilt Angle, Carte Theta). Comparer les prédictions d'IA avec les coupes géologiques, forages piézométriques et données hydrochimiques.
          </p>

          <Link
            href="/case-study"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/40 transition-all"
          >
            <span>Voir le cas d'étude tunisien</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Pillars of Research */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Les 4 Piliers Fondamentaux du Projet
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glass-panel p-5 rounded-2xl border border-emerald-800/40 space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">1. Géophysique Gravimétrique</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Filtres d'anomalie de Bouguer, gradient horizontal THDR, dérivée verticale FFT VDR et Angle Tilt.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-800/40 space-y-2">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 w-fit">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">2. Intelligence Artificielle</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Classificateurs supervisés Random Forest & XGBoost pour cartographier les linéaments sous couverture.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-800/40 space-y-2">
            <div className="glass-panel p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 w-fit">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">3. Connectivité Aquifère</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Caractérisation hydraulique: distinction entre drains conducteurs et barrières étanches.
            </p>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-emerald-800/40 space-y-2">
            <div className="glass-panel p-2.5 rounded-xl bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 w-fit">
              <Database className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">4. Calibration Terrain</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Validation par coupes de forages, saut piézométrique et salinité TDS en Tunisie.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
