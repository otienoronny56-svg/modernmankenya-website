'use client';

import React, { useEffect, useState, useRef } from 'react';

export const ScissorsCutTransition: React.FC = () => {
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

  const scissorsPercent = Math.min(Math.max(progress * 100, 2), 98);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 sm:h-14 bg-gradient-to-b from-brand-canvas-alt via-stone-100 to-white overflow-hidden flex items-center select-none border-y border-slate-200/60"
    >
      {/* 1. Tailor's Chalk Cutting Guide Line */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-300/80" />

      {/* 2. Cut Fabric Seam (Clean golden slice following the scissors) */}
      <svg
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 w-full h-4 pointer-events-none"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="8"
          x2={`${scissorsPercent}%`}
          y2="8"
          stroke="#D4AF37"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="transition-all duration-75"
        />
      </svg>

      {/* 3. Golden Tailor's Shears Gliding Across Screen */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 ease-out z-20 flex items-center pointer-events-none"
        style={{ left: `${scissorsPercent}%` }}
      >
        <div className="relative flex items-center filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)]">
          {/* Tailor's Shears SVG */}
          <svg
            width="42"
            height="26"
            viewBox="0 0 42 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-[6deg]"
          >
            {/* Top Blade */}
            <path
              d="M12 12 L39 7 L14 14 Z"
              fill="url(#bladeGrad)"
              stroke="#D4AF37"
              strokeWidth="0.8"
            />
            {/* Bottom Blade */}
            <path
              d="M12 14 L39 19 L14 12 Z"
              fill="url(#bladeGrad)"
              stroke="#D4AF37"
              strokeWidth="0.8"
            />
            {/* Pivot Screw */}
            <circle cx="13" cy="13" r="2.2" fill="#1e1e24" stroke="#D4AF37" strokeWidth="1.2" />

            {/* Top Handle Bow */}
            <path
              d="M13 11 C11 7, 7 4, 3 6 C-1 8, 0 13, 3 13 C6 13, 10 12, 13 11 Z"
              fill="url(#handleGrad)"
              stroke="#B38F26"
              strokeWidth="1.2"
            />
            {/* Bottom Handle Bow (Larger for fingers) */}
            <path
              d="M13 15 C11 20, 6 24, 2 21 C-1 18, 1 14, 4 14 C7 14, 10 15, 13 15 Z"
              fill="url(#handleGrad)"
              stroke="#B38F26"
              strokeWidth="1.2"
            />

            <defs>
              <linearGradient id="bladeGrad" x1="12" y1="7" x2="40" y2="19" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#ECECEC" />
                <stop offset="40%" stopColor="#FFFFFF" />
                <stop offset="85%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFDF73" />
              </linearGradient>
              <linearGradient id="handleGrad" x1="0" y1="5" x2="14" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#947416" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFDF73" />
              </linearGradient>
            </defs>
          </svg>

          {/* Cutting Measurement Badge */}
          <span className="hidden sm:inline-block ml-2 text-[9px] font-mono tracking-widest uppercase text-brand-navy bg-brand-gold/90 px-1.5 py-0.5 rounded border border-brand-gold font-bold shadow-xs whitespace-nowrap">
            Precision Cut {Math.round(scissorsPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
};
