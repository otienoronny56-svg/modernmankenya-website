'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] bg-[#101012] flex items-center justify-center overflow-hidden">
      {/* Background Image with Warm Editorial Lighting */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/MOK_2101.jpg"
          alt="Modern Man Kenya Made to Measure Tailoring"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 filter contrast-105"
        />
        {/* Warm Cinematic Vignette & Ambient Gradient - Comfortable to the Eye */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101012] via-[#101012]/60 to-[#101012]/75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/15 via-[#101012]/60 to-[#101012]/95" />
      </div>

      {/* Hero Content - Clean, Uncongested & Minimal */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Subtle House Monogram / Overline */}
        <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-brand-gold font-semibold mb-4">
          Opulence • Simplicity • Class
        </p>

        {/* Primary Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
          Where Fit Meets Character.
        </h1>

        {/* Single Concise Sentence */}
        <p className="text-base sm:text-lg md:text-xl text-stone-300 font-light max-w-2xl leading-relaxed mb-10">
          Handcrafted made-to-measure tailoring cut to your exact proportions and individual style in Nairobi.
        </p>

        {/* Action Buttons: Book & Explore */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/book-appointment"
            className="w-full sm:w-auto px-7 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs rounded transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-gold"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>

          <a
            href="#creations"
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-brand-gold text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm group"
          >
            <span>Explore Creations</span>
            <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
