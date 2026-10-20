import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, Calendar, Sparkles, Scissors, Eye, Layers } from 'lucide-react';
import { ALL_OCCASIONS_LIST } from '@/data/occasionsData';

export const metadata: Metadata = {
  title: 'Tailoring Occasions | Modern Man Kenya',
  description: 'Bespoke menswear curated for Executive Wear, Black Tie & Wedding, and African Wear in Nairobi.',
};

export default function OccasionsHubPage() {
  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 selection:bg-brand-gold selection:text-brand-navy">
      
      {/* 1. LUMINOUS EDITORIAL OCCASIONS HEADER (WHITE & BRAND NAVY) */}
      <section className="relative py-16 sm:py-24 bg-gradient-to-b from-white via-blue-50/30 to-[#f8fafc] border-b border-slate-200/80 overflow-hidden">
        {/* Subtle Luxury Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1B1464_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200/80 px-3.5 py-1 rounded-full text-brand-navy text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
            <span>Occasions</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-navy">
            Suits for Every Occasion
          </h1>

          <p className="font-serif text-base sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto tracking-wide">
            Custom Suits for Every Event • Nairobi
          </p>

          {/* Quick Filter Pill Buttons in Crisp White & Navy */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ALL_OCCASIONS_LIST.map((occ, idx) => (
              <a
                key={occ.slug}
                href={`#${occ.slug}`}
                className="px-4 py-2 rounded-full bg-white hover:bg-brand-navy hover:text-white text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200/90 shadow-sm transition-all duration-200 hover:shadow-md flex items-center space-x-1.5"
              >
                <span className="text-brand-gold font-mono text-[10px]">0{idx + 1}</span>
                <span>{occ.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 3 OCCASION CATEGORIES (EXECUTIVE WEAR, BLACK TIE & WEDDING, AFRICAN WEAR) */}
      <div className="divide-y divide-slate-200/80">
        {ALL_OCCASIONS_LIST.map((occ, occIdx) => {
          const isEven = occIdx % 2 === 0;
          return (
            <section
              key={occ.slug}
              id={occ.slug}
              className={`py-16 sm:py-24 relative overflow-hidden ${
                isEven ? 'bg-white' : 'bg-[#f8fafc]'
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Occasion Header Strip */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-slate-200/90 pb-5">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-brand-gold font-bold">
                        0{occIdx + 1}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-navy font-bold bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200/60">
                        {occ.badge}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight">
                      {occ.title}
                    </h2>
                    
                    {/* Subcategories list tags */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {occ.subCategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded text-[11px] font-semibold text-slate-700 uppercase tracking-wider"
                        >
                          {sub.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <Link
                      href={`/occasions/${occ.slug}`}
                      className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <span>Explore {occ.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </Link>

                    <Link
                      href={`/book-appointment?occasion=${occ.slug}`}
                      className="px-4 py-2.5 bg-white hover:bg-blue-50 text-brand-navy font-bold text-xs uppercase tracking-wider rounded border border-slate-200/90 transition-all duration-200 flex items-center space-x-1.5 shadow-xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span className="hidden sm:inline">Book Fitting</span>
                    </Link>
                  </div>
                </div>

                {/* Subcategory Visual Cards Showcase */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                  {occ.subCategories.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/occasions/${occ.slug}`}
                      className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-navy/50 transition-all duration-300 flex flex-col"
                    >
                      {/* Image */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                        <Image
                          src={sub.heroImage}
                          alt={sub.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                        
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/95 backdrop-blur-md text-[9px] font-bold text-brand-navy px-2.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider shadow-2xs">
                            {sub.title}
                          </span>
                        </div>

                        <div className="absolute bottom-3.5 inset-x-3.5 flex items-end justify-between text-white">
                          <div>
                            <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block">
                              {sub.count} Looks
                            </span>
                            <h3 className="font-serif text-base font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                              {sub.title}
                            </h3>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-white text-brand-navy group-hover:bg-brand-gold group-hover:text-brand-navy flex items-center justify-center transition-all flex-shrink-0 shadow">
                            <ArrowRight className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      </div>

                      {/* Micro Description */}
                      <div className="p-3.5 bg-white border-t border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-600 font-medium line-clamp-1">
                          {sub.description}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-brand-navy group-hover:text-brand-gold whitespace-nowrap pl-2">
                          View →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Micro Craft Pills Strip below each category */}
                <div className="mt-8 flex flex-wrap items-center gap-2">
                  {occ.heroPills.map((pill, i) => (
                    <span
                      key={i}
                      className="bg-white border border-slate-200/90 px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase text-slate-700 shadow-2xs"
                    >
                      {pill}
                    </span>
                  ))}
                </div>

              </div>
            </section>
          );
        })}
      </div>

      {/* 3. ATELIER INVITATION FOOTER (DEEP BRAND NAVY LUXURY CONTRAST) */}
      <section className="bg-gradient-to-br from-brand-navy via-[#1B1464] to-[#0F0B3D] py-16 sm:py-24 border-t border-slate-200 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold block">
            Nairobi Atelier
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Book Your Fitting
          </h2>

          <p className="font-serif text-stone-200 text-sm sm:text-base font-light">
            Custom made for your event and perfect fit.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-[0.2em] rounded transition-all duration-300 shadow-xl hover:shadow-gold flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Fitting</span>
            </Link>

            <Link
              href="/the-craft"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore The Craft</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
