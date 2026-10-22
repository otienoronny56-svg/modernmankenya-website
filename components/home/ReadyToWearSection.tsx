'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface GalleryHighlight {
  id: string;
  name: string;
  category: string;
  image: string;
  badge: string;
  href: string;
}

const GALLERY_HIGHLIGHTS: GalleryHighlight[] = [
  {
    id: 'bespoke-navy-suit',
    name: 'Executive Navy Peak Lapel Suit',
    category: 'Suits',
    image: '/images/MOK_2198.jpg',
    badge: 'Pure Wool',
    href: '/gallery?category=suits',
  },
  {
    id: 'double-breasted-blazer',
    name: 'Modern Double-Breasted Tailoring',
    category: 'Blazers',
    image: '/images/double-breasted-suit-navy.jpeg',
    badge: 'Tailored Separates',
    href: '/gallery?category=smart-casual',
  },
  {
    id: 'african-ceremony-wear',
    name: 'Contemporary African Occasion Wear',
    category: 'Traditional',
    image: '/images/agbada-navy-copper-embroidery.jpeg',
    badge: 'African Luxury',
    href: '/gallery?category=traditional',
  },
  {
    id: 'charcoal-three-piece',
    name: 'Classic Charcoal 3-Piece Suit',
    category: 'Suits',
    image: '/images/MOK_7662.jpg',
    badge: '3-Piece Tailoring',
    href: '/gallery?category=suits',
  },
];

export const ReadyToWearSection: React.FC = () => {
  return (
    <section id="gallery" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Clean Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
              Signature Collection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold tracking-tight">
              Ready to Wear
            </h2>
          </div>

          <Link
            href="/ready-to-wear"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors group"
          >
            <span>Explore All Pieces</span>
            <ArrowUpRight className="w-4 h-4 text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Image-Driven Cards with Unique Photos & Zero Bloat */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {GALLERY_HIGHLIGHTS.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-gold/80 transition-all duration-300 flex flex-col"
            >
              {/* Visual Garment Image with Unique Client Photo */}
              <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Number Indicator */}
                <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                  0{idx + 1}
                </div>

                {/* Badge */}
                <div className="absolute top-3.5 right-3.5 bg-brand-gold text-brand-navy text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                  {item.badge}
                </div>
              </div>

              {/* Clean Bottom Label Bar */}
              <div className="p-4 sm:p-5 flex items-center justify-between bg-white group-hover:bg-slate-50 transition-colors">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold block mb-0.5">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug line-clamp-1">
                    {item.name}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-brand-gold group-hover:text-brand-navy text-slate-600 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-3">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
