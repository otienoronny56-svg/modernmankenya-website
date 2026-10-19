'use client';

import React, { useEffect, useState, useRef } from 'react';

export const ChalkSeamTransition: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const start = windowHeight;
      const end = windowHeight * 0.25;

      const current = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      setProgress(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const chalkPercent = Math.min(Math.max(progress * 100, 2), 98);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 sm:h-14 bg-gradient-to-b from-stone-900 via-stone-850 to-stone-900 overflow-hidden flex items-center select-none border-y border-stone-800"
    >
      {/* 1. Underlying Chalk Guide Line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-stone-700/50" />

      {/* 2. Tailor's Golden/White Chalk Stroke (drawn in real time) */}
      <svg
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="8"
          x2={`${chalkPercent}%`}
          y2="8"
          stroke="#F5E6BE"
          strokeWidth="2"
          strokeDasharray="10 3"
          strokeLinecap="round"
          className="transition-all duration-75"
        />
      </svg>

      {/* 3. Tailor's Triangular Chalk Gliding Across */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 ease-out z-20 flex items-center pointer-events-none"
        style={{ left: `${chalkPercent}%` }}
      >
        <div className="relative flex items-center filter drop-shadow-[0_2px_8px_rgba(245,230,190,0.5)]">
          {/* Triangular Tailor's Chalk SVG */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-[30deg]"
          >
            {/* Rounded Triangle Chalk Body */}
            <polygon
              points="16,3 30,27 2,27"
              fill="#F5E6BE"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            {/* Center Indentation Grip */}
            <circle cx="16" cy="19" r="3.5" fill="#E8D5A5" stroke="#CBB47B" strokeWidth="0.8" />
          </svg>

          {/* Chalk Seam Mark Badge */}
          <span className="hidden sm:inline-block ml-2 text-[9px] font-mono tracking-widest uppercase text-brand-navy bg-brand-gold/90 px-1.5 py-0.5 rounded border border-brand-gold/40 font-bold whitespace-nowrap shadow-xs">
            Chalk Draft {Math.round(chalkPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
};
