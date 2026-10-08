'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { EXPERIENCE_STEPS } from '@/data/brandProfile';

export const TheExperienceSection: React.FC = () => {
  return (
    <section id="the-experience" className="py-16 sm:py-24 bg-brand-canvas-alt border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Commissioning Process</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
            The Modern Man Experience
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light leading-relaxed">
            Crafting a bespoke garment is a collaborative journey. From first consultation to final delivery in Nairobi, 
            every step is engineered for unhurried precision and sartorial clarity.
          </p>
        </div>

        {/* 5-Step Process Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {EXPERIENCE_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white p-6 rounded-lg border border-slate-200/80 shadow-sm hover:shadow-luxury hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-brand-gold/40 group-hover:text-brand-gold transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    Phase 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] font-bold text-brand-navy">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                <span>Modern Man Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Reassurance & Appointment CTA */}
        <div className="p-8 bg-white rounded-lg border border-slate-200/80 max-w-4xl mx-auto text-center space-y-4 shadow-sm">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
            Ready to Begin Your Sartorial Journey?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-light max-w-2xl mx-auto leading-relaxed">
            Schedule a private fitting with our Master Tailor in Nairobi. We discuss your silhouette, explore fine cloths, 
            and draft a garment calibrated precisely to your posture and character.
          </p>
          <div className="pt-2">
            <Link
              href="/book-appointment"
              className="inline-flex items-center space-x-2.5 px-8 py-3.5 rounded bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-luxury text-xs transition-all shadow-md group"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Schedule Private Consultation in Nairobi</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
