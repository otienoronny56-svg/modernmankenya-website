import React from 'react';

export const JsonLd: React.FC = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['MensClothingStore', 'ClothingStore', 'LocalBusiness'],
        '@id': 'https://www.modernmanke.com/#store',
        name: 'Modern Man Kenya',
        alternateName: 'Modern Man Kenya Made to Measure Tailoring',
        url: 'https://www.modernmanke.com',
        logo: 'https://www.modernmanke.com/images/logo-emblem.png',
        image: 'https://www.modernmanke.com/images/hero-carousel-1.jpg',
        description:
          'Premier Made to Measure luxury menswear tailoring atelier in Nairobi, Kenya. Full floating canvas 2-piece and 3-piece suits, bespoke wedding tuxedos, contemporary Kaunda & Senator suits, and custom shirts.',
        telephone: '+254114122510',
        priceRange: 'KES 18,000 - 200,000',
        currenciesAccepted: 'KES, USD, EUR, GBP',
        paymentAccepted: 'Cash, Credit Card, M-Pesa, Bank Transfer',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Nairobi Flagship Atelier',
          addressLocality: 'Nairobi',
          addressRegion: 'Nairobi County',
          postalCode: '00100',
          addressCountry: 'KE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -1.2921,
          longitude: 36.8219,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:30',
            closes: '18:30',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Made to Measure Commissions',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Standard Made to Measure Men's Suits",
                description: 'Full canvas suit handcrafted in 1 week (KES 18,000 - 25,000)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Premium Made to Measure Men's Suits",
                description: 'High-grade wool blends handcrafted in 2 weeks (KES 30,000 - 45,000)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: "Executive Luxury Men's Suits",
                description: 'Pure wool Super 130s-160s, cashmere & silk in 3-4 weeks (KES 50,000 - 200,000)',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Adult Wedding Tuxedos & Dinner Jackets',
                description: 'Shawl lapel, peak lapel, black tie and jacquard nuptial ensembles',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Kaunda Suits & Senator Tunics',
                description: 'Contemporary African statesman attire with custom plackets and collars',
              },
            },
          ],
        },
        sameAs: [
          'https://instagram.com/modernman_kenya',
          'https://facebook.com/modernmankenya',
          'https://tiktok.com/@modernmankenya',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.modernmanke.com/#website',
        url: 'https://www.modernmanke.com',
        name: 'Modern Man Kenya',
        description: 'Made to Measure Tailoring & Luxury Menswear House Nairobi',
        publisher: {
          '@id': 'https://www.modernmanke.com/#store',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.modernmanke.com/gallery?category={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};

