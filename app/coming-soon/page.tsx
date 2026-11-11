'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MessageSquare, CheckCircle2, Mail, MapPin, Sun, Moon } from 'lucide-react';
import { LAUNCH_CONFIG } from '@/lib/config/launch';
import { supabase } from '@/lib/supabase/client';

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
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  // Registration state
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    setMounted(true);

    // Retrieve saved theme preference (default to white mode)
    const savedTheme = localStorage.getItem('mm_prelaunch_theme') as 'dark' | 'light';
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    } else {
      setTheme('light');
    }

    // Check if redirected from Google OAuth
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('registered') === 'google') {
        setSubmitSuccess(true);
      }
    }

    // Live Countdown calculation
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

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('mm_prelaunch_theme', nextTheme);
  };

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

  const handleGoogleRegister = async () => {
    setIsGoogleLoading(true);
    setSubmitError('');

    try {
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/coming-soon?registered=google`,
        },
      });

      if (error) {
        setSubmitError('Google sign-in is pending configuration. Please enter your email below.');
        setIsGoogleLoading(false);
      }
    } catch (err) {
      setSubmitError('Unable to connect to Google. Please enter your email below.');
      setIsGoogleLoading(false);
    }
  };

  const whatsappInquiryUrl = `https://wa.me/${LAUNCH_CONFIG.conciergeWhatsApp}?text=${encodeURIComponent(
    'Hello Modern Man Kenya, I would like to inquire about a bespoke suit before the November 17 launch.'
  )}`;

  const isLight = theme === 'light';

  return (
    <div
      className={`h-[100dvh] max-h-[100dvh] w-screen overflow-hidden flex flex-col justify-between items-center px-3.5 py-3 sm:px-6 sm:py-5 transition-colors duration-300 font-sans select-none overscroll-none ${
        isLight
          ? 'bg-[#FAF9F6] text-slate-900'
          : 'bg-[#0A0B10] text-white'
      }`}
    >
      {/* Subtle atmospheric radial glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] rounded-full blur-3xl pointer-events-none transition-opacity duration-500 ${
          isLight ? 'bg-amber-100/40 opacity-70' : 'bg-[#1B1464]/25 opacity-100'
        }`}
      />

      {/* Top Header: Sleek Theme Switcher */}
      <header className="w-full max-w-sm sm:max-w-md flex justify-end items-center relative z-10 flex-shrink-0">
        <button
          onClick={toggleTheme}
          className={`flex items-center space-x-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all shadow-xs cursor-pointer border ${
            isLight
              ? 'bg-white border-slate-200 text-slate-700 hover:text-brand-navy hover:border-brand-gold/50'
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-brand-gold hover:border-brand-gold/50'
          }`}
          aria-label="Toggle light or dark theme"
        >
          {isLight ? (
            <>
              <Moon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-navy" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-gold" />
              <span>White Mode</span>
            </>
          )}
        </button>
      </header>

      {/* Main Centerpiece Content: Fully Proportioned for Mobile & Desktop */}
      <main className="relative z-10 max-w-[340px] sm:max-w-md w-full text-center space-y-2.5 sm:space-y-4 my-auto flex-shrink-0">
        {/* Official Modern Man Logo */}
        <div className="flex justify-center">
          <div className="relative w-40 sm:w-52 h-14 sm:h-18">
            <Image
              src="/images/logo-full.png"
              alt="Modern Man Kenya"
              fill
              className={`object-contain transition-all duration-300 ${
                isLight
                  ? 'filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.12)]'
                  : 'filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]'
              }`}
              priority
            />
          </div>
        </div>

        {/* Clean Headline & Subtitle */}
        <div className="space-y-0.5">
          <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase text-brand-gold block">
            Digital Atelier Launch
          </span>
          <h1 className="font-serif text-lg sm:text-2xl font-bold tracking-tight leading-tight">
            Opening November 17, 2026
          </h1>
          <p
            className={`text-[11px] sm:text-xs ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Where Fit Meets Character. Custom made-to-measure suiting.
          </p>
        </div>

        {/* Clean 4-Card Luxury Countdown Timer */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5 max-w-[300px] sm:max-w-sm mx-auto pt-0.5">
          {[
            { label: 'Days', value: mounted ? timeLeft.days : 14 },
            { label: 'Hours', value: mounted ? timeLeft.hours : 0 },
            { label: 'Mins', value: mounted ? timeLeft.minutes : 0 },
            { label: 'Secs', value: mounted ? timeLeft.seconds : 0 },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-lg sm:rounded-xl p-1.5 sm:p-2.5 flex flex-col items-center justify-center border transition-colors shadow-xs ${
                isLight
                  ? 'bg-white border-brand-gold/30 shadow-[0_2px_8px_rgba(0,0,0,0.04)]'
                  : 'bg-[#12131C] border-brand-gold/30'
              }`}
            >
              <span className="font-serif text-lg sm:text-2xl font-bold text-brand-gold tabular-nums leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span
                className={`text-[8px] sm:text-[9px] uppercase font-bold tracking-wider mt-1 ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Registration Actions (Google OAuth + Email/Phone + WhatsApp) */}
        <div className="space-y-1.5 sm:space-y-2 pt-0.5 max-w-[300px] sm:max-w-sm mx-auto">
          {submitSuccess ? (
            <div
              className={`p-2.5 sm:p-3 rounded-xl border text-xs flex items-center justify-center space-x-2 animate-in fade-in ${
                isLight
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                  : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="font-medium text-[11px] sm:text-xs">
                You’re on the VIP list. We will notify you on launch day!
              </span>
            </div>
          ) : (
            <>
              {/* Option 1: Continue with Google Button */}
              <button
                type="button"
                onClick={handleGoogleRegister}
                disabled={isGoogleLoading || isSubmitting}
                className={`w-full py-2 sm:py-2.5 px-3 rounded-lg border font-semibold text-[11px] sm:text-xs flex items-center justify-center space-x-2 transition-all shadow-xs cursor-pointer disabled:opacity-50 active:scale-[0.99] ${
                  isLight
                    ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
                    : 'bg-[#12131C] hover:bg-[#181926] border-white/15 text-white'
                }`}
              >
                {isGoogleLoading ? (
                  <div className="w-3.5 h-3.5 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                ) : (
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                )}
                <span>
                  {isGoogleLoading ? 'Connecting to Google...' : 'Register with Google'}
                </span>
              </button>

              {/* Minimal Divider */}
              <div className="relative flex items-center justify-center my-0.5">
                <div
                  className={`border-t w-full ${
                    isLight ? 'border-slate-200' : 'border-white/10'
                  }`}
                />
                <span
                  className={`px-2 text-[8px] sm:text-[9px] uppercase tracking-wider font-semibold ${
                    isLight ? 'bg-[#FAF9F6] text-slate-400' : 'bg-[#0A0B10] text-slate-500'
                  }`}
                >
                  or with email / phone
                </span>
              </div>

              {/* Option 2: Email / Phone Input Form */}
              <form onSubmit={handleWaitlistSubmit} className="flex gap-1.5">
                <input
                  type="text"
                  required
                  placeholder="Enter phone or email..."
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className={`flex-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[11px] sm:text-xs focus:outline-none focus:border-brand-gold transition-colors ${
                    isLight
                      ? 'bg-white border border-slate-300 text-slate-900 placeholder-slate-400'
                      : 'bg-white/5 border border-white/15 text-white placeholder-slate-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1 shadow-xs disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  <Mail className="w-3 h-3" />
                  <span>{isSubmitting ? '...' : 'Register'}</span>
                </button>
              </form>
            </>
          )}

          {submitError && (
            <p className="text-rose-500 text-[10px] sm:text-[11px] text-center">{submitError}</p>
          )}

          {/* Option 3: WhatsApp Consultation */}
          <a
            href={whatsappInquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 sm:py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </main>

      {/* Verified Official Location & Copyright (Bottom, Single Line) */}
      <footer className="w-full max-w-sm sm:max-w-md text-center text-xs space-y-0.5 flex-shrink-0 relative z-10 pt-1 pb-0.5">
        <div
          className={`flex items-center justify-center space-x-1 text-[10px] sm:text-[11px] font-medium ${
            isLight ? 'text-slate-600' : 'text-slate-400'
          }`}
        >
          <MapPin className="w-3 h-3 text-brand-gold flex-shrink-0" />
          <span className="truncate">
            Trust Mansion, 1st Flr, opp. City Market, Tubman Rd, Nairobi
          </span>
        </div>
        <div
          className={`text-[8px] sm:text-[9px] ${
            isLight ? 'text-slate-500' : 'text-slate-500'
          }`}
        >
          &copy; {new Date().getFullYear()} Modern Man Kenya. Designed and engineered by{' '}
          <a
            href="https://eyelobetech.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-1 hover:text-brand-gold transition-colors"
          >
            Eyelobe
          </a>
        </div>
      </footer>
    </div>
  );
}
