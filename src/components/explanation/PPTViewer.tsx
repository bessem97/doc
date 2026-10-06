'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  Info,
  CheckCircle2,
  FileSpreadsheet
} from 'lucide-react';

interface PPTViewerProps {
  documentId: '1' | '2';
  title: string;
  subtitle: string;
  path: string;
  slideCount: number;
  abstract: string;
}

export const PPTViewer: React.FC<PPTViewerProps> = ({
  documentId,
  title,
  subtitle,
  path,
  slideCount,
  abstract
}) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [activeTab, setActiveTab] = useState<'preview' | 'info'>('preview');

  // Simulated slide content descriptions to give the jury a rich overview even if PPTX is loaded dynamically
  const slideSummaries = documentId === '1' ? [
    'Titre du Projet: Caractérisation Géophysique par IA & Connectivité Aquifère.',
    'Problématique: Rôle dual des failles (drains hydrauliques vs barrières étanches).',
    'Partie A: Modélisation gravimétrique 3D synthétique (Voxels & Direct Forward).',
    'Partie B: Cas réel d\'application sur la plaine structurée tunisienne.',
    'Attributs gravimétriques majeurs: THDR, VDR, Tilt Angle & Carte Theta.',
    'Résultats attendus: Carte probabiliste de faille et matrice de connectivité.'
  ] : [
    'Structure du générateur gravimétrique 3D (Paramètres & Voxels).',
    'Équations analytiques du champ d\'anomalie de Bouguer g(x,y,z).',
    'Calcul des dérivées directionnelles dG/dX et dG/dY.',
    'Transformée de Fourier FFT 2D pour la dérivée verticale VDR.',
    'Ingénierie de la matrice de caractéristiques (Features Matrix).',
    'Entraînement et matrice de confusion du Random Forest.'
  ];

  return (
    <div className="glass-panel rounded-2xl overflow-hidden border border-emerald-800/40 shadow-xl my-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B382A] via-[#082B20] to-[#041B13] p-5 border-b border-emerald-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span>Document Présentation Thèse ({documentId}.pptx)</span>
              <span className="text-slate-500">•</span>
              <span>{slideCount} Diapositives</span>
            </div>
            <h3 className="text-lg font-bold text-slate-100">{title}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <a
            href={path}
            download
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger PPTX</span>
          </a>
        </div>
      </div>

      {/* Main Content Viewer area */}
      <div className="p-6 bg-[#041610]/80">
        <div className="flex items-center justify-between border-b border-emerald-900/60 pb-3 mb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'preview'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Aperçu Interactif des Slides
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'info'
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Résumé du Document
            </button>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            Emplacement prévu: <code className="text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">/public/documents/{documentId}.pptx</code>
          </div>
        </div>

        {activeTab === 'preview' ? (
          <div className="space-y-4">
            {/* Slide Presentation Canvas Box */}
            <div className="relative aspect-video max-h-[380px] w-full rounded-xl bg-gradient-to-br from-[#07241A] to-[#041B13] border border-emerald-800/50 p-6 flex flex-col justify-between shadow-inner">
              {/* Slide Header */}
              <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold border-b border-emerald-900/40 pb-2">
                <span>SLIDE {currentSlide} / {slideSummaries.length}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-slate-300 border border-emerald-700/30 text-[10px]">
                  PowerPoint Demonstrator
                </span>
              </div>

              {/* Slide Body visual text */}
              <div className="my-auto py-4 text-center max-w-xl mx-auto">
                <div className="inline-block p-2 rounded-full bg-emerald-500/10 text-emerald-400 mb-3 border border-emerald-500/20">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-slate-100 mb-2">
                  {slideSummaries[currentSlide - 1]}
                </h4>
                <p className="text-xs text-slate-400">
                  Document de présentation de la thèse de doctorat de Samar Khlifi sous la direction du Dr. Hakim Gabtni.
                </p>
              </div>

              {/* Slide Controls */}
              <div className="flex items-center justify-between border-t border-emerald-900/40 pt-2 text-xs">
                <button
                  disabled={currentSlide === 1}
                  onClick={() => setCurrentSlide((prev) => Math.max(1, prev - 1))}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-800/40"
                >
                  <ChevronLeft className="w-4 h-4" /> Precedente
                </button>

                <div className="flex gap-1.5">
                  {slideSummaries.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx + 1)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlide === idx + 1 ? 'bg-emerald-400 scale-125' : 'bg-emerald-900 hover:bg-emerald-700'
                      }`}
                    />
                  ))}
                </div>

                <button
                  disabled={currentSlide === slideSummaries.length}
                  onClick={() => setCurrentSlide((prev) => Math.min(slideSummaries.length, prev + 1))}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-800/40"
                >
                  Suivante <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-950/40 rounded-xl border border-emerald-800/40 text-xs text-slate-300 space-y-3">
            <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
              <Info className="w-4 h-4 text-emerald-400" />
              Résumé du contenu scientifique ({documentId}.pptx)
            </div>
            <p className="leading-relaxed text-slate-300">{abstract}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Format d'origine: Microsoft PowerPoint (.pptx)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Validation par le jury et l'encadrant</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
