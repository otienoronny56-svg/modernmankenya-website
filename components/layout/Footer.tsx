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
            {/* Minimalist Brand Full Logo */}
            <Link
              href="/"
              className="inline-block group focus:outline-hidden"
              aria-label="Modern Man Kenya Home"
            >
              <div className="relative w-36 h-28 sm:w-44 sm:h-32 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/logo-full.png"
                  alt="Modern Man Kenya - Opulence • Simplicity • Class"
                  fill
                  sizes="(max-width: 640px) 144px, 176px"
                  className="object-contain"
                />
              </div>
            </Link>

            <div className="space-y-2 text-xs text-stone-600 pt-1">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/FV4B4XcDXLx5DWGj8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-gold transition-colors inline-flex items-center space-x-1"
                >
                  <span>Trust Mansion, 1st Floor, opposite City Market, Tubman Road, Nairobi</span>
                  <ExternalLink className="w-3 h-3 text-brand-gold opacity-80 flex-shrink-0" />
                </a>
              </div>

              {/* Phone and WhatsApp Icons & Links Above Email */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="tel:+254718923082"
                  className="inline-flex items-center space-x-1.5 text-stone-700 hover:text-brand-gold transition-colors font-medium group"
                  title="Call Modern Man Kenya at +254 718 923 082"
                >
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+254 718 923 082</span>
                </a>

                <span className="text-stone-300">•</span>

                <a
                  href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20inquire%20about%20your%20suits%20and%20tailoring."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-emerald-700 hover:text-emerald-800 transition-colors font-medium group"
                  title="Chat with Modern Man Kenya on WhatsApp (0114 122 510)"
                >
                  <svg
                    className="w-4 h-4 fill-[#25D366] flex-shrink-0 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </a>
              </div>

              {/* Email Address */}
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="mailto:info@modernmanke.com" className="hover:text-stone-900 transition-colors">
                  info@modernmanke.com
                </a>
              </div>

              {/* Official Social Media Channels */}
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-2">
                  Follow Modern Man Kenya
                </p>
                <div className="flex items-center space-x-2.5">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/modernmanke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50/50 flex items-center justify-center transition-all shadow-xs group"
                    title="Follow Modern Man on Instagram (@modernmanke)"
                    aria-label="Modern Man Instagram Profile"
                  >
                    <svg className="w-4 h-4 fill-currentColor transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@modernmanke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-black hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center transition-all shadow-xs group"
                    title="Follow Modern Man on TikTok (@modernmanke)"
                    aria-label="Modern Man TikTok Profile"
                  >
                    <svg className="w-4 h-4 fill-currentColor transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.33a6.33 6.33 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.28 8.28 0 0 0 4.84 1.55V6.85a4.85 4.85 0 0 1-1.07-.16z"/>
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/modernmanke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 flex items-center justify-center transition-all shadow-xs group"
                    title="Connect with Modern Man Kenya on Facebook"
                    aria-label="Modern Man Facebook Page"
                  >
                    <svg className="w-4 h-4 fill-currentColor transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* X (formerly Twitter) */}
                  <a
                    href="https://x.com/modernmanke"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white border border-stone-200 text-stone-700 hover:text-black hover:border-stone-400 hover:bg-stone-50 flex items-center justify-center transition-all shadow-xs group"
                    title="Follow Modern Man Kenya on X (@modernmanke)"
                    aria-label="Modern Man X Profile"
                  >
                    <svg className="w-3.5 h-3.5 fill-currentColor transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
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
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors font-medium">
                  About Modern Man
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-brand-gold transition-colors font-medium">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-brand-gold transition-colors font-medium">
                  Sartorial Journal
                </Link>
              </li>
              <li>
                <Link href="/book-appointment" className="text-brand-gold font-semibold hover:underline flex items-center space-x-1">
                  <span>Book a Fitting</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-gold transition-colors">
                  Contact & Concierge
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
                <Link href="/returns" className="hover:text-brand-gold transition-colors">
                  Fitting & Returns Policy
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
            <Link href="/returns" className="hover:text-stone-900 transition-colors">
              Returns & Fitting
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
