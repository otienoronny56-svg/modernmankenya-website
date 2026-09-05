'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Quote, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { FITTING_PROCESS_STEPS, CLIENT_TESTIMONIALS } from '@/data/mockData';

export const ProcessSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-24 bg-brand-canvas-alt relative overflow-hidden border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Part 1: Bespoke Fitting Process Walkthrough */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Modern Man Methodology</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
            The Bespoke Journey
          </h2>
          <p className="text-xs sm:text-sm text-brand-slate-muted font-light leading-relaxed">
            From initial sketch to final basting and handover in Nairobi, every commission 
            undergoes 80+ hours of painstaking hand craftsmanship.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-24">
          {FITTING_PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="bg-white p-5 sm:p-6 rounded-lg shadow-luxury border border-slate-200 flex flex-col justify-between relative group hover:border-brand-gold transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-luxury text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {step.duration}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-brand-navy mb-1.5 sm:mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] font-bold text-brand-navy">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold" />
                <span>Stage {idx + 1} of 4</span>
              </div>
            </div>
          ))}
        </div>

        {/* Part 2: Client Reviews & VIP Accolades */}
        <div className="mt-12 sm:mt-20 pt-10 sm:pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Distinguished Patrons
            </span>
            <h3 className="font-serif text-xl sm:text-3xl text-brand-navy font-bold mt-1">
              Words from Discerning Gentlemen
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {CLIENT_TESTIMONIALS.map((review) => (
              <div
                key={review.client}
                className="bg-white p-5 sm:p-8 rounded-lg shadow-luxury border border-slate-200 flex flex-col justify-between"
              >
                <div className="space-y-3 sm:space-y-4">
                  <Quote className="w-6 sm:w-8 h-6 sm:h-8 text-brand-gold/50" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed font-serif">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100">
                  <p className="font-serif text-sm font-bold text-brand-navy">
                    {review.client}
                  </p>
                  <p className="text-[11px] text-brand-slate-muted">
                    {review.role} • {review.city}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct CTA to Book Appointment */}
          <div className="mt-10 sm:mt-16 text-center">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 sm:space-x-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-luxury text-xs transition-all shadow-md group"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Schedule Private Fitting Session</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
