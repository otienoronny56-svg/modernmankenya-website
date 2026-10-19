'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, Calendar } from 'lucide-react';
import type { Product } from '@/types';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';

export const ReadyToWearSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(READY_TO_WEAR_PRODUCTS.slice(0, 4));

  useEffect(() => {
    let isMounted = true;
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.products && data.products.length > 0) {
          setProducts(data.products.slice(0, 4));
        }
      })
      .catch((err) => console.warn('Could not fetch dynamic gallery products:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 pb-6 border-b border-slate-200">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sartorial Portfolio</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
              The Gallery
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Explore our showcase of master made-to-measure garments and signature commissions crafted with floating canvas construction.
            </p>
          </div>

          <Link
            href="/gallery"
            className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-brand-navy hover:text-brand-gold transition-colors group"
          >
            <span>View Full Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-brand-gold" />
          </Link>
        </div>

        {/* 4 Gallery Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {products.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-luxury hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                  <Image
                    src={item.images[0] || '/images/bespoke-placeholder.jpg'}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  {/* Craftsmanship Badge */}
                  <div className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-sm border border-brand-gold/30 text-brand-gold text-[9px] font-bold uppercase tracking-luxury px-2 py-0.5 rounded">
                    Made to Measure
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 space-y-2">
                  <p className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold">
                    {item.category.replace('-', ' ')}
                  </p>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-light line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-2">
                <span className="text-[11px] text-slate-400 font-light">Custom Commission</span>
                <Link
                  href="/book-appointment"
                  className="text-[11px] font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-1"
                >
                  <span>Book Fitting</span>
                  <ArrowRight className="w-3 h-3 text-brand-gold" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner linking to Consultation */}
        <div className="mt-12 p-6 sm:p-8 bg-brand-canvas-alt rounded-lg border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-base sm:text-lg font-bold text-brand-navy">
              Inspired by a design in our gallery?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-light">
              Every garment is individually cut and crafted made-to-measure according to your chosen cloth, lining, and styling details.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            <Link
              href="/gallery"
              className="px-4 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white rounded text-xs uppercase tracking-wider font-semibold transition-all shadow-sm"
            >
              Browse Gallery
            </Link>
            <Link
              href="/book-appointment"
              className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded text-xs uppercase tracking-wider font-semibold transition-all flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};
