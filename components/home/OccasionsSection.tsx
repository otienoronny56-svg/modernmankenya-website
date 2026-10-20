'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface OccasionCard {
  id: string;
  title: string;
  image: string;
  href: string;
  badge: string;
}

const OCCASION_CARDS: OccasionCard[] = [
  {
    id: 'business',
    title: 'Business & Executive',
    image: '/images/MOK_7655.jpg',
    href: '/occasions/business-executive',
    badge: 'Boardroom',
  },
  {
    id: 'wedding',
    title: 'Wedding & Groom',
    image: '/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg',
    href: '/occasions/wedding-groom',
    badge: 'Nuptials',
  },
  {
    id: 'formal',
    title: 'Formal & Black Tie',
    image: '/images/tuxedo.jpeg',
    href: '/occasions/formal-eveningwear',
    badge: 'Gala Evening',
  },
  {
    id: 'signature',
    title: 'Signature & African Wear',
    image: '/images/kaunda suit.jpeg',
    href: '/occasions/signature-occasion',
    badge: 'Kaunda Suits',
  },
];

export const OccasionsSection: React.FC = () => {
  return (
    <section id="occasions" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Direct Link to All Occasions */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
              Tailored For Every Milestone
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold tracking-tight">
              Suits for Every Occasion
            </h2>
          </div>
          <Link
            href="/occasions"
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest font-bold text-brand-navy hover:text-brand-gold transition-colors pb-1 border-b border-brand-gold/60"
          >
            <span>Explore Lookbooks</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Occasions Luxury Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {OCCASION_CARDS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-gold/80 transition-all duration-300 flex flex-col"
            >
              {/* 1. Title on Top of Image */}
              <div className="px-5 py-4 bg-brand-canvas-alt border-b border-slate-200/80 flex items-center justify-between">
                <h3 className="font-serif text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
              </div>

              {/* 2. Visual Photo */}
              <div className="relative aspect-[1/1] w-full overflow-hidden bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* 3. Bottom: Book for [Occasion] with Arrow */}
              <div className="p-4 sm:p-5 flex items-center justify-between bg-white group-hover:bg-slate-50 transition-colors border-t border-slate-100">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-navy group-hover:text-brand-gold transition-colors">
                  View Lookbook
                </span>
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
