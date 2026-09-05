import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { BrandStorySection } from '@/components/about/BrandStorySection';
import { AtelierPillars } from '@/components/about/AtelierPillars';
import { TeamSection } from '@/components/about/TeamSection';
import { AtelierExperienceSection } from '@/components/about/AtelierExperienceSection';

export const metadata: Metadata = {
  title: 'About Us & Master Artisans | Modern Man Kenya 254 Bespoke Atelier',
  description: 'Discover the master craft ethos of Modern Man Kenya. Hand-drafted individual paper blocks, full floating horsehair canvas, rare European cloths, and our Nairobi bespoke tailoring team.',
  openGraph: {
    title: 'About Us & Master Artisans | Modern Man Kenya',
    description: 'Bespoke tailoring in Nairobi engineered with anatomical precision, floating canvas, and European mill provenance.',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Grand Editorial Hero with Brand Ethos */}
      <AboutHero />

      {/* 2. The Modern Man Narrative, Origin & Tailoring Standard */}
      <BrandStorySection />

      {/* 3. The 4 Master Pillars of the Atelier */}
      <AtelierPillars />

      {/* 4. The Master Tailoring Artisans & Team (with dynamic loading & add modal) */}
      <TeamSection showAddButton={true} />

      {/* 5. Nairobi Flagship Atelier Experience & Map Navigation */}
      <AtelierExperienceSection />
    </main>
  );
}
