'use client';

import React, { useEffect, useState, useRef } from 'react';

export const MeasuringTapeTransition: React.FC = () => {
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

  const tapePercent = Math.min(Math.max(progress * 100, 2), 98);
  const cmValue = Math.round(tapePercent * 1.5); // Maps to ~0 to 150 cm

  return (
    <div
      ref={containerRef}
      className="relative w-full h-12 sm:h-14 bg-gradient-to-b from-white via-stone-50 to-brand-canvas-alt overflow-hidden flex items-center select-none border-y border-slate-200/60"
    >
      {/* 1. Underlying Tailor Guide Seam */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-200" />

      {/* 2. Unrolling Yellow/Gold Tailor's Tape Measure */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 h-7 sm:h-8 bg-amber-100/90 border-y border-amber-300 shadow-inner flex items-center transition-all duration-75 ease-out overflow-hidden"
        style={{ width: `${tapePercent}%` }}
      >
        {/* Subtle cloth weave texture and tick marks repeat */}
        <div className="w-full h-full flex items-center justify-between px-2 text-stone-700 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 32">
            {/* Fine tick marks across 1000 units */}
            {Array.from({ length: 50 }).map((_, i) => {
              const x = (i / 50) * 1000;
              const isMajor = i % 5 === 0;
              return (
                <g key={i}>
                  <line
                    x1={x}
                    y1={0}
                    x2={x}
                    y2={isMajor ? 14 : 7}
                    stroke="#854d0e"
                    strokeWidth={isMajor ? 1.5 : 0.8}
                    opacity={0.8}
                  />
                  {isMajor && i > 0 && (
                    <text
                      x={x + 3}
                      y={22}
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                      fill="#854d0e"
                    >
                      {i * 3}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 3. Gold Metallic End Clip of Measuring Tape with Pull Tab */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 ease-out z-20 flex items-center pointer-events-none"
        style={{ left: `${tapePercent}%` }}
      >
        <div className="relative flex items-center filter drop-shadow-[0_2px_6px_rgba(212,175,55,0.7)]">
          {/* Metallic Gold Clip Plate */}
          <div className="w-4 h-9 sm:h-10 bg-gradient-to-r from-amber-600 via-yellow-300 to-amber-500 rounded-xs border border-amber-700 flex items-center justify-center">
            {/* Rivet */}
            <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-yellow-200" />
          </div>

          {/* Measurement Tag */}
          <span className="hidden sm:inline-block ml-2 text-[9px] font-mono tracking-widest uppercase text-brand-navy bg-brand-gold px-1.5 py-0.5 rounded border border-brand-navy/20 font-bold shadow-xs whitespace-nowrap">
            {cmValue} cm Fit
          </span>
        </div>
      </div>
    </div>
  );
};
