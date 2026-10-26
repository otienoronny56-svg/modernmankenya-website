'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Check, 
  Sparkles, 
  Phone, 
  MapPin, 
  Truck, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Copy, 
  CheckCircle2, 
  ShoppingBag,
  Loader2,
  Lock,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/lib/auth/AuthContext';
import { formatCurrencyPrice } from '@/lib/currency';
import type { CartItem } from '@/types';

interface ExpressCheckoutProps {
  onSuccess?: (orderNumber: string) => void;
}

export const ExpressCheckout: React.FC<ExpressCheckoutProps> = ({ onSuccess }) => {
  const { items, clearCart, getSubtotalKes, currency } = useCartStore();
  const { user, profile, signInWithGoogle } = useAuth();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [notes, setNotes] = useState('');

  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [googleNotice, setGoogleNotice] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<any>(null);
  const [copiedTill, setCopiedTill] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill from authenticated user profile or metadata
  useEffect(() => {
    if (profile) {
      if (profile.fullName && !customerName) setCustomerName(profile.fullName);
      if (profile.email && !customerEmail) setCustomerEmail(profile.email);
      if (profile.phone && !customerPhone) setCustomerPhone(profile.phone);
    } else if (user) {
      const metaName = (user.user_metadata as any)?.full_name || (user.user_metadata as any)?.name;
      if (metaName && !customerName) setCustomerName(metaName);
      if (user.email && !customerEmail) setCustomerEmail(user.email);
    }
  }, [profile, user]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setGoogleNotice(null);
    try {
      const { error } = await signInWithGoogle('/cart');
      if (error) {
        setGoogleNotice(
          error.message ||
            'Google Sign-In is not currently enabled in Supabase Auth. You can use Auto-Fill Demo or checkout directly below!'
        );
      }
    } catch (err: any) {
      setGoogleNotice(err.message || 'Unable to connect to Google sign-in.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleQuickGuestFill = () => {
    setCustomerName('David Mwangi');
    setCustomerEmail('david.mwangi@example.com');
    setCustomerPhone('+254 712 345 678');
    setDeliveryLocation('Wood Avenue, Kilimani, Nairobi');
    setGoogleNotice(null);
  };

  const subtotalKes = getSubtotalKes();
  const freeShippingThreshold = 50000;
  const shippingCost = subtotalKes >= freeShippingThreshold || items.length === 0 ? 0 : 2500;
  const totalKes = subtotalKes + shippingCost;

  const validateForm = () => {
    if (!customerName.trim()) {
      setErrorMsg('Please provide your full name');
      return false;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 8) {
      setErrorMsg('Please enter a valid phone number for delivery coordination');
      return false;
    }
    if (!deliveryLocation.trim()) {
      setErrorMsg('Please enter your delivery town or estate (e.g. Kilimani, Nairobi)');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handlePlaceOrder = async (orderMethod: 'website' | 'whatsapp') => {
    if (!validateForm()) return;
    setSubmitting(true);
    setErrorMsg('');

    try {
      const formattedItems = items.map((i) => ({
        id: i.id,
        productId: i.productId,
        name: i.name,
        priceKes: i.priceKes,
        size: i.size,
        color: i.color,
        quantity: i.quantity,
        image: i.image,
      }));

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          deliveryLocation,
          items: formattedItems,
          totalAmountKes: totalKes,
          orderMethod,
          notes,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to place order');
      }

      const order = data.order;
      setSubmittedOrder(order);
      clearCart();
      if (onSuccess) onSuccess(order.order_number);

      // If WhatsApp method selected, open WhatsApp directly with pre-formatted payload
      if (orderMethod === 'whatsapp') {
        const itemLines = formattedItems
          .map((i) => `• ${i.quantity}x ${i.name} (Size: ${i.size || 'Standard'}) - KES ${(i.priceKes * i.quantity).toLocaleString()}`)
          .join('\n');

        const message = `Hello Modern Man Kenya Nairobi atelier,\nI would like to place an order:\n\n*Order Reference:* ${order.order_number}\n*Client:* ${customerName}\n*Phone:* ${customerPhone}\n*Delivery Location:* ${deliveryLocation}\n\n*Items:*\n${itemLines}\n\n*Total:* KES ${totalKes.toLocaleString()}\n\nPlease confirm availability and dispatch timeline.`;

        const waUrl = `https://wa.me/254114122510?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
      }
    } catch (err: any) {
      console.error('Order submission error:', err);
      setErrorMsg(err.message || 'Something went wrong while placing your order. Please retry.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyTill = () => {
    navigator.clipboard.writeText('8234500');
    setCopiedTill(true);
    setTimeout(() => setCopiedTill(false), 2500);
  };

  // Order Confirmed Screen
  if (submittedOrder) {
    const cleanPhone = submittedOrder.customer_phone.replace(/[^0-9]/g, '');
    const waFollowUp = `Hello Modern Man Kenya, I have placed order #${submittedOrder.order_number} for KES ${submittedOrder.total_amount_kes.toLocaleString()} for delivery to ${submittedOrder.delivery_location}.`;

    return (
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200/90 shadow-xl max-w-xl mx-auto space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-sm">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold bg-brand-navy px-3 py-1 rounded inline-block">
            Order Dispatched to Atelier Team
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Thank You, {submittedOrder.customer_name.split(' ')[0]}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-light max-w-md mx-auto">
            Your custom garments and accessories have been logged in our master atelier schedule.
          </p>

          <div className="pt-2">
            <span className="text-xs uppercase font-mono text-slate-400 block mb-1">Official Order Reference</span>
            <span className="inline-block px-4 py-1.5 bg-brand-navy text-brand-gold font-mono font-bold text-base rounded shadow">
              {submittedOrder.order_number}
            </span>
          </div>
        </div>

        {/* M-Pesa Settlement Instructions Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <span className="font-bold text-xs uppercase tracking-wider text-brand-navy flex items-center space-x-1.5">
              <span>M-Pesa Payment Settlement</span>
            </span>
            <span className="text-xs font-mono font-bold text-brand-navy">
              KES {submittedOrder.total_amount_kes.toLocaleString()}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Buy Goods Till No.</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-mono font-bold text-sm text-brand-navy">8234500</span>
                <button
                  onClick={handleCopyTill}
                  className="text-xs text-brand-gold hover:text-brand-navy font-semibold flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedTill ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">Modern Man Kenya</span>
            </div>

            <div className="bg-white p-3 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Delivery Destination</span>
              <span className="font-bold text-xs text-slate-800 block mt-1 truncate">
                {submittedOrder.delivery_location}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Rider Scheduled</span>
            </div>
          </div>
        </div>

        {/* Quick Follow-up Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href={`https://wa.me/254114122510?text=${encodeURIComponent(waFollowUp)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Atelier on WhatsApp</span>
          </a>

          <Link
            href="/ready-to-wear"
            className="w-full py-3 bg-brand-navy hover:bg-brand-navy-light text-white rounded font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Continue Browsing</span>
            <ArrowRight className="w-4 h-4 text-brand-gold" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold block mb-1">
            Express Checkout
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
            Delivery & Instant Order
          </h2>
        </div>
        <div className="flex items-center space-x-1 text-slate-400 text-xs">
          <Lock className="w-3.5 h-3.5 text-brand-gold" />
          <span className="text-[11px] font-semibold">256-bit Secure</span>
        </div>
      </div>

      {/* Google Sign-in Banner / Auto-fill notice */}
      {user ? (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase">
              {profile?.fullName?.charAt(0) || user.email?.charAt(0) || 'M'}
            </div>
            <div>
              <span className="font-bold text-emerald-950 block">
                Signed in as {profile?.fullName || user.email}
              </span>
              <span className="text-emerald-700 text-[11px]">Contact details auto-filled below</span>
            </div>
          </div>
          <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
            Verified
          </span>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-brand-navy block">Have an account or Google profile?</span>
              <span className="text-slate-500 text-[11px]">1-click auto-fill your name & contact details</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                disabled={isGoogleLoading}
                className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded border border-slate-300 font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors whitespace-nowrap disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-gold" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleQuickGuestFill}
                className="px-3 py-2 bg-slate-200/80 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center space-x-1"
                title="Populate test address and details instantly"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>Auto-Fill Demo</span>
              </button>
            </div>
          </div>

          {/* Helpful alert if Google is not enabled yet in Supabase Auth */}
          {googleNotice && (
            <div className="bg-amber-50/90 border border-amber-300 text-amber-900 rounded-xl p-3.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-fadeIn">
              <div className="flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <p className="font-bold text-amber-950">Google Sign-In Notice</p>
                  <p className="text-[11px] text-amber-800 leading-relaxed">{googleNotice}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 self-end sm:self-auto flex-shrink-0">
                <button
                  type="button"
                  onClick={handleQuickGuestFill}
                  className="px-3 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded text-[11px] font-bold shadow-xs transition-colors"
                >
                  Auto-Fill Form
                </button>
                <button
                  type="button"
                  onClick={() => setGoogleNotice(null)}
                  className="px-2 py-1 text-amber-800 hover:text-amber-950 text-[11px] underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Streamlined Form Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="e.g. David Mwangi"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Email Address (Optional)
          </label>
          <input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            placeholder="e.g. david@gmail.com"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
          />
        </div>

        {/* Phone Number (Crucial for Courier & M-Pesa) */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Phone Number (for Courier & M-Pesa) *
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. 0718 923 082 or +254 7..."
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-brand-navy font-mono"
            />
          </div>
        </div>

        {/* Delivery Destination */}
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Delivery Town / Estate *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              required
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
              placeholder="e.g. Kilimani, Nairobi or Westlands"
              className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
            />
          </div>
        </div>
      </div>

      {/* Special Instruction Note */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
          Order / Delivery Notes (Optional)
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Preferred delivery time, apartment name, or packaging notes"
          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 focus:outline-none focus:border-brand-navy"
        />
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded font-medium">
          {errorMsg}
        </div>
      )}

      {/* Total Display */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            Total Payable (KES)
          </span>
          <span className="text-xl sm:text-2xl font-serif font-bold text-brand-navy">
            {formatCurrencyPrice(totalKes, 'KES')}
          </span>
        </div>
        <div className="text-right text-[11px] text-slate-500">
          <span>Delivery: {shippingCost === 0 ? 'Complimentary' : 'KES 2,500'}</span>
        </div>
      </div>

      {/* Dual 1-Click Order Buttons */}
      <div className="space-y-3 pt-2">
        {/* Method 1: On-Site Instant Order */}
        <button
          onClick={() => handlePlaceOrder('website')}
          disabled={submitting || items.length === 0}
          className="w-full py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded-xl shadow-gold transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <span>Complete Order & Pay via M-Pesa</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Method 2: 1-Click Order via WhatsApp */}
        <button
          onClick={() => handlePlaceOrder('whatsapp')}
          disabled={submitting || items.length === 0}
          className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-luxury text-xs rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          <MessageSquare className="w-4 h-4" />
          <span>1-Click Order via WhatsApp</span>
        </button>
      </div>

      <div className="pt-2 flex items-center justify-center space-x-4 text-[11px] text-slate-400">
        <span className="flex items-center space-x-1">
          <Truck className="w-3 h-3 text-brand-gold" />
          <span>Same-day Nairobi delivery</span>
        </span>
        <span>•</span>
        <span className="flex items-center space-x-1">
          <ShieldCheck className="w-3 h-3 text-brand-gold" />
          <span>Atelier Quality Guarantee</span>
        </span>
      </div>
    </div>
  );
};
