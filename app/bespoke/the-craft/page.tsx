'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Calendar, Check, Scissors, Ruler, Shield } from 'lucide-react';

export default function TheCraftPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-brand-navy py-20 text-white overflow-hidden border-b-2 border-brand-gold/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Man Master Tailoring</span>
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight mb-4">
            The Anatomy of a Bespoke Suit
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Why true bespoke cannot be replicated by factory machines. The art of horsehair canvas, 
            hand-drawn cardboard patterns, and three fitting sessions in Nairobi.
          </p>
        </div>
      </section>

      {/* Anatomy Content */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Detail 1: Floating Canvas vs Fused */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-luxury border border-slate-200">
            <Image
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=85"
              alt="Floating Canvas Construction"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">Standard 01</span>
            <h2 className="font-serif text-3xl font-bold text-brand-navy">
              Full Floating Horsehair Canvas
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              Standard commercial suits glue fusible synthetic interlinings to the outer fabric, creating a stiff, 
              sweaty garment that bubbles after dry cleaning. Modern Man Kenya suspends a pure horsehair and wool 
              canvas inside the chest piece using thousands of tiny hand stitches. Over time, your body heat molds 
              the floating canvas precisely to your chest contours.
            </p>
            <ul className="space-y-2 text-xs text-brand-slate font-medium pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold" />
                <span>Natural thermodynamic breathability in tropical and temperate climates</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold" />
                <span>Permanent, soft roll to the lapel that never goes flat</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Detail 2: 35 Measures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">Standard 02</span>
            <h2 className="font-serif text-3xl font-bold text-brand-navy">
              Drafting the Cardboard Pattern
            </h2>
            <p className="text-sm text-slate-600 font-light leading-relaxed">
              &quot;Made to Measure&quot; merely alters existing factory block sizes. True Bespoke begins with a blank sheet 
              of brown paper. Our cutter translates your 35 anatomical measurements, asymmetrical shoulder slope, 
              and neck stance into an individual pattern that belongs only to you and is cataloged indefinitely in our Nairobi archives.
            </p>
            <ul className="space-y-2 text-xs text-brand-slate font-medium pt-2">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold" />
                <span>Preserved paper pattern for seamless re-orders</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold" />
                <span>Corrects posture, arm pitch, and drop without bunching</span>
              </li>
            </ul>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-luxury border border-slate-200 order-1 md:order-2">
            <Image
              src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1000&q=85"
              alt="Cardboard Pattern Drafting"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-navy text-white p-12 rounded-lg text-center space-y-4 border border-brand-gold/30">
          <h3 className="font-serif text-3xl font-bold">Experience the Modern Man Fitting</h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto font-light">
            Book an initial consultation at our Nairobi Atelier. Feel the weight of pure Dormeuil 
            and Scabal cloths and have your anatomical measurements taken.
          </p>
          <div className="pt-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-brand-gold text-brand-navy font-bold uppercase tracking-luxury text-xs rounded hover:bg-brand-gold-light transition-colors shadow-gold"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Consultation in Nairobi</span>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}
