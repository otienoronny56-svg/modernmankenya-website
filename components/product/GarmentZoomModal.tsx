'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ZoomIn, 
  ShoppingBag, 
  Check, 
  ShieldCheck 
} from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';

interface GarmentZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  initialIndex?: number;
}

export function GarmentZoomModal({
  isOpen,
  onClose,
  product,
  initialIndex = 0,
}: GarmentZoomModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [addedToast, setAddedToast] = useState(false);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    setActiveIndex(initialIndex);
    if (product && product.variants.length > 0) {
      setSelectedSize(product.variants[0].size);
    }
  }, [product, initialIndex, isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, product]);

  if (!isOpen || !product) return null;

  const images = product.images.length > 0 ? product.images : ['/images/bespoke-placeholder.jpg'];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePos({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      priceKes: product.priceKes,
      priceUsd: product.priceUsd,
      size: selectedSize,
      color: product.variants[0]?.color || 'Bespoke',
      image: images[0],
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-brand-navy-dark text-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-white/15 max-h-[92vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/60 hover:bg-black text-slate-300 hover:text-white transition-all shadow-lg"
          title="Close (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT / CENTER: Interactive Zoom & Lightbox Viewer */}
        <div className="flex-1 flex flex-col justify-between bg-black/50 p-4 sm:p-6 relative min-h-[350px] sm:min-h-[500px]">
          {/* Zoom Hint Indicator */}
          <div className="absolute top-4 left-4 z-20 flex items-center space-x-2 bg-black/60 px-3 py-1.5 rounded-full text-[11px] text-brand-gold border border-brand-gold/30 backdrop-blur-sm">
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Hover to inspect stitching & cloth weave</span>
          </div>

          {/* Main Inspection Canvas */}
          <div
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            className="relative flex-1 w-full h-[320px] sm:h-[480px] lg:h-[540px] overflow-hidden rounded-lg cursor-crosshair bg-neutral-900 flex items-center justify-center select-none"
          >
            <Image
              src={images[activeIndex]}
              alt={`${product.name} angle ${activeIndex + 1}`}
              fill
              priority
              className={`object-contain transition-transform duration-100 ease-out ${
                isZoomed ? 'scale-[2.4]' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }
                  : undefined
              }
            />

            {/* Previous Angle Button */}
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-brand-navy hover:text-brand-gold text-white border border-white/20 transition-all shadow-lg backdrop-blur-sm z-20"
                aria-label="Previous angle"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Angle Button */}
            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-brand-navy hover:text-brand-gold text-white border border-white/20 transition-all shadow-lg backdrop-blur-sm z-20"
                aria-label="Next angle"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Thumbnail Angles Selector Strip */}
          {images.length > 1 && (
            <div className="flex items-center justify-center space-x-3 pt-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative w-14 h-16 sm:w-16 sm:h-20 rounded overflow-hidden border-2 transition-all flex-shrink-0 ${
                    activeIndex === idx
                      ? 'border-brand-gold ring-2 ring-brand-gold/40 scale-105'
                      : 'border-white/20 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Angle ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute bottom-0.5 right-0.5 bg-black/80 text-[9px] font-bold text-brand-gold px-1 rounded">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Sartorial Garment Details & Quick Add */}
        <div className="w-full lg:w-80 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-brand-navy/90 backdrop-blur-md overflow-y-auto">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-brand-gold font-bold px-2 py-0.5 bg-white/5 border border-brand-gold/30 rounded inline-block mb-2">
                {product.category.replace('-', ' ')}
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                {product.name}
              </h2>
              {product.tagline && (
                <p className="text-xs text-brand-gold font-medium mt-1">
                  {product.tagline}
                </p>
              )}
            </div>

            {/* Pricing */}
            <div className="pt-2 border-t border-white/10">
              <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Investment
              </p>
              <div className="flex items-baseline space-x-3 mt-1">
                <span className="font-serif font-bold text-2xl text-white">
                  KES {product.priceKes.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  (${product.priceUsd.toLocaleString()})
                </span>
              </div>
            </div>

            {/* Fabric & Silhouette */}
            <div className="space-y-2 text-xs text-slate-300">
              <div>
                <p className="font-bold text-white uppercase text-[10px] tracking-wider text-slate-400">
                  Cloth Mill & Composition
                </p>
                <p className="mt-0.5 font-medium">{product.fabricDetails}</p>
              </div>

              <div>
                <p className="font-bold text-white uppercase text-[10px] tracking-wider text-slate-400">
                  Internal Construction
                </p>
                <p className="mt-0.5 font-medium">{product.construction}</p>
              </div>

              <div className="pt-1">
                <p className="font-bold text-white uppercase text-[10px] tracking-wider text-slate-400">
                  Atelier Notes
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300 line-clamp-3">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <p className="font-bold text-white uppercase text-[10px] tracking-wider text-slate-400 mb-2">
                Select Tailored Size
              </p>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedSize(v.size)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                      selectedSize === v.size
                        ? 'bg-brand-gold text-brand-navy font-bold shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {v.size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Shopping Bag Action */}
          <div className="pt-6 border-t border-white/10 mt-6 space-y-3">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 px-4 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-gold flex items-center justify-center space-x-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedToast ? 'Added to Wardrobe!' : 'Add to Shopping Bag'}</span>
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-gold" />
              <span>Full Canvas • Nairobi Flagship Fitting Included</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
