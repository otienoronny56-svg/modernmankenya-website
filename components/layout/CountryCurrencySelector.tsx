'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Currency } from '@/types';

export interface CountryOption {
  code: string;
  name: string;
  flagUrl: string;
  currency: Currency;
  currencyLabel: string;
}

export const COUNTRIES: CountryOption[] = [
  { code: 'KE', name: 'Kenya', flagUrl: 'https://flagcdn.com/w40/ke.png', currency: 'KES', currencyLabel: 'KSh' },
  { code: 'EU', name: 'Europe', flagUrl: 'https://flagcdn.com/w40/eu.png', currency: 'EUR', currencyLabel: 'EUR €' },
  { code: 'US', name: 'United States', flagUrl: 'https://flagcdn.com/w40/us.png', currency: 'USD', currencyLabel: 'USD $' },
  { code: 'GB', name: 'United Kingdom', flagUrl: 'https://flagcdn.com/w40/gb.png', currency: 'GBP', currencyLabel: 'GBP £' },
  { code: 'CA', name: 'Canada', flagUrl: 'https://flagcdn.com/w40/ca.png', currency: 'USD', currencyLabel: 'USD $' },
  { code: 'AE', name: 'United Arab Emirates', flagUrl: 'https://flagcdn.com/w40/ae.png', currency: 'USD', currencyLabel: 'USD $' },
  { code: 'QA', name: 'Qatar', flagUrl: 'https://flagcdn.com/w40/qa.png', currency: 'USD', currencyLabel: 'USD $' },
  { code: 'AU', name: 'Australia', flagUrl: 'https://flagcdn.com/w40/au.png', currency: 'USD', currencyLabel: 'USD $' },
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
  const { setCurrency, currency } = useCartStore();
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(COUNTRIES[0]); // Kenya default
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initial and external currency changes
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
        className={`inline-flex items-center space-x-2 text-[11px] sm:text-xs font-medium tracking-wide transition-colors px-1.5 py-0.5 rounded focus:outline-none ${
          isDark
            ? 'text-slate-200 hover:text-white hover:bg-white/10'
            : 'text-slate-700 hover:text-brand-navy hover:bg-slate-200/50'
        }`}
        aria-expanded={isOpen}
        aria-label="Select country and currency"
      >
        <img
          src={selectedCountry.flagUrl}
          alt={`${selectedCountry.name} flag`}
          className="w-5 h-3.5 object-cover rounded-xs shadow-xs inline-block"
        />
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
                  <img
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    className="w-5 h-3.5 object-cover rounded-xs shadow-xs flex-shrink-0"
                  />
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
