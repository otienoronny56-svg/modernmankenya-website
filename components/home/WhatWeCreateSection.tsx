'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Scissors } from 'lucide-react';
import { WHAT_WE_CREATE } from '@/data/brandProfile';

export const WhatWeCreateSection: React.FC = () => {
  return (
    <section id="what-we-create" className="py-16 sm:py-24 bg-brand-canvas-alt border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
              <Scissors className="w-3.5 h-3.5" />
              <span>Sartorial Repertoire</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
              What We Create
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Every commission is tailored from blank patterns to the individual anatomy and personal character of the wearer.
            </p>
          </div>

          <Link
            href="/book-appointment"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-brand-navy hover:text-brand-gold transition-colors group"
          >
            <span>Book Private Consultation</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
          </Link>
        </div>

        {/* 9 Categories Ultra-Minimalist Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHAT_WE_CREATE.map((item, idx) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-luxury hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/85 via-transparent to-transparent" />
                  
                  {/* Category Index Badge */}
                  <div className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-[10px] font-mono font-bold px-2.5 py-1 rounded">
                    0{idx + 1}
                  </div>

                  {/* Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-brand-gold transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Description Body */}
                <div className="p-5 sm:p-6 space-y-3">
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2">
                <Link
                  href="/book-appointment"
                  className="w-full py-2.5 px-3 bg-brand-canvas-alt hover:bg-brand-navy hover:text-white text-brand-navy rounded text-[11px] uppercase tracking-luxury font-bold transition-all flex items-center justify-between border border-slate-200 hover:border-brand-navy"
                >
                  <span>Commission This Style</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
