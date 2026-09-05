'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users, 
  PlusCircle, 
  Trash2, 
  Sparkles, 
  Award, 
  Quote, 
  ExternalLink, 
  RefreshCw,
  X,
  Check,
  Scissors
} from 'lucide-react';
import type { TeamMember } from '@/types';

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [bio, setBio] = useState('');
  const [experienceYears, setExperienceYears] = useState(8);
  const [image, setImage] = useState('');
  const [quote, setQuote] = useState('');
  const [favoriteCloth, setFavoriteCloth] = useState('');
  const [isLeadership, setIsLeadership] = useState(false);
  const [order, setOrder] = useState(50);

  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team');
      if (res.ok) {
        const data = await res.json();
        if (data.team) {
          setTeam(data.team);
        }
      }
    } catch (err) {
      console.error('Error fetching team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setName('');
    setRole('');
    setSpecialty('');
    setBio('');
    setExperienceYears(8);
    setImage('');
    setQuote('');
    setFavoriteCloth('');
    setIsLeadership(false);
    setOrder(team.length + 1);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member: TeamMember) => {
    setEditingMember(member);
    setName(member.name);
    setRole(member.role);
    setSpecialty(member.specialty);
    setBio(member.bio);
    setExperienceYears(member.experienceYears);
    setImage(member.image);
    setQuote(member.quote || '');
    setFavoriteCloth(member.favoriteCloth || '');
    setIsLeadership(Boolean(member.isLeadership));
    setOrder(member.order ?? 50);
    setError(null);
    setSuccess(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload: Partial<TeamMember> = {
        id: editingMember ? editingMember.id : undefined,
        name: name.trim(),
        role: role.trim(),
        specialty: specialty.trim(),
        bio: bio.trim(),
        experienceYears: Number(experienceYears),
        image: image.trim() || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
        quote: quote.trim() || undefined,
        favoriteCloth: favoriteCloth.trim() || undefined,
        isLeadership,
        order: Number(order),
      };

      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to save team member');
      }

      setSuccess(editingMember ? 'Artisan updated successfully!' : 'Artisan added to team roster!');
      await fetchTeam();
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccess(null);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Error saving team member');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove "${name}" from the team roster?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/team?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete team member');
      }

      setTeam((prev) => prev.filter((m) => m.id !== id));
    } catch (err: any) {
      alert(err.message || 'Error deleting team member');
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto w-full space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2.5 py-1 rounded inline-flex items-center space-x-1.5 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Nairobi Flagship Atelier Artisans</span>
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Atelier Team Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-light mt-1">
            Manage your master cutters, tailors, style directors, and curators featured on the public website.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/about#the-team"
            target="_blank"
            className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded text-xs uppercase tracking-wider font-semibold transition-colors flex items-center space-x-2"
          >
            <span>View Public /about</span>
            <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
          </Link>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded font-bold uppercase tracking-luxury text-xs transition-all shadow-md flex items-center space-x-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Add Artisan</span>
          </button>
        </div>
      </div>

      {/* Roster Cards */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-gold" />
          <p className="text-xs uppercase tracking-wider">Loading Atelier Roster...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with Photo & Basic Info */}
                <div className="p-4 flex items-center space-x-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="relative w-16 h-20 rounded-md overflow-hidden flex-shrink-0 bg-slate-200 border border-brand-gold/30">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] uppercase font-bold text-brand-gold bg-brand-navy px-1.5 py-0.5 rounded">
                        {member.experienceYears}+ Yrs
                      </span>
                      {member.isLeadership && (
                        <span className="text-[9px] uppercase font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                          Leadership
                        </span>
                      )}
                    </div>
                    <h3 className="font-serif font-bold text-base text-brand-navy truncate mt-1">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-600 truncate font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 space-y-3 text-xs">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Specialty
                    </span>
                    <p className="text-slate-700 font-medium">
                      {member.specialty}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                      Bio
                    </span>
                    <p className="text-slate-500 line-clamp-2 font-light">
                      {member.bio}
                    </p>
                  </div>

                  {member.quote && (
                    <div className="italic text-slate-500 text-[11px] bg-slate-50 p-2 rounded border border-slate-100 line-clamp-2">
                      &quot;{member.quote}&quot;
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                <button
                  onClick={() => handleOpenEdit(member)}
                  className="text-xs font-bold text-brand-navy hover:text-brand-gold uppercase tracking-wider transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => handleDelete(member.id, member.name)}
                  className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                  title="Remove from roster"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add or Edit Team Member */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-2xl border border-brand-gold/40 max-w-lg w-full overflow-hidden max-h-[92vh] flex flex-col">
            
            <div className="bg-brand-navy p-5 text-white flex items-center justify-between border-b border-brand-gold/30">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <h3 className="font-serif font-bold text-lg text-white">
                  {editingMember ? 'Edit Artisan Profile' : 'Add New Atelier Artisan'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-6 space-y-4 text-xs">
              
              {success && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded flex items-center space-x-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-800 rounded">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Peter Njoroge"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                    placeholder="e.g. Master Coatmaker"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                    Years of Experience *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={50}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
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
                  placeholder="e.g. Hand Pad-Stitching & Floating Horsehair"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Portrait Photo URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or image link"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
                <p className="text-[10px] text-slate-500">
                  Leave blank to use a default sartorial portrait.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                  Artisan Biography
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe their bespoke journey, training, and precision..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                    Quote / Philosophy
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Perfection in every stitch."
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-brand-navy uppercase tracking-wider text-[11px]">
                    Favorite Cloth Mill
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Scabal Super 150s"
                    value={favoriteCloth}
                    onChange={(e) => setFavoriteCloth(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="leadershipCheck"
                  checked={isLeadership}
                  onChange={(e) => setIsLeadership(e.target.checked)}
                  className="w-4 h-4 text-brand-navy accent-brand-gold rounded"
                />
                <label htmlFor="leadershipCheck" className="text-xs text-slate-700 font-medium">
                  Mark as Atelier Leadership / Director
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury rounded transition-all shadow-gold disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : 'Save Artisan'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
