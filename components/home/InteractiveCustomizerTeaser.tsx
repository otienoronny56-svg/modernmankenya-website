'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, ArrowRight, Check, SlidersHorizontal } from 'lucide-react';
import { useBespokeStore } from '@/store/bespokeStore';
import { FABRIC_OPTIONS, LINING_OPTIONS } from '@/data/mockData';
import type { LapelStyle, PocketStyle } from '@/types';

export const InteractiveCustomizerTeaser: React.FC = () => {
  const { config, setFabric, setLapel, setPockets, setLining } = useBespokeStore();

  const lapelOptions: { id: LapelStyle; title: string; desc: string }[] = [
    { id: 'Peak', title: 'Peak Lapel (4.0")', desc: 'Commanding V-taper for formal & double-breasted jackets' },
    { id: 'Notch', title: 'Notch Lapel (3.25")', desc: 'Timeless British single-breasted versatile silhouette' },
    { id: 'Shawl', title: 'Shawl Lapel (2.75")', desc: 'Seamless curved collar for velvet & gala tuxedos' },
  ];

  const pocketOptions: { id: PocketStyle; title: string; desc: string }[] = [
    { id: 'Flap', title: 'Flap Pockets with Ticket', desc: 'Classic British tailoring with slanted ticket pocket' },
    { id: 'Jetted', title: 'Jetted Pockets', desc: 'Minimalist streamlined slit for black tie formal wear' },
    { id: 'Patch', title: 'Patch Pockets', desc: 'Relaxed Neapolitan curve for cashmere blazers' },
  ];

  return (
    <section className="py-12 sm:py-24 bg-brand-navy text-white relative overflow-hidden border-y border-brand-gold/30">
      {/* Background Sartorial Accents */}
      <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 space-y-2 sm:space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Interactive Tailor Studio</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Compose Your Bespoke Silhouette
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
            Test our sartorial variables in real time. Choose from world-class European cloths, 
            architectural lapel cuts, and interior silk linings.
          </p>
        </div>

        {/* Customizer Workbench Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          
          {/* Left Controls: Lapels, Pockets, Linings */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 bg-white/5 p-4 sm:p-8 rounded-lg border border-white/10 backdrop-blur-md">
            
            {/* 1. Fabric Swatch Selector */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-gold">
                  1. Sartorial Cloth & Mill
                </span>
                <span className="text-xs text-slate-300 font-mono">{config.fabric.mill}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {FABRIC_OPTIONS.slice(0, 4).map((f) => {
                  const isSelected = config.fabric.id === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => setFabric(f)}
                      className={`p-2.5 rounded text-left transition-all border flex items-center space-x-2.5 ${
                        isSelected
                          ? 'bg-brand-gold/20 border-brand-gold text-white shadow-gold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full flex-shrink-0 border border-white/30"
                        style={{ backgroundColor: f.colorHex }}
                      />
                      <div className="truncate">
                        <p className="text-xs font-semibold truncate">{f.name.split(' ')[0]} {f.name.split(' ')[1]}</p>
                        <p className="text-[10px] text-slate-400 truncate">{f.weight}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Lapel Style Selector */}
            <div>
              <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-gold block mb-3">
                2. Architectural Lapel Cut
              </span>
              <div className="grid grid-cols-3 gap-3">
                {lapelOptions.map((lapel) => {
                  const isSelected = config.lapel === lapel.id;
                  return (
                    <button
                      key={lapel.id}
                      onClick={() => setLapel(lapel.id)}
                      className={`p-3 rounded text-center transition-all border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-brand-gold text-brand-navy font-bold border-brand-gold shadow-md'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-brand-gold/40'
                      }`}
                    >
                      <span className="text-xs tracking-wider uppercase font-bold">{lapel.title.split(' ')[0]}</span>
                      <span className="text-[10px] opacity-80 mt-0.5">{lapel.id === 'Peak' ? 'Commanding' : lapel.id === 'Notch' ? 'Timeless' : 'Gala Shawl'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Pocket Style Selector */}
            <div>
              <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-gold block mb-3">
                3. Pocket Construction
              </span>
              <div className="grid grid-cols-3 gap-3">
                {pocketOptions.map((pocket) => {
                  const isSelected = config.pockets === pocket.id;
                  return (
                    <button
                      key={pocket.id}
                      onClick={() => setPockets(pocket.id)}
                      className={`p-3 rounded text-center transition-all border flex flex-col items-center justify-center ${
                        isSelected
                          ? 'bg-brand-gold text-brand-navy font-bold border-brand-gold shadow-md'
                          : 'bg-white/5 text-slate-300 border-white/10 hover:border-brand-gold/40'
                      }`}
                    >
                      <span className="text-xs tracking-wider uppercase font-bold">{pocket.title.split(' ')[0]}</span>
                      <span className="text-[10px] opacity-80 mt-0.5">{pocket.id === 'Flap' ? 'British' : pocket.id === 'Jetted' ? 'Minimal' : 'Neapolitan'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Luxury Lining Fabric */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-gold">
                  4. Interior Silk Lining
                </span>
                <span className="text-xs text-slate-300">{config.lining.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {LINING_OPTIONS.map((lining) => {
                  const isSelected = config.lining.id === lining.id;
                  return (
                    <button
                      key={lining.id}
                      onClick={() => setLining(lining)}
                      className={`p-2.5 rounded text-left transition-all border flex items-center space-x-2 ${
                        isSelected
                          ? 'bg-brand-gold/20 border-brand-gold text-white shadow-gold'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: lining.colorHex }}
                      />
                      <span className="text-[11px] truncate font-medium">{lining.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Preview Card: High Impact Visual Representation */}
          <div className="lg:col-span-6 bg-gradient-to-b from-white/10 to-white/5 p-4 sm:p-8 rounded-lg border border-brand-gold/30 shadow-2xl relative">
            <div className="relative h-[280px] sm:h-[380px] w-full rounded overflow-hidden mb-5 sm:mb-6 border border-white/10">
              <Image
                src={config.fabric.image}
                alt={config.fabric.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-transparent to-black/30" />

              {/* Garment Blueprint Tags Overlay */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                <span className="bg-brand-navy/90 text-brand-gold border border-brand-gold/40 text-[10px] uppercase font-bold tracking-luxury px-3 py-1 rounded backdrop-blur-md">
                  {config.lapel} Lapel
                </span>
                <span className="bg-brand-navy/90 text-white border border-white/20 text-[10px] uppercase font-bold tracking-luxury px-3 py-1 rounded backdrop-blur-md">
                  {config.pockets} Pockets
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div>
                  <p className="text-[11px] text-brand-gold font-mono uppercase tracking-widest">
                    Selected Cloth
                  </p>
                  <p className="font-serif text-lg font-bold text-white leading-tight">
                    {config.fabric.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase">Estimated Commission</p>
                  <p className="font-serif text-xl font-bold text-brand-gold">
                    {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(config.estimatedPriceKes)}
                  </p>
                </div>
              </div>
            </div>

            {/* Spec Summary */}
            <div className="space-y-2 text-xs text-slate-300 pb-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Full floating canvas tailored to 35 anatomical measurements</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Interior Silk Lining: <strong className="text-white">{config.lining.name}</strong></span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Includes 3 private basting & finishing fittings in Nairobi</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-appointment"
                className="flex-1 py-3.5 px-6 rounded-sm bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs text-center transition-all shadow-gold flex items-center justify-center space-x-2"
              >
                <span>Commission This Bespoke Suit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/bespoke/bespoke-suits"
                className="py-3.5 px-6 rounded-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold uppercase tracking-luxury text-xs text-center transition-all"
              >
                Atelier Gallery
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
