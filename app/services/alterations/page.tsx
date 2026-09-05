'use client';

import React from 'react';
import Link from 'next/link';
import { Scissors, Calendar, Check, ShieldCheck, Sparkles } from 'lucide-react';

export default function AlterationsPage() {
  const alterationServices = [
    {
      title: 'Suit Jacket Recut & Reshaping',
      desc: 'Waist suppression, shoulder reduction, collar roll removal, and armhole re-sculpting by master cutters.',
      price: 'From KES 12,000',
    },
    {
      title: 'Trousers Taper & Hemming',
      desc: 'Hand-sewn plain hems or traditional 1.75" cuffs, waist and seat suppression, fork re-adjustment.',
      price: 'From KES 4,500',
    },
    {
      title: 'Sleeve Adjustment from the Shoulder',
      desc: 'Preserving functional working buttonholes by shortening or lengthening directly from the sleeve crown.',
      price: 'From KES 8,500',
    },
    {
      title: 'Full Garment Surgery & Reline',
      desc: 'Replacing degraded linings with pure silk Bemberg cupro and reinforcing vintage floating canvas.',
      price: 'From KES 18,000',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-canvas-alt py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Master Tailor Surgical Refinement</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">
            Bespoke Alterations & Remodeling
          </h1>
          <p className="text-xs sm:text-sm text-brand-slate-muted">
            Entrust your luxury wardrobe to artisans trained in supreme bespoke tailoring methods. 
            We alter garments from Tom Ford, Brioni, Canali, and bespoke houses.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-luxury border border-slate-200 p-8 space-y-8">
          <div className="space-y-4">
            {alterationServices.map((service) => (
              <div
                key={service.title}
                className="p-5 rounded-lg border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-brand-gold transition-colors"
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-navy">{service.title}</h3>
                  <p className="text-xs text-slate-600 font-light mt-1 max-w-lg">{service.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="font-serif text-sm font-bold text-brand-gold-dark">{service.price}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
              <span>Includes anatomical pin-fitting session in Nairobi</span>
            </div>
            <Link
              href="/book-appointment?service=alterations"
              className="px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Book Alteration Fitting</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
