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
    src: '/images/LKM_1607.jpg',
    alt: 'Handcrafted Sartorial Detail Modern Man Kenya',
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
    <section className="relative min-h-[88vh] sm:min-h-[92vh] bg-stone-900 flex items-center justify-center overflow-hidden">
      {/* Background Slideshow - High-Fashion Bright Editorial Display */}
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
                className="object-cover object-top sm:object-[center_15%]"
              />
            </div>
          );
        })}
      </div>

      {/* Hero Content - Positioned to the Right to showcase suit photography on the left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center lg:items-end">
        <div className="max-w-xl text-center lg:text-right flex flex-col items-center lg:items-end">
          
          {/* Primary Headline - Aligned Right */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
            Where Fit Meets Character.
          </h1>

          {/* Action Buttons: Book & Explore */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-4 w-full sm:w-auto">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto px-7 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs rounded transition-all duration-200 flex items-center justify-center space-x-2 shadow-xl hover:shadow-gold"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>

            <a
              href="#creations"
              className="w-full sm:w-auto px-7 py-3.5 bg-black/30 hover:bg-black/50 text-white border border-white/40 hover:border-brand-gold text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg group"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-4 h-4 text-brand-gold group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center lg:justify-end space-x-2.5 mt-8">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'w-8 bg-brand-gold shadow' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

