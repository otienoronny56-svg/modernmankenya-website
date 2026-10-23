import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Lock, Eye, FileText, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { BRAND_PROFILE } from '@/data/brandProfile';

export const metadata: Metadata = {
  title: 'Privacy Policy | Modern Man Kenya',
  description: 'How Modern Man Kenya protects client measurements, bespoke commission details, and personal data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafafc] text-slate-900 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-2 bg-brand-gold/15 text-brand-navy border border-brand-gold/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Lock className="w-3.5 h-3.5 text-brand-gold" />
            <span>Client Confidentiality</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Your trust is our cornerstone. Learn how Modern Man Kenya collects, safeguards, and handles your bespoke measurements, personal details, and commission records.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-6">

          {/* 1. Information We Collect */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                01
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Information We Collect
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  When you schedule an appointment, consult our master tailors, or commission a bespoke suit, we collect:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-600 pt-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Personal anatomical measurements & posture notes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Name, telephone number, and email address</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Garment design preferences & cloth selections</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Fitting milestones, receipts, and order history</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. How We Use Your Information */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                02
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  How We Use Your Information
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We use your details strictly to fulfill bespoke tailoring commissions and deliver a world-class sartorial experience:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600 pt-1">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Pattern Drafting:</strong> Archiving your bespoke paper pattern profile for future repeat orders without remeasuring.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Fitting Coordination:</strong> Contacting you via telephone or WhatsApp regarding scheduled fitting sessions and completion timelines.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold flex-shrink-0 mt-0.5" />
                    <span><strong>Receipts & Verification:</strong> Issuing official payment confirmations for your 60% advance deposit and final balances.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. Non-Disclosure & Security Guarantee */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                03
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Zero Data Selling & Strict Confidentiality
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  We respect the privacy of our distinguished clientele. <strong>Modern Man Kenya will never sell, rent, monetize, or publicly disclose your personal information or contact details to third parties</strong>. All client profiles are stored on encrypted, secure servers in accordance with the Kenya Data Protection Act, 2019.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Client Rights & Contact */}
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold text-lg flex-shrink-0">
                04
              </div>
              <div className="space-y-2">
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Access & Updating Your Records
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  You have the right to request access to your measurement profile, update your contact details, or request deletion of your account at any time. Simply notify our client care team at <a href={`mailto:${BRAND_PROFILE.email}`} className="text-brand-gold underline font-semibold">{BRAND_PROFILE.email}</a>.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Navigation Box */}
        <div className="mt-12 bg-brand-navy text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-brand-gold/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Review Our Terms and Conditions
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Read our full policies on deposits, fitting adjustments, and delivery timelines.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/terms"
              className="inline-flex items-center space-x-2 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
            >
              <span>Terms and Conditions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/returns"
              className="inline-flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-5 py-2.5 rounded-lg border border-white/20 text-xs uppercase tracking-wider transition-all"
            >
              <span>Fitting & Returns</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
