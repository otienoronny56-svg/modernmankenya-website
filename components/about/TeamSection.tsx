'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Scissors, 
  Award, 
  Quote, 
  X, 
  ArrowRight
} from 'lucide-react';
import type { TeamMember } from '@/types';
import { INITIAL_TEAM_MEMBERS } from '@/data/teamData';

interface TeamSectionProps {
  limit?: number;
  isTeaser?: boolean;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ 
  limit,
  isTeaser = false 
}) => {
  const [team, setTeam] = useState<TeamMember[]>(INITIAL_TEAM_MEMBERS);
  const [loading, setLoading] = useState(true);
  const [selectedArtisan, setSelectedArtisan] = useState<TeamMember | null>(null);

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

          {isTeaser && (
            <div className="flex items-center space-x-3 flex-shrink-0">
              <Link
                href="/about#the-team"
                className="px-4 py-2.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy rounded text-xs uppercase tracking-luxury font-bold transition-all flex items-center space-x-1.5 shadow-gold"
              >
                <span>Full Atelier Roster</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
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

    </section>
  );
};
