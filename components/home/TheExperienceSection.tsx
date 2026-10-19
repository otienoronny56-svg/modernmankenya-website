'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Consultation',
    text: 'We talk about your style, your fit, and the occasion you are dressing for.',
  },
  {
    step: '02',
    title: 'Fabric & Style',
    text: 'Choose your favourite fabric, lining, and lapels from our swatches.',
  },
  {
    step: '03',
    title: 'Measurements',
    text: 'We take exact measurements of your posture, chest, and shoulders.',
  },
  {
    step: '04',
    title: 'The Fitting',
    text: 'Try on the half-stitched suit. We adjust every seam until it fits right.',
  },
  {
    step: '05',
    title: 'Final Handover',
    text: 'Your suit is hand-pressed, inspected for quality, and ready to wear.',
  },
];

export const TheExperienceSection: React.FC = () => {
  return (
    <section id="the-experience" className="py-14 sm:py-20 bg-brand-canvas-alt border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
            How It Works
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold tracking-tight">
            How We Tailor Your Suit
          </h2>
        </div>

        {/* 5 Clean Step Cards - 1 sentence each, no clutter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 mb-12">
          {STEPS.map((s) => (
            <div
              key={s.step}
              className="bg-white p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-gold/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-brand-gold block mb-3">
                  {s.step}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors mb-2">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Minimal Bottom CTA */}
        <div className="text-center">
          <Link
            href="/book-appointment"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-brand-navy hover:bg-brand-gold hover:text-brand-navy text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm group"
          >
            <Calendar className="w-4 h-4 text-brand-gold group-hover:text-brand-navy transition-colors" />
            <span>Book a Fitting in Nairobi</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};
