'use client';

import React from 'react';

interface PaymentBadgesProps {
  className?: string;
  variant?: 'compact' | 'full' | 'checkout';
  showLabel?: boolean;
}

export const PaymentBadges: React.FC<PaymentBadgesProps> = ({
  className = '',
  variant = 'compact',
  showLabel = true,
}) => {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-[11px] text-stone-500 font-medium">
          <span className="uppercase tracking-wider text-[10px] font-bold text-stone-400">
            Guaranteed Secure Payments
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Instant Safaricom Daraja Settlement</span>
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2">
        {/* 1. Safaricom Lipa Na M-Pesa (Official Brand Badge) */}
        <div
          className="h-8 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1 hover:border-emerald-500 transition-colors"
          title="Safaricom Lipa Na M-Pesa Online (STK Push & Till)"
        >
          <svg className="h-5 w-auto" viewBox="0 0 112 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Safaricom Green Phone/SIM Card Badge */}
            <rect x="1" y="2" width="22" height="28" rx="3.5" fill="#00A651" />
            <rect x="4.5" y="6" width="15" height="15" rx="1.5" fill="#FFFFFF" />
            <circle cx="12" cy="25.5" r="1.5" fill="#FFFFFF" />
            {/* Dynamic Red Ribbon Flow */}
            <path d="M10 13.5L14 9.5M14 9.5H11M14 9.5V12.5" stroke="#ED1C24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* "LIPA NA" typography */}
            <text x="29" y="12" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="8" fontWeight="800" fill="#006B35" letterSpacing="0.08em">LIPA NA</text>
            {/* "M-PESA" typography */}
            <text x="29" y="26" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="14" fontWeight="900" fill="#00A651" letterSpacing="-0.03em">M-PESA</text>
          </svg>
        </div>

        {/* 2. Visa (Official Wordmark with Gold Wing) */}
        <div
          className="h-8 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center hover:border-blue-500 transition-colors"
          title="Visa Debit & Credit Cards"
        >
          <svg className="h-4 w-auto" viewBox="0 0 52 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1 0.5L12.5 15.5H8.3L5.1 3.5C4.9 2.7 4.7 2.4 4.1 2.1C3.1 1.6 1.5 1.1 0.1 0.8L0.2 0.5H7C7.9 0.5 8.7 1.1 8.9 2.1L10.6 11.2L14.8 0.5H19.1ZM36.1 10.6C36.1 6.6 30.5 6.4 30.5 4.6C30.5 4 31 3.4 32.2 3.2C32.8 3.1 34.4 3.1 36.1 3.9L36.8 0.7C35.8 0.3 34.5 0 32.9 0C28.9 0 26.1 2.1 26.1 5.2C26.1 7.5 28.1 8.7 29.7 9.5C31.3 10.3 31.8 10.8 31.8 11.5C31.8 12.6 30.5 13.1 29.3 13.1C27.2 13.1 26 12.8 25.1 12.4L24.3 15.7C25.3 16.1 27.1 16.5 28.9 16.5C33.2 16.5 36.1 14.4 36.1 10.6ZM46.8 15.5H50.5L47.3 0.5H43.9C43.1 0.5 42.4 1 42.1 1.7L36 15.5H40.4L41.3 13H46.7L46.8 15.5ZM42.5 9.9L44.6 4.1L45.8 9.9H42.5ZM25.2 0.5L21.8 15.5H17.7L21.1 0.5H25.2Z" fill="#1A1F71"/>
            <path d="M7 0.5L0.2 0.5L0.1 0.8C1.5 1.1 3.1 1.6 4.1 2.1C4.7 2.4 4.9 2.7 5.1 3.5L8.9 2.1C8.7 1.1 7.9 0.5 7 0.5Z" fill="#F7B600"/>
          </svg>
        </div>

        {/* 3. Mastercard (Official Intersecting Circles) */}
        <div
          className="h-8 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1.5 hover:border-amber-400 transition-colors"
          title="Mastercard"
        >
          <svg className="h-5 w-auto" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12" r="9.5" fill="#EB001B"/>
            <circle cx="25.5" cy="12" r="9.5" fill="#F79E1B"/>
            <path d="M19 5.38A9.48 9.48 0 0014.78 12 9.48 9.48 0 0019 18.62 9.48 9.48 0 0023.22 12 9.48 9.48 0 0019 5.38z" fill="#FF5F00"/>
          </svg>
          <span className="text-[10px] font-bold text-stone-800 tracking-tight hidden sm:inline">
            mastercard
          </span>
        </div>

        {/* 4. Google Pay (Official 4-Color G + Pay) */}
        <div
          className="h-8 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center hover:border-stone-400 transition-colors"
          title="Google Pay"
        >
          <svg className="h-4.5 w-auto" viewBox="0 0 58 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g transform="translate(1, 1)">
              <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.71v2.26h2.92a8.78 8.78 0 002.68-6.61z" fill="#4285F4"/>
              <path d="M9 18c2.43 0 4.47-.8 5.96-2.19l-2.92-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.33-1.58-5.04-3.71H.94v2.33C2.43 15.98 5.48 18 9 18z" fill="#34A853"/>
              <path d="M3.96 10.7c-.18-.54-.28-1.12-.28-1.7s.1-1.16.28-1.7V4.97H.94A8.997 8.997 0 000 9c0 1.45.35 2.82.94 4.03l3.02-2.33z" fill="#FBBC05"/>
              <path d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.59C13.46.88 11.43 0 9 0 5.48 0 2.43 2.02.94 4.97l3.02 2.33C4.67 5.16 6.66 3.58 9 3.58z" fill="#EA4335"/>
            </g>
            <text x="24" y="14.5" fontFamily="'Google Sans', 'Product Sans', -apple-system, Roboto, sans-serif" fontSize="13.5" fontWeight="500" fill="#3C4043" letterSpacing="-0.01em">Pay</text>
          </svg>
        </div>

        {/* 5. Apple Pay (Official Apple Mark + Pay) */}
        <div
          className="h-8 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center hover:border-stone-400 transition-colors"
          title="Apple Pay"
        >
          <svg className="h-4.5 w-auto" viewBox="0 0 54 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.1 4.2c-.4.5-1.1.9-1.7.9-.1-.7.2-1.3.6-1.8.4-.5 1.2-.9 1.8-.9.1.7-.2 1.3-.7 1.8z" fill="#000000"/>
            <path d="M11.6 8.3c-.6-.7-1.5-1.2-2.5-1.2-1.3 0-1.7.6-2.5.6-.8 0-1.4-.6-2.4-.6-1.3 0-2.5.8-3.1 1.9-1.3 2.3-.3 5.7 1 7.5.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.7-.9 2.3-1.8.7-.9 1-1.9 1-2-.1 0-1.9-.7-1.9-2.9 0-1.8 1.5-2.7 1.6-2.7-.9-1.3-2.2-1.4-2.7-1.5z" fill="#000000"/>
            <text x="18" y="16.5" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif" fontSize="14" fontWeight="600" fill="#000000" letterSpacing="-0.3">Pay</text>
          </svg>
        </div>

        {/* 6. PayPal (Official Monogram + Wordmark) */}
        <div
          className="h-8 px-2.5 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center hover:border-blue-500 transition-colors"
          title="PayPal International & Diaspora Payments"
        >
          <svg className="h-4.5 w-auto" viewBox="0 0 85 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Double P Monogram */}
            <path d="M5.5 2h9c3.2 0 5.4.7 6.4 2 .5.6.8 1.2 1 1.9.2.7.2 1.6 0 2.6-.5 2.6-2.1 4.3-4.8 5.1-.9.2-1.9.4-3.1.4H11l-.9 5.8H5.5L8.5 2z" fill="#003087" />
            <path d="M10.2 6.5h8.2c2.8 0 4.7.6 5.6 1.7.4.5.7 1.1.9 1.7.2.6.2 1.4 0 2.3-.5 2.6-2.1 4.3-4.8 5.1-.9.2-1.9.4-3.1.4h-2.5l-.9 5.8H8.5l2.6-17h-.9z" fill="#0079C1" />
            <path d="M13.2 6.5h5.2c2.8 0 4.7.6 5.6 1.7.4.5.7 1.1.9 1.7-.7.4-1.6.7-2.7.8-1 .1-2.1.2-3.3.2h-2.5l-.9 5.8h-1.5l1.6-10.4 1.1-.3z" fill="#00457C" opacity="0.6" />
            {/* PayPal Text */}
            <text x="27" y="17" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="13" fontWeight="900" fontStyle="italic" fill="#003087" letterSpacing="-0.02em">Pay<tspan fill="#0079C1">Pal</tspan></text>
          </svg>
        </div>

        {/* 7. Bank Transfer / PesaLink */}
        <div
          className="h-8 px-2.5 rounded-md bg-stone-50 border border-stone-200/90 shadow-2xs flex items-center space-x-1.5 text-stone-700 hover:border-stone-400 transition-colors"
          title="Electronic Bank Transfer & PesaLink Real-Time Settlement"
        >
          <svg className="w-3.5 h-3.5 text-stone-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
          </svg>
          <span className="text-[10px] font-bold tracking-wider uppercase text-stone-700 whitespace-nowrap">
            Bank / EFT
          </span>
        </div>
      </div>
    </div>
  );
};
