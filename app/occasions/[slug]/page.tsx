import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { OCCASIONS_DATA, ALL_OCCASIONS_LIST } from '@/data/occasionsData';
import { OccasionPageClient } from '@/components/occasions/OccasionPageClient';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return ALL_OCCASIONS_LIST.map((occ) => ({
    slug: occ.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const occasion = OCCASIONS_DATA[slug];

  if (!occasion) {
    return {
      title: 'Occasions | Modern Man Kenya',
      description: 'Custom bespoke menswear tailored for every milestone occasion.',
    };
  }

  return {
    title: `${occasion.title} | Modern Man Kenya Bespoke Tailoring`,
    description: `${occasion.title} tailoring commissions by Modern Man Kenya. ${occasion.tagline}.`,
    openGraph: {
      title: `${occasion.title} | Modern Man Kenya`,
      description: occasion.tagline,
      images: [{ url: occasion.heroImage }],
    },
  };
}

export default async function OccasionDynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const occasion = OCCASIONS_DATA[slug];

  if (!occasion) {
    notFound();
  }

  return <OccasionPageClient data={occasion} />;
}
