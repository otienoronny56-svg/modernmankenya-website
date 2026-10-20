import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowRight, Calendar, Sparkles, Scissors, Eye } from 'lucide-react';
import { ALL_OCCASIONS_LIST } from '@/data/occasionsData';

export const metadata: Metadata = {
  title: 'Tailoring Occasions | Modern Man Kenya',
  description: 'Bespoke suiting and made-to-measure menswear curated for every milestone occasion in Nairobi and East Africa.',
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
            <span>Sartorial Portfolios</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-navy">
            Tailored For Every Occasion
          </h1>

          <p className="font-serif text-base sm:text-xl text-slate-600 font-normal max-w-2xl mx-auto tracking-wide">
            Where Fit Meets Character • Nairobi Atelier
          </p>

          {/* Quick Filter Pill Buttons in Crisp White & Navy */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ALL_OCCASIONS_LIST.map((occ) => (
              <a
                key={occ.slug}
                href={`#${occ.slug}`}
                className="px-4 py-2 rounded-full bg-white hover:bg-brand-navy hover:text-white text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200/90 shadow-sm transition-all duration-200 hover:shadow-md"
              >
                {occ.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 4 OCCASION EDITORIAL PORTFOLIOS (WHITE & LIGHT BLUE CANVAS) */}
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
                  <div className="space-y-1.5">
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
                    
                    <p className="font-serif text-slate-600 text-sm sm:text-base font-normal">
                      {occ.tagline}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <Link
                      href={`/occasions/${occ.slug}`}
                      className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                    >
                      <span>View All {occ.title}</span>
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

                {/* Editorial Photo Showcase - High Visual Impact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                  
                  {/* Primary Large Anchor Card */}
                  <Link
                    href={`/occasions/${occ.slug}`}
                    className="md:col-span-2 group relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-md transition-all duration-500 hover:border-brand-navy/60 hover:shadow-xl"
                  >
                    <Image
                      src={occ.heroImage}
                      alt={occ.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover object-top sm:object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {/* Gradient for clear text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                    
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block mb-1">
                          Signature Showpiece
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                          {occ.highlights[0]?.label || occ.title}
                        </h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-white text-brand-navy flex items-center justify-center flex-shrink-0 group-hover:bg-brand-gold group-hover:scale-110 transition-all shadow-md">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>

                  {/* Secondary Diptych Stack */}
                  <div className="flex flex-col gap-6 sm:gap-8 justify-between">
                    {occ.highlights.slice(1, 3).map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/occasions/${occ.slug}`}
                        className="group relative flex-1 min-h-[220px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/90 shadow-sm transition-all duration-500 hover:border-brand-navy/60 hover:shadow-md"
                      >
                        <Image
                          src={item.src}
                          alt={item.label}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/20 to-transparent" />

                        <div className="absolute top-3 left-3">
                          <span className="bg-white/90 backdrop-blur-md text-[9px] font-bold text-brand-navy px-2.5 py-0.5 rounded border border-slate-200 uppercase tracking-wider shadow-xs">
                            {item.tag}
                          </span>
                        </div>

                        <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between">
                          <h4 className="font-serif text-sm font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                            {item.label}
                          </h4>
                          <ArrowRight className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 ml-2" />
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>

                {/* Micro Craft Pills Strip below each occasion in White & Blue */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
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
            Nairobi Atelier Service
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Commission Your Look
          </h2>

          <p className="font-serif text-stone-200 text-sm sm:text-base font-light">
            Every garment cut and sculpted around your anatomical proportions and occasion.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-[0.2em] rounded transition-all duration-300 shadow-xl hover:shadow-gold flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Atelier Consultation</span>
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
