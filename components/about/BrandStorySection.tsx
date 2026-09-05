'use client';

import React from 'react';
import Image from 'next/image';
import { CheckCircle2, Scissors, Feather, Compass, Layers } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 1: The Modern Man Kenya Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-luxury">
              <Compass className="w-4 h-4" />
              <span>Our Genesis & Ethos</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl text-brand-navy font-bold leading-tight">
              Crafting Nairobi’s Most Prestigious Bespoke Wardrobe
            </h2>

            <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
              Modern Man Kenya was born from a desire to elevate East African executive and formal 
              menswear into the highest tier of international bespoke craftsmanship. Too often, commercial 
              suiting relies on glue, synthetic fusing, and generic sizing that warps after dry cleaning 
              and constricts natural movement.
            </p>

            <p className="text-slate-600 leading-relaxed font-light text-sm sm:text-base">
              We rejected this shortcuts entirely. In our Nairobi Flagship Atelier, every garment begins 
              with blank heavy kraft card paper, a tape measure capturing 35 unique anatomical points, 
              and pure natural fibers imported directly from historic mills in Yorkshire and northern Italy.
            </p>

            {/* Ethos Grid */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-brand-canvas-alt border border-brand-gold/20 space-y-2">
                <div className="flex items-center space-x-2 text-brand-navy font-serif font-bold text-base">
                  <Scissors className="w-4 h-4 text-brand-gold" />
                  <span>Individual Paper Block</span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  No factory templates. Each client receives a dedicated hand-drafted pattern archived for life.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-brand-canvas-alt border border-brand-gold/20 space-y-2">
                <div className="flex items-center space-x-2 text-brand-navy font-serif font-bold text-base">
                  <Layers className="w-4 h-4 text-brand-gold" />
                  <span>Floating Horsehair</span>
                </div>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  Natural horsehair canvas stitched loosely inside, breathing and molding to your chest posture.
                </p>
              </div>
            </div>

            <div className="border-l-2 border-brand-gold pl-4 italic text-brand-navy font-serif text-sm sm:text-base">
              &quot;We don’t dress men to fit into standard garments; we sculpt garments that amplify the natural authority of the man wearing them.&quot;
            </div>
          </div>

          {/* Right Editorial Image Grid */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] sm:aspect-[1/1] w-full rounded-lg overflow-hidden shadow-luxury border-2 border-brand-gold/30">
              <Image
                src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85"
                alt="Master Tailoring at Modern Man Kenya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-white/95 backdrop-blur-md border border-brand-gold/30 text-brand-navy flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                    Craft Standard
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base">
                    Zero Synthetic Fusing • 100% Hand Pad-Stitched
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold flex-shrink-0 ml-3">
                  <Feather className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
