'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Sparkles, Shield, Award } from 'lucide-react';
import { SartorialSilkCanvas } from '@/components/canvas/SartorialSilkCanvas';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-85px)] bg-brand-navy flex flex-col justify-between overflow-hidden">
      {/* 3D Sartorial Silk Canvas Animation (Three.js) */}
      <div className="absolute inset-0 z-0">
        <SartorialSilkCanvas intensity={1.1} />
      </div>

      {/* Editorial Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark/95 via-brand-navy/80 to-brand-navy-dark/90 z-10" />

      {/* Subtle Pinstripe Layer */}
      <div className="absolute inset-0 sartorial-pinstripe opacity-15 z-10 pointer-events-none" />

      {/* Main Center Content: Headline & Action Buttons */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 lg:pt-14 pb-4 sm:pb-6 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Heritage Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 border border-brand-gold/40 text-brand-gold text-[10px] sm:text-xs tracking-luxury uppercase font-semibold mb-4 sm:mb-5 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-[90vw] truncate">
          <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-gold animate-pulse flex-shrink-0" />
          <span className="truncate">Modern Man Bespoke • Nairobi Flagship</span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.12] max-w-4xl mb-4 sm:mb-5">
          Bespoke Sartorial Excellence.{' '}
          <span className="block mt-1 sm:mt-1.5 font-normal italic gold-gradient-text">
            Made to Measure in Nairobi.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-light leading-relaxed mb-6 sm:mb-8 px-2 sm:px-0">
          Individual wooden patterns drafted exclusively for your anatomy. Sculpted with 
          full floating horsehair canvas and hand-padded lapels using authentic British and Italian cloths.
        </p>

        {/* Dual CTAs (Positioned right at the fold line) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <Link
            href="/ready-to-wear"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs transition-all duration-200 flex items-center justify-center space-x-2.5 shadow-gold group"
          >
            <span>Explore Ready to Wear</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/book-appointment"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-transparent hover:bg-white/10 text-white border-2 border-brand-gold text-xs font-bold uppercase tracking-luxury transition-all duration-200 flex items-center justify-center space-x-2.5 backdrop-blur-sm"
          >
            <Calendar className="w-4 h-4 text-brand-gold" />
            <span>Book Private Fitting</span>
          </Link>
        </div>
      </div>

      {/* Bottom Heritage Trust Badges (Anchoring the base of the fold) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-4 sm:pt-5 border-t border-white/10 text-left text-xs text-slate-300">
          <div className="flex items-center space-x-2.5 sm:space-x-3 bg-white/[0.03] sm:bg-transparent p-2.5 sm:p-0 rounded">
            <Award className="w-4 sm:w-5 h-4 sm:h-5 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">Full Canvas</p>
              <p className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">Floating horsehair</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-3 bg-white/[0.03] sm:bg-transparent p-2.5 sm:p-0 rounded">
            <Shield className="w-4 sm:w-5 h-4 sm:h-5 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">35 Measures</p>
              <p className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">Anatomical fit</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-3 bg-white/[0.03] sm:bg-transparent p-2.5 sm:p-0 rounded">
            <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">Euro Mills</p>
              <p className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">Scabal & Dormeuil</p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 sm:space-x-3 bg-white/[0.03] sm:bg-transparent p-2.5 sm:p-0 rounded">
            <Calendar className="w-4 sm:w-5 h-4 sm:h-5 text-brand-gold flex-shrink-0" />
            <div>
              <p className="font-serif font-bold text-white uppercase tracking-wider text-[11px] sm:text-xs">3 Fittings</p>
              <p className="text-slate-400 text-[10px] sm:text-[11px] leading-tight">Basting to finish</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />
    </section>
  );
};
