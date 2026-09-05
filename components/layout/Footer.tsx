'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock, ArrowRight, Check, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-brand-navy text-slate-300 pt-10 sm:pt-16 pb-8 sm:pb-12 border-t-2 border-brand-gold/40 relative overflow-hidden">
      {/* Subtle Background Pinstripe */}
      <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Heritage Story & Newsletter Strip */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-14 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="relative w-12 sm:w-14 h-12 sm:h-14 bg-white/10 p-1.5 rounded-full border border-brand-gold/30 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Modern Man Kenya"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl tracking-wider text-white font-bold uppercase group-hover:text-brand-gold transition-colors">
                  Modern Man Kenya
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] text-brand-gold uppercase font-semibold">
                  opulence • simplicity • class
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed font-light max-w-md">
              Established in Nairobi with an unyielding commitment to supreme bespoke tailoring artistry. 
              We engineer bespoke two-piece and three-piece suits, velvet dinner jackets, and luxury garments 
              with full floating canvas construction, individual hand-drafted patterns, and millimetric anatomical precision.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
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
                <a href="tel:+254718923082" className="hover:text-white transition-colors">
                  Private Concierge: +254 718 923082
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <a href="mailto:modernmanke254@gmail.com" className="hover:text-white transition-colors">
                  modernmanke254@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Tue – Sat: 09:30 – 18:30 (Private Appointments Only)</span>
              </div>
            </div>
          </div>

          {/* Newsletter / Sartorial Journal */}
          <div className="lg:col-span-7 flex flex-col justify-center bg-white/5 p-5 sm:p-8 rounded-lg border border-brand-gold/20">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold mb-1">
              Private Sartorial Gazette
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-white font-bold mb-2">
              The Sartorial Journal
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-5 sm:mb-6 font-light max-w-lg">
              Receive private invitations to seasonal trunk shows in Nairobi, rare British cloth arrivals from Scabal & Dormeuil, and sartorial style essays.
            </p>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-brand-gold text-xs sm:text-sm bg-brand-gold/10 p-4 rounded border border-brand-gold/30">
                <Check className="w-5 h-5 flex-shrink-0" />
                <span>You have been inducted into the Modern Man Private Gazette.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <div className="relative flex-grow">
                  <Mail className="w-4 h-4 text-brand-gold absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your confidential email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-brand-gold/30 rounded px-4 py-3 pl-10 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all flex items-center justify-center space-x-2 shadow-gold"
                >
                  <span>Request Membership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-12 text-xs border-b border-white/10">
          
          {/* Bespoke Links */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-luxury text-brand-gold font-bold">
              Bespoke House
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/bespoke/bespoke-tailoring" className="hover:text-white transition-colors">Bespoke Tailoring</Link></li>
              <li><Link href="/bespoke/bespoke-suits" className="hover:text-white transition-colors">Bespoke Suits</Link></li>
              <li><Link href="/bespoke/bespoke-casual-wear" className="hover:text-white transition-colors">Bespoke Casual Wear</Link></li>
              <li><Link href="/bespoke/bespoke-evening-wear" className="hover:text-white transition-colors">Bespoke Evening Wear</Link></li>
              <li><Link href="/bespoke/bespoke-shirts" className="hover:text-white transition-colors">Bespoke Shirts</Link></li>
              <li><Link href="/bespoke/bespoke-waistcoats" className="hover:text-white transition-colors">Bespoke Waistcoats</Link></li>
              <li><Link href="/bespoke/bespoke-womenswear" className="hover:text-white transition-colors">Bespoke Womenswear</Link></li>
              <li><Link href="/bespoke/bespoke-for-children" className="hover:text-white transition-colors">Bespoke for Children</Link></li>
            </ul>
          </div>

          {/* Ready to Wear */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-luxury text-brand-gold font-bold">
              Ready to Wear
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/ready-to-wear?category=suits" className="hover:text-white transition-colors">Suits</Link></li>
              <li><Link href="/ready-to-wear?category=jackets" className="hover:text-white transition-colors">Tailored Blazers</Link></li>
              <li><Link href="/ready-to-wear?category=velvets" className="hover:text-white transition-colors">Velvet Smoking Jackets</Link></li>
              <li><Link href="/ready-to-wear?category=evening-dinner" className="hover:text-white transition-colors">Black Tie & Dinner Wear</Link></li>
              <li><Link href="/ready-to-wear?category=fragrances" className="hover:text-white transition-colors">Extrait de Parfum</Link></li>
              <li><Link href="/ready-to-wear?category=accessories" className="hover:text-white transition-colors">Grenadine Ties & Accessories</Link></li>
            </ul>
          </div>

          {/* Services & Concierge */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-luxury text-brand-gold font-bold">
              Concierge & Atelier
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors text-brand-gold font-medium">About Us & Artisans</Link></li>
              <li><Link href="/book-appointment" className="hover:text-white transition-colors">Book Private Fitting</Link></li>
              <li><Link href="/bespoke/weddings" className="hover:text-white transition-colors">Wedding Commissions</Link></li>
              <li><Link href="/services/alterations" className="hover:text-white transition-colors">Bespoke Alterations</Link></li>
              <li><Link href="/services/gift-vouchers" className="hover:text-white transition-colors">Gift Vouchers</Link></li>
              <li><Link href="/bespoke/the-craft" className="hover:text-white transition-colors">The Bespoke Master Method</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Atelier Visit & Contact</Link></li>
            </ul>
          </div>

          {/* Heritage & Standards */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="font-serif text-xs sm:text-sm uppercase tracking-luxury text-brand-gold font-bold">
              The Standard
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/about#the-team" className="hover:text-brand-gold transition-colors text-brand-gold/90 font-semibold">Meet The Tailors &rarr;</Link></li>
              <li><span className="text-brand-gold font-semibold">Floating Canvas</span></li>
              <li><span>Millimetric Cut</span></li>
              <li><span>Dormeuil & Scabal</span></li>
              <li><span>Lifetime Alteration</span></li>
              <li><span>Nairobi Courier</span></li>
              <li><span>Worldwide DHL</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-3 sm:gap-4 text-center md:text-left">
          <p>© {new Date().getFullYear()} Modern Man Kenya 254. All rights reserved. &quot;opulence • simplicity • class&quot;</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms of Commission</Link>
            <Link href="/admin" className="text-slate-400 hover:text-brand-gold transition-colors">Staff Portal</Link>
            <Link href="/book-appointment" className="text-brand-gold hover:underline font-semibold">Book an Appointment &rarr;</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
