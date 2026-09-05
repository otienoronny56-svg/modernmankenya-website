import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';

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
  title: 'Modern Man Kenya 254 | Bespoke Tailoring & Luxury Menswear House',
  description:
    'Modern Man Kenya 254: Master bespoke tailoring house handcrafted in Nairobi with full floating canvas and millimetric precision. Opulence, simplicity, class.',
  keywords: [
    'Modern Man Kenya',
    'Bespoke Tailoring Nairobi',
    'Modern Man Kenya Tailoring',
    'Custom Suits Nairobi',
    'Luxury Menswear Kenya',
    'Wedding Suits Nairobi',
    'Velvet Smoking Jackets',
  ],
  icons: {
    icon: '/images/logo-emblem.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${plusJakarta.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-white text-brand-slate antialiased selection:bg-brand-gold selection:text-brand-navy">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
