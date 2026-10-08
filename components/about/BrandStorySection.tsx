'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Target, Sparkles, Scissors, Layers, ShieldCheck } from 'lucide-react';
import { BRAND_PROFILE, CORE_VALUES } from '@/data/brandProfile';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 sm:py-24 bg-white border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-16 pb-16 border-b border-slate-100">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-luxury">
              <Compass className="w-4 h-4" />
              <span>Our Genesis & Philosophy</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-brand-navy font-bold leading-tight">
              Where Fit Meets Character
            </h2>

            <p className="text-brand-gold font-serif text-base sm:text-lg italic font-medium">
              &ldquo;{BRAND_PROFILE.statement}&rdquo;
            </p>

            <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
              Modern Man Kenya is a premier bespoke menswear and styling house based in Nairobi, Kenya. 
              We are dedicated to crafting refined, tailored garments that reflect individual character, 
              sophistication, and effortless confidence.
            </p>

            <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
              Rooted in precision craftsmanship and contemporary African elegance, we believe that true style 
              is not just about how a garment looks, but how it makes a man feel — commanding, distinguished, 
              and authentic.
            </p>

            {/* Ethos Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-brand-canvas-alt border border-brand-gold/20 space-y-2">
                <div className="flex items-center space-x-2 text-brand-navy font-serif font-bold text-sm">
                  <Scissors className="w-4 h-4 text-brand-gold" />
                  <span>Custom Tailoring</span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Every garment is hand-drafted strictly to individual anatomical posture with zero generic blocks.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-brand-canvas-alt border border-brand-gold/20 space-y-2">
                <div className="flex items-center space-x-2 text-brand-navy font-serif font-bold text-sm">
                  <Layers className="w-4 h-4 text-brand-gold" />
                  <span>Floating Canvas</span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Full canvas and half canvas internal architecture that drapes naturally and breathes in any climate.
                </p>
              </div>
            </div>
          </div>

          {/* Right Authentic Shoot Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden shadow-luxury border-2 border-brand-gold/30">
              <Image
                src="/images/MOK_7660.jpg"
                alt="Modern Man Kenya Bespoke Tailoring Nairobi"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-white/95 backdrop-blur-md border border-brand-gold/30 text-brand-navy flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                    Atelier Standard
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base">
                    Opulence • Simplicity • Class
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold flex-shrink-0 ml-3">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>
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
              Our Compass
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy font-bold">
              Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-5 bg-white rounded border border-slate-200/80 hover:border-brand-gold/60 transition-colors space-y-2 group shadow-sm"
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
