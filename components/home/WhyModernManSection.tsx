'use client';

import React from 'react';
import Link from 'next/link';
import { Award, Check, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { WHY_MODERN_MAN, BRAND_PROFILE } from '@/data/brandProfile';

export const WhyModernManSection: React.FC = () => {
  return (
    <section id="why-us" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Award className="w-4 h-4" />
            <span>The Modern Man Distinction</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
            Why Modern Man Kenya
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light leading-relaxed">
            Seven pillars that define why discerning gentlemen choose our Nairobi atelier for their most significant garments.
          </p>
        </div>

        {/* 7 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {WHY_MODERN_MAN.map((reason, idx) => (
            <div
              key={reason.title}
              className={`p-6 rounded-lg border border-slate-200/80 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-luxury ${
                idx === 6 ? 'sm:col-span-2 lg:col-span-3 xl:col-span-1 bg-brand-canvas-alt' : 'bg-white'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-brand-gold/40 group-hover:text-brand-gold transition-colors">
                    0{idx + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                  {reason.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                  {reason.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] font-bold text-brand-navy">
                <Check className="w-3.5 h-3.5 text-brand-gold" />
                <span>Modern Man Hallmark</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Promise Editorial Box */}
        <div className="bg-brand-canvas-alt border-2 border-brand-gold/30 rounded-xl p-8 sm:p-12 max-w-4xl mx-auto text-center space-y-6 relative overflow-hidden shadow-sm">
          <Quote className="w-10 h-10 text-brand-gold/25 mx-auto" />
          
          <div className="space-y-2">
            <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Our Enduring Commitment
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-brand-navy leading-snug">
              The Modern Man Brand Promise
            </h3>
          </div>

          <p className="font-serif text-base sm:text-xl text-brand-navy italic font-light leading-relaxed max-w-2xl mx-auto">
            &ldquo;{BRAND_PROFILE.promise}&rdquo;
          </p>

          <div className="pt-2">
            <Link
              href="/book-appointment"
              className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-brand-navy hover:text-brand-gold transition-colors"
            >
              <span>Book Your Fitting Experience in Nairobi</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
