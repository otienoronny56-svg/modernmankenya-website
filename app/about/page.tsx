import React from 'react';
import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { BrandStorySection } from '@/components/about/BrandStorySection';
import { AtelierPillars } from '@/components/about/AtelierPillars';
import { ArtisanDisciplinesSection } from '@/components/about/ArtisanDisciplinesSection';
import { AtelierExperienceSection } from '@/components/about/AtelierExperienceSection';

export const metadata: Metadata = {
  title: 'About Modern Man Kenya | Our Genesis & Philosophy | Est. 2020',
  description: 'Wear the confidence. Own the moment. Established in 2020. At Modern Man Kenya, we believe every man deserves an attire that reflects his personality, celebrates his individuality, and brings out his best.',
  openGraph: {
    title: 'About Modern Man KE | Who is the Modern Man?',
    description: 'Wear the confidence. Own the moment. Bespoke custom tailoring and made-to-measure menswear in Nairobi. Established in 2020.',
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
