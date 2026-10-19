'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar } from 'lucide-react';

const HERO_IMAGES = [
  {
    src: '/images/Bespoke Suit.jpg',
    alt: 'Bespoke Suit Craftsmanship Modern Man Kenya',
  },
  {
    src: '/images/DSC04995.jpg',
    alt: 'Precision Tailoring Modern Man Kenya',
  },
  {
    src: '/images/LKM_1607.jpg',
    alt: 'Handcrafted Sartorial Detail Modern Man Kenya',
  },
  {
    src: '/images/MOK_7655.jpg',
    alt: 'Signature Made to Measure Modern Man Kenya',
  },
];

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] bg-stone-900 flex items-center justify-center overflow-hidden">
      {/* Background Slideshow - Full Brightness & Natural Photography */}
      <div className="absolute inset-0 z-0">
        {HERO_IMAGES.map((img, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={img.src}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          );
        })}
      </div>

      {/* Hero Content - Clean, Uncongested & Minimal with Text Shadow for Perfect Legibility */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Subtle House Monogram / Overline */}
        <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-brand-gold font-bold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Opulence • Simplicity • Class
        </p>

        {/* Primary Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
          Where Fit Meets Character.
        </h1>

        {/* Single Concise Sentence */}
        <p className="text-base sm:text-lg md:text-xl text-white font-medium max-w-2xl leading-relaxed mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          Handcrafted made-to-measure tailoring cut to your exact proportions and individual style in Nairobi.
        </p>

        {/* Action Buttons: Book & Explore */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/book-appointment"
            className="w-full sm:w-auto px-7 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs rounded transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-gold"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </Link>

          <a
            href="#creations"
            className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-brand-gold text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center space-x-2 backdrop-blur-sm group"
          >
            <span>Explore Creations</span>
            <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center space-x-2 mt-8">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === currentSlide ? 'w-6 bg-brand-gold' : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

