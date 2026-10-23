import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Clock, CheckCircle2, Phone, AlertCircle, FileText, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service & Bespoke Commission | Modern Man Kenya',
  description: 'Official Terms of Service and Bespoke Commission Policy for Modern Man Kenya Nairobi Atelier.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/15 text-brand-navy border border-brand-gold/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Official Atelier Policy</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Transparent, professional guidelines governing all bespoke commissions, ready-to-wear orders, and atelier services at Modern Man Kenya.
          </p>
        </div>

        {/* Core Terms Cards */}
        <div className="space-y-6">
          
          {/* 1. Deposit Payment */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <span className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                01
              </span>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Deposit Payment Requirement
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  A <strong>60% advance payment</strong> is a mandatory requirement to place your commission order. Payment must be made <strong>STRICTLY via mobile money (Paybill / Till)</strong>. Please ensure an official receipt is issued for the same upon confirmation.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Details Verification */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <span className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                02
              </span>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Details Verification
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Please take time to verify all agreed-upon details—including <strong>design specifications, fabric choice, measurements, and delivery timelines</strong>—regarding your order before leaving our premises or making your deposit payment.
                </p>
              </div>
            </div>
          </div>

          {/* 3. Fitting & Adjustments */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <span className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                03
              </span>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Fitting & Garment Adjustments
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We strive to provide our clients with superior quality products, impeccable cuts, and master finishing on all garments. Hence, <strong>all our garments are subjected to FITTING & ADJUSTMENTS before collection</strong>. Please ensure that your garment is in good form as ordered before you collect and leave our atelier.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Dispute Resolution */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <span className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                04
              </span>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Dispute Resolution Timeline
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Any arising disputes shall be raised and dealt with <strong>WITHIN TWO (2) WEEKS</strong> from the date of fitting or collection. Any dispute raised thereafter shall be deemed null and void.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Order Collection & Storage */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <span className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
                05
              </span>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Order Collection & Storage Policy
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Items not collected or claimed within <strong>TWO (2) MONTHS</strong> from the provided date of collection shall be deemed forfeited and shall hence be disposed of. The management shall not be held liable for unclaimed garments past this period.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Feedback & Management Concierge */}
        <div className="mt-12 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-brand-gold/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                Client Relations & Feedback
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Direct Management Concierge
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                For feedback, complaints, or direct queries regarding your commission, our atelier management is available to assist you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href="tel:+254718923082"
                className="inline-flex items-center justify-center space-x-2 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold px-6 py-3 rounded-lg transition-colors shadow-md text-sm whitespace-nowrap"
              >
                <Phone className="w-4 h-4" />
                <span>Call: 0718 923 082</span>
              </a>
              <Link
                href="/returns"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors text-sm whitespace-nowrap"
              >
                <span>Return Policy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-slate-400">
            <span>Modern Man Kenya • Executive Management</span>
            <span>Tel: +254 718 923 082</span>
          </div>
        </div>

      </div>
    </div>
  );
}
