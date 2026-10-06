'use client';

import React, { useState, useMemo } from 'react';
import { SimulationParameters, AttributeType } from '@/lib/types';
import { generateSyntheticGravityData } from '@/lib/simulation-engine';
import { ThreeGeologyHero } from '../hero/ThreeGeologyHero';
import { GravityHeatmap2D } from './GravityHeatmap2D';
import { SimulationControls } from './SimulationControls';
import { FeatureSpaceGrid } from './FeatureSpaceGrid';
import { PythonColabRunner } from './PythonColabRunner';
import { Box, Layers, Activity, Sliders, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

const DEFAULT_PARAMS: SimulationParameters = {
  fault_x0: 0,
  dip_deg: 60,
  rho: 350,
  z_top: 200,
  z_bottom: 1500,
  x_half: 3000,
  y_half: 3000,
  cell: 100,
  noise_mgal: 0.04,
  seed: 42
};

export const SyntheticSimulationView: React.FC = () => {
  const [params, setParams] = useState<SimulationParameters>(DEFAULT_PARAMS);
  const [activeLayer, setActiveLayer] = useState<AttributeType>('g');
  const [activePipelineStep, setActivePipelineStep] = useState<number>(1);

  // Generate synthetic gravity data dynamically based on parameter state
  const simulationData = useMemo(() => {
    return generateSyntheticGravityData(params, 33);
  }, [params]);

  const PIPELINE_STEPS = [
    { id: 1, name: 'PARAMÈTRES' },
    { id: 2, name: 'MODÈLE 3D' },
    { id: 3, name: 'VOXELS' },
    { id: 4, name: 'FORWARD MODEL' },
    { id: 5, name: 'ANOMALIE g' },
    { id: 6, name: 'ATTRIBUTS FFT' },
    { id: 7, name: 'MACHINE LEARNING' },
    { id: 8, name: 'CARTE PROBABILISTE' }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] via-[#072E20] to-[#041610]">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <DataBadge type="SYNTHETIC" label="PARTIE A — MODÈLE SYNTHÉTIQUE 3D" />
          <span className="text-xs font-mono text-emerald-400">Doctorat Samar Khlifi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          Simulation Gravimétrique <span className="text-gradient-emerald">3D</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Construire un monde géologique contrôlé avec variabilité de pendage, rejet, profondeur et bruit pour entraîner et valider les algorithmes d'Intelligence Artificielle.
        </p>
      </div>

      {/* Horizontal Interactive Pipeline Banner (Requirement #10) */}
      <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[850px] gap-2">
          {PIPELINE_STEPS.map((step, idx) => {
            const isActive = activePipelineStep === step.id;
            return (
              <React.Fragment key={step.id}>
                <button
                  onClick={() => setActivePipelineStep(step.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-emerald-500 text-slate-950 shadow-md scale-105'
                      : 'bg-emerald-950/70 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-slate-950/20 flex items-center justify-center text-[10px]">
                    {step.id}
                  </span>
                  <span>{step.name}</span>
                </button>
                {idx < PIPELINE_STEPS.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Controls + 3D Model + 2D Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Parameter Panel */}
        <div className="lg:col-span-4 space-y-6">
          <SimulationControls
            params={params}
            onChange={(newP) => setParams(newP)}
            onReset={() => setParams(DEFAULT_PARAMS)}
          />

          {/* Quick Metrics */}
          <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 text-xs space-y-2">
            <div className="font-bold text-slate-200 border-b border-emerald-900/40 pb-2 flex items-center justify-between">
              <span>Métriques Modèle Calculé</span>
              <span className="text-[10px] text-emerald-400 font-mono">Partie A</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Anomalie max (g):</span>
              <span className="font-mono text-emerald-300 font-bold">+{simulationData.metrics.maxG} mGal</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Anomalie min (g):</span>
              <span className="font-mono text-cyan-300 font-bold">{simulationData.metrics.minG} mGal</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Gradient THDR Max:</span>
              <span className="font-mono text-amber-300 font-bold">{simulationData.metrics.maxThdr} mGal/km</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Longueur de faille:</span>
              <span className="font-mono text-slate-200">{simulationData.metrics.faultLengthKm} km</span>
            </div>
          </div>
        </div>

        {/* Right Visualizations (3D geological model + 2D Map) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 3D Model Box */}
            <div className="glass-panel p-4 rounded-2xl border border-emerald-800/40 flex flex-col justify-between">
              <div className="flex items-center justify-between border-b border-emerald-900/40 pb-2 mb-2">
                <h3 className="font-bold text-xs text-slate-100 flex items-center gap-2">
                  <Box className="w-4 h-4 text-emerald-400" />
                  Modèle Géologique 3D Synthétique
                </h3>
                <span className="text-[10px] text-emerald-400 font-mono">Interactif</span>
              </div>
              <div className="h-[320px] rounded-xl overflow-hidden bg-[#03150F]">
                <ThreeGeologyHero />
              </div>
            </div>

            {/* 2D Gravity Attribute Heatmap */}
            <GravityHeatmap2D
              grid={simulationData.grid}
              xCoords={simulationData.xCoords}
              yCoords={simulationData.yCoords}
              activeLayer={activeLayer}
              onChangeLayer={(l) => setActiveLayer(l)}
            />
          </div>
        </div>
      </div>

      {/* AI Feature Space (7 Cards) */}
      <FeatureSpaceGrid
        activeAttribute={activeLayer}
        onSelectAttribute={(attr) => setActiveLayer(attr)}
      />

      {/* Google Colab Python Code Runner Component (Requirement #15) */}
      <PythonColabRunner />
    </div>
  );
};
