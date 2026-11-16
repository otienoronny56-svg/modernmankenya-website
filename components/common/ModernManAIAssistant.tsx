'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  MessageSquare, 
  User, 
  ExternalLink,
  Tag,
  CalendarCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'model',
  content: `I am **Kasuku**, your Lead Sartorial AI Advisor at **Modern Man Kenya**.

I provide immediate, authoritative guidance on:
• **Made to Measure Suiting**: Standard (18k–25k, 1 wk), Premium (30k–45k, 2 wks), Executive (50k–200k, 3–4 wks)
• **170 Gallery Masterpieces**: Direct recommendations across Suits, Tuxedos, Kaftans, Traditional, Kids & Women
• **Anatomical Fit**: 35-point bespoke measurements, floating horsehair canvas & Gurkha side adjusters
• **Private Consultations**: Schedule fittings at our Nairobi atelier (Tubman Road, opposite City Market)

Tell me your occasion, preferred silhouette, or fabric inquiry.`,
  timestamp: new Date(),
};

const SUGGESTIONS = [
  'Recommend black-tie wedding tuxedos',
  'What are your 3 Made to Measure suit tiers & timelines?',
  'Legal advocate & boardroom power suits',
  'Show me Junior & Page Boy wedding suits',
  "Women's Made to Measure power suits",
  'African Kaftans & Ruracio traditional wear',
];

/**
 * Lightweight helper to format simple markdown (bold, links, bullet points)
 */
function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-2 text-[13px] sm:text-sm leading-relaxed">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1.5" />;

        // Match [text](url) and **bold**
        const parts: React.ReactNode[] = [];
        let remaining = line;
        let pKey = 0;

        while (remaining.length > 0) {
          // Check for link [title](href)
          const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
          // Check for bold **text**
          const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);

          const linkIdx = linkMatch ? remaining.indexOf(linkMatch[0]) : -1;
          const boldIdx = boldMatch ? remaining.indexOf(boldMatch[0]) : -1;

          if (linkIdx === -1 && boldIdx === -1) {
            parts.push(<span key={pKey++}>{remaining}</span>);
            break;
          }

          if (boldIdx !== -1 && (linkIdx === -1 || boldIdx < linkIdx)) {
            if (boldIdx > 0) {
              parts.push(<span key={pKey++}>{remaining.slice(0, boldIdx)}</span>);
            }
            parts.push(
              <strong key={pKey++} className="font-bold text-brand-gold">
                {boldMatch![1]}
              </strong>
            );
            remaining = remaining.slice(boldIdx + boldMatch![0].length);
          } else if (linkMatch) {
            if (linkIdx > 0) {
              parts.push(<span key={pKey++}>{remaining.slice(0, linkIdx)}</span>);
            }
            const href = linkMatch[2];
            const linkText = linkMatch[1];
            const isInternal = href.startsWith('/');
            const isGallery = href.includes('/gallery');
            const isBooking = href.includes('/book-appointment');

            if (isGallery) {
              parts.push(
                <Link
                  key={pKey++}
                  href={href}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 mx-0.5 my-0.5 rounded-md bg-brand-gold/20 hover:bg-brand-gold/35 text-amber-300 hover:text-white font-semibold border border-brand-gold/40 transition-all text-xs shadow-xs"
                >
                  <Tag className="w-2.5 h-2.5 text-brand-gold inline" />
                  <span>{linkText}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline opacity-70" />
                </Link>
              );
            } else if (isBooking) {
              parts.push(
                <Link
                  key={pKey++}
                  href={href}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 mx-0.5 my-0.5 rounded-md bg-gradient-to-r from-brand-gold to-amber-400 hover:from-amber-300 hover:to-brand-gold text-brand-navy font-bold transition-all text-xs shadow-sm"
                >
                  <CalendarCheck className="w-3 h-3 inline" />
                  <span>{linkText}</span>
                </Link>
              );
            } else if (isInternal) {
              parts.push(
                <Link
                  key={pKey++}
                  href={href}
                  className="inline-flex items-center space-x-0.5 text-amber-300 underline font-semibold hover:text-white transition-colors"
                >
                  <span>{linkText}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline opacity-70" />
                </Link>
              );
            } else {
              parts.push(
                <a
                  key={pKey++}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2 py-0.5 mx-0.5 my-0.5 rounded-md bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 font-semibold border border-emerald-500/30 transition-all text-xs"
                >
                  <span>{linkText}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline opacity-70" />
                </a>
              );
            }
            remaining = remaining.slice(linkIdx + linkMatch[0].length);
          }
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        return (
          <p
            key={lIdx}
            className={isBullet ? 'pl-3 border-l-2 border-brand-gold/40 my-1' : ''}
          >
            {parts}
          </p>
        );
      })}
    </div>
  );
}

