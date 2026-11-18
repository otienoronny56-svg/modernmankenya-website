'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Tag, 
  ArrowRight, 
  Check, 
  Copy, 
  X, 
  Clock, 
  Calendar 
} from 'lucide-react';

export const BlackNovemberBanner: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [dismissed, setDismissed] = useState(true); // Default true until mounted to avoid hydration flash
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    try {
      const isDismissed = sessionStorage.getItem('mmk_black_nov_banner_dismissed');
      if (!isDismissed) {
        setDismissed(false);
      }
    } catch {
      setDismissed(false);
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('BLACKNOV20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem('mmk_black_nov_banner_dismissed', 'true');
    } catch {
      // Ignore sessionStorage errors
    }
  };

  if (dismissed) {
    return (
      <aside aria-label="Black November Promotion Offer">
        {/* Minimized subtle sticky trigger if user wants to reclaim the offer */}
        <div className="fixed bottom-4 left-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => {
              setDismissed(false);
              try {
                sessionStorage.removeItem('mmk_black_nov_banner_dismissed');
              } catch {}
            }}
            className="flex items-center space-x-2 bg-stone-950/95 hover:bg-stone-900 text-brand-gold border border-brand-gold/40 shadow-xl px-3.5 py-2 rounded-full text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            title="View Black November 20% Off Offer"
          >
            <Tag className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
            <span className="text-white font-medium">Black November & Friday:</span>
            <span className="font-bold text-amber-300">20% Off</span>
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside 
      aria-label="Black November & Black Friday 20% Off Promotion"
      className="relative z-30 bg-gradient-to-r from-[#0a0c14] via-[#101424] to-[#0a0c14] text-white border-b border-brand-gold/40 shadow-md transition-all duration-300"
    >
      {/* Decorative Gold Shimmer Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 lg:gap-6">
          
          {/* Left: Tag + Headline + Copy */}
          <div className="flex items-center space-x-3 text-center lg:text-left">
            <div className="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full bg-brand-gold/15 border border-brand-gold/30 items-center justify-center text-brand-gold">
              <Tag className="w-5 h-5 text-amber-300" />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-1">
                <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping inline-block" />
                  <span>Black November & Black Friday Special</span>
                </span>
                <span className="hidden sm:inline-flex items-center text-slate-300 text-xs font-medium space-x-1">
                  <Clock className="w-3 h-3 text-brand-gold" />
                  <span>Valid through November 30th</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-200 font-sans">
                <strong className="text-white font-bold sm:text-base font-serif tracking-wide text-brand-gold">
                  20% OFF
                </strong>{' '}
                all Suits, Made-to-Measure Tuxedos, Kaunda Suits & Fine Tailoring.
              </p>
            </div>
          </div>

          {/* Right: Code Pill + CTA Buttons + Close */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Promo Code Box */}
            <div className="flex items-center bg-black/60 border border-brand-gold/40 rounded-lg px-2.5 py-1.5 shadow-inner">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mr-2 hidden xs:inline">
                Code:
              </span>
              <code className="text-xs sm:text-sm font-mono font-bold text-amber-300 tracking-wider">
                BLACKNOV20
              </code>
              <button
                onClick={handleCopyCode}
                className="ml-2 p-1 rounded hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Copy promo code"
                aria-label="Copy promo code"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-300" />
                )}
              </button>
            </div>

            {/* Book Fitting CTA */}
            <Link
              href="/book-appointment?promo=BLACKNOV20"
              className="inline-flex items-center space-x-1.5 px-3.5 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold text-stone-950 text-xs sm:text-sm font-bold shadow-md hover:brightness-110 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-stone-950" />
              <span>Book with 20% Off</span>
              <ArrowRight className="w-3.5 h-3.5 text-stone-950 ml-0.5" />
            </Link>

            {/* Explore Gallery CTA */}
            <Link
              href="/gallery"
              className="hidden md:inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
            >
              <span>Explore Gallery</span>
            </Link>

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Dismiss Black November Banner"
              title="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </aside>
  );
};
