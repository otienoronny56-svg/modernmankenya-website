'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

interface OccasionCard {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
  href: string;
}

const OCCASION_CARDS: OccasionCard[] = [
  {
    id: 'business',
    title: 'Business & Executive',
    badge: 'Boardrooms & Office',
    description: 'Sharp, comfortable suits tailored for meetings and daily office wear.',
    image: '/images/MOK_7655.jpg',
    href: '/book-appointment?occasion=business',
  },
  {
    id: 'wedding',
    title: 'Wedding & Groom',
    badge: 'Groom & Groomsmen',
    description: 'Custom wedding suits made to make you look your best on your big day.',
    image: '/images/DSC04995.jpg',
    href: '/book-appointment?occasion=wedding',
  },
  {
    id: 'formal',
    title: 'Formal & Tuxedos',
    badge: 'Galas & Black Tie',
    description: 'Satin lapel tuxedos and dinner jackets for milestone celebrations.',
    image: '/images/MOK_2101.jpg',
    href: '/book-appointment?occasion=formal',
  },
  {
    id: 'signature',
    title: 'African & Occasion Wear',
    badge: 'Signature Style',
    description: 'Distinctive custom looks made with unique African fabrics and styling.',
    image: '/images/DSC05022.jpg',
    href: '/book-appointment?occasion=signature',
  },
];

export const OccasionsSection: React.FC = () => {
  return (
    <section id="occasions" className="py-14 sm:py-20 bg-white border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple Clean Header */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
            Tailored For You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold tracking-tight">
            Suits for Every Occasion
          </h2>
        </div>

        {/* 4 Image-Driven Cards (Matching What We Make style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {OCCASION_CARDS.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              className="group bg-white rounded-xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-gold/80 transition-all duration-300 flex flex-col"
            >
              {/* Visual Garment Image with Unique Person */}
              <div className="relative aspect-[1/1] w-full overflow-hidden bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.title}
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
              <div className="p-4 sm:p-5 flex items-center justify-between bg-white group-hover:bg-slate-50 transition-colors flex-1">
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-light mt-1 line-clamp-2">
                    {item.description}
                  </p>
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
