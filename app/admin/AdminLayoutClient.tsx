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
  PlusCircle
} from 'lucide-react';

interface AdminLayoutClientProps {
  children: React.ReactNode;
}

export function AdminLayoutClient({ children }: AdminLayoutClientProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // If on login page, just render children without admin navigation
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
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-brand-navy text-white px-4 py-3 flex items-center justify-between border-b border-brand-gold/30">
        <Link href="/admin" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <Image
              src="/images/logo-emblem.png"
              alt="Modern Man Kenya"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-serif font-bold text-sm tracking-wider">MODERN MAN ADMIN</span>
        </Link>

        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-1.5 rounded text-slate-300 hover:text-white"
        >
          {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-navy text-white flex flex-col justify-between border-r border-white/10 transition-transform duration-200 md:translate-x-0 md:static ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-white/10 flex items-center space-x-3">
            <div className="relative w-10 h-10 flex-shrink-0">
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
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
                    item.active
                      ? 'bg-brand-gold text-brand-navy shadow-md font-bold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
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
                <Sparkles className="w-4 h-4 text-brand-gold" />
                <span>Live Ready to Wear</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
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

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col bg-slate-50 min-h-screen">
        {children}
      </main>
    </div>
  );
}
