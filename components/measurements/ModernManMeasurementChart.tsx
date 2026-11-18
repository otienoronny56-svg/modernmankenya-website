'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Ruler, 
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
      const v1 = valInches[0];
      const v2 = valInches[1] ?? valInches[0];
      if (unit === 'inches') return `${v1}/${v2}`;
      const cm1 = Math.round(v1 * 2.54);
      const cm2 = Math.round(v2 * 2.54);
      return `${cm1}/${cm2}`;
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
    { id: 18, name: 'Trouser Bottom', instruction: 'Measure horizontally around the very bottom trouser cuff opening right above the ankle bone.', key: 'ankleOpening', defaultInches: 15 },
  ];

  // Modern Man Kenya Official Shop Sizing Chart in Inches (converted dynamically to cm when unit === 'cm')
  const standardSizeMatrix = [
    { size: 'S', chestTag: '38"', chest: 38, sleeve: 25, stomach: 37, shoulder: 17 },
    { size: 'M', chestTag: '40"', chest: 40, sleeve: 25, stomach: [38, 39], shoulder: 18 },
    { size: 'L', chestTag: '42"', chest: 42, sleeve: 25, stomach: 40, shoulder: 18.5 },
    { size: 'XL', chestTag: '44"', chest: 44, sleeve: 26, stomach: [41, 42], shoulder: 19 },
    { size: '2XL', chestTag: '45"', chest: 45, sleeve: 26, stomach: 43, shoulder: 20 },
    { size: '3XL', chestTag: '46"', chest: 46, sleeve: 27, stomach: [44, 45], shoulder: 20 },
    { size: '4XL', chestTag: '48"', chest: 48, sleeve: 27, stomach: 48, shoulder: 20 },
    { size: '5XL', chestTag: '50"', chest: 50, sleeve: 26, stomach: 50, shoulder: 21 },
  ];

  const handleApplyPreset = (sizeItem: typeof standardSizeMatrix[0]) => {
    if (onSelectSize) onSelectSize(sizeItem.size);
    if (onApplyMeasurements) {
      const multiplier = unit === 'cm' ? 2.54 : 1;
      const avg = (v: number | number[]) =>
        Array.isArray(v) ? (v[0] + (v[1] ?? v[0])) / 2 : v;
      const data: Record<string, number> = {
        chest: Math.round(sizeItem.chest * multiplier * 10) / 10,
        sleeveLengthLeft: Math.round(sizeItem.sleeve * multiplier * 10) / 10,
        sleeveLengthRight: Math.round(sizeItem.sleeve * multiplier * 10) / 10,
        waistStomach: Math.round(avg(sizeItem.stomach) * multiplier * 10) / 10,
        shoulderWidth: Math.round(sizeItem.shoulder * multiplier * 10) / 10,
      };
      onApplyMeasurements(data);
    }
  };

  return (
    <div className={`bg-white dark:bg-[#1A1C27] rounded-3xl border border-stone-200/90 dark:border-slate-800 shadow-2xl overflow-hidden ${className}`}>
      
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
          <div className="lg:col-span-5 bg-gradient-to-b from-[#0A1128] via-[#0E152F] to-[#121c38] rounded-2xl p-4 sm:p-5 text-white border border-brand-gold/30 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-gold/10 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <Scissors className="w-4 h-4 text-brand-gold" />
                <span className="text-xs font-serif font-bold text-white uppercase tracking-wider">
                  Men&apos;s Measurement Chart
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-brand-gold bg-white/10 px-2.5 py-0.5 rounded-full border border-brand-gold/30">
                18 Reference Points
              </span>
            </div>

            {/* Visual Tailoring Model - Crisp 9:16 Studio Reference Chart */}
            <div className="relative w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#0A1128] border border-white/10 shadow-inner">
              <Image
                src="/images/measurements/mens-measurement-model.jpg"
                alt="Men's Measurement Chart for Tailoring & Fashion Design"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                priority
              />
            </div>

            <div className="pt-3 text-center text-[11px] text-slate-300">
              Modern Man Kenya master cutters calibrate individual posture, shoulder balance, and sleeve curvature.
            </div>
          </div>

          {/* Right: Numbered 1-18 Master How-to-Measure Guide */}
          <div className="lg:col-span-7 space-y-4">
            <div className="border-b border-stone-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold block">
                  Master Tailor Standard
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy dark:text-slate-100">
                  How to Take Measurements
                </h3>
              </div>
              <span className="text-xs text-stone-500 dark:text-slate-400 font-medium">
                18 Anatomical Reference Steps
              </span>
            </div>

            {/* Scrollable / Grid of 18 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[600px] lg:max-h-[760px] overflow-y-auto pr-1">
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
                        : 'bg-stone-50/70 dark:bg-[#151722] hover:bg-stone-100/90 dark:hover:bg-[#1E202C] border-stone-200/90 dark:border-slate-800 text-stone-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 mb-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 ${
                        isHighlighted
                          ? 'bg-brand-gold text-brand-navy'
                          : 'bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy'
                      }`}>
                        {step.id}
                      </span>
                      <span className={`font-serif font-bold text-sm tracking-wide ${
                        isHighlighted ? 'text-white' : 'text-brand-navy dark:text-slate-100'
                      }`}>
                        {step.name}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed font-light ${
                      isHighlighted ? 'text-slate-200' : 'text-stone-600 dark:text-slate-400'
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
        <div className="space-y-4 pt-6 border-t border-stone-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold block">
                Off-The-Rack &amp; MTM Conversion
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy dark:text-slate-100">
                Standard Men&apos;s Measurement Chart ({unit === 'inches' ? 'Inches' : 'Centimeters'})
              </h3>
            </div>
            <div className="text-xs text-stone-500 dark:text-slate-400 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Click a size row to auto-apply to your profile</span>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200/90 dark:border-slate-800 shadow-xs">
            <table className="w-full text-xs text-left border-collapse min-w-[540px]">
              <thead>
                <tr className="bg-[#0A1128] text-brand-gold font-serif uppercase tracking-wider text-[11px] border-b border-brand-gold/30">
                  <th className="py-3.5 px-4 font-bold text-white">Size</th>
                  <th className="py-3.5 px-4">Chest</th>
                  <th className="py-3.5 px-4">Sleeve</th>
                  <th className="py-3.5 px-4">Stomach</th>
                  <th className="py-3.5 px-4">Shoulder</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-slate-800 font-mono">
                {standardSizeMatrix.map((row, idx) => (
                  <tr 
                    key={row.size}
                    className={`hover:bg-brand-gold/10 dark:hover:bg-brand-gold/15 transition-colors group cursor-pointer ${
                      idx % 2 === 0 ? 'bg-white dark:bg-[#1A1C27]' : 'bg-stone-50/50 dark:bg-[#151722]'
                    }`}
                    onClick={() => handleApplyPreset(row)}
                  >
                    <td className="py-3 px-4 font-bold font-serif text-brand-navy dark:text-slate-100 text-sm flex items-center space-x-2">
                      <span className="w-8 h-7 rounded-lg bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy flex items-center justify-center font-sans font-extrabold text-xs shrink-0">
                        {row.size}
                      </span>
                      <span className="text-[11px] text-stone-400 dark:text-slate-500 font-normal hidden sm:inline">Chest {row.chestTag}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-brand-navy dark:text-slate-100">{toUnit(row.chest)}</td>
                    <td className="py-3 px-4 text-stone-700 dark:text-slate-300">{toUnit(row.sleeve)}</td>
                    <td className="py-3 px-4 text-stone-700 dark:text-slate-300">{toUnit(row.stomach)}</td>
                    <td className="py-3 px-4 text-stone-700 dark:text-slate-300">{toUnit(row.shoulder)}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyPreset(row);
                        }}
                        className="px-3 py-1 rounded bg-stone-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 group-hover:bg-brand-navy dark:group-hover:bg-brand-gold group-hover:text-brand-gold dark:group-hover:text-brand-navy text-[10px] font-bold uppercase tracking-wider transition-all"
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

        {/* 4. Extra Measurements (As Needed) - Visual Demonstration & Guide */}
        <div className="space-y-6 pt-6 border-t border-stone-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-brand-gold" />
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-brand-navy dark:text-slate-100">
                Extra Measurements (as needed)
              </h3>
            </div>
            <span className="text-xs text-stone-500 dark:text-slate-400">
              Back Length • Crotch Depth • Inseam
            </span>
          </div>

          {/* Visual Inset Banner from Modern Man Kenya Tailoring Guide */}
          <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-brand-gold/40 shadow-xl">
            <div className="relative w-full aspect-[1440/920]">
              <Image
                src="/images/measurements/extra-measurements.jpg"
                alt="Extra Measurements (as needed) - Back Length, Crotch Depth, Inseam"
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Guide 1: Back Length */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#151722] border border-stone-200/90 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-brand-navy dark:text-slate-100">
                  Back Length (neck to waist)
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-[10px]">
                  A
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 leading-relaxed font-light">
                Measured along the spine from the base of the neck down to the natural waistline. Essential for correct jacket balance, sleeve pitch, and eliminating collar rolls.
              </p>
              <div className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                Standard: 17 – 18.5 in (43 – 47 cm)
              </div>
            </div>

            {/* Guide 2: Crotch Depth */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#151722] border border-stone-200/90 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-brand-navy dark:text-slate-100">
                  Crotch Depth (waist to crotch)
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-[10px]">
                  B
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 leading-relaxed font-light">
                Sit upright on a flat firm surface or chair. Measure vertically from waistband to crotch level (sitting depth). Ensures tailored trousers sit comfortably without binding when seated.
              </p>
              <div className="text-[10px] font-semibold text-brand-gold uppercase tracking-wider">
                Standard: 9.5 – 11.5 in (24 – 29 cm)
              </div>
            </div>

            {/* Guide 3: Inseam */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#151722] border border-stone-200/90 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-sm text-brand-navy dark:text-slate-100">
                  Inseam (crotch to ankle)
                </span>
                <span className="w-5 h-5 rounded-full bg-brand-gold text-brand-navy flex items-center justify-center font-bold text-[10px]">
                  C
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-slate-400 leading-relaxed font-light">
                Stand straight with feet slightly apart. Measure from the crotch apex along the inner leg to the ankle for optimal trouser break over your dress shoes.
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
                <Scissors className="w-5 h-5" />
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
