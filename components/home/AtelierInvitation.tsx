'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Phone, Mail, ArrowRight } from 'lucide-react';
import { BRAND_PROFILE } from '@/data/brandProfile';

export const AtelierInvitation: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 rounded-2xl overflow-hidden shadow-xl border border-brand-gold/40 grid grid-cols-1 lg:grid-cols-12 text-white">
          
          {/* Left Visual Area with Authentic Modern Man Kenya Shoot Image */}
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[400px] lg:min-h-[440px]">
            <Image
              src="/images/MOK_7688.jpg"
              alt="Modern Man Kenya Made to Measure Tailoring Nairobi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-stone-900 lg:block hidden" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent lg:hidden block" />
            
            <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-brand-gold/30 text-xs">
              <span className="text-brand-gold font-bold uppercase tracking-wider text-[10px] block">
                Nairobi Atelier
              </span>
              <p className="text-white text-[10px]">By Appointment Only</p>
            </div>
          </div>

          {/* Right Invitation Content - 1-2 simple sentences */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold font-bold flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Visit Us in Nairobi</span>
              </span>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Book a Private Fitting
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Come visit our workshop. Feel the fabrics, talk to our tailor, and let us measure you for a sharp, comfortable fit.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href={`tel:${BRAND_PROFILE.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                    Call or WhatsApp: {BRAND_PROFILE.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href={`mailto:${BRAND_PROFILE.email}`} className="hover:text-white transition-colors">
                    {BRAND_PROFILE.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3 items-center">
              <Link
                href="/book-appointment"
                className="w-full sm:w-auto px-7 py-3 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs text-center transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an Appointment</span>
              </Link>
              <a
                href={`tel:${BRAND_PROFILE.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto text-center py-2 sm:py-0 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white flex items-center justify-center space-x-1.5"
              >
                <span>Call Us</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
