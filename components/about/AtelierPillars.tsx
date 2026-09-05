'use client';

import React from 'react';
import { Ruler, ShieldCheck, Gem, Sparkles, HeartHandshake, Award } from 'lucide-react';

export const AtelierPillars: React.FC = () => {
  const pillars = [
    {
      num: '01',
      icon: Ruler,
      title: '35 Millimetric Measurements',
      desc: 'Our Master Cutter measures shoulder pitch, chest arch, spine curve, and wrist drop. A dedicated paper block is drafted exclusively for your anatomy.',
    },
    {
      num: '02',
      icon: ShieldCheck,
      title: 'Full Floating Horsehair Canvas',
      desc: 'We never fuse glue to fabric. Natural horsehair and camel-hair canvases are suspended inside the chest piece, adapting to your warmth and contour over decades.',
    },
    {
      num: '03',
      icon: Gem,
      title: 'Prestigious European Mill Cloths',
      desc: 'Direct mill curation from Huddersfield, Yorkshire, and Biella, Italy—featuring Scabal Super 150s, Dormeuil Amadeus, and Loro Piana Tasmanian wools.',
    },
    {
      num: '04',
      icon: HeartHandshake,
      title: 'Lifetime Relining & Sartorial Care',
      desc: 'Your bespoke garment is backed by lifetime tailoring care at our Nairobi Atelier. We adjust waistlines, refresh pressings, and reline linings as you evolve.',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-brand-navy text-white relative overflow-hidden border-b border-brand-gold/20">
      <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-luxury text-brand-gold">
            Uncompromising Principles
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold">
            The Four Pillars of the Atelier
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
            Every stitch, seam, and baste in our Nairobi workshop follows the strict disciplines 
            of high sartorial architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                className="bg-white/5 border border-brand-gold/20 rounded-lg p-6 hover:border-brand-gold/60 transition-all duration-300 hover:bg-white/[0.08] group relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-serif text-2xl font-bold text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                      {p.num}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center text-brand-gold group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white mb-2.5 group-hover:text-brand-gold transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center space-x-1.5 text-[10px] uppercase tracking-luxury text-brand-gold font-semibold">
                  <Award className="w-3 h-3" />
                  <span>Modern Man Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
