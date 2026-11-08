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
  ChevronDown
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
  content: `Welcome to **Modern Man Kenya**. I am your personal Made to Measure Stylist & Atelier Concierge in Nairobi.

I can assist you with:
• **Men's Made to Measure Suits**: Standard (18k–25k, 1 wk), Premium (30k–45k, 2 wks), Executive (50k–200k, 3–4 wks)
• **Adult Wedding Tuxedos**: Ivory dinner jackets, black tie shawl collars, velvet & 3D luxury jacquards
• **Modern Woman**: Made to measure women's power pant suits, 3-piece waistcoat suits & executive skirt sets
• **Modern Kids**: Page boy wedding suits, junior tuxedos & father-and-son matching sets
• **Luxury Accessories**: Onyx cufflinks, 24K gold tie clips, silk cravats, bowties, suspenders & fedoras
• **Atelier Appointments**: Book a private fitting with our master tailors

How may I assist your style today?`,
  timestamp: new Date(),
};

const SUGGESTIONS = [
  'Wedding tuxedos & groom styling',
  'What are your 3 Made to Measure suit tiers?',
  "Tell me about women's power suits",
  "Do you make children's & page boy suits?",
  'Which cufflinks & accessories do you have?',
  'How do I book a private fitting in Nairobi?',
];

/**
 * Lightweight helper to format simple markdown (bold, links, bullet points)
 */
