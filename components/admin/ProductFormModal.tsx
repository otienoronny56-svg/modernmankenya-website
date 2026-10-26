'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  X, 
  UploadCloud, 
  Trash2, 
  Sparkles, 
  Wand2,
  Loader2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Plus, 
  Check, 
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import type { Product, ProductAudience } from '@/types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  productToEdit?: Product | null;
}

const CATEGORIES = [
  { id: 'accessories', name: 'Accessories (Ties, Cufflinks, Belts, Pins, Watches)' },
  { id: 'shirts', name: 'Tailored Ready-to-Wear Shirts' },
];

const CATEGORY_SIZE_PRESETS: Record<string, string[]> = {
  accessories: ['One Size', 'Standard Set', 'Adjustable', '32-34 (M)', '36-38 (L)', '40-42 (XL)', '40mm Dial', '42mm Dial'],
  shirts: ['15.0" (38cm)', '15.5" (39cm)', '16.0" (41cm)', '16.5" (42cm)', '17.0" (43cm)', 'S', 'M', 'L', 'XL', 'XXL'],
};

const CATEGORY_DEFAULTS: Record<string, {
  fabricDetails: string;
  construction: string;
  priceKes: number | string;
  priceUsd: number | string;
  selectedSizes: string[];
}> = {
  accessories: {
    fabricDetails: 'Pure Jacquard Silk / Solid Polished Brass',
    construction: 'Artisanal Hand-finished detailing with presentation gift box',
    priceKes: 4500,
    priceUsd: 35,
    selectedSizes: ['One Size'],
  },
  shirts: {
    fabricDetails: '100% Egyptian Giza Cotton (120/2 Two-Ply Weave)',
    construction: 'Single-needle tailor stitching with mother-of-pearl buttons',
    priceKes: 14500,
    priceUsd: 115,
    selectedSizes: ['15.5" (39cm)', '16.0" (41cm)', '16.5" (42cm)', 'M', 'L', 'XL'],
  },
};

