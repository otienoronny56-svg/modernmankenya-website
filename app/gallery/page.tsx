'use client';

import React, { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Calendar, Maximize2, ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { SARTORIAL_GALLERY_ITEMS, GalleryItem } from '@/data/galleryData';

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [accessorySubFilter, setAccessorySubFilter] = useState<'all' | 'neckwear' | 'hardware' | 'leather-timepieces' | 'hats'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync state if URL query param changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'suits', label: '2 & 3-Piece Suits' },
    { id: 'evening-dinner', label: 'Tuxedos' },
    { id: 'kaunda-suits', label: 'Kaunda / Senator Suits' },
    { id: 'smart-casual', label: 'Smart Casual & Blazers' },
    { id: 'traditional', label: 'Traditional Wear' },
    { id: 'kaftan-agbada', label: 'Kaftans & Agbada' },
    { id: 'modern-kids', label: 'Modern Kids' },
    { id: 'modern-women', label: 'Modern Women' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredItems = useMemo(() => {
    return SARTORIAL_GALLERY_ITEMS.filter((item) => {
      if (selectedCategory === 'all') return true;

      if (selectedCategory === 'accessories') {
        if (item.category !== 'accessories') return false;
        if (accessorySubFilter === 'neckwear') {
          return item.id === 'acc-1' || item.id === 'acc-2' || item.id === 'acc-5';
        }
        if (accessorySubFilter === 'hardware') {
          return item.id === 'acc-3' || item.id === 'acc-4' || item.id === 'acc-8';
        }
        if (accessorySubFilter === 'leather-timepieces') {
          return item.id === 'acc-6' || item.id === 'acc-7';
        }
        if (accessorySubFilter === 'hats') {
          return item.id === 'acc-9';
        }
        return true;
      }

      return item.category === selectedCategory;
    });
  }, [selectedCategory, accessorySubFilter]);

  // Lightbox navigation helpers
  const activeLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! > 0 ? prev! - 1 : filteredItems.length - 1));
  }, [lightboxIndex, filteredItems.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! < filteredItems.length - 1 ? prev! + 1 : 0));
  }, [lightboxIndex, filteredItems.length]);

  const handleClose = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxIndex, handleClose, handlePrev, handleNext]);

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-navy">
      {/* Editorial Header Banner */}
      <section className="bg-brand-navy py-12 sm:py-16 text-white border-b-2 border-brand-gold/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sartorial Portfolio</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The Sartorial Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Explore our master commissions and made-to-measure tailoring portfolio. Every single garment is handcrafted with floating horsehair canvas and sculpted to distinct human anatomy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-8 border-b border-slate-200 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setAccessorySubFilter('all');
                    setLightboxIndex(null);
                  }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-gold text-brand-navy font-bold shadow-md ring-2 ring-brand-gold/50'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-brand-navy'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Creation Count Indicator */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium self-start md:self-auto flex-shrink-0">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span>
              Showing <strong className="text-brand-navy font-bold">{filteredItems.length}</strong> creations
            </span>
          </div>
        </div>

        {/* Curated Accessories Header & Sub-filter (when Accessories tab is active) */}
        {selectedCategory === 'accessories' && (
          <div className="mb-8 p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-brand-navy to-stone-900 text-white rounded-xl border border-brand-gold/30 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold flex items-center space-x-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Curated Atelier Accoutrements</span>
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                  Modern Man Kenya Accessories Collection
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl font-light">
                  Handcrafted accoutrements engineered to complete bespoke tailoring: Silk Ties, Velvet Bowties, Onyx Cufflinks &amp; Studs, Lion Lapel Pins, Ascot Cravats, Leather Belts &amp; Suspenders, Dress Watches, Tie Bars, and Master Fedora Hats.
                </p>
              </div>
              <div className="flex items-center space-x-2 self-start md:self-auto flex-shrink-0">
                <span className="px-3 py-1 bg-brand-gold/20 text-brand-gold border border-brand-gold/40 rounded-full text-xs font-semibold">
                  9 House Accessories
                </span>
              </div>
            </div>

            {/* Sub-Pills Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pt-4 no-scrollbar">
              {[
                { id: 'all', label: 'All 9 Accessories' },
                { id: 'neckwear', label: 'Ties, Bowties & Cravat' },
                { id: 'hardware', label: 'Cufflinks, Pins & Tie Bars' },
                { id: 'leather-timepieces', label: 'Belt, Suspenders & Watch' },
                { id: 'hats', label: 'Master Fedora Hats' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setAccessorySubFilter(sub.id as any)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${
                    accessorySubFilter === sub.id
                      ? 'bg-brand-gold text-brand-navy font-bold shadow-sm'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Visual Cards Grid: Continuous Smooth Scroll of Individual Images */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 px-4">
            <p className="font-serif text-lg font-bold text-brand-navy">No creations found in this category</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setAccessorySubFilter('all');
              }}
              className="mt-4 px-5 py-2.5 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-brand-gold hover:text-brand-navy transition-all"
            >
              View All Creations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-white rounded-lg border border-slate-200/90 hover:border-brand-gold/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Floating Badge: 1-2 Word Tag */}
                  <div className="absolute top-2.5 left-2.5 z-10">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-sm text-brand-gold border border-brand-gold/30 shadow-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* Zoom Indicator Icon on Hover */}
                  <div className="absolute top-2.5 right-2.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-7 h-7 rounded-full bg-brand-gold/90 text-brand-navy flex items-center justify-center shadow-md">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Card Caption: Crisp 1-2 Word Title with NO PRICING */}
                <div className="p-3 sm:p-3.5 flex items-center justify-between bg-white border-t border-slate-100">
                  <div className="min-w-0 pr-2">
                    <h3 className="font-serif text-xs sm:text-sm font-bold text-brand-navy group-hover:text-brand-gold transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-wide truncate mt-0.5">
                      {item.tag}
                    </p>
                  </div>
                  <span className="text-slate-300 group-hover:text-brand-gold transition-colors flex-shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="mt-16 p-8 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-brand-gold font-bold">Bespoke Atelier</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">Commission a Made-to-Measure Garment</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl">
              Book a personal fitting consultation in our atelier to select fabrics, lapels, internal canvassing, and monogram embroidery.
            </p>
          </div>
          <Link
            href="/book-appointment"
            className="px-6 py-3 bg-brand-navy hover:bg-brand-gold text-white hover:text-brand-navy font-bold uppercase tracking-wider text-xs rounded-md transition-all shadow-md flex items-center space-x-2 flex-shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Atelier Fitting</span>
          </Link>
        </div>
      </main>

      {/* Full-Screen Lightbox Modal for High-Resolution Inspection */}
      {activeLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
          onClick={handleClose}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white max-w-6xl w-full mx-auto pb-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold">
                {activeLightboxItem.tag}
              </span>
              <h2 className="font-serif text-lg sm:text-2xl font-bold text-white">
                {activeLightboxItem.title}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image with Navigation */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 max-w-5xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:-left-12 z-20 p-2.5 rounded-full bg-black/60 hover:bg-brand-gold text-white hover:text-brand-navy transition-all border border-white/20"
              aria-label="Previous creation"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Image */}
            <div className="relative w-full h-[65vh] sm:h-[72vh] max-w-3xl flex items-center justify-center">
              <Image
                src={activeLightboxItem.image}
                alt={activeLightboxItem.title}
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 sm:-right-12 z-20 p-2.5 rounded-full bg-black/60 hover:bg-brand-gold text-white hover:text-brand-navy transition-all border border-white/20"
              aria-label="Next creation"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Action Buttons & Counter */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between text-white max-w-6xl w-full mx-auto pt-3 border-t border-white/10 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs text-slate-400 font-mono">
              {lightboxIndex! + 1} / {filteredItems.length}
            </span>

            <div className="flex items-center space-x-3">
              <Link
                href={`/book-appointment?ref=${activeLightboxItem.id}&title=${encodeURIComponent(activeLightboxItem.title)}`}
                className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs rounded-md transition-all shadow-md flex items-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Commission This Look</span>
              </Link>
              <button
                onClick={handleClose}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-md transition-all"
              >
                Back to Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-brand-navy bg-white">
          <div className="flex items-center space-x-3">
            <span className="w-3 h-3 rounded-full bg-brand-gold animate-ping" />
            <span className="font-serif text-lg font-bold">Loading Sartorial Gallery...</span>
          </div>
        </div>
      }
    >
      <GalleryContent />
    </Suspense>
  );
}
