'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { OCCASIONS } from '@/data/brandProfile';

export const OccasionsSection: React.FC = () => {
  return (
    <section id="occasions" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored for Significance</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
            Occasions
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light leading-relaxed">
            Whether commanding a corporate boardroom, celebrating milestone nuptials, or stepping into a gala, Modern Man Kenya crafts the defining silhouette.
          </p>
        </div>

        {/* 4 Occasions Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              className="bg-brand-canvas-alt rounded-lg overflow-hidden border border-slate-200/80 hover:border-brand-gold/50 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col md:flex-row group"
            >
              {/* Image Col */}
              <div className="relative aspect-[4/5] md:aspect-auto md:w-1/2 overflow-hidden bg-slate-900 flex-shrink-0">
                <Image
                  src={occ.image}
                  alt={occ.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent md:hidden" />
              </div>

              {/* Text Col */}
              <div className="p-6 sm:p-8 flex flex-col justify-between md:w-1/2 space-y-4">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {occ.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 space-y-1.5">
                    {occ.highlights.map((h) => (
                      <div key={h} className="flex items-center space-x-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-brand-navy hover:text-brand-gold transition-colors"
                  >
                    <span>Commission for {occ.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