function FormattedMessageText({ text }: { text: string }) {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed">
      {lines.map((line, lIdx) => {
        if (!line.trim()) return <div key={lIdx} className="h-1" />;

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
            const isInternal = href.startsWith('/');
            parts.push(
              isInternal ? (
                <Link
                  key={pKey++}
                  href={href}
                  className="inline-flex items-center space-x-0.5 text-amber-300 underline font-semibold hover:text-white transition-colors"
                >
                  <span>{linkMatch[1]}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline opacity-70" />
                </Link>
              ) : (
                <a
                  key={pKey++}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-0.5 text-amber-300 underline font-semibold hover:text-white transition-colors"
                >
                  <span>{linkMatch[1]}</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 inline opacity-70" />
                </a>
              )
            );
            remaining = remaining.slice(linkIdx + linkMatch[0].length);
          }
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        return (
          <p
            key={lIdx}
            className={isBullet ? 'pl-2 border-l border-brand-gold/30 my-0.5' : ''}
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
        throw new Error(data.error || 'Failed to connect to AI Stylist.');
      }

      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Thank you for your inquiry. How else may I assist your style?',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err: any) {
      console.error('AI chat error:', err);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'model',
        content: `I apologize for the moment. Our digital concierge is undergoing atelier maintenance. 

Please reach out directly to our Master Tailor via WhatsApp: [Chat on WhatsApp](https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20have%20a%20suiting%20inquiry.) or explore our [Sartorial Gallery](/gallery).`,
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
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main AI Stylist Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-[88px] sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[540px] sm:h-[600px] max-h-[85vh] bg-[#0A1224]/98 backdrop-blur-2xl rounded-2xl sm:rounded-3xl border border-brand-gold/60 shadow-[0_10px_50px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-250 text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Gold Accent Glow */}
          <div className="absolute -top-[1px] left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          {/* Header */}
          <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-gradient-to-r from-[#0F1E3D] via-[#0A1224] to-[#0D182E] border-b border-brand-gold/25 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="relative w-8 h-8 rounded-full bg-brand-navy border border-brand-gold/50 flex items-center justify-center shadow-md">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Modern Man Crest"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0A1224]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] font-bold tracking-luxury text-brand-gold uppercase block">
                    Modern Man Kenya
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-brand-gold/20 text-brand-gold text-[8px] font-black uppercase">
                    AI Concierge
                  </span>
                </div>
                <h3 className="font-serif text-xs sm:text-sm font-bold text-white block">
                  Sartorial Personal Stylist
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleReset}
                title="Restart Conversation"
                className="p-1.5 rounded-full text-slate-400 hover:text-brand-gold hover:bg-white/10 transition-colors"
                aria-label="Restart Conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close Stylist Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm scrollbar-thin scrollbar-thumb-brand-gold/30">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border text-[10px] font-bold ${
                      isUser
                        ? 'bg-brand-gold text-brand-navy border-amber-300'
                        : 'bg-brand-navy text-brand-gold border-brand-gold/40'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3 h-3 text-brand-gold" />}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-brand-gold via-amber-400 to-amber-300 text-brand-navy font-medium rounded-tr-none'
                        : 'bg-[#121B32] text-slate-100 border border-white/10 rounded-tl-none shadow-black/40'
                    }`}
                  >
                    <FormattedMessageText text={msg.content} />
                    <span
                      className={`text-[9px] block mt-1 opacity-60 text-right ${
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
              <div className="flex items-start space-x-2 animate-fadeIn">
                <div className="w-6 h-6 rounded-full bg-brand-navy border border-brand-gold/40 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-3 h-3 text-brand-gold animate-spin" />
                </div>
                <div className="bg-[#121B32] border border-brand-gold/30 rounded-2xl rounded-tl-none p-3 flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] text-brand-gold font-medium tracking-wider pl-1">
                    Stylist is crafting guidance...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (Shows when only initial message exists) */}
          {messages.length === 1 && !isLoading && (
            <div className="px-4 pb-2 flex-shrink-0">
              <span className="text-[10px] text-brand-gold/80 font-bold uppercase tracking-wider block mb-1.5">
                Suggested Inquiries:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((suggestion, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleSend(suggestion)}
                    className="text-[11px] text-left px-2.5 py-1 rounded-full bg-[#15203A] hover:bg-brand-gold hover:text-brand-navy text-slate-200 border border-brand-gold/30 transition-all font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input & Action Bar */}
          <div className="p-3 bg-[#080E1C] border-t border-brand-gold/25 flex-shrink-0 space-y-2">
            <div className="flex items-center space-x-2 bg-[#121B32] rounded-xl border border-white/15 px-3 py-1.5 focus-within:border-brand-gold transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about suits, fabrics, sizing, or prices..."
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading}
                className="w-8 h-8 rounded-lg bg-brand-gold text-brand-navy flex items-center justify-center hover:bg-amber-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 cursor-pointer shadow-sm"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct WhatsApp Fast-Track */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 px-1 pt-0.5">
              <span>Powered by Gemini 2.5 Flash</span>
              <a
                href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20talk%20to%20a%20master%20tailor."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center space-x-1 hover:underline"
              >
                <MessageSquare className="w-3 h-3 fill-emerald-400" />
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
          className={`hidden sm:flex items-center space-x-2 absolute bottom-18 sm:bottom-20 right-0 px-3.5 py-2 rounded-full bg-gradient-to-r from-brand-navy-dark via-brand-navy to-[#0F1E3D] text-white border border-brand-gold/70 shadow-2xl transition-all duration-300 pointer-events-none whitespace-nowrap ${
            isTooltipVisible
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
          }`}
        >
          <div className="w-5 h-5 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/50 flex-shrink-0">
            <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
          </div>
          <div className="flex flex-col text-left pr-1">
            <span className="text-[11px] font-bold text-brand-gold tracking-wide leading-tight">
              Modern Man AI Stylist
            </span>
            <span className="text-[9px] text-slate-300 font-medium tracking-normal leading-tight">
              Ask about Suits, Fabrics &amp; Sizing
            </span>
          </div>
        </div>

        {/* Main Floating AI Stylist Button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0F1E3D] via-[#0A1329] to-[#050A14] text-brand-gold flex items-center justify-center border-2 border-brand-gold shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_15px_rgba(212,175,55,0.35)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.65)] transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer group/btn ${
            isOpen ? 'ring-2 ring-brand-gold/60 ring-offset-2 ring-offset-brand-navy' : ''
          }`}
          aria-label={isOpen ? "Close Modern Man AI Stylist" : "Open Modern Man AI Stylist"}
          title={isOpen ? "Close AI Stylist" : "Modern Man AI Stylist"}
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
