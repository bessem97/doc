'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Bot,
  X,
  Sparkles,
  Send,
  Mic,
  MicOff,
  Volume2,
  Loader2,
  AlertTriangle,
  Brain,
  Waves,
  MessageSquare,
  RefreshCw,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Types & Constants
═══════════════════════════════════════════════════════════ */

interface ResearchAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isError?: boolean;
}

const QUICK_QUESTIONS = [
  "Qu'est-ce que le THDR en gravimétrie ?",
  "Comment le Random Forest détecte les failles ?",
  "Différence entre faille drain et faille barrière ?",
  "Définir le Tilt Angle géophysique",
  "Qu'est-ce que l'anomalie de Bouguer ?",
  "Rôle du VDR dans la classification IA ?",
  "Qu'est-ce que la Theta Map ?",
  "Méthodologie de la thèse de Samar Khlifi ?",
];

/* ── Web Speech API types ── */
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition: new () => SpeechRecognitionInstance;
  }
}
interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((e: SpeechRecognitionEvent2) => void) | null;
  onerror: ((e: SpeechRecognitionErrorEvent2) => void) | null;
  onend: (() => void) | null;
}
interface SpeechRecognitionEvent2 {
  results: { length: number; [i: number]: { isFinal: boolean; [j: number]: { transcript: string } } };
}
interface SpeechRecognitionErrorEvent2 extends Event {
  error: string;
}

/* ═══════════════════════════════════════════════════════════
   Component
═══════════════════════════════════════════════════════════ */

