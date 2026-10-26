'use client';

import React, { useState, useEffect } from 'react';
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
  ChevronDown
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
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  const handleUpdateStatus = async (
    orderId: string, 
    fulfillment_status?: StoredOrder['fulfillment_status'], 
    payment_status?: StoredOrder['payment_status']
  ) => {
    setUpdatingId(orderId);
    try {
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

      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, fulfillment_status, payment_status }),
      });
      // Re-fetch to recalculate metrics
      fetchOrders();
    } catch (err) {
      console.error('Error updating order status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  // Filtered orders
  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.fulfillment_status === statusFilter;
    const matchesSearch =
      ord.order_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer_phone.includes(searchQuery) ||
      ord.delivery_location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Client Orders & E-Commerce Control</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Orders & Revenue Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time orders for custom shirts, accessories, and curated luxury ensembles.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
            title="Refresh Orders"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Orders</span>
          </button>
        </div>
      </div>

      {/* 4 Financial & Order Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-brand-navy font-mono">
              {formatCurrencyPrice(analytics?.totalRevenueKes || 0, 'KES')}
            </div>
            <div className="text-[11px] text-slate-500 mt-1 flex items-center space-x-1">
              <span className="font-semibold text-emerald-600">
                {analytics?.paidPayments || 0} Paid Orders
              </span>
              <span>• Complete settlement</span>
            </div>
          </div>
        </div>

        {/* Card 2: Monthly Orders & Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              This Month
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-navy flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-brand-navy font-mono">
              {analytics?.monthlyOrdersCount || 0} Orders
            </div>
            <div className="text-[11px] text-brand-gold font-semibold mt-1">
              {formatCurrencyPrice(analytics?.monthlyRevenueKes || 0, 'KES')} generated
            </div>
          </div>
        </div>

        {/* Card 3: Pending Orders (Action Required) */}
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow bg-gradient-to-br from-white to-amber-50/20">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
              Pending Fulfillment
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono">
              {analytics?.pendingOrders || 0} Pending
            </div>
            <div className="text-[11px] text-amber-700 mt-1 font-medium">
              Awaiting confirmation & dispatch
            </div>
          </div>
        </div>

        {/* Card 4: Delivered / Dispatched */}
        <div className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Delivered / Dispatched
            </span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 text-brand-navy flex items-center justify-center font-bold">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl sm:text-3xl font-bold text-brand-navy font-mono">
              {(analytics?.deliveredOrders || 0) + (analytics?.dispatchedOrders || 0)} Completed
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {analytics?.deliveredOrders || 0} Handed over to clients
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Order #, Client Name, Phone, or Town..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-brand-navy"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'dispatched', label: 'Dispatched' },
            { id: 'delivered', label: 'Delivered' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === tab.id
                  ? 'bg-brand-navy text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List Table / Cards */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-brand-gold" />
            <p className="text-xs">Loading atelier order records...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 bg-white rounded-xl border border-slate-200 text-center text-slate-500 space-y-3">
            <ShoppingBag className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="font-serif text-lg font-bold text-slate-700">No Orders Found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              {searchQuery
                ? `No orders matching "${searchQuery}". Clear your search query to view all.`
                : 'Incoming orders from shirts, accessories, and the storefront will appear here in real time.'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '');
            const whatsappText = encodeURIComponent(
              `Hello ${order.customer_name}, this is Modern Man Kenya Nairobi atelier confirming your order #${order.order_number} for delivery to ${order.delivery_location}.`
            );

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:border-brand-gold/60 transition-all p-5 sm:p-6 space-y-4"
              >
                {/* Order Top Bar: Reference, Date, Method, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-bold text-brand-navy bg-slate-100 px-2.5 py-1 rounded">
                      {order.order_number}
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
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        order.order_method === 'whatsapp'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}
                    >
                      Via {order.order_method === 'whatsapp' ? 'WhatsApp' : 'Website'}
                    </span>
                  </div>

                  {/* Status Dropdowns */}
                  <div className="flex items-center space-x-2">
                    {/* Payment Badge / Toggle */}
                    <button
                      onClick={() =>
                        handleUpdateStatus(
                          order.id,
                          undefined,
                          order.payment_status === 'paid' ? 'pending' : 'paid'
                        )
                      }
                      title="Click to toggle payment status"
                      className={`text-xs px-2.5 py-1 rounded-full font-bold flex items-center space-x-1 transition-colors ${
                        order.payment_status === 'paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="capitalize">{order.payment_status}</span>
                    </button>

                    {/* Fulfillment Status Selector */}
                    <select
                      value={order.fulfillment_status}
                      disabled={updatingId === order.id}
                      onChange={(e) =>
                        handleUpdateStatus(
                          order.id,
                          e.target.value as StoredOrder['fulfillment_status']
                        )
                      }
                      className="text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1 font-semibold text-slate-800 focus:outline-none focus:border-brand-navy"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
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
                    <div className="text-slate-500">{order.customer_email || 'No email provided'}</div>
                    <div className="font-mono text-slate-700 font-semibold">{order.customer_phone}</div>
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
                  </div>

                  {/* Quick Client Outreach Buttons */}
                  <div className="flex flex-col justify-center space-y-2">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Client Outreach
                    </span>
                    <div className="flex items-center space-x-2">
                      <a
                        href={`tel:${cleanPhone}`}
                        className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Call</span>
                      </a>
                      <a
                        href={`https://wa.me/${cleanPhone}?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Ordered Items Table / List */}
                <div className="bg-slate-50 rounded-lg p-3 sm:p-4 border border-slate-100">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    Ordered Ensembles & Accessories
                  </div>
                  <div className="divide-y divide-slate-200/60">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <div className="w-10 h-10 rounded overflow-hidden relative flex-shrink-0 bg-white border border-slate-200">
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
