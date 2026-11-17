'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { 
  Check, 
  RefreshCw, 
  Info, 
  ShieldCheck, 
  CheckCircle2, 
  X,
  AlertCircle
} from 'lucide-react';

interface HumanVerificationCaptchaProps {
  onVerify: (isVerified: boolean) => void;
  isVerified: boolean;
}

interface VisualTile {
  id: string;
  src: string;
  alt: string;
  isTarget: boolean;
}

interface ChallengeTheme {
  title: string;
  targetInstruction: string;
  targets: Array<{ src: string; alt: string }>;
  decoys: Array<{ src: string; alt: string }>;
}

const CHALLENGE_THEMES: ChallengeTheme[] = [
  {
    title: 'bespoke suits & tailored blazers',
    targetInstruction: 'Select all squares with bespoke suits or tailored blazers',
    targets: [
      { src: '/images/Bespoke Suit.jpg', alt: 'Bespoke Tailored Suit' },
      { src: '/images/collections/suit-navy-pinstripe-double-breasted-2.jpeg', alt: 'Double Breasted Navy Suit' },
      { src: '/images/advocate-legal-barrister-navy-1.jpeg', alt: 'Advocate Pinstripe Suit' },
      { src: '/images/tuxedo-black-tie-classic.jpeg', alt: 'Black Tie Tuxedo' },
    ],
    decoys: [
      { src: '/images/agbada-chocolate-brown.jpeg', alt: 'African Agbada' },
      { src: '/images/accessories/modernman-dress-watch.jpg', alt: 'Horology Dress Watch' },
      { src: '/images/accessories/modern-man-savile-cedar-vetiver.jpg', alt: 'Fragrance Bottle' },
      { src: '/images/shirts/modernman-shirt-navy-bengal-stripe.jpg', alt: 'Bengal Stripe Shirt' },
      { src: '/images/accessories/modernman-cufflinks-studs.jpg', alt: 'Cufflinks & Studs' },
      { src: '/images/accessories/modernman-master-fedora-hat.jpg', alt: 'Master Fedora Hat' },
      { src: '/images/accessories/modernman-velvet-bowtie.jpg', alt: 'Velvet Bowtie' },
    ],
  },
  {
    title: 'luxury horology & sartorial accessories',
    targetInstruction: 'Select all squares with luxury watches, cufflinks, or ties',
    targets: [
      { src: '/images/accessories/modernman-dress-watch.jpg', alt: 'Luxury Dress Watch' },
      { src: '/images/accessories/modernman-cufflinks-studs.jpg', alt: 'Onyx Cufflinks' },
      { src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.55 PM.jpeg', alt: 'Silk Grenadine Tie' },
      { src: '/images/accessories/modernman-velvet-bowtie.jpg', alt: 'Velvet Bowtie' },
    ],
    decoys: [
      { src: '/images/Bespoke Suit.jpg', alt: 'Bespoke Suit' },
      { src: '/images/agbada-chocolate-brown.jpeg', alt: 'African Agbada' },
      { src: '/images/collections/suit-navy-pinstripe-double-breasted-2.jpeg', alt: 'Double Breasted Suit' },
      { src: '/images/advocate-legal-barrister-navy-1.jpeg', alt: 'Advocate Suit' },
      { src: '/images/women-suit-emerald-green.jpeg', alt: 'Emerald Green Suit' },
      { src: '/images/agbada-classic-1.jpeg', alt: 'Classic Agbada' },
    ],
  },
  {
    title: 'African agbada & senator wear',
    targetInstruction: 'Select all squares with African agbada or senator tunics',
    targets: [
      { src: '/images/agbada-chocolate-brown.jpeg', alt: 'Chocolate Agbada' },
      { src: '/images/agbada-classic-1.jpeg', alt: 'Classic Agbada Tunic' },
      { src: '/images/agbada-navy-copper-embroidery.jpeg', alt: 'Embroidered Agbada' },
      { src: '/images/agbada-classic-2.jpeg', alt: 'Atelier Agbada Robe' },
    ],
    decoys: [
      { src: '/images/Bespoke Suit.jpg', alt: 'Bespoke Suit' },
      { src: '/images/accessories/modernman-dress-watch.jpg', alt: 'Dress Watch' },
      { src: '/images/tuxedo-black-tie-classic.jpeg', alt: 'Black Tie Tuxedo' },
      { src: '/images/accessories/modernman-cufflinks-studs.jpg', alt: 'Cufflinks' },
      { src: '/images/shirts/modernman-shirt-navy-bengal-stripe.jpg', alt: 'Formal Shirt' },
      { src: '/images/accessories/modern-man-savile-cedar-vetiver.jpg', alt: 'Fragrance' },
    ],
  },
];

export const HumanVerificationCaptcha: React.FC<HumanVerificationCaptchaProps> = ({
  onVerify,
  isVerified,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Current visual challenge state
  const [currentTheme, setCurrentTheme] = useState<ChallengeTheme>(CHALLENGE_THEMES[0]);
  const [tiles, setTiles] = useState<VisualTile[]>([]);
  const [selectedTileIds, setSelectedTileIds] = useState<Set<string>>(new Set());
  const challengeStartTime = useRef<number>(0);

  // Check if official Google reCAPTCHA site key is present
  const googleSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const recaptchaContainerRef = useRef<HTMLDivElement>(null);
  const [useGoogleScript, setUseGoogleScript] = useState<boolean>(Boolean(googleSiteKey));

  // Initialize visual challenge tiles
  const setupNewVisualChallenge = useCallback(() => {
    // Pick a random theme
    const randomTheme = CHALLENGE_THEMES[Math.floor(Math.random() * CHALLENGE_THEMES.length)];
    setCurrentTheme(randomTheme);

    // Pick 3 or 4 targets
    const targetCount = Math.random() > 0.5 ? 3 : 4;
    const shuffledTargets = [...randomTheme.targets].sort(() => 0.5 - Math.random()).slice(0, targetCount);
    
    // Pick (9 - targetCount) decoys
    const decoyCount = 9 - targetCount;
    const shuffledDecoys = [...randomTheme.decoys].sort(() => 0.5 - Math.random()).slice(0, decoyCount);

    // Combine and shuffle 9 tiles
    const combined: VisualTile[] = [
      ...shuffledTargets.map((t, idx) => ({
        id: `target-${idx}-${Date.now()}`,
        src: t.src,
        alt: t.alt,
        isTarget: true,
      })),
      ...shuffledDecoys.map((d, idx) => ({
        id: `decoy-${idx}-${Date.now()}`,
        src: d.src,
        alt: d.alt,
        isTarget: false,
      })),
    ].sort(() => 0.5 - Math.random());

    setTiles(combined);
    setSelectedTileIds(new Set());
    setErrorMessage(null);
    challengeStartTime.current = Date.now();
  }, []);

  // Google reCAPTCHA v2 Script Injection if configured
  useEffect(() => {
    if (!googleSiteKey) return;

    // Load Google script if not already on window
    if (typeof window !== 'undefined' && !(window as any).grecaptcha) {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderGoogleRecaptcha();
      };
      document.body.appendChild(script);
    } else if ((window as any).grecaptcha?.render) {
      renderGoogleRecaptcha();
    }

    function renderGoogleRecaptcha() {
      if (!recaptchaContainerRef.current) return;
      try {
        (window as any).grecaptcha.render(recaptchaContainerRef.current, {
          sitekey: googleSiteKey,
          callback: (token: string) => {
            onVerify(true);
            setIsChecked(true);
          },
          'expired-callback': () => {
            onVerify(false);
            setIsChecked(false);
          },
          'error-callback': () => {
            // Fallback to internal visual challenge if Google fails
            setUseGoogleScript(false);
          },
        });
      } catch (e) {
        // Fallback
        setUseGoogleScript(false);
      }
    }
  }, [googleSiteKey, onVerify]);

  const handleCheckboxClick = () => {
    if (isVerified || isChecked) return;

    setIsVerifying(true);
    setupNewVisualChallenge();

    // Natural 400ms delay like Google reCAPTCHA before popping up the visual challenge modal
    setTimeout(() => {
      setIsVerifying(false);
      setShowModal(true);
    }, 450);
  };

  const toggleTile = (id: string) => {
    setSelectedTileIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleVerifyVisual = () => {
    // 1. Minimum interaction duration check (bots answer in milliseconds; humans take >1s)
    const elapsed = Date.now() - challengeStartTime.current;
    if (elapsed < 800) {
      setErrorMessage('Verification failed: automated behavior detected. Please take your time.');
      setupNewVisualChallenge();
      return;
    }

    // 2. Validate selections
    const targetIds = new Set(tiles.filter((t) => t.isTarget).map((t) => t.id));
    const isCorrectCount = selectedTileIds.size === targetIds.size;
    let allTargetsSelected = true;

    for (const tId of targetIds) {
      if (!selectedTileIds.has(tId)) {
        allTargetsSelected = false;
        break;
      }
    }

    if (isCorrectCount && allTargetsSelected) {
      setShowModal(false);
      setIsChecked(true);
      onVerify(true);
    } else {
      setErrorMessage('Please select all matching images to verify you are human.');
      setTimeout(() => {
        setupNewVisualChallenge();
      }, 700);
    }
  };

  // If using official Google reCAPTCHA script and container is mounted
  if (useGoogleScript && googleSiteKey) {
    return (
      <div className="py-2">
        <div ref={recaptchaContainerRef} className="flex justify-center" />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 1. Google reCAPTCHA Style Checkbox Card */}
      <div className="w-full max-w-[320px] rounded-lg border border-slate-300 dark:border-slate-700 bg-[#f9f9f9] dark:bg-[#151926] p-3 shadow-xs flex items-center justify-between select-none">
        <div className="flex items-center space-x-3.5">
          {/* Checkbox */}
          <button
            type="button"
            onClick={handleCheckboxClick}
            disabled={isVerified || isChecked || isVerifying}
            className={`w-7 h-7 rounded border transition-all flex items-center justify-center cursor-pointer ${
              isVerified || isChecked
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                : 'border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 hover:border-slate-500'
            }`}
            aria-label="I am not a robot verification checkbox"
          >
            {isVerifying ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : isVerified || isChecked ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : null}
          </button>

          <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
            {isVerified || isChecked ? "I'm not a robot" : "I'm not a robot"}
          </span>
        </div>

        {/* reCAPTCHA Brand Logo Badge */}
        <div className="flex flex-col items-center justify-center text-right pl-2">
          {/* Official Google reCAPTCHA Tri-Arrow Emblem in SVG */}
          <svg className="w-7 h-7 text-[#1A73E8]" viewBox="0 0 48 48">
            <path
              fill="#1A73E8"
              d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 6c7.73 0 14 6.27 14 14s-6.27 14-14 14-14-6.27-14-14 6.27-14 14-14z"
              opacity="0.2"
            />
            <path
              fill="#4285F4"
              d="M33.6 19.8l-4.5 4.5h7.9c-.8-5.3-4.8-9.6-10-10.8v4.2c3.2 1 5.7 3.6 6.6 6.8v-.7z"
            />
            <path
              fill="#34A853"
              d="M24 35c-4.4 0-8.2-2.7-9.8-6.6h-4.3c1.8 6.3 7.6 10.9 14.1 10.9 3.6 0 6.9-1.3 9.4-3.5l-3.2-3.2c-1.7 1.5-3.9 2.4-6.2 2.4z"
            />
            <path
              fill="#FBBC05"
              d="M14.2 28.4c-.6-1.3-.9-2.8-.9-4.4s.3-3.1.9-4.4l-4.3-3.3C8.4 18.9 7.5 21.3 7.5 24s.9 5.1 2.4 7.7l4.3-3.3z"
            />
            <path
              fill="#EA4335"
              d="M24 13c2.3 0 4.5.9 6.2 2.4l3.2-3.2C30.9 10.3 27.6 9 24 9c-6.5 0-12.3 4.6-14.1 10.9h4.3C15.8 15.7 19.6 13 24 13z"
            />
          </svg>
          <span className="text-[9px] font-bold tracking-tight text-slate-500 dark:text-slate-400 leading-tight">
            reCAPTCHA
          </span>
          <span className="text-[8px] text-slate-400 dark:text-slate-500 leading-none">
            Privacy - Terms
          </span>
        </div>
      </div>

      {/* 2. Google-Style Visual Challenge Modal (3x3 Grid) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-[360px] sm:max-w-[390px] bg-white dark:bg-[#121624] rounded-xl shadow-2xl border border-slate-300 dark:border-slate-700 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
            
            {/* Blue Banner Header (Exact Google reCAPTCHA styling) */}
            <div className="bg-[#1a73e8] text-white p-4 relative">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-white/80 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Close visual challenge"
              >
                <X className="w-4 h-4" />
              </button>
              
              <span className="text-[11px] font-medium text-white/90 uppercase tracking-wider block mb-0.5">
                Select all images with
              </span>
              <h3 className="text-base sm:text-lg font-bold leading-tight font-sans capitalize tracking-wide">
                {currentTheme.title}
              </h3>
              <p className="text-[11px] text-white/80 mt-1">
                Click verify once there are none left.
              </p>
            </div>

            {/* Error Notice */}
            {errorMessage && (
              <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs flex items-center space-x-2 border-b border-rose-200 dark:border-rose-900/60">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 3x3 Photo Grid */}
            <div className="p-3 bg-slate-100 dark:bg-[#0d101a]">
              <div className="grid grid-cols-3 gap-2">
                {tiles.map((tile) => {
                  const isSelected = selectedTileIds.has(tile.id);
                  return (
                    <div
                      key={tile.id}
                      onClick={() => toggleTile(tile.id)}
                      className={`relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-150 group select-none ${
                        isSelected
                          ? 'ring-4 ring-[#1a73e8] scale-[0.96] shadow-md'
                          : 'hover:opacity-90 active:scale-95'
                      }`}
                    >
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        fill
                        sizes="120px"
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />

                      {/* Selection Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-[#1a73e8] text-white flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in-75 duration-150">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}

                      {/* Subtle dark overlay when selected */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#1a73e8]/20 pointer-events-none" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer Controls */}
            <div className="px-4 py-3 bg-white dark:bg-[#121624] border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-400">
                <button
                  type="button"
                  onClick={setupNewVisualChallenge}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  title="Reload a new challenge"
                  aria-label="Reload challenge"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => alert('Visual human verification challenge. Identify and select all matching sartorial photographs from the 3x3 grid.')}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
                  title="Challenge information"
                  aria-label="Help"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleVerifyVisual}
                  className="px-5 py-2 rounded-md bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                >
                  VERIFY
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
