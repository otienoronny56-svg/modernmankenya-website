'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Ruler, 
  Sparkles, 
  ShieldCheck, 
  Check, 
  HelpCircle, 
  ChevronRight, 
  ArrowRight, 
  Calendar, 
  MessageSquare, 
  Download, 
  Info,
  Layers,
  Scissors
} from 'lucide-react';

interface ModernManMeasurementChartProps {
  onSelectSize?: (size: string) => void;
  onApplyMeasurements?: (data: Record<string, number>) => void;
  showActions?: boolean;
  className?: string;
}

export const ModernManMeasurementChart: React.FC<ModernManMeasurementChartProps> = ({
  onSelectSize,
  onApplyMeasurements,
  showActions = true,
  className = '',
}) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [activePoint, setActivePoint] = useState<number | null>(null);

  // Conversion helper
  const toUnit = (valInches: number | number[] | [number, number]) => {
    if (Array.isArray(valInches)) {
      if (unit === 'inches') return `${valInches[0]}-${valInches[1] ?? valInches[0]}`;
      const cm1 = Math.round(valInches[0] * 2.54);
      const cm2 = Math.round((valInches[1] ?? valInches[0]) * 2.54);
      return `${cm1}-${cm2}`;
    }
    if (unit === 'inches') return `${valInches}`;
    return `${Math.round(valInches * 2.54)}`;
  };

  const measurementSteps = [
    { id: 1, name: 'Neck', instruction: 'Measure around the base of the neck, keeping one finger inside the tape for comfort.', key: 'neckCollar', defaultInches: 16 },
    { id: 2, name: 'Shoulder Width', instruction: 'Measure from one shoulder bone tip across the natural curvature of the back to the other.', key: 'shoulderWidth', defaultInches: 18 },
    { id: 3, name: 'Chest', instruction: 'Measure around the fullest part of the chest, keeping the tape level under the armpits and across the shoulder blades.', key: 'chest', defaultInches: 40 },
    { id: 4, name: 'Waist', instruction: 'Measure around your natural waistline, approximately 2 inches above the navel where your stomach is narrowest.', key: 'waistStomach', defaultInches: 34 },
    { id: 5, name: 'Hips / Seat', instruction: 'Measure around the fullest part of your hips and seat with feet together.', key: 'hipsSeat', defaultInches: 40 },
    { id: 6, name: 'Sleeve Length', instruction: 'Measure from the shoulder bone seam down over the elbow to the wrist bone.', key: 'sleeveLengthLeft', defaultInches: 25.5 },
    { id: 7, name: 'Bicep', instruction: 'Measure around the fullest part of the upper arm with the arm relaxed by your side.', key: 'bicep', defaultInches: 14 },
    { id: 8, name: 'Wrist', instruction: 'Measure around the wrist bone circumference for exact cuff opening precision.', key: 'wrist', defaultInches: 7.5 },
    { id: 9, name: 'Shirt Length', instruction: 'Measure from the base of the back collar seam straight down to your desired shirt hem level.', key: 'shirtLength', defaultInches: 30 },
    { id: 10, name: 'Jacket Length', instruction: 'Measure from the top collar seam down to where the curled thumb knuckle meets the palm.', key: 'jacketLength', defaultInches: 31 },
    { id: 11, name: 'Trouser Waist', instruction: 'Measure horizontally around the exact waist level where you wear your tailored trouser waistband.', key: 'trouserWaist', defaultInches: 34 },
    { id: 12, name: 'Thigh', instruction: 'Measure around the fullest part of the upper thigh, just beneath the crotch.', key: 'thigh', defaultInches: 23 },
    { id: 13, name: 'Knee', instruction: 'Measure circumference around the center of the knee joint.', key: 'knee', defaultInches: 17 },
    { id: 14, name: 'Calf', instruction: 'Measure around the widest point of the lower leg calf muscle.', key: 'calf', defaultInches: 15 },
    { id: 15, name: 'Trouser Length', instruction: 'Measure from the top of the waistband straight down the outseam to the desired heel/shoe break.', key: 'trouserLength', defaultInches: 41 },
    { id: 16, name: 'Inseam', instruction: 'Measure from the lowest point of the crotch seam down the inner leg to the ankle.', key: 'inseam', defaultInches: 32 },
    { id: 17, name: 'Crotch Depth', instruction: 'While seated upright on a flat firm chair, measure vertically from waistband to chair surface.', key: 'crotchRise', defaultInches: 10.5 },
  ];

  // Standard Size Matrix in Inches (converted dynamically to cm when unit === 'cm')
  const standardSizeMatrix = [
    { size: 'S', chestTag: '36-38"', neck: [14, 14.5], shoulder: 17, chest: [36, 38], waist: [30, 32], hips: [36, 38], sleeve: [24, 24.5], shirt: [28, 29], jacket: [29, 30], trouser: 40 },
    { size: 'M', chestTag: '38-40"', neck: [15, 15.5], shoulder: 17.5, chest: [38, 40], waist: [32, 34], hips: [38, 40], sleeve: [24.5, 25], shirt: [29, 30], jacket: [30, 31], trouser: 41 },
    { size: 'L', chestTag: '40-42"', neck: [16, 16.5], shoulder: 18, chest: [40, 42], waist: [34, 36], hips: [40, 42], sleeve: [25, 25.5], shirt: [30, 31], jacket: [31, 32], trouser: 42 },
    { size: 'XL', chestTag: '42-44"', neck: [17, 17.5], shoulder: 18.5, chest: [42, 44], waist: [36, 38], hips: [42, 44], sleeve: [25.5, 26], shirt: [31, 32], jacket: [32, 33], trouser: 43 },
    { size: '2XL', chestTag: '44-46"', neck: [18, 18.5], shoulder: 19, chest: [44, 46], waist: [38, 40], hips: [44, 46], sleeve: [26, 26.5], shirt: [32, 33], jacket: [33, 34], trouser: 44 },
    { size: '3XL', chestTag: '46-48"', neck: [19, 19.5], shoulder: 19.5, chest: [46, 48], waist: [40, 42], hips: [46, 48], sleeve: [26.5, 27], shirt: [33, 34], jacket: [34, 35], trouser: 44.5 },
  ];

  const handleApplyPreset = (sizeItem: typeof standardSizeMatrix[0]) => {
    if (onSelectSize) onSelectSize(sizeItem.size);
    if (onApplyMeasurements) {
      const multiplier = unit === 'cm' ? 2.54 : 1;
      const data: Record<string, number> = {
        chest: (sizeItem.chest[0] + sizeItem.chest[1]) / 2 * multiplier,
        waistStomach: (sizeItem.waist[0] + sizeItem.waist[1]) / 2 * multiplier,
        hipsSeat: (sizeItem.hips[0] + sizeItem.hips[1]) / 2 * multiplier,
        shoulderWidth: sizeItem.shoulder * multiplier,
        jacketLength: (sizeItem.jacket[0] + sizeItem.jacket[1]) / 2 * multiplier,
        trouserWaist: (sizeItem.waist[0] + sizeItem.waist[1]) / 2 * multiplier,
        trouserLength: sizeItem.trouser * multiplier,
        sleeveLengthLeft: (sizeItem.sleeve[0] + sizeItem.sleeve[1]) / 2 * multiplier,
        sleeveLengthRight: (sizeItem.sleeve[0] + sizeItem.sleeve[1]) / 2 * multiplier,
        neckCollar: (sizeItem.neck[0] + sizeItem.neck[1]) / 2 * multiplier,
      };
      onApplyMeasurements(data);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-stone-200/90 shadow-2xl overflow-hidden ${className}`}>
      
      {/* 1. Atelier Header Strip */}
      <div className="bg-[#0A1128] text-white p-6 sm:p-8 relative overflow-hidden border-b-2 border-brand-gold">
        <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/10 rounded-2xl p-2 border border-brand-gold/40 flex items-center justify-center shrink-0 backdrop-blur-xs">
              <Image
                src="/images/logo-emblem.png"
                alt="Modern Man Kenya Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-brand-gold">
                  Modern Man Kenya 254
                </span>
                <span className="text-white/40">•</span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                  Atelier Sizing Master
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mt-0.5">
                Men&apos;s Measurement Chart &amp; Tailoring Guide
              </h2>
              <p className="text-xs text-slate-300 font-light mt-1 max-w-xl">
                Anatomical precision guide for Made-to-Measure suits, tuxedo ensembles, bespoke shirts, and contemporary African tunics.
              </p>
            </div>
          </div>

          {/* Unit Toggle & Atelier Badge */}
          <div className="flex items-center space-x-3 self-start md:self-center">
            <div className="bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/15 flex items-center">
              <button
                type="button"
                onClick={() => setUnit('inches')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  unit === 'inches'
                    ? 'bg-brand-gold text-brand-navy shadow-md font-extrabold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Inches (in)
              </button>
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  unit === 'cm'
                    ? 'bg-brand-gold text-brand-navy shadow-md font-extrabold'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                Centimeters (cm)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="p-6 sm:p-8 lg:p-10 space-y-10">
        
        {/* Upper Split: Visual Model Anatomy Diagram (Left) + Step-by-Step Instructions (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left: Anatomical Visual Callout Model Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0A1128] to-[#121c38] rounded-2xl p-5 text-white border border-brand-gold/30 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                  Tailoring Reference Points
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-gold bg-white/10 px-2 py-0.5 rounded">
                Hover to Highlight
              </span>
            </div>

            {/* Visual Tailoring Model with Interactive Points */}
            <div className="relative w-full h-[520px] sm:h-[580px] rounded-xl overflow-hidden bg-slate-900/60 border border-white/10">
              <Image
                src="/images/kaunda-safari-purple-suit-1.jpeg"
                alt="Modern Man Kenya Bespoke Tailoring Model"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-top opacity-90 transition-transform duration-500 hover:scale-102"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-transparent to-black/30 pointer-events-none" />

              {/* Measurement Pins & Callouts Layer */}
              <div className="absolute inset-0 pointer-events-auto">
                {[
                  { id: 1, label: 'Neck', top: '15%', left: '50%' },
                  { id: 2, label: 'Shoulder', top: '21%', left: '33%' },
                  { id: 3, label: 'Chest', top: '28%', left: '50%' },
                  { id: 7, label: 'Bicep', top: '32%', left: '76%' },
                  { id: 4, label: 'Waist', top: '40%', left: '48%' },
                  { id: 6, label: 'Sleeve Length', top: '37%', left: '22%' },
                  { id: 8, label: 'Wrist', top: '53%', left: '21%' },
                  { id: 5, label: 'Hips / Seat', top: '52%', left: '50%' },
                  { id: 9, label: 'Shirt / Jacket Hem', top: '57%', left: '38%' },
                  { id: 12, label: 'Thigh', top: '65%', left: '54%' },
                  { id: 13, label: 'Knee', top: '76%', left: '52%' },
                  { id: 14, label: 'Calf', top: '83%', left: '54%' },
                  { id: 15, label: 'Trouser Length', top: '88%', left: '26%' },
                ].map((pin) => (
                  <button
                    key={pin.id}
                    type="button"
                    onMouseEnter={() => setActivePoint(pin.id)}
                    onMouseLeave={() => setActivePoint(null)}
                    onClick={() => setActivePoint(pin.id)}
                    style={{ top: pin.top, left: pin.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 ${
                      activePoint === pin.id ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-tight flex items-center space-x-1 border shadow-lg backdrop-blur-md transition-all ${
                      activePoint === pin.id
                        ? 'bg-brand-gold text-brand-navy border-white shadow-brand-gold/50'
                        : 'bg-brand-navy/90 text-white border-brand-gold/60 hover:bg-brand-gold hover:text-brand-navy'
                    }`}>
                      <span className="w-3.5 h-3.5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center text-[9px] font-black shrink-0">
                        {pin.id}
                      </span>
                      <span className="whitespace-nowrap">{pin.label}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Bottom Badge inside photo */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-brand-navy/90 backdrop-blur-md border border-brand-gold/40 text-xs flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Ruler className="w-4 h-4 text-brand-gold" />
                  <span className="font-semibold text-slate-200">
                    {activePoint 
                      ? measurementSteps.find(s => s.id === activePoint)?.name 
                      : 'Interactive Anatomical Points'}
                  </span>
                </div>
                <span className="text-[11px] text-brand-gold font-bold">
                  {unit.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="pt-3 text-center text-[11px] text-slate-300">
              Modern Man Kenya bespoke cutters calibrate individual posture, shoulder balance, and sleeve curvature.
            </div>
          </div>

          {/* Right: Numbered 1-17 Master How-to-Measure Guide */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold block">
                  Master Tailor Standard
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
                  How to Take Measurements
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium">
                17 Anatomical Reference Steps
              </span>
            </div>

            {/* Scrollable / Grid of 17 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[580px] overflow-y-auto pr-1">
              {measurementSteps.map((step) => {
                const isHighlighted = activePoint === step.id;
                return (
                  <div
                    key={step.id}
                    onMouseEnter={() => setActivePoint(step.id)}
                    onMouseLeave={() => setActivePoint(null)}
                    className={`p-3 rounded-xl border transition-all text-xs cursor-pointer ${
                      isHighlighted
                        ? 'bg-brand-navy text-white border-brand-gold shadow-md scale-[1.02]'
                        : 'bg-stone-50/70 hover:bg-stone-100/90 border-stone-200/90 text-stone-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 ${
                        isHighlighted
                          ? 'bg-brand-gold text-brand-navy'
                          : 'bg-brand-navy text-brand-gold'
                      }`}>
                        {step.id}
                      </span>
                      <span className="font-serif font-bold text-sm tracking-wide">
                        {step.name}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed font-light ${
                      isHighlighted ? 'text-slate-200' : 'text-stone-600'
                    }`}>
                      {step.instruction}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* 3. Standard Men's Sizing Matrix Table (Inches & CM) */}
        <div className="space-y-4 pt-6 border-t border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold block">
                Off-The-Rack &amp; MTM Conversion
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
                Standard Men&apos;s Measurement Chart ({unit === 'inches' ? 'Inches' : 'Centimeters'})
              </h3>
            </div>
            <div className="text-xs text-stone-500 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Click a size row to auto-apply to your profile</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200/90 shadow-xs">
            <table className="w-full text-xs text-left border-collapse min-w-[760px]">
              <thead>
                <tr className="bg-[#0A1128] text-brand-gold font-serif uppercase tracking-wider text-[11px] border-b border-brand-gold/30">
                  <th className="py-3.5 px-4 font-bold text-white">Size</th>
                  <th className="py-3.5 px-3">Neck</th>
                  <th className="py-3.5 px-3">Shoulder</th>
                  <th className="py-3.5 px-3">Chest</th>
                  <th className="py-3.5 px-3">Waist</th>
                  <th className="py-3.5 px-3">Hips</th>
                  <th className="py-3.5 px-3">Sleeve</th>
                  <th className="py-3.5 px-3">Shirt Len</th>
                  <th className="py-3.5 px-3">Jacket Len</th>
                  <th className="py-3.5 px-3">Trouser Len</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 font-mono">
                {standardSizeMatrix.map((row, idx) => (
                  <tr 
                    key={row.size}
                    className={`hover:bg-brand-gold/10 transition-colors group cursor-pointer ${
                      idx % 2 === 0 ? 'bg-white' : 'bg-stone-50/50'
                    }`}
                    onClick={() => handleApplyPreset(row)}
                  >
                    <td className="py-3 px-4 font-bold font-serif text-brand-navy text-sm flex items-center space-x-2">
                      <span className="w-7 h-7 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-sans font-extrabold text-xs">
                        {row.size}
                      </span>
                      <span className="text-[11px] text-stone-400 font-normal">{row.chestTag}</span>
                    </td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.neck)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.shoulder)}</td>
                    <td className="py-3 px-3 font-semibold text-brand-navy">{toUnit(row.chest)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.waist)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.hips)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.sleeve)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.shirt)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.jacket)}</td>
                    <td className="py-3 px-3 text-stone-700">{toUnit(row.trouser)}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyPreset(row);
                        }}
                        className="px-3 py-1 rounded bg-stone-100 group-hover:bg-brand-navy group-hover:text-brand-gold text-[10px] font-bold uppercase tracking-wider transition-all"
                      >
                        Select {row.size}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Extra Inset Precision Guides (Back Length, Crotch Depth, Inseam) */}
        <div className="space-y-4 pt-6 border-t border-stone-200">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-brand-gold" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-brand-navy">
              Specialized Anatomical Calibrations (As Needed)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Guide 1: Back Length */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-brand-navy">
                  Back Length (Nape to Waist)
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-[10px]">
                  A
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                Measured along the spine from the base of the neck (C7 vertebrae) down to the waistline. Essential for correct jacket balance and eliminating collar rolls.
              </p>
              <div className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                Standard: 17 – 18.5 in (43 – 47 cm)
              </div>
            </div>

            {/* Guide 2: Crotch Depth */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-brand-navy">
                  Crotch Depth / Rise (Sitting)
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-[10px]">
                  B
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                Sit upright on a flat wooden chair. Measure from your waistband vertically down the side to the chair seat. Ensures trousers never pull when seated.
              </p>
              <div className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                Standard: 9.5 – 11.5 in (24 – 29 cm)
              </div>
            </div>

            {/* Guide 3: Inseam */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-brand-navy">
                  Inseam (Inner Crotch to Ankle)
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-[10px]">
                  C
                </span>
              </div>
              <p className="text-[11px] text-stone-600 leading-relaxed font-light">
                Stand straight with legs slightly apart. Measure from the lowest crotch apex along the inner thigh down to the top of the shoe heel.
              </p>
              <div className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                Standard: 30 – 34 in (76 – 86 cm)
              </div>
            </div>

          </div>
        </div>

        {/* 5. Bottom Action Strip */}
        {showActions && (
          <div className="p-6 rounded-2xl bg-[#0A1128] text-white flex flex-col md:flex-row items-center justify-between gap-4 border border-brand-gold/40 shadow-xl">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/40">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-white">
                  Prefer a Professional Master Fitting in Nairobi?
                </h4>
                <p className="text-xs text-slate-300 font-light">
                  Our master cutters take your exact anatomical blueprint at our Trust Mansion Flagship Atelier.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
              <Link
                href="/book-appointment"
                className="px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-luxury transition-all flex items-center justify-center space-x-1.5 shadow-md flex-1 md:flex-initial"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Master Fitting</span>
              </Link>
              <a
                href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20have%20questions%20about%20my%20measurements%20and%20sizing."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-luxury transition-all flex items-center justify-center space-x-1.5 shadow-md flex-1 md:flex-initial"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Ask Master Tailor</span>
              </a>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
