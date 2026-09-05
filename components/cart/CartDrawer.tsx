'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export const CartDrawer: React.FC = () => {
  const { 
    items, 
    isOpen, 
    toggleCart, 
    updateQuantity, 
    removeItem, 
    getSubtotalKes,
    currency
  } = useCartStore();

  if (!isOpen) return null;

  const subtotalKes = getSubtotalKes();
  const formattedSubtotal = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(subtotalKes);

  // White glove delivery threshold (KES 50,000)
  const freeShippingThreshold = 50000;
  const progressToFreeShipping = Math.min(100, (subtotalKes / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={() => toggleCart(false)}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-brand-gold/30">
          
          {/* Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 bg-brand-navy text-white flex items-center justify-between border-b border-brand-gold/20">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-gold" />
              <h2 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                Your Sartorial Wardrobe
              </h2>
            </div>
            <button
              onClick={() => toggleCart(false)}
              className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary White Glove Delivery Meter */}
          <div className="bg-brand-canvas-alt px-4 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200">
            <div className="flex justify-between text-xs font-semibold text-brand-slate mb-1.5">
              <span>White-Glove Nairobi Delivery</span>
              <span className="text-brand-gold">
                {subtotalKes >= freeShippingThreshold ? 'Complimentary' : 'KES 50,000 Threshold'}
              </span>
            </div>
            <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-brand-gold h-full rounded-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-3 sm:py-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-brand-canvas-alt flex items-center justify-center text-brand-slate-muted border border-slate-200">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg text-brand-navy font-bold">Your wardrobe is empty</p>
                  <p className="text-xs text-brand-slate-muted max-w-xs">
                    Explore our ready-to-wear garments or commission a bespoke fitting in Nairobi.
                  </p>
                </div>
                <Link
                  href="/ready-to-wear"
                  onClick={() => toggleCart(false)}
                  className="px-6 py-2.5 rounded-sm bg-brand-navy text-white hover:bg-brand-navy-light text-xs font-bold uppercase tracking-luxury transition-colors"
                >
                  Explore Ready to Wear
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-3.5 sm:py-4 flex space-x-3.5 sm:space-x-4">
                  <div className="relative w-16 sm:w-20 h-20 sm:h-24 bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/ready-to-wear`}
                          onClick={() => toggleCart(false)}
                          className="font-serif text-xs sm:text-sm font-semibold text-brand-navy hover:text-brand-gold line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] sm:text-xs text-brand-slate-muted mt-0.5">
                        Size: <span className="font-semibold text-brand-slate">{item.size}</span>
                      </p>
                      <p className="font-semibold text-xs sm:text-sm text-brand-navy mt-1">
                        {new Intl.NumberFormat('en-KE', {
                          style: 'currency',
                          currency: 'KES',
                          maximumFractionDigits: 0,
                        }).format(item.priceKes)}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center hover:border-brand-navy text-brand-slate"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-slate-300 flex items-center justify-center hover:border-brand-navy text-brand-slate"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 bg-brand-canvas-alt border-t border-slate-200 space-y-3.5 sm:space-y-4">
              <div className="space-y-1.5 text-xs text-brand-slate-muted">
                <div className="flex justify-between text-sm font-bold text-brand-navy">
                  <span>Estimated Total</span>
                  <span className="font-serif text-base text-brand-gold-dark">{formattedSubtotal}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Taxes, white-glove packaging, and bespoke cedar hangers included.
                </p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/cart"
                  onClick={() => toggleCart(false)}
                  className="w-full flex items-center justify-center space-x-2 py-3 bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-luxury text-xs rounded transition-all shadow-md"
                >
                  <span>Review Wardrobe & Checkout</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </Link>

                <button
                  onClick={() => toggleCart(false)}
                  className="w-full py-2.5 text-center text-xs text-brand-slate-muted hover:text-brand-navy font-semibold transition-colors"
                >
                  Continue Browsing
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Encrypted Sartorial Concierge Transaction</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
