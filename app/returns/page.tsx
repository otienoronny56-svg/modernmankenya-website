import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Scissors, CheckCircle2, Clock, Phone, AlertTriangle, ArrowLeft, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Fitting, Adjustment & Return Policy | Modern Man Kenya',
  description: 'Bespoke tailoring fitting guarantee, adjustments policy, and return guidelines at Modern Man Kenya.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/15 text-brand-navy border border-brand-gold/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Scissors className="w-4 h-4 text-brand-gold" />
            <span>Craftsmanship Guarantee</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight">
            Fitting & Return Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Our atelier is dedicated to impeccable fit and sartorial excellence. Review our structured fitting, adjustment, and dispute resolution guidelines below.
          </p>
        </div>

        {/* Policy Grid */}
        <div className="space-y-6">

          {/* Mandatory Fitting Stage */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Scissors className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Fitting & Fine Adjustments Guarantee
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We strive to provide our clients with exceptional quality products, design accuracy, and refined finishing across every garment. Consequently, <strong>all bespoke commissions are subjected to in-person FITTING & ADJUSTMENTS before collection</strong>. Our master tailors perform exact alterations until your silhouette reflects our atelier standard.
                </p>
                <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3.5 text-xs text-brand-navy mt-3 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span>Clients must confirm that their garment is in good form and satisfactory fit before leaving our premises.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dispute Resolution Window */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                <Clock className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Two-Week Resolution Window
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Any arising adjustments or disputes regarding craftsmanship, sizing, or finish must be raised and brought to our attention <strong>WITHIN TWO (2) WEEKS</strong> from the date of fitting or garment collection. Any claim or request raised thereafter shall be deemed null and void.
                </p>
              </div>
            </div>
          </div>

          {/* Bespoke Custom Nature */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Custom Commissions & Deposits
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Because each bespoke piece is individually hand-drafted and custom-cut to your personal measurements and chosen cloth, the <strong>60% advance deposit</strong> covers cloth reservation, personalized pattern drafting, and bench labor. Full verification of fabric, design, and timelines takes place prior to deposit.
                </p>
              </div>
            </div>
          </div>

          {/* Uncollected Orders Policy */}
          <div className="bg-white rounded-xl border border-amber-200/80 p-6 sm:p-8 shadow-sm bg-amber-50/20">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Collection Deadline (2 Months)
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Finished garments not collected or claimed within <strong>TWO (2) MONTHS</strong> from the agreed collection date shall be deemed forfeited and will be disposed of. Modern Man Kenya management holds no liability for uncollected items beyond this timeline.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Contact Management for Inquiries */}
        <div className="mt-12 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-brand-gold/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gold">
                Have a Question About Your Fitting?
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Client Care & Feedback
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Our management is available to coordinate appointment timings, fitting adjustments, and delivery updates.
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
                href="/terms"
                className="inline-flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors text-sm whitespace-nowrap"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Terms and Conditions</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
