'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CollectionGrids: React.FC = () => {
  const collections = [
    {
      title: 'Bespoke Suits',
      subtitle: 'The Executive Wardrobe',
      description: 'Hand-cut two and three-piece suits in Super 140s–180s worsted wools with full floating canvas.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85',
      href: '/bespoke/bespoke-suits',
      badge: 'Individual Pattern Drafting',
      startingPrice: 'Starting from KES 145,000',
    },
    {
      title: 'The Wedding Atelier',
      subtitle: 'Groom & Bridal Party Commissions',
      description: 'Ceremonial velvet dinner jackets, black tie tuxedos, and coordinated bespoke groomsmen ensembles.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85',
      href: '/bespoke/weddings',
      badge: 'Celebrated Milestones',
      startingPrice: 'Dedicated Wedding Concierge',
    },
    {
      title: 'Ready to Wear',
      subtitle: 'Immediate Sartorial Splendor',
      description: 'Handcrafted smoking jackets, pure cashmere blazers, Como grenadine ties, and artisanal fragrances.',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85',
      href: '/ready-to-wear',
      badge: 'Immediate Nairobi Dispatch',
      startingPrice: 'Ready to Wear & Tailor',
    },
  ];

  return (
    <section className="py-12 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 pb-4 sm:pb-6 border-b border-slate-200">
          <div>
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2 mb-1.5 sm:mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Collections</span>
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
              The Sartorial Portfolios
            </h2>
          </div>
          <Link
            href="/ready-to-wear"
            className="mt-3 md:mt-0 inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-luxury text-brand-navy hover:text-brand-gold transition-colors group"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {collections.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group relative h-[420px] sm:h-[480px] lg:h-[520px] rounded-lg overflow-hidden shadow-luxury transition-all duration-500 hover:shadow-2xl flex flex-col justify-end p-5 sm:p-8 border border-slate-200"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy/60 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

              {/* Card Content */}
              <div className="relative z-10 space-y-2.5 sm:space-y-3 transform transition-transform duration-300">
                <span className="inline-block text-[9px] sm:text-[10px] tracking-luxury uppercase font-bold text-brand-gold bg-black/40 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded border border-brand-gold/30">
                  {item.badge}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-brand-gold transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 sm:pt-4 border-t border-white/15 flex items-center justify-between text-xs font-bold text-white">
                  <span className="text-brand-gold text-[10px] sm:text-[11px] uppercase tracking-wider">{item.startingPrice}</span>
                  <span className="flex items-center space-x-1.5 text-white group-hover:text-brand-gold transition-colors text-[11px] sm:text-xs">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
