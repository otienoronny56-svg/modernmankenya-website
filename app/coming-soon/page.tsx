'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, CheckCircle2, Mail, MapPin } from 'lucide-react';
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

  // VIP Waitlist state
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = (): TimeLeft => {
      const targetDate = new Date(LAUNCH_CONFIG.launchDate).getTime();
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
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
        body: JSON.stringify({ contact: contact.trim() }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitSuccess(true);
        setContact('');
      } else {
        setSubmitError(data.error || 'Failed to submit. Please try again.');
      }
    } catch (err) {
      setSubmitError('Connection error. Please try WhatsApp directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${LAUNCH_CONFIG.conciergeWhatsApp}?text=${encodeURIComponent(
    'Hello Modern Man Kenya, I would like to inquire about a bespoke suit before the November 17 launch.'
  )}`;

  return (
    <div className="min-h-screen bg-[#0A0B10] text-white flex flex-col justify-between items-center p-6 sm:p-10 relative overflow-hidden font-sans select-none">
      {/* Subtle brand navy atmospheric glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#1B1464]/25 via-transparent to-transparent blur-3xl pointer-events-none" />

      {/* Top spacer */}
      <div className="w-full h-4" />

      {/* Centerpiece Container */}
      <div className="relative z-10 max-w-md w-full text-center space-y-7 my-auto">
        {/* Official Modern Man Logo */}
        <div className="flex justify-center">
          <div className="relative w-56 sm:w-64 h-24 sm:h-28">
            <Image
              src="/images/logo-full.png"
              alt="Modern Man Kenya"
              fill
              className="object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              priority
            />
          </div>
        </div>

        {/* Clean Headline & Subtitle */}
        <div className="space-y-1.5">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-brand-gold block">
            Digital Atelier Launch
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Opening November 17, 2026
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Where Fit Meets Character. Custom made-to-measure tailoring.
          </p>
        </div>

        {/* Clean 4-Card Luxury Countdown Timer */}
        <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-1">
          {[
            { label: 'Days', value: mounted ? timeLeft.days : 14 },
            { label: 'Hours', value: mounted ? timeLeft.hours : 0 },
            { label: 'Minutes', value: mounted ? timeLeft.minutes : 0 },
            { label: 'Seconds', value: mounted ? timeLeft.seconds : 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#12131C] border border-brand-gold/30 rounded-xl p-3 sm:p-4 flex flex-col items-center justify-center shadow-lg"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-gold tabular-nums">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Clean Action Section (Register Form + WhatsApp Button) */}
        <div className="space-y-3 pt-2">
          {submitSuccess ? (
            <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>You are registered for opening notifications.</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="Enter phone or email..."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-brand-gold transition-colors"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-md disabled:opacity-50 cursor-pointer whitespace-nowrap"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Saving...' : 'Register'}</span>
              </button>
            </form>
          )}

          {submitError && (
            <p className="text-rose-400 text-xs text-center">{submitError}</p>
          )}

          {/* Direct WhatsApp Consultation Button */}
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Clean, Verified Location & Brand Tagline */}
      <div className="relative z-10 text-center space-y-1 text-slate-500 text-xs pt-4">
        <div className="flex items-center justify-center space-x-1.5 text-slate-400">
          <MapPin className="w-3 h-3 text-brand-gold" />
          <span>Trust Mansion, 1st Floor, opp. City Market, Tubman Road, Nairobi</span>
        </div>
        <div className="text-[10px] text-slate-600">
          &copy; {new Date().getFullYear()} Modern Man Kenya. Opulence • Simplicity • Class.
        </div>
      </div>
    </div>
  );
}
