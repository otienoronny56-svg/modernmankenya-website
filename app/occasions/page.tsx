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
    <div className="min-h-screen bg-stone-950 text-white selection:bg-brand-gold selection:text-brand-navy">
      
      {/* 1. CINEMATIC OCCASIONS HEADER */}
      <section className="relative py-20 sm:py-28 bg-stone-900 border-b border-white/10 overflow-hidden">
        {/* Subtle Luxury Pattern Background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sartorial Portfolios</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Tailored For Every Occasion
          </h1>

          <p className="font-serif text-base sm:text-xl text-stone-300 font-light max-w-2xl mx-auto tracking-wide">
            Where Fit Meets Character • Nairobi Atelier
          </p>

          {/* Quick Filter Pill Buttons */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {ALL_OCCASIONS_LIST.map((occ) => (
              <a
                key={occ.slug}
                href={`#${occ.slug}`}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-brand-gold hover:text-brand-navy text-stone-300 text-xs font-bold uppercase tracking-wider border border-white/10 transition-all duration-300"
              >
                {occ.shortTitle}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. THE 4 OCCASION EDITORIAL PORTFOLIOS */}
      <div className="divide-y divide-white/10">
        {ALL_OCCASIONS_LIST.map((occ, occIdx) => {
          const isEven = occIdx % 2 === 0;
          return (
            <section
              key={occ.slug}
              id={occ.slug}
              className="py-16 sm:py-24 relative overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Occasion Header Strip */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 border-b border-white/10 pb-5">
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs text-brand-gold font-bold">
                        0{occIdx + 1}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold">
                        {occ.badge}
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                      {occ.title}
                    </h2>
                    
                    <p className="font-serif text-stone-300 text-sm sm:text-base font-light">
                      {occ.tagline}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-0 flex items-center space-x-3">
                    <Link
                      href={`/occasions/${occ.slug}`}
                      className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider rounded transition-all duration-300 flex items-center space-x-2 shadow-lg"
                    >
                      <span>View All {occ.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/book-appointment?occasion=${occ.slug}`}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded border border-white/15 transition-all duration-300 flex items-center space-x-1.5"
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
                    className="md:col-span-2 group relative aspect-[16/10] sm:aspect-[16/10] rounded-xl overflow-hidden bg-stone-900 border border-white/10 shadow-luxury transition-all duration-500 hover:border-brand-gold/60"
                  >
                    <Image
                      src={occ.heroImage}
                      alt={occ.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover object-top sm:object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                      <div>
                        <span className="text-[10px] text-brand-gold font-bold uppercase tracking-wider block mb-1">
                          Signature Showpiece
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                          {occ.highlights[0]?.label || occ.title}
                        </h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
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
                        className="group relative flex-1 min-h-[220px] rounded-xl overflow-hidden bg-stone-900 border border-white/10 shadow-md transition-all duration-500 hover:border-brand-gold/60"
                      >
                        <Image
                          src={item.src}
                          alt={item.label}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                        <div className="absolute top-3 left-3">
                          <span className="bg-black/60 backdrop-blur-md text-[9px] font-bold text-brand-gold px-2 py-0.5 rounded border border-brand-gold/30 uppercase tracking-wider">
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

                {/* Micro Craft Pills Strip below each occasion */}
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  {occ.heroPills.map((pill, i) => (
                    <span
                      key={i}
                      className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-[11px] font-medium tracking-wider uppercase text-stone-300"
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

      {/* 3. ATELIER INVITATION FOOTER */}
      <section className="bg-gradient-to-b from-stone-900 to-brand-navy py-16 sm:py-24 border-t border-white/10 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold block">
            Nairobi Atelier Service
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Commission Your Look
          </h2>

          <p className="font-serif text-stone-300 text-sm sm:text-base font-light">
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
              href="/gallery"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
