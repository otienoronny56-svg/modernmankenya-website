import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Ruler, Sparkles, Download, Calendar, MessageSquare, ExternalLink, Scissors, CheckCircle2 } from 'lucide-react';
import { ModernManMeasurementChart } from '@/components/measurements/ModernManMeasurementChart';

export const metadata: Metadata = {
  title: "Men's Tailoring Measurement Guide & Sizing Chart | Modern Man Kenya",
  description:
    "Master tailoring 17-point anatomical measurement chart, standard S-3XL sizing matrix, and step-by-step guidance for bespoke suits, tuxedos, and contemporary African wear in Nairobi.",
  openGraph: {
    title: "Men's Measurement Chart & Tailoring Guide | Modern Man Kenya",
    description:
      'Master tailoring 17-point anatomical measurement chart and standard S-3XL sizing matrix with live Inches and CM conversion.',
    images: ['/images/measurement-guide-poster.jpg'],
  },
};

export default function MeasurementGuidePage() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#0E0F15] text-stone-900 dark:text-slate-100 pb-20">
      
      {/* 1. Hero Header */}
      <section className="relative bg-[#0A1128] text-white py-14 sm:py-20 border-b-2 border-brand-gold overflow-hidden">
        <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <Link href="/bespoke/the-craft" className="hover:underline">The Craft</Link>
              <span>/</span>
              <span className="text-white">Measurement Guide</span>
            </nav>

            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-brand-gold text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Modern Man Kenya Sartorial Precision Standard</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Men&apos;s Measurement Chart &amp; Tailoring Guide
            </h1>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl">
              An authoritative 17-point anatomical blueprint for gentlemen commissioning Made-to-Measure suiting, tuxedo black-tie ensembles, crisp dress shirts, and signature African Senator tunics.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 text-xs">
              <a
                href="/images/measurement-guide-poster.jpg"
                download="Modern_Man_Kenya_Measurement_Chart.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold flex items-center space-x-2 transition-all shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Download Printable Poster (HD)</span>
              </a>
              <Link
                href="/book-appointment"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 flex items-center space-x-2 transition-all"
              >
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>Book In-Person Atelier Fitting</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Main Interactive Chart Component */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <ModernManMeasurementChart />
      </section>

      {/* 3. Three Sartorial Truths (Atelier Advisory) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
        <div className="bg-white dark:bg-[#1A1C27] rounded-3xl border border-stone-200/90 dark:border-slate-800 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold block mb-1">
              Atelier Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy dark:text-slate-100">
              Rules of Master Made-to-Measure Fitting
            </h2>
            <p className="text-xs text-stone-600 dark:text-slate-400 mt-2">
              Taking measurements accurately ensures your suit drapes flawlessly without pulling, tension lines, or collar roll.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#151722] border border-stone-200 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-slate-100">
                Wear Well-Fitted Dress Trousers &amp; Shirt
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
                Never measure over thick denim, hoodies, or bulky outerwear. Stand naturally in comfortable socks and standard dress shoes to gauge exact trouser hem breaks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#151722] border border-stone-200 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-slate-100">
                Keep the Tape Snug, Never Stretched
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
                The tape measure should lie flat against your body. Maintain one index finger between your body and the tape at the collar and waist to guarantee ease of breathing and movement.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-[#151722] border border-stone-200 dark:border-slate-800 space-y-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-brand-navy dark:text-slate-100">
                Calibrated by Modern Man Cutters
              </h3>
              <p className="text-xs text-stone-600 dark:text-slate-400 leading-relaxed">
                Your submitted numbers serve as a base draft. Modern Man Kenya master tailors adjust for natural shoulder slope, lordosis/kyphosis posture, and movement tolerance before cutting cloth.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
