'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  Send, 
  RotateCcw, 
  MessageSquare, 
  User, 
  ExternalLink,
  Tag,
  CalendarCheck,
  Scissors
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  'What are your 3 Made to Measure suit tiers & timelines?',
  'Recommend black-tie wedding tuxedos from the gallery',
  'Legal advocate & courtroom power suits',
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
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
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
                  className="inline-flex items-center space-x-1 px-2 py-0.5 mx-0.5 my-0.5 rounded-md bg-brand-gold/15 hover:bg-brand-gold/30 text-amber-700 dark:text-amber-300 font-semibold border border-brand-gold/40 transition-all text-xs"
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
                  className="inline-flex items-center space-x-1 px-2.5 py-1 mx-0.5 my-0.5 rounded-md bg-gradient-to-r from-brand-gold to-amber-400 hover:from-amber-300 hover:to-brand-gold text-brand-navy font-bold transition-all text-xs shadow-xs"
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
                  className="inline-flex items-center space-x-0.5 text-brand-gold underline font-semibold hover:opacity-80 transition-opacity"
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
                  className="inline-flex items-center space-x-1 px-2 py-0.5 mx-0.5 my-0.5 rounded-md bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30 transition-all text-xs"
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
            className={isBullet ? 'pl-3 border-l-2 border-brand-gold/50 my-1' : ''}
          >
            {parts}
          </p>
        );
      })}
    </div>
  );
}

export const AccountAIStylistSection: React.FC<{ clientName: string }> = ({ clientName }) => {
  const initialGreeting: ChatMessage = {
    id: 'welcome',
    role: 'model',
    content: `Welcome to your private atelier portal, **${clientName || 'Patron'}**.

I am **Kasuku**, your Lead Sartorial AI Advisor at **Modern Man Kenya**.

I provide immediate, authoritative guidance on:
• **Suit Tier Advisory**: Standard (18k–25k, 1 wk), Premium (30k–45k, 2 wks), Executive (50k–200k, 3–4 wks)
• **170 Gallery Ensembles**: Direct recommendations across Suits, Tuxedos, Kaftans, Traditional, Kids & Women
• **Anatomical Measurements**: 35-point bespoke measurements, floating horsehair canvas & Gurkha side adjusters
• **Atelier Appointments**: Schedule fitting consultations at our Nairobi atelier (Tubman Road, opposite City Market)

Tell me your occasion, preferred silhouette, or fabric inquiry.`,
    timestamp: new Date()
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (messageToSend?: string) => {
    const text = (messageToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageToSend) setInput('');
    setIsLoading(true);

    try {
      const allMessages = [...messages, userMsg];

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: allMessages.map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reach Kasuku AI service');
      }

      const modelReply: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        content: data.reply || 'Our master tailor concierge is at your service. Please let me know how I can assist with your suit commission.',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelReply]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'model',
          content: `Our master tailors are always available on WhatsApp for direct consultations. You can reach out directly via: [WhatsApp Atelier Concierge](https://wa.me/254114122510?text=Hello%20Kasuku%2C%20I%20have%20a%20suiting%20inquiry%20from%20my%20dashboard).`,
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([initialGreeting]);
  };

  return (
    <div className="bg-white dark:bg-[#0c1222] rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-sm overflow-hidden flex flex-col min-h-[640px]">
      
      {/* Top Luxury Banner */}
      <div className="bg-gradient-to-r from-brand-navy via-[#0C152C] to-[#0A1128] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold/60 text-brand-gold flex items-center justify-center flex-shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                Kasuku • Sartorial AI Advisor
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              Lead Atelier Made to Measure Advisor
            </h2>
            <p className="text-xs text-slate-300 font-light">
              Trained on 170 Handcrafted Modern Man Ensembles, fabrics, sizing &amp; Nairobi atelier lore.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-white/15 cursor-pointer"
            title="Start new consultation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
          <a
            href="https://wa.me/254114122510?text=Hello%20Kasuku%2C%20inquiring%20from%20my%20client%20dashboard."
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp Tailor</span>
          </a>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="bg-slate-50 dark:bg-[#080d19] border-b border-slate-200/80 dark:border-white/10 px-4 sm:px-6 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1 flex items-center space-x-1">
            <Scissors className="w-3 h-3 text-brand-gold" />
            <span>Quick Inquiries:</span>
          </span>
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-[#121a2e] hover:bg-brand-gold hover:text-brand-navy text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/15 transition-all font-medium shadow-2xs hover:shadow-xs cursor-pointer"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Message History Thread */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[500px] bg-slate-50/50 dark:bg-[#070b14]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs shadow-xs ${
                msg.role === 'user'
                  ? 'bg-brand-gold text-brand-navy font-bold'
                  : 'bg-brand-navy text-brand-gold border border-brand-gold/40'
              }`}
            >
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            </div>

            <div
              className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.role === 'user'
                  ? 'bg-brand-navy text-white rounded-tr-none'
                  : 'bg-white dark:bg-[#121a2e] text-slate-800 dark:text-slate-100 border border-slate-200/90 dark:border-white/10 rounded-tl-none space-y-2'
              }`}
            >
              <FormattedMessageText text={msg.content} />
              <div
                className={`text-[9px] pt-1 ${
                  msg.role === 'user' ? 'text-blue-200 text-right' : 'text-slate-400 text-left'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0 border border-brand-gold/40">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-white dark:bg-[#121a2e] text-slate-600 dark:text-slate-300 rounded-2xl rounded-tl-none p-4 text-xs border border-slate-200 dark:border-white/10 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.4s]" />
              <span className="text-slate-500 dark:text-slate-400 font-medium ml-1">Kasuku is consulting atelier archives...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-white dark:bg-[#090e1c] border-t border-slate-200/90 dark:border-white/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2 bg-slate-50 dark:bg-[#121a2e] rounded-xl border border-slate-300 dark:border-white/20 p-1.5 focus-within:border-brand-navy dark:focus-within:border-brand-gold transition-colors"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Kasuku about suits, fabrics, sizing, price tiers, or gallery garments..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 rounded-lg bg-brand-gold hover:bg-amber-300 text-brand-navy font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 shadow-sm cursor-pointer"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-2 pt-2">
          <span>Kasuku Sartorial AI • Gemini 2.5 Flash</span>
          <span>Made to Measure Nairobi</span>
        </div>
      </div>

    </div>
  );
};
