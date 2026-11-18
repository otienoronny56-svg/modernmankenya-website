'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Compass, 
  Target, 
  Flame, 
  ShieldCheck, 
  Award, 
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { BRAND_PROFILE, CORE_VALUES } from '@/data/brandProfile';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="philosophy" className="py-10 sm:py-14 bg-white dark:bg-[#0c101c] border-b border-slate-100 dark:border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Narrative: Genesis & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Genesis & Philosophy Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 text-brand-gold font-bold text-xs uppercase tracking-luxury border border-brand-gold/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Our Genesis &amp; Philosophy</span>
            </div>

            {/* Who is the Modern Man? */}
            <div className="space-y-2">
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-brand-gold font-bold block">
                About Modern Man KE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white font-bold leading-tight">
                Who is the Modern Man?
              </h2>
            </div>

            {/* Authentic Manifesto Sentences */}
            <div className="space-y-3.5 text-slate-700 dark:text-slate-300 font-light text-sm sm:text-base leading-relaxed">
              <p className="font-serif text-lg sm:text-xl md:text-2xl text-brand-navy dark:text-white font-semibold italic leading-snug border-l-2 border-brand-gold pl-4">
                &ldquo;He is ambitious, confident, and unapologetically himself. He doesn&apos;t just want to wear a suit—he wants to own the room, turn heads, and feel as good as he looks.&rdquo;
              </p>

              <p className="text-base sm:text-lg text-slate-800 dark:text-slate-200 font-medium">
                He wants <strong className="text-brand-navy dark:text-brand-gold font-bold">style without compromise</strong>, <strong className="text-brand-navy dark:text-brand-gold font-bold">comfort without limits</strong>, and a <strong className="text-brand-navy dark:text-brand-gold font-bold">fit that speaks his language</strong>.
              </p>

              <p className="text-slate-600 dark:text-slate-400">
                At Modern Man, we believe every man deserves an attire that reflects his personality, celebrates his individuality, and brings out his best. Established in 2020, we are constantly evolving &amp; innovating to meet the Modern Man demands.
              </p>
            </div>

            {/* The 3 Pillars of The Modern Man */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-brand-canvas-alt dark:bg-[#121727] border border-brand-gold/25 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-bold text-xs mb-2">
                  01
                </div>
                <h3 className="font-serif font-bold text-sm text-brand-navy dark:text-white">
                  Style Without Compromise
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Own the room and turn heads with sharp, contemporary African luxury tailoring.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-canvas-alt dark:bg-[#121727] border border-brand-gold/25 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-bold text-xs mb-2">
                  02
                </div>
                <h3 className="font-serif font-bold text-sm text-brand-navy dark:text-white">
                  Comfort Without Limits
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Floating natural horsehair canvas that breathes and moves fluidly with your body.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-brand-canvas-alt dark:bg-[#121727] border border-brand-gold/25 dark:border-slate-800 space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-bold text-xs mb-2">
                  03
                </div>
                <h3 className="font-serif font-bold text-sm text-brand-navy dark:text-white">
                  A Fit That Speaks His Language
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Hand-drafted strictly to individual anatomy to celebrate his true personality.
                </p>
              </div>
            </div>

          </div>

          {/* Right Authentic Shoot Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl border-2 border-brand-gold/40 bg-stone-900">
              <Image
                src="/images/MOK_7660.jpg"
                alt="Modern Man Kenya Made to Measure Tailoring Nairobi"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono px-3 py-1 rounded-full">
                Est. 2020 • Nairobi Atelier
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 dark:bg-[#121727]/95 backdrop-blur-md border border-brand-gold/40 text-brand-navy dark:text-white flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                    The Modern Man Creed
                  </p>
                  <p className="font-serif font-bold text-sm sm:text-base">
                    Wear the confidence. Own the moment.
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-navy dark:bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0 ml-3">
                  <Award className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Full-Width Signature Climax Motto Callout - Beautifully Proportionate */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-brand-navy text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-brand-gold/40 shadow-lg">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold">
              Our Hallmark • Est. 2020
            </span>
            <p className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white">
              &ldquo;Wear the confidence. Own the moment.&rdquo;
            </p>
          </div>

          <Link
            href="/book-appointment"
            className="flex-shrink-0 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs shadow-md transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book a Fitting</span>
          </Link>
        </div>

        {/* Vision & Mission Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
          <div className="p-6 sm:p-7 bg-brand-canvas-alt dark:bg-[#121727] rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-brand-navy dark:text-brand-gold">
              <Compass className="w-5 h-5 text-brand-gold" />
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-brand-navy dark:text-white">Our Vision</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
              {BRAND_PROFILE.vision}
            </p>
          </div>

          <div className="p-6 sm:p-7 bg-brand-canvas-alt dark:bg-[#121727] rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-brand-navy dark:text-brand-gold">
              <Target className="w-5 h-5 text-brand-gold" />
              <h3 className="font-serif text-xl font-bold uppercase tracking-wide text-brand-navy dark:text-white">Our Mission</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-light">
              {BRAND_PROFILE.mission}
            </p>
          </div>
        </div>

        {/* Core Values Minimalist Grid - 5 Items Exactly in 1 Balanced Row */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-6 space-y-1.5">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Our Compass
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-brand-navy dark:text-white font-bold">
              Core Values
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={val.title}
                className="p-5 bg-white dark:bg-[#121727] rounded-xl border border-slate-200/80 dark:border-slate-800 hover:border-brand-gold/60 transition-colors space-y-2 group shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="text-[11px] font-mono font-bold text-brand-gold/60 group-hover:text-brand-gold transition-colors">
                    0{idx + 1}
                  </div>
                  <h4 className="font-serif text-base font-bold text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
