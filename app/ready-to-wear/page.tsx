'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Filter, 
  ShoppingBag, 
  Check, 
  ChevronDown, 
  SlidersHorizontal,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types';

function ReadyToWearContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [quickAddProductId, setQuickAddProductId] = useState<string | null>(null);
  const [selectedVariantSize, setSelectedVariantSize] = useState<string>('');

  const { addItem } = useCartStore();

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
    return READY_TO_WEAR_PRODUCTS.filter((product) => {
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
  }, [selectedCategory, selectedSize, selectedPriceRange, sortBy]);

  const handleQuickAdd = (product: Product, size: string) => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      priceKes: product.priceKes,
      priceUsd: product.priceUsd,
      size: size,
      color: product.variants[0]?.color || 'Standard',
      image: product.images[0],
    });
    setQuickAddProductId(null);
    setSelectedVariantSize('');
  };

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
              <div
                key={product.id}
                className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image Area */}
                <div className="relative h-[300px] sm:h-[360px] bg-slate-100 overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-brand-navy/90 text-brand-gold border border-brand-gold/30 text-[10px] uppercase font-bold tracking-luxury px-2.5 py-1 rounded backdrop-blur-md">
                      {product.construction.split(' ')[0]} {product.construction.split(' ')[1]}
                    </span>
                  </div>

                  {/* Quick Add To Cart Drawer Overlay */}
                  {quickAddProductId === product.id ? (
                    <div className="absolute inset-0 bg-brand-navy/95 p-5 sm:p-6 flex flex-col justify-between text-white animate-in fade-in duration-200">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
                            Select Sizing
                          </span>
                          <button
                            onClick={() => setQuickAddProductId(null)}
                            className="text-xs text-slate-400 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                        <p className="font-serif text-sm font-semibold mb-3">{product.name}</p>
                        <div className="grid grid-cols-3 gap-2">
                          {product.variants.map((v) => (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariantSize(v.size)}
                              className={`py-2 px-1 text-center rounded border text-xs font-semibold transition-all ${
                                selectedVariantSize === v.size
                                  ? 'bg-brand-gold text-brand-navy border-brand-gold'
                                  : 'bg-white/10 text-white border-white/20 hover:border-brand-gold'
                              }`}
                            >
                              {v.size}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        disabled={!selectedVariantSize}
                        onClick={() => handleQuickAdd(product, selectedVariantSize)}
                        className={`w-full py-3 rounded-sm font-bold uppercase tracking-luxury text-xs transition-all ${
                          selectedVariantSize
                            ? 'bg-brand-gold hover:bg-brand-gold-light text-brand-navy shadow-gold'
                            : 'bg-white/20 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Confirm Addition to Cart
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setQuickAddProductId(product.id);
                        setSelectedVariantSize(product.variants[0]?.size || '');
                      }}
                      className="absolute bottom-3 right-3 p-3 bg-white/90 hover:bg-brand-gold text-brand-navy rounded-full shadow-lg transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transform sm:translate-y-2 sm:group-hover:translate-y-0"
                      aria-label="Quick Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold block mb-1">
                      {product.category.replace('-', ' ')}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-brand-navy leading-snug group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 font-light">
                      {product.fabricDetails}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                      <span className="font-serif text-base font-bold text-brand-navy">
                        {new Intl.NumberFormat('en-KE', {
                          style: 'currency',
                          currency: 'KES',
                          maximumFractionDigits: 0,
                        }).format(product.priceKes)}
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setQuickAddProductId(product.id);
                        setSelectedVariantSize(product.variants[0]?.size || '');
                      }}
                      className="px-3.5 py-2 rounded-sm border border-brand-navy hover:bg-brand-navy hover:text-white text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Select Size
                    </button>
                  </div>
                </div>
              </div>
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
