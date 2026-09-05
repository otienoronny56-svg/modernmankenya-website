'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { 
  ShoppingBag, 
  PlusCircle, 
  Search, 
  Filter, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import type { Product } from '@/types';
import { ProductFormModal } from '@/components/admin/ProductFormModal';

const CATEGORIES = [
  { id: 'all', name: 'All Garments' },
  { id: 'suits', name: 'Suits' },
  { id: 'jackets', name: 'Blazers & Jackets' },
  { id: 'velvets', name: 'Velvet Jackets' },
  { id: 'evening-dinner', name: 'Evening & Dinner' },
  { id: 'fragrances', name: 'Fragrances' },
  { id: 'accessories', name: 'Accessories' },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesFabric = p.fabricDetails?.toLowerCase().includes(q);
        const matchesTagline = p.tagline?.toLowerCase().includes(q);
        if (!matchesName && !matchesFabric && !matchesTagline) return false;
      }
      return true;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleStock = async (product: Product) => {
    const newStockStatus = product.isInStock === false ? true : false;
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isInStock: newStockStatus }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, isInStock: newStockStatus } : p
          )
        );
      }
    } catch (err) {
      console.error('Error updating stock status:', err);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the catalogue?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Error deleting product:', err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-w-0 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Ready-to-Wear Outfits Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Upload garment photography, change prices, and update silhouettes in real time.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 text-brand-gold" />
            <span>Publish New Outfit</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar with Flex-Wrap to prevent right-edge overflow */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 min-w-0">
        {/* Search */}
        <div className="relative w-full xl:max-w-xs flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by outfit name, cloth mill, or keyword..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
          />
        </div>

        {/* Category Pills (Wraps gracefully on all screens) */}
        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-brand-navy text-brand-gold shadow-sm font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Outfits Table Card (Strictly 100% width, No horizontal scrollbar) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden w-full">
        {loading ? (
          <div className="p-16 text-center text-slate-400">
            <div className="w-8 h-8 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs">Loading outfits from inventory...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-slate-500 space-y-3">
            <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-700">No matching outfits found</p>
            <p className="text-xs text-slate-400">
              Try adjusting your search query or publish a new ready-to-wear outfit.
            </p>
            <button
              onClick={handleOpenAdd}
              className="px-4 py-2 bg-brand-navy text-white text-xs font-bold uppercase rounded shadow mt-2"
            >
              Publish Outfit
            </button>
          </div>
        ) : (
          <div className="w-full">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3 sm:px-4">Garment</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Price</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Status</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Garment Image, Name, and Category */}
                    <td className="py-3 px-3 sm:px-4">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-16 sm:w-14 sm:h-18 rounded bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-200 shadow-sm">
                          <Image
                            src={item.images[0] || '/images/bespoke-placeholder.jpg'}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {item.images.length > 1 && (
                            <span className="absolute bottom-0.5 right-0.5 bg-black/75 text-white text-[8px] font-bold px-1 rounded">
                              +{item.images.length - 1}
                            </span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif font-bold text-xs sm:text-sm text-brand-navy line-clamp-1">
                            {item.name}
                          </p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="capitalize px-1.5 py-0.5 rounded bg-slate-100 font-semibold text-[10px] text-slate-700">
                              {item.category.replace('-', ' ')}
                            </span>
                            {item.tagline && (
                              <span className="text-[10px] sm:text-[11px] text-brand-gold font-medium truncate max-w-[160px] sm:max-w-xs hidden xs:inline">
                                {item.tagline}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Price KES & USD stacked */}
                    <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                      <p className="font-bold text-brand-navy text-xs sm:text-sm">
                        KES {item.priceKes.toLocaleString()}
                      </p>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium">
                        ${item.priceUsd.toLocaleString()}
                      </p>
                    </td>

                    {/* Stock Status Toggle */}
                    <td className="py-3 px-3 sm:px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStock(item)}
                        className={`inline-flex items-center space-x-1 text-[10px] sm:text-[11px] font-semibold px-2 py-1 rounded transition-colors ${
                          item.isInStock !== false
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 hover:bg-red-100'
                        }`}
                        title="Click to toggle in-stock / out-of-stock"
                      >
                        {item.isInStock !== false ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>In Stock</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3 text-red-600" />
                            <span>Out of Stock</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-3 sm:px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 text-slate-600 hover:text-brand-navy hover:bg-slate-100 rounded transition-colors"
                          title="Edit Outfit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          disabled={deletingId === item.id}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-40"
                          title="Delete Outfit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for creating/editing */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchProducts}
        productToEdit={editingProduct}
      />
    </div>
  );
}
