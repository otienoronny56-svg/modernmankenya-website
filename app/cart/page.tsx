'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Gift, 
  Sparkles 
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatCurrencyPrice } from '@/lib/currency';
import { ExpressCheckout } from '@/components/checkout/ExpressCheckout';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotalKes, currency } = useCartStore();
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  const subtotalKes = getSubtotalKes();

  return (
    <div className="min-h-screen bg-brand-canvas-alt py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-8 sm:mb-10 space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center justify-center sm:justify-start space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Review & Express Checkout</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">
            Your Selected Ensembles & Accessories
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Order custom shirts, luxury accessories, and ready garments with instant dispatch.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 sm:p-16 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy">
              Your bag is currently empty
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Explore our custom shirts, ties, cufflinks, and tailored ensembles to place an order.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/ready-to-wear"
                className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold uppercase tracking-luxury rounded transition-colors shadow-sm"
              >
                Browse Curated Ensembles
              </Link>
              <Link
                href="/gallery"
                className="px-6 py-3 border border-brand-navy text-brand-navy text-xs font-bold uppercase tracking-luxury rounded hover:bg-slate-50 transition-colors"
              >
                View Atelier Portfolio
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Items Table */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 sm:p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h2 className="font-serif text-base sm:text-lg font-bold text-brand-navy flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4 text-brand-gold" />
                    <span>Garment Selections ({items.length})</span>
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                <div className="divide-y divide-slate-100 p-5 sm:p-6 space-y-5">
                  {items.map((item) => (
                    <div key={item.id} className="pt-5 first:pt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-start sm:items-center justify-between">
                      <div className="flex space-x-3.5 items-center">
                        <div className="relative w-16 sm:w-20 h-20 sm:h-24 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <Link
                            href="/ready-to-wear"
                            className="font-serif text-sm sm:text-base font-bold text-brand-navy hover:text-brand-gold transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          {item.size && (
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              Size / Fit: <span className="font-semibold text-brand-navy">{item.size}</span>
                            </p>
                          )}
                          <p className="text-xs font-bold text-brand-navy font-mono mt-1">
                            {formatCurrencyPrice(item.priceKes, currency, item.priceUsd)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center space-x-4 self-end sm:self-center">
                        <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 rounded p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-slate-600"
                            title="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center hover:bg-white text-slate-600"
                            title="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-mono text-xs sm:text-sm font-bold text-brand-navy w-24 text-right">
                          {formatCurrencyPrice(item.priceKes * item.quantity, currency, item.priceUsd * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 p-1.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Packaging & Gift Message */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
                <div className="flex items-center space-x-3">
                  <Gift className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-sm font-bold text-brand-navy">
                      Signature Luxury Packaging Included
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Every piece arrives pressed, protected in breathable garment bags, and gift-ready.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Instant Express Checkout Form (with Google Sign-In & Dual Order Buttons) */}
            <div className="lg:col-span-6">
              <ExpressCheckout />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
