'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Calendar,
  Sparkles,
  MapPin,
  Phone,
  User,
  LogOut
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuth } from '@/lib/auth/AuthContext';
import { CountryCurrencySelector } from './CountryCurrencySelector';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { toggleCart, getTotalCount } = useCartStore();
  const { user, profile, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const totalCartCount = mounted ? getTotalCount() : 0;

  // Streamlined, concise links with minimal wording
  const madeToMeasureLinks = [
    { name: 'Suits & Suiting', href: '/bespoke/bespoke-suits' },
    { name: 'Tuxedos & Eveningwear', href: '/bespoke/bespoke-evening-wear' },
    { name: 'Kaunda & Safari Suits', href: '/bespoke/kaunda-suits' },
    { name: 'Weddings & Groom Ensembles', href: '/bespoke/weddings' },
    { name: 'Custom Shirts & Separates', href: '/bespoke/bespoke-shirts' },
    { name: 'Corporate & Executive', href: '/bespoke/corporate-wardrobes' },
    { name: 'The Craftsmanship', href: '/the-craft' },
  ];

  const occasionLinks = [
    { name: 'All Occasions', href: '/occasions' },
    { name: 'Executive Wear', href: '/occasions/executive-wear' },
    { name: 'Black Tie & Wedding', href: '/occasions/black-tie-wedding' },
    { name: 'African Wear', href: '/occasions/african-wear' },
    { name: 'Smart Casual & Blazers', href: '/gallery?category=smart-casual' },
    { name: 'Kaftans & Agbada', href: '/gallery?category=kaftan-agbada' },
  ];

  return (
    <>
      {/* Main Luxury Header - Thinner, Minimalist & Subtle Grey-White Tone */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#f4f4f5]/95 backdrop-blur-md shadow-sm py-1.5 sm:py-2 border-b border-slate-300/80'
            : 'bg-[#f7f7f8] py-2 sm:py-2.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - Full Luxury Emblem & Wordmark */}
          <Link
            href="/"
            className="flex items-center group flex-shrink-0 transition-transform duration-200 hover:opacity-95 py-1"
            aria-label="Modern Man Kenya Home"
          >
            <div className="relative h-12 w-16 sm:h-14 sm:w-20 md:h-16 md:w-24 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/logo-full.png"
                alt="Modern Man Kenya - Opulence • Simplicity • Class"
                fill
                sizes="(max-width: 640px) 64px, 96px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links - Ultra-Clean, Minimal & Spacious */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs sm:text-sm font-medium text-slate-700">
            
            {/* Made to Measure Dropdown */}
            <div
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('mtm')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center space-x-1.5 transition-all duration-200 font-medium ${
                  activeDropdown === 'mtm' ? 'text-brand-navy font-semibold' : 'hover:text-brand-gold'
                }`}
              >
                <span>Made to Measure</span>
                <ChevronDown className={`w-3.5 h-3.5 text-brand-gold transition-transform duration-300 ${
                  activeDropdown === 'mtm' ? 'rotate-180 text-brand-navy' : ''
                }`} />
              </button>

              {activeDropdown === 'mtm' && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200/80 p-2 transform origin-top transition-all duration-200 animate-in fade-in zoom-in-95 slide-in-from-top-2">
                    <div className="px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold">Bespoke Tailoring</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    </div>
                    {madeToMeasureLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-100/80 transition-all duration-150 font-medium"
                      >
                        <span className="group-hover/item:translate-x-1 transition-transform duration-150">
                          {item.name}
                        </span>
                        <span className="opacity-0 group-hover/item:opacity-100 text-brand-gold transition-opacity duration-150 text-[10px]">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* The Craft Direct Link */}
            <Link
              href="/the-craft"
              className="py-2 text-slate-700 hover:text-brand-navy hover:text-brand-gold transition-colors font-medium text-xs sm:text-sm"
            >
              The Craft
            </Link>

            {/* Occasions Dropdown */}
            <div
              className="relative py-2 group"
              onMouseEnter={() => setActiveDropdown('occasions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                className={`flex items-center space-x-1.5 transition-all duration-200 font-medium ${
                  activeDropdown === 'occasions' ? 'text-brand-navy font-semibold' : 'hover:text-brand-gold'
                }`}
              >
                <span>Occasions</span>
                <ChevronDown className={`w-3.5 h-3.5 text-brand-gold transition-transform duration-300 ${
                  activeDropdown === 'occasions' ? 'rotate-180 text-brand-navy' : ''
                }`} />
              </button>

              {activeDropdown === 'occasions' && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50">
                  <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-200/80 p-2 transform origin-top transition-all duration-200 animate-in fade-in zoom-in-95 slide-in-from-top-2">
                    <div className="px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between">
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-brand-gold">Curated Dress Codes</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
                    </div>
                    {occasionLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group/item flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-100/80 transition-all duration-150 font-medium"
                      >
                        <span className="group-hover/item:translate-x-1 transition-transform duration-150">
                          {item.name}
                        </span>
                        <span className="opacity-0 group-hover/item:opacity-100 text-brand-gold transition-opacity duration-150 text-[10px]">
                          →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Direct Link */}
            <Link
              href="/about"
              className="py-2 text-slate-700 hover:text-brand-navy hover:text-brand-gold transition-colors font-medium text-xs sm:text-sm"
            >
              About
            </Link>
          </nav>

          {/* Right Action Icons, Currency Selector & Compact Appointment CTA */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 text-slate-600 hover:text-brand-navy transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => toggleCart(true)}
              className="relative p-1.5 text-slate-600 hover:text-brand-navy transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {totalCartCount > 0 && (
                <span className="absolute 0 top-0 right-0 w-4 h-4 bg-brand-gold text-brand-navy text-[9px] font-bold rounded-full flex items-center justify-center shadow">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Country & Currency Selector */}
            <div className="hidden md:flex items-center pl-2 border-l border-slate-200">
              <CountryCurrencySelector theme="light" />
            </div>

            {/* Clear, Visible Log In / Sign In Button (Top Right) */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                <span className="text-xs font-semibold text-brand-navy hidden md:inline truncate max-w-[120px]">
                  Hi, {profile?.fullName?.split(' ')[0] || 'Member'}
                </span>
                <button
                  type="button"
                  onClick={signOut}
                  className="px-2.5 py-1 text-xs text-stone-500 hover:text-red-600 transition-colors cursor-pointer font-medium hover:underline flex items-center space-x-1"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-stone-400" />
                  <span>Log Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-brand-navy bg-stone-100 hover:bg-brand-navy hover:text-brand-gold transition-all border border-stone-200 shadow-xs hover:border-brand-gold/40"
                title="Log In / Sign In"
              >
                <User className="w-3.5 h-3.5 text-brand-gold" />
                <span>Log In</span>
              </Link>
            )}

            {/* Sleek, Compact Appointment CTA Button */}
            <Link
              href="/book-appointment"
              className="hidden sm:inline-flex items-center space-x-1 px-3 py-1.5 rounded-full border border-brand-gold bg-brand-gold/10 hover:bg-brand-gold hover:text-brand-navy text-brand-navy font-semibold uppercase tracking-wider text-[10px] transition-all"
            >
              <Calendar className="w-3 h-3 text-brand-gold hover:text-brand-navy" />
              <span>Book Appointment</span>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-slate-700 hover:text-brand-navy transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-brand-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top-2 duration-200">
            
            {/* Country Selector in Mobile */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs text-slate-500 font-medium">Select Region &amp; Currency:</span>
              <CountryCurrencySelector theme="light" />
            </div>

            {/* Accordion: Made to Measure */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'mtm' ? null : 'mtm')}
                className="w-full flex items-center justify-between py-2 text-left font-semibold text-sm text-brand-navy"
              >
                <span>Made to Measure</span>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-200 ${mobileSectionOpen === 'mtm' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSectionOpen === 'mtm' && (
                <div className="pl-3 py-1 space-y-1.5 border-l-2 border-brand-gold/40">
                  {madeToMeasureLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-1 text-xs text-slate-600 hover:text-brand-gold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* The Craft Direct Link */}
            <Link
              href="/the-craft"
              className="block py-2 text-sm font-semibold text-brand-navy border-b border-slate-100 hover:text-brand-gold"
            >
              The Craft
            </Link>

            {/* Accordion: Occasions */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'occasions' ? null : 'occasions')}
                className="w-full flex items-center justify-between py-2 text-left font-semibold text-sm text-brand-navy"
              >
                <span>Occasions</span>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-200 ${mobileSectionOpen === 'occasions' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSectionOpen === 'occasions' && (
                <div className="pl-3 py-1 space-y-1.5 border-l-2 border-brand-gold/40">
                  {occasionLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-1 text-xs text-slate-600 hover:text-brand-gold"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/the-experience"
              className="block py-2 text-sm font-semibold text-brand-navy border-b border-slate-100"
            >
              The Experience
            </Link>

            <Link
              href="/about"
              className="block py-2 text-sm font-semibold text-brand-navy border-b border-slate-100"
            >
              About
            </Link>

            <Link
              href="/reviews"
              className="block py-2 text-sm font-semibold text-brand-navy border-b border-slate-100"
            >
              Client Reviews
            </Link>

            <Link
              href="/journal"
              className="block py-2 text-sm font-semibold text-brand-navy border-b border-slate-100"
            >
              The Journal
            </Link>

            {/* Mobile Account Section */}
            <div className="border-b border-slate-100 py-2.5">
              {user ? (
                <div className="flex items-center justify-between text-xs font-semibold text-brand-navy">
                  <span>Hi, {profile?.fullName || user.email}</span>
                  <button
                    type="button"
                    onClick={signOut}
                    className="text-stone-500 hover:text-red-600 text-xs flex items-center space-x-1 cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5 text-stone-400" />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs font-semibold">
                  <Link
                    href="/login"
                    className="flex items-center space-x-1.5 text-brand-navy hover:text-brand-gold py-1"
                  >
                    <User className="w-4 h-4 text-brand-gold" />
                    <span>Log In</span>
                  </Link>
                  <Link
                    href="/login?mode=signup"
                    className="text-brand-gold hover:underline py-1"
                  >
                    Join / Register &rarr;
                  </Link>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Link
                href="/book-appointment"
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded bg-brand-gold text-brand-navy font-bold uppercase tracking-wider text-xs shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
