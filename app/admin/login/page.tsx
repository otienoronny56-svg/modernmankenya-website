'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Sparkles, Shield, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@modernmankenya.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-navy flex flex-col justify-center items-center px-4 relative overflow-hidden">
      {/* Editorial Luxury Ambient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark via-brand-navy to-brand-navy-dark z-0" />
      <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none z-0" />

      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-brand-gold/30 backdrop-blur-md mb-4 shadow-gold">
            <div className="relative w-12 h-12">
              <Image
                src="/images/logo-emblem.png"
                alt="Modern Man Kenya Crest"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            MODERN MAN KENYA
          </h1>
          <p className="text-xs uppercase tracking-luxury text-brand-gold font-medium mt-1">
            Atelier Management Portal
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white/95 backdrop-blur-xl rounded-lg p-6 sm:p-8 shadow-2xl border border-white/20">
          <div className="mb-6">
            <h2 className="font-serif text-xl font-bold text-brand-navy">
              Sartorial Administration
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Sign in to manage outfits, upload photography, and adjust pricing.
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-start space-x-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@modernmankenya.com"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors text-brand-navy"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Master Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter passcode"
                  className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold transition-colors text-brand-navy"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Helper Credentials Note */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded text-[11px] text-amber-900 flex items-start space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold">Initial Master Passcode:</span>{' '}
                <code className="bg-amber-100 px-1 py-0.5 rounded text-brand-navy font-mono font-bold">
                  ModernMan@2026!
                </code>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-brand-navy hover:bg-brand-navy-dark text-white rounded font-bold uppercase tracking-luxury text-xs transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Authenticate Portal</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Footer */}
        <div className="mt-6 text-center text-slate-400 text-xs flex items-center justify-center space-x-1.5">
          <Shield className="w-3.5 h-3.5 text-brand-gold" />
          <span>Encrypted Atelier Admin Session • Nairobi, Kenya</span>
        </div>
      </div>
    </div>
  );
}
