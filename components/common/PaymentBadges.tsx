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
    <div className={`space-y-2 ${className}`}>
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
        {/* 1. Safaricom M-Pesa */}
        <div
          className="h-7 px-2.5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-center space-x-1.5 hover:border-emerald-500 transition-colors"
          title="Safaricom Lipa Na M-Pesa Online (STK Push & Till)"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#00A651] flex items-center justify-center text-white text-[8px] font-black">
            M
          </div>
          <span className="text-[11px] font-black tracking-tight text-[#00A651]">
            M-PESA
          </span>
        </div>

        {/* 2. Google Pay */}
        <div
          className="h-7 px-2.5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-center space-x-1.5 hover:border-stone-400 transition-colors"
          title="Google Pay"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"/>
            <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"/>
            <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" fill="#FBBC05"/>
            <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"/>
          </svg>
          <span className="text-[11px] font-semibold tracking-tight text-stone-700">
            Pay
          </span>
        </div>

        {/* 3. Visa */}
        <div
          className="h-7 px-2.5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-center hover:border-blue-500 transition-colors"
          title="Visa Debit & Credit Cards"
        >
          <svg className="h-3.5 w-auto" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1 0.5L12.5 15.5H8.3L5.1 3.5C4.9 2.7 4.7 2.4 4.1 2.1C3.1 1.6 1.5 1.1 0.1 0.8L0.2 0.5H7C7.9 0.5 8.7 1.1 8.9 2.1L10.6 11.2L14.8 0.5H19.1ZM36.1 10.6C36.1 6.6 30.5 6.4 30.5 4.6C30.5 4 31 3.4 32.2 3.2C32.8 3.1 34.4 3.1 36.1 3.9L36.8 0.7C35.8 0.3 34.5 0 32.9 0C28.9 0 26.1 2.1 26.1 5.2C26.1 7.5 28.1 8.7 29.7 9.5C31.3 10.3 31.8 10.8 31.8 11.5C31.8 12.6 30.5 13.1 29.3 13.1C27.2 13.1 26 12.8 25.1 12.4L24.3 15.7C25.3 16.1 27.1 16.5 28.9 16.5C33.2 16.5 36.1 14.4 36.1 10.6ZM46.8 15.5H50.5L47.3 0.5H43.9C43.1 0.5 42.4 1 42.1 1.7L36 15.5H40.4L41.3 13H46.7L46.8 15.5ZM42.5 9.9L44.6 4.1L45.8 9.9H42.5ZM25.2 0.5L21.8 15.5H17.7L21.1 0.5H25.2Z" fill="#1434CB"/>
          </svg>
        </div>

        {/* 4. Mastercard */}
        <div
          className="h-7 px-2.5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-center space-x-1 hover:border-amber-400 transition-colors"
          title="Mastercard Debit & Credit"
        >
          <div className="flex items-center -space-x-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-[#EB001B] opacity-90" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#F79E1B] opacity-90" />
          </div>
          <span className="text-[10px] font-bold text-stone-700 tracking-tight ml-1 hidden sm:inline">
            mastercard
          </span>
        </div>

        {/* 5. PayPal */}
        <div
          className="h-7 px-2.5 rounded-md bg-white border border-stone-200 shadow-2xs flex items-center space-x-1 hover:border-blue-400 transition-colors"
          title="PayPal International & Diaspora Payments"
        >
          <span className="font-serif italic font-black text-xs text-[#003087]">P</span>
          <span className="font-serif italic font-black text-xs text-[#0079C1] -ml-1.5">P</span>
          <span className="text-[10px] font-bold text-[#003087] ml-0.5 hidden sm:inline">
            PayPal
          </span>
        </div>

        {/* 6. Bank Transfer / Pesalink */}
        <div
          className="h-7 px-2 rounded-md bg-stone-50 border border-stone-200 shadow-2xs flex items-center space-x-1 text-stone-600"
          title="Electronic Bank Transfer & PesaLink"
        >
          <span className="text-[9px] uppercase font-bold tracking-wider">
            Bank / EFT
          </span>
        </div>
      </div>
    </div>
  );
};
