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
      title: 'Private Lounge & Warm Hospitality',
      desc: 'Relax in our comfortable private lounge while discussing your wardrobe needs, upcoming events, and personal style one-on-one with our Master Tailor.',
    },
    {
      icon: Sparkles,
      title: 'Vault of 4,000+ Global Fabrics',
      desc: 'Touch and feel physical fabric swatches from premier mills worldwide—featuring Super 130s to Super 150s pure wools, celebratory jacquards, cashmere, and silk.',
    },
    {
      icon: Glasses,
      title: 'Hand-Basted Precision Fitting',
      desc: 'Your suit is temporarily basted with white cotton thread and sculpted directly on your shoulders before final completion, ensuring an exact custom fit.',
    },
    {
      icon: ShieldCheck,
      title: 'Complete Privacy & Discretion',
      desc: 'We provide a quiet, fully private environment and dedicated personal attention for corporate leaders, executives, diplomats, and wedding grooms.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-luxury text-brand-gold">
            Executive Tier • VIP Tailoring Journey
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy">
            The Executive Tier Experience
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
            Reserved for our Executive Tier commissions. Enjoy a dedicated one-on-one tailoring journey with personalized fittings, private lounge hospitality, and access to the world&apos;s finest wools.
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
              title="Modern Man Kenya Nairobi Atelier"
              showDetailsCard={true}
            />
          </div>

          {/* Invitation Card */}
          <div className="lg:col-span-5 bg-brand-navy text-white p-8 sm:p-10 rounded-2xl border-2 border-brand-gold/40 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />

            <div className="relative z-10 space-y-5">
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-white/10 px-3 py-1 rounded-full inline-block border border-brand-gold/30">
                Executive Consultations
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-snug">
                Reserve Your Executive Fitting Session
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Book a private one-on-one session with our Master Tailor. 
                Whether you are crafting an executive power suit or a milestone wedding ensemble, we guide you every step of the way.
              </p>

              <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-white/10">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Tue – Sat: 09:30 – 18:30 (By Appointment Only)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href="tel:+254718923082" className="hover:text-white transition-colors">
                    Call: +254 718 923 082
                  </a>
                </div>
              </div>

              <div className="pt-3">
                <Link
                  href="/book-appointment"
                  className="w-full py-3.5 px-6 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all text-center flex items-center justify-center space-x-2 shadow-gold"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Fitting Session &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
