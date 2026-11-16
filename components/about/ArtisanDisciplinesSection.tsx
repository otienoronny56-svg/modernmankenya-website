'use client';

import React from 'react';
import { Scissors, Layers, ShieldCheck, Ruler, ClipboardCheck, BookOpen, Users, Clock } from 'lucide-react';

export const ArtisanDisciplinesSection: React.FC = () => {
  const disciplines = [
    {
      title: 'Master Pattern Cutter',
      role: 'Anatomical Block Architecture',
      icon: Ruler,
      description:
        'Translates 35+ physical contour points into an individual hand-drafted pattern block. Calibrates shoulder slope, chest arch, and spine curvature so the garment balances naturally with zero drag or pulling.',
    },
    {
      title: 'Senior Master Coatmaker',
      role: 'Internal Floating Architecture',
      icon: Layers,
      description:
        'Constructs the interior full floating horsehair and camel-hair canvas chest piece without synthetic fusing. Thousands of invisible pad stitches allow the jacket to breathe and mold permanently to your posture.',
    },
    {
      title: 'Master Trouser Artisan',
      role: 'Waistband & Leg Line Symmetry',
      icon: Scissors,
      description:
        'Drafts trousers specifically to your stance, stride, and rise. Builds curtained waistbands, hand-tacked pocket corners, and millimetric hem breaks that align seamlessly with your footwear.',
    },
    {
      title: 'Quality Verification & Finishing Lead',
      role: 'Pre-Delivery Multi-Point Inspection',
      icon: ShieldCheck,
      description:
        'Applies our rigorous Quality Control Checklist: verifying finished measurements against your client file, checking seam strength, buttonhole silk stitching, lining drape, and hand-press finish.',
    },
  ];

  return (
    <section id="craft-standards" className="py-12 sm:py-16 bg-brand-canvas-alt dark:bg-[#0c0d14] border-b border-slate-200/80 dark:border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Master Craftsmen & Roles</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy dark:text-white font-bold">
            The Disciplines Behind the Cut
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-slate-300 font-light leading-relaxed">
            Every garment bearing the Modern Man Kenya hallmark is created through disciplined specialization, 
            rigorous Standard Operating Procedures, and individual craft accountability.
          </p>
        </div>

        {/* 4 Disciplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {disciplines.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={d.title}
                className="bg-white dark:bg-[#1A1C27] p-6 sm:p-7 rounded-xl border border-slate-200/80 dark:border-stone-800 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-luxury"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-lg bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-brand-gold">0{idx + 1}</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-brand-navy dark:text-white group-hover:text-brand-gold transition-colors leading-snug">
                      {d.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
                      {d.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                    {d.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-stone-800 flex items-center space-x-1.5 text-[11px] font-bold text-brand-navy dark:text-brand-gold">
                  <ClipboardCheck className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
