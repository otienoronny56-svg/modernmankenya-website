'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Scissors, 
  Award, 
  Quote, 
  Sparkles, 
  PlusCircle, 
  X, 
  Check, 
  User, 
  Briefcase, 
  Clock, 
  Layers,
  ArrowRight
} from 'lucide-react';
import type { TeamMember } from '@/types';
import { INITIAL_TEAM_MEMBERS } from '@/data/teamData';

interface TeamSectionProps {
  showAddButton?: boolean;
  limit?: number;
  isTeaser?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ 
  showAddButton = true,
  limit,
  isTeaser = false 
}) => {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);
  const [selectedArtisan, setSelectedArtisan] = useState<TeamMember | null>(null);
  
  // Quick Add Modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [addSuccess, setAddSuccess] = useState(false);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formSpecialty, setFormSpecialty] = useState('');
  const [formBio, setFormBio] = useState('');
  const [formYears, setFormYears] = useState(8);
  const [formImage, setFormImage] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formCloth, setFormCloth] = useState('');

  const fetchTeam = async () => {
    try {
      const res = await fetch('/api/team');
      if (res.ok) {
        const data = await res.json();
        if (data.team && Array.isArray(data.team) && data.team.length > 0) {
          setTeam(data.team);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch dynamic team, using fallback:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAddError(null);

    try {
      const payload = {
        name: formName,
        role: formRole,
        specialty: formSpecialty,
        bio: formBio,
        experienceYears: Number(formYears),
        image: formImage || '/images/team/samuel-kibet.jpg',
        quote: formQuote || undefined,
        favoriteCloth: formCloth || undefined,
      };

      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // If unauthorized (no staff cookie), let user know to login to admin or inform them
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          throw new Error('Staff authentication required. Please log into the Staff Portal at /admin/login to publish permanently.');
        }
        throw new Error(data.error || 'Failed to add team member');
      }

      setAddSuccess(true);
      await fetchTeam();
      setTimeout(() => {
        setIsAddModalOpen(false);
        setAddSuccess(false);
        // Reset form
        setFormName('');
        setFormRole('');
        setFormSpecialty('');
        setFormBio('');
        setFormImage('');
        setFormQuote('');
        setFormCloth('');
      }, 1200);
    } catch (err: any) {
      setAddError(err.message || 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedTeam = limit ? team.slice(0, limit) : team;

  return (
    <section id="the-team" className="py-16 sm:py-24 bg-brand-canvas relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-brand-gold font-bold text-xs uppercase tracking-luxury">
              <Scissors className="w-4 h-4" />
              <span>Master Tailors & Visionaries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-navy font-bold">
              The Artisans Behind the Cut
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light leading-relaxed">
              Every garment carrying the Modern Man Kenya insignia is guided by master cutters, 
              senior coatmakers, and bespoke curators with decades of devoted craftsmanship in Nairobi.
            </p>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {showAddButton && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-white rounded text-xs uppercase tracking-luxury font-bold transition-all flex items-center space-x-2 shadow-sm border border-brand-gold/30 hover:border-brand-gold"
              >
                <PlusCircle className="w-3.5 h-3.5 text-brand-gold" />
                <span>+ Add Team Member</span>
              </button>
            )}

            {isTeaser && (
              <Link
                href="/about#the-team"
                className="px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded text-xs uppercase tracking-luxury font-bold transition-all flex items-center space-x-1.5 shadow-gold"
              >
                <span>Full Atelier Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {displayedTeam.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-200 shadow-sm hover:shadow-luxury hover:border-brand-gold/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Portrait Image Container */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/20 to-transparent" />
                  
                  {/* Experience Badge */}
                  <div className="absolute top-3 left-3 bg-brand-navy/90 backdrop-blur-sm border border-brand-gold/40 text-brand-gold text-[10px] font-bold uppercase tracking-luxury px-2.5 py-1 rounded flex items-center space-x-1.5 shadow-sm">
                    <Award className="w-3 h-3 text-brand-gold" />
                    <span>{member.experienceYears}+ Years Craft</span>
                  </div>

                  {member.isLeadership && (
                    <div className="absolute top-3 right-3 bg-brand-gold text-brand-navy text-[9px] font-bold uppercase tracking-luxury px-2 py-0.5 rounded shadow-sm">
                      Leadership
                    </div>
                  )}

                  {/* Name & Title on Image Bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-brand-gold transition-colors leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold/90 font-semibold mt-1">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 sm:p-6 space-y-4">
                  {/* Specialty Pill */}
                  <div className="bg-brand-canvas-alt border border-brand-gold/20 p-2.5 rounded text-xs text-brand-navy font-medium flex items-start space-x-2">
                    <Scissors className="w-3.5 h-3.5 text-brand-gold mt-0.5 flex-shrink-0" />
                    <span className="leading-snug">{member.specialty}</span>
                  </div>

                  {/* Bio Excerpt */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 font-light leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Artisan Quote */}
                  {member.quote && (
                    <div className="pt-2 border-t border-slate-100 italic text-slate-500 text-xs flex items-start space-x-2">
                      <Quote className="w-3.5 h-3.5 text-brand-gold/70 flex-shrink-0 mt-0.5" />
                      <p className="line-clamp-2">&quot;{member.quote}&quot;</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-5 sm:p-6 pt-0">
                <button
                  onClick={() => setSelectedArtisan(member)}
                  className="w-full py-2.5 px-4 bg-brand-navy hover:bg-brand-navy/90 text-white rounded text-xs uppercase tracking-luxury font-bold transition-all border border-brand-gold/20 hover:border-brand-gold flex items-center justify-center space-x-2"
                >
                  <span>Explore Artisan Bio & Discipline</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* 1. Artisan Detail Modal */}
      {selectedArtisan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-white rounded-lg shadow-2xl border border-brand-gold/40 max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArtisan(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-brand-navy/80 text-white hover:bg-brand-navy flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* Header Profile */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative w-28 h-36 sm:w-32 sm:h-40 rounded-lg overflow-hidden flex-shrink-0 border-2 border-brand-gold shadow-md">
                  <Image
                    src={selectedArtisan.image}
                    alt={selectedArtisan.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>

                <div className="text-center sm:text-left space-y-2">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded bg-brand-gold/15 text-brand-navy font-bold text-[10px] uppercase tracking-luxury">
                    <Award className="w-3 h-3 text-brand-gold" />
                    <span>{selectedArtisan.experienceYears} Years Master Craft</span>
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
                    {selectedArtisan.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-brand-gold uppercase tracking-luxury">
                    {selectedArtisan.role}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    Specialty: {selectedArtisan.specialty}
                  </p>
                </div>
              </div>

              {/* Deep Bio */}
              <div className="border-t border-slate-100 pt-5 space-y-3">
                <h4 className="font-serif text-base font-bold text-brand-navy uppercase tracking-wider text-xs">
                  Sartorial Journey & Mastery
                </h4>
                <p className="text-slate-600 text-sm font-light leading-relaxed">
                  {selectedArtisan.bio}
                </p>
              </div>

              {/* Quote & Favorite Cloth */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {selectedArtisan.quote && (
                  <div className="bg-brand-canvas-alt p-4 rounded border border-brand-gold/20">
                    <span className="text-[10px] uppercase tracking-luxury font-bold text-brand-gold block mb-1">
                      Artisan Creed
                    </span>
                    <p className="italic text-xs text-slate-700 leading-relaxed">
                      &quot;{selectedArtisan.quote}&quot;
                    </p>
                  </div>
                )}

                {selectedArtisan.favoriteCloth && (
                  <div className="bg-brand-canvas-alt p-4 rounded border border-brand-gold/20">
                    <span className="text-[10px] uppercase tracking-luxury font-bold text-brand-gold block mb-1">
                      Signature Cloth Choice
                    </span>
                    <p className="text-xs font-semibold text-brand-navy">
                      {selectedArtisan.favoriteCloth}
                    </p>
                  </div>
                )}
              </div>

              {/* Booking Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-light">
                  Consult with {selectedArtisan.name} during your private fitting in Nairobi.
                </span>
                <Link
                  href="/book-appointment"
                  onClick={() => setSelectedArtisan(null)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all text-center shadow-gold"
                >
                  Book Private Fitting &rarr;
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* 2. Quick Add Team Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-white rounded-lg shadow-2xl border border-brand-gold/40 max-w-lg w-full overflow-hidden max-h-[92vh] flex flex-col">
            
            {/* Header */}
            <div className="bg-brand-navy p-5 text-white flex items-center justify-between border-b border-brand-gold/30">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <h3 className="font-serif font-bold text-lg text-white">
                  Add Atelier Team Member
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <form onSubmit={handleAddMember} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              
              {addSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Artisan successfully added to the Modern Man Atelier roster!</span>
                </div>
              )}

              {addError && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded space-y-1">
                  <p className="font-bold">{addError}</p>
                  <Link href="/admin/login" className="text-brand-navy underline font-medium">
                    Click here to log into the Staff Portal &rarr;
                  </Link>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master David Omondi"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                    Role Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Coatmaker"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                    Years Experience *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={50}
                    value={formYears}
                    onChange={(e) => setFormYears(Number(e.target.value))}
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Craft Specialty
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hand Pad-Stitching & Floating Horsehair Architecture"
                  value={formSpecialty}
                  onChange={(e) => setFormSpecialty(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Portrait Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or direct image link"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
                <p className="text-[10px] text-slate-500">
                  Leave blank to use a distinguished editorial portrait placeholder.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Artisan Biography
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe their tailoring discipline, background, and dedication to bespoke craft in Nairobi..."
                  value={formBio}
                  onChange={(e) => setFormBio(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Artisan Quote / Philosophy
                </label>
                <input
                  type="text"
                  placeholder="e.g. Precision is not an act; it is our timeless habit."
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Favorite Cloth Mill & Reference
                </label>
                <input
                  type="text"
                  placeholder="e.g. Scabal Super 150s Midnight Navy"
                  value={formCloth}
                  onChange={(e) => setFormCloth(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury rounded transition-all shadow-gold disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : 'Add to Team'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