export const ModernManAIAssistant: React.FC = () => {
  const pathname = usePathname();

  // Strictly restrict AI Assistant exclusively to authenticated client dashboard
  if (pathname !== '/account') {
    return null;
  }

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Gentle initial teaser badge
  useEffect(() => {
    const timer = setTimeout(() => setShowTeaser(true), 2500);
    const hideTimer = setTimeout(() => setShowTeaser(false), 9000);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to connect to Kasuku AI Advisor.');
      }

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Thank you for your inquiry. How else may I assist your style?',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error('Kasuku AI chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: `I apologize for the moment. Our digital concierge is undergoing atelier maintenance. 

Please reach out directly to our Master Tailor via WhatsApp: [Chat on WhatsApp](https://wa.me/254114122510?text=Hello%20Kasuku%2C%20I%20have%20a%20suiting%20inquiry.) or explore our [Sartorial Gallery](/gallery).`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const isTooltipVisible = (isHovered || showTeaser) && !isOpen;

  // The AI Stylist is exclusively active inside the client dashboard (/account)
  if (!pathname?.startsWith('/account')) {
    return null;
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Kasuku Chat Window - Spacious & Premium */}
      {isOpen && (
        <div
          className="fixed bottom-[88px] sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.25rem)] sm:w-[480px] md:w-[520px] lg:w-[540px] h-[600px] sm:h-[680px] md:h-[720px] max-h-[88vh] bg-[#0A1224]/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-brand-gold/60 shadow-[0_12px_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-250 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Gold Accent Glow */}
          <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          {/* Header */}
          <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-gradient-to-r from-[#0F1E3D] via-[#0A1224] to-[#0D182E] border-b border-brand-gold/30 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 rounded-full bg-brand-navy border-2 border-brand-gold/60 flex items-center justify-center shadow-lg">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Kasuku Modern Man Crest"
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0A1224] animate-pulse" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-serif font-black tracking-wider text-brand-gold uppercase block">
                    Kasuku
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold text-[9px] font-bold uppercase tracking-wider border border-brand-gold/40">
                    Sartorial AI Advisor
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 font-medium">
                  Master Made to Measure Advisor • Nairobi Atelier
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleReset}
                title="Restart Conversation"
                className="p-2 rounded-full text-slate-400 hover:text-brand-gold hover:bg-white/10 transition-colors"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Kasuku Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-brand-gold/30">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2.5 ${
                    isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center border text-[10px] font-bold shadow-sm ${
                      isUser
                        ? 'bg-gradient-to-br from-brand-gold to-amber-400 text-brand-navy border-amber-300'
                        : 'bg-brand-navy text-brand-gold border-brand-gold/50'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Sparkles className="w-3.5 h-3.5 text-brand-gold" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[88%] rounded-2xl p-3.5 sm:p-4 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-brand-gold via-amber-400 to-amber-300 text-brand-navy font-medium rounded-tr-none'
                        : 'bg-[#121B32] text-slate-100 border border-white/10 rounded-tl-none shadow-black/40'
                    }`}
                  >
                    <FormattedMessageText text={msg.content} />
                    <span
                      className={`text-[10px] block mt-1.5 opacity-60 text-right ${
                        isUser ? 'text-brand-navy' : 'text-slate-400'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Live Typing / Thinking Indicator */}
            {isLoading && (
              <div className="flex items-start space-x-2.5 animate-fadeIn">
                <div className="w-7 h-7 rounded-full bg-brand-navy border border-brand-gold/40 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-spin" />
                </div>
                <div className="bg-[#121B32] border border-brand-gold/30 rounded-2xl rounded-tl-none p-3.5 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-xs text-brand-gold font-medium tracking-wider pl-1.5">
                    Kasuku is consulting atelier archives...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (Shows when only initial message exists) */}
          {messages.length === 1 && !isLoading && (
            <div className="px-5 pb-3 flex-shrink-0">
              <span className="text-[10px] text-brand-gold/90 font-bold uppercase tracking-wider block mb-2">
                Recommended Inquiries:
              </span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSend(suggestion)}
                    className="text-xs text-left px-3 py-1.5 rounded-full bg-[#15203A] hover:bg-brand-gold hover:text-brand-navy text-slate-200 border border-brand-gold/35 transition-all font-medium cursor-pointer shadow-xs"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Action Bar */}
          <div className="p-3.5 sm:p-4 bg-[#080E1C] border-t border-brand-gold/30 flex-shrink-0 space-y-2.5">
            <div className="flex items-center space-x-2 bg-[#121B32] rounded-xl border border-white/20 px-3.5 py-2 focus-within:border-brand-gold transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Kasuku about suits, fabrics, sizing, price tiers, or gallery garments..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 rounded-lg bg-brand-gold text-brand-navy flex items-center justify-center hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 cursor-pointer shadow-sm"
                aria-label="Send message to Kasuku"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Direct WhatsApp Fast-Track */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-0.5">
              <span>Kasuku Sartorial Intelligence</span>
              <a
                href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20talk%20to%20a%20master%20tailor."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center space-x-1.5 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-emerald-400" />
                <span>WhatsApp Atelier Directly</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Floating Launcher Medallion */}
      <div className="fixed bottom-6 right-[86px] sm:right-[100px] z-50 flex items-center group pointer-events-none">
        {/* Luxury Tooltip / Teaser Badge */}
        <div
          className={`hidden sm:flex items-center space-x-2.5 absolute bottom-18 sm:bottom-20 right-0 px-4 py-2.5 rounded-full bg-gradient-to-r from-brand-navy-dark via-brand-navy to-[#0F1E3D] text-white border border-brand-gold/70 shadow-2xl transition-all duration-300 pointer-events-none whitespace-nowrap ${
            isTooltipVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-xs font-bold text-brand-gold tracking-wide leading-tight">
              Kasuku • Sartorial AI
            </span>
            <span className="text-[10px] text-slate-300 font-medium tracking-normal leading-tight">
              Ask about Suits, Fabrics &amp; 170 Gallery Pieces
            </span>
          </div>
        </div>

        {/* Main Floating Kasuku Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0F1E3D] via-[#0A1329] to-[#050A14] text-brand-gold flex items-center justify-center border-2 border-brand-gold shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.65)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer group/btn ${
            isOpen ? 'ring-2 ring-brand-gold/60 ring-offset-2 ring-offset-brand-navy' : ''
          }`}
          aria-label={isOpen ? "Close Kasuku AI Advisor" : "Open Kasuku AI Advisor"}
          title={isOpen ? "Close Kasuku" : "Kasuku • Sartorial AI Advisor"}
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-gold/15 via-transparent to-amber-200/20 pointer-events-none" />

          {/* Icon: Crisp Luxury Sparkles when closed, Close X when open */}
          <div className="relative flex items-center justify-center transition-transform duration-200">
            {isOpen ? (
              <X className="w-6 h-6 sm:w-7 sm:h-7 text-brand-gold transition-transform duration-200" />
            ) : (
              <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-brand-gold transition-transform duration-300 group-hover/btn:scale-110" />
            )}
          </div>

          {/* Minimalist, Clean "AI" Status Pill (Top-Right) */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 px-1.5 py-0.5 rounded-full bg-brand-gold text-brand-navy text-[9px] font-black tracking-wider uppercase shadow-md border-2 border-[#0A1329]">
              AI
            </span>
          )}
        </button>
      </div>
    </>
  );
};
