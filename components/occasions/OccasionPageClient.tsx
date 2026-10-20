'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  LayoutGrid, 
  Columns3, 
  Eye, 
  Scissors
} from 'lucide-react';
import { OccasionPageData, ALL_OCCASIONS_LIST, OccasionHighlight } from '@/data/occasionsData';

interface OccasionPageClientProps {
  data: OccasionPageData;
}

export const OccasionPageClient: React.FC<OccasionPageClientProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<'editorial' | 'grid' | 'focus'>('editorial');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Combine highlights and gallery for full interactive inspection
  const allImages: OccasionHighlight[] = [...data.highlights, ...data.galleryImages];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, allImages.length]);

  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 selection:bg-brand-gold selection:text-brand-navy">
      
      {/* 1. STICKY LUMINOUS OCCASIONS SWITCHER DOCK (WHITE & BLUE) */}
      <nav className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-navy font-bold mr-2 hidden sm:inline-block">
              Occasions:
            </span>
            {ALL_OCCASIONS_LIST.map((occ) => {
              const isActive = occ.slug === data.slug;
              return (
                <Link
                  key={occ.slug}
                  href={`/occasions/${occ.slug}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 ${
                    isActive
                      ? 'bg-brand-navy text-white shadow-md shadow-brand-navy/20 scale-105'
                      : 'text-slate-600 hover:text-brand-navy hover:bg-blue-50/80'
                  }`}
                >
                  {occ.shortTitle}
                </Link>
              );
            })}
          </div>

          {/* Quick View Mode Switcher in Crisp Slate & Blue */}
          <div className="hidden md:flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200/80">
            <button
              onClick={() => setViewMode('editorial')}
              title="Editorial Lookbook"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'editorial' ? 'bg-brand-navy text-white shadow-xs' : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <Columns3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              title="Atelier Grid"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-brand-navy text-white shadow-xs' : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('focus')}
              title="Focus Spreads"
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'focus' ? 'bg-brand-navy text-white shadow-xs' : 'text-slate-500 hover:text-brand-navy'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      {/* 2. HIGH-FASHION EDITORIAL HERO BANNER (VISUAL-FIRST WITH NAVY GRADIENT) */}
      <section className="relative min-h-[75vh] sm:min-h-[85vh] flex items-end justify-start overflow-hidden border-b border-slate-200/80">
        {/* Background Visual */}
        <div className="absolute inset-0 z-0">
          <Image
            src={data.heroImage}
            alt={data.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top sm:object-[center_20%] scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Brand Navy Luxury Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-transparent to-transparent" />
        </div>

        {/* Floating Minimalist Captions - 2 to 5 words! */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-32">
          <div className="max-w-2xl space-y-4">
            
            <div className="inline-flex items-center space-x-2 bg-white/15 backdrop-blur-md px-3.5 py-1 rounded-full border border-white/25 text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] shadow-xs">
              <Sparkles className="w-3 h-3 text-brand-gold" />
              <span>{data.badge}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] drop-shadow-md">
              {data.title}
            </h1>

            <p className="font-serif text-lg sm:text-2xl text-blue-100/90 tracking-wide font-normal drop-shadow">
              {data.tagline}
            </p>

            {/* Micro Spec Pills - 2 to 4 words */}
            <div className="flex flex-wrap gap-2 pt-2">
              {data.heroPills.map((pill, idx) => (
                <span
                  key={idx}
                  className="bg-white/15 backdrop-blur-md border border-white/20 px-3 py-1 rounded-md text-[11px] font-semibold tracking-wider uppercase text-white shadow-2xs"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Direct Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link
                href={`/book-appointment?occasion=${data.slug}`}
                className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-[0.15em] rounded transition-all duration-300 shadow-xl flex items-center space-x-2 hover:shadow-gold"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Occasion</span>
              </Link>

              <a
                href="#curated-looks"
                className="px-6 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/30 text-xs font-bold uppercase tracking-[0.15em] rounded transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              >
                <span>Explore Portfolios</span>
                <ArrowRight className="w-4 h-4 text-brand-gold" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MINIMALIST ATELIER CRAFT STRIP (WHITE & NAVY) */}
      <section className="bg-white border-b border-slate-200/90 py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-200/90">
          {data.craftSpecs.map((spec, i) => (
            <div key={i} className={`${i > 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''} flex items-center justify-between sm:justify-start sm:space-x-3`}>
              <Scissors className="w-4 h-4 text-brand-gold hidden sm:inline-block flex-shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-slate-500 block font-bold">
                  {spec.label}
                </span>
                <span className="text-xs sm:text-sm font-serif font-bold text-brand-navy tracking-wide">
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CURATED HERO HIGHLIGHTS (WHITE CANVAS & CLEAN NAVY CARDS) */}
      <section id="curated-looks" className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 sm:mb-12 border-b border-slate-200/90 pb-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
              Curated Lookbook
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy tracking-tight">
              Signature Commissions
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-500 font-medium">
            {allImages.length} Editorial Frames
          </span>
        </div>

        {/* VIEW MODE 1: EDITORIAL STAGGERED MASONRY */}
        {viewMode === 'editorial' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allImages.map((img, idx) => {
              const isLarge = idx % 5 === 0;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`group relative overflow-hidden rounded-xl bg-white border border-slate-200/90 shadow-sm cursor-pointer transition-all duration-500 hover:border-brand-navy/60 hover:shadow-xl ${
                    isLarge ? 'md:col-span-2 aspect-[16/10]' : 'aspect-[4/5]'
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Subtle Gradient for Bottom Details */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                  {/* Top Badge: 2-3 words */}
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                    <span className="bg-white/95 backdrop-blur-md border border-slate-200 text-brand-navy font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                      0{idx + 1}
                    </span>
                    <span className="bg-brand-navy text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      {img.tag}
                    </span>
                  </div>

                  {/* Top Right Maximize Icon */}
                  <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-brand-navy flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-110 shadow-md">
                    <Maximize2 className="w-3.5 h-3.5 text-brand-navy" />
                  </div>

                  {/* Bottom Minimalist Caption - 2 to 5 words */}
                  <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-center justify-between z-10 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-brand-gold transition-colors leading-snug line-clamp-1 drop-shadow">
                      {img.label}
                    </h3>
                    <div className="w-7 h-7 rounded-full bg-white text-brand-navy group-hover:bg-brand-gold group-hover:text-brand-navy flex items-center justify-center transition-all flex-shrink-0 ml-2 shadow">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* VIEW MODE 2: ATELIER GRID (COMPACT 3-4 COLUMNS) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className="group relative aspect-[1/1] overflow-hidden rounded-lg bg-white border border-slate-200/90 cursor-pointer hover:border-brand-navy/60 transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-2 left-2">
                  <span className="bg-white/95 backdrop-blur-md text-[9px] text-brand-navy px-2 py-0.5 rounded border border-slate-200 font-bold uppercase tracking-wider shadow-2xs">
                    {img.tag}
                  </span>
                </div>

                <div className="absolute bottom-2.5 inset-x-2.5">
                  <h4 className="font-serif text-xs font-bold text-white group-hover:text-brand-gold transition-colors line-clamp-1">
                    {img.label}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MODE 3: FULL FOCUS (LARGE SPREADS) */}
        {viewMode === 'focus' && (
          <div className="space-y-12 sm:space-y-16 max-w-5xl mx-auto">
            {allImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200/90 cursor-pointer shadow-md transition-all duration-500 hover:border-brand-navy/60 hover:shadow-2xl"
              >
                <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 85vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-t border-slate-100">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-1">
                      {img.tag} • Frame 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                      {img.label}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/book-appointment?occasion=${data.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center space-x-1.5 shadow-sm"
                    >
                      <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Book Look</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </section>

      {/* 5. MINIMALIST LUXURY FOOTER CTA (BRAND NAVY DEEP LUXURY) */}
      <section className="bg-gradient-to-br from-brand-navy via-[#1B1464] to-[#0F0B3D] py-16 sm:py-24 border-t border-slate-200 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-brand-gold font-bold block">
            Private Atelier Consultation
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Tailored For {data.shortTitle}
          </h2>

          <p className="font-serif text-blue-100/90 text-sm sm:text-base font-light">
            One-on-one measurement and fabric curation at our Nairobi Atelier.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/book-appointment?occasion=${data.slug}`}
              className="w-full sm:w-auto px-8 py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-[0.2em] rounded transition-all duration-300 shadow-xl hover:shadow-gold flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Fitting Session</span>
            </Link>

            <Link
              href="/occasions"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-[0.2em] rounded transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>View All Occasions</span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE LIGHTBOX MODAL (LUXURIOUS MIDNIGHT BLUE WITH CRISP CONTROLS) */}
      {activeImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#071322]/95 backdrop-blur-2xl flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Top Bar */}
          <div className="w-full max-w-7xl flex items-center justify-between py-2 text-white z-20">
            <div className="flex items-center space-x-3">
              <span className="text-brand-gold text-xs font-mono font-bold">
                {activeImageIndex + 1} / {allImages.length}
              </span>
              <span className="text-blue-200 text-xs uppercase tracking-wider hidden sm:inline-block">
                {allImages[activeImageIndex].tag}
              </span>
            </div>

            <button
              onClick={() => setActiveImageIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/20"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Visual Display */}
          <div 
            className="relative w-full max-w-5xl h-[70vh] sm:h-[76vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[activeImageIndex].src}
              alt={allImages[activeImageIndex].label}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-contain"
              priority
            />

            {/* Left Prev Arrow */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev !== null ? (prev - 1 + allImages.length) % allImages.length : 0))}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-navy text-white flex items-center justify-center border border-white/20 transition-all shadow-xl"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={() => setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % allImages.length : 0))}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-brand-gold hover:text-brand-navy text-white flex items-center justify-center border border-white/20 transition-all shadow-xl"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Action in Clean Semi-Translucent Navy Card */}
          <div 
            className="w-full max-w-2xl text-center py-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0e1d35]/90 backdrop-blur-md px-6 rounded-xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-left">
              <span className="text-[10px] text-brand-gold uppercase tracking-wider font-bold block">
                {allImages[activeImageIndex].tag}
              </span>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white">
                {allImages[activeImageIndex].label}
              </h4>
            </div>

            <Link
              href={`/book-appointment?occasion=${data.slug}`}
              className="px-5 py-2 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider rounded transition-all flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Look</span>
            </Link>
          </div>

        </div>
      )}

    </div>
  );
};
