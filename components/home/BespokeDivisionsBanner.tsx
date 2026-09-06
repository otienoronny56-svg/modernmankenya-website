'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DivisionItem {
  id: 'modernman' | 'modernwoman' | 'modernchild';
  label: string;
  subtitle: string;
  image: string;
  href: string;
}

const DIVISIONS: DivisionItem[] = [
  {
    id: 'modernman',
    label: 'MODERNMAN BESPOKE',
    subtitle: 'Gentlemen’s Sartorial Mastery',
    image: '/images/divisions/modern-man.jpg',
    href: '/ready-to-wear?audience=modernman',
  },
  {
    id: 'modernwoman',
    label: 'MODERN WOMAN BESPOKE',
    subtitle: 'Couture Tailoring for Ladies',
    image: '/images/divisions/modern-woman.jpg',
    href: '/ready-to-wear?audience=modernwoman',
  },
  {
    id: 'modernchild',
    label: 'MODERNCHILD BESPOKE',
    subtitle: 'Heirloom Sartorial Attire',
    image: '/images/divisions/modern-child.jpg',
    href: '/ready-to-wear?audience=modernchild',
  },
];

export const BespokeDivisionsBanner: React.FC = () => {
  return (
    <section className="py-8 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3-Column Banner Grid matching Reference Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {DIVISIONS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative block overflow-hidden rounded-sm shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
            >
              {/* Image Container with 3:4 Aspect Ratio */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Luxury Gradient Overlay at Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Floating Gold / Bronze Button Over Lower Section (Exact Reference Style) */}
                <div className="absolute bottom-8 sm:bottom-10 inset-x-0 flex justify-center px-4 z-10">
                  <div className="w-auto min-w-[220px] sm:min-w-[240px] text-center px-6 py-3.5 bg-[#9E824C] hover:bg-[#8B703C] group-hover:bg-[#B39359] text-white text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-lg flex items-center justify-center space-x-1.5 border border-amber-200/20">
                    <span>{item.label}</span>
                    <span className="text-amber-200 group-hover:translate-x-1 transition-transform inline-block">
                      &gt;
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
