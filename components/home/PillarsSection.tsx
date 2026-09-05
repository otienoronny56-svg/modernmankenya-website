'use client';

import React from 'react';
import { Scissors, Ruler, Layers, Sparkles } from 'lucide-react';

export const PillarsSection: React.FC = () => {
  const pillars = [
    {
      icon: Scissors,
      title: 'Handcrafted Heritage',
      subtitle: 'The Full Floating Canvas Discipline',
      description:
        'Unlike glued or fused commercial garments, every Modern Man suit features a floating horsehair canvas interior. Hand-padded by veteran artisans, it molds progressively to your natural posture over time, ensuring effortless breathability and drape in any climate.',
      badge: 'Master Bespoke Standard',
    },
    {
      icon: Ruler,
      title: 'Millimetric Precision',
      subtitle: '35+ Anatomical Contour Data Points',
      description:
        'We draft an individual cardboard pattern cut strictly to your physique. Incorporating shoulder slope, back curvature, chest pitch, and sleeve rotation, ensuring a flawless silhouette that moves fluidly with every stride.',
      badge: 'Zero Generic Blocks',
    },
    {
      icon: Layers,
      title: 'Premium Imported Cloths',
      subtitle: 'Yorkshire, Biella & Scottish Weaves',
      description:
        'Direct partnerships with the world’s most prestigious mills: Scabal (Huddersfield), Dormeuil (England/France), Loro Piana (Italy), and Holland & Sherry (London). From Super 150s merino wools to pure silk velvets and Irish linens.',
      badge: '4,000+ Swatches',
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-brand-canvas-alt relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Foundations of Bespoke</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl text-brand-navy font-bold tracking-tight">
            Three Uncompromising Pillars of Sartorial Mastery
          </h2>
          <p className="text-xs sm:text-sm text-brand-slate-muted font-light leading-relaxed">
            In our Nairobi atelier, time-honored British tailoring traditions meet modern African prestige.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-luxury hover:shadow-luxury-hover border border-slate-200 hover:border-brand-gold/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-sm bg-brand-navy/5 text-brand-navy group-hover:bg-brand-gold group-hover:text-white transition-all flex items-center justify-center">
                      <Icon className="w-6 h-6 stroke-1.5" />
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-brand-gold bg-brand-gold/10 px-2.5 py-1 rounded">
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-brand-navy mb-1 group-hover:text-brand-gold transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-brand-slate-muted mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-navy">
                  <span className="font-serif text-slate-300">Pillar 0{index + 1}</span>
                  <span className="group-hover:translate-x-1 transition-transform text-brand-gold">
                    Master Atelier Certified &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
