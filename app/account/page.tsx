'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect back to home page
    const timer = setTimeout(() => {
      router.replace('/');
    }, 1200);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-brand-canvas px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-xl border border-brand-gold/30 shadow-lg text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center mx-auto border border-brand-gold/40">
          <Sparkles className="w-6 h-6" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-brand-navy">
          Modern Man Kenya
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Welcome. Your email is registered for exclusive seasonal releases, editorial newsletters, and private atelier announcements.
        </p>
        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
          </Link>
        </div>
      </div>
    </div>
  );
}
