'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';
import type { Product } from '@/types';
import { ProductCardWithGallery } from '@/components/product/ProductCardWithGallery';

function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>(READY_TO_WEAR_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  React.useEffect(() => {
    let isMounted = true;
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch((err) => console.warn('Could not fetch dynamic products, using fallback:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'suits', label: '2 & 3-Piece Suits' },
    { id: 'evening-dinner', label: 'Tuxedos' },
    { id: 'kaunda-suits', label: 'Kaunda / Senator Suits' },
    { id: 'smart-casual', label: 'Smart Casual & Blazers' },
    { id: 'traditional', label: 'Traditional Wear' },
    { id: 'kaftan-agbada', label: 'Kaftans & Agbada' },
    { id: 'modern-kids', label: 'Modern Kids' },
    { id: 'shirts', label: 'Shirts' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'kaunda-suits' || selectedCategory === 'senator-suits') {
          return product.category === 'kaunda-suits' || (product.category as string) === 'senator-suits';
        }
        if (product.category !== selectedCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
      if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
      return 0;
    });
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <section className="bg-brand-navy py-12 sm:py-16 text-white border-b-2 border-brand-gold/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sartorial Portfolio</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              The Sartorial Gallery
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Explore our master commissions and made-to-measure tailoring creations. Each piece is constructed with floating horsehair canvas and tailored exclusively to individual anatomy.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Top Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 mb-8 border-b border-slate-200 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-gold text-brand-navy font-bold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2.5 text-xs self-start md:self-auto">
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-gold"
            >
              <option value="featured">Curated &amp; Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Gallery Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-lg border border-slate-200 px-4">
            <p className="font-serif text-lg font-bold text-brand-navy">No garments found in this category</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-5 py-2 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider rounded"
            >
              View All Creations
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCardWithGallery key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Bottom Consultation CTA */}
        <div className="mt-16 p-8 bg-brand-canvas-alt rounded-lg border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="font-serif text-xl font-bold text-brand-navy">Commission a Made to Measure Garment</h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Book a personal fitting consultation in our Nairobi atelier to select fabrics, lapels, and custom detailing.
            </p>
          </div>
          <Link
            href="/book-appointment"
            className="px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs rounded transition-all shadow flex items-center space-x-2 flex-shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Atelier Fitting</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand-navy">Loading Gallery...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
