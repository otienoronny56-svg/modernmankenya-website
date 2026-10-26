'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { 
  Camera, 
  PlusCircle, 
  Search, 
  Trash2, 
  RefreshCw, 
  Sparkles, 
  X, 
  UploadCloud, 
  CheckCircle2, 
  ExternalLink,
  Tag,
  Layers,
  AlertCircle
} from 'lucide-react';
import type { GalleryItem } from '@/data/galleryData';

const LOOKBOOK_CATEGORIES = [
  { id: 'all', name: 'All Showcases' },
  { id: 'suits', name: '2 & 3-Piece Suits' },
  { id: 'evening-dinner', name: 'Tuxedos & Velvet' },
  { id: 'kaunda-suits', name: 'Kaunda Suits' },
  { id: 'traditional', name: 'Traditional & Kaftans' },
  { id: 'smart-casual', name: 'Smart Casual & Blazers' },
  { id: 'modern-kids', name: 'Kids Bespoke' },
];

export default function AdminLookbookPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [category, setCategory] = useState<GalleryItem['category']>('suits');
  const [images, setImages] = useState<string[]>([]);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchLookbook = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/lookbook');
      const data = await res.json();
      if (data.items) {
        setItems(data.items);
      }
    } catch (err) {
      console.error('Error loading lookbook:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLookbook();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'traditional') {
          if (item.category !== 'traditional' && item.category !== 'kaftan-agbada') return false;
        } else if (item.category !== selectedCategory) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchTag = item.tag?.toLowerCase().includes(q);
        const matchCat = item.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchTag && !matchCat) return false;
      }
      return true;
    });
  }, [items, selectedCategory, searchQuery]);

  // Image Upload Handlers
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setFormError(null);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to upload photo');
        return data.url as string;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages((prev) => [...prev, ...uploadedUrls]);
    } catch (err: any) {
      setFormError(err.message || 'Error uploading photos');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleAddDirectUrl = () => {
    if (customImageUrl.trim()) {
      setImages((prev) => [...prev, customImageUrl.trim()]);
      setCustomImageUrl('');
    }
  };

  const handleRemoveImage = (idx: number) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleOpenModal = () => {
    setTitle('');
    setTag('');
    setCategory('suits');
    setImages([]);
    setCustomImageUrl('');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a title for this lookbook photo');
      return;
    }
    if (images.length === 0) {
      setFormError('Please upload at least one photo');
      return;
    }

    setSubmitting(true);
    setFormError(null);

    try {
      const payload = {
        title: title.trim(),
        tag: tag.trim() || 'Atelier Bespoke',
        category,
        image: images[0],
        images,
        aspect: 'portrait',
      };

      const res = await fetch('/api/admin/lookbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save lookbook showcase');
      }

      setItems((prev) => [data.item, ...prev]);
      setIsModalOpen(false);
      setSuccessToast('✨ Lookbook photo successfully published to gallery!');
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Failed to save lookbook showcase');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, itemTitle: string) => {
    if (!confirm(`Are you sure you want to remove "${itemTitle}" from the lookbook?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/lookbook/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert('This photo is part of the permanent base archive or could not be removed.');
      }
    } catch (err) {
      console.error('Error deleting lookbook photo:', err);
      alert('Network error while removing photo.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full min-w-0 space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="p-4 bg-emerald-900 text-white rounded-lg border border-emerald-400 shadow-lg flex items-center space-x-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-semibold">{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="min-w-0">
          <div className="flex items-center space-x-2">
            <Camera className="w-6 h-6 text-brand-gold" />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
              Lookbook & Gallery Curation
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Upload and organize bespoke suiting photography, groom client portraits, and atelier lookbooks across all Made-to-Measure categories.
          </p>
        </div>

        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={fetchLookbook}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleOpenModal}
            className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4 text-brand-gold" />
            <span>Add Lookbook Photo</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col xl:flex-row xl:items-center justify-between gap-4 min-w-0">
        <div className="relative w-full xl:max-w-xs flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search suiting lookbooks, styles, tags..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 min-w-0">
          {LOOKBOOK_CATEGORIES.map((cat) => (
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

      {/* Grid of Lookbook Photos */}
      {loading ? (
        <div className="p-16 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
          <div className="w-8 h-8 border-2 border-brand-navy/30 border-t-brand-navy rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs">Loading lookbook showcase...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 space-y-3">
          <Camera className="w-12 h-12 text-slate-300 mx-auto" />
          <p className="text-sm font-semibold text-slate-700">No lookbook photos found in this category</p>
          <p className="text-xs text-slate-400">
            Click below to upload suiting and bespoke photoshoot imagery.
          </p>
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-brand-navy text-white text-xs font-bold uppercase rounded shadow mt-2"
          >
            Add Lookbook Photo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredItems.map((item) => {
            const isCustom = item.id.startsWith('lookbook-');
            const imagesCount = item.images && item.images.length > 0 ? item.images.length : 1;
            return (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                {/* Photo Preview Container */}
                <div className="relative aspect-[3/4] bg-slate-100 overflow-hidden">
                  <Image
                    src={item.image || (item.images && item.images[0]) || '/images/bespoke-placeholder.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Category Pill Badge */}
                  <div className="absolute top-2 left-2 z-10">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-black/70 backdrop-blur-sm text-brand-gold border border-brand-gold/30">
                      {item.category.replace('-', ' ')}
                    </span>
                  </div>

                  {/* Multi-angle indicator */}
                  {imagesCount > 1 && (
                    <div className="absolute top-2 right-2 z-10">
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/80 text-white flex items-center space-x-1">
                        <Layers className="w-2.5 h-2.5" />
                        <span>{imagesCount}</span>
                      </span>
                    </div>
                  )}

                  {/* Delete button if custom */}
                  {isCustom && (
                    <button
                      onClick={() => handleDelete(item.id, item.title)}
                      disabled={deletingId === item.id}
                      className="absolute bottom-2 right-2 z-10 p-1.5 bg-black/75 hover:bg-red-600 text-white rounded transition-colors shadow"
                      title="Delete this lookbook photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Details Footer */}
                <div className="p-2.5 bg-white space-y-1">
                  <p className="font-serif font-bold text-xs text-brand-navy truncate" title={item.title}>
                    {item.title}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate flex items-center space-x-1">
                    <Tag className="w-2.5 h-2.5 text-brand-gold flex-shrink-0" />
                    <span>{item.tag}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Lookbook Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col border border-slate-200">
            {/* Modal Header */}
            <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between border-b border-brand-gold/30 flex-shrink-0">
              <div className="flex items-center space-x-2.5">
                <Camera className="w-5 h-5 text-brand-gold" />
                <div>
                  <h3 className="font-serif text-lg font-bold">Add Photo to Lookbook & Gallery</h3>
                  <p className="text-[11px] text-slate-300">
                    Upload bespoke tailoring photography to showcase in the website gallery.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-xs flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Photo Upload Area */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Upload Photography <span className="text-red-500">*</span>
                </label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-brand-gold rounded-lg p-5 text-center cursor-pointer bg-slate-50 hover:bg-amber-50/20 transition-all flex flex-col items-center justify-center"
                >
                  <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                  <p className="text-xs font-bold text-brand-navy">Click or Drag & Drop Photos</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">JPEG, PNG, WEBP (Supports multiple angles)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {uploading && (
                  <p className="text-xs text-brand-navy font-semibold mt-2 animate-pulse text-center">
                    Uploading images...
                  </p>
                )}

                {/* Direct URL alternative */}
                <div className="flex space-x-2 mt-2">
                  <input
                    type="text"
                    value={customImageUrl}
                    onChange={(e) => setCustomImageUrl(e.target.value)}
                    placeholder="Or paste direct image URL (/images/photo.jpeg)"
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddDirectUrl}
                    className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded"
                  >
                    Add URL
                  </button>
                </div>

                {/* Preview Gallery */}
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 p-2 bg-slate-100 rounded-lg">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative w-16 h-20 rounded overflow-hidden border border-slate-300">
                        <Image src={img} alt={`Preview ${idx + 1}`} fill className="object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white rounded-full text-[9px]"
                        >
                          ✕
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[8px] text-center font-bold">
                            Cover
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Bespoke Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy font-semibold"
                >
                  <option value="suits">2 & 3-Piece Bespoke Suits</option>
                  <option value="evening-dinner">Tuxedos & Velvet Dinner Jackets</option>
                  <option value="kaunda-suits">Kaunda Suits (Senator Suits)</option>
                  <option value="traditional">Traditional Wear & Kaftans / Agbada</option>
                  <option value="smart-casual">Smart Casual & Blazers</option>
                  <option value="modern-kids">Modern Kids Bespoke</option>
                  <option value="modern-women">Modern Woman Bespoke</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Showcase Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. The Nairobi Royal Purple Kaunda or Forest Emerald Tuxedo"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy font-medium"
                />
              </div>

              {/* Style Tag / Fabric Detail */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                  Sartorial Tag / Fabric Detail
                </label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="e.g. Super 150s Wool, Holland & Sherry Velvet, or Standing Band Collar"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-brand-gold text-brand-navy"
                />
              </div>

              <div className="pt-4 flex items-center justify-end space-x-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-navy-dark text-white rounded text-xs font-bold uppercase tracking-wider disabled:opacity-50 flex items-center space-x-1.5 shadow"
                >
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>{submitting ? 'Publishing...' : 'Publish to Lookbook'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
