'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { READY_TO_WEAR_PRODUCTS, BESPOKE_CATEGORIES } from '@/data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProducts = query.trim() === '' ? [] : READY_TO_WEAR_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.category.toLowerCase().includes(query.toLowerCase()) ||
      p.fabricDetails.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBespoke = query.trim() === '' ? [] : BESPOKE_CATEGORIES.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-navy/80 backdrop-blur-md flex items-start justify-center pt-20 px-4">
      <div 
        onClick={onClose}
        className="fixed inset-0" 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-brand-gold/30 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center space-x-3 bg-brand-canvas-alt">
          <Search className="w-5 h-5 text-brand-gold flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search suits, velvet smoking jackets, fabrics (e.g. Scabal, Cashmere)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-brand-navy text-base font-medium placeholder-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-brand-navy transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {query.trim() === '' ? (
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Atelier Collections</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {BESPOKE_CATEGORIES.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/bespoke/${cat.slug}`}
                    onClick={onClose}
                    className="p-3 bg-slate-50 hover:bg-brand-navy hover:text-white rounded border border-slate-200 transition-all text-xs font-semibold group"
                  >
                    <span className="group-hover:text-brand-gold transition-colors">{cat.title}</span>
                    <span className="block text-[10px] text-slate-400 group-hover:text-slate-200 font-normal mt-0.5">
                      {cat.leadTime}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              {filteredProducts.length === 0 && filteredBespoke.length === 0 ? (
                <div className="text-center py-10">
                  <p className="font-serif text-lg text-brand-navy font-bold">No sartorial matches found</p>
                  <p className="text-xs text-brand-slate-muted mt-1">
                    Try searching for &quot;velvet&quot;, &quot;cashmere&quot;, &quot;wedding&quot;, or &quot;suits&quot;.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Products */}
                  {filteredProducts.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-brand-gold font-bold mb-3">
                        Ready to Wear ({filteredProducts.length})
                      </p>
                      <div className="space-y-3">
                        {filteredProducts.map((product) => (
                          <Link
                            key={product.id}
                            href={`/ready-to-wear`}
                            onClick={onClose}
                            className="flex items-center space-x-4 p-2 rounded hover:bg-slate-50 transition-colors group"
                          >
                            <div className="relative w-14 h-16 bg-slate-100 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-serif text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                                {product.name}
                              </p>
                              <p className="text-xs text-brand-slate-muted line-clamp-1">{product.fabricDetails}</p>
                              <p className="text-xs font-bold text-brand-navy mt-0.5">
                                {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(product.priceKes)}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-gold transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bespoke Categories */}
                  {filteredBespoke.length > 0 && (
                    <div>
                      <p className="text-xs uppercase tracking-luxury text-brand-gold font-bold mb-3">
                        Bespoke Services ({filteredBespoke.length})
                      </p>
                      <div className="space-y-2">
                        {filteredBespoke.map((item) => (
                          <Link
                            key={item.slug}
                            href={`/bespoke/${item.slug}`}
                            onClick={onClose}
                            className="flex items-center justify-between p-3 rounded hover:bg-slate-50 transition-colors group"
                          >
                            <div>
                              <p className="font-serif text-sm font-semibold text-brand-navy group-hover:text-brand-gold transition-colors">
                                {item.title}
                              </p>
                              <p className="text-xs text-brand-slate-muted">{item.subtitle}</p>
                            </div>
                            <span className="text-xs text-brand-gold font-semibold flex items-center space-x-1">
                              <span>From KES {item.startingPriceKes.toLocaleString()}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
