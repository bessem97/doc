'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Lightbulb,
  Box,
  BookOpen,
  BrainCircuit,
  Droplets,
  Map,
  BarChart3,
  Milestone,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Atom
} from 'lucide-react';

export const NAVIGATION_ITEMS = [
  { href: '/', label: '1. Vue d\'ensemble', shortLabel: 'Accueil', icon: Home },
  { href: '/idea', label: '2. Idée scientifique', shortLabel: 'Idée', icon: Lightbulb },
  { href: '/simulation', label: '3. Simulation 3D', shortLabel: 'Simulation', icon: Box },
  { href: '/simulation-explanation', label: '4. Explication simulation', shortLabel: 'Explications', icon: BookOpen },
  { href: '/ai-methodology', label: '5. Méthodologie IA', shortLabel: 'IA & ML', icon: BrainCircuit },
  { href: '/hydrogeology', label: '6. Connectivité aquifère', shortLabel: 'Hydrogéologie', icon: Droplets },
  { href: '/case-study', label: '7. Cas réel tunisien', shortLabel: 'Cas Tunisien', icon: Map },
  { href: '/results', label: '8. Résultats & Cartes', shortLabel: 'Résultats', icon: BarChart3 },
  { href: '/roadmap', label: '9. Feuille de route', shortLabel: 'Roadmap', icon: Milestone },
];

export const Sidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 z-40 select-none"
      style={{
        background: 'linear-gradient(180deg, #08111e 0%, #060f1a 100%)',
        borderRight: '1px solid rgba(6, 182, 212, 0.12)',
      }}>

      {/* PhD Branding Banner */}
      <div className="p-5 border-b" style={{ borderColor: 'rgba(6, 182, 212, 0.12)' }}>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="p-2 rounded-xl"
            style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
            <Atom className="w-5 h-5 text-cyan-400" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-white tracking-wide">Démonstrateur Thèse</h1>
            <p className="text-[11px] font-medium" style={{ color: '#67e8f9' }}>Doctorat Géophysique & IA</p>
          </div>
        </div>

        <div className="mt-2 text-xs p-3 rounded-xl"
          style={{
            background: 'rgba(6,182,212,0.06)',
            border: '1px solid rgba(6,182,212,0.15)'
          }}>
          <div className="font-semibold text-white">Samar Khlifi</div>
          <div className="text-[11px] mt-0.5" style={{ color: '#94a3b8' }}>Encadrement: Dr. Hakim Gabtni</div>
          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium">En cours • 2024–2027</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <div className="px-3 pb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(6,182,212,0.6)' }}>
          Navigation Recherche
        </div>

        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group relative overflow-hidden"
              style={isActive ? {
                background: 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(16,185,129,0.1))',
                border: '1px solid rgba(6,182,212,0.3)',
                color: '#a5f3fc',
              } : {
                border: '1px solid transparent',
                color: '#94a3b8',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(6,182,212,0.07)';
                  e.currentTarget.style.color = '#e2e8f0';
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#94a3b8';
                }
              }}
            >
              {isActive && (
                <div className="absolute left-0 top-2 bottom-2 w-0.5 rounded-r-full"
                  style={{ background: 'linear-gradient(180deg, #06B6D4, #10B981)' }} />
              )}
              <div className="flex items-center gap-3 min-w-0">
                <Icon className="w-4 h-4 shrink-0" style={{ color: isActive ? '#22d3ee' : 'currentColor' }} />
                <span className="truncate">{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: '#22d3ee' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t text-[11px]" style={{ borderColor: 'rgba(6,182,212,0.1)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="font-semibold mb-1 flex items-center justify-between" style={{ color: '#cbd5e1' }}>
          <span>Référence Thèse</span>
          <a
            href="https://doi.org/10.1016/j.jappgeo.2025.106040"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-0.5 text-[10px] hover:underline"
            style={{ color: '#22d3ee' }}
          >
            DOI <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
        <p className="text-[10px] leading-tight line-clamp-2" style={{ color: '#64748b' }}>
          Yang et al. (2026). Journal of Applied Geophysics.
        </p>
      </div>
    </aside>
  );
};
