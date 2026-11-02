'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  User,
  ShoppingBag,
  Ruler,
  ShieldCheck,
  MapPin,
  Sparkles,
  CheckCircle2,
  Clock,
  Truck,
  Phone,
  MessageSquare,
  Copy,
  ExternalLink,
  Edit3,
  Save,
  AlertCircle,
  Lock,
  Key,
  ArrowRight,
  Calendar,
  RefreshCw,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { formatCurrencyPrice } from '@/lib/currency';
import { supabase } from '@/lib/supabase/client';
import type { StoredOrder } from '@/app/api/orders/route';
import type { ClientMeasurementProfile } from '@/lib/clients/store';

export default function ClientDashboardPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<'orders' | 'measurements' | 'saved_info' | 'security'>('orders');
  const [clientData, setClientData] = useState<ClientMeasurementProfile | null>(null);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // Editable Saved Info Form States
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryTown, setDeliveryTown] = useState('');
  const [deliveryStreet, setDeliveryStreet] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Editable Style Preferences
  const [fitStyle, setFitStyle] = useState<'slim_bespoke' | 'contemporary_tailored' | 'classic_comfort'>('contemporary_tailored');
  const [shoulderSlope, setShoulderSlope] = useState<'normal' | 'sloping' | 'square'>('normal');
  const [lapelPreference, setLapelPreference] = useState<'peak_lapel' | 'notch_lapel' | 'shawl_collar'>('peak_lapel');
  const [jacketVents, setJacketVents] = useState<'double_side_vents' | 'center_vent' | 'ventless'>('double_side_vents');
  const [trouserBreak, setTrouserBreak] = useState<'no_break' | 'slight_break' | 'medium_break' | 'full_break'>('slight_break');
  const [monogramInitials, setMonogramInitials] = useState('');
  const [styleNotes, setStyleNotes] = useState('');

  // Editable Measurements
  const [measurementUnit, setMeasurementUnit] = useState<'inches' | 'cm'>('inches');
  const [measurements, setMeasurements] = useState<Record<string, any>>({});

  // 2FA Security State
  const [twoFactorStatus, setTwoFactorStatus] = useState<{ enabled: boolean; method?: string }>({ enabled: false });
  const [setup2FAData, setSetup2FAData] = useState<{ secret: string; backupCodes: string[]; otpauthUri: string } | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [twoFactorLoading, setTwoFactorLoading] = useState(false);
  const [twoFactorMsg, setTwoFactorMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [copiedSecret, setCopiedSecret] = useState(false);

  // Fetch client profile and orders
  useEffect(() => {
    if (!authLoading && !user) {
      return;
    }

    if (user?.email) {
      const email = user.email;

      // 1. Fetch Client Profile & Measurements (and poll to detect admin approval)
      const fetchProfileData = () => {
        fetch(`/api/client/profile?email=${encodeURIComponent(email)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.profile) {
              const p: ClientMeasurementProfile = data.profile;
              setClientData(p);
              setFullName(p.fullName || profile?.fullName || '');
              setPhone(p.phone || profile?.phone || '');
              setDeliveryTown(p.savedDelivery?.town || 'Nairobi');
              setDeliveryStreet(p.savedDelivery?.streetAddress || '');
              setDeliveryNotes(p.savedDelivery?.deliveryNotes || '');

              setFitStyle(p.preferences?.fitStyle || 'contemporary_tailored');
              setShoulderSlope(p.preferences?.shoulderSlope || 'normal');
              setLapelPreference(p.preferences?.lapelPreference || 'peak_lapel');
              setJacketVents(p.preferences?.jacketVents || 'double_side_vents');
              setTrouserBreak(p.preferences?.trouserBreak || 'slight_break');
              setMonogramInitials(p.preferences?.monogramInitials || '');
              setStyleNotes(p.preferences?.notes || '');

              setMeasurementUnit(p.measurements?.unit || 'inches');
              setMeasurements(p.measurements || {});
            }
          })
          .catch((err) => console.error('Error fetching client profile:', err))
          .finally(() => setLoadingProfile(false));
      };

      setLoadingProfile(true);
      fetchProfileData();

      // Poll profile every 3.5s to automatically unlock the dashboard once the admin approves
      const profilePoll = setInterval(fetchProfileData, 3500);

      // 2. Fetch Client Orders & Setup Real-time Supabase Sync
      const fetchClientOrders = () => {
        fetch(`/api/orders?email=${encodeURIComponent(email)}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.orders) {
              setOrders(data.orders);
            }
          })
          .catch((err) => console.error('Error fetching client orders:', err))
          .finally(() => setLoadingOrders(false));
      };

      setLoadingOrders(true);
      fetchClientOrders();

      // Realtime listener on Supabase 'orders' table
      const liveChannel = supabase
        .channel(`client-orders-live-${email}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          () => {
            fetchClientOrders();
          }
        )
        .subscribe();

      // Background poll interval (every 4s) to guarantee real-time updates
      const pollInterval = setInterval(() => {
        fetchClientOrders();
      }, 4000);

      // 3. Fetch 2FA Status
      fetch(`/api/auth/2fa?email=${encodeURIComponent(email)}&action=status`)
        .then((res) => res.json())
        .then((data) => {
          setTwoFactorStatus({ enabled: Boolean(data.enabled), method: data.method });
        })
        .catch((err) => console.error('Error fetching 2FA status:', err));

      return () => {
        supabase.removeChannel(liveChannel);
        clearInterval(pollInterval);
        clearInterval(profilePoll);
      };
    }
  }, [user, profile, authLoading]);

  // Handle Save Info & Measurements for Subsequent Orders
  const handleSaveInfo = async () => {
    if (!user?.email) return;
    setSaving(true);
    setSaveSuccess(null);
    setSaveError(null);

    try {
      const payload = {
        email: user.email,
        fullName,
        phone,
        savedDelivery: {
          town: deliveryTown,
          streetAddress: deliveryStreet,
          deliveryNotes: deliveryNotes,
        },
        preferences: {
          fitStyle,
          shoulderSlope,
          lapelPreference,
          jacketVents,
          trouserBreak,
          monogramInitials,
          notes: styleNotes,
        },
        measurements: {
          unit: measurementUnit,
          ...measurements,
        },
      };

      const res = await fetch('/api/client/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update profile');
      }

      setClientData(data.profile);
      setSaveSuccess('Sartorial blueprint & delivery info saved successfully! These details will auto-apply to all subsequent orders.');
      setTimeout(() => setSaveSuccess(null), 6000);
    } catch (err: any) {
      setSaveError(err.message || 'Error updating client info.');
    } finally {
      setSaving(false);
    }
  };

  // 2FA: Initiate Setup
  const handleStart2FASetup = async () => {
    if (!user?.email) return;
    setTwoFactorLoading(true);
    setTwoFactorMsg(null);
    try {
      const res = await fetch(`/api/auth/2fa?email=${encodeURIComponent(user.email)}&action=setup`);
      const data = await res.json();
      if (data.success) {
        setSetup2FAData({
          secret: data.secret,
          backupCodes: data.backupCodes,
          otpauthUri: data.otpauthUri,
        });
      }
    } catch (err: any) {
      setTwoFactorMsg({ type: 'error', text: err.message || 'Failed to initialize 2FA setup' });
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // 2FA: Verify and Activate
  const handleVerifyAndEnable2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email || !setup2FAData) return;
    if (!verificationCode.trim()) {
      setTwoFactorMsg({ type: 'error', text: 'Please enter the 6-digit code from your authenticator app.' });
      return;
    }

    setTwoFactorLoading(true);
    setTwoFactorMsg(null);
    try {
      const res = await fetch('/api/auth/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'verify-setup',
          email: user.email,
          secret: setup2FAData.secret,
          token: verificationCode.trim(),
          backupCodes: setup2FAData.backupCodes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setTwoFactorMsg({ type: 'error', text: data.error || 'Invalid 6-digit code. Please try again.' });
        return;
      }

      setTwoFactorStatus({ enabled: true, method: 'totp' });
      setTwoFactorMsg({ type: 'success', text: 'Two-Factor Authentication is now actively protecting your account!' });
      setSetup2FAData(null);
      setVerificationCode('');
    } catch (err: any) {
      setTwoFactorMsg({ type: 'error', text: err.message || 'Failed to verify 2FA' });
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // 2FA: Disable
  const handleDisable2FA = async () => {
    if (!user?.email) return;
    const confirm = window.confirm('Are you sure you want to disable Two-Factor Authentication? We strongly recommend keeping it active to protect your personal measurements and saved addresses.');
    if (!confirm) return;

    const token = window.prompt('Enter your current 6-digit 2FA code or backup code to confirm deactivation:');
    if (!token) return;

    setTwoFactorLoading(true);
    try {
      const res = await fetch('/api/auth/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'disable',
          email: user.email,
          token: token.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to disable 2FA');
        return;
      }

      setTwoFactorStatus({ enabled: false });
      setTwoFactorMsg({ type: 'success', text: 'Two-Factor Authentication has been disabled.' });
    } catch (err: any) {
      alert(err.message || 'Error disabling 2FA');
    } finally {
      setTwoFactorLoading(false);
    }
  };

  // If Auth is still initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-canvas-alt flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If Not Logged In, present VIP invitation to sign in
  if (!user) {
    return (
      <div className="min-h-screen bg-brand-canvas-alt py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl border border-brand-gold/30 p-8 sm:p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-3 py-1 rounded-full">
              Modern Man Kenya • Client Portal
            </span>
            <h1 className="font-serif text-3xl font-bold text-brand-navy">
              Client Sartorial Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Sign in to track current order progress, view your 35-point bespoke measurement blueprint, and manage saved delivery profiles.
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-left space-y-3">
            <div className="text-xs font-bold text-brand-navy uppercase tracking-wider flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-brand-gold" />
              <span>Privileged Member Capabilities</span>
            </div>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Real-time status updates from atelier cutting bench to delivery</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Permanent anatomical measurement blueprint approved by Master Tailors</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Express one-touch checkout using saved measurements for subsequent orders</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Enterprise two-factor authentication (2FA) account security</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login?redirect=/account"
              className="px-6 py-3 bg-brand-navy hover:bg-slate-900 text-brand-gold font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login?mode=signup&redirect=/account"
              className="px-6 py-3 border border-brand-navy text-brand-navy hover:bg-slate-50 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center"
            >
              <span>Create Client Account</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If Logged In but Account is Pending Admin Approval
  const isPendingApproval = clientData && clientData.accountStatus === 'pending_approval';

  if (isPendingApproval) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-xl border border-brand-gold/40 p-8 sm:p-12 text-center space-y-6">
          <div className="relative mx-auto w-20 h-20 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold shadow-lg border border-brand-gold/40">
            <Clock className="w-10 h-10 animate-pulse text-brand-gold" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">
              !
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-3.5 py-1 rounded-full inline-block">
              Security Protocol • Verification Required
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
              Account Pending Approval
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Welcome to Modern Man Kenya, <strong className="text-brand-navy">{fullName || user?.email}</strong>. Your account has been registered and is currently awaiting activation by our Atelier Administrator.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-5 text-left space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-950 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Bespoke Privacy & Security Protocol</span>
            </div>
            <p className="text-xs text-amber-900/90 leading-relaxed">
              To protect sartorial measurement blueprints, orders, and tailoring records, new accounts are individually reviewed by our team before granting access to the client dashboard.
            </p>
            <div className="flex items-center space-x-2 text-[11px] text-amber-800 font-semibold pt-1 border-t border-amber-200/60">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
              <span>Live status: Checking approval automatically in real-time...</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/254700000000?text=${encodeURIComponent(
                `Hello Modern Man Kenya atelier team, I have registered my account (${user?.email}) and would like to request account approval.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Fast-Track via WhatsApp</span>
            </a>

            <button
              onClick={() => signOut()}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            Registered as <span className="font-mono text-slate-600">{user?.email}</span>
          </p>
        </div>
      </div>
    );
  }

  // Filter current vs previous orders
  const currentOrders = orders.filter((o) => o.fulfillment_status !== 'delivered' && o.fulfillment_status !== 'cancelled');
  const previousOrders = orders.filter((o) => o.fulfillment_status === 'delivered' || o.fulfillment_status === 'cancelled');

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-luxury p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0 border-2 border-brand-gold shadow-md font-serif text-xl sm:text-2xl font-bold">
              {fullName ? fullName.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
                  {fullName || 'Modern Gentleman'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-navy text-[10px] font-bold uppercase tracking-luxury border border-brand-gold/40">
                  Atelier Patron
                </span>
                {twoFactorStatus.enabled && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold flex items-center space-x-1 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>2FA Protected</span>
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-4 gap-y-1">
                <span>{user.email}</span>
                {phone && <span>• {phone}</span>}
                <span>• Client Ref: MMK-{user.id.slice(0, 8).toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
            <Link
              href="/book-appointment"
              className="px-4 py-2 rounded-xl bg-brand-gold text-brand-navy text-xs font-bold uppercase tracking-wider hover:bg-brand-gold-light transition-all shadow-xs flex items-center space-x-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Atelier Fitting</span>
            </Link>
            <Link
              href="/ready-to-wear"
              className="px-4 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-900 transition-all shadow-xs flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
              <span>Order Ensembles</span>
            </Link>
            <button
              onClick={signOut}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Feedback Alert */}
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{saveSuccess}</span>
          </div>
        )}
        {saveError && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center space-x-2 animate-in fade-in shadow-xs">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex rounded-xl bg-white p-1.5 border border-slate-200/90 shadow-xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${activeTab === 'orders'
                ? 'bg-brand-navy text-brand-gold shadow-sm'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
              }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Commissions ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('measurements')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${activeTab === 'measurements'
                ? 'bg-brand-navy text-brand-gold shadow-sm'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
              }`}
          >
            <Ruler className="w-4 h-4" />
            <span>Bespoke Measurements</span>
            {clientData?.approvalStatus === 'approved' && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved_info')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${activeTab === 'saved_info'
                ? 'bg-brand-navy text-brand-gold shadow-sm'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
              }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Delivery & Subsequent Orders</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-2 ${activeTab === 'security'
                ? 'bg-brand-navy text-brand-gold shadow-sm'
                : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50'
              }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & 2FA</span>
            {twoFactorStatus.enabled ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>
        </div>

        {/* TAB 1: ORDERS & COMMISSIONS */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {/* 1. Current / Active Orders */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-lg sm:text-xl font-bold text-brand-navy flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-brand-gold" />
                    <span>Active Orders & Real-Time Status</span>
                  </h2>
                  <p className="text-xs text-slate-500">
                    Live updates as your bespoke commission progresses from cutting to delivery.
                  </p>
                </div>
              </div>

              {loadingOrders ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
                  <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Retrieving your atelier commissions...</p>
                </div>
              ) : currentOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 sm:p-10 text-center border border-slate-200/80 shadow-xs space-y-3">
                  <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
                  <h3 className="font-serif text-base font-bold text-brand-navy">No Active Orders</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    You currently have no garments in production. Order bespoke custom shirts, ties, or luxury ensembles.
                  </p>
                  <Link
                    href="/ready-to-wear"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-navy text-brand-gold text-xs font-bold uppercase tracking-wider hover:bg-slate-900 transition-all shadow-xs"
                  >
                    <span>Browse Atelier Collection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">
                  {currentOrders.map((order) => {
                    const statusSteps = [
                      { id: 'pending', label: 'Order Placed', desc: 'Awaiting Atelier Approval' },
                      { id: 'confirmed', label: 'Approved & Crafting', desc: 'Bench Tailoring & Cut' },
                      { id: 'dispatched', label: 'Dispatched', desc: 'White-Glove En Route' },
                      { id: 'delivered', label: 'Delivered', desc: 'Handed Over' },
                    ];

                    const stepOrder = ['pending', 'confirmed', 'dispatched', 'delivered'];
                    const currentStepIdx = stepOrder.indexOf(order.fulfillment_status);

                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-6"
                      >
                        {/* Order Top Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-mono text-sm sm:text-base font-bold text-brand-navy">
                                {order.order_number}
                              </span>
                              <span
                                className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${order.fulfillment_status === 'confirmed'
                                    ? 'bg-blue-50 text-blue-800 border border-blue-200'
                                    : order.fulfillment_status === 'dispatched'
                                      ? 'bg-purple-50 text-purple-800 border border-purple-200'
                                      : 'bg-amber-50 text-amber-800 border border-amber-200'
                                  }`}
                              >
                                {order.fulfillment_status === 'confirmed' ? 'Approved & In Craft' : order.fulfillment_status}
                              </span>
                            </div>
                            <span className="text-[11px] text-slate-400">
                              Placed on {new Date(order.created_at).toLocaleDateString('en-KE', { dateStyle: 'medium' })}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <span className="text-base sm:text-lg font-bold font-mono text-brand-navy">
                              {formatCurrencyPrice(order.total_amount_kes, 'KES')}
                            </span>
                            <a
                              href={`https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya,%20inquiring%20about%20my%20order%20${order.order_number}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold flex items-center space-x-1 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Atelier Liaison</span>
                            </a>
                          </div>
                        </div>

                        {/* Interactive Status Stepper */}
                        <div className="py-2">
                          <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-3">
                            Commission Progress
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                            {statusSteps.map((step, idx) => {
                              const isCompleted = idx <= currentStepIdx;
                              const isCurrent = idx === currentStepIdx;
                              return (
                                <div
                                  key={step.id}
                                  className={`p-3 rounded-xl border text-center transition-all ${isCurrent
                                      ? 'bg-brand-gold/15 border-brand-gold text-brand-navy font-bold shadow-xs'
                                      : isCompleted
                                        ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                                        : 'bg-slate-50 border-slate-200/60 text-slate-400'
                                    }`}
                                >
                                  <div className="flex items-center justify-center mb-1">
                                    {isCompleted ? (
                                      <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-brand-gold' : 'text-emerald-600'}`} />
                                    ) : (
                                      <div className="w-4 h-4 rounded-full border border-slate-300" />
                                    )}
                                  </div>
                                  <div className="text-xs font-bold leading-tight">{step.label}</div>
                                  <div className="text-[10px] opacity-75 mt-0.5">{step.desc}</div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Items in Order */}
                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                            Ensembles In Production
                          </span>
                          <div className="divide-y divide-slate-200/60">
                            {order.items.map((item, i) => (
                              <div key={i} className="py-2 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                                <div className="flex items-center space-x-3">
                                  {item.image && (
                                    <div className="relative w-10 h-10 rounded overflow-hidden bg-white border border-slate-200 flex-shrink-0">
                                      <Image src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-bold text-slate-900">{item.name}</div>
                                    <div className="text-[11px] text-slate-500">
                                      {item.size && <span>Size: {item.size} • </span>}
                                      <span>Qty: {item.quantity}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="font-mono font-semibold text-brand-navy">
                                  {formatCurrencyPrice((item.priceKes || 0) * (item.quantity || 1), 'KES')}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Destination */}
                        <div className="text-xs text-slate-600 flex items-center space-x-2">
                          <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <span>Delivery Address: <strong className="text-slate-800">{order.delivery_location}</strong></span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 2. Previous Orders History */}
            <div className="space-y-4 pt-6 border-t border-slate-200">
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-brand-navy flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Previous Orders & Commission Archive</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Past garments and accessories completed and delivered to your wardrobe.
                </p>
              </div>

              {previousOrders.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center border border-slate-200 text-xs text-slate-500">
                  No previous orders archived yet. Once an active order is delivered, it will be securely logged here.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {previousOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5 space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="font-mono text-xs font-bold text-brand-navy">{order.order_number}</span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          Delivered
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-1">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>{it.quantity}x {it.name}</span>
                            <span className="font-mono">{formatCurrencyPrice(it.priceKes * it.quantity, 'KES')}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Total Settled</span>
                        <span className="font-mono font-bold text-brand-navy">{formatCurrencyPrice(order.total_amount_kes, 'KES')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BESPOKE MEASUREMENTS */}
        {activeTab === 'measurements' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-luxury p-6 sm:p-8 space-y-8">
            {/* Header & Master Tailor Seal */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Anatomical Tailoring Blueprint</span>
                </span>
                <h2 className="font-serif text-2xl font-bold text-brand-navy">
                  Your Master Tailor Measurements
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Cut specifically for your shoulder slope, posture, and natural silhouette. Used for all subsequent commissions.
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setMeasurementUnit('inches')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${measurementUnit === 'inches' ? 'bg-brand-navy text-brand-gold shadow-xs' : 'text-slate-600'
                      }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setMeasurementUnit('cm')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${measurementUnit === 'cm' ? 'bg-brand-navy text-brand-gold shadow-xs' : 'text-slate-600'
                      }`}
                  >
                    CM
                  </button>
                </div>

                <div
                  className={`px-3 py-1.5 rounded-xl border flex items-center space-x-1.5 text-xs font-bold ${clientData?.approvalStatus === 'approved'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                    }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {clientData?.approvalStatus === 'approved'
                      ? 'Master Tailor Approved'
                      : 'Pending Atelier Review'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tailor Verification Notes */}
            {clientData?.tailorNotes && (
              <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/30 text-xs space-y-1">
                <div className="font-bold text-brand-navy flex items-center space-x-1.5">
                  <Ruler className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Master Tailor Calibration Notes {clientData.approvedBy ? `(${clientData.approvedBy})` : ''}:</span>
                </div>
                <p className="text-slate-700 italic">"{clientData.tailorNotes}"</p>
              </div>
            )}

            {/* Measurement Grid */}
            <div className="space-y-6">
              {/* 1. Upper Body / Jacket */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-1 flex items-center space-x-2">
                  <span>Jacket & Upper Body Anatomical Points</span>
                  <span className="text-[10px] text-slate-400 font-normal">({measurementUnit})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { key: 'chest', label: 'Full Chest Circumference' },
                    { key: 'waistStomach', label: 'Stomach / Waist' },
                    { key: 'hipsSeat', label: 'Hips / Seat' },
                    { key: 'shoulderWidth', label: 'Shoulder Width (Back)' },
                    { key: 'halfBack', label: 'Half Back' },
                    { key: 'jacketLength', label: 'Jacket Length' },
                    { key: 'sleeveLengthLeft', label: 'Left Sleeve' },
                    { key: 'sleeveLengthRight', label: 'Right Sleeve' },
                    { key: 'neckCollar', label: 'Collar / Neck' },
                    { key: 'bicep', label: 'Bicep Circumference' },
                    { key: 'wrist', label: 'Wrist Circumference' },
                  ].map((field) => (
                    <div key={field.key} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.25"
                          placeholder="—"
                          value={measurements[field.key] ?? ''}
                          onChange={(e) =>
                            setMeasurements((prev) => ({
                              ...prev,
                              [field.key]: e.target.value === '' ? null : parseFloat(e.target.value),
                            }))
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-brand-navy focus:outline-none focus:border-brand-navy"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                          {measurementUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Lower Body / Trousers */}
              <div className="space-y-3 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-1 flex items-center space-x-2">
                  <span>Trouser & Lower Body Points</span>
                  <span className="text-[10px] text-slate-400 font-normal">({measurementUnit})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {[
                    { key: 'trouserWaist', label: 'Trouser Waistband' },
                    { key: 'trouserSeat', label: 'Trouser Seat / Hips' },
                    { key: 'trouserOutseam', label: 'Outseam (Total Length)' },
                    { key: 'trouserInseam', label: 'Inseam (Inside Leg)' },
                    { key: 'thigh', label: 'Thigh Circumference' },
                    { key: 'knee', label: 'Knee Width' },
                    { key: 'ankleOpening', label: 'Ankle / Cuff Opening' },
                    { key: 'crotchRise', label: 'Total Rise' },
                  ].map((field) => (
                    <div key={field.key} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {field.label}
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          step="0.25"
                          placeholder="—"
                          value={measurements[field.key] ?? ''}
                          onChange={(e) =>
                            setMeasurements((prev) => ({
                              ...prev,
                              [field.key]: e.target.value === '' ? null : parseFloat(e.target.value),
                            }))
                          }
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-brand-navy focus:outline-none focus:border-brand-navy"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">
                          {measurementUnit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
              <span className="text-xs text-slate-500">
                Need re-calibration? Book a personal measurement session at our Nairobi workshop on Tubman Road.
              </span>
              <button
                onClick={handleSaveInfo}
                disabled={saving}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-900 text-brand-gold text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Measurements...' : 'Update Sartorial Measurements'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: SAVED INFO FOR SUBSEQUENT ORDERS */}
        {activeTab === 'saved_info' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-luxury p-6 sm:p-8 space-y-8">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
                <MapPin className="w-3 h-3" />
                <span>Saved Coordinates & Fit Profile</span>
              </span>
              <h2 className="font-serif text-2xl font-bold text-brand-navy">
                Keep Info for Subsequent Orders
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Once saved, your delivery location and style preferences will automatically populate during checkout for frictionless ordering.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Delivery Address & White Glove */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-1">
                  Saved White-Glove Delivery Destination
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Mwangi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Direct Phone Number (for Driver Coordination)
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +254 722 000 000"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Town / Estate (Primary Destination)
                  </label>
                  <input
                    type="text"
                    value={deliveryTown}
                    onChange={(e) => setDeliveryTown(e.target.value)}
                    placeholder="e.g. Kilimani, Nairobi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address / Apartment / Office Suite
                  </label>
                  <input
                    type="text"
                    value={deliveryStreet}
                    onChange={(e) => setDeliveryStreet(e.target.value)}
                    placeholder="e.g. Wood Avenue Court, 4th Floor Suite 4B"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    White-Glove Delivery Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="e.g. Leave with reception, gate code 4092, suit garment bag required..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              {/* Sartorial Style Preferences */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy border-b border-slate-100 pb-1">
                  Atelier Sartorial Preferences
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Silhouette & Cut
                  </label>
                  <select
                    value={fitStyle}
                    onChange={(e) => setFitStyle(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  >
                    <option value="slim_bespoke">Slim Bespoke (Close anatomical taper)</option>
                    <option value="contemporary_tailored">Contemporary Tailored (Modern structured drape)</option>
                    <option value="classic_comfort">Classic Comfort (Generous traditional drape)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Lapel Preference
                    </label>
                    <select
                      value={lapelPreference}
                      onChange={(e) => setLapelPreference(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                    >
                      <option value="peak_lapel">Peak Lapel (Formal & Bold)</option>
                      <option value="notch_lapel">Notch Lapel (Versatile Business)</option>
                      <option value="shawl_collar">Shawl Collar (Tuxedo & Evening)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jacket Vents
                    </label>
                    <select
                      value={jacketVents}
                      onChange={(e) => setJacketVents(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                    >
                      <option value="double_side_vents">Double Side Vents (English Style)</option>
                      <option value="center_vent">Center Single Vent (American)</option>
                      <option value="ventless">Ventless (Ultra Clean Formal)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Trouser Break Level
                    </label>
                    <select
                      value={trouserBreak}
                      onChange={(e) => setTrouserBreak(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                    >
                      <option value="no_break">No Break (Cropped clean cuff)</option>
                      <option value="slight_break">Slight Break (Tailored standard)</option>
                      <option value="medium_break">Medium Break (Classic gentleman)</option>
                      <option value="full_break">Full Break (Traditional drape)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Monogram Initials
                    </label>
                    <input
                      type="text"
                      maxLength={8}
                      value={monogramInitials}
                      onChange={(e) => setMonogramInitials(e.target.value)}
                      placeholder="e.g. D.M."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy uppercase font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cloth & Sartorial Notes
                  </label>
                  <textarea
                    rows={2}
                    value={styleNotes}
                    onChange={(e) => setStyleNotes(e.target.value)}
                    placeholder="e.g. Prefer horn buttons, contrast silk lining in navy gold..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end border-t border-slate-200">
              <button
                onClick={handleSaveInfo}
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-900 text-brand-gold text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center space-x-2 disabled:opacity-60 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving Info...' : 'Save Info for Subsequent Orders'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY & 2FA */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-luxury p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Client Account Protection</span>
                </span>
                <h2 className="font-serif text-2xl font-bold text-brand-navy">
                  Two-Factor Authentication (2FA)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Safeguard your anatomical measurements, home delivery address, and atelier order records with an extra layer of authentication.
                </p>
              </div>

              <div
                className={`px-3.5 py-1.5 rounded-xl border flex items-center space-x-2 text-xs font-bold ${twoFactorStatus.enabled
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{twoFactorStatus.enabled ? '2FA Enabled & Protected' : '2FA Not Configured'}</span>
              </div>
            </div>

            {/* 2FA Notice Messages */}
            {twoFactorMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start space-x-2 animate-in fade-in ${twoFactorMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
              >
                {twoFactorMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{twoFactorMsg.text}</span>
              </div>
            )}

            {/* 2FA Card Content */}
            {!twoFactorStatus.enabled && !setup2FAData && (
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 text-center max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-brand-navy text-brand-gold flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-navy">
                  Protect Your Atelier Account with 2FA
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  When enabled, you will be prompted for a 6-digit code from Google Authenticator, Microsoft Authenticator, or 1Password when signing in.
                </p>
                <button
                  onClick={handleStart2FASetup}
                  disabled={twoFactorLoading}
                  className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-900 text-brand-gold font-bold text-xs uppercase tracking-wider transition-all shadow-sm inline-flex items-center space-x-2"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>{twoFactorLoading ? 'Setting Up...' : 'Configure Two-Factor Authentication'}</span>
                </button>
              </div>
            )}

            {/* Setup In Progress */}
            {setup2FAData && (
              <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-brand-gold/40 max-w-xl mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="font-serif text-lg font-bold text-brand-navy">
                    Configure Authenticator App
                  </h3>
                  <p className="text-xs text-slate-600">
                    Step 1: Open Google Authenticator or 1Password. Add an account and enter this secret key or scan the setup code.
                  </p>
                </div>

                {/* Secret Key Display */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Your Secret Setup Key
                  </span>
                  <div className="font-mono text-sm sm:text-base font-bold text-brand-navy tracking-widest break-all">
                    {setup2FAData.secret}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(setup2FAData.secret);
                      setCopiedSecret(true);
                      setTimeout(() => setCopiedSecret(false), 2000);
                    }}
                    className="inline-flex items-center space-x-1 text-xs text-brand-gold font-bold hover:underline"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSecret ? 'Secret Copied!' : 'Copy Secret Key'}</span>
                  </button>
                </div>

                {/* Backup Codes */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block text-center">
                    Emergency Backup Recovery Codes (Keep in a safe place)
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs text-center text-slate-700">
                    {setup2FAData.backupCodes.map((code, i) => (
                      <span key={i} className="p-1.5 bg-slate-50 rounded border border-slate-200 font-semibold">
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Form */}
                <form onSubmit={handleVerifyAndEnable2FA} className="space-y-4 text-center">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Step 2: Enter the 6-digit code shown in your app
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="000 000"
                      autoFocus
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-48 mx-auto text-center font-mono text-xl tracking-widest px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-brand-navy font-bold text-brand-navy"
                    />
                  </div>

                  <div className="flex gap-2 justify-center">
                    <button
                      type="submit"
                      disabled={twoFactorLoading}
                      className="px-6 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-900 text-brand-gold font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
                    >
                      {twoFactorLoading ? 'Verifying...' : 'Verify & Activate 2FA'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSetup2FAData(null)}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* If 2FA is active */}
            {twoFactorStatus.enabled && (
              <div className="bg-emerald-50/60 rounded-2xl p-6 sm:p-8 border border-emerald-200 text-center max-w-xl mx-auto space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-navy">
                  Your Account is Fortified with 2FA
                </h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your bespoke tailoring blueprint, private measurements, and delivery destinations are protected against unauthorized access.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleDisable2FA}
                    disabled={twoFactorLoading}
                    className="px-4 py-2 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                  >
                    Deactivate 2FA
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
