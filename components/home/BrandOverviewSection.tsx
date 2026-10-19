'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { BRAND_PROFILE } from '@/data/brandProfile';

export const BrandOverviewSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Subtle Category Pill */}
        <div className="inline-flex items-center space-x-2 text-xs uppercase tracking-luxury text-brand-gold font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Atelier Philosophy</span>
        </div>

        {/* Concise Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold leading-tight">
          Crafting Tailored Confidence in Nairobi
        </h2>

        {/* Short, Refined Statement (No Bespoke, No Bloat) */}
        <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-3xl mx-auto">
          Modern Man Kenya is dedicated to the art of made-to-measure tailoring. 
          Every suit, blazer, and shirt is sculpted to your personal anatomy, 
          uniting classic tailoring codes with contemporary African sophistication.
        </p>

        {/* Core Pillars - Minimalist & Sleek */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 text-left">
          <div className="p-5 bg-brand-canvas-alt rounded border border-slate-100">
            <h3 className="font-serif text-base font-bold text-brand-navy mb-1.5">Precise Fit</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Cut to your individual measurements for natural posture and clean silhouettes.
            </p>
          </div>

          <div className="p-5 bg-brand-canvas-alt rounded border border-slate-100">
            <h3 className="font-serif text-base font-bold text-brand-navy mb-1.5">Floating Canvas</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Traditional canvas construction that moulds to your body over time.
            </p>
          </div>

          <div className="p-5 bg-brand-canvas-alt rounded border border-slate-100">
            <h3 className="font-serif text-base font-bold text-brand-navy mb-1.5">Personal Character</h3>
            <p className="text-xs text-slate-600 font-light leading-relaxed">
              Curated fabrics, lapels, and linings tailored for your lifestyle and occasion.
            </p>
          </div>
        </div>

        {/* Concise Link to Experience */}
        <div className="pt-4">
          <Link
            href="/the-experience"
            className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors"
          >
            <span>Learn About Our Made to Measure Process</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
          </Link>
        </div>

      </div>
    </section>
  );
};
