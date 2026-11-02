'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, MessageSquare, X, ArrowRight, HeartHandshake, Scissors } from 'lucide-react';

interface ModernManAIAssistantProps {
  onOpenChat?: () => void;
}

export const ModernManAIAssistant: React.FC<ModernManAIAssistantProps> = ({ onOpenChat }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Show a gentle teaser tooltip on initial page load after 2.5s, then hide after 6s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 2500);

    const hideTimer = setTimeout(() => {
      setShowTeaser(false);
    }, 8500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Close when clicking outside the popover
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleClick = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      setIsOpen(!isOpen);
    }
  };

  const isTooltipVisible = (isHovered || showTeaser) && !isOpen;

  return (
    <>
      {/* Soothing "Coming Soon" Atelier Popover Card */}
      {isOpen && (
        <div
          ref={modalRef}
          className="fixed bottom-22 sm:bottom-24 right-4 sm:right-6 z-50 max-w-[340px] sm:max-w-[380px] w-[calc(100vw-2rem)] bg-[#0A1226]/95 backdrop-blur-xl rounded-3xl border border-brand-gold/60 shadow-2xl p-6 text-white space-y-4 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        >
          {/* Top Subtle Gold Accent Line */}
          <div className="absolute -top-[1px] left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-navy border border-brand-gold/40 flex items-center justify-center shadow-md">
                <Image
                  src="/images/logo-emblem.png"
                  alt="Modern Man Crest"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-luxury text-brand-gold uppercase block">
                  Modern Man Kenya
                </span>
                <span className="text-xs font-serif font-bold text-white block">
                  Atelier AI Stylist
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content */}
          <div className="space-y-2.5">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-brand-gold text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-brand-gold animate-pulse" />
              <span>In The Atelier Cutting Room</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-white tracking-tight">
              Crafting Pure Elegance
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              True bespoke excellence cannot be rushed. Our AI Sartorial Stylist is currently being tailored on millimetric drape analysis, Savile Row cuts, and our exclusive English &amp; Italian fabric vaults.
            </p>

            <p className="text-xs text-brand-gold/90 font-medium italic pt-0.5">
              "Arriving shortly to curate your bespoke silhouette with millimetric precision."
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-3 space-y-2">
            <p className="text-[11px] text-slate-400">
              Need immediate advice or ready to commission a piece?
            </p>

            <a
              href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20consult%20with%20a%20Master%20Tailor."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-gold to-amber-300 hover:from-amber-300 hover:to-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-brand-navy fill-brand-navy" />
              <span>Speak with Master Tailor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Container */}
      <div className="fixed bottom-6 right-[86px] sm:right-[100px] z-50 flex items-center group pointer-events-none">
        {/* Luxury Tooltip / Teaser Badge (Floats cleanly directly above the AI button) */}
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
              Bespoke Styling, Fabrics &amp; Sizing
            </span>
          </div>
        </div>

        {/* Main Floating AI Stylist Button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#0F1D3D] via-[#0A1226] to-[#040814] text-brand-gold flex items-center justify-center border-2 border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:shadow-[0_0_28px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group/btn ${
            isOpen ? 'ring-2 ring-brand-gold ring-offset-2 ring-offset-brand-navy scale-105' : ''
          }`}
          aria-label="Open Modern Man AI Stylist"
          title="Modern Man AI Stylist"
        >
          {/* Breathing Outer Gold Ring */}
          <span className="absolute -inset-1 rounded-full bg-brand-gold/30 animate-ping pointer-events-none opacity-60 duration-1000" />

          {/* Ambient Subtle Gold Radial Shimmer */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-gold/20 via-transparent to-amber-200/25 pointer-events-none" />

          {/* Brand Crest Emblem */}
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-105">
            <Image
              src="/images/logo-emblem.png"
              alt="Modern Man AI Emblem"
              width={36}
              height={36}
              className="object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              priority
            />
          </div>

          {/* Floating AI Sparkle Badge (Bottom-Right of the Medallion) */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-brand-gold text-brand-navy flex items-center justify-center shadow-md border-2 border-[#0A1226]">
            <Sparkles className="w-2.5 h-2.5 text-brand-navy fill-brand-navy animate-pulse" />
          </div>

          {/* Tiny "AI" Luxury Pill Badge (Top of Medallion) */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-brand-gold text-brand-navy text-[8px] font-black tracking-widest uppercase shadow-sm border border-brand-navy/60">
            AI
          </div>
        </button>
      </div>
    </>
  );
};

