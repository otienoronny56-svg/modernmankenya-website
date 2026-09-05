'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Coffee, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Glasses, 
  Clock, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { AtelierMap } from '@/components/common/AtelierMap';

export const AtelierExperienceSection: React.FC = () => {
  const experiences = [
    {
      icon: Coffee,
      title: 'Private Lounge & Hospitality',
      desc: 'Sip single malt scotch or artisanal Kenyan espresso in our private lounge while discussing your wardrobe needs with our Style Director.',
    },
    {
      icon: Sparkles,
      title: 'The Vault of 4,000+ Mill Bunches',
      desc: 'Explore physical fabric swatch bunches from Scabal, Dormeuil, and Loro Piana across super 130s to super 180s wools, cashmere, and silk.',
    },
    {
      icon: Glasses,
      title: 'The Basting Fitting Ritual',
      desc: 'Experience our intermediate basting fitting where your coat is sculpted directly on your shoulders using white basting cotton before final stitching.',
    },
    {
      icon: ShieldCheck,
      title: 'Confidentiality & Discretion',
      desc: 'We uphold absolute privacy for high-profile dignitaries, corporate leaders, and wedding parties visiting our Nairobi salon.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-luxury text-brand-gold">
            Private Consultation
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy">
            The Flagship Atelier Experience
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            A bespoke commission at Modern Man Kenya is more than an appointment; it is a personalized sartorial journey.
          </p>
        </div>

        {/* 4 Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-brand-canvas-alt border border-brand-gold/20 p-6 rounded-lg space-y-3 hover:border-brand-gold hover:shadow-luxury transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif font-bold text-base text-brand-navy">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Interactive Map & Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Map Preview */}
          <div className="lg:col-span-7">
            <AtelierMap 
              title="Modern Man Kenya Flagship Atelier"
              showDetailsCard={true}
            />
          </div>

          {/* Invitation Card */}
          <div className="lg:col-span-5 bg-brand-navy text-white p-8 sm:p-10 rounded-2xl border-2 border-brand-gold/40 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-white/10 px-3 py-1 rounded-full inline-block border border-brand-gold/30">
                Exclusive Consultations
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Reserve Your Private Bespoke Session
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Step into our Nairobi Atelier for a one-on-one consultation with our Master Tailor. 
                Whether for an executive wardrobe or wedding party, your sartorial legacy begins here.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Tue – Sat: 09:30 – 18:30 (By Appointment Only)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href="tel:+254700000254" className="hover:text-white transition-colors">
                    Private Concierge: +254 700 000 254
                  </a>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/book-appointment"
                  className="w-full py-3.5 px-6 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all text-center flex items-center justify-center space-x-2 shadow-gold"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Atelier Appointment &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
