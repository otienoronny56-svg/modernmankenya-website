'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  MessageSquare,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  X,
  Mail,
  MapPin,
  Calendar,
} from 'lucide-react';
import { LAUNCH_CONFIG } from '@/lib/config/launch';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function PreLaunchPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Waitlist form state
  const [contact, setContact] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Staff / VIP Passcode Modal State
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState('');
  const [isVerifyingPasscode, setIsVerifyingPasscode] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const targetDate = new Date(LAUNCH_CONFIG.launchDate).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/prelaunch/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: contact.trim(), fullName: fullName.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setContact('');
        setFullName('');
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setSubmitError('Connection error. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStaffUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setIsVerifyingPasscode(true);
    setPasscodeError('');

    try {
      const res = await fetch('/api/prelaunch/bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Reload page to enter full website
        window.location.href = '/';
      } else {
        setPasscodeError(data.error || 'Incorrect passcode. Try again.');
      }
    } catch (err) {
      setPasscodeError('Error validating passcode.');
    } finally {
      setIsVerifyingPasscode(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${LAUNCH_CONFIG.conciergeWhatsApp}?text=${encodeURIComponent(
    'Hello Modern Man Kenya, I would like to inquire about a custom bespoke suit before the official launch on November 17.'
  )}`;

  return (
    <div className="min-h-screen bg-[#050A14] text-white flex flex-col justify-between selection:bg-brand-gold selection:text-brand-navy relative overflow-hidden font-sans">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-b from-brand-gold/15 via-brand-navy/30 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-brand-navy/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header / Brand Crest */}
      <header className="relative z-10 pt-8 pb-4 px-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-navy/80 border border-brand-gold/50 flex items-center justify-center shadow-lg p-1.5">
            <Image
              src="/images/logo-emblem.png"
              alt="Modern Man Kenya Crest"
              width={36}
              height={36}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-brand-gold uppercase block">
              Modern Man Kenya
            </span>
            <span className="text-xs sm:text-sm font-serif font-bold text-white tracking-wide">
              Bespoke Menswear Atelier
            </span>
          </div>
        </div>

        {/* WhatsApp Quick Touch Link */}
        <a
          href={whatsappInquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-brand-gold/40 text-brand-gold text-xs font-bold tracking-wider uppercase transition-all duration-300"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Atelier WhatsApp Concierge</span>
        </a>
      </header>

      {/* Main Center Stage */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 max-w-4xl mx-auto text-center w-full">
        {/* Luxury Eyebrow Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/40 text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Official Grand Opening • November 17, 2026</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white max-w-3xl leading-[1.15] mb-4">
          Where Fit Meets Character.
        </h1>

        {/* Clean, Warm Luxury Description */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed mb-8">
          Nairobi’s premier destination for hand-cut bespoke suits, executive tuxedos, and tailored African wear. We are putting the final touches on our digital atelier.
        </p>

        {/* Live Countdown Timer Grid */}
        <div className="w-full max-w-2xl mb-10">
          <div className="text-[11px] uppercase tracking-[0.25em] text-brand-gold/80 font-bold mb-3 flex items-center justify-center space-x-2">
            <Clock className="w-3.5 h-3.5 text-brand-gold" />
            <span>Grand Launch Countdown</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
            {[
              { label: 'Days', value: mounted ? timeLeft.days : 14 },
              { label: 'Hours', value: mounted ? timeLeft.hours : 0 },
              { label: 'Minutes', value: mounted ? timeLeft.minutes : 0 },
              { label: 'Seconds', value: mounted ? timeLeft.seconds : 0 },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-[#0A1326]/90 backdrop-blur-md rounded-2xl border border-brand-gold/40 p-3 sm:p-5 flex flex-col items-center justify-center shadow-xl group hover:border-brand-gold transition-colors"
              >
                {/* Subtle top gold accent */}
                <div className="absolute -top-[1px] left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />
                <span className="font-serif text-2xl sm:text-4xl md:text-5xl font-black text-brand-gold tracking-tight tabular-nums">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="text-[9px] sm:text-xs uppercase font-bold tracking-widest text-slate-400 mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* VIP Early Invitation Form / WhatsApp Action */}
        <div className="w-full max-w-xl bg-gradient-to-b from-[#0E1A33] to-[#0A1326] p-6 sm:p-8 rounded-3xl border border-brand-gold/50 shadow-2xl space-y-5">
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
              Be Among the First to Enter
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Register for exclusive launch-week tailoring invitations, inaugural offers, and private appointments.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-emerald-200 text-xs sm:text-sm flex items-center justify-center space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>
                You’re on the VIP list! We will notify you when doors officially open on November 17.
              </span>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Ronny Otieno)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-brand-gold transition-colors"
                />
                <input
                  type="text"
                  required
                  placeholder="Phone or Email (e.g. 0712... / email)"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-brand-gold transition-colors"
                />
              </div>

              {submitError && (
                <p className="text-rose-400 text-xs text-left">{submitError}</p>
              )}

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider hover:opacity-95 active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-brand-navy" />
                  <span>{isSubmitting ? 'Registering...' : 'Request VIP Opening Invite'}</span>
                  <ArrowRight className="w-4 h-4 text-brand-navy" />
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </form>
          )}

          {/* Quick Pillars */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
            <div>
              <span className="block text-brand-gold font-bold text-xs">Hand-Cut</span>
              <span className="text-[10px] text-slate-400">Full Canvas Craft</span>
            </div>
            <div>
              <span className="block text-brand-gold font-bold text-xs">Over 5,000</span>
              <span className="text-[10px] text-slate-400">Wool &amp; Silk Fabrics</span>
            </div>
            <div>
              <span className="block text-brand-gold font-bold text-xs">Nairobi</span>
              <span className="text-[10px] text-slate-400">Private Atelier Fitting</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer & Discreet Staff/VIP Bypass */}
      <footer className="relative z-10 py-6 px-6 border-t border-white/10 max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left gap-1">
          <span className="flex items-center space-x-1.5 text-slate-300 font-medium">
            <MapPin className="w-3.5 h-3.5 text-brand-gold" />
            <span>{LAUNCH_CONFIG.atelierLocation}</span>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>Open: {LAUNCH_CONFIG.atelierHours}</span>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-[11px] text-slate-400">
            &copy; {new Date().getFullYear()} Modern Man Kenya. All rights reserved.
          </span>

          {/* Discreet Staff / Testing Door */}
          <button
            onClick={() => setIsStaffModalOpen(true)}
            className="text-[11px] text-slate-400 hover:text-brand-gold flex items-center space-x-1 transition-colors cursor-pointer"
            title="Atelier Staff & Internal Testing Access"
          >
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Staff Entrance</span>
          </button>
        </div>
      </footer>

      {/* Staff / VIP Passcode Modal */}
      {isStaffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#0A1226] border border-brand-gold/60 rounded-3xl p-6 sm:p-8 text-white shadow-2xl space-y-4">
            <button
              onClick={() => setIsStaffModalOpen(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-brand-gold/20 border border-brand-gold/50 flex items-center justify-center text-brand-gold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Atelier Preview Access</h3>
                <p className="text-xs text-slate-400">Enter passcode to preview and test the complete site</p>
              </div>
            </div>

            <form onSubmit={handleStaffUnlock} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-gold uppercase tracking-wider mb-1.5">
                  VIP Passcode
                </label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="Enter preview passcode..."
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-brand-gold/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-brand-gold transition-colors"
                />
                {passcodeError && (
                  <p className="text-rose-400 text-xs mt-1.5">{passcodeError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isVerifyingPasscode}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-gold via-amber-300 to-brand-gold text-brand-navy font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md disabled:opacity-50 cursor-pointer"
              >
                {isVerifyingPasscode ? 'Verifying...' : 'Unlock Full Website'}
              </button>
            </form>

            <div className="pt-2 text-center border-t border-white/10">
              <Link
                href="/admin/login"
                className="text-xs text-brand-gold hover:underline inline-flex items-center space-x-1"
              >
                <span>Looking for the Admin Portal? Click here</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

