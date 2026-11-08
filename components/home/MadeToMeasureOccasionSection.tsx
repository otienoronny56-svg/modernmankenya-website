'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Scissors, Calendar, Check, MessageSquare } from 'lucide-react';

interface OccasionOption {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  href: string;
  features: string[];
}

const OCCASIONS: OccasionOption[] = [
  {
    id: 'executive',
    name: 'Executive Wear',
    tagline: 'Boardroom & Corporate Power',
    description: 'Two-piece and three-piece suits engineered with floating canvas for effortless comfort during long boardroom days.',
    image: '/images/MOK_7716.jpg',
    href: '/occasions/executive-wear',
    features: ['Super 130s–160s Wool', 'Notch or Peak Lapels', 'Personal Monogramming'],
  },
  {
    id: 'wedding',
    name: 'Wedding & Black Tie',
    tagline: 'Gala & Nuptial Ensembles',
    description: 'Immaculate silk-faced tuxedos, velvet dinner jackets, and coordinated party suits for your most unforgettable milestones.',
    image: '/images/wedding-groom-white-tuxedo-groomsmen-beige.jpeg',
    href: '/occasions/black-tie-wedding',
    features: ['Satin Silk Shawl/Peak', 'Groomsmen Party Rates', 'Handmade Cummerbunds'],
  },
  {
    id: 'african',
    name: 'African Wear',
    tagline: 'Heritage & Modern Splendor',
    description: 'Bespoke Kaftans, embroidered Agbadas, and contemporary Kaunda suits crafted with African prestige and European precision.',
    image: '/images/WhatsApp Image 2026-10-21 at 10.48.42 AM.jpeg',
    href: '/occasions/african-wear',
    features: ['Intricate Needlework', 'Prestige Kaunda Collars', 'Breathable Natural Linens'],
  },
];

export const MadeToMeasureOccasionSection: React.FC = () => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('executive');
  const activeOccasion = OCCASIONS.find((o) => o.id === selectedOccasion) || OCCASIONS[0];

  return (
    <section id="custom-fit" className="py-16 sm:py-24 bg-[#0e0d17] text-white relative overflow-hidden border-b border-brand-gold/20">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1B1464_0%,transparent_70%)] opacity-40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
            <Scissors className="w-3.5 h-3.5 text-brand-gold" />
            <span>Made to Measure Tailoring</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Tailor Your Fit for Any Occasion
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Choose your occasion, and our master tailors will craft a suit cut to your exact measurements, 
            personal taste, and event dress code.
          </p>

          {/* User Requested Prominent Button */}
          <div className="pt-3">
            <Link
              href="/occasions"
              className="inline-flex items-center space-x-2.5 px-6 sm:px-8 py-3.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-xl hover:shadow-brand-gold/20 hover:scale-105 group"
            >
              <Sparkles className="w-4 h-4 text-brand-navy group-hover:rotate-12 transition-transform" />
              <span>Customize Your Fit for Your Occasion</span>
              <ArrowRight className="w-4 h-4 text-brand-navy group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Interactive Occasion Customizer Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-8 backdrop-blur-md shadow-2xl">
          
          {/* 3 Occasion Tabs / Selectors */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {OCCASIONS.map((occ) => {
              const isSelected = occ.id === selectedOccasion;
              return (
                <button
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-brand-gold/20 border-brand-gold text-white shadow-lg ring-1 ring-brand-gold'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-serif text-base sm:text-lg font-bold text-white">
                      {occ.name}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                    )}
                  </div>
                  <span className="text-[11px] text-brand-gold font-medium truncate">
                    {occ.tagline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Occasion Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Garment Image */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-stone-900 border border-white/10">
              <Image
                src={activeOccasion.image}
                alt={activeOccasion.name}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] uppercase tracking-widest text-brand-gold font-bold block mb-1">
                  Featured Style
                </span>
                <p className="font-serif text-lg font-bold">{activeOccasion.name}</p>
              </div>
            </div>

            {/* Right: Description, Features & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-brand-gold font-bold block mb-2">
                  {activeOccasion.tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                  Custom-Cut {activeOccasion.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  {activeOccasion.description}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                  Included in This Fit:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeOccasion.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>Nairobi Atelier Fitting Included</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  href={activeOccasion.href}
                  className="px-6 py-3 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-2 shadow-md"
                >
                  <span>Explore {activeOccasion.name} Styles</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={`/book-appointment?occasion=${activeOccasion.id}`}
                  className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-all border border-white/20 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Book a Private Fitting</span>
                </Link>

                <a
                  href={`https://wa.me/254114122510?text=${encodeURIComponent(
                    `Hello Modern Man Kenya, I would like to customize a Made to Measure fit for: ${activeOccasion.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-lg bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-bold text-xs uppercase tracking-wider text-center transition-all border border-[#25D366]/40 flex items-center justify-center space-x-1.5"
                  title="Inquire directly on WhatsApp"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
