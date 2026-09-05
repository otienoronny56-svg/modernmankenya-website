'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Check, 
  Calendar, 
  Ruler, 
  Scissors, 
  ArrowRight,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { BESPOKE_CATEGORIES, FABRIC_OPTIONS, LINING_OPTIONS } from '@/data/mockData';
import { useBespokeStore } from '@/store/bespokeStore';
import type { LapelStyle, PocketStyle, ButtonConfiguration } from '@/types';

export default function BespokeCategoryPage() {
  const params = useParams();
  const rawCategory = params?.category as string;
  
  const categoryData = BESPOKE_CATEGORIES.find((c) => c.slug === rawCategory) || {
    slug: rawCategory || 'bespoke-tailoring',
    title: rawCategory ? rawCategory.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Bespoke Tailoring',
    subtitle: 'Master Bespoke Discipline',
    description: 'An individual cardboard pattern drafted from scratch exclusively for your anatomy. Sculpted with full floating canvas and hand-padded lapels.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
    startingPriceKes: 145000,
    leadTime: '4 - 5 Weeks',
  };

  const { config, setFabric, setLapel, setPockets, setButtons, setLining } = useBespokeStore();
  const [activeTab, setActiveTab] = useState<'fabrics' | 'structure' | 'linings'>('fabrics');

  return (
    <div className="min-h-screen bg-white">
      {/* Category Hero Banner */}
      <section className="relative bg-brand-navy py-12 sm:py-20 text-white overflow-hidden border-b-2 border-brand-gold/30">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src={categoryData.image}
            alt={categoryData.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark via-brand-navy/90 to-brand-navy-dark/95" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex-wrap">
              <Link href="/" className="hover:underline">Home</Link>
              <span>/</span>
              <span>Bespoke House</span>
              <span>/</span>
              <span className="text-white">{categoryData.title}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {categoryData.title}
            </h1>
            <p className="text-base sm:text-lg text-brand-gold font-serif italic">
              {categoryData.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-2xl">
              {categoryData.description}
            </p>

            <div className="pt-3 sm:pt-4 flex flex-wrap gap-3 sm:gap-4 text-xs">
              <div className="bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded border border-white/15 backdrop-blur-sm">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase">Starting Investment</span>
                <span className="font-bold text-brand-gold text-xs sm:text-sm">
                  KES {categoryData.startingPriceKes.toLocaleString()}
                </span>
              </div>
              <div className="bg-white/10 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded border border-white/15 backdrop-blur-sm">
                <span className="text-slate-400 block text-[9px] sm:text-[10px] uppercase">Atelier Lead Time</span>
                <span className="font-bold text-white text-xs sm:text-sm">{categoryData.leadTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Customization Workbench */}
      <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Customization Options & Controls */}
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            
            {/* Customization Tabs (Smooth horizontal scrolling on phone) */}
            <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 whitespace-nowrap gap-1">
              <button
                onClick={() => setActiveTab('fabrics')}
                className={`flex-shrink-0 pb-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-luxury border-b-2 transition-all ${
                  activeTab === 'fabrics'
                    ? 'border-brand-gold text-brand-navy'
                    : 'border-transparent text-slate-400 hover:text-brand-navy'
                }`}
              >
                1. Cloth & Mill Swatches
              </button>
              <button
                onClick={() => setActiveTab('structure')}
                className={`flex-shrink-0 pb-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-luxury border-b-2 transition-all ${
                  activeTab === 'structure'
                    ? 'border-brand-gold text-brand-navy'
                    : 'border-transparent text-slate-400 hover:text-brand-navy'
                }`}
              >
                2. Cut & Silhouette
              </button>
              <button
                onClick={() => setActiveTab('linings')}
                className={`flex-shrink-0 pb-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold uppercase tracking-luxury border-b-2 transition-all ${
                  activeTab === 'linings'
                    ? 'border-brand-gold text-brand-navy'
                    : 'border-transparent text-slate-400 hover:text-brand-navy'
                }`}
              >
                3. Interior Silk Linings
              </button>
            </div>

            {/* Tab 1: Cloth Swatches */}
            {activeTab === 'fabrics' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-navy mb-1">
                    Select English or Italian Mill Cloth
                  </h3>
                  <p className="text-xs text-brand-slate-muted">
                    Over 4,000 cloths available at the Nairobi Atelier. Here are our five signature house cloths.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FABRIC_OPTIONS.map((fabric) => {
                    const isSelected = config.fabric.id === fabric.id;
                    return (
                      <div
                        key={fabric.id}
                        onClick={() => setFabric(fabric)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/5 shadow-md'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <span
                            className="w-8 h-8 rounded-full border border-slate-300 shadow-inner flex-shrink-0"
                            style={{ backgroundColor: fabric.colorHex }}
                          />
                          <div className="truncate">
                            <h4 className="font-serif text-sm font-bold text-brand-navy truncate">
                              {fabric.name}
                            </h4>
                            <span className="text-[11px] text-brand-gold-dark font-medium block">
                              {fabric.mill}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 font-light mb-2">{fabric.composition}</p>
                        <div className="flex justify-between items-center text-xs font-bold pt-2 border-t border-slate-100">
                          <span className="text-slate-400 text-[10px]">{fabric.weight}</span>
                          <span className="text-brand-navy font-serif">
                            KES {fabric.priceKes.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Cut & Silhouette */}
            {activeTab === 'structure' && (
              <div className="space-y-8">
                {/* Lapel Style */}
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-luxury text-brand-gold font-bold mb-3">
                    Lapel Cut
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Peak', 'Notch', 'Shawl'] as LapelStyle[]).map((lapel) => (
                      <button
                        key={lapel}
                        onClick={() => setLapel(lapel)}
                        className={`p-4 rounded border text-center transition-all ${
                          config.lapel === lapel
                            ? 'bg-brand-navy text-white border-brand-navy font-bold'
                            : 'bg-slate-50 text-brand-slate border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="font-serif text-sm block">{lapel} Lapel</span>
                        <span className="text-[10px] opacity-75 mt-1 block">
                          {lapel === 'Peak' ? '4.0" Broad Cut' : lapel === 'Notch' ? '3.25" Balanced' : '2.75" Curved'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pocket Style */}
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-luxury text-brand-gold font-bold mb-3">
                    Pocket Construction
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['Flap', 'Jetted', 'Patch'] as PocketStyle[]).map((pocket) => (
                      <button
                        key={pocket}
                        onClick={() => setPockets(pocket)}
                        className={`p-4 rounded border text-center transition-all ${
                          config.pockets === pocket
                            ? 'bg-brand-navy text-white border-brand-navy font-bold'
                            : 'bg-slate-50 text-brand-slate border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="font-serif text-sm block">{pocket}</span>
                        <span className="text-[10px] opacity-75 mt-1 block">
                          {pocket === 'Flap' ? 'British Heritage' : pocket === 'Jetted' ? 'Formal Slit' : 'Neapolitan Patch'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Button Configuration */}
                <div>
                  <h4 className="font-serif text-sm uppercase tracking-luxury text-brand-gold font-bold mb-3">
                    Button Stance
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {(['1-Button', '2-Button', 'Double-Breasted (6x2)'] as ButtonConfiguration[]).map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setButtons(btn)}
                        className={`p-4 rounded border text-center transition-all ${
                          config.buttons === btn
                            ? 'bg-brand-navy text-white border-brand-navy font-bold'
                            : 'bg-slate-50 text-brand-slate border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span className="font-serif text-xs block font-bold">{btn}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Linings */}
            {activeTab === 'linings' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-navy mb-1">
                    Bespoke Silk Cupro Linings
                  </h3>
                  <p className="text-xs text-brand-slate-muted">
                    Bemberg cupro silk linings that breathe naturally and impart private luxury.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {LINING_OPTIONS.map((lining) => {
                    const isSelected = config.lining.id === lining.id;
                    return (
                      <div
                        key={lining.id}
                        onClick={() => setLining(lining)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all flex items-center space-x-4 ${
                          isSelected
                            ? 'border-brand-gold bg-brand-gold/5 shadow-md'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <span
                          className="w-8 h-8 rounded-full border border-slate-300 shadow-inner flex-shrink-0"
                          style={{ backgroundColor: lining.colorHex }}
                        />
                        <div>
                          <h4 className="font-serif text-sm font-bold text-brand-navy">
                            {lining.name}
                          </h4>
                          <p className="text-xs text-brand-slate-muted">{lining.type}</p>
                          <span className="text-[10px] text-brand-gold font-semibold uppercase tracking-wider">
                            {lining.pattern}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Craftsmanship Standards Callouts */}
            <div className="p-6 bg-brand-canvas-alt rounded-lg border border-slate-200 space-y-3">
              <h4 className="font-serif text-sm font-bold text-brand-navy uppercase tracking-wider">
                Master Bespoke Craftsmanship Guaranteed
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Full floating horsehair canvas chest piece</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Individual cardboard pattern drafted from scratch</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Hand-sewn milanese buttonholes in silk gimp</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>3 private fitting stages at our Nairobi Atelier</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Commission Summary & Appointment Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-brand-navy text-white p-8 rounded-lg shadow-2xl border border-brand-gold/30 space-y-6">
              
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold">
                  Bespoke Commission Summary
                </span>
                <h3 className="font-serif text-2xl font-bold mt-1">
                  {categoryData.title}
                </h3>
              </div>

              {/* Garment Summary Details */}
              <div className="space-y-3 text-xs border-y border-white/10 py-4 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Selected Cloth:</span>
                  <span className="font-semibold text-white">{config.fabric.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Mill:</span>
                  <span className="text-brand-gold">{config.fabric.mill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lapel Cut:</span>
                  <span className="font-semibold text-white">{config.lapel} Lapel</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pocket Style:</span>
                  <span className="font-semibold text-white">{config.pockets} Pockets</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Interior Lining:</span>
                  <span className="font-semibold text-white">{config.lining.name}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-slate-400">Lead Time:</span>
                  <span className="font-semibold text-white">{categoryData.leadTime}</span>
                </div>
              </div>

              {/* Price Estimate */}
              <div className="flex justify-between items-end">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-400">
                    Estimated Atelier Total
                  </span>
                  <p className="font-serif text-3xl font-bold text-brand-gold">
                    {new Intl.NumberFormat('en-KE', {
                      style: 'currency',
                      currency: 'KES',
                      maximumFractionDigits: 0,
                    }).format(config.fabric.priceKes)}
                  </p>
                </div>
              </div>

              {/* Direct Appointment CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href={`/book-appointment?service=${rawCategory}&fabric=${encodeURIComponent(config.fabric.name)}`}
                  className="w-full py-4 px-6 rounded-sm bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs text-center transition-all flex items-center justify-center space-x-2 shadow-gold"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Private Fitting in Nairobi</span>
                </Link>

                <p className="text-[11px] text-center text-slate-400">
                  No payment required today. Your commission details will be reviewed during your initial 60-minute fitting consultation.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
