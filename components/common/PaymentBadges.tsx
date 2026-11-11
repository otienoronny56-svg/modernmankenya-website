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
          <span className="text-[10px] text-stone-600 font-semibold flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </span>
        </div>
      )}

      <div className="flex items-center gap-1 sm:gap-1.5 flex-nowrap overflow-x-auto sm:overflow-visible py-0.5">
        {/* 1. Safaricom Lipa Na M-Pesa */}
        <div
          className="h-7 px-2 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1 hover:border-emerald-500 transition-colors"
          title="Safaricom Lipa Na M-Pesa Online (STK Push & Till)"
        >
          <svg className="h-4.5 w-auto shrink-0" viewBox="0 0 112 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="2" width="22" height="28" rx="3.5" fill="#00A651" />
            <rect x="4.5" y="6" width="15" height="15" rx="1.5" fill="#FFFFFF" />
            <circle cx="12" cy="25.5" r="1.5" fill="#FFFFFF" />
            <path d="M10 13.5L14 9.5M14 9.5H11M14 9.5V12.5" stroke="#ED1C24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <text x="29" y="12" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="8" fontWeight="800" fill="#006B35" letterSpacing="0.08em">LIPA NA</text>
            <text x="29" y="26" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="14" fontWeight="900" fill="#00A651" letterSpacing="-0.03em">M-PESA</text>
          </svg>
        </div>

        {/* 2. Bank Transfer / PesaLink (Placed right beside M-Pesa) */}
        <div
          className="h-7 px-2 rounded-md bg-stone-50 border border-stone-200/90 shadow-2xs flex items-center space-x-1 text-stone-700 hover:border-stone-400 transition-colors"
          title="Electronic Bank Transfer & PesaLink Real-Time Settlement"
        >
          <svg className="w-3.5 h-3.5 text-stone-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20L12 2z" />
          </svg>
          <span className="text-[9.5px] font-bold tracking-wider uppercase text-stone-700 whitespace-nowrap">
            Bank / EFT
          </span>
        </div>

        {/* 3. Visa */}
        <div
          className="h-7 px-2 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center hover:border-blue-500 transition-colors"
          title="Visa Debit & Credit Cards"
        >
          <svg className="h-3.5 w-auto shrink-0" viewBox="0 0 52 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.1 0.5L12.5 15.5H8.3L5.1 3.5C4.9 2.7 4.7 2.4 4.1 2.1C3.1 1.6 1.5 1.1 0.1 0.8L0.2 0.5H7C7.9 0.5 8.7 1.1 8.9 2.1L10.6 11.2L14.8 0.5H19.1ZM36.1 10.6C36.1 6.6 30.5 6.4 30.5 4.6C30.5 4 31 3.4 32.2 3.2C32.8 3.1 34.4 3.1 36.1 3.9L36.8 0.7C35.8 0.3 34.5 0 32.9 0C28.9 0 26.1 2.1 26.1 5.2C26.1 7.5 28.1 8.7 29.7 9.5C31.3 10.3 31.8 10.8 31.8 11.5C31.8 12.6 30.5 13.1 29.3 13.1C27.2 13.1 26 12.8 25.1 12.4L24.3 15.7C25.3 16.1 27.1 16.5 28.9 16.5C33.2 16.5 36.1 14.4 36.1 10.6ZM46.8 15.5H50.5L47.3 0.5H43.9C43.1 0.5 42.4 1 42.1 1.7L36 15.5H40.4L41.3 13H46.7L46.8 15.5ZM42.5 9.9L44.6 4.1L45.8 9.9H42.5ZM25.2 0.5L21.8 15.5H17.7L21.1 0.5H25.2Z" fill="#1A1F71"/>
            <path d="M7 0.5L0.2 0.5L0.1 0.8C1.5 1.1 3.1 1.6 4.1 2.1C4.7 2.4 4.9 2.7 5.1 3.5L8.9 2.1C8.7 1.1 7.9 0.5 7 0.5Z" fill="#F7B600"/>
          </svg>
        </div>

        {/* 4. Mastercard */}
        <div
          className="h-7 px-2 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1 hover:border-amber-400 transition-colors"
          title="Mastercard"
        >
          <svg className="h-4.5 w-auto shrink-0" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12.5" cy="12" r="9.5" fill="#EB001B"/>
            <circle cx="25.5" cy="12" r="9.5" fill="#F79E1B"/>
            <path d="M19 5.38A9.48 9.48 0 0014.78 12 9.48 9.48 0 0019 18.62 9.48 9.48 0 0023.22 12 9.48 9.48 0 0019 5.38z" fill="#FF5F00"/>
          </svg>
          <span className="text-[9.5px] font-bold text-stone-800 tracking-tight hidden sm:inline">
            mastercard
          </span>
        </div>

        {/* 5. Google Pay */}
        <div
          className="h-7 px-2 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1 hover:border-stone-400 transition-colors"
          title="Google Pay"
        >
          <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"/>
            <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"/>
            <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.94 0 12s.45 3.84 1.25 5.42l4.03-3.15z" fill="#FBBC05"/>
            <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"/>
          </svg>
          <span className="text-[10px] font-bold text-stone-700 tracking-tight">
            Pay
          </span>
        </div>

        {/* 6. Apple Pay */}
        <div
          className="h-7 px-2 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1 hover:border-stone-400 transition-colors"
          title="Apple Pay"
        >
          <svg className="w-3 h-3 shrink-0 text-black fill-current" viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.88-11.91-14.52-5.49-8.48-9.92-18.06-13.27-28.74-3.36-10.68-5.04-21.2-5.04-31.56 0-14.28 3.57-25.97 10.7-35.08 7.13-9.11 16.23-13.78 27.29-14.02 4.89 0 10.15 1.25 15.78 3.75 5.63 2.5 9.4 3.81 11.3 3.93 1.9-.12 5.86-1.49 11.87-4.11 6.01-2.62 11.28-3.81 15.79-3.57 12.39.73 22.37 5.34 29.93 13.84-10.88 6.64-16.21 15.69-16 27.13.21 8.94 3.65 16.44 10.32 22.5 6.67 6.06 14.53 9.48 23.58 10.25-1.9 5.89-4.21 11.83-6.93 17.82zM119.22 33.15c0-6.84 2.45-13.24 7.36-19.2 4.91-5.96 11.02-9.93 18.34-11.91.84 6.72-.94 13.06-5.35 19.02-4.41 5.96-10.85 9.98-19.33 12.09-.17-.79-.57-1.42-.8-2.03-.15-.65-.22-1.29-.22-1.97z"/>
          </svg>
          <span className="text-[10px] font-bold text-black tracking-tight">
            Pay
          </span>
        </div>

        {/* 7. PayPal */}
        <div
          className="h-7 px-2 rounded-md bg-white border border-stone-200/90 shadow-2xs flex items-center space-x-1 hover:border-blue-500 transition-colors"
          title="PayPal International & Diaspora Payments"
        >
          <div className="flex items-center -space-x-1">
            <span className="font-serif italic font-black text-xs text-[#003087] leading-none">P</span>
            <span className="font-serif italic font-black text-xs text-[#0079C1] leading-none">P</span>
          </div>
          <span className="text-[10px] font-extrabold italic tracking-tight text-[#003087]">
            Pay<span className="text-[#0079C1]">Pal</span>
          </span>
        </div>
      </div>
    </div>
  );
};
