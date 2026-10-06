'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_ITEMS } from './Sidebar';
import { Menu, X, Brain, HelpCircle } from 'lucide-react';
import { DataBadge } from '../ui/DataBadge';

interface NavbarProps {
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAssistant }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const currentItem = NAVIGATION_ITEMS.find((item) => item.href === pathname) || NAVIGATION_ITEMS[0];

  return (
    <>
      <header className="sticky top-0 z-30 px-4 py-3 flex items-center justify-between"
        style={{
          background: 'rgba(6, 9, 20, 0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.12)',
        }}>

        {/* Left: Mobile Menu Toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl transition-colors"
            style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: '#67e8f9'
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-white hidden sm:inline">Failles & Connectivité Aquifère</span>
              <span className="font-semibold text-xs sm:hidden" style={{ color: '#22d3ee' }}>Doctorat Géophysique-IA</span>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <span className="text-xs font-medium hidden md:inline" style={{ color: '#22d3ee' }}>{currentItem.label}</span>
            </div>
            <p className="text-[11px] text-slate-500 hidden lg:block">
              Caractérisation géophysique automatisée par Intelligence Artificielle (Samar Khlifi)
            </p>
          </div>
        </div>

        {/* Right: Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <DataBadge type="SYNTHETIC" label="DEMO SYNTHÉTIQUE 3D" className="hidden sm:inline-flex" />

          <button
            onClick={onOpenAssistant}
            id="open-assistant-btn"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #0891b2, #0d9488)',
              border: '1px solid rgba(6,182,212,0.4)',
              boxShadow: '0 0 20px rgba(6,182,212,0.15)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(6,182,212,0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Brain className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Assistant IA Thèse</span>
            <span className="sm:hidden">IA</span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-50 overflow-y-auto p-4"
          style={{
            background: 'rgba(5, 10, 20, 0.97)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(6,182,212,0.15)'
          }}>
          <div className="p-3 rounded-xl mb-4 text-xs"
            style={{
              background: 'rgba(6,182,212,0.08)',
              border: '1px solid rgba(6,182,212,0.2)',
              color: '#a5f3fc'
            }}>
            <div className="font-bold text-white">Projet de Thèse de Doctorat</div>
            <div className="mt-0.5" style={{ color: '#94a3b8' }}>Caractérisation gravimétrique & connectivité hydrogéologique</div>
          </div>

          <nav className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all"
                  style={isActive ? {
                    background: 'rgba(6,182,212,0.15)',
                    border: '1px solid rgba(6,182,212,0.3)',
                    color: '#a5f3fc'
                  } : {
                    border: '1px solid transparent',
                    color: '#94a3b8'
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: isActive ? '#22d3ee' : 'currentColor' }} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
};
