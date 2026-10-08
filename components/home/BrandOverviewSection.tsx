'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Compass, Target, Award, ArrowRight } from 'lucide-react';
import { BRAND_PROFILE, CORE_VALUES } from '@/data/brandProfile';

export const BrandOverviewSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Brand Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16 pb-16 border-b border-slate-100">
          
          {/* Left Column: Brand Name, Tagline & Philosophy */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Brand Overview & Identity</span>
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold leading-tight">
              {BRAND_PROFILE.tagline}
            </h2>

            <div className="pt-2">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-brand-gold">
                {BRAND_PROFILE.philosophy}
              </p>
              <p className="text-xs text-slate-500 font-medium tracking-wide mt-1">
                {BRAND_PROFILE.positioning}
              </p>
            </div>
          </div>

          {/* Right Column: The Core Brand Narrative */}
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed font-light text-sm sm:text-base">
            <p className="font-serif text-lg sm:text-xl text-brand-navy font-normal italic border-l-2 border-brand-gold pl-5 py-1">
              &ldquo;{BRAND_PROFILE.statement}&rdquo;
            </p>

            <p className="text-slate-600">
              Modern Man Kenya is a premier bespoke menswear and styling house based in Nairobi, Kenya. 
              We are dedicated to crafting refined, tailored garments that reflect individual character, 
              sophistication, and effortless confidence.
            </p>

            <p className="text-slate-600">
              Rooted in precision craftsmanship and contemporary African elegance, we believe that true style 
              is not just about how a garment looks, but how it makes a man feel — commanding, distinguished, 
              and authentic.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <Link
                href="/the-experience"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-brand-navy hover:text-brand-gold transition-colors group"
              >
                <span>The Modern Man Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-slate-500 hover:text-brand-navy transition-colors"
              >
                <span>Full Atelier Story</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Vision & Mission Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 pb-16 border-b border-slate-100">
          <div className="p-8 bg-brand-canvas-alt rounded-lg border border-slate-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-brand-navy">
              <Compass className="w-5 h-5 text-brand-gold" />
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide">Our Vision</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              {BRAND_PROFILE.vision}
            </p>
          </div>

          <div className="p-8 bg-brand-canvas-alt rounded-lg border border-slate-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-brand-navy">
              <Target className="w-5 h-5 text-brand-gold" />
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide">Our Mission</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              {BRAND_PROFILE.mission}
            </p>
          </div>
        </div>

        {/* Core Values Minimalist Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Guiding Principles
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy font-bold">
              Our Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-5 bg-white rounded border border-slate-200/80 hover:border-brand-gold/60 transition-colors space-y-2 group"
              >
                <div className="text-[11px] font-mono font-bold text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                  0{idx + 1}
                </div>
                <h4 className="font-serif text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                  {val.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
