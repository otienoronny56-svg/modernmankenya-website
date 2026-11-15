'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Sparkles, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  RefreshCw,
  Search,
  Filter,
  DollarSign,
  Calendar,
  ExternalLink,
  ChevronDown,
  Mail,
  Check,
  ArrowUpDown,
  X,
  CreditCard
} from 'lucide-react';
import { formatCurrencyPrice } from '@/lib/currency';
import type { StoredOrder } from '@/app/api/orders/route';

interface AnalyticsData {
  totalRevenueKes: number;
  pendingRevenueKes: number;
  totalOrders: number;
  pendingOrders: number;
  confirmedOrders: number;
  dispatchedOrders: number;
  deliveredOrders: number;
  paidPayments: number;
  monthlyOrdersCount: number;
  monthlyRevenueKes: number;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [fulfillmentFilter, setFulfillmentFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount_desc' | 'amount_asc'>('newest');

  // Action status & notification toast
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [actionNotice, setActionNotice] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
        setAnalytics(data.analytics);
      }
    } catch (err) {
      console.error('Error fetching admin orders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Dismiss notification toast after 5 seconds
  useEffect(() => {
    if (actionNotice) {
      const timer = setTimeout(() => setActionNotice(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [actionNotice]);

  const handleUpdateStatus = async (
    orderId: string, 
    fulfillment_status?: StoredOrder['fulfillment_status'], 
    payment_status?: StoredOrder['payment_status'],
    admin_note?: string
  ) => {
    setUpdatingId(orderId);
    try {
      const ordToUpdate = orders.find((o) => o.id === orderId || o.order_number === orderId);

      // Optimistic update
      setOrders((prev) =>
        prev.map((ord) => {
          if (ord.id === orderId || ord.order_number === orderId) {
            return {
              ...ord,
              ...(fulfillment_status && { fulfillment_status }),
              ...(payment_status && { payment_status }),
            };
          }
          return ord;
        })
      );

      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          orderId, 
          fulfillment_status, 
          payment_status,
          notify_client: true,
          admin_note,
        }),
      });

      const data = await res.json();

      if (data.emailSent) {
        setActionNotice({
          message: `✓ Status updated! Client notification email sent to ${ordToUpdate?.customer_email || 'client'}.`,
          type: 'success',
        });
      } else if (ordToUpdate?.customer_email && ordToUpdate.customer_email.includes('@')) {
        setActionNotice({
          message: `Status updated for #${ordToUpdate.order_number}.`,
          type: 'info',
        });
      } else {
        setActionNotice({
          message: `Status updated for #${ordToUpdate?.order_number || orderId}. (No email address for client)`,
          type: 'info',
        });
      }

      // Re-fetch to recalculate metrics
      fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
      setActionNotice({
        message: 'Failed to update order status. Please check your connection.',
        type: 'error',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleResendStatusEmail = async (order: StoredOrder) => {
    if (!order.customer_email || !order.customer_email.includes('@')) {
      setActionNotice({
        message: 'Cannot send email: This client did not provide an email address.',
        type: 'error',
      });
      return;
    }

    setUpdatingId(order.id);
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          fulfillment_status: order.fulfillment_status,
          payment_status: order.payment_status,
          notify_client: true,
        }),
      });

      const data = await res.json();
      if (data.emailSent) {
        setActionNotice({
          message: `✓ Email successfully dispatched to ${order.customer_email}!`,
          type: 'success',
        });
      } else {
        setActionNotice({
          message: data.emailNotice || 'Email dispatch attempted.',
          type: 'info',
        });
      }
    } catch (err) {
      setActionNotice({
        message: 'Could not send status email. Please retry.',
        type: 'error',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  // Tab counts for quick metrics
  const counts = useMemo(() => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.fulfillment_status === 'pending').length,
      confirmed: orders.filter((o) => o.fulfillment_status === 'confirmed').length,
      dispatched: orders.filter((o) => o.fulfillment_status === 'dispatched').length,
      delivered: orders.filter((o) => o.fulfillment_status === 'delivered').length,
      cancelled: orders.filter((o) => o.fulfillment_status === 'cancelled').length,
      paid: orders.filter((o) => o.payment_status === 'paid').length,
      unpaid: orders.filter((o) => o.payment_status === 'pending').length,
      website: orders.filter((o) => o.order_method === 'website').length,
      whatsapp: orders.filter((o) => o.order_method === 'whatsapp').length,
    };
  }, [orders]);

  // Filtered and Sorted orders list
  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        const matchesFulfillment =
          fulfillmentFilter === 'all' || ord.fulfillment_status === fulfillmentFilter;

        const matchesPayment =
          paymentFilter === 'all' || ord.payment_status === paymentFilter;

        const matchesChannel =
          channelFilter === 'all' || ord.order_method === channelFilter;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          ord.order_number.toLowerCase().includes(q) ||
          ord.customer_name.toLowerCase().includes(q) ||
          (ord.customer_email && ord.customer_email.toLowerCase().includes(q)) ||
          ord.customer_phone.includes(q) ||
          ord.delivery_location.toLowerCase().includes(q) ||
          ord.items.some((item) => item.name.toLowerCase().includes(q));

        return matchesFulfillment && matchesPayment && matchesChannel && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        }
        if (sortBy === 'amount_desc') {
          return (b.total_amount_kes || 0) - (a.total_amount_kes || 0);
        }
        if (sortBy === 'amount_asc') {
          return (a.total_amount_kes || 0) - (b.total_amount_kes || 0);
        }
        return 0;
      });
  }, [orders, fulfillmentFilter, paymentFilter, channelFilter, searchQuery, sortBy]);

  const hasActiveFilters =
    searchQuery !== '' ||
    fulfillmentFilter !== 'all' ||
    paymentFilter !== 'all' ||
    channelFilter !== 'all' ||
    sortBy !== 'newest';

  const clearAllFilters = () => {
    setSearchQuery('');
    setFulfillmentFilter('all');
    setPaymentFilter('all');
    setChannelFilter('all');
    setSortBy('newest');
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-6">
      {/* Action Notification Toast Banner */}
      {actionNotice && (
        <div
          className={`p-3.5 rounded-xl border flex items-center justify-between shadow-md transition-all animate-in slide-in-from-top-2 duration-200 ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : actionNotice.type === 'error'
              ? 'bg-rose-50 border-rose-300 text-rose-900'
              : 'bg-blue-50 border-blue-300 text-blue-900'
          }`}
        >
          <div className="flex items-center space-x-2 text-xs font-semibold">
            {actionNotice.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : actionNotice.type === 'error' ? (
              <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            ) : (
              <Mail className="w-4 h-4 text-blue-600 flex-shrink-0" />
            )}
            <span>{actionNotice.message}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Client Orders & Dispatch Control</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Orders & Revenue Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Update fulfillment and payment statuses with automated client emails and real-time atelier tracking.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-xs cursor-pointer"
            title="Refresh Orders"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Orders</span>
          </button>
        </div>
      </div>

      {/* 4 Financial & Order Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-brand-navy font-mono">
              {formatCurrencyPrice(analytics?.totalRevenueKes || 0, 'KES')}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Across {analytics?.totalOrders || orders.length} recorded orders
            </div>
          </div>
        </div>

        {/* Card 2: Orders Paid */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Payments Verified
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-brand-navy font-mono">
              {counts.paid} Paid
            </div>
            <div className="text-[11px] text-amber-700 mt-0.5 font-medium">
              {counts.unpaid} pending payment verification
            </div>
          </div>
        </div>

        {/* Card 3: Pending Fulfillment */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Pending Cutting
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-amber-600 font-mono">
              {counts.pending} In Queue
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Requires tailor approval
            </div>
          </div>
        </div>

        {/* Card 4: Dispatched / Delivered */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Completed Handover
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-brand-navy flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-brand-navy font-mono">
              {counts.dispatched + counts.delivered} Dispatched
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {counts.delivered} delivered to clients
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3.5">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Order #, Client Name, Email, Phone, Town, or Item Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-navy"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Controls: Payment Filter, Channel Filter, Sort */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Payment Filter */}
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              <CreditCard className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Payments ({counts.all})</option>
                <option value="paid">Paid Only ({counts.paid})</option>
                <option value="pending">Pending Payment ({counts.unpaid})</option>
                <option value="on_delivery">On Delivery</option>
              </select>
            </div>

            {/* Channel Filter */}
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase">Channel:</span>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="all">All Channels</option>
                <option value="website">Website ({counts.website})</option>
                <option value="whatsapp">WhatsApp ({counts.whatsapp})</option>
              </select>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center space-x-1 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_desc">Highest Value</option>
                <option value="amount_asc">Lowest Value</option>
              </select>
            </div>

            {/* Clear All Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-2.5 py-1 text-xs text-rose-600 hover:text-rose-800 font-semibold underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Fulfillment Status Tabs with Live Badges */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100">
          {[
            { id: 'all', label: 'All Orders', count: counts.all },
            { id: 'pending', label: 'Pending Approval', count: counts.pending, color: 'text-amber-700 bg-amber-50' },
            { id: 'confirmed', label: 'Confirmed & In Cutting', count: counts.confirmed, color: 'text-emerald-700 bg-emerald-50' },
            { id: 'dispatched', label: 'Dispatched', count: counts.dispatched, color: 'text-blue-700 bg-blue-50' },
            { id: 'delivered', label: 'Delivered', count: counts.delivered, color: 'text-slate-700 bg-slate-100' },
            { id: 'cancelled', label: 'Cancelled', count: counts.cancelled, color: 'text-rose-700 bg-rose-50' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFulfillmentFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                fulfillmentFilter === tab.id
                  ? 'bg-brand-navy text-white shadow-xs font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
                  fulfillmentFilter === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Table / Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 space-y-2 bg-white rounded-2xl border border-slate-200">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-gold" />
            <p className="text-xs">Loading atelier order records...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 space-y-3">
            <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="font-serif text-lg font-bold text-slate-700">No Orders Match Current Filters</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery || fulfillmentFilter !== 'all' || paymentFilter !== 'all' || channelFilter !== 'all'
                ? 'Try broadening your search term or resetting the filters.'
                : 'Incoming orders from shirts, accessories, and bespoke commissions will appear here.'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-brand-navy text-brand-gold rounded-lg text-xs font-bold shadow-xs hover:bg-brand-navy-light"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          filteredOrders.map((order) => {
            const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '');
            const whatsappText = encodeURIComponent(
              `Hello ${order.customer_name}, this is Modern Man Kenya Nairobi atelier regarding order #${order.order_number} for delivery to ${order.delivery_location}. Status: ${order.fulfillment_status.toUpperCase()} (${order.payment_status === 'paid' ? 'Paid' : 'Payment Pending'}).`
            );

            const isUpdating = updatingId === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-brand-gold/60 transition-all p-5 sm:p-6 space-y-4"
              >
                {/* Order Top Bar: Reference, Date, Method, Status & Actions */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono text-sm font-black text-brand-navy bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                      #{order.order_number}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.created_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        order.order_method === 'whatsapp'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      Via {order.order_method === 'whatsapp' ? 'WhatsApp' : 'Website'}
                    </span>
                  </div>

                  {/* Status Dropdowns & 1-Click Update Actions */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Payment Status Dropdown / Pill */}
                    <div className="flex items-center space-x-1">
                      <select
                        value={order.payment_status}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleUpdateStatus(
                            order.id,
                            undefined,
                            e.target.value as StoredOrder['payment_status']
                          )
                        }
                        className={`text-xs px-2.5 py-1 rounded-md font-bold border transition-colors cursor-pointer ${
                          order.payment_status === 'paid'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                            : 'bg-amber-50 border-amber-300 text-amber-800'
                        }`}
                        title="Change payment status (Dispatches verified receipt email to client if set to Paid)"
                      >
                        <option value="pending">• Payment Pending</option>
                        <option value="paid">✓ Paid & Verified</option>
                        <option value="on_delivery">Payment on Delivery</option>
                      </select>
                    </div>

                    {/* One-Click Next Step Progression Button */}
                    {order.fulfillment_status === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                        disabled={isUpdating}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                        title="Approve order & dispatch confirmation email to client"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve & Email Client</span>
                      </button>
                    ) : order.fulfillment_status === 'confirmed' ? (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, 'dispatched')}
                        disabled={isUpdating}
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                        title="Mark dispatched & send delivery tracking email"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Dispatch & Email Client</span>
                      </button>
                    ) : order.fulfillment_status === 'dispatched' ? (
                      <button
                        type="button"
                        onClick={() => handleUpdateStatus(order.id, 'delivered')}
                        disabled={isUpdating}
                        className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-md text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                        title="Mark delivered & send delivery completion email"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Delivered & Email</span>
                      </button>
                    ) : null}

                    {/* Fulfillment Status Selector Dropdown */}
                    <select
                      value={order.fulfillment_status}
                      disabled={isUpdating}
                      onChange={(e) =>
                        handleUpdateStatus(
                          order.id,
                          e.target.value as StoredOrder['fulfillment_status']
                        )
                      }
                      className="text-xs bg-slate-50 border border-slate-200 rounded-md px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none focus:border-brand-navy cursor-pointer"
                      title="Set fulfillment status (Client will receive corresponding email update)"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>

                    {/* Resend Status Email Button */}
                    <button
                      type="button"
                      onClick={() => handleResendStatusEmail(order)}
                      disabled={isUpdating || !order.customer_email}
                      className="p-1.5 rounded-md border border-slate-200 text-slate-600 hover:text-brand-navy hover:bg-slate-100 transition-colors disabled:opacity-40 cursor-pointer"
                      title={order.customer_email ? `Send/Resend status email to ${order.customer_email}` : 'No email address provided for this order'}
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Customer Details & Quick Contact */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Customer Identity */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Client Contact
                    </span>
                    <div className="font-bold text-slate-900 text-sm">{order.customer_name}</div>
                    <div className="text-slate-600 font-mono text-[11px] flex items-center space-x-1">
                      <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                      <span className="truncate">{order.customer_email || 'No email provided'}</span>
                    </div>
                    <div className="font-mono text-slate-800 font-semibold">{order.customer_phone}</div>
                  </div>

                  {/* Delivery Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Delivery Destination
                    </span>
                    <div className="font-semibold text-slate-900 flex items-center space-x-1.5">
                      <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                      <span>{order.delivery_location}</span>
                    </div>
                    {order.shipping_address?.notes && (
                      <p className="text-[11px] text-slate-500 italic">
                        Note: {order.shipping_address.notes}
                      </p>
                    )}
                    {(order as any).mpesa_receipt && (
                      <div className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-800">
                        M-Pesa: {(order as any).mpesa_receipt}
                      </div>
                    )}
                  </div>

                  {/* Quick Client Outreach Buttons */}
                  <div className="flex flex-col justify-center space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Client Outreach
                    </span>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Table / List */}
                <div className="bg-slate-50 rounded-xl p-3 sm:p-4 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    Ordered Ensembles & Accessories
                  </div>
                  <div className="divide-y divide-slate-200/60">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <div className="w-10 h-10 rounded-md overflow-hidden relative flex-shrink-0 bg-white border border-slate-200">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                sizes="40px"
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-slate-900 block">{item.name}</span>
                            <div className="text-[11px] text-slate-500 space-x-2">
                              {item.size && <span>Size: {item.size}</span>}
                              {item.color && <span>• {item.color}</span>}
                              <span>• Qty: {item.quantity}</span>
                            </div>
                          </div>
                        </div>

                        <div className="font-mono font-bold text-brand-navy">
                          {formatCurrencyPrice((item.priceKes || 0) * (item.quantity || 1), 'KES')}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Total Line */}
                  <div className="border-t border-slate-200 pt-3 mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                      Total Payable
                    </span>
                    <span className="text-base font-bold font-mono text-brand-navy">
                      {formatCurrencyPrice(order.total_amount_kes, 'KES')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
