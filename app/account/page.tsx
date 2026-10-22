'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Calendar, 
  ShoppingBag, 
  Ruler, 
  LogOut, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ExternalLink,
  Phone,
  Mail,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthContext';
import { supabase } from '@/lib/supabase/client';

export default function AccountPage() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'orders' | 'measurements'>('overview');
  const [appointments, setAppointments] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Fetch client data when user logs in
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/account');
      return;
    }

    if (user?.email) {
      const fetchClientData = async () => {
        setDataLoading(true);
        try {
          // 1. Fetch appointments
          const { data: apptData } = await (supabase.from('appointments') as any)
            .select('*')
            .eq('client_email', user.email)
            .order('appointment_date', { ascending: false });

          if (apptData) {
            setAppointments(apptData);
          }

          // 2. Fetch orders
          const { data: orderData } = await (supabase.from('orders') as any)
            .select('*')
            .eq('customer_email', user.email)
            .order('created_at', { ascending: false });

          if (orderData) {
            setOrders(orderData);
          }

          // 3. Fetch bespoke inquiries
          const { data: inqData } = await (supabase.from('bespoke_inquiries') as any)
            .select('*')
            .eq('client_email', user.email)
            .order('created_at', { ascending: false });

          if (inqData) {
            setInquiries(inqData);
          }
        } catch (err) {
          console.warn('Modern Man client data notice:', err);
        } finally {
          setDataLoading(false);
        }
      };

      fetchClientData();
    }
  }, [user, loading, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-luxury text-stone-500 font-semibold">
            Loading Client Sanctuary...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = profile?.fullName
    ? profile.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'MM';

  return (
    <div className="min-h-screen bg-[#FAF8F5] py-10 sm:py-16 text-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Profile Banner */}
        <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-10 border-2 border-brand-gold/30 shadow-luxury relative overflow-hidden">
          <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              
              {/* Avatar / Initials */}
              {profile?.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-brand-gold shadow-md"
                />
              ) : (
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-gold/20 text-brand-gold border-2 border-brand-gold/40 flex items-center justify-center font-serif text-xl sm:text-2xl font-bold shadow-md">
                  {initials}
                </div>
              )}

              {/* Client Info */}
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] uppercase tracking-luxury font-bold bg-white/10 text-brand-gold px-2.5 py-0.5 rounded-full border border-brand-gold/30">
                    Modern Man Patron
                  </span>
                </div>
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {profile?.fullName || 'Distinguished Patron'}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-light">
                  <span className="flex items-center space-x-1">
                    <Mail className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{user.email}</span>
                  </span>
                  {profile?.phone && (
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-brand-gold" />
                      <span>{profile.phone}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3 pt-2 md:pt-0">
              <Link
                href="/book-appointment"
                className="px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-wider text-xs rounded-xl transition-all shadow-gold flex items-center space-x-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Fitting</span>
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-all border border-white/20 flex items-center space-x-1.5 cursor-pointer"
                title="Sign out of account"
              >
                <LogOut className="w-3.5 h-3.5 text-red-300" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto space-x-2 border-b border-stone-200 pb-2">
          {[
            { id: 'overview', label: 'Account Overview', icon: Sparkles },
            { id: 'appointments', label: `My Appointments (${appointments.length})`, icon: Calendar },
            { id: 'orders', label: `Orders & Inquiries (${orders.length + inquiries.length})`, icon: ShoppingBag },
            { id: 'measurements', label: 'Sartorial Blueprint', icon: Ruler },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-navy text-brand-gold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : 'text-stone-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* 3 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Fitting Appointments</p>
                <p className="font-serif text-2xl font-bold text-stone-900">
                  {appointments.length} Total
                </p>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className="text-xs font-semibold text-brand-gold hover:underline pt-1 inline-flex items-center space-x-1"
                >
                  <span>View Sessions</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">Commissions & Orders</p>
                <p className="font-serif text-2xl font-bold text-stone-900">
                  {orders.length + inquiries.length} Items
                </p>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-brand-gold hover:underline pt-1 inline-flex items-center space-x-1"
                >
                  <span>View Inquiries & Orders</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-2">
                <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-brand-gold">
                  <Ruler className="w-5 h-5" />
                </div>
                <p className="text-xs uppercase tracking-wider text-stone-500 font-semibold">35-Point Pattern Profile</p>
                <p className="font-serif text-2xl font-bold text-emerald-700">
                  Active
                </p>
                <button
                  onClick={() => setActiveTab('measurements')}
                  className="text-xs font-semibold text-brand-gold hover:underline pt-1 inline-flex items-center space-x-1"
                >
                  <span>Review Blueprint</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>

            {/* Concierge Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-gold/30 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-brand-navy">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <h2 className="font-serif text-lg font-bold">Personal Master Tailoring Concierge</h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-2xl">
                Need to adjust your upcoming appointment or check on the status of your jacket basting fitting?
                Our workshop team is available daily at Trust Mansion, Tubman Road, Nairobi.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20am%20logged%20into%20my%20account%20and%20would%20like%20to%20inquire%20about%20my%20fittings."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white font-semibold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp: 0114 122 510</span>
                </a>
                <Link
                  href="/the-craft"
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-medium text-xs rounded-xl transition-all"
                >
                  Learn How We Make Your Suit
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Appointments */}
        {activeTab === 'appointments' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-brand-navy">My Fitting Appointments</h2>
                <p className="text-xs text-stone-500 font-light">Past and scheduled sessions at our Nairobi workshop.</p>
              </div>
              <Link
                href="/book-appointment"
                className="px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-gold"
              >
                + Book New Fitting
              </Link>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center space-y-4 border border-stone-200">
                <Calendar className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-800">No Scheduled Appointments</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
                  You do not have any active fitting appointments booked with your account email yet.
                </p>
                <div className="pt-2">
                  <Link
                    href="/book-appointment"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-navy text-brand-gold font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-900 transition-all shadow-md"
                  >
                    <span>Reserve a Fitting Session</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appointments.map((appt) => (
                  <div
                    key={appt.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold bg-brand-navy px-2.5 py-1 rounded-full">
                        {appt.fitting_type || 'Bespoke Fitting'}
                      </span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        appt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {appt.status || 'Pending'}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs text-stone-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                        <span className="font-medium text-stone-900">
                          {appt.appointment_date} • {appt.time_slot}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                        <span>Trust Mansion, Tubman Road, Nairobi</span>
                      </div>
                    </div>

                    {appt.notes && (
                      <p className="text-xs text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                        "{appt.notes}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Orders & Inquiries */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-navy">Commissions & Wardrobe Orders</h2>
              <p className="text-xs text-stone-500 font-light">Garments crafted under your client profile.</p>
            </div>

            {orders.length === 0 && inquiries.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center space-y-4 border border-stone-200">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-stone-800">No Orders Placed Yet</h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto font-light">
                  Explore our made-to-measure collections or ready-to-wear items to start your commission.
                </p>
                <div className="pt-2">
                  <Link
                    href="/ready-to-wear"
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-brand-navy text-brand-gold font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-slate-900 transition-all shadow-md"
                  >
                    <span>Browse Ready-to-Wear</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-brand-navy">Order #{order.order_number}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                          {order.payment_status}
                        </span>
                      </div>
                      <p className="text-stone-500">
                        Placed on {new Date(order.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="text-right sm:text-right">
                      <p className="text-xs text-stone-400 uppercase tracking-wider">Total Amount</p>
                      <p className="font-serif text-base font-bold text-stone-900">
                        KES {order.total_amount_kes?.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}

                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 uppercase tracking-wider text-[11px] text-brand-gold">
                        Bespoke Inquiry: {inq.category}
                      </span>
                      <span className="text-stone-400 text-[11px]">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-stone-600 font-light">
                      {inq.garment_specifications?.message || 'Custom suiting commission inquiry.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Sartorial Blueprint (Measurements) */}
        {activeTab === 'measurements' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-6">
              <div className="flex items-center space-x-2">
                <Ruler className="w-5 h-5 text-brand-gold" />
                <h2 className="font-serif text-xl font-bold text-brand-navy">
                  Your 35-Point Measurement Archive
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-2xl">
                Every patron at Modern Man Kenya has their unique paper pattern preserved in our Nairobi archives.
                When you visit our workshop on Tubman Road for a fitting, your cutter logs every contour so you can reorder effortlessly.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { label: 'Chest Profile', value: 'Sculpted' },
                  { label: 'Shoulder Pitch', value: 'Bespoke Drafted' },
                  { label: 'Waist Drop', value: 'Individual Stance' },
                  { label: 'Trouser Inseam', value: 'Exact Break' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-center space-y-1">
                    <p className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">{item.label}</p>
                    <p className="font-serif font-bold text-sm text-brand-navy">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start space-x-3 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Your blueprint is linked to: {user.email}</p>
                  <p className="text-emerald-700 font-light">
                    Next time you order a new suit or Gurkha trousers, simply reference this profile and pick your fabric.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
