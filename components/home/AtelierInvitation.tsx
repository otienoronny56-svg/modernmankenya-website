'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const AtelierInvitation: React.FC = () => {
  return (
    <section className="py-12 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy rounded-xl overflow-hidden shadow-2xl border border-brand-gold/30 grid grid-cols-1 lg:grid-cols-12 text-white">
          
          {/* Left Visual Area */}
          <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[380px] lg:min-h-[460px]">
            <Image
              src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85"
              alt="The Modern Man Nairobi Atelier"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-navy/30 to-brand-navy lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent lg:hidden block" />
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded border border-brand-gold/30 text-xs">
              <span className="text-brand-gold font-bold uppercase tracking-luxury text-[10px] sm:text-xs">Private Fitting Lounge</span>
              <p className="text-white text-[10px] sm:text-[11px]">Westlands / Karen, Nairobi</p>
            </div>
          </div>

          {/* Right Invitation Content */}
          <div className="lg:col-span-6 p-6 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>By Appointment Only</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                An Exclusive Sanctuary of Tailoring in Nairobi
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Step into our discreet private fitting lounge. Savor single malt scotch or artisan Kenyan coffee 
                while running your fingers across rare cloths from England and Italy with our Master Tailor.
              </p>

              <div className="space-y-2.5 sm:space-y-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <Clock className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Private 60-Minute Fitting Slots • No Waiting</span>
                </div>
                <div className="flex items-center space-x-2.5 sm:space-x-3">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Residence & Suite Appointments in Nairobi</span>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 mt-5 sm:mt-6 border-t border-white/15 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
              <Link
                href="/book-appointment"
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 rounded-sm bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs text-center transition-all shadow-gold flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Fitting Slot</span>
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center py-2 sm:py-0 text-xs font-bold uppercase tracking-luxury text-slate-300 hover:text-white flex items-center justify-center space-x-1.5"
              >
                <span>Atelier Location & Hours</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
