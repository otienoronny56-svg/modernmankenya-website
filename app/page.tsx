import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { BrandOverviewSection } from '@/components/home/BrandOverviewSection';
import { WhatWeCreateSection } from '@/components/home/WhatWeCreateSection';
import { OccasionsSection } from '@/components/home/OccasionsSection';
import { ReadyToWearSection } from '@/components/home/ReadyToWearSection';
import { TheExperienceSection } from '@/components/home/TheExperienceSection';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { QualityStandardsSection } from '@/components/home/QualityStandardsSection';
import { WhyModernManSection } from '@/components/home/WhyModernManSection';
import { AtelierInvitation } from '@/components/home/AtelierInvitation';

export const metadata: Metadata = {
  title: 'Modern Man Kenya | Custom Tailoring & Bespoke Menswear Nairobi',
  description:
    'Where Fit Meets Character. Opulence • Simplicity • Class. Premier custom tailoring and bespoke menswear crafted in Nairobi, Kenya with canvas construction and millimetric precision.',
  openGraph: {
    title: 'Modern Man Kenya | Where Fit Meets Character',
    description:
      'Premier bespoke menswear and custom tailoring in Nairobi. Opulence • Simplicity • Class.',
    url: 'https://modernmankenya.com',
    siteName: 'Modern Man Kenya',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero: Where Fit Meets Character • Opulence • Simplicity • Class */}
      <HeroSection />

      {/* 2. Brand Overview: Narrative, Vision, Mission & Core Values */}
      <BrandOverviewSection />

      {/* 3. What We Create: 9 Tailoring Categories */}
      <WhatWeCreateSection />

      {/* 4. Occasions: Business, Wedding, Formal, Signature */}
      <OccasionsSection />

      {/* 5. Ready-to-Wear Wardrobe: Immediate Acquisition Spotlight */}
      <ReadyToWearSection />

      {/* 6. The Modern Man Experience: 5-Step Process */}
      <TheExperienceSection />

      {/* 6. Craftsmanship & Construction: Floating Canvas & Hand Finishing */}
      <CraftsmanshipSection />

      {/* 7. Quality Standards & Operational Clarity: QC Checklist, SOPs, Archived Metrics */}
      <QualityStandardsSection />

      {/* 8. Why Modern Man Kenya: 7 Reasons & Brand Promise */}
      <WhyModernManSection />

      {/* 9. Nairobi Atelier Consultation & Contact */}
      <AtelierInvitation />
    </main>
  );
}
