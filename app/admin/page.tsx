'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Sparkles, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  TrendingUp,
  Tag,
  Eye,
  DollarSign,
  Calendar,
  Clock,
  Truck,
  Phone,
  MessageSquare,
  Receipt
} from 'lucide-react';
import type { Product } from '@/types';
import { ProductFormModal } from '@/components/admin/ProductFormModal';
import { formatCurrencyPrice } from '@/lib/currency';
import type { StoredOrder } from '@/app/api/orders/route';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [prodRes, ordRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/orders'),
      ]);
      const prodData = await prodRes.json();
      const ordData = await ordRes.json();

      if (prodData.products) setProducts(prodData.products);
      if (ordData.orders) {
        setOrders(ordData.orders);
        setAnalytics(ordData.analytics);
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.isInStock !== false).length;

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Nairobi Atelier Executive Control</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Atelier Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time revenue, client order processing, custom shirts & accessories inventory.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
            title="Refresh dashboard"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>

          <Link
            href="/admin/orders"
            className="px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <Receipt className="w-4 h-4" />
            <span>View Orders ({analytics?.pendingOrders || 0} Pending)</span>
          </Link>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 text-brand-gold" />
            <span>Add Outfit / Item</span>
          </button>
        </div>
      </div>

      {/* 4 Core Financial & Store Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: Total Revenue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Total Revenue
            </p>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy font-mono">
              {formatCurrencyPrice(analytics?.totalRevenueKes || 0, 'KES')}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {analytics?.paidPayments || 0} paid & settled orders
            </p>
          </div>
        </div>

        {/* Metric 2: Orders This Month */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              This Month
            </p>
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-brand-navy flex items-center justify-center font-bold">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy font-mono">
              {analytics?.monthlyOrdersCount || 0} Orders
            </p>
            <p className="text-[11px] text-brand-gold font-semibold mt-1">
              {formatCurrencyPrice(analytics?.monthlyRevenueKes || 0, 'KES')} generated
            </p>
          </div>
        </div>

        {/* Metric 3: Pending Orders (Action Required) */}
        <div className="bg-white p-5 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow bg-gradient-to-br from-white to-amber-50/20">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase font-bold text-amber-700 tracking-wider">
              Pending Fulfillment
            </p>
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-900 font-mono">
              {analytics?.pendingOrders || 0} Pending
            </p>
            <p className="text-[11px] text-amber-700 font-medium mt-1">
              Awaiting confirmation / dispatch
            </p>
          </div>
        </div>

        {/* Metric 4: Inventory Catalogue */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Live Catalogue
            </p>
            <div className="w-9 h-9 rounded-lg bg-slate-100 text-brand-navy flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4 text-brand-gold" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-brand-navy font-mono">
              {totalProducts} Items
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              {inStockCount} available in stock
            </p>
          </div>
        </div>
      </div>

      {/* Live Recent Orders Quick Overview */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-brand-navy">
              Recent Client Orders
            </h2>
            <p className="text-xs text-slate-500">
              Latest incoming purchases for shirts, accessories, and ensembles
            </p>
          </div>

          <Link
            href="/admin/orders"
            className="text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-1"
          >
            <span>View All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-400">
            <RefreshCw className="w-5 h-5 animate-spin mx-auto text-brand-gold mb-1" />
            <span className="text-xs">Loading orders...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No orders placed yet. Orders will appear here instantly.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {orders.slice(0, 4).map((ord) => {
              const cleanPhone = ord.customer_phone.replace(/[^0-9]/g, '');
              return (
                <div key={ord.id} className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-xs font-bold text-brand-navy bg-slate-100 px-2 py-1 rounded">
                      {ord.order_number}
                    </span>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{ord.customer_name}</div>
                      <div className="text-[11px] text-slate-500">
                        {ord.items.map((i) => `${i.name} (${i.size || 'Standard'})`).join(', ')}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-mono font-bold text-brand-navy text-xs">
                        {formatCurrencyPrice(ord.total_amount_kes, 'KES')}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        {ord.delivery_location}
                      </div>
                    </div>

                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded capitalize ${
                        ord.fulfillment_status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.fulfillment_status === 'dispatched'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.fulfillment_status}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <a
                        href={`tel:${cleanPhone}`}
                        title="Call Customer"
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={`https://wa.me/${cleanPhone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="WhatsApp Customer"
                        className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Outfits & Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-brand-navy">
              Live Products, Shirts & Accessories
            </h2>
            <p className="text-xs text-slate-500">
              Manage inventory pricing, stock status, and photoshoot assets
            </p>
          </div>

          <Link
            href="/admin/products"
            className="text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-1"
          >
            <span>Manage All Items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-6 h-6 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs">Loading items catalogue...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No items in catalogue yet</p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-brand-navy text-white text-xs font-bold uppercase rounded shadow"
            >
              Add Item Now
            </button>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 sm:px-4">Item</th>
                  <th className="py-3 px-3 sm:px-4">Category</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Price (KES)</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Status</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 8).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-12 bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
                          {item.images && item.images[0] ? (
                            <Image
                              src={item.images[0]}
                              alt={item.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-[9px]">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate max-w-[200px] sm:max-w-xs">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                            {item.tagline || item.fabricDetails}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-3 sm:px-4 uppercase text-[10px] font-bold text-slate-500">
                      {item.category}
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-right font-mono font-bold text-slate-900">
                      {formatCurrencyPrice(item.priceKes, 'KES')}
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-center">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.isInStock !== false
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {item.isInStock !== false ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>

                    <td className="py-3 px-3 sm:px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-2.5 py-1 text-xs font-semibold text-brand-navy hover:text-brand-gold bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <ProductFormModal
          isOpen={isModalOpen}
          productToEdit={editingProduct}
          onClose={() => setIsModalOpen(false)}
          onSaved={() => {
            setIsModalOpen(false);
            fetchDashboardData();
          }}
        />
      )}
    </div>
  );
}
