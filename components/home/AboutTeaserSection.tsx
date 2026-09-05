'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Scissors, Sparkles, ArrowRight, Award } from 'lucide-react';
import { TeamSection } from '@/components/about/TeamSection';

export const AboutTeaserSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-canvas-alt border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Story Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 pb-12 border-b border-slate-200">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-luxury">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Man Kenya • The Atelier Heritage</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight">
              Anatomical Precision. Hand-Cut in Nairobi.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed">
              We reject mass-produced commercial suiting. In our Nairobi atelier, every jacket is cut from an individual hand-drafted paper block, constructed with full floating horsehair canvas, and shaped by master tailors with decades of devoted craft.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center lg:justify-end gap-4">
            <Link
              href="/about"
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-navy hover:bg-brand-navy/90 text-white font-bold uppercase tracking-luxury text-xs rounded transition-all shadow-md flex items-center justify-center space-x-2 border border-brand-gold/40"
            >
              <span>Our Full Story & Ethos</span>
              <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
            </Link>
            <Link
              href="/bespoke/the-craft"
              className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-slate-50 text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all border border-slate-200 text-center"
            >
              <span>The Master Method</span>
            </Link>
          </div>
        </div>

        {/* Master Artisans Showcase */}
        <TeamSection limit={3} isTeaser={true} />

      </div>
    </section>
  );
};
