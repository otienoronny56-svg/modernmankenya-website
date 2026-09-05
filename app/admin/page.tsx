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
  Eye
} from 'lucide-react';
import type { Product } from '@/types';
import { ProductFormModal } from '@/components/admin/ProductFormModal';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error fetching dashboard products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const inStockCount = products.filter((p) => p.isInStock !== false).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

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
            <span>Nairobi Atelier Headquarters</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Atelier Management Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your ready-to-wear inventory, upload new photoshoot images, and adjust retail pricing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
            title="Refresh inventory"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 text-brand-gold" />
            <span>Add New Outfit</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Total Outfits
            </p>
            <p className="text-3xl font-serif font-bold text-brand-navy mt-1">
              {totalProducts}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">Ready-to-wear catalogue</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center text-brand-navy">
            <ShoppingBag className="w-6 h-6 text-brand-gold" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Available in Stock
            </p>
            <p className="text-3xl font-serif font-bold text-emerald-700 mt-1">
              {inStockCount}
            </p>
            <p className="text-[11px] text-emerald-600 mt-0.5">Ready for immediate fitting</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">
              Featured Spotlights
            </p>
            <p className="text-3xl font-serif font-bold text-amber-600 mt-1">
              {featuredCount}
            </p>
            <p className="text-[11px] text-amber-700 mt-0.5">Highlighted on homepage</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Recent Outfits Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-base text-brand-navy">
              Recent Ready-to-Wear Additions
            </h2>
            <p className="text-xs text-slate-500">
              Live outfits published on modernmankenya.com
            </p>
          </div>

          <Link
            href="/admin/products"
            className="text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-1"
          >
            <span>Manage All Outfits</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="w-6 h-6 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin mx-auto mb-2" />
            <span className="text-xs">Loading outfits catalogue...</span>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No outfits in catalogue yet</p>
            <p className="text-xs text-slate-500">
              Click &quot;Add New Outfit&quot; to publish your first garment!
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-brand-navy text-white text-xs font-bold uppercase rounded shadow"
            >
              Add Outfit Now
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Garment</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price (KES)</th>
                  <th className="py-3 px-4">Price (USD)</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.slice(0, 6).map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-11 h-14 rounded bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200">
                          <Image
                            src={item.images[0] || '/images/bespoke-placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-brand-navy truncate max-w-xs sm:max-w-md">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate max-w-xs">
                            {item.fabricDetails}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-medium text-[11px] text-slate-700">
                        {item.category.replace('-', ' ')}
                      </span>
                    </td>

                    <td className="py-3 px-4 font-bold text-brand-navy">
                      KES {item.priceKes.toLocaleString()}
                    </td>

                    <td className="py-3 px-4 text-slate-500 font-medium">
                      ${item.priceUsd.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      {item.isInStock !== false ? (
                        <span className="inline-flex items-center space-x-1 text-emerald-700 text-[11px] font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>In Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 text-red-700 text-[11px] font-semibold bg-red-50 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" />
                          <span>Out of Stock</span>
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3 py-1 bg-white border border-slate-300 hover:border-brand-gold text-brand-navy rounded font-semibold text-[11px] shadow-sm transition-colors"
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

      {/* Product Creation / Edit Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchProducts}
        productToEdit={editingProduct}
      />
    </div>
  );
}
