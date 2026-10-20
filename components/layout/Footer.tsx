'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FAF8F5] text-stone-700 pt-12 sm:pt-16 pb-10 border-t border-brand-gold/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-stone-200/80">
          
          {/* 1. Brand & Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative w-11 h-11 bg-white p-1 rounded-full border border-brand-gold/40 shadow-xs flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Modern Man Kenya"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider text-stone-900 font-bold uppercase group-hover:text-brand-gold transition-colors">
                  Modern Man Kenya
                </span>
                <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-semibold">
                  opulence • simplicity • class
                </span>
              </div>
            </Link>

            <div className="space-y-2 text-xs text-stone-600 pt-1">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/FV4B4XcDXLx5DWGj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors inline-flex items-center space-x-1"
                >
                  <span>The Flagship Atelier, Nairobi, Kenya</span>
                  <ExternalLink className="w-3 h-3 text-brand-gold opacity-80" />
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="tel:+254718923082" className="hover:text-stone-900 transition-colors">
                  +254 718 923082
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                  <a href="mailto:modernmankenya254@gmail.com" className="hover:text-stone-900 transition-colors">
                    modernmankenya254@gmail.com
                  </a>
                  <span className="hidden sm:inline text-stone-300">•</span>
                  <a href="mailto:info@modernmankenya.com" className="hover:text-stone-900 transition-colors">
                    info@modernmankenya.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. What We Create (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-wider text-stone-900 font-bold">
              What We Create
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/bespoke/bespoke-suits" className="hover:text-brand-gold transition-colors">
                  2 & 3-Piece Suits
                </Link>
              </li>
              <li>
                <Link href="/bespoke/bespoke-evening-wear" className="hover:text-brand-gold transition-colors">
                  Tuxedos & Eveningwear
                </Link>
              </li>
              <li>
                <Link href="/bespoke/kaunda-suits" className="hover:text-brand-gold transition-colors">
                  Kaunda Suits (Senator Suits)
                </Link>
              </li>
              <li>
                <Link href="/bespoke/weddings" className="hover:text-brand-gold transition-colors">
                  Weddings & Groom Ensembles
                </Link>
              </li>
              <li>
                <Link href="/bespoke/bespoke-shirts" className="hover:text-brand-gold transition-colors">
                  Custom Shirts & Separates
                </Link>
              </li>
              <li>
                <Link href="/bespoke/corporate-wardrobes" className="hover:text-brand-gold transition-colors">
                  Corporate & Executive
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Occasions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-wider text-stone-900 font-bold">
              <Link href="/occasions" className="hover:text-brand-gold transition-colors">
                Occasions
              </Link>
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/occasions" className="hover:text-brand-gold transition-colors text-brand-gold font-medium">
                  All Occasions
                </Link>
              </li>
              <li>
                <Link href="/occasions/executive-wear" className="hover:text-brand-gold transition-colors">
                  Executive Wear
                </Link>
              </li>
              <li>
                <Link href="/occasions/black-tie-wedding" className="hover:text-brand-gold transition-colors">
                  Black Tie & Wedding
                </Link>
              </li>
              <li>
                <Link href="/occasions/african-wear" className="hover:text-brand-gold transition-colors">
                  African Wear
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Client Services & Legal (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif text-xs uppercase tracking-wider text-stone-900 font-bold">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/book-appointment" className="text-brand-gold font-semibold hover:underline flex items-center space-x-1">
                  <span>Book a Fitting</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-brand-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-brand-gold transition-colors">
                  Terms of Commission
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Modern Man Kenya. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link href="/privacy" className="hover:text-stone-900 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-stone-300">•</span>
            <Link href="/terms" className="hover:text-stone-900 transition-colors">
              Terms of Commission
            </Link>
            <span className="text-stone-300">•</span>
            <Link href="/admin" className="hover:text-brand-gold transition-colors">
              Staff
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
