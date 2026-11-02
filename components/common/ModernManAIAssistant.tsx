'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sparkles, MessageSquare, X } from 'lucide-react';

interface ModernManAIAssistantProps {
  onOpenChat?: () => void;
}

export const ModernManAIAssistant: React.FC<ModernManAIAssistantProps> = ({ onOpenChat }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

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

  const handleClick = () => {
    if (onOpenChat) {
      onOpenChat();
    } else {
      // Friendly initial feedback until full chat modal is wired
      alert('Modern Man AI Stylist is getting ready to assist you with bespoke styling, fabric curation, and sizing advice!');
    }
  };

  const isTooltipVisible = isHovered || showTeaser;

  return (
    <div className="fixed bottom-23 sm:bottom-25 right-6 z-50 flex items-center group pointer-events-none">
      {/* Luxury Tooltip / Teaser Badge (Glides out to the left) */}
      <div
        className={`hidden sm:flex items-center space-x-2 mr-3 px-3.5 py-2 rounded-full bg-gradient-to-r from-brand-navy-dark via-brand-navy to-[#0F1E3D] text-white border border-brand-gold/70 shadow-2xl transition-all duration-300 pointer-events-none ${
          isTooltipVisible
            ? 'opacity-100 translate-x-0 scale-100'
            : 'opacity-0 translate-x-3 scale-95 pointer-events-none'
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
            Bespoke Styling, Fabrics & Sizing
          </span>
        </div>
      </div>

      {/* Main Floating AI Stylist Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="pointer-events-auto relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0F1D3D] via-[#0A1226] to-[#040814] text-brand-gold flex items-center justify-center border-2 border-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.45)] hover:shadow-[0_0_28px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer group/btn"
        aria-label="Open Modern Man AI Stylist"
        title="Modern Man AI Stylist"
      >
        {/* Breathing Outer Gold Ring */}
        <span className="absolute -inset-1 rounded-full bg-brand-gold/30 animate-ping pointer-events-none opacity-60 duration-1000" />

        {/* Ambient Subtle Gold Radial Shimmer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-gold/20 via-transparent to-amber-200/25 pointer-events-none" />

        {/* Brand Crest Emblem */}
        <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-transform duration-300 group-hover/btn:scale-105">
          <Image
            src="/images/logo-emblem.png"
            alt="Modern Man AI Emblem"
            width={32}
            height={32}
            className="object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
            priority
          />
        </div>

        {/* Floating AI Sparkle Badge (Bottom-Right of the Medallion) */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-brand-gold text-brand-navy flex items-center justify-center shadow-md border-2 border-[#0A1226]">
          <Sparkles className="w-2.5 h-2.5 text-brand-navy fill-brand-navy animate-pulse" />
        </div>

        {/* Tiny "AI" Luxury Pill Badge (Top of Medallion) */}
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-brand-gold text-brand-navy text-[8px] font-black tracking-widest uppercase shadow-sm border border-brand-navy/60">
          AI
        </div>
      </button>
    </div>
  );
};