export const ResearchAssistantModal: React.FC<ResearchAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceError, setVoiceError] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const API = window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!API);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /* Welcome message */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          text:
            "Bonjour ! Je suis l'assistant scientifique dédié à la thèse de **Samar Khlifi** sur les *Failles et la connectivité aquifère*.\n\nJe réponds à toutes vos questions sur :\n• La géophysique gravimétrique (THDR, VDR, Tilt Angle, Theta Map)\n• L'Intelligence Artificielle appliquée aux failles (Random Forest, XGBoost)\n• L'hydrogéologie et la connectivité des aquifères\n• La méthodologie de la thèse et les résultats\n\nUtilisez le 🎤 microphone pour poser vos questions oralement.",
        },
      ]);
    }
  }, [isOpen, messages.length]);

  /* ── Voice ── */
  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return;
    const API = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!API) return;
    setVoiceError('');

    const rec = new API();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'fr-FR';

    rec.onresult = (e: SpeechRecognitionEvent2) => {
      let final = '';
      let interim = '';
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      const cur = final || interim;
      setTranscript(cur);
      setInputValue(cur);
    };

    rec.onerror = (e: SpeechRecognitionErrorEvent2) => {
      if (e.error === 'not-allowed')
        setVoiceError("Accès au microphone refusé. Autorisez l'accès dans les paramètres.");
      else if (e.error === 'no-speech')
        setVoiceError('Aucune parole détectée. Réessayez.');
      else setVoiceError(`Erreur micro : ${e.error}`);
      setIsListening(false);
    };

    rec.onend = () => { setIsListening(false); setTranscript(''); };

    recognitionRef.current = rec;
    rec.start();
    setIsListening(true);
  }, []);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  /* ── Send message ── */
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;
      const userMsg: Message = { role: 'user', text: text.trim() };
      const history = [...messages, userMsg];
      setMessages(history);
      setInputValue('');
      setIsLoading(true);

      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            history: messages.filter((m) => !m.isError).slice(-10),
          }),
        });
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        setMessages((p) => [...p, { role: 'assistant', text: data.response }]);
      } catch {
        setMessages((p) => [
          ...p,
          {
            role: 'assistant',
            text: "Une erreur de connexion s'est produite. Vérifiez votre connexion et réessayez.",
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const clearChat = () => setMessages([]);

  /* ── Render message text with basic markdown ── */
  const formatMessage = (text: string) =>
    text.split('\n').map((line, i) => {
      const html = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>');
      return (
        <span key={i} className="block">
          {line.startsWith('•') ? (
            <span className="flex gap-2">
              <span className="text-cyan-600 shrink-0">•</span>
              <span dangerouslySetInnerHTML={{ __html: html.slice(1).trim() }} />
            </span>
          ) : (
            <span dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
          )}
        </span>
      );
    });

  if (!isOpen) return null;

  /* ── Palette shorthand ── */
  const P = {
    overlay:   'rgba(15,23,42,0.45)',
    modalBg:   'linear-gradient(160deg,#ffffff 0%,#f8faff 60%,#f0f7ff 100%)',
    modalBdr:  'rgba(148,163,184,0.25)',
    headerBg:  'linear-gradient(135deg,rgba(6,182,212,0.06) 0%,rgba(124,58,237,0.04) 100%)',
    headerBdr: 'rgba(148,163,184,0.18)',
    qBg:       'rgba(248,250,252,0.9)',
    qBdr:      'rgba(148,163,184,0.15)',
    pillBg:    'rgba(6,182,212,0.07)',
    pillBdr:   'rgba(6,182,212,0.2)',
    pillBgH:   'rgba(6,182,212,0.15)',
    pillBdrH:  'rgba(6,182,212,0.35)',
    pillTxt:   '#0e7490',
    chatBg:    'rgba(248,250,253,0.8)',
    userBubble:'linear-gradient(135deg,#0891b2 0%,#059669 100%)',
    botBubble: '#ffffff',
    botBdr:    'rgba(148,163,184,0.2)',
    inputBg:   'rgba(255,255,255,0.9)',
    inputBdr:  'rgba(148,163,184,0.3)',
    inputBdrF: 'rgba(6,182,212,0.5)',
    sendBg:    'linear-gradient(135deg,#0891b2,#059669)',
    footerBg:  'rgba(248,250,252,0.9)',
    footerBdr: 'rgba(148,163,184,0.15)',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
      style={{ background: P.overlay, backdropFilter: 'blur(8px)' }}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-2xl flex flex-col max-h-[90vh] overflow-hidden"
        style={{
          background: P.modalBg,
          border: `1px solid ${P.modalBdr}`,
          boxShadow:
            '0 24px 64px rgba(15,23,42,0.15), 0 4px 16px rgba(15,23,42,0.08)',
        }}
      >
        {/* ── Header ────────────────────────────── */}
        <div
          className="p-4 border-b flex items-center justify-between shrink-0"
          style={{ background: P.headerBg, borderColor: P.headerBdr }}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className="p-2 rounded-xl"
                style={{
                  background:
                    'linear-gradient(135deg,rgba(6,182,212,0.12),rgba(124,58,237,0.08))',
                  border: '1px solid rgba(6,182,212,0.22)',
                }}
              >
                <Brain className="w-5 h-5 text-cyan-600" />
              </div>
              <div
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse border-2 border-white"
                style={{ background: '#10b981' }}
              />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
                Assistant Scientifique Thèse
                <span
                  className="text-[10px] px-2.5 py-0.5 rounded-full font-bold"
                  style={{
                    background: 'rgba(6,182,212,0.1)',
                    color: '#0e7490',
                    border: '1px solid rgba(6,182,212,0.25)',
                  }}
                >
                  SAMAR BOT
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Thèse de Samar Khlifi — Géophysique &amp; IA
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={clearChat}
              title="Effacer la conversation"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
              style={{ background: 'rgba(148,163,184,0.1)' }}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
              style={{ background: 'rgba(148,163,184,0.1)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ── Quick Questions ────────────────────── */}
        <div
          className="p-3 shrink-0 border-b"
          style={{ borderColor: P.qBdr, background: P.qBg }}
        >
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-500" />
            Questions rapides
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all disabled:opacity-40"
                style={{
                  background: P.pillBg,
                  border: `1px solid ${P.pillBdr}`,
                  color: P.pillTxt,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = P.pillBgH;
                  e.currentTarget.style.borderColor = P.pillBdrH;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = P.pillBg;
                  e.currentTarget.style.borderColor = P.pillBdr;
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* ── Messages ──────────────────────────── */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4"
          style={{ background: P.chatBg }}
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Bot avatar */}
              {msg.role === 'assistant' && (
                <div
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background:
                      'linear-gradient(135deg,rgba(6,182,212,0.12),rgba(124,58,237,0.08))',
                    border: '1px solid rgba(6,182,212,0.2)',
                  }}
                >
                  <Bot className="w-3.5 h-3.5 text-cyan-600" />
                </div>
              )}

              {/* Bubble */}
              <div
                className="max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed"
                style={
                  msg.role === 'user'
                    ? {
                        background: P.userBubble,
                        color: '#ffffff',
                        borderRadius: '16px 16px 4px 16px',
                        boxShadow: '0 2px 12px rgba(8,145,178,0.2)',
                      }
                    : msg.isError
                    ? {
                        background: '#fff5f5',
                        border: '1px solid rgba(220,38,38,0.2)',
                        color: '#b91c1c',
                        borderRadius: '16px 16px 16px 4px',
                      }
                    : {
                        background: P.botBubble,
                        border: `1px solid ${P.botBdr}`,
                        color: '#1e293b',
                        borderRadius: '16px 16px 16px 4px',
                        boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
                      }
                }
              >
                {msg.role === 'assistant' && !msg.isError && (
                  <div className="text-[10px] font-bold text-cyan-600 mb-1.5 flex items-center gap-1">
                    <MessageSquare className="w-2.5 h-2.5" />
                    Réponse Scientifique
                  </div>
                )}
                {msg.role === 'user' && (
                  <div className="text-[10px] font-bold text-white/70 mb-1">
                    Votre question
                  </div>
                )}
                {msg.isError && (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold mb-1.5 text-red-600">
                    <AlertTriangle className="w-3 h-3" />
                    Erreur de connexion
                  </div>
                )}
                <div className="space-y-0.5">{formatMessage(msg.text)}</div>
              </div>

              {/* User avatar */}
              {msg.role === 'user' && (
                <div
                  className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background:
                      'linear-gradient(135deg,rgba(5,150,105,0.12),rgba(8,145,178,0.08))',
                    border: '1px solid rgba(5,150,105,0.2)',
                  }}
                >
                  <span className="text-[10px] font-bold text-emerald-600">Q</span>
                </div>
              )}
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg,rgba(6,182,212,0.12),rgba(124,58,237,0.08))',
                  border: '1px solid rgba(6,182,212,0.2)',
                }}
              >
                <Bot className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-2"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(148,163,184,0.2)',
                  boxShadow: '0 2px 8px rgba(15,23,42,0.06)',
                  borderRadius: '16px 16px 16px 4px',
                }}
              >
                <Loader2 className="w-3.5 h-3.5 text-cyan-500 animate-spin" />
                <span className="text-xs text-slate-500">Analyse en cours…</span>
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ── Voice error ───────────────────────── */}
        {voiceError && (
          <div
            className="px-4 py-2 text-xs flex items-center gap-2 shrink-0"
            style={{
              background: '#fffbeb',
              borderTop: '1px solid rgba(245,158,11,0.2)',
              color: '#92400e',
            }}
          >
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
            {voiceError}
            <button
              onClick={() => setVoiceError('')}
              className="ml-auto text-amber-400 hover:text-amber-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Listening indicator ───────────────── */}
        {isListening && (
          <div
            className="px-4 py-2 flex items-center gap-3 shrink-0"
            style={{
              background: '#fff5f5',
              borderTop: '1px solid rgba(220,38,38,0.15)',
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <Waves className="w-4 h-4 text-red-400" />
            </div>
            <span className="text-xs font-semibold text-red-600">
              Écoute en cours… Parlez maintenant
            </span>
            {transcript && (
              <span className="text-xs text-slate-400 italic ml-auto max-w-[40%] truncate">
                &ldquo;{transcript}&rdquo;
              </span>
            )}
          </div>
        )}

        {/* ── Input form ────────────────────────── */}
        <form
          onSubmit={handleSubmit}
          className="p-3 flex gap-2 items-center shrink-0"
          style={{
            borderTop: '1px solid rgba(148,163,184,0.15)',
            background: 'rgba(255,255,255,0.95)',
          }}
        >
          {/* Mic */}
          {speechSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              title={isListening ? "Arrêter l'écoute" : 'Parler (reconnaissance vocale)'}
              className={`p-2.5 rounded-xl transition-all shrink-0 ${isListening ? 'animate-pulse' : ''}`}
              style={
                isListening
                  ? {
                      background: 'rgba(220,38,38,0.08)',
                      border: '1px solid rgba(220,38,38,0.3)',
                      color: '#dc2626',
                    }
                  : {
                      background: 'rgba(6,182,212,0.07)',
                      border: '1px solid rgba(6,182,212,0.2)',
                      color: '#0891b2',
                    }
              }
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          )}

          {/* Text input */}
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            placeholder={
              isListening
                ? 'Parlez maintenant…'
                : 'Posez une question sur la thèse (géophysique, IA, aquifères…)'
            }
            className="flex-1 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all disabled:opacity-50"
            style={{
              background: P.inputBg,
              border: `1px solid ${P.inputBdr}`,
              boxShadow: 'inset 0 1px 3px rgba(15,23,42,0.04)',
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = P.inputBdrF)
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = P.inputBdr)
            }
          />

          {/* Send */}
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-2.5 rounded-xl font-semibold transition-all flex items-center gap-1.5 shrink-0 text-white disabled:opacity-40"
            style={{
              background: P.sendBg,
              border: '1px solid rgba(6,182,212,0.25)',
              boxShadow: '0 2px 8px rgba(8,145,178,0.2)',
            }}
            onMouseEnter={(e) =>
              !e.currentTarget.disabled &&
              (e.currentTarget.style.boxShadow =
                '0 4px 16px rgba(8,145,178,0.35)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                '0 2px 8px rgba(8,145,178,0.2)')
            }
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>

        {/* ── Footer note ───────────────────────── */}
        <div
          className="px-4 py-2 text-center shrink-0"
          style={{ borderTop: '1px solid rgba(148,163,184,0.12)', background: P.footerBg }}
        >
          <p className="text-[9px] text-slate-400 flex items-center justify-center gap-1.5">
            <Volume2 className="w-2.5 h-2.5" />
            Assistant exclusif à la thèse de Samar Khlifi — Questions hors-sujet refusées
          </p>
        </div>
      </div>
    </div>
  );
};
