import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Playfair_Display, Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { ClientLayout } from '@/components/layout/ClientLayout';
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
  title: 'Modern Man Kenya 254 | Made to Measure Tailoring & Luxury Menswear House',
  description:
    'Modern Man Kenya 254: Master made-to-measure tailoring house handcrafted in Nairobi with full floating canvas and millimetric precision. Opulence, simplicity, class.',
  keywords: [
    'Modern Man Kenya',
    'Made to Measure Tailoring Nairobi',
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
        <ClientLayout hasBypass={hasBypass}>{children}</ClientLayout>
      </body>
    </html>
  );
}
