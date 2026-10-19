import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { NeedleThreadTransition } from '@/components/canvas/NeedleThreadTransition';
import { ScissorsCutTransition } from '@/components/canvas/ScissorsCutTransition';
import { MeasuringTapeTransition } from '@/components/canvas/MeasuringTapeTransition';
import { ChalkSeamTransition } from '@/components/canvas/ChalkSeamTransition';
import { WhatWeCreateSection } from '@/components/home/WhatWeCreateSection';
import { OccasionsSection } from '@/components/home/OccasionsSection';
import { ReadyToWearSection } from '@/components/home/ReadyToWearSection';
import { TheExperienceSection } from '@/components/home/TheExperienceSection';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { QualityStandardsSection } from '@/components/home/QualityStandardsSection';
import { WhyModernManSection } from '@/components/home/WhyModernManSection';
import { AtelierInvitation } from '@/components/home/AtelierInvitation';

export const metadata: Metadata = {
  title: 'Modern Man Kenya | Custom Tailoring & Made to Measure Menswear Nairobi',
  description:
    'Where Fit Meets Character. Opulence • Simplicity • Class. Premier custom tailoring and made-to-measure menswear crafted in Nairobi, Kenya with canvas construction and millimetric precision.',
  openGraph: {
    title: 'Modern Man Kenya | Where Fit Meets Character',
    description:
      'Premier made-to-measure menswear and custom tailoring in Nairobi. Opulence • Simplicity • Class.',
    url: 'https://modernmankenya.com',
    siteName: 'Modern Man Kenya',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero: Where Fit Meets Character */}
      <HeroSection />

      {/* Transition 1: Golden Needle & Basting Thread */}
      <NeedleThreadTransition />

      {/* 2. What We Make: Clean Category Cards */}
      <WhatWeCreateSection />

      {/* Transition 2: Tailor's Shears / Scissors Cut */}
      <ScissorsCutTransition />

      {/* 3. Occasions: Suits for Every Event */}
      <OccasionsSection />

      {/* Transition 3: Tailor's Tape Measure */}
      <MeasuringTapeTransition />

      {/* 4. The Gallery: Custom Showcase */}
      <ReadyToWearSection />

      {/* Transition 4: Tailor's Chalk Line Guide */}
      <ChalkSeamTransition />

      {/* 5. How We Tailor Your Suit: 5-Step Process */}
      <TheExperienceSection />

      {/* Transition 5: Golden Needle & Basting Thread */}
      <NeedleThreadTransition />

      {/* 6. How We Build Your Suit: Craftsmanship & Canvas */}
      <CraftsmanshipSection />

      {/* Transition 6: Tailor's Shears Cut */}
      <ScissorsCutTransition />

      {/* 7. Our Quality Guarantee: Inspection Standards */}
      <QualityStandardsSection />

      {/* Transition 7: Measuring Tape Precision */}
      <MeasuringTapeTransition />

      {/* 8. Why Modern Man Kenya: 7 Reasons & Brand Promise */}
      <WhyModernManSection />

      {/* Transition 8: Tailor's Chalk Seam */}
      <ChalkSeamTransition />

      {/* 9. Nairobi Atelier Consultation & Contact */}
      <AtelierInvitation />
    </main>
  );
}
