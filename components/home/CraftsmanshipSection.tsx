'use client';

import React from 'react';
import Image from 'next/image';
import { Layers, Scissors, ShieldCheck, Sparkles } from 'lucide-react';

const CRAFT_POINTS = [
  {
    icon: Layers,
    title: 'Floating Canvas',
    text: 'Natural horsehair canvas inside the chest that shapes to your body over time, never stiff glue.',
  },
  {
    icon: Sparkles,
    title: 'Hand Stitching',
    text: 'Careful hand-sewn lapels, collars, and fine silk buttonholes for a clean luxury finish.',
  },
  {
    icon: Scissors,
    title: 'Custom Pattern',
    text: 'Drawn from scratch to match your exact shoulders, chest, and natural standing posture.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Checked',
    text: 'Every seam, sleeve length, and trouser break is inspected before handover.',
  },
];

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Header */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
            Tailoring Quality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold tracking-tight">
            How We Build Your Suit
          </h2>
        </div>

        {/* Visual Split: Authentic Tailoring Photo + 4 Punchy Points */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Real Workshop Craft Image */}
          <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <Image
              src="/images/_MG_3310.jpg"
              alt="Tailoring craftsmanship at Modern Man Kenya"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 bg-brand-gold text-brand-navy text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
              Handmade in Nairobi
            </div>
          </div>

          {/* 4 Clean Points (1 sentence each, zero wordiness) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {CRAFT_POINTS.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className="bg-brand-canvas-alt p-5 sm:p-6 rounded-xl border border-slate-200/90 shadow-sm hover:border-brand-gold/80 transition-all flex flex-col justify-between"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-navy text-white flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-brand-gold" />
                  </div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy mb-1">
                    {pt.title}
                  </h3>
                  <p className="text-xs text-slate-600 font-light leading-relaxed">
                    {pt.text}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
