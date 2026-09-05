'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Shield, Award, Compass, Scissors } from 'lucide-react';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-brand-navy text-white pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden border-b-2 border-brand-gold/40">
      {/* Editorial Background Textures */}
      <div className="absolute inset-0 sartorial-pinstripe opacity-15 pointer-events-none" />
      <div className="absolute -top-36 -right-36 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -left-36 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-gold/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold">
              The Flagship Bespoke Atelier • Nairobi, Kenya
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            The Architecture of Distinction.
          </h1>
          <p className="font-serif italic text-lg sm:text-2xl text-brand-gold font-light tracking-wide">
            &quot;opulence • simplicity • class&quot;
          </p>
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Modern Man Kenya was founded on an unyielding principle: that genuine bespoke tailoring 
            is not an off-the-rack assembly, but an intimate anatomical sculpture engineered to honor 
            the gentleman who commands it.
          </p>

          {/* Quick Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs sm:text-sm rounded transition-all shadow-gold flex items-center justify-center space-x-2"
            >
              <span>Commission a Masterwork</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#the-team"
              className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-brand-gold/30 hover:border-brand-gold text-xs sm:text-sm uppercase tracking-luxury font-semibold rounded transition-all flex items-center justify-center space-x-2"
            >
              <span>Meet Our Master Artisans</span>
              <Scissors className="w-4 h-4 text-brand-gold" />
            </a>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-10">
          <div className="p-4 rounded bg-white/5 border border-brand-gold/15 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold mb-1">
              35+
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-luxury text-slate-300 font-medium">
              Anatomical Measurements
            </div>
          </div>

          <div className="p-4 rounded bg-white/5 border border-brand-gold/15 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold mb-1">
              80+
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-luxury text-slate-300 font-medium">
              Hand Hours Per Commission
            </div>
          </div>

          <div className="p-4 rounded bg-white/5 border border-brand-gold/15 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold mb-1">
              4,000+
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-luxury text-slate-300 font-medium">
              European Mill Cloths
            </div>
          </div>

          <div className="p-4 rounded bg-white/5 border border-brand-gold/15 text-center">
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold mb-1">
              100%
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-luxury text-slate-300 font-medium">
              Full Floating Canvas
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
