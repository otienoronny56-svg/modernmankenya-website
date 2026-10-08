'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BRAND_INFO } from '@/data/brandProfile';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] bg-brand-navy flex flex-col justify-between overflow-hidden border-b border-brand-gold/20">
      {/* Background Image with High-End Minimalist Tint */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/MOK_7660.jpg"
          alt="Modern Man Kenya Bespoke Tailoring"
          fill
          priority
          sizes="100vw"
          className="object-cover object-top opacity-30 filter grayscale-[25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12 sm:pb-16 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Philosophy Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-brand-gold/40 text-brand-gold text-[11px] sm:text-xs tracking-[0.25em] uppercase font-semibold mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
          <span>{BRAND_INFO.philosophy}</span>
        </div>

        {/* Tagline & Headline */}
        <p className="font-serif italic text-lg sm:text-2xl text-brand-gold-light mb-3">
          &ldquo;{BRAND_INFO.tagline}&rdquo;
        </p>

        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] max-w-4xl mb-6">
          Contemporary Custom Tailoring &amp; Bespoke Menswear House
        </h1>

        {/* Brand Statement / Description */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl font-light leading-relaxed mb-8 sm:mb-10">
          Dedicated to creating refined menswear that combines impeccable fit, timeless style, and modern sophistication. 
          Specialising in made-to-measure and bespoke garments designed around the individual—his proportions, personality, lifestyle, and occasion.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/book-appointment"
            className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-gold group"
          >
            <Calendar className="w-4 h-4 text-brand-navy" />
            <span>Book Personal Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#what-we-create"
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-brand-gold text-xs font-bold uppercase tracking-luxury transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm"
          >
            <span>Explore What We Create</span>
          </a>
        </div>
      </div>

      {/* Trust Strip anchored at base */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-slate-300 text-xs">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white text-xs">Individual Cut</p>
              <p className="text-[11px] text-slate-400">No generic sizing</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white text-xs">Quality Control Checklist</p>
              <p className="text-[11px] text-slate-400">Pre-delivery inspection</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white text-xs">Client Record Tracker</p>
              <p className="text-[11px] text-slate-400">Archived measurements</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white text-xs">Kenyan Craftsmanship</p>
              <p className="text-[11px] text-slate-400">Understated luxury</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
