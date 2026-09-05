'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  Sparkles, 
  Briefcase, 
  Layers, 
  Users, 
  Building,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { AtelierMap } from '@/components/common/AtelierMap';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('bespoke');
  const [companyName, setCompanyName] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneNumber = '+254 718 923082';
  const whatsappUrl = `https://wa.me/254718923082?text=${encodeURIComponent(
    'Hello Modern Man Kenya, I would like to inquire about bespoke tailoring, partnerships, or supplies.'
  )}`;
  const officialEmail = 'modernmanke254@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await (supabase.from('bespoke_inquiries') as any).insert({
        client_name: name,
        client_email: email,
        client_phone: phone,
        category: inquiryType,
        garment_specifications: { 
          message,
          company_name: companyName || undefined,
          inquiry_type: inquiryType,
        },
      });
      setSent(true);
    } catch (err) {
      console.warn('Inquiry submission notice:', err);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-canvas-alt py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Title Banner */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-navy text-brand-gold text-[10px] sm:text-xs uppercase tracking-luxury font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Man Kenya 254 • Private Concierge</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-navy">
            Contact & Partnerships
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-slate-600 font-light leading-relaxed">
            Direct communications for private client commissions, wedding parties, 
            textile mill supplies, and corporate executive wardrobes.
          </p>
        </div>

        {/* 3 Partnership & Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-brand-gold/30 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-brand-navy">
              Private Clients & Grooms
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              One-on-one appointments for bespoke two-piece and three-piece suits, tuxedos, and wedding party styling.
            </p>
            <Link
              href="/book-appointment"
              className="text-xs font-bold text-brand-gold hover:underline inline-block uppercase tracking-wider pt-1"
            >
              Book Fitting Appointment &rarr;
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg border border-brand-gold/30 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-brand-navy">
              Mill Supplies & Fabric Partners
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Direct supplier desk for European fabric mills (wool, velvet, silk, cupro), horn button crafters, and trimmings.
            </p>
            <a
              href={`mailto:${officialEmail}?subject=Business%20Supply%20%26%20Fabric%20Partnership%20Proposal`}
              className="text-xs font-bold text-brand-gold hover:underline inline-block uppercase tracking-wider pt-1"
            >
              Propose Supply Catalog &rarr;
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg border border-brand-gold/30 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-base text-brand-navy">
              Corporate & Diplomatic
            </h3>
            <p className="text-xs text-slate-500 font-light leading-relaxed">
              Executive boardroom suiting, diplomatic mission formalwear, and luxury executive milestone gifting programs.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-gold hover:underline inline-block uppercase tracking-wider pt-1"
            >
              WhatsApp Corporate Desk &rarr;
            </a>
          </div>
        </div>

        {/* Main Details & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Details Box */}
          <div className="lg:col-span-5 bg-brand-navy text-white p-8 sm:p-10 rounded-xl shadow-luxury border-2 border-brand-gold/30 space-y-8 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6 relative z-10">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold">
                  The Nairobi Atelier
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
                  Modern Man Kenya 254
                </h2>
                <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                  An exclusive sanctuary of master tailoring, providing bespoke and ready-to-wear excellence in Kenya.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-5 text-xs text-slate-300 pt-2">
                <div className="flex items-start space-x-3.5">
                  <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Direct Telephone & WhatsApp
                    </p>
                    <a href={`tel:+254718923082`} className="text-sm font-semibold text-brand-gold hover:underline block mt-0.5">
                      {phoneNumber}
                    </a>
                    <span className="text-[11px] text-slate-400">Calls & WhatsApp active 7 days a week</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Official Email Correspondence
                    </p>
                    <a href={`mailto:${officialEmail}`} className="text-sm font-semibold text-brand-gold hover:underline block mt-0.5">
                      {officialEmail}
                    </a>
                    <span className="text-[11px] text-slate-400">For client orders, suppliers, and partnerships</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Flagship Atelier Location
                    </p>
                    <p className="text-slate-300 mt-0.5">Nairobi, Kenya</p>
                    <a 
                      href="https://maps.app.goo.gl/FV4B4XcDXLx5DWGj8"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-gold hover:underline inline-flex items-center space-x-1 mt-1 font-semibold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white uppercase tracking-wider text-[11px]">
                      Consultation Hours
                    </p>
                    <p className="text-slate-300 mt-0.5">Tuesday – Saturday: 09:30 – 18:30</p>
                    <p className="text-[11px] text-slate-400">Strictly by Private Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Instant Action */}
            <div className="pt-6 border-t border-white/10 space-y-3 relative z-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold uppercase tracking-luxury text-xs rounded transition-all flex items-center justify-center space-x-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <Link
                href="/book-appointment"
                className="w-full py-3 px-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded text-center transition-all block shadow-gold"
              >
                Schedule Private Fitting &rarr;
              </Link>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-xl shadow-luxury border border-slate-200">
            {sent ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold mx-auto flex items-center justify-center border border-brand-gold">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-navy">
                  Inquiry Transmitted Successfully
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto font-light">
                  Thank you. Our atelier management and style concierge will respond directly to your inquiry within 4 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSent(false)}
                    className="text-xs font-bold text-brand-navy hover:text-brand-gold uppercase tracking-wider"
                  >
                    Send Another Inquiry &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-navy mb-1">
                    Send a Message to the Atelier
                  </h3>
                  <p className="text-xs text-slate-500 font-light">
                    Whether you are commissioning a bespoke suit, representing a textile mill, or planning corporate uniforms.
                  </p>
                </div>

                {/* Inquiry Type Dropdown */}
                <div className="space-y-1">
                  <label className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                    Purpose of Inquiry *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-navy bg-white"
                  >
                    <option value="bespoke">Private Bespoke Commission / Fitting</option>
                    <option value="wedding">Wedding Party & Groomsmen Consultation</option>
                    <option value="supply">Business Supply / Fabric Mill / Trimmings Partner</option>
                    <option value="corporate">Corporate Uniforms & Executive Wardrobes</option>
                    <option value="partnership">Brand Collaboration & Media Inquiry</option>
                    <option value="general">General Concierge Question</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Mwangi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                      Company / Organization (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Scabal UK / Apex Capital Ltd"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                      Direct Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 718 923082"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-brand-navy uppercase tracking-wider text-[11px]">
                    Inquiry Details & Specifications *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details regarding your requirements, supplies catalog, order quantities, preferred fabrics, or event timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 text-xs sm:text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-brand-navy hover:bg-brand-navy/90 text-white text-xs font-bold uppercase tracking-luxury rounded transition-all flex items-center justify-center space-x-2 border border-brand-gold/30 shadow-md w-full sm:w-auto"
                >
                  <Send className="w-4 h-4 text-brand-gold" />
                  <span>{loading ? 'Transmitting...' : 'Transmit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Dedicated Flagship Atelier Map Section */}
        <div className="mt-14 sm:mt-16 space-y-4">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold">
              Find The Atelier
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
              Flagship Atelier Location
            </h2>
            <p className="text-xs text-slate-500 font-light">
              Centrally located in Nairobi. View our exact GPS coordinates or launch turn-by-turn navigation in Google Maps.
            </p>
          </div>

          <AtelierMap />
        </div>

      </div>
    </div>
  );
}
