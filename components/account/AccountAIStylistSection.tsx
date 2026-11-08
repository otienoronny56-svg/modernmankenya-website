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
  ShieldCheck,
  CheckCircle2,
  Clock,
  Scissors
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const SUGGESTIONS = [
  'What are your 3 Made to Measure suit tiers & prices?',
  'Recommend styling for an upcoming black-tie wedding',
  'What accessories & cufflinks do you stock?',
  "Tell me about women's made to measure power suits",
  "Do you make children's & page boy wedding suits?",
  'How should I care for my 100% pure wool suit?'
];

export const AccountAIStylistSection: React.FC<{ clientName: string }> = ({ clientName }) => {
  const initialGreeting: ChatMessage = {
    id: 'welcome',
    role: 'model',
    content: `Welcome to your private atelier portal, **${clientName || 'Gentleman'}**.

I am your personal **Modern Man Kenya Made to Measure Stylist**. I can assist you with:
• **Suit Tier Advisory**: Standard (18k–25k, 1 wk), Premium (30k–45k, 2 wks), Executive (50k–200k, 3–4 wks)
• **Occasion Ensembles**: Wedding tuxedos, gala eveningwear, boardroom power suits, and African Kaftans
• **Wardrobe Expansion**: Women's tailored suits, children's wedding sets, and matching groomsmen
• **Accessory Pairing**: Onyx cufflinks, 24K gold tie clips, silk cravats, bowties, and master fedoras
• **Fabric Maintenance**: Caring for Super 130s-180s merino wools, silk satins, and jacquards in Kenya

How can I refine your sartorial presence today?`,
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
      const historyForApi = messages
        .filter((m) => m.id !== 'welcome')
        .concat(userMsg)
        .map((m) => ({
          role: m.role,
          parts: [{ text: m.content }]
        }));

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyForApi
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reach stylist service');
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
          content: `Our master tailors are always available on WhatsApp for direct consultations. You can reach out directly via: [WhatsApp Atelier Concierge](https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20have%20a%20suiting%20inquiry%20from%20my%20dashboard).`,
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
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col min-h-[640px]">
      
      {/* Top Luxury Banner */}
      <div className="bg-gradient-to-r from-brand-navy via-[#0C152C] to-[#0A1128] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-gold/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/20 border border-brand-gold/60 text-brand-gold flex items-center justify-center flex-shrink-0 shadow-inner">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                Privileged Atelier Intelligence
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              Personal Made to Measure Stylist
            </h2>
            <p className="text-xs text-slate-300 font-light">
              Trained on Kenyan Made to Measure tailoring, fabrics, sizing, and luxury finishing.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition-colors border border-white/15"
            title="Start new consultation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
          <a
            href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20inquiring%20from%20my%20client%20dashboard."
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
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 sm:px-6 py-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mr-1 flex items-center space-x-1">
            <Scissors className="w-3 h-3 text-brand-gold" />
            <span>Quick Inquiries:</span>
          </span>
          {SUGGESTIONS.map((s, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(s)}
              className="text-xs px-3 py-1.5 rounded-full bg-white hover:bg-brand-gold hover:text-brand-navy text-slate-700 border border-slate-200 transition-all font-medium shadow-2xs hover:shadow-xs"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Message History Thread */}
      <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[500px] bg-slate-50/50">
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
              className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-xs ${
                msg.role === 'user'
                  ? 'bg-brand-navy text-white rounded-tr-none'
                  : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none space-y-2'
              }`}
            >
              {msg.content.split('\n').map((line, lIdx) => {
                if (!line.trim()) return <div key={lIdx} className="h-1.5" />;
                const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
                return (
                  <p key={lIdx} className={isBullet ? 'pl-2 border-l-2 border-brand-gold/50 my-1' : ''}>
                    {line}
                  </p>
                );
              })}
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
            <div className="bg-white text-slate-600 rounded-2xl rounded-tl-none p-4 text-xs border border-slate-200 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:0.4s]" />
              <span className="text-slate-500 font-medium ml-1">Consulting atelier records...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Bar */}
      <div className="p-4 bg-white border-t border-slate-200/90">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2 bg-slate-50 rounded-xl border border-slate-300 p-1.5 focus-within:border-brand-navy transition-colors"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about suits, fabrics, sizing, price tiers, or accessories..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-1.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="px-4 py-2 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1 shadow-sm"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-2 pt-2">
          <span>Powered by Modern Man Atelier AI (Gemini 2.5 Flash)</span>
          <span>Made to Measure Nairobi</span>
        </div>
      </div>

    </div>
  );
};

