'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gift, Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function GiftVouchersPage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(145000);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [personalNote, setPersonalNote] = useState('');
  const [purchased, setPurchased] = useState(false);

  const voucherTiers = [
    { amount: 35000, label: 'The Sartorial Shirt Commission (2 Shirts)' },
    { amount: 95000, label: 'The Tailored Cashmere Blazer' },
    { amount: 145000, label: 'The Bespoke Two-Piece Suit Experience' },
    { amount: 220000, label: 'The Three-Piece Bespoke Masterwork' },
  ];

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setPurchased(true);
  };

  return (
    <div className="min-h-screen bg-brand-canvas-alt py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Gift of Bespoke Excellence</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">
            Bespoke Gift Certificates
          </h1>
          <p className="text-xs sm:text-sm text-brand-slate-muted">
            Bestow an unforgettable tailoring experience. Delivered in a wax-sealed gold-embossed presentation box or immediate digital certificate.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-luxury border border-slate-200 p-8 sm:p-10">
          {purchased ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-14 h-14 rounded-full bg-brand-gold/10 text-brand-gold mx-auto flex items-center justify-center border border-brand-gold">
                <Check className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-brand-navy">
                Gift Certificate Registered
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-light">
                A physical wax-sealed envelope will be hand-dispatched to {recipientName}. An electronic certificate has also been emailed.
              </p>
              <div className="pt-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-brand-navy text-white text-xs font-bold uppercase tracking-luxury rounded"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePurchase} className="space-y-8">
              <div>
                <label className="block font-serif text-sm font-bold text-brand-navy uppercase tracking-luxury mb-3">
                  1. Select Experience Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {voucherTiers.map((tier) => (
                    <div
                      key={tier.amount}
                      onClick={() => setSelectedAmount(tier.amount)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedAmount === tier.amount
                          ? 'border-brand-gold bg-brand-gold/5 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-serif text-base font-bold text-brand-navy block">
                        KES {tier.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-brand-slate-muted mt-0.5 block">
                        {tier.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-serif text-sm font-bold text-brand-navy uppercase tracking-luxury mb-3">
                  2. Recipient & Message
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                      Recipient Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Victor Mutua"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                      Recipient Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="victor@conglomerate.com"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy uppercase mb-1">
                    Calligraphy Inscription (Wax-Sealed Card)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Wishing you sartorial triumph and continued elegance..."
                    value={personalNote}
                    onChange={(e) => setPersonalNote(e.target.value)}
                    className="w-full px-4 py-2 rounded border border-slate-300 text-sm focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>Valid for 24 months across all bespoke tailoring commissions</span>
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all shadow-gold flex items-center space-x-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Order Presentation Gift Box</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
