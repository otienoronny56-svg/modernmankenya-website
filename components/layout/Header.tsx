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
  User
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { CountryCurrencySelector } from './CountryCurrencySelector';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { toggleCart, getTotalCount } = useCartStore();

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
    { name: 'Weddings & Groom Ensembles', href: '/bespoke/weddings' },
    { name: 'Custom Shirts & Separates', href: '/bespoke/bespoke-shirts' },
    { name: 'Corporate & Executive', href: '/bespoke/corporate-wardrobes' },
    { name: 'The Craftsmanship', href: '/the-craft' },
  ];

  const galleryLinks = [
    { name: 'Full Portfolio Gallery', href: '/gallery' },
    { name: 'Executive Suiting', href: '/gallery?category=suits' },
    { name: 'Tailored Blazers & Jackets', href: '/gallery?category=jackets' },
    { name: 'Velvet Dinner Jackets', href: '/gallery?category=velvets' },
    { name: 'Accessories & Details', href: '/gallery?category=accessories' },
  ];

  const occasionLinks = [
    { name: 'Business & Executive', href: '/occasions/business-executive' },
    { name: 'Wedding & Groom', href: '/occasions/wedding-groom' },
    { name: 'Formal & Black Tie', href: '/occasions/formal-eveningwear' },
    { name: 'Signature Occasion', href: '/occasions/signature-occasion' },
  ];

  return (
    <>
      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-luxury py-2.5 sm:py-3 border-b border-slate-200'
            : 'bg-white py-3 sm:py-3.5 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3.5 group min-w-0">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0">
              <Image
                src="/images/logo-emblem.png"
                alt="Modern Man Kenya Logo"
                fill
                sizes="(max-width: 640px) 36px, 40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm sm:text-base lg:text-lg tracking-wider text-brand-navy font-bold leading-tight uppercase group-hover:text-brand-gold transition-colors truncate">
                Modern Man Kenya
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.2em] text-brand-gold uppercase font-medium truncate">
                opulence • simplicity • class
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Clean, Uncongested & Minimal */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-slate-700">
            
            {/* Made to Measure Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('mtm')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-brand-gold transition-colors font-medium">
                <span>Made to Measure</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-gold" />
              </button>

              {activeDropdown === 'mtm' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-md shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  {madeToMeasureLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Gallery (Replaces Ready to Wear) */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('gallery')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-brand-gold transition-colors font-medium">
                <span>Gallery</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-gold" />
              </button>

              {activeDropdown === 'gallery' && (
                <div className="absolute top-full left-0 w-60 bg-white rounded-md shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  {galleryLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Occasions Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('occasions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1 hover:text-brand-gold transition-colors font-medium">
                <span>Occasions</span>
                <ChevronDown className="w-3.5 h-3.5 text-brand-gold" />
              </button>

              {activeDropdown === 'occasions' && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-1 duration-150 z-50">
                  {occasionLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-xs text-slate-700 hover:text-brand-navy hover:bg-slate-50 transition-colors font-medium"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/the-experience"
              className="hover:text-brand-gold transition-colors font-medium"
            >
              The Experience
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

            {/* Country & Currency Selector with Profile */}
            <div className="hidden sm:flex items-center space-x-1 pl-2 border-l border-slate-200">
              <CountryCurrencySelector theme="light" />
              <Link 
                href="/book-appointment" 
                className="p-1.5 text-slate-600 hover:text-brand-navy transition-colors"
                title="Appointments & Account"
                aria-label="Account"
              >
                <User className="w-4 h-4" />
              </Link>
            </div>

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

            {/* Accordion: Gallery */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'gallery' ? null : 'gallery')}
                className="w-full flex items-center justify-between py-2 text-left font-semibold text-sm text-brand-navy"
              >
                <span>Gallery</span>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-200 ${mobileSectionOpen === 'gallery' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSectionOpen === 'gallery' && (
                <div className="pl-3 py-1 space-y-1.5 border-l-2 border-brand-gold/40">
                  {galleryLinks.map((item) => (
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