export function ProductFormModal({
  isOpen,
  onClose,
  onSaved,
  productToEdit,
}: ProductFormModalProps) {
  const isEditing = Boolean(productToEdit);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('accessories');
  const [audience, setAudience] = useState<'modernman' | 'modernwoman' | 'modernchild'>('modernman');
  const [fabricDetails, setFabricDetails] = useState('');
  const [construction, setConstruction] = useState('Artisanal Hand-finished detailing with presentation gift box');
  const [priceKes, setPriceKes] = useState<number | string>(4500);
  const [priceUsd, setPriceUsd] = useState<number | string>(35);
  const [images, setImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['One Size']);
  const [customSizeInput, setCustomSizeInput] = useState('');
  const [isInStock, setIsInStock] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  // Direct image URL input state
  const [customImageUrl, setCustomImageUrl] = useState('');

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Gemini AI Generation state
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState<string | null>(null);
  const [aiHint, setAiHint] = useState('');
  const [showHintInput, setShowHintInput] = useState(false);
  const [detailsList, setDetailsList] = useState<string[]>([]);
  const [newDetailInput, setNewDetailInput] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setSlug(productToEdit.slug || '');
      setTagline(productToEdit.tagline || '');
      setDescription(productToEdit.description || '');
      setCategory(productToEdit.category || 'accessories');
      setAudience(productToEdit.audience || 'modernman');
      setFabricDetails(productToEdit.fabricDetails || '');
      setConstruction(productToEdit.construction || 'Artisanal Hand-finished detailing with presentation gift box');
      setPriceKes(productToEdit.priceKes || 4500);
      setPriceUsd(productToEdit.priceUsd || 35);
      setImages(productToEdit.images || []);
      setIsInStock(productToEdit.isInStock !== undefined ? productToEdit.isInStock : true);
      setIsFeatured(Boolean(productToEdit.isFeatured));
      setDetailsList(productToEdit.detailsList || []);
      setAiSuccessMessage(null);
      setAiHint('');
      setShowHintInput(false);
      if (productToEdit.variants && productToEdit.variants.length > 0) {
        setSelectedSizes(productToEdit.variants.map((v) => v.size));
      } else {
        const catPresets = CATEGORY_SIZE_PRESETS[productToEdit.category || 'accessories'] || ['One Size'];
        setSelectedSizes([catPresets[0]]);
      }
    } else {
      // Reset form to clean accessories default
      setName('');
      setSlug('');
      setTagline('');
      setDescription('');
      setCategory('accessories');
      setAudience('modernman');
      setFabricDetails('Pure Jacquard Silk / Solid Polished Brass');
      setConstruction('Artisanal Hand-finished detailing with presentation gift box');
      setPriceKes(4500);
      setPriceUsd(35);
      setImages([]);
      setSelectedSizes(['One Size']);
      setIsInStock(true);
      setIsFeatured(false);
      setDetailsList([]);
      setAiSuccessMessage(null);
      setAiHint('');
      setShowHintInput(false);
      setError(null);
    }
  }, [productToEdit, isOpen]);

  // Automatically generate slug and USD estimate when name/price changes
  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handlePriceKesChange = (val: string) => {
    const num = parseFloat(val) || 0;
    setPriceKes(val);
    // 1 USD ~ 129.5 KES
    setPriceUsd(Math.round(num / 129.5));
  };

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const defaults = CATEGORY_DEFAULTS[newCat];
    if (!isEditing && defaults) {
      setFabricDetails(defaults.fabricDetails);
      setConstruction(defaults.construction);
      setPriceKes(defaults.priceKes);
      setPriceUsd(defaults.priceUsd);
      setSelectedSizes(defaults.selectedSizes);
    }
  };

  const toggleSize = (sz: string) => {
    setSelectedSizes((prev) =>
      prev.includes(sz) ? prev.filter((s) => s !== sz) : [...prev, sz]
    );
  };

  const addCustomSize = () => {
    if (customSizeInput.trim() && !selectedSizes.includes(customSizeInput.trim())) {
      setSelectedSizes([...selectedSizes, customSizeInput.trim()]);
      setCustomSizeInput('');
    }
  };

  // Image Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to upload photo');
        }
        return data.url as string;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setError(err.message || 'Error uploading photos');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const addDirectImageUrl = () => {
    if (customImageUrl.trim()) {
      setImages((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const moveImage = (index: number, direction: 'left' | 'right') => {
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const newImages = [...images];
    const temp = newImages[index];
    newImages[index] = newImages[targetIndex];
    newImages[targetIndex] = temp;
    setImages(newImages);
  };

  const getAngleLabel = (idx: number) => {
    if (idx === 0) return '1. Cover (Front)';
    if (idx === 1) return '2. Hover (Back/Side)';
    if (idx === 2) return '3. Side Profile';
    if (idx === 3) return '4. Detail Zoom';
    return `${idx + 1}. Angle ${idx + 1}`;
  };

  // Auto-Generate Garment Profile with Gemini AI
  const handleGenerateWithAi = async () => {
    if (images.length === 0 && !aiHint.trim()) {
      setError('Please upload or provide at least one photo (or enter a style hint) so Gemini AI can analyze the garment.');
      return;
    }

    setIsGeneratingAi(true);
    setError(null);
    setAiSuccessMessage(null);

    try {
      const res = await fetch('/api/admin/ai-generate-outfit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          images,
          hint: aiHint.trim(),
          categoryHint: category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Gemini AI generation failed');
      }

      const p = data.product || data.outfit;
      if (!p) {
        throw new Error('AI returned an empty product profile');
      }

      if (p.name) {
        setName(p.name);
        if (!isEditing || !slug) {
          setSlug(
            (p.slug || p.name)
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          );
        }
      }
      if (p.tagline) setTagline(p.tagline);
      if (p.description) setDescription(p.description);
      if (p.category && CATEGORIES.some((c) => c.id === p.category)) {
        setCategory(p.category);
      }
      if (p.audience && ['modernman', 'modernwoman', 'modernchild'].includes(p.audience)) {
        setAudience(p.audience);
      }
      if (p.fabricDetails) setFabricDetails(p.fabricDetails);
      if (p.construction) setConstruction(p.construction);
      const chosenPriceKes = p.priceKes || p.suggestedPriceKes;
      if (chosenPriceKes) {
        setPriceKes(chosenPriceKes);
        setPriceUsd(p.priceUsd || p.suggestedPriceUsd || Math.round(Number(chosenPriceKes) / 129.5));
      }
      if (p.detailsList && Array.isArray(p.detailsList) && p.detailsList.length > 0) {
        setDetailsList(p.detailsList);
      }

      setAiSuccessMessage(
        '✨ Garment profile auto-crafted by Gemini AI! All fields have been populated for your review.'
      );
    } catch (err: any) {
      console.error('Gemini AI generation error:', err);
      setError(err.message || 'Gemini AI generation failed. Please check the uploaded images and try again.');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const addDetailBullet = () => {
    if (newDetailInput.trim()) {
      setDetailsList([...detailsList, newDetailInput.trim()]);
      setNewDetailInput('');
    }
  };

  const removeDetailBullet = (idxToRemove: number) => {
    setDetailsList(detailsList.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product title is required');
      return;
    }
    if (!priceKes || Number(priceKes) <= 0) {
      setError('Please enter a valid price in KES');
      return;
    }
    if (images.length === 0) {
      setError('Please upload at least one photo for the outfit');
      return;
    }

    setSubmitting(true);
    setError(null);

    const payload = {
      name,
      slug: slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline,
      description,
      category,
      audience,
      fabricDetails,
      construction,
      priceKes: Number(priceKes),
      priceUsd: Number(priceUsd),
      images,
      sizes: selectedSizes,
      isInStock,
      isFeatured,
      detailsList: detailsList.length > 0 ? detailsList : undefined,
    };

    try {
      const url = isEditing && productToEdit
        ? `/api/products/${productToEdit.id}`
        : '/api/products';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-slate-200">
        {/* Modal Header */}
        <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between border-b border-brand-gold/30 flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <Sparkles className="w-5 h-5 text-brand-gold" />
            <div>
              <h3 className="font-serif text-lg font-bold">
                {isEditing ? 'Edit Shop Product' : 'Add New Ready-to-Wear Product'}
              </h3>
              <p className="text-[11px] text-slate-300">
                Directly published to Ready-to-Wear shop for online customer ordering (Accessories & Shirts).
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Scrollable Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. PHOTO UPLOADS SECTION */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy">
                  Multi-Angle Photography (Front, Back, Side, Detail) <span className="text-red-500">*</span>
                </label>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Upload 4 to 5 photos. Photo 1 is the main cover, Photo 2 shows on hover.
                </p>
              </div>
              <span className="text-[11px] font-bold text-brand-gold bg-brand-navy/5 px-2 py-0.5 rounded">
                {images.length} photo{images.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Photo Previews Gallery with Reordering */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                {images.map((imgUrl, idx) => (
                  <div key={idx} className="relative group aspect-[3/4] rounded-md overflow-hidden bg-slate-200 border border-slate-300 shadow-sm flex flex-col justify-between">
                    <Image
                      src={imgUrl}
                      alt={`Product angle ${idx + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Top Action Row: Reorder & Delete */}
                    <div className="relative z-10 p-1.5 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
                      <div className="flex items-center space-x-1">
                        {idx > 0 && (
                          <button
                            type="button"
                            onClick={() => moveImage(idx, 'left')}
                            className="p-1 bg-black/60 hover:bg-brand-navy text-white rounded text-[9px] transition-all"
                            title="Move Earlier"
                          >
                            ←
                          </button>
                        )}
                        {idx < images.length - 1 && (
                          <button
                            type="button"
                            onClick={() => moveImage(idx, 'right')}
                            className="p-1 bg-black/60 hover:bg-brand-navy text-white rounded text-[9px] transition-all"
                            title="Move Later"
                          >
                            →
                          </button>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="p-1 bg-red-600 hover:bg-red-700 text-white rounded-full transition-all shadow-md"
                        title="Delete photo"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Bottom Angle Label Badge */}
                    <div className="relative z-10 p-1.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider block text-center ${
                        idx === 0
                          ? 'bg-brand-gold text-brand-navy'
                          : idx === 1
                          ? 'bg-white/90 text-brand-navy'
                          : 'bg-black/60 text-white'
                      }`}>
                        {getAngleLabel(idx)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Zone */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-brand-gold rounded-lg p-6 text-center cursor-pointer transition-colors bg-slate-50/50 hover:bg-amber-50/30 group"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept="image/*"
                className="hidden"
              />
              <UploadCloud className="w-8 h-8 mx-auto text-slate-400 group-hover:text-brand-gold transition-colors mb-2" />
              <p className="text-xs font-semibold text-slate-700">
                {uploading ? 'Uploading photos to Atelier store...' : 'Click to select photos from your device'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports JPG, PNG, WEBP high-resolution photography.
              </p>
            </div>

            {/* Direct Image URL input as quick alternative */}
            <div className="flex space-x-2 pt-1">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Or paste an image URL directly (e.g. https://...)"
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded focus:ring-1 focus:ring-brand-gold focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={addDirectImageUrl}
                disabled={!customImageUrl.trim()}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded disabled:opacity-40 transition-colors"
              >
                Add URL
              </button>
            </div>
          </div>

          {/* GEMINI AI SARTORIAL GENERATOR CARD */}
          <div className="relative overflow-hidden rounded-xl border border-brand-gold/40 bg-gradient-to-br from-brand-navy via-slate-900 to-brand-navy text-white p-4 sm:p-5 shadow-lg">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center text-brand-gold">
                    <Wand2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-brand-gold tracking-wide flex items-center space-x-1.5">
                      <span>Gemini Sartorial Stylist</span>
                      <span className="text-[10px] uppercase font-sans font-semibold tracking-widest px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-gold-light border border-brand-gold/30">
                        AI Multimodal
                      </span>
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      Analyzes photos to craft outfit title, category, mill details, internal canvas, editorial prose & suggested pricing.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowHintInput((prev) => !prev)}
                  className="self-start sm:self-auto text-[11px] text-brand-gold/80 hover:text-brand-gold flex items-center space-x-1 transition-colors underline-offset-4 hover:underline"
                >
                  <span>{showHintInput ? 'Hide style hint' : '+ Add optional style note / fabric mill'}</span>
                  {showHintInput ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              {/* Optional Style Hint Input */}
              {showHintInput && (
                <div className="pt-1 animate-in fade-in duration-200">
                  <input
                    type="text"
                    value={aiHint}
                    onChange={(e) => setAiHint(e.target.value)}
                    placeholder="e.g. Scabal Super 150s, 6x2 double breasted, peak lapels, evening dinner jacket..."
                    className="w-full px-3 py-2 text-xs bg-black/40 border border-brand-gold/30 rounded text-slate-100 placeholder-slate-400 focus:outline-none focus:border-brand-gold"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Guide Gemini with specific tailoring cues, cloth mills, or occasion highlights (optional).
                  </p>
                </div>
              )}

              {/* Action Button */}
              <button
                type="button"
                onClick={handleGenerateWithAi}
                disabled={isGeneratingAi || uploading}
                className="w-full py-3 px-4 bg-gradient-to-r from-brand-gold via-amber-400 to-brand-gold hover:from-amber-400 hover:to-brand-gold text-brand-navy rounded-lg font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-gold transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed group"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-4 h-4 text-brand-navy animate-spin" />
                    <span>Gemini AI is analyzing silhouettes, lapels & crafting editorial...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-brand-navy group-hover:scale-110 transition-transform" />
                    <span>✨ Auto-Generate Garment Details with Gemini AI</span>
                  </>
                )}
              </button>

              {/* Success Badge */}
              {aiSuccessMessage && (
                <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-200 text-xs flex items-start justify-between space-x-2 animate-in fade-in duration-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{aiSuccessMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAiSuccessMessage(null)}
                    className="text-emerald-400 hover:text-white text-xs p-0.5"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 2. BASIC INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Silk Grenadine Necktie or Egyptian Giza Cotton Shirt"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Bespoke Division <span className="text-red-500">*</span>
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as ProductAudience)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy font-medium"
              >
                <option value="modernman">Modern Man Kenya (Menswear)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy font-semibold"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Subcategory Pills for Accessories */}
          {category === 'accessories' && (
            <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-lg space-y-2">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-900">
                ⚡ Quick Fill Accessory Type (Click to Auto-Configure):
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { label: 'Silk Necktie', tag: 'Pure Jacquard Silk Necktie', fab: '100% Woven Jacquard Silk (Hand-rolled)', price: 4500 },
                  { label: 'Bow Tie & Square Set', tag: 'Silk Bow Tie & Matching Pocket Square Set', fab: '100% Pure Silk & Microfiber', price: 5500 },
                  { label: 'Cufflinks & Hardware', tag: 'Artisanal Rhodium & Brass Cufflinks', fab: 'Solid Polished Brass & Rhodium Plate', price: 4000 },
                  { label: 'Lapel Pin / Boutonnière', tag: 'Handcrafted Boutonnière Lapel Pin', fab: 'Polished Brass & Enamel Finish', price: 3000 },
                  { label: 'Leather Belt', tag: 'Full-Grain Italian Leather Dress Belt', fab: 'Full-Grain Vegetable Tanned Leather', price: 6500 },
                  { label: 'Cravat / Ascot', tag: 'Regal Silk Ascot & Cravat Ensemble', fab: 'Pure Mulberry Silk', price: 6000 },
                  { label: 'Luxury Dress Watch', tag: 'Sartorial Minimalist Dress Watch', fab: '316L Stainless Steel & Sapphire Glass', price: 18500 },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      if (!name) setName(`Modern Man ${item.label}`);
                      setTagline(item.tag);
                      setFabricDetails(item.fab);
                      setPriceKes(item.price);
                      setPriceUsd(Math.round(item.price / 129.5));
                      if (!detailsList.length) {
                        setDetailsList([
                          item.fab,
                          'Artisanal Hand-finished detailing with presentation gift box',
                          'Signature Modern Man Nairobi packaging included',
                        ]);
                      }
                    }}
                    className="px-2.5 py-1 bg-white hover:bg-brand-navy hover:text-brand-gold text-slate-700 rounded text-xs font-semibold border border-amber-300 shadow-sm transition-all"
                  >
                    + {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Tagline / Headline Highlight
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder={category === 'accessories' ? 'e.g. Pure Jacquard Silk Necktie with Hand-rolled Edges' : 'e.g. 6x2 Stance in Loro Piana Pure Cashmere'}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
              Garment / Product Description (Brief & Punchy)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={category === 'accessories' ? 'Brief description (e.g. Handcrafted from lustrous Italian silk with a substantial drape, perfect for black-tie galas and boardroom confidence.)' : 'Brief 1-2 sentence description (e.g. Tailored with clean lines and soft drape, crafted for effortless evening distinction.)'}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy leading-relaxed"
            />
          </div>

          {/* 3. FABRIC & CONSTRUCTION */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Material / Fabric Details
              </label>
              <input
                type="text"
                value={fabricDetails}
                onChange={(e) => setFabricDetails(e.target.value)}
                placeholder={category === 'accessories' ? 'e.g. 100% Woven Jacquard Silk or Solid Brass' : 'e.g. Scabal Super 150s Pure Merino Wool'}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                Construction & Craftsmanship Finish
              </label>
              <input
                type="text"
                list="construction-options"
                value={construction}
                onChange={(e) => setConstruction(e.target.value)}
                placeholder="e.g. Artisanal Hand-finished detailing with presentation gift box"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
              />
              <datalist id="construction-options">
                <option value="Artisanal Hand-finished detailing with presentation gift box" />
                <option value="Hand-rolled edges with pure silk thread finish" />
                <option value="Precision rhodium & solid brass jewelry casting" />
                <option value="Full-grain leather with hand-burnished edge finish" />
                <option value="Single-needle French seam stitching with mother-of-pearl buttons" />
                <option value="Full Floating Canvas (Horsehair interior)" />
                <option value="Half Canvas Sartorial" />
                <option value="Soft Unstructured Tailoring" />
              </datalist>
            </div>
          </div>

          {/* 3.5 CRAFTSMANSHIP & SARTORIAL HIGHLIGHTS */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Key Craftsmanship Highlights & Details (Bullet Points)
            </label>
            <p className="text-[11px] text-slate-500">
              Bullet points displayed on storefront product dossiers (auto-crafted by Gemini AI or editable manually).
            </p>

            {detailsList.length > 0 && (
              <div className="space-y-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200">
                {detailsList.map((bullet, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs text-slate-700 bg-white p-2 rounded border border-slate-200 shadow-sm">
                    <span className="flex items-center space-x-2 pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                      <span>{bullet}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeDetailBullet(idx)}
                      className="text-slate-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                      title="Remove highlight"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex space-x-2">
              <input
                type="text"
                value={newDetailInput}
                onChange={(e) => setNewDetailInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addDetailBullet();
                  }
                }}
                placeholder="Add craft bullet (e.g. Milanese lapel buttonhole, Horn buttons engraved in England)"
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
              />
              <button
                type="button"
                onClick={addDetailBullet}
                disabled={!newDetailInput.trim()}
                className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded disabled:opacity-40 transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Bullet</span>
              </button>
            </div>
          </div>

          {/* 4. PRICING */}
          <div className="p-4 bg-amber-50/50 rounded-lg border border-amber-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-brand-navy">
              <Sparkles className="w-4 h-4 text-brand-gold" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Outfit Pricing (Kenyan Shillings & US Dollars)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price in KES (KES) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    KES
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="500"
                    value={priceKes}
                    onChange={(e) => handlePriceKesChange(e.target.value)}
                    placeholder={category === 'accessories' ? '4500' : '14500'}
                    className="w-full pl-12 pr-3 py-2 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-gold font-bold text-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Price in USD ($)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-500">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    value={priceUsd}
                    onChange={(e) => setPriceUsd(e.target.value)}
                    placeholder={category === 'accessories' ? '35' : '115'}
                    className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-brand-gold font-semibold text-brand-navy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 5. SIZES AVAILABLE */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Available Sizes ({category === 'accessories' ? 'Accessories' : category === 'shirts' ? 'Tailored Shirts' : 'Suits'})
              </label>
              <button
                type="button"
                onClick={() => {
                  const def = CATEGORY_DEFAULTS[category]?.selectedSizes || ['One Size'];
                  setSelectedSizes(def);
                }}
                className="text-[11px] text-brand-gold hover:underline font-semibold"
              >
                Reset to {category === 'accessories' ? 'Accessories' : category} standard sizes
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {(CATEGORY_SIZE_PRESETS[category] || CATEGORY_SIZE_PRESETS.accessories).map((sz) => {
                const isSelected = selectedSizes.includes(sz);
                return (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => toggleSize(sz)}
                    className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                      isSelected
                        ? 'bg-brand-navy text-brand-gold border-2 border-brand-gold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{sz}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom size addition */}
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                value={customSizeInput}
                onChange={(e) => setCustomSizeInput(e.target.value)}
                placeholder="Add custom size (e.g. One Size, 40mm, XL, 34W)"
                className="w-64 px-3 py-1 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none"
              />
              <button
                type="button"
                onClick={addCustomSize}
                className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Size</span>
              </button>
            </div>
          </div>

          {/* 6. STOCK & FEATURED TOGGLES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isInStock}
                onChange={(e) => setIsInStock(e.target.checked)}
                className="w-4 h-4 text-brand-gold rounded border-slate-300 focus:ring-brand-gold"
              />
              <div>
                <p className="text-xs font-bold text-brand-navy">Available in Stock</p>
                <p className="text-[11px] text-slate-500">Uncheck if temporarily sold out</p>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-brand-gold rounded border-slate-300 focus:ring-brand-gold"
              />
              <div>
                <p className="text-xs font-bold text-brand-navy">Featured on Homepage</p>
                <p className="text-[11px] text-slate-500">Show in featured luxury spotlight</p>
              </div>
            </label>
          </div>
        </form>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end space-x-3 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={submitting || uploading}
            className="px-6 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center space-x-2"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>{isEditing ? 'Save Changes' : 'Publish Product'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
