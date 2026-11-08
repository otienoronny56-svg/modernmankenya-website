import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { JsonLd } from '@/components/seo/JsonLd';
import { LAUNCH_CONFIG } from '@/lib/config/launch';
import { ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.modernmanke.com'),
  title: {
    default: 'Modern Man Kenya 254 | Made to Measure Tailoring & Luxury Menswear House',
    template: '%s | Modern Man Kenya 254',
  },
  description:
    'Modern Man Kenya 254: Master Made to Measure tailoring house handcrafted in Nairobi with full floating canvas and millimetric precision. Two-piece and three-piece suits, wedding tuxedos, Kaunda suits, and bespoke shirts.',
  keywords: [
    'Modern Man Kenya',
    'Modern Man Kenya 254',
    'Made to Measure Tailoring Nairobi',
    'Custom Suits Nairobi',
    'Tailored Suits Kenya',
    'Luxury Menswear Kenya',
    'Wedding Suits Nairobi',
    'Groom Tuxedos Kenya',
    'Kaunda Suits Nairobi',
    'Senator Tunics Kenya',
    'Velvet Smoking Jackets',
    'Bespoke Tailor Nairobi',
  ],
  authors: [{ name: 'Modern Man Kenya Atelier' }],
  creator: 'Modern Man Kenya 254',
  publisher: 'Modern Man Kenya',
  alternates: {
    canonical: 'https://www.modernmanke.com',
  },
  openGraph: {
    title: 'Modern Man Kenya 254 | Made to Measure Tailoring & Luxury Menswear House',
    description:
      'Master Made to Measure tailoring house handcrafted in Nairobi with full floating canvas and millimetric precision. Opulence, simplicity, class.',
    url: 'https://www.modernmanke.com',
    siteName: 'Modern Man Kenya',
    images: [
      {
        url: '/images/hero-carousel-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern Man Kenya Luxury Menswear Atelier',
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Man Kenya 254 | Made to Measure Tailoring Nairobi',
    description:
      'Handcrafted Made to Measure menswear with full floating canvas and millimetric precision in Nairobi, Kenya.',
    images: ['/images/hero-carousel-1.jpg'],
  },
  icons: {
    icon: '/images/logo-emblem.png',
    apple: '/images/logo-emblem.png',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'googleda93b82cea9dbf4d.html',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let hasBypass = false;
  if (LAUNCH_CONFIG.isPrelaunch) {
    const cookieStore = await cookies();
    hasBypass =
      cookieStore.get(LAUNCH_CONFIG.cookieName)?.value === LAUNCH_CONFIG.previewPasscode ||
      Boolean(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${plusJakarta.variable} ${cormorant.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('mm_theme');
                  if (t === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
              if (typeof window !== 'undefined') {
                if ('serviceWorker' in navigator) {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for (var registration of registrations) {
                      registration.unregister();
                    }
                  });
                }
                if ('caches' in window) {
                  caches.keys().then(function(names) {
                    for (var name of names) {
                      caches.delete(name);
                    }
                  });
                }
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#0A0A0F] text-brand-slate dark:text-slate-100 antialiased selection:bg-brand-gold selection:text-brand-navy">
        <JsonLd />
        <GoogleAnalytics />
        <ClientLayout hasBypass={hasBypass}>{children}</ClientLayout>
      </body>
    </html>
  );
}
