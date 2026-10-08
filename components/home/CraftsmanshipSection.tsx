'use client';

import React from 'react';
import { Layers, Scissors, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { CRAFTSMANSHIP_PILLARS } from '@/data/brandProfile';

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Sparkles,
  Scissors,
  ShieldCheck,
};

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>Master Sartorial Standard</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
            Craftsmanship & Construction
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light leading-relaxed">
            Every Modern Man Kenya garment is constructed with an unyielding commitment to sartorial integrity, 
            structural longevity, and human artisanal discipline.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => {
            const Icon = iconMap[pillar.icon] || Scissors;
            return (
              <div
                key={pillar.title}
                className="bg-brand-canvas-alt p-6 sm:p-8 rounded-lg border border-slate-200/80 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-luxury"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-sm bg-brand-navy text-white group-hover:bg-brand-gold transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5 stroke-1.5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-gold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center space-x-1.5 text-[11px] font-bold text-brand-navy">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
