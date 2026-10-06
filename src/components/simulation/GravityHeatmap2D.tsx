'use client';

import React from 'react';
import { GridPoint } from '@/lib/simulation-engine';
import { AttributeType } from '@/lib/types';
import { Layers } from 'lucide-react';

interface GravityHeatmap2DProps {
  grid: GridPoint[][];
  xCoords: number[];
  yCoords: number[];
  activeLayer: AttributeType;
  onChangeLayer: (layer: AttributeType) => void;
}

export const GravityHeatmap2D: React.FC<GravityHeatmap2DProps> = ({
  grid,
  xCoords,
  yCoords,
  activeLayer,
  onChangeLayer
}) => {
  if (!grid || grid.length === 0) return null;

  const gridSize = grid.length;

  // Compute min & max for normalized color scale
  let minVal = Infinity;
  let maxVal = -Infinity;

  grid.forEach(row => {
    row.forEach(pt => {
      let val = pt.g;
      if (activeLayer === 'thdr') val = pt.thdr;
      if (activeLayer === 'vdr') val = pt.vdr;
      if (activeLayer === 'tilt') val = pt.tilt;
      if (activeLayer === 'theta') val = pt.theta;
      if (val < minVal) minVal = val;
      if (val > maxVal) maxVal = val;
    });
  });

  const getPointColor = (pt: GridPoint) => {
    let val = pt.g;
    if (activeLayer === 'thdr') val = pt.thdr;
    if (activeLayer === 'vdr') val = pt.vdr;
    if (activeLayer === 'tilt') val = pt.tilt;
    if (activeLayer === 'theta') val = pt.theta;

    const norm = Math.max(0, Math.min(1, (val - minVal) / (maxVal - minVal || 1)));

    // Professional Geophysical Heatmap gradient (Deep Blue -> Green -> Cyan -> Bright Yellow/Emerald)
    if (activeLayer === 'thdr') {
      // THDR: Dark green to vibrant cyan/white peak along fault
      return `hsl(${160 + norm * 40}, 90%, ${15 + norm * 65}%)`;
    }

    if (activeLayer === 'vdr') {
      // VDR: Bipolar color scale (Blue negative, green neutral, aqua positive)
      return `hsl(${180 + norm * 60}, 85%, ${20 + norm * 55}%)`;
    }

    if (activeLayer === 'tilt') {
      // Tilt Angle (-90 to +90)
      return `hsl(${140 + norm * 80}, 80%, ${20 + norm * 50}%)`;
    }

    // Default Bouguer Anomaly (g)
    return `hsl(${120 + norm * 100}, 85%, ${15 + norm * 60}%)`;
  };

  const getLayerTitle = () => {
    if (activeLayer === 'g') return 'Anomalie de Bouguer g(x,y) [mGal]';
    if (activeLayer === 'thdr') return 'Gradient Horizontal Total THDR [mGal/km]';
    if (activeLayer === 'vdr') return 'Dérivée Verticale VDR [mGal/km]';
    if (activeLayer === 'tilt') return 'Angle d\'Inclinaison Tilt [°]';
    return 'Carte Theta [rad]';
  };

  return (
    <div className="glass-panel p-5 rounded-2xl border border-emerald-800/40 space-y-4">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-900/50 pb-3">
        <div>
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            Carte Synthétique 2D Gravimétrique
          </h3>
          <p className="text-xs text-emerald-400 font-mono mt-0.5">{getLayerTitle()}</p>
        </div>

        {/* Layer Toggle Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
          {(['g', 'thdr', 'vdr', 'tilt', 'theta'] as AttributeType[]).map((layer) => (
            <button
              key={layer}
              onClick={() => onChangeLayer(layer)}
              className={`px-3 py-1 rounded-md transition-all uppercase ${
                activeLayer === layer
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                  : 'bg-emerald-950/80 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/40'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* Heatmap Canvas SVG Render */}
      <div className="relative aspect-square max-w-[440px] mx-auto bg-[#03140E] rounded-xl border border-emerald-900/60 p-4 shadow-inner">
        <svg viewBox="0 0 100 100" className="w-full h-full rounded">
          {/* Render Voxels / Cells */}
          {grid.map((row, j) => {
            const cellH = 100 / gridSize;
            const cellW = 100 / gridSize;
            const y = j * cellH;

            return row.map((pt, i) => {
              const x = i * cellW;
              return (
                <rect
                  key={`${i}-${j}`}
                  x={x}
                  y={y}
                  width={cellW + 0.1}
                  height={cellH + 0.1}
                  fill={getPointColor(pt)}
                />
              );
            });
          })}

          {/* Overlay Fault Line Trace */}
          <path
            d="M 46,0 Q 52,50 48,100"
            fill="none"
            stroke="#34D399"
            strokeWidth="1.5"
            strokeDasharray="3 2"
            className="animate-fault-pulse"
          />

          {/* Axes & Annotations */}
          <text x="5" y="8" fill="#A7F3D0" fontSize="3" fontFamily="monospace">Y: +10km</text>
          <text x="5" y="96" fill="#A7F3D0" fontSize="3" fontFamily="monospace">Y: -10km</text>
          <text x="2" y="52" fill="#A7F3D0" fontSize="3" fontFamily="monospace">X:-10km</text>
          <text x="80" y="52" fill="#A7F3D0" fontSize="3" fontFamily="monospace">X:+10km</text>
          <text x="36" y="92" fill="#34D399" fontSize="3.5" fontWeight="bold" fontFamily="monospace">Trace de faille</text>
        </svg>

        {/* Color Legend Bar */}
        <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 font-mono bg-emerald-950/60 p-2 rounded-lg border border-emerald-900/50">
          <span>Min: {minVal.toFixed(1)}</span>
          <div className="h-2 flex-1 mx-3 rounded bg-gradient-to-r from-emerald-950 via-emerald-600 to-cyan-400" />
          <span>Max: {maxVal.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};
