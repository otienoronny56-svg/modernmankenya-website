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
  Check, 
  Sparkles 
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getSubtotalKes, currency } = useCartStore();
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const subtotalKes = getSubtotalKes();
  const freeShippingThreshold = 50000;
  const shippingCost = subtotalKes >= freeShippingThreshold || items.length === 0 ? 0 : 2500;
  const giftWrapCost = giftWrap ? 3500 : 0;
  const totalKes = subtotalKes + shippingCost + giftWrapCost;

  const handleCheckout = () => {
    const generatedOrder = `MMK-${Date.now().toString().slice(-6)}`;
    setOrderNumber(generatedOrder);
    setCheckoutComplete(true);
    clearCart();
  };

  if (checkoutComplete) {
    return (
      <div className="min-h-screen bg-brand-canvas-alt py-20">
        <div className="max-w-2xl mx-auto px-4 text-center bg-white p-12 rounded-lg shadow-luxury border border-slate-200 space-y-6">
          <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mx-auto flex items-center justify-center border-2 border-brand-gold">
            <Check className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Order Dispatched to Tailoring Concierge
            </span>
            <h1 className="font-serif text-3xl font-bold text-brand-navy">
              Thank You for Your Patronage
            </h1>
            <p className="text-sm text-slate-600 font-light max-w-md mx-auto">
              Your garments have been assigned to our master tailors. Order Reference:
            </p>
            <span className="inline-block px-4 py-1.5 bg-brand-navy text-brand-gold font-mono font-bold text-sm rounded mt-2">
              {orderNumber}
            </span>
          </div>

          <p className="text-xs text-brand-slate-muted max-w-md mx-auto">
            Our Nairobi concierge will reach out within 2 hours to confirm delivery schedule, 
            final basting dates, or complimentary garment bag preferences.
          </p>

          <div className="pt-4 flex justify-center gap-4">
            <Link
              href="/ready-to-wear"
              className="px-6 py-3 bg-brand-navy text-white text-xs font-bold uppercase tracking-luxury rounded hover:bg-brand-navy-light"
            >
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-canvas-alt py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 space-y-2">
          <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Review & Checkout</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-brand-navy font-bold">
            Your Sartorial Wardrobe
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-16 text-center border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-4">
            <ShoppingBag className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
            <h2 className="font-serif text-xl font-bold text-brand-navy">Your wardrobe is empty</h2>
            <p className="text-xs text-brand-slate-muted max-w-sm mx-auto">
              Discover our Ready-to-Wear garments or commission an individual bespoke suit.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/ready-to-wear"
                className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold uppercase tracking-luxury rounded transition-colors"
              >
                Explore Ready to Wear
              </Link>
              <Link
                href="/book-appointment"
                className="px-6 py-3 border border-brand-navy text-brand-navy text-xs font-bold uppercase tracking-luxury rounded hover:bg-slate-50 transition-colors"
              >
                Book Bespoke Fitting
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Items Table */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h2 className="font-serif text-lg font-bold text-brand-navy">
                    Garment Selections ({items.length})
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-xs text-slate-400 hover:text-red-600 transition-colors"
                  >
                    Clear Wardrobe
                  </button>
                </div>

                <div className="divide-y divide-slate-100 p-6 space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="pt-6 first:pt-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 items-start sm:items-center justify-between">
                      <div className="flex space-x-4 items-center">
                        <div className="relative w-20 h-24 bg-slate-100 rounded overflow-hidden flex-shrink-0 border border-slate-200">
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
                            className="font-serif text-base font-bold text-brand-navy hover:text-brand-gold transition-colors line-clamp-1"
                          >
                            {item.name}
                          </Link>
                          <p className="text-xs text-brand-slate-muted mt-1">
                            Size: <span className="font-semibold text-brand-navy">{item.size}</span>
                          </p>
                          <p className="text-xs font-bold text-brand-navy font-serif mt-1">
                            {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(item.priceKes)}
                          </p>
                        </div>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center hover:border-brand-navy"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded border border-slate-300 flex items-center justify-center hover:border-brand-navy"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-brand-navy w-28 text-right">
                          {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(item.priceKes * item.quantity)}
                        </span>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bespoke Packaging & Gift Message */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center space-x-3">
                  <Gift className="w-5 h-5 text-brand-gold flex-shrink-0" />
                  <div>
                    <h3 className="font-serif text-sm font-bold text-brand-navy">
                      Signature Luxury Packaging & Gift Card
                    </h3>
                    <p className="text-xs text-brand-slate-muted">
                      Every piece arrives in a breathable canvas garment bag with cedar hanger. Add our gold-embossed presentation box.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="giftWrap"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded border-slate-300 text-brand-navy focus:ring-brand-gold"
                  />
                  <label htmlFor="giftWrap" className="text-xs font-semibold text-brand-navy cursor-pointer">
                    Add Gold-Embossed Presentation Box & Wax-Sealed Handwritten Card (+ KES 3,500)
                  </label>
                </div>

                {giftWrap && (
                  <textarea
                    rows={2}
                    placeholder="Write your personal message to be inscribed in calligraphy..."
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded border border-slate-300 focus:outline-none focus:border-brand-navy"
                  />
                )}
              </div>

            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-luxury border border-slate-200 space-y-6">
                <h3 className="font-serif text-lg font-bold text-brand-navy border-b border-slate-100 pb-3">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Wardrobe Subtotal</span>
                    <span className="font-semibold text-brand-navy">
                      {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(subtotalKes)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>White-Glove Nairobi Delivery</span>
                    <span className="font-semibold text-brand-navy">
                      {shippingCost === 0 ? 'Complimentary' : 'KES 2,500'}
                    </span>
                  </div>

                  {giftWrap && (
                    <div className="flex justify-between">
                      <span>Gold Presentation Box</span>
                      <span className="font-semibold text-brand-navy">KES 3,500</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>VAT (16% Included)</span>
                    <span className="text-slate-400">Included</span>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex justify-between items-end">
                    <span className="font-bold text-sm text-brand-navy">Total Investment</span>
                    <span className="font-serif text-2xl font-bold text-brand-navy">
                      {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(totalKes)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all shadow-gold flex items-center justify-center space-x-2"
                >
                  <span>Proceed to White-Glove Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="space-y-2 pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>Same-day hand delivery available in Nairobi</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>Complimentary lifetime seam adjustments</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
