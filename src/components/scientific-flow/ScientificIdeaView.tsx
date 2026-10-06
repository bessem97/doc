'use client';

import React, { useState } from 'react';
import { 
  Database, 
  Activity, 
  BrainCircuit, 
  CheckCircle2, 
  Layers, 
  Droplets, 
  ArrowDown, 
  Sparkles, 
  ShieldAlert,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';
import { PPTViewer } from '../explanation/PPTViewer';
import { PRESENTATION_DOCUMENTS } from '@/lib/mock-data';

export const ScientificIdeaView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const FLOW_STEPS = [
    {
      id: 1,
      title: '1. DONNÉES GRAVIMÉTRIQUES',
      short: 'GRAVITY DATA',
      icon: Database,
      desc: 'Acquisition des grilles de pesanteur (Anomalie de Bouguer résiduelle g(x,y)).',
      detail: 'Mesure des micro-variations de la constante de gravitation causées par les contrastes de densité sous-terrains.',
      color: 'from-emerald-900 to-emerald-800'
    },
    {
      id: 2,
      title: '2. ATTRIBUTS GÉOPHYSIQUES',
      short: 'ATTRIBUTS MULTI-ÉCHELLES',
      icon: Activity,
      desc: 'Calcul analytique et FFT des filtres directionnels: THDR, VDR, Tilt Angle et Theta map.',
      detail: 'Rehaussement des fréquences spatiales élevées pour amplifier la signature des bordures de failles.',
      color: 'from-emerald-800 to-teal-800'
    },
    {
      id: 3,
      title: '3. MACHINE LEARNING',
      short: 'MACHINE LEARNING',
      icon: BrainCircuit,
      desc: 'Entraînement des classificateurs supervisés (Random Forest, XGBoost, CNN 2D).',
      detail: 'Combinaison de la signature multi-attributs sans lissage artificiel pour séparer l\'encaissant de la faille.',
      color: 'from-teal-800 to-cyan-800'
    },
    {
      id: 4,
      title: '4. PROBABILITÉ DE FAILLE',
      short: 'FAULT PROBABILITY MAP',
      icon: Sparkles,
      desc: 'Génération de la carte continue de probabilité de présence de structures faillées (0 à 100%).',
      detail: 'Isolation des axes et linéaments géologiques sous couverture superficielle.',
      color: 'from-cyan-800 to-blue-900'
    },
    {
      id: 5,
      title: '5. INTERPRÉTATION GÉOLOGIQUE',
      short: 'GEOLOGICAL INTERPRETATION',
      icon: Layers,
      desc: 'Confrontation aux données de terrain, coupes stratigraphiques et levés de failles affleurantes.',
      detail: 'Validation de l\'orientation, du rejet géométrique et de la profondeur d\'enracinement.',
      color: 'from-blue-900 to-indigo-900'
    },
    {
      id: 6,
      title: '6. CONNECTIVITÉ AQUIFÈRE',
      short: 'HYDROGEOLOGICAL CONNECTIVITY',
      icon: Droplets,
      desc: 'Évaluation du comportement hydraulique: Drain conducteur vs Barrière étanche.',
      detail: 'Modélisation du compartimentage de la nappe et des flux de recharge/décharge.',
      color: 'from-emerald-700 to-teal-600'
    }
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-gradient-to-r from-[#041D14] to-[#083023]">
        <div className="flex items-center gap-3 text-xs font-semibold text-emerald-400 mb-2">
          <ShieldCheck className="w-4 h-4" />
          <span>PROJET DE THÈSE — SAMAR KHLIFI & DR. HAKIM GABTNI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
          L'Idée <span className="text-gradient-emerald">Scientifique</span>
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Développer une méthodologie novatrice basée sur l'Intelligence Artificielle capable de détecter et caractériser automatiquement les failles à partir de données gravimétriques, puis d'évaluer leur rôle dans la connectivité des eaux souterraines.
        </p>
      </div>

      {/* Interactive Scientific Flow Pipeline (Section 8) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Chaîne de Traitement Scientifique Interactive
          </h2>
          <span className="text-xs text-emerald-400 font-mono">Survolez/cliquez sur une étape</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FLOW_STEPS.map((step) => {
            const Icon = step.icon;
            const isSelected = activeStep === step.id;

            return (
              <div
                key={step.id}
                onMouseEnter={() => setActiveStep(step.id)}
                className={`glass-panel p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'border-emerald-400 bg-emerald-950/80 shadow-lg shadow-emerald-500/20 -translate-y-1'
                    : 'border-emerald-800/40 hover:border-emerald-500/50 hover:bg-emerald-950/40'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                    ÉTAPE 0{step.id}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-100 mb-1">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{step.desc}</p>
                <p className="text-[11px] text-emerald-300/80 bg-emerald-950/60 p-2 rounded-lg border border-emerald-900/50 font-mono">
                  {step.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section: Pourquoi détecter les failles ? (Prompt Requirement Section 8) */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-800/40 bg-[#06241A]/70">
        <h2 className="text-2xl font-bold text-slate-100 mb-4 flex items-center gap-2">
          <Droplets className="w-6 h-6 text-emerald-400" />
          Pourquoi détecter et caractériser les failles ?
        </h2>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          En hydrogéologie des bassins sédimentaires, les failles géologiques ne sont pas de simples lignes cartographiques passives. Elles contrôlent directement la dynamique des ressources en eau souterraine à travers cinq mécanismes fondamentaux:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              1. Circulation de l'eau
            </div>
            <p className="text-xs text-slate-300">
              Contrôle des zones de passage privilégié de l'eau à travers les réseaux de micro-fractures adjacentes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              2. Compartimentage Aquifère
            </div>
            <p className="text-xs text-slate-300">
              Isolation hydraulique étanche séparant un bassin en plusieurs sous-réservoirs autonomes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              3. Zones de Recharge
            </div>
            <p className="text-xs text-slate-300">
              Infiltration rapide des eaux de surface vers les nappes profondes le long des miroirs de failles conductrices.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2">
            <div className="font-bold text-emerald-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              4. Décharge & Sources
            </div>
            <p className="text-xs text-slate-300">
              Émergence de sources artésiennes et griffons hydrothermaux au niveau des intersections tectoniques.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/40 space-y-2 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="font-bold text-cyan-300 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              5. Connectivité Hydraulique
            </div>
            <p className="text-xs text-slate-300">
              Détermination si la faille agit comme un chenal conducteur principal ou un écran totalement imperméable.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded PPT Document Viewer (Requirement Section 9) */}
      <div className="space-y-3">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Présentation Scientifique de la Thèse (Document 1.pptx)
        </h2>

        <PPTViewer
          documentId="1"
          title={PRESENTATION_DOCUMENTS.ppt1.title}
          subtitle={PRESENTATION_DOCUMENTS.ppt1.subtitle}
          path={PRESENTATION_DOCUMENTS.ppt1.path}
          slideCount={PRESENTATION_DOCUMENTS.ppt1.slideCount}
          abstract={PRESENTATION_DOCUMENTS.ppt1.abstract}
        />
      </div>
    </div>
  );
};
