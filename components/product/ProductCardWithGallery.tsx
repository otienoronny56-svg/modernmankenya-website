'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  X,
  Layers
} from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { GarmentZoomModal } from './GarmentZoomModal';

interface ProductCardWithGalleryProps {
  product: Product;
}

export function ProductCardWithGallery({ product }: ProductCardWithGalleryProps) {
  const images = product.images.length > 0 ? product.images : ['/images/bespoke-placeholder.jpg'];
  const hasMultipleImages = images.length > 1;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToast, setAddedToast] = useState(false);

  const { addItem, currency } = useCartStore();

  // Multi-currency calculation
  const formattedPrice = () => {
    if (currency === 'USD') return `$${product.priceUsd.toLocaleString()}`;
    if (currency === 'GBP') return `£${Math.round(product.priceUsd * 0.79).toLocaleString()}`;
    return `KES ${product.priceKes.toLocaleString()}`;
  };

  // When hovering without having clicked arrows, show second angle
  const displayedIndex = isHovered && activeImageIndex === 0 && hasMultipleImages
    ? 1
    : activeImageIndex;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setActiveImageIndex(idx);
  };

  const handleOpenZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsZoomModalOpen(true);
  };

  const handleQuickAddSubmit = (size: string) => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      priceKes: product.priceKes,
      priceUsd: product.priceUsd,
      size,
      color: product.variants[0]?.color || 'Bespoke',
      image: images[0],
    });
    setAddedToast(true);
    setIsQuickAddOpen(false);
    setTimeout(() => setAddedToast(false), 2500);
  };

  return (
    <>
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-luxury hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
      >
        {/* ================= PHOTO & MULTI-ANGLE CAROUSEL AREA ================= */}
        <div className="relative h-[320px] sm:h-[380px] bg-slate-100 overflow-hidden select-none">
          {/* Main Image with smooth fade on change */}
          <div className="relative w-full h-full">
            <Image
              src={images[displayedIndex]}
              alt={`${product.name} view ${displayedIndex + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-500 group-hover:scale-105"
            />
          </div>

          {/* Canvas Construction Badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-brand-navy/90 text-brand-gold border border-brand-gold/30 text-[10px] uppercase font-bold tracking-luxury px-2.5 py-1 rounded backdrop-blur-md shadow-sm">
              {product.construction.split(' ')[0]} {product.construction.split(' ')[1] || 'Canvas'}
            </span>
          </div>

          {/* Zoom / Inspect Details Button */}
          <button
            onClick={handleOpenZoom}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/60 hover:bg-brand-navy text-white hover:text-brand-gold border border-white/20 transition-all backdrop-blur-sm shadow-md opacity-80 group-hover:opacity-100 group-hover:scale-110"
            title="Click to Zoom & Inspect Fabric"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          {/* Left & Right Interactive Carousel Arrows */}
          {hasMultipleImages && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-brand-navy text-white hover:text-brand-gold border border-white/20 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
                aria-label="Previous photo angle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2 rounded-full bg-black/50 hover:bg-brand-navy text-white hover:text-brand-gold border border-white/20 backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 shadow-md"
                aria-label="Next photo angle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dots Pagination Indicators */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center space-x-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => handleDotClick(idx, e)}
                  className={`h-1.5 rounded-full transition-all ${
                    displayedIndex === idx
                      ? 'w-6 bg-brand-gold shadow-sm'
                      : 'w-1.5 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                />
              ))}
            </div>
          )}

          {/* Angles Counter Badge */}
          {hasMultipleImages && (
            <div className="absolute bottom-3 right-3 z-10 hidden sm:flex items-center space-x-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
              <Layers className="w-2.5 h-2.5 text-brand-gold" />
              <span>{displayedIndex + 1}/{images.length}</span>
            </div>
          )}

          {/* Quick Add Sizing Drawer (Slide up overlay) */}
          {isQuickAddOpen && (
            <div className="absolute inset-0 bg-brand-navy/95 p-5 flex flex-col justify-between text-white z-30 animate-in fade-in duration-200">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
                    Select Sizing
                  </span>
                  <button
                    onClick={() => setIsQuickAddOpen(false)}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => handleQuickAddSubmit(v.size)}
                      className="py-2.5 px-3 bg-white/10 hover:bg-brand-gold hover:text-brand-navy text-xs font-bold uppercase rounded border border-white/15 transition-all text-center"
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-slate-400 text-center">
                Full floating canvas • Master tailored in Nairobi
              </p>
            </div>
          )}
        </div>

        {/* ================= PRODUCT DETAILS AREA ================= */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="capitalize font-semibold text-brand-gold">
                {product.category.replace('-', ' ')}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                {hasMultipleImages ? `${images.length} Angles` : 'Atelier Cut'}
              </span>
            </div>

            <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy group-hover:text-brand-gold-dark transition-colors line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Investment
              </span>
              <span className="font-serif font-bold text-base sm:text-lg text-brand-navy">
                {formattedPrice()}
              </span>
            </div>

            <button
              onClick={() => setIsQuickAddOpen(true)}
              className="px-3.5 sm:px-4 py-2 bg-brand-navy hover:bg-brand-navy-dark text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded transition-colors flex items-center space-x-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-brand-gold" />
              <span>{addedToast ? 'Added!' : 'Add to Bag'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Garment Inspection & Magnifying Zoom Modal */}
      <GarmentZoomModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        product={product}
        initialIndex={displayedIndex}
      />
    </>
  );
}
