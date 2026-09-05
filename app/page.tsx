import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { PillarsSection } from '@/components/home/PillarsSection';
import { CollectionGrids } from '@/components/home/CollectionGrids';
import { InteractiveCustomizerTeaser } from '@/components/home/InteractiveCustomizerTeaser';
import { ProcessSection } from '@/components/home/ProcessSection';
import { AtelierInvitation } from '@/components/home/AtelierInvitation';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Editorial Hero with 3D Three.js Silk Canvas */}
      <HeroSection />

      {/* 2. 3-Column Bespoke Pillars (Handcrafted Heritage, Millimetric Precision, European Cloths) */}
      <PillarsSection />

      {/* 3. Curated Collection Grids (Bespoke Suits, The Wedding Atelier, Ready to Wear) */}
      <CollectionGrids />

      {/* 4. Interactive Garment Customization Teaser (Lapels, Pockets, Linings, Cloth Swatches) */}
      <InteractiveCustomizerTeaser />

      {/* 5. Bespoke Fitting Process Walkthrough & Client Reviews */}
      <ProcessSection />

      {/* 6. Nairobi Flagship Atelier Private Invitation */}
      <AtelierInvitation />
    </main>
  );
}
