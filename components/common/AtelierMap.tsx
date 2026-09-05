'use client';

import React from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Phone
} from 'lucide-react';

interface AtelierMapProps {
  showDetailsCard?: boolean;
  className?: string;
  title?: string;
}

export function AtelierMap({
  showDetailsCard = true,
  className = '',
  title = 'The Flagship Atelier Location',
}: AtelierMapProps) {
  const googleMapsUrl = 'https://maps.app.goo.gl/FV4B4XcDXLx5DWGj8';
  const embedUrl = 'https://maps.google.com/maps?q=-1.2834854,36.8187773(Modern%20Man%20Kenya)&t=&z=17&ie=UTF8&iwloc=B&output=embed';

  return (
    <div className={`w-full rounded-2xl overflow-hidden border border-brand-gold/30 shadow-xl bg-white ${className}`}>
      
      {/* Top Header Bar */}
      <div className="bg-brand-navy p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-brand-gold">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-brand-gold/20 text-brand-gold rounded-xl border border-brand-gold/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold">
                Nairobi Atelier
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Open for Private Appointments" />
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
              {title}
            </h3>
          </div>
        </div>

        {/* Direct Google Maps Action Button */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 group flex-shrink-0"
        >
          <Navigation className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          <span>Get Driving Directions</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70" />
        </a>
      </div>

      {/* Interactive Map Embed Container */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-100 overflow-hidden">
        <iframe
          title="Modern Man Kenya Atelier Google Maps Location"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full filter contrast-[1.05]"
        />

        {/* Floating Quick Badge on Map */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none hidden sm:flex items-center space-x-2 bg-brand-navy/90 text-white backdrop-blur-md px-3.5 py-2 rounded-xl border border-brand-gold/40 shadow-lg text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          <span>Modern Man Kenya • Nairobi Atelier</span>
        </div>
      </div>

      {/* Optional Details Footer Strip */}
      {showDetailsCard && (
        <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-700">
          
          <div className="flex items-start space-x-2.5">
            <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-brand-navy uppercase tracking-wider text-[10px]">
                Atelier Address
              </p>
              <p className="text-slate-600 font-medium">Nairobi, Kenya</p>
              <p className="text-[11px] text-slate-400">Valet & Executive Parking Available</p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <Clock className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-brand-navy uppercase tracking-wider text-[10px]">
                Consultation Hours
              </p>
              <p className="text-slate-600 font-medium">Tuesday – Saturday: 09:30 – 18:30</p>
              <p className="text-[11px] text-slate-400">By Private Appointment Only</p>
            </div>
          </div>

          <div className="flex items-start space-x-2.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-brand-navy uppercase tracking-wider text-[10px]">
                Concierge Assistance
              </p>
              <p className="text-slate-600 font-medium">+254 700 000 254</p>
              <a 
                href={googleMapsUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[11px] text-brand-gold hover:underline font-semibold block"
              >
                Open directly in Google Maps →
              </a>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
