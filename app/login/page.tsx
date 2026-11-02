'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, signOut, signInWithGoogle, signInWithEmail, signUpWithEmail, resetPasswordForEmail } = useAuth();

  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const redirectTarget = searchParams.get('redirect') || '/account';

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // 2FA Authentication States
  const [requires2FA, setRequires2FA] = useState(false);
  const [pending2FAEmail, setPending2FAEmail] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [verifying2FA, setVerifying2FA] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // If already logged in, check 2FA before redirecting
  useEffect(() => {
    if (user && !requires2FA) {
      const check2FA = async () => {
        try {
          const userEmail = user.email || '';
          if (!userEmail) {
            router.push(redirectTarget);
            return;
          }
          const res = await fetch(`/api/auth/2fa?email=${encodeURIComponent(userEmail)}&action=status`);
          const data = await res.json();
          if (data.enabled) {
            const isVerified = typeof window !== 'undefined' && sessionStorage.getItem(`mmk_2fa_verified_${userEmail}`);
            if (!isVerified) {
              setPending2FAEmail(userEmail);
              setRequires2FA(true);
              return;
            }
          }
          router.push(redirectTarget);
        } catch {
          router.push(redirectTarget);
        }
      };
      check2FA();
    }
  }, [user, router, redirectTarget, requires2FA]);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle(
        typeof window !== 'undefined' ? `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTarget)}` : undefined
      );
      if (error) {
        setErrorMsg(error.message || 'Unable to sign in with Google. Please try again.');
        setGoogleLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during Google sign in.');
      setGoogleLoading(false);
    }
  };

  // Handle Email Sign In / Sign Up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters long.');
        setLoading(false);
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match. Please re-enter.');
        setLoading(false);
        return;
      }

      const { error, user: newUser } = await signUpWithEmail(email, password, {
        full_name: fullName,
        phone: phoneNumber,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (newUser && !newUser.confirmed_at && newUser.identities?.length === 0) {
        setSuccessMsg('Account created! Please check your email to verify your address.');
      } else {
        setSuccessMsg('Account created successfully! Welcome to Modern Man Kenya.');
        setTimeout(() => {
          router.push(redirectTarget);
        }, 1200);
      }
      setLoading(false);

    } else {
      // Sign In
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setErrorMsg(error.message === 'Invalid login credentials' 
          ? 'Incorrect email or password. Please try again or reset your password.' 
          : error.message
        );
        setLoading(false);
        return;
      }

      // Check if user has Two-Factor Authentication (2FA) enabled
      try {
        const res = await fetch(`/api/auth/2fa?email=${encodeURIComponent(email)}&action=status`);
        const data = await res.json();
        if (data.enabled) {
          setPending2FAEmail(email);
          setRequires2FA(true);
          setSuccessMsg(null);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('2FA verification check notice:', err);
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`mmk_2fa_verified_${email}`, 'true');
      }

      setSuccessMsg('Signed in successfully. Redirecting to your atelier portal...');
      setTimeout(() => {
        router.push(redirectTarget);
      }, 800);
      setLoading(false);
    }
  };

  // Handle Two-Factor Code Verification
  const handleVerify2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!twoFactorCode.trim()) {
      setErrorMsg('Please enter your 6-digit authentication code or backup recovery code.');
      return;
    }
    setVerifying2FA(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/auth/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-login',
          email: pending2FAEmail,
          token: twoFactorCode.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Invalid 2FA code. Please check your authenticator app.');
        setVerifying2FA(false);
        return;
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(`mmk_2fa_verified_${pending2FAEmail}`, 'true');
      }

      setSuccessMsg('Two-Factor Authentication verified. Accessing atelier portal...');
      setTimeout(() => {
        router.push(redirectTarget);
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Verification error occurred.');
    } finally {
      setVerifying2FA(false);
    }
  };

  // Handle Forgot Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg('Please enter your email address to receive password reset instructions.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    const { error } = await resetPasswordForEmail(email);
    setLoading(false);
    if (error) {
      setErrorMsg(error.message);
    } else {
      setResetEmailSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-md w-full mx-auto space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block group focus:outline-hidden" aria-label="Modern Man Kenya Home">
            <div className="relative w-36 h-24 sm:w-44 sm:h-28 mx-auto transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-full.png"
                alt="Modern Man Kenya"
                fill
                sizes="176px"
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
              {mode === 'signin' ? 'Welcome Back' : 'Create Your Client Account'}
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-light">
              {mode === 'signin'
                ? 'Sign in to access your fitting appointments, saved orders, and sartorial profile.'
                : 'Join Modern Man Kenya for saved measurements, appointment tracking, and bespoke client services.'}
            </p>
          </div>
        </div>

        {/* Main Card */}
        {requires2FA ? (
          <div className="bg-white rounded-2xl shadow-luxury border border-stone-200/80 p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-brand-gold/15 text-brand-gold border border-brand-gold/40 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-brand-navy" />
              </div>
              <h2 className="font-serif text-xl font-bold text-brand-navy">
                Two-Factor Security Verification
              </h2>
              <p className="text-xs text-stone-600">
                Enter the 6-digit code from your authenticator app (Google Authenticator, Microsoft Authenticator, 1Password) or an emergency backup code.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleVerify2FA} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 text-center">
                  6-Digit Authentication Code or Backup Code
                </label>
                <input
                  type="text"
                  maxLength={12}
                  placeholder="000 000"
                  autoFocus
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full text-center text-xl sm:text-2xl font-mono tracking-widest px-4 py-3 bg-stone-50 border border-stone-300 rounded-xl focus:outline-hidden focus:border-brand-navy focus:bg-white transition-all text-brand-navy font-bold"
                />
                <p className="text-[11px] text-stone-400 text-center mt-1.5">
                  Securing measurements & delivery data for {pending2FAEmail}
                </p>
              </div>

              <button
                type="submit"
                disabled={verifying2FA}
                className="w-full py-3 px-4 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm disabled:opacity-60"
              >
                {verifying2FA ? (
                  <span>Verifying Code...</span>
                ) : (
                  <>
                    <span>Verify & Continue</span>
                    <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={async () => {
                  setRequires2FA(false);
                  setTwoFactorCode('');
                  setErrorMsg(null);
                  await signOut();
                }}
                className="w-full text-center text-xs text-stone-500 hover:text-stone-800 underline transition-colors pt-2"
              >
                Cancel & Sign in with a different account
              </button>
            </form>
          </div>
        ) : (
        <div className="bg-white rounded-2xl shadow-luxury border border-stone-200/80 p-6 sm:p-8 space-y-6">
          
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
            <button
              type="button"
              onClick={() => {
                setMode('signin');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-brand-navy text-brand-gold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-brand-navy text-brand-gold shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Feedback Notices */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. Google OAuth Button */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading || loading}
              className="w-full py-3 px-4 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-semibold text-xs sm:text-sm flex items-center justify-center space-x-3 transition-all shadow-xs hover:border-stone-400 active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {googleLoading ? (
                <div className="w-5 h-5 border-2 border-brand-navy border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
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
                {googleLoading
                  ? 'Connecting to Google...'
                  : mode === 'signin'
                  ? 'Continue with Google'
                  : 'Sign up with Google'}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-stone-200 w-full" />
            <span className="bg-white px-3 text-[11px] uppercase tracking-wider text-stone-400 font-medium">
              or with email
            </span>
            <div className="border-t border-stone-200 w-full" />
          </div>

          {/* 2. Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Mwangi"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-stone-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
              </div>
            </div>

            {/* Phone Number (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Phone / WhatsApp <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. 0712 345 678"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-stone-700">
                  Password <span className="text-red-500">*</span>
                </label>
                {mode === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setForgotPasswordOpen(!forgotPasswordOpen);
                      setErrorMsg(null);
                    }}
                    className="text-[11px] text-brand-gold hover:underline font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up only) */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm text-stone-900 focus:outline-hidden focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-all"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || googleLoading}
                className="w-full py-3.5 px-4 bg-brand-navy hover:bg-slate-900 text-brand-gold font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{mode === 'signin' ? 'Sign In to Modern Man' : 'Create Client Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Forgot Password Drawer / Modal */}
          {forgotPasswordOpen && (
            <div className="p-4 rounded-xl bg-stone-50 border border-brand-gold/30 space-y-3 animate-in fade-in">
              <h3 className="font-serif text-sm font-bold text-brand-navy">
                Reset Your Password
              </h3>
              <p className="text-xs text-stone-600 font-light">
                Enter your account email address. We will send you a secure link to create a new password.
              </p>
              {resetEmailSent ? (
                <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Check your inbox for password reset instructions!</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full py-2 px-3 bg-brand-gold text-brand-navy text-xs font-bold rounded-lg hover:bg-brand-gold-light transition-all"
                >
                  Send Reset Link
                </button>
              )}
            </div>
          )}

        </div>
        )}

        {/* Security & Support Note */}
        <div className="text-center space-y-2 text-xs text-stone-500">
          <div className="flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-gold" />
            <span>Encrypted & Protected by Modern Man Kenya Client Security</span>
          </div>
          <p>
            By continuing, you agree to our{' '}
            <Link href="/terms" className="text-stone-700 hover:text-brand-gold underline">
              Terms and Conditions
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-stone-700 hover:text-brand-gold underline">
              Privacy Policy
            </Link>.
          </p>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  );
}
