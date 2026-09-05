'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  ExternalLink, 
  LogOut, 
  Sparkles, 
  Menu, 
  X,
  ShieldCheck
} from 'lucide-react';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, just render children without admin navigation chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
      router.push('/admin/login');
    }
  };

  const navLinks = [
    {
      name: 'Overview',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      name: 'Ready-to-Wear Outfits',
      href: '/admin/products',
      icon: ShoppingBag,
      active: pathname.startsWith('/admin/products'),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. Permanent Desktop Sidebar (In normal flex flow, never overlaps content) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 flex-shrink-0 bg-brand-navy text-white min-h-screen sticky top-0 border-r border-white/10 z-20">
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center space-x-3">
            <div className="relative w-9 h-9 flex-shrink-0">
              <Image
                src="/images/logo-emblem.png"
                alt="Modern Man Kenya"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm text-white tracking-wide">
                MODERN MAN
              </h2>
              <p className="text-[10px] text-brand-gold uppercase tracking-luxury font-semibold">
                Atelier Control
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
              Management
            </div>

            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                    item.active
                      ? 'bg-brand-gold text-brand-navy shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/10 text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
              Storefront
            </div>

            <Link
              href="/ready-to-wear"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
            >
              <span className="flex items-center space-x-3">
                <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0" />
                <span>Live Ready to Wear</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            </Link>
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center space-x-3 mb-3 px-2">
            <div className="w-8 h-8 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center font-bold text-brand-gold text-xs">
              MM
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">Modern Man Admin</p>
              <p className="text-[10px] text-slate-400 truncate">Nairobi Atelier</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full py-2 px-3 rounded bg-white/5 hover:bg-red-900/30 text-slate-300 hover:text-red-300 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 border border-white/10"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* 2. Slide-out Mobile/Tablet Drawer (with true dark backdrop) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileNavOpen(false)}
          />

          {/* Drawer Panel */}
          <aside className="relative z-10 w-72 max-w-[85vw] bg-brand-navy text-white flex flex-col justify-between min-h-full border-r border-white/10 shadow-2xl p-0 animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/logo-emblem.png"
                      alt="Modern Man Kenya"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-sm text-white tracking-wide">
                      MODERN MAN
                    </h2>
                    <p className="text-[10px] text-brand-gold uppercase tracking-luxury font-semibold">
                      Atelier Control
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Nav Items */}
              <nav className="p-4 space-y-1.5">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
                  Navigation
                </div>

                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className={`flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                        item.active
                          ? 'bg-brand-gold text-brand-navy shadow-md font-bold'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-white/10 text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
                  Storefront
                </div>

                <Link
                  href="/ready-to-wear"
                  target="_blank"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                >
                  <span className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-brand-gold flex-shrink-0" />
                    <span>Live Ready to Wear</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                </Link>
              </nav>
            </div>

            {/* Drawer Sign Out */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full py-2.5 px-3 rounded bg-white/5 hover:bg-red-900/30 text-slate-300 hover:text-red-300 text-xs font-semibold transition-colors flex items-center justify-center space-x-2 border border-white/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* 3. Main Content Column (Takes 100% of remaining width, never overlapped) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Control Bar */}
        <header className="bg-brand-navy text-white px-4 sm:px-8 py-3 flex items-center justify-between border-b border-white/10 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center space-x-3">
            {/* Hamburger Button on small screens */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 rounded hover:bg-white/10 text-brand-gold transition-colors"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-2">
              <span className="font-serif font-bold text-xs sm:text-sm tracking-wide text-white">
                MODERN MAN ATELIER
              </span>
              <span className="hidden sm:inline-block text-[10px] text-brand-gold uppercase tracking-luxury font-semibold pl-2 border-l border-white/20">
                Administration Portal
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/ready-to-wear"
              target="_blank"
              className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-brand-gold text-xs font-semibold border border-brand-gold/30 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>View Store</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3 py-1.5 rounded bg-white/5 hover:bg-red-950/40 text-slate-300 hover:text-red-300 text-xs font-semibold border border-white/10 transition-colors flex items-center space-x-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 min-w-0 bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}
