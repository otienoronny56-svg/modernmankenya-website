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
  Phone
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSectionOpen, setMobileSectionOpen] = useState<string | null>('bespoke');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const { toggleCart, getTotalCount, currency, setCurrency } = useCartStore();

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

  const bespokeLinks = [
    { name: 'Bespoke Tailoring', href: '/bespoke/bespoke-tailoring', desc: 'The pure bespoke masterwork discipline' },
    { name: 'Bespoke Suits', href: '/bespoke/bespoke-suits', desc: 'Two & three-piece masterworks' },
    { name: 'Bespoke Casual Wear', href: '/bespoke/bespoke-casual-wear', desc: 'Safari jackets & elevated weekenders' },
    { name: 'Bespoke Evening Wear', href: '/bespoke/bespoke-evening-wear', desc: 'Black tie, dinner suits & tuxedos' },
    { name: 'Bespoke Shirts', href: '/bespoke/bespoke-shirts', desc: 'Sea Island & Egyptian Giza cottons' },
    { name: 'Bespoke Waistcoats', href: '/bespoke/bespoke-waistcoats', desc: 'Horseshoe & double-breasted vests' },
    { name: 'Bespoke Womenswear', href: '/bespoke/bespoke-womenswear', desc: 'Structured executive tailoring' },
    { name: 'Bespoke for Children', href: '/bespoke/bespoke-for-children', desc: 'Heirloom milestone formal wear' },
  ];

  const readyToWearLinks = [
    { name: 'Suits', href: '/ready-to-wear?category=suits', desc: 'Full canvas business & lounge suits' },
    { name: 'Jackets', href: '/ready-to-wear?category=jackets', desc: 'Cashmere & wool tailored blazers' },
    { name: 'Velvets', href: '/ready-to-wear?category=velvets', desc: 'British cotton velvet smoking jackets' },
    { name: 'Evening & Dinner Wear', href: '/ready-to-wear?category=evening-dinner', desc: 'Grosgrain tuxedos & gala attire' },
    { name: 'Fragrances', href: '/ready-to-wear?category=fragrances', desc: 'Artisanal Extrait de Parfum' },
    { name: 'Accessories', href: '/ready-to-wear?category=accessories', desc: 'Grenadine ties, cufflinks & pocket squares' },
  ];

  const servicesLinks = [
    { name: 'About Us & Artisans', href: '/about', desc: 'Our Nairobi atelier heritage & master team' },
    { name: 'Weddings', href: '/bespoke/weddings', desc: 'Groom & bridal party bespoke sartorial care' },
    { name: 'Alterations', href: '/services/alterations', desc: 'Master tailor refitting & garment surgery' },
    { name: 'Gift Vouchers', href: '/services/gift-vouchers', desc: 'The gift of an artisanal fitting experience' },
    { name: 'Contact Us', href: '/contact', desc: 'Visit our flagship atelier in Nairobi' },
  ];

  return (
    <>
      {/* Top Announcement Strip */}
      <div className="bg-brand-navy text-white text-[10px] sm:text-[11px] tracking-luxury uppercase py-1.5 sm:py-2 px-3 sm:px-4 border-b border-brand-gold/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3 sm:space-x-6 text-slate-300 truncate">
            <span className="flex items-center space-x-1.5 truncate">
              <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-brand-gold flex-shrink-0" />
              <span className="truncate">Nairobi Atelier</span>
            </span>
            <span className="text-brand-gold/40 hidden xs:inline">|</span>
            <a href="tel:+254700000254" className="hidden sm:flex items-center space-x-1.5 hover:text-white transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
              <span>+254 700 000 254</span>
            </a>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6 flex-shrink-0">
            <span className="text-brand-gold hidden md:flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Modern Man Bespoke • Made to Measure Kenya</span>
            </span>

            {/* Currency Selector */}
            <div className="flex items-center space-x-1 sm:space-x-2 text-[10px] sm:text-xs font-semibold pl-2 sm:pl-4 border-l border-white/15">
              {(['KES', 'USD', 'GBP'] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-1 sm:px-1.5 py-0.5 rounded transition-colors ${
                    currency === curr
                      ? 'bg-brand-gold text-brand-navy font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-luxury py-2.5 sm:py-3 border-b border-slate-200'
            : 'bg-white py-3 sm:py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3.5 group min-w-0">
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0">
              <Image
                src="/images/logo-emblem.png"
                alt="Modern Man Kenya Logo"
                fill
                sizes="(max-width: 640px) 36px, 44px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-sm sm:text-lg tracking-wide sm:tracking-wider text-brand-navy font-bold leading-tight uppercase group-hover:text-brand-gold transition-colors truncate">
                Modern Man Kenya
              </span>
              <span className="text-[8px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.25em] text-brand-gold uppercase font-medium truncate">
                opulence • simplicity • class
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-brand-slate">
            
            {/* Bespoke Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('bespoke')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors font-medium tracking-wide">
                <span>Bespoke</span>
                <ChevronDown className="w-4 h-4 text-brand-gold" />
              </button>

              {activeDropdown === 'bespoke' && (
                <div className="absolute top-full left-0 w-[540px] bg-white rounded-lg shadow-luxury-hover border border-brand-gold/20 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-serif text-xs uppercase tracking-luxury text-brand-gold font-bold">
                      The Bespoke Atelier
                    </span>
                    <Link
                      href="/bespoke/bespoke-suits"
                      className="text-xs text-brand-navy hover:underline"
                    >
                      Explore All Tailoring &rarr;
                    </Link>
                  </div>
                  {bespokeLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="p-2 rounded-md hover:bg-brand-canvas-alt transition-colors group/link"
                    >
                      <div className="font-serif text-sm font-semibold text-brand-navy group-hover/link:text-brand-gold transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-brand-slate-muted leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ready to Wear Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('rtw')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors font-medium tracking-wide">
                <span>Ready to Wear</span>
                <ChevronDown className="w-4 h-4 text-brand-gold" />
              </button>

              {activeDropdown === 'rtw' && (
                <div className="absolute top-full left-0 w-[500px] bg-white rounded-lg shadow-luxury-hover border border-brand-gold/20 p-6 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-serif text-xs uppercase tracking-luxury text-brand-gold font-bold">
                      The Ready-to-Wear Wardrobe
                    </span>
                    <Link
                      href="/ready-to-wear"
                      className="text-xs text-brand-navy hover:underline"
                    >
                      View Full Catalog &rarr;
                    </Link>
                  </div>
                  {readyToWearLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="p-2 rounded-md hover:bg-brand-canvas-alt transition-colors group/link"
                    >
                      <div className="font-serif text-sm font-semibold text-brand-navy group-hover/link:text-brand-gold transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-brand-slate-muted leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Services & Info Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActiveDropdown('services')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center space-x-1.5 hover:text-brand-gold transition-colors font-medium tracking-wide">
                <span>Services & Info</span>
                <ChevronDown className="w-4 h-4 text-brand-gold" />
              </button>

              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 w-[380px] bg-white rounded-lg shadow-luxury-hover border border-brand-gold/20 p-5 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="pb-2 border-b border-slate-100">
                    <span className="font-serif text-xs uppercase tracking-luxury text-brand-gold font-bold">
                      Concierge & Services
                    </span>
                  </div>
                  {servicesLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block p-2 rounded-md hover:bg-brand-canvas-alt transition-colors group/link"
                    >
                      <div className="font-serif text-sm font-semibold text-brand-navy group-hover/link:text-brand-gold transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-brand-slate-muted leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className="hover:text-brand-gold transition-colors font-medium tracking-wide"
            >
              About Us
            </Link>

            <Link
              href="/bespoke/the-craft"
              className="hover:text-brand-gold transition-colors font-medium tracking-wide"
            >
              The Bespoke Master Craft
            </Link>
          </nav>

          {/* Right Action Icons & Appointment CTA */}
          <div className="flex items-center space-x-1.5 sm:space-x-4">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-brand-slate hover:text-brand-gold transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => toggleCart(true)}
              className="relative p-2 text-brand-slate hover:text-brand-gold transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalCartCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 bg-brand-gold text-white text-[9px] sm:text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Book an Appointment CTA Button (Tablet & Desktop) */}
            <Link
              href="/book-appointment"
              className="hidden md:inline-flex items-center space-x-2 px-4 lg:px-5 py-2 rounded-sm border-2 border-brand-gold bg-brand-gold/10 hover:bg-brand-gold text-brand-navy hover:text-white transition-all duration-200 text-[11px] font-bold uppercase tracking-luxury shadow-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-brand-slate hover:text-brand-navy transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 text-brand-gold" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Luxury Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-8 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-3 duration-300">
            
            {/* Quick Action Top Bar in Drawer */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <a 
                href="tel:+254700000254" 
                className="flex items-center space-x-2 text-brand-navy font-semibold hover:text-brand-gold transition-colors py-1"
              >
                <Phone className="w-3.5 h-3.5 text-brand-gold" />
                <span>+254 700 000 254</span>
              </a>

              <div className="flex items-center space-x-1">
                {(['KES', 'USD', 'GBP'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      currency === curr
                        ? 'bg-brand-gold text-brand-navy'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* About Us Direct Link */}
            <Link
              href="/about"
              className="flex items-center justify-between py-2.5 text-left border-b border-slate-100 group"
            >
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-navy group-hover:text-brand-gold transition-colors">
                  About Us & Artisans
                </span>
              </div>
              <span className="text-xs text-brand-gold font-bold">&rarr;</span>
            </Link>

            {/* Accordion 1: Bespoke House */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'bespoke' ? null : 'bespoke')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-navy">
                    Bespoke House
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-200 ${mobileSectionOpen === 'bespoke' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSectionOpen === 'bespoke' && (
                <div className="grid grid-cols-1 gap-1 pl-4 py-2 border-l border-brand-gold/30 animate-in fade-in duration-200">
                  {bespokeLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="py-1.5 text-xs font-medium text-slate-700 hover:text-brand-gold transition-colors flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] text-brand-slate-muted">&rarr;</span>
                    </Link>
                  ))}
                  <Link
                    href="/bespoke/the-craft"
                    className="py-1.5 text-xs font-bold text-brand-gold hover:underline mt-1"
                  >
                    The Bespoke Master Craft &rarr;
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion 2: Ready to Wear */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'rtw' ? null : 'rtw')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-navy">
                    Ready to Wear
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-200 ${mobileSectionOpen === 'rtw' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSectionOpen === 'rtw' && (
                <div className="grid grid-cols-1 gap-1 pl-4 py-2 border-l border-brand-gold/30 animate-in fade-in duration-200">
                  <Link
                    href="/ready-to-wear"
                    className="py-1.5 text-xs font-bold text-brand-navy hover:text-brand-gold"
                  >
                    View All Ready to Wear &rarr;
                  </Link>
                  {readyToWearLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="py-1.5 text-xs font-medium text-slate-700 hover:text-brand-gold transition-colors flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] text-brand-slate-muted">&rarr;</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 3: Concierge & Services */}
            <div className="border-b border-slate-100 pb-2">
              <button
                onClick={() => setMobileSectionOpen(mobileSectionOpen === 'services' ? null : 'services')}
                className="w-full flex items-center justify-between py-2 text-left"
              >
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                  <span className="font-serif text-sm font-bold uppercase tracking-luxury text-brand-navy">
                    Services & Atelier
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-brand-gold transition-transform duration-200 ${mobileSectionOpen === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {mobileSectionOpen === 'services' && (
                <div className="grid grid-cols-1 gap-1 pl-4 py-2 border-l border-brand-gold/30 animate-in fade-in duration-200">
                  {servicesLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="py-1.5 text-xs font-medium text-slate-700 hover:text-brand-gold transition-colors flex justify-between items-center"
                    >
                      <span>{item.name}</span>
                      <span className="text-[10px] text-brand-slate-muted">&rarr;</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Primary Appointment Button */}
            <div className="pt-2">
              <Link
                href="/book-appointment"
                className="w-full flex items-center justify-center space-x-2.5 py-3.5 rounded-sm bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs shadow-gold transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Private Fitting in Nairobi</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
