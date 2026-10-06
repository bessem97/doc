'use client';

import React, { useState } from 'react';
import './globals.css';
import { Sidebar } from '@/components/navigation/Sidebar';
import { Navbar } from '@/components/navigation/Navbar';
import { ResearchAssistantModal } from '@/components/assistant/ResearchAssistantModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [assistantOpen, setAssistantOpen] = useState(false);

  return (
    <html lang="fr" className="dark">
      <head>
        <title>Failles & Connectivité Aquifère — Caractérisation par IA (Samar Khlifi)</title>
        <meta
          name="description"
          content="Projet de thèse de doctorat: Caractérisation géophysique automatisée par IA et connectivité aquifère. Samar Khlifi / Dr. Hakim Gabtni."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-[#060f1a] text-slate-200 min-h-screen flex flex-col lg:flex-row antialiased">

        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Main View Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar onOpenAssistant={() => setAssistantOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>

        {/* Floating Research Assistant Modal */}
        <ResearchAssistantModal
          isOpen={assistantOpen}
          onClose={() => setAssistantOpen(false)}
        />
      </body>
    </html>
  );
}
