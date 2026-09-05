'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Filter, 
  ChevronDown, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';
import type { Product } from '@/types';
import { ProductCardWithGallery } from '@/components/product/ProductCardWithGallery';

function ReadyToWearContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [products, setProducts] = useState<Product[]>(READY_TO_WEAR_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Dynamically fetch live products from admin API
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
    { id: 'all', label: 'All Ready to Wear' },
    { id: 'suits', label: 'Suits' },
    { id: 'jackets', label: 'Blazers & Jackets' },
    { id: 'velvets', label: 'Velvet Smoking Jackets' },
    { id: 'evening-dinner', label: 'Evening & Dinner Wear' },
    { id: 'fragrances', label: 'Fragrances' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const sizeOptions = ['all', '38R', '40R', '42R', '44R', '46L', '100ml Flacon', '8.5cm Width'];

  // Multi-faceted filtering
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category match
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Size match
      if (selectedSize !== 'all') {
        const hasSize = product.variants.some((v) => v.size === selectedSize);
        if (!hasSize) return false;
      }
      // Price range match
      if (selectedPriceRange === 'under-50k' && product.priceKes >= 50000) return false;
      if (selectedPriceRange === '50k-150k' && (product.priceKes < 50000 || product.priceKes > 150000)) return false;
      if (selectedPriceRange === 'above-150k' && product.priceKes <= 150000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceKes - b.priceKes;
      if (sortBy === 'price-desc') return b.priceKes - a.priceKes;
      return 0; // featured
    });
  }, [products, selectedCategory, selectedSize, selectedPriceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Banner */}
      <section className="bg-brand-navy py-10 sm:py-16 text-white border-b-2 border-brand-gold/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-2 sm:space-y-3">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Immediate Sartorial Splendor</span>
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
              The Ready to Wear Wardrobe
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Cut to our exacting bespoke master silhouettes with full floating canvas chest pieces. 
              Available for immediate white-glove dispatch in Nairobi or worldwide delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Top Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 sm:pb-6 mb-6 sm:mb-8 border-b border-slate-200 gap-4">
          
          {/* Category Tabs (Horizontally swipeable on phone) */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2.5 text-xs self-start md:self-auto">
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-xs font-semibold text-brand-navy focus:outline-none focus:border-brand-gold"
            >
              <option value="featured">Curated & Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Row: Sizes & Price */}
        <div className="bg-brand-canvas-alt p-3.5 sm:p-4 rounded-lg border border-slate-200 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs">
          <div className="flex flex-col xs:flex-row xs:items-center gap-2 w-full sm:w-auto">
            <span className="font-bold text-brand-navy">Size:</span>
            <div className="flex flex-wrap gap-1.5">
              {sizeOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`px-2.5 py-1 rounded border text-[11px] font-medium transition-all ${
                    selectedSize === s
                      ? 'border-brand-gold bg-brand-gold text-brand-navy font-bold'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-brand-navy'
                  }`}
                >
                  {s === 'all' ? 'All Sizes' : s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start">
            <span className="font-bold text-brand-navy">Price Range:</span>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bg-white border border-slate-300 rounded px-3 py-1 text-xs text-brand-navy focus:outline-none"
            >
              <option value="all">All Prices</option>
              <option value="under-50k">Under KES 50,000</option>
              <option value="50k-150k">KES 50,000 – KES 150,000</option>
              <option value="above-150k">Above KES 150,000</option>
            </select>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 sm:py-20 bg-slate-50 rounded-lg border border-slate-200 px-4">
            <p className="font-serif text-lg sm:text-xl font-bold text-brand-navy">No products match your selected filters</p>
            <p className="text-xs text-slate-500 mt-1">Try resetting your filters or selecting a different size.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSize('all');
                setSelectedPriceRange('all');
              }}
              className="mt-4 px-5 py-2.5 bg-brand-navy text-white text-xs font-bold uppercase tracking-luxury rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCardWithGallery key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ReadyToWearPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand-navy">Loading Sartorial Collection...</div>}>
      <ReadyToWearContent />
    </Suspense>
  );
}
