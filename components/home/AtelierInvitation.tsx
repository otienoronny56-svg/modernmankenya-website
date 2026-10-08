'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Phone, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND_PROFILE } from '@/data/brandProfile';

export const AtelierInvitation: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy rounded-xl overflow-hidden shadow-2xl border border-brand-gold/30 grid grid-cols-1 lg:grid-cols-12 text-white">
          
          {/* Left Visual Area with Authentic Modern Man Kenya Shoot Image */}
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]">
            <Image
              src="/images/MOK_7655.jpg"
              alt="Modern Man Kenya Bespoke Tailoring Nairobi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-navy/30 to-brand-navy lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent lg:hidden block" />
            
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 bg-black/60 backdrop-blur-md px-3 sm:px-4 py-2 rounded border border-brand-gold/30 text-xs">
              <span className="text-brand-gold font-bold uppercase tracking-luxury text-[10px] sm:text-xs block">
                Flagship Bespoke Atelier
              </span>
              <p className="text-white text-[10px] sm:text-[11px]">Nairobi, Kenya</p>
            </div>
          </div>

          {/* Right Invitation Content */}
          <div className="lg:col-span-6 p-6 sm:p-12 lg:p-14 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>By Appointment Only • Nairobi Atelier</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                An Exclusive Sanctuary of Tailoring
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Step into a discreet private fitting experience in Nairobi. Explore fine imported cloths, 
                discuss your silhouette and wardrobe requirements with our Master Tailor, and have your 
                anatomical measurements captured with millimetric precision.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href={`tel:${BRAND_PROFILE.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    Private Concierge: {BRAND_PROFILE.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href={`mailto:${BRAND_PROFILE.email}`} className="hover:text-white transition-colors">
                    {BRAND_PROFILE.email}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <span>Archived Client Measurement File with Every Commission</span>
                </div>
              </div>
            </div>

            <div className="pt-6 sm:pt-8 mt-6 border-t border-white/15 flex flex-col sm:flex-row gap-4 items-center">
              <Link
                href="/book-appointment"
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs text-center transition-all shadow-gold flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Consultation</span>
              </Link>
              <a
                href={`tel:${BRAND_PROFILE.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto text-center py-2 sm:py-0 text-xs font-bold uppercase tracking-luxury text-slate-300 hover:text-white flex items-center justify-center space-x-1.5"
              >
                <span>Call Concierge: {BRAND_PROFILE.phone}</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
