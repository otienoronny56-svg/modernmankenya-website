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
          <div className="lg:col-span-6 relative min-h-[360px] sm:min-h-[460px] lg:min-h-[500px]">
            <Image
              src="/images/MOK_7688.jpg"
              alt="Modern Man Kenya Made to Measure Tailoring Nairobi"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top sm:object-[center_15%]"
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
              <a
                href="https://maps.app.goo.gl/FV4B4XcDXLx5DWGj8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-brand-gold hover:text-white transition-colors font-bold group"
                title="Open Nairobi Atelier in Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-gold group-hover:scale-110 transition-transform" />
                <span className="underline decoration-brand-gold/50 underline-offset-4">Pay Us a Visit</span>
              </a>

              <h3 className="font-serif text-2xl sm:text-4xl font-bold leading-tight">
                Book a Private Fitting
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                Come visit our workshop. Feel the fabrics, talk to our tailor, and let us measure you for a sharp, comfortable fit.
              </p>

              <div className="space-y-2.5 pt-2 text-xs text-slate-300">
                {/* Official Call Line */}
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href="tel:+254718923082" className="hover:text-white transition-colors font-medium">
                    Call: +254 718 923 082
                  </a>
                </div>

                {/* WhatsApp Line */}
                <div className="flex items-center space-x-2.5">
                  <svg
                    className="w-4 h-4 fill-[#25D366] flex-shrink-0"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <a
                    href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20inquire%20about%20your%20suits%20and%20tailoring."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    WhatsApp: +254 114 122 510
                  </a>
                </div>

                {/* Email Line */}
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
                href="tel:+254718923082"
                className="w-full sm:w-auto text-center py-2 sm:py-0 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white flex items-center justify-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>Call Us</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
