'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, ShieldCheck, User, ArrowRight, X, Lock } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

export const MemberVisitPrompt: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const pathname = usePathname();

  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  // Do not show on auth pages or admin pages
  const isAuthOrAdmin =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/account') ||
    pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAuthOrAdmin || loading) {
      setVisible(false);
      return;
    }

    // Check if dismissed in this session
    const isDismissed = typeof window !== 'undefined' && sessionStorage.getItem('mmk_visit_prompt_dismissed') === 'true';
    if (isDismissed) {
      setMinimized(true);
      setVisible(true);
      return;
    }

    // Appear after 1.2s on visit
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, [pathname, isAuthOrAdmin, loading]);

  const handleDismiss = () => {
    setMinimized(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mmk_visit_prompt_dismissed', 'true');
    }
  };

  const handleReopen = () => {
    setMinimized(false);
  };

  if (!visible || isAuthOrAdmin) return null;

  // Minimized Floating Pill (Tiny, golden, noticeable in bottom-left)
  if (minimized) {
    return (
      <button
        onClick={handleReopen}
        className="fixed bottom-6 left-6 z-40 px-3.5 py-2 rounded-full bg-brand-navy/95 backdrop-blur-md text-brand-gold border border-brand-gold/60 shadow-luxury flex items-center space-x-2 hover:bg-slate-900 hover:scale-105 transition-all text-xs font-bold cursor-pointer animate-in fade-in slide-in-from-bottom-2"
        title="Open Atelier Member Prompt"
      >
        <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-pulse" />
        <span className="tracking-wide">
          {user ? 'My Client Dashboard' : 'Atelier Member Access'}
        </span>
      </button>
    );
  }

  // Expanded Tiny Luxury Prompt Card
  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 max-w-[340px] sm:max-w-[370px] w-full animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="relative bg-[#0A1128]/95 backdrop-blur-xl rounded-2xl border border-brand-gold/70 shadow-2xl p-4 text-white space-y-3">
        
        {/* Subtle Gold Shimmer Top Bar */}
        <div className="absolute -top-[1px] left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center border border-brand-gold/40">
              {user ? (
                <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
              )}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-luxury text-brand-gold">
              {user ? 'Atelier Patron' : 'Modern Man Atelier'}
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label="Dismiss prompt"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Content for Logged-In User */}
        {user ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-200 leading-relaxed">
              Welcome back, <strong className="text-brand-gold">{profile?.fullName?.split(' ')[0] || 'Sir'}</strong>. Would you like to access your <strong>Client Dashboard</strong> to review previous orders, active statuses, or check your 35-point bespoke measurements?
            </p>

            <div className="flex items-center space-x-2 pt-1">
              <Link
                href="/account"
                onClick={handleDismiss}
                className="flex-1 py-2 px-3 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Open Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>

              <button
                onClick={handleDismiss}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold transition-colors"
              >
                Later
              </button>
            </div>
          </div>
        ) : (
          /* Content for New / Guest Visitor */
          <div className="space-y-2.5">
            <p className="text-xs text-slate-200 leading-relaxed">
              Welcome to <strong>Modern Man Kenya</strong>. Would you like to sign in as a bespoke member to access your private measurement blueprint and orders?
            </p>

            {/* Strict Security Policy Notice */}
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10.5px] text-amber-200/90 flex items-start space-x-1.5">
              <Lock className="w-3 h-3 text-brand-gold flex-shrink-0 mt-0.5" />
              <span>
                <strong>Strict Atelier Security:</strong> New client accounts are activated only upon administrator verification.
              </span>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <Link
                href="/login?redirect=/account"
                onClick={handleDismiss}
                className="flex-1 py-2 px-3 rounded-xl bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-sm"
              >
                <span>Sign In as Member</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Link>

              <button
                onClick={handleDismiss}
                className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-semibold transition-colors"
              >
                Browse Store
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

