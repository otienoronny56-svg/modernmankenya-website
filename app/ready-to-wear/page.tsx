'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Sparkles, 
  ShoppingBag, 
  Search, 
  Filter, 
  Truck, 
  ShieldCheck, 
  CreditCard, 
  MessageCircle, 
  ArrowRight,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import type { Product } from '@/types';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';
import { ProductCardWithGallery } from '@/components/product/ProductCardWithGallery';
import { useCartStore } from '@/store/cartStore';

const CATEGORIES = [
  { id: 'all', label: 'All Garments & Accoutrements' },
  { id: 'shirts', label: 'Luxury Shirts' },
  { id: 'accessories', label: 'Artisanal Accessories' },
  { id: 'suits', label: '2 & 3-Piece Suits' },
  { id: 'evening-dinner', label: 'Tuxedos' },
  { id: 'kaunda-suits', label: 'Kaunda / Senator Suits' },
  { id: 'smart-casual', label: 'Smart Casual & Blazers' },
];

function ReadyToWearShopContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>(READY_TO_WEAR_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [isLoading, setIsLoading] = useState(false);

  const { getTotalCount } = useCartStore();
  const cartCount = getTotalCount();

  // Sync category param if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Fetch updated catalogue from API (Supabase + local store)
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products && Array.isArray(data.products) && data.products.length > 0) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn('Using seeded ready-to-wear products:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLatest();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'all') {
          if (selectedCategory === 'shirts') {
            const isShirt = 
              p.category === 'shirts' || 
              p.name.toLowerCase().includes('shirt') || 
              p.slug.includes('shirt');
            if (!isShirt) return false;
          } else if (selectedCategory === 'accessories') {
            const isAcc = p.category === 'accessories' && !p.slug.includes('shirt');
            if (!isAcc) return false;
          } else if (selectedCategory === 'suits') {
            if (p.category !== 'suits') return false;
          } else {
            if (p.category !== selectedCategory) return false;
          }
        }

        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTag = p.tagline?.toLowerCase().includes(q);
          const matchDesc = p.description?.toLowerCase().includes(q);
          const matchFabric = p.fabricDetails?.toLowerCase().includes(q);
          if (!matchName && !matchTag && !matchDesc && !matchFabric) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
        if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-brand-canvas text-brand-navy">
      {/* Editorial Hero Header */}
      <section className="bg-brand-navy py-12 sm:py-16 text-white border-b-2 border-brand-gold/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex-wrap">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span className="text-white">Shop Ready-to-Wear</span>
              {selectedCategory !== 'all' && (
                <>
                  <span>/</span>
                  <span className="text-brand-gold capitalize">{selectedCategory.replace('-', ' ')}</span>
                </>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Shirts, Accessories & Ready-to-Wear
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
              Precision-tailored Egyptian cotton shirts, pure Como silk neckwear, handcrafted hardware, and ready-to-wear ensembles sculpted with floating canvas in our Nairobi atelier. Available for instant checkout and delivery.
            </p>

            {/* Value Guarantees Banner */}
            <div className="pt-3 sm:pt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] text-slate-300">
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded border border-white/10 backdrop-blur-sm">
                <Truck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="truncate">Nairobi Same-Day Courier</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded border border-white/10 backdrop-blur-sm">
                <CreditCard className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="truncate">M-Pesa Till 8234500</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded border border-white/10 backdrop-blur-sm">
                <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="truncate">1-Click WhatsApp Order</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded border border-white/10 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span className="truncate">100% Fit Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shopping Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Category Pills & Interactive Filters */}
        <div className="space-y-4 mb-8">
          {/* Category Pills (Horizontal Scroll on Mobile) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
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

          {/* Search, Sort, and Results Count Bar */}
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shirts, cufflinks, ties, bowties, suits..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
              />
            </div>

            {/* Sort & Counter */}
            <div className="flex items-center justify-between sm:justify-end space-x-3 text-xs">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-brand-navy">{filteredProducts.length}</strong> items
              </span>

              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-brand-gold font-medium"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-200 px-4 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-serif text-lg font-bold text-brand-navy">No products match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset category filter to see all ready-to-wear shirts and accessories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-5 py-2.5 bg-brand-navy text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-brand-gold hover:text-brand-navy transition-all shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCardWithGallery key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Cart Quick-Bar Floating Prompt (if items in cart) */}
        {cartCount > 0 && (
          <div className="fixed bottom-6 right-6 z-40 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <Link
              href="/cart"
              className="flex items-center space-x-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white px-5 py-3 rounded-full shadow-2xl border-2 border-brand-gold transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
              <span className="text-xs font-bold uppercase tracking-wider">
                View Bag ({cartCount})
              </span>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
            </Link>
          </div>
        )}

        {/* Bottom Made-to-Measure Upsell */}
        <section className="mt-16 p-8 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-sm">
          <div className="space-y-1">
            <span className="text-[11px] uppercase tracking-wider text-brand-gold font-bold flex items-center justify-center md:justify-start space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              <span>Looking for Custom Bespoke Tailoring?</span>
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
              Crafted Exclusively to Your Anatomical Dimensions
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light max-w-xl">
              Prefer an individual pattern drafted from scratch? Book a personal measurement consultation at our Nairobi atelier or have master clothiers visit your residence.
            </p>
          </div>
          <Link
            href="/book-appointment"
            className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-dark text-white text-xs font-bold uppercase tracking-luxury rounded transition-all shadow hover:shadow-lg flex items-center space-x-2 flex-shrink-0"
          >
            <span>Book Private Fitting</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </Link>
        </section>
      </main>
    </div>
  );
}

export default function ReadyToWearShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-canvas flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin" />
        </div>
      }
    >
      <ReadyToWearShopContent />
    </Suspense>
  );
}
