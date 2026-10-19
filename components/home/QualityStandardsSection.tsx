'use client';

import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  FileText, 
  BookOpen, 
  Users, 
  Clock, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { OPERATIONAL_QA } from '@/data/brandProfile';

export const QualityStandardsSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const pillars = [
    {
      icon: ClipboardCheck,
      title: 'Pre-Delivery Inspection',
      subtitle: 'Checked Before Handover',
      description:
        'Every suit is thoroughly checked against our inspection list: shoulder fit, lapel symmetry, sleeve length, waist, and clean hand pressing.',
    },
    {
      icon: FileText,
      title: 'Saved Measurement Profile',
      subtitle: 'Easy Next Orders',
      description:
        'We keep your exact body measurements and style preferences on record. Ordering your next suit or shirt is as simple as a quick call.',
    },
    {
      icon: BookOpen,
      title: 'Standard Workshop Rules',
      subtitle: 'Consistent Quality',
      description:
        'Every step follows strict rules — from steaming and cutting the cloth to shaping the canvas and pressing the final suit.',
    },
    {
      icon: Users,
      title: 'Specialist Tailors',
      subtitle: 'Expert Hands',
      description:
        'Our master cutters cut the patterns, coatmakers build the canvas chest, and finishers do the buttonholes and final hand pressing.',
    },
  ];

  return (
    <section id="quality-standards" className="py-16 sm:py-24 bg-[#121214] text-white relative overflow-hidden">
      {/* Background Subtle Sartorial Pinstripe */}
      <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-brand-gold font-bold flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Quality Check</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Our Quality Guarantee
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
            We inspect every single stitch, seam, and button before your suit leaves our workshop.
          </p>
        </div>

        {/* 4 Operational Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 hover:border-brand-gold/60 rounded-xl p-6 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-lg bg-brand-gold/20 text-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-brand-gold">0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-gold transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[11px] font-semibold uppercase tracking-wider text-brand-gold/80">
                    {item.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center space-x-1.5 text-[11px] font-bold text-brand-gold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Quality</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive FAQ: Answering Client Questions Based on Operational Guidelines */}
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 sm:p-10 backdrop-blur-md">
          <div className="flex items-center space-x-2 text-brand-gold text-xs font-bold uppercase tracking-luxury mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Client Reassurance & Transparency</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-6">
            Frequently Asked Questions on Quality & Process
          </h3>

          <div className="space-y-4">
            {OPERATIONAL_QA.map((qa, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={qa.question}
                  className="border border-white/10 rounded-lg overflow-hidden bg-white/5 transition-colors"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-4 sm:p-5 flex justify-between items-center space-x-4 hover:bg-white/5 transition-colors"
                  >
                    <span className="font-serif text-sm sm:text-base font-semibold text-white">
                      {qa.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-gold flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 font-light leading-relaxed border-t border-white/10">
                      {qa.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
