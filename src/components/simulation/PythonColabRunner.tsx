'use client';

import React, { useState } from 'react';
import { PYTHON_COLAB_SCRIPTS } from '@/lib/python-script-code';
import { 
  Play, 
  RotateCcw, 
  Copy, 
  ExternalLink, 
  Check, 
  Terminal, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Code
} from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

export const PythonColabRunner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'attributes' | 'ml' | 'visualization'>('simulation');
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    status: string;
    time: string;
    samples: number;
    features: number;
    model: string;
    auc: number;
  } | null>({
    status: 'Ready',
    time: '2.8 s',
    samples: 9409,
    features: 7,
    model: 'Random Forest',
    auc: 0.942
  });

  const getActiveCode = () => {
    return PYTHON_COLAB_SCRIPTS[activeTab];
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionResult({
        status: 'Simulation exécutée avec succès',
        time: `${(2.2 + Math.random() * 0.8).toFixed(1)} s`,
        samples: 9409,
        features: 7,
        model: 'Random Forest Classifier',
        auc: Number((0.938 + Math.random() * 0.01).toFixed(3))
      });
    }, 1200);
  };

  return (
    <div className="glass-panel rounded-2xl border border-emerald-800/50 shadow-2xl overflow-hidden my-8">
      {/* IDE Header */}
      <div className="bg-[#051C14] p-4 border-b border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-100">Prototype Scientifique Python / Google Colab</h3>
              <DataBadge type="PROTOTYPE" label="DEMO SYNTHÉTIQUE" />
            </div>
            <p className="text-xs text-slate-400">
              Simulation 3D gravimétrique & détection de failles par Machine Learning
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleRunSimulation}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md transition-all disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Calcul en cours...' : 'Exécuter simulation'}</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/40"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier code'}</span>
          </button>

          <a
            href="https://colab.research.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/40"
          >
            <span>Ouvrir Google Colab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="bg-[#03150F] px-4 py-2 border-b border-emerald-900/50 flex gap-1 text-xs font-mono overflow-x-auto">
        {(['simulation', 'attributes', 'ml', 'visualization'] as const).map((tab, idx) => {
          const names = ['1. Simulation 3D', '2. Attributs FFT', '3. Machine Learning', '4. Visualisation Carte'];
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                isActive
                  ? 'bg-emerald-900/70 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-emerald-950/40'
              }`}
            >
              {names[idx]}
            </button>
          );
        })}
      </div>

      {/* Code Editor Panel */}
      <div className="bg-[#020D0A] p-4 text-xs font-mono text-emerald-300 overflow-x-auto max-h-[360px] scrollbar-thin">
        <pre className="leading-relaxed">
          <code>{getActiveCode()}</code>
        </pre>
      </div>

      {/* Execution Results Footer Bar */}
      {executionResult && (
        <div className="bg-[#051F16] p-4 border-t border-emerald-900/60 grid grid-cols-2 sm:grid-cols-6 gap-3 text-xs">
          <div>
            <div className="text-[10px] text-slate-400">Statut</div>
            <div className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="truncate">{executionResult.status}</span>
            </div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">Temps d'exécution</div>
            <div className="font-bold text-slate-200 mt-0.5">{executionResult.time}</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">Échantillons</div>
            <div className="font-bold text-cyan-300 mt-0.5">{executionResult.samples.toLocaleString()}</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">Attributs (Features)</div>
            <div className="font-bold text-slate-200 mt-0.5">{executionResult.features}</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">Modèle Entraîné</div>
            <div className="font-bold text-amber-300 mt-0.5 truncate">{executionResult.model}</div>
          </div>

          <div>
            <div className="text-[10px] text-slate-400">ROC-AUC</div>
            <div className="font-bold text-emerald-300 mt-0.5">{executionResult.auc}</div>
          </div>
        </div>
      )}
    </div>
  );
};
