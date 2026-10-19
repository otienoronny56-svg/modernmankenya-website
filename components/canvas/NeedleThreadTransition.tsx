'use client';

import React, { useEffect, useState, useRef } from 'react';

export const NeedleThreadTransition: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress as the section approaches and crosses the center of the viewport
      // Starts when the top of container enters from bottom (rect.top <= windowHeight)
      // Completes when it moves up towards top (rect.top <= windowHeight * 0.25)
      const start = windowHeight;
      const end = windowHeight * 0.25;

      const current = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      setProgress(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Needle position percentage across screen (clamp between 2% and 98%)
  const needlePercent = Math.min(Math.max(progress * 100, 2), 98);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 sm:h-14 bg-gradient-to-b from-stone-900 via-stone-800 to-brand-canvas-alt overflow-hidden flex items-center select-none"
    >
      {/* 1. Subtle Background Seam Guide Line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-700/40" />

      {/* 2. Dynamic Stitched Gold Basting Thread (drawn in real time as user scrolls) */}
      <svg
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="8"
          x2={`${needlePercent}%`}
          y2="8"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeDasharray="6 4"
          strokeLinecap="round"
          className="transition-all duration-75"
        />
      </svg>

      {/* 3. Golden Tailor's Needle Gliding Across */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 ease-out z-20 flex items-center pointer-events-none"
        style={{ left: `${needlePercent}%` }}
      >
        <div className="relative flex items-center filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.7)]">
          {/* Needle Eye Thread Loop */}
          <div className="w-2.5 h-2.5 rounded-full border border-brand-gold bg-brand-gold/30 -mr-1 animate-pulse" />

          {/* Needle Body SVG */}
          <svg
            width="38"
            height="14"
            viewBox="0 0 38 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-[-8deg]"
          >
            {/* Eye of the Needle */}
            <ellipse cx="6" cy="7" rx="3.5" ry="1.2" fill="#1e1e24" stroke="#D4AF37" strokeWidth="1.2" />
            
            {/* Tapered Needle Shaft to Sharp Point */}
            <path
              d="M2 7 C2 5.5, 8 5.2, 16 5.8 L36 7 L16 8.2 C8 8.8, 2 8.5, 2 7 Z"
              fill="url(#needleGrad)"
              stroke="#D4AF37"
              strokeWidth="0.8"
            />
            {/* Specular Highlight along spine */}
            <path d="M6 7 L32 7" stroke="#FFF" strokeWidth="0.6" strokeLinecap="round" opacity="0.85" />

            <defs>
              <linearGradient id="needleGrad" x1="0" y1="0" x2="38" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#A88A00" />
                <stop offset="50%" stopColor="#FFDF73" />
                <stop offset="90%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Tailor's Chalk/Precision Label */}
          <span className="hidden sm:inline-block ml-2 text-[9px] font-mono tracking-widest uppercase text-brand-gold bg-black/60 px-1.5 py-0.5 rounded border border-brand-gold/40 backdrop-blur-xs whitespace-nowrap">
            {Math.round(needlePercent)}mm
          </span>
        </div>
      </div>
    </div>
  );
};
