'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { WHAT_WE_CREATE } from '@/data/brandProfile';

export const WhatWeCreateSection: React.FC = () => {
  return (
    <section id="creations" className="py-14 sm:py-20 bg-brand-canvas-alt dark:bg-[#0c101c] border-b border-slate-200/80 dark:border-slate-800 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple English Clean Header */}
        <div className="mb-10 sm:mb-14 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
            Our Creations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white font-bold tracking-tight">
            What We Make
          </h2>
        </div>

        {/* Category Cards (Clicking Takes You to Filtered Gallery) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHAT_WE_CREATE.map((item, idx) => (
            <Link
              key={item.id}
              href={`/gallery?category=${item.categoryParam}`}
              className="group bg-white dark:bg-[#121727] rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-gold/80 dark:hover:border-brand-gold/80 transition-all duration-300 flex flex-col"
            >
              {/* Visual Garment Image */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Subtle Gradient Shadow for Crisp Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                
                {/* Number Indicator */}
                <div className="absolute top-3.5 left-3.5 bg-black/50 backdrop-blur-md border border-white/20 text-white text-[10px] font-mono font-semibold px-2 py-0.5 rounded">
                  0{idx + 1}
                </div>

                {/* Subtitle / Badge */}
                {item.badge && (
                  <div className="absolute top-3.5 right-3.5 bg-brand-gold text-brand-navy text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                    {item.badge}
                  </div>
                )}
              </div>

              {/* Clean Bottom Label Bar - Just Title & Arrow Link */}
              <div className="p-4 sm:p-5 flex items-center justify-between bg-white dark:bg-[#121727] group-hover:bg-slate-50 dark:group-hover:bg-[#161e32] transition-colors">
                <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy dark:text-slate-100 group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-brand-gold group-hover:text-brand-navy text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-3">
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

