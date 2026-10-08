import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { BrandStorySection } from '@/components/about/BrandStorySection';
import { AtelierPillars } from '@/components/about/AtelierPillars';
import { ArtisanDisciplinesSection } from '@/components/about/ArtisanDisciplinesSection';
import { AtelierExperienceSection } from '@/components/about/AtelierExperienceSection';

export const metadata: Metadata = {
  title: 'About Us | Modern Man Kenya Bespoke Atelier Nairobi',
  description: 'Where Fit Meets Character. Opulence • Simplicity • Class. Discover the bespoke tailoring philosophy, craftsmanship standards, and Nairobi atelier of Modern Man Kenya.',
  openGraph: {
    title: 'About Modern Man Kenya | Where Fit Meets Character',
    description: 'Bespoke menswear and custom tailoring in Nairobi. Opulence • Simplicity • Class.',
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

      {/* 4. The Master Tailoring Disciplines & Operational Standards */}
      <ArtisanDisciplinesSection />

      {/* 5. Nairobi Flagship Atelier Experience & Map Navigation */}
      <AtelierExperienceSection />
    </main>
  );
}
