'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  ShoppingBag, 
  Sparkles, 
  Check, 
  ZoomIn, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Layers, 
  MessageCircle, 
  ArrowLeft,
  ChevronLeft,
  Sliders,
  Scissors
} from 'lucide-react';
import type { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { formatCurrencyPrice } from '@/lib/currency';
import { GarmentZoomModal } from '@/components/product/GarmentZoomModal';
import { ProductCardWithGallery } from '@/components/product/ProductCardWithGallery';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomModalOpen, setIsZoomModalOpen] = useState(false);

  // Magnifying Glass Hover State
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Shopping state
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  const { addItem, currency } = useCartStore();

  // Fetch product data
  useEffect(() => {
    if (!slug) return;

    async function loadProduct() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          const all: Product[] = data.products || [];
          const found = all.find((p) => p.slug === slug || p.id === slug);
          if (found) {
            setProduct(found);
            setSelectedImageIndex(0);
            if (found.variants && found.variants.length > 0) {
              setSelectedSize(found.variants[0].size);
            } else {
              setSelectedSize('Standard');
            }

            // Find related products in the same category
            const related = all
              .filter((p) => p.slug !== found.slug && p.category === found.category)
              .slice(0, 4);
            setRelatedProducts(related);
          }
        }
      } catch (err) {
        console.error('Failed to load product:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [slug]);

  // Handle Mouse Movement for Smooth 2.5x Magnifier Lens
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePosition({ x, y });
  };

  const handleAddToCart = () => {
    if (!product) return;
    const size = selectedSize || product.variants?.[0]?.size || 'Standard';

    for (let i = 0; i < quantity; i++) {
      addItem({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        priceKes: product.priceKes,
        priceUsd: product.priceUsd,
        size,
        color: product.variants?.[0]?.color || 'Made to Measure',
        image: product.images[0] || '/images/bespoke-placeholder.jpg',
      });
    }

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-2 border-brand-navy border-t-brand-gold rounded-full animate-spin mb-4" />
        <p className="font-serif text-sm text-slate-500 tracking-wider">Loading Atelier Timepiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <h2 className="font-serif text-2xl font-bold text-brand-navy mb-2">Product Not Found</h2>
        <p className="text-sm text-slate-500 max-w-md mb-6">
          The requested item may have been moved or is an exclusive private atelier commission.
        </p>
        <Link
          href="/ready-to-wear"
          className="px-6 py-2.5 bg-brand-navy text-white text-xs font-bold uppercase tracking-luxury rounded hover:bg-brand-navy-dark transition-colors"
        >
          Return to Ready-to-Wear
        </Link>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : ['/images/bespoke-placeholder.jpg'];
  const formattedPrice = formatCurrencyPrice(product.priceKes, currency, product.priceUsd);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20 pt-6 sm:pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= BREADCRUMBS ================= */}
        <nav className="flex items-center space-x-2 text-xs text-slate-400 mb-6 sm:mb-8">
          <Link href="/" className="hover:text-brand-navy transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/ready-to-wear" className="hover:text-brand-navy transition-colors">
            Ready-to-Wear
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="capitalize text-brand-gold font-medium">
            {product.category.replace('-', ' ')}
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 font-semibold truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* ================= MAIN PRODUCT DETAIL GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: MULTI-IMAGE GALLERY WITH HOVER MAGNIFIER (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 items-start">
            
            {/* Multi-Angle Vertical Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex md:flex-col gap-3 w-full md:w-24 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0 scrollbar-none flex-shrink-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-24 md:w-24 md:h-28 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 bg-slate-100 ${
                      selectedImageIndex === idx
                        ? 'border-brand-gold shadow-md ring-2 ring-brand-gold/20 scale-102'
                        : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-300'
                    }`}
                    title={`View Angle ${idx + 1}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] font-bold px-1 rounded">
                      0{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Main Interactive Magnifier Hero Box */}
            <div className="relative flex-1 w-full bg-white rounded-xl border border-slate-200 shadow-luxury overflow-hidden">
              
              {/* Image Container with Mouse Tracking */}
              <div
                ref={imageContainerRef}
                onMouseEnter={() => setIsHoveringImage(true)}
                onMouseLeave={() => setIsHoveringImage(false)}
                onMouseMove={handleMouseMove}
                onClick={() => setIsZoomModalOpen(true)}
                className="relative aspect-square sm:aspect-[4/5] w-full bg-slate-100 cursor-crosshair overflow-hidden select-none"
              >
                {/* Normal Image */}
                <Image
                  src={images[selectedImageIndex]}
                  alt={`${product.name} active view`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`object-cover transition-transform duration-200 ${
                    isHoveringImage ? 'scale-100' : 'scale-100'
                  }`}
                />

                {/* Live 2.5x Magnifying Lens Overlay */}
                {isHoveringImage && (
                  <div
                    className="absolute inset-0 pointer-events-none z-20 hidden md:block bg-no-repeat"
                    style={{
                      backgroundImage: `url(${images[selectedImageIndex]})`,
                      backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                      backgroundSize: '260%',
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.15)',
                    }}
                  />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                  <span className="bg-brand-navy/90 text-brand-gold border border-brand-gold/30 text-[10px] uppercase font-bold tracking-luxury px-3 py-1 rounded-full backdrop-blur-md shadow-sm">
                    {product.construction.split(' ')[0] || 'Precision'}
                  </span>
                  <span className="bg-white/90 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-200 shadow-sm">
                    Angle {selectedImageIndex + 1} of {images.length}
                  </span>
                </div>

                {/* Magnifier / Zoom Fullscreen Trigger */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomModalOpen(true);
                  }}
                  className="absolute bottom-4 right-4 z-10 p-2.5 rounded-full bg-brand-navy/85 hover:bg-brand-navy text-brand-gold border border-brand-gold/30 backdrop-blur-md shadow-lg transition-all hover:scale-110 flex items-center space-x-1.5 text-xs font-bold"
                  title="Open Fullscreen Lightbox"
                >
                  <ZoomIn className="w-4 h-4" />
                  <span className="hidden sm:inline text-[11px] text-white">Full Inspection</span>
                </button>

                {/* Desktop Hover Hint */}
                <div className="absolute bottom-4 left-4 z-10 hidden md:flex items-center space-x-1.5 bg-black/60 text-white/90 text-[10px] px-3 py-1 rounded-full backdrop-blur-sm pointer-events-none">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  <span>Hover to magnify • Click to expand</span>
                </div>
              </div>

              {/* Prev / Next Angle Bar on Mobile */}
              {images.length > 1 && (
                <div className="flex md:hidden items-center justify-between p-3 border-t border-slate-100 bg-slate-50/50">
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                    className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>
                  <span className="text-xs font-bold text-slate-500">
                    {selectedImageIndex + 1} / {images.length}
                  </span>
                  <button
                    onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                    className="p-1.5 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: PRODUCT SPECIFICATIONS & ORDERING (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-luxury">
            
            {/* Header info */}
            <div className="space-y-2 border-b border-slate-100 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-luxury text-brand-gold bg-brand-navy/5 px-2.5 py-0.5 rounded">
                  {product.category}
                </span>
                <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>In Stock • Ready to Dispatch</span>
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy leading-tight">
                {product.name}
              </h1>

              {product.tagline && (
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  {product.tagline}
                </p>
              )}

              {/* Price Row */}
              <div className="pt-2 flex items-baseline space-x-3">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
                  {formattedPrice}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  Tax inclusive • Free Delivery in Nairobi
                </span>
              </div>
            </div>

            {/* Sizing / Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold uppercase tracking-wider text-brand-navy">
                    Select Specification / Size
                  </label>
                  <span className="text-slate-400 font-medium">
                    {selectedSize}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedSize(v.size)}
                      className={`py-2.5 px-3 text-xs font-bold rounded border transition-all text-center ${
                        selectedSize === v.size
                          ? 'bg-brand-navy text-white border-brand-navy shadow-sm ring-2 ring-brand-gold/30'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-brand-gold hover:bg-white'
                      }`}
                    >
                      {v.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add to Bag CTA */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3">
                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded bg-white text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors shadow-xs"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-brand-navy">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 rounded bg-white text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center transition-colors shadow-xs"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-brand-navy hover:bg-brand-navy-dark active:scale-[0.99] text-white font-bold uppercase tracking-luxury text-xs rounded-lg shadow-md transition-all flex items-center justify-center space-x-2 border border-brand-gold/30"
                >
                  <ShoppingBag className="w-4 h-4 text-brand-gold" />
                  <span>{addedToast ? 'Added to Bag ✓' : 'Add to Bag'}</span>
                </button>
              </div>

              {/* Direct WhatsApp Ordering Button */}
              <a
                href={`https://wa.me/254114122510?text=${encodeURIComponent(
                  `Hello Modern Man Kenya, I would like to order: ${product.name} (Qty: ${quantity}, KES ${(
                    product.priceKes * quantity
                  ).toLocaleString()}). Link: https://www.modernmanke.com/ready-to-wear/${product.slug}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order Instantly via WhatsApp</span>
              </a>
            </div>

            {/* Description & Material Accordion */}
            <div className="space-y-4 pt-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              <div>
                <h4 className="font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                  The Sartorial Description
                </h4>
                <p>{product.description}</p>
              </div>

              {/* Technical Specifications */}
              <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 space-y-2">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Materials / Finishing:</span>
                  <span className="font-bold text-brand-navy text-right max-w-[200px]">
                    {product.fabricDetails}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200/50 pt-2">
                  <span className="font-semibold text-slate-500">Movement / Craft:</span>
                  <span className="font-bold text-brand-navy text-right max-w-[200px]">
                    {product.construction}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200/50 pt-2">
                  <span className="font-semibold text-slate-500">Atelier Origin:</span>
                  <span className="font-bold text-brand-navy">Trust Mansion, Tubman Rd, Nairobi</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-slate-500 text-center font-medium">
                <div className="p-2 rounded bg-slate-50 border border-slate-200/50 flex flex-col items-center space-y-1">
                  <Truck className="w-4 h-4 text-brand-gold" />
                  <span>Nairobi Express</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200/50 flex flex-col items-center space-y-1">
                  <ShieldCheck className="w-4 h-4 text-brand-gold" />
                  <span>Authentic Certified</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200/50 flex flex-col items-center space-y-1">
                  <Scissors className="w-4 h-4 text-brand-gold" />
                  <span>Made to Measure</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RELATED PRODUCTS / PAIRS ELEGANTLY WITH ================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-luxury text-brand-gold">
                  Curated Ensemble
                </span>
                <h3 className="font-serif text-2xl font-bold text-brand-navy mt-1">
                  Pairs Elegantly With
                </h3>
              </div>
              <Link
                href="/ready-to-wear"
                className="text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors flex items-center space-x-1"
              >
                <span>View Entire Collection</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCardWithGallery key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen Modal Lightbox */}
      <GarmentZoomModal
        isOpen={isZoomModalOpen}
        onClose={() => setIsZoomModalOpen(false)}
        product={product}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
}
