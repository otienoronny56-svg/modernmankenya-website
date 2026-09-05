'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Send, Check, Sparkles } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await (supabase.from('bespoke_inquiries') as any).insert({
        client_name: name,
        client_email: email,
        client_phone: phone,
        category: 'general_contact',
        garment_specifications: { message },
      });
      setSent(true);
    } catch (err) {
      console.warn('Inquiry fallback:', err);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-canvas-alt py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
          <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Nairobi Atelier</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-brand-navy font-bold">
            Contact Concierge
          </h1>
          <p className="text-xs sm:text-sm text-brand-slate-muted">
            We welcome private inquiries, wedding commissions, and international trunk show consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Details */}
          <div className="lg:col-span-5 bg-brand-navy text-white p-8 sm:p-10 rounded-lg shadow-luxury border border-brand-gold/30 space-y-8">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold">
                Flagship Atelier
              </span>
              <h2 className="font-serif text-2xl font-bold mt-1">
                Modern Man Kenya 254
              </h2>
              <p className="text-xs text-slate-300 mt-2 font-light leading-relaxed">
                A discreet bespoke house for gentlemen who demand supreme bespoke precision in Nairobi.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">The Flagship Atelier</p>
                  <p>Westlands / Karen, Nairobi, Kenya</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">Private Valet Parking Available</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Private Concierge & WhatsApp</p>
                  <p>+254 700 000 254 / +254 711 000 254</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Confidential Correspondence</p>
                  <p>concierge@modernmankenya.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Atelier Hours</p>
                  <p>Tuesday – Saturday: 09:30 – 18:30</p>
                  <p className="text-slate-400 text-[11px]">Strictly by Private Appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <Link
                href="/book-appointment"
                className="w-full py-3.5 px-6 rounded-sm bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs text-center transition-all block shadow-gold"
              >
                Schedule Private Fitting
              </Link>
            </div>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-lg shadow-luxury border border-slate-200">
            {sent ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold mx-auto flex items-center justify-center border border-brand-gold">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-navy">
                  Inquiry Received
                </h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto font-light">
                  Thank you. Our sartorial concierge will respond directly within four hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-navy mb-1">
                    Send a Message to the Master Cutter
                  </h3>
                  <p className="text-xs text-brand-slate-muted">
                    Inquire about wedding party commissions, special orders, or private VIP fitting sessions.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Mwangi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                      Direct Telephone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 700 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Confidential Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@enterprise.ke"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                    Sartorial Details & Inquiries *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Detail your requirements, preferred dates, or questions regarding our fabrics and construction..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold uppercase tracking-luxury rounded transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4 text-brand-gold" />
                  <span>{loading ? 'Transmitting...' : 'Transmit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
