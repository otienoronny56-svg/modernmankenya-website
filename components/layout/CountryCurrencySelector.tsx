'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Currency } from '@/types';

export interface CountryOption {
  code: string;
  name: string;
  flag: string;
  currency: Currency;
  currencyLabel: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'KES', currencyLabel: 'KES KSh' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'USD', currencyLabel: 'KES KSh' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currency: 'KES', currencyLabel: 'KES KSh' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦', currency: 'USD', currencyLabel: 'KES KSh' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currency: 'USD', currencyLabel: 'KES KSh' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', currencyLabel: 'KES KSh' },
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', currencyLabel: 'KES KSh' },
];

interface CountryCurrencySelectorProps {
  className?: string;
  theme?: 'dark' | 'light';
}

export const CountryCurrencySelector: React.FC<CountryCurrencySelectorProps> = ({
  className = '',
  theme = 'dark',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[2]); // Kenya default
  const { setCurrency, currency } = useCartStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initial currency
  useEffect(() => {
    const match = COUNTRIES.find((c) => c.currency === currency);
    if (match && selectedCountry.currency !== currency) {
      setSelectedCountry(match);
    }
  }, [currency]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (country: CountryOption) => {
    setSelectedCountry(country);
    setCurrency(country.currency);
    setIsOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Selector Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center space-x-1.5 text-[11px] sm:text-xs font-medium tracking-wide transition-colors px-1.5 py-0.5 rounded focus:outline-none ${
          isDark
            ? 'text-slate-200 hover:text-white hover:bg-white/10'
            : 'text-slate-700 hover:text-brand-navy hover:bg-slate-200/50'
        }`}
        aria-expanded={isOpen}
        aria-label="Select country and currency"
      >
        <span className="text-sm leading-none inline-block">{selectedCountry.flag}</span>
        <span className="font-semibold uppercase tracking-wider">{selectedCountry.name} ({selectedCountry.currencyLabel})</span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 opacity-70" />
        ) : (
          <ChevronDown className="w-3 h-3 opacity-70" />
        )}
      </button>

      {/* Dropdown Menu Modal / Card */}
      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-64 sm:w-72 bg-white text-slate-800 rounded-md shadow-2xl border border-slate-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
            {COUNTRIES.map((country) => {
              const isSelected = selectedCountry.code === country.code;
              return (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleSelect(country)}
                  className={`w-full text-left px-4 py-2.5 flex items-center space-x-3 text-xs sm:text-sm transition-colors ${
                    isSelected
                      ? 'bg-brand-canvas-alt font-bold text-brand-navy'
                      : 'hover:bg-slate-50 text-slate-700 font-normal'
                  }`}
                >
                  <span className="text-lg leading-none">{country.flag}</span>
                  <span className="flex-1 truncate">
                    {country.name} ({country.currencyLabel})
                  </span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
