'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';

const REASONS = [
  {
    num: '01',
    title: 'Custom Fit, Not Off-the-Rack',
    text: 'Every suit is cut specifically for your body shape, height, and shoulders.',
  },
  {
    num: '02',
    title: 'Clear Style Guidance',
    text: 'We help you choose the best fabrics, lapels, and colors for your event.',
  },
  {
    num: '03',
    title: 'Saved Measurements',
    text: 'Your fit profile stays on file in Nairobi, making reordering simple.',
  },
  {
    num: '04',
    title: 'On-Time Handover',
    text: 'Reliable timelines so your suit is ready well before your big day or meeting.',
  },
];

export const WhyModernManSection: React.FC = () => {
  return (
    <section id="why-us" className="py-14 sm:py-20 bg-brand-canvas-alt border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold tracking-tight">
            Why Modern Man Kenya
          </h2>
        </div>

        {/* 4 Clean Cards - 1 sentence each, light & crisp (not boring, not blue) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
          {REASONS.map((r) => (
            <div
              key={r.num}
              className="bg-white p-6 rounded-xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-gold/80 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="font-mono text-2xl font-bold text-brand-gold block mb-3">
                  {r.num}
                </span>
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
