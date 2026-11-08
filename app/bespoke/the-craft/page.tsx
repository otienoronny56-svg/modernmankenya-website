'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Ruler, 
  Layers, 
  Scissors, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Tag,
  ArrowRight,
  ChevronRight,
  Flame,
  Crown
} from 'lucide-react';

interface SuitTier {
  id: string;
  name: string;
  subtitle: string;
  timeline: string;
  priceRange: string;
  badge?: string;
  isPopular?: boolean;
  fabric: string;
  build: string;
  bestFor: string;
  points: string[];
  ctaLink: string;
}

const SUIT_TIERS: SuitTier[] = [
  {
    id: 'standard',
    name: 'Standard Tier',
    subtitle: 'Daily Business & Sharp Corporate Cut',
    timeline: '1 Week (7 Days)',
    priceRange: 'KSh 18,000 – 25,000',
    fabric: 'Durable Poly-Wool & Fine Cotton Blends (Non-100% wool for easy maintenance and crease resistance)',
    build: 'Machine-assisted precision cut with clean half-canvas chest structure and one physical fitting',
    bestFor: 'Everyday office suits, corporate wear, advocates, and urgent events',
    points: [
      'Fast 1-week turnaround in Nairobi',
      'Tough blend that resists everyday commuting creases',
      '35 individual body measurements included',
    ],
    ctaLink: '/book-appointment?tier=standard',
  },
  {
    id: 'premium',
    name: 'Premium Tier',
    subtitle: 'Weddings, Boardrooms & Special Milestones',
    timeline: '2 Weeks (14 Days)',
    priceRange: 'KSh 30,000 – 45,000',
    badge: 'Most Popular',
    isPopular: true,
    fabric: 'High-twist fine wool blends, lightweight pure wools, and specialty jacquard blazers',
    build: 'Half floating canvas construction, pick-stitched lapels, horn buttons, and Gurkha trouser side adjusters',
    bestFor: 'Weddings, groomsmen sets, executive presentations, and evening galas',
    points: [
      '2 physical fittings including jacket basting check',
      'Breathable cloth that drapes cleanly in Nairobi heat',
      'Gurkha metal side adjusters (no belt required)',
    ],
    ctaLink: '/book-appointment?tier=premium',
  },
  {
    id: 'executive',
    name: 'Executive Tier',
    subtitle: 'Masterpiece Atelier & Red Carpet Precision',
    timeline: '3 to 4 Weeks (21–28 Days)',
    priceRange: 'KSh 50,000 – 200,000',
    badge: 'Master Atelier',
    fabric: '100% Pure imported high-twist wool (Super 140s–180s from Scabal, Dormeuil, Loro Piana, Zegna) and metallic relief jacquards',
    build: 'Full floating horsehair canvas, hand-stitched Milanese lapel buttonhole, surgeon cuffs, and custom monogram embroidery',
    bestFor: 'Black-tie weddings, CEOs, diplomatic summits, red carpets, and legacy keepsakes',
    points: [
      'Multiple basted fittings until the drape is millimetric',
      '100% pure wool with natural stretch and zero synthetic glue',
      'Working sleeve buttonholes & bespoke interior silk lining',
    ],
    ctaLink: '/book-appointment?tier=executive',
  },
];

interface FabricCategory {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  useCase: string;
  whyKenyansLoveIt: string;
  features: string[];
  linkText: string;
  linkHref: string;
}

const FABRICS_DATA: FabricCategory[] = [
  {
    id: 'jacquard',
    name: 'Luxury Jacquard',
    subtitle: 'Tuxedos & Statement Dinner Jackets',
    image: '/images/craft/fabric-jacquard.jpg',
    useCase: 'Weddings, Black-Tie Galas, Award Ceremonies & Red Carpets',
    whyKenyansLoveIt: 'Woven with raised patterns that catch light and look incredible in wedding photos. It gives the groom a regal, standout presence that commands the room.',
    features: ['Raised woven texture', 'Non-crease structure', 'Perfect for contrasting shawls'],
    linkText: 'Explore Tuxedos & Eveningwear',
    linkHref: '/occasions/black-tie-wedding',
  },
  {
    id: 'pure-wool',
    name: '100% Pure Wool',
    subtitle: 'Executive Wear & Power Suiting',
    image: '/images/craft/fabric-pure-wool.jpg',
    useCase: 'Boardroom Meetings, Corporate Leadership, Diplomatic Delegations',
    whyKenyansLoveIt: 'Natural merino wool breathes with your body. It keeps you cool during warm Nairobi afternoons and warm during cold July mornings, naturally shedding wrinkles after hours of sitting.',
    features: ['100% Natural fiber', 'Super 130s to 180s grades', 'Excellent natural bounce & drape'],
    linkText: 'See Executive Wear Collection',
    linkHref: '/occasions/executive-wear',
  },
  {
    id: 'wool-blends',
    name: 'Wool Blends (Poly-Wool)',
    subtitle: 'Daily Hustle, Offices & Standard Suits',
    image: '/images/craft/fabric-wool-blend.jpg',
    useCase: 'Everyday Work, Court Appearances, Frequent Travel & Commercial Wear',
    whyKenyansLoveIt: 'Blended with strong microfibers, this cloth handles the daily Nairobi commute, resists friction and creasing, and is priced affordably without losing a clean tailored taper.',
    features: ['Budget-friendly (18k – 25k tier)', 'Very durable & easy to press', 'Holds sharp trouser crease'],
    linkText: 'Browse Suits in Gallery',
    linkHref: '/gallery?category=suits',
  },
  {
    id: 'cotton-safari',
    name: 'Fine Cottons & Safari Twills',
    subtitle: 'Kaunda Suits, Safari Jackets & Casual Blazers',
    image: '/images/craft/fabric-cotton.jpg',
    useCase: 'Kaunda Suits, Safari Sets, Coastal Trips & Smart Casual Fridays',
    whyKenyansLoveIt: 'Heavyweight cotton twills and breathable linens designed for tropical ease. Crisp, soft on the skin, and built for both presidential Kaunda collars and relaxed safari pockets.',
    features: ['Breathable cotton & linen', 'Ideal for Kaunda & Safari collars', 'Washable and resilient'],
    linkText: 'Explore African & Kaunda Wear',
    linkHref: '/occasions/african-wear',
  },
];

interface LiningCategory {
  title: string;
  type: string;
  desc: string;
  image: string;
  examples: string[];
}

const LININGS_DATA: LiningCategory[] = [
  {
    title: 'Patterned Linings',
    type: 'Expressive & Photogenic Silk Cupro',
    desc: 'When you unbutton your jacket, a bold lining shows your character and personal style. Highly requested by Kenyan grooms for photography.',
    image: '/images/craft/lining-paisley.jpg',
    examples: [
      'Jacquard Paisley (Imperial Gold, Royal Wine, Midnight Navy)',
      'Obsidian Geometric (Modern dark charcoal and architectural grids)',
      'African Flora & Heritage Silks',
    ],
  },
  {
    title: 'Plain Linings',
    type: 'Discreet, Pure Silk Satin & Bemberg Cupro',
    desc: 'Understated luxury for business executives and minimalist gentlemen. Ultra-smooth Japanese cupro that slides over your shirt with zero friction or static.',
    image: '/images/craft/lining-plain-satin.jpg',
    examples: [
      'Midnight Navy Pure Silk Satin (Clean, boardroom-approved)',
      'Champagne Gold Viscose (Warm, luminous royal contrast)',
      'Breathable Bemberg Cupro (Cool-touch, anti-sweat slide)',
    ],
  },
];

export default function TheCraftPage() {
  const steps = [
    {
      number: '01',
      title: '35 Body Measurements',
      tagline: 'Built for your body, never a generic size',
      image: '/images/Bespoke Suit.jpg',
      alt: 'Taking measurements and preparing suit canvas at Modern Man Kenya',
      description:
        'Most store-bought suits expect everyone to fit into small, medium, or large. We take 35 precise measurements of your chest, waist, shoulder slope, arm length, and posture. Whether your left shoulder sits slightly lower or you prefer extra room across the back, your suit is cut from scratch to fit your natural stance.',
      highlights: [
        'Accounts for your exact posture and shoulder slope',
        'No pulling across the chest or bunching behind the neck',
        'Comfortable when sitting down, driving, or walking',
      ],
    },
    {
      number: '02',
      title: 'The Floating Canvas',
      tagline: 'Why our suits breathe and never bubble',
      image: '/images/three-piece-vest-look.jpeg',
      alt: 'Internal floating canvas structure and vest drape',
      description:
        'Standard factory suits use glue to stick synthetic stiffeners to the fabric. When you dry-clean them or sweat in Nairobi heat, the glue melts, leaving ugly bubbles on your chest. Modern Man uses a floating canvas made of natural wool and horsehair, stitched gently between the outer cloth and lining. It lets air pass through and slowly shapes itself to your body the more you wear it.',
      highlights: [
        'Zero stiff glue — 100% breathable natural horsehair & wool',
        'Will never bubble or wrinkle after dry cleaning',
        'Lapel rolls with a soft, natural curve that stays crisp',
      ],
    },
    {
      number: '03',
      title: 'The First Fitting',
      tagline: 'Trying on the half-stitched jacket',
      image: '/images/three-piece-suit-blue.jpeg',
      alt: 'Client trying on a tailored three-piece suit',
      description:
        'Before your suit is completely finished, you come in to try on the half-stitched jacket with white basting threads. This is where we see how the cloth falls on you in real life. We adjust the waist taper, check sleeve length to show the right amount of shirt cuff, and make sure the jacket collar hugs your neck without any gap.',
      highlights: [
        'See and feel the suit take shape on your shoulders',
        'Fine-tune waist suppression and jacket length',
        'Ensures total comfort before final sewing',
      ],
    },
    {
      number: '04',
      title: 'Trouser Details & Gurkha Adjusters',
      tagline: 'Clean drape without needing a belt',
      image: '/images/bespoke-trousers-gurkha-side-adjusters.jpeg',
      alt: 'Gurkha trousers with metal buckle side adjusters and double pleats',
      description:
        'Belts often bunch up your trouser waistband and create bulk under your jacket. Our trousers feature high-rise waistbands, front pleats for thigh comfort, and metal side adjusters. You can tighten or loosen your waist by an inch on the go with a simple slide of the buckle. The legs fall cleanly with just the right touch at your shoes.',
      highlights: [
        'Metal buckle side adjusters — no belt required',
        'Double pleats for extra room when sitting or walking',
        'Crisp front crease that stays sharp all day',
      ],
    },
    {
      number: '05',
      title: 'Hand-Finishing & Quality Checks',
      tagline: 'Surgeon cuffs, horn buttons & clean seams',
      image: '/images/slide.jpeg',
      alt: 'Surgeon cuffs with functioning buttonholes and French cuff shirt',
      description:
        'True tailoring is evident in the small touches you can touch and see. We craft working sleeve buttonholes (surgeon\'s cuffs) so you can unbutton a cuff if you like, stitch real buffalo horn buttons that never crack, and reinforce all pocket corners. Before you receive your suit, we inspect every seam against our multi-point quality checklist.',
      highlights: [
        'Working sleeve buttonholes (surgeon\'s cuffs)',
        'Genuine horn buttons sewn securely with strong thread',
        'Full inspection of seams, balance, and press before handover',
      ],
    },
    {
      number: '06',
      title: 'Your Pattern is Saved',
      tagline: 'Order new suits anytime without remeasuring',
      image: '/images/WhatsApp Image 2026-10-21 at 10.46.27 AM.jpeg',
      alt: 'Bespoke tailoring precision fit and custom paper pattern archived in Nairobi',
      description:
        'Once your first suit is complete and you love the fit, we save your exact measurements and pattern in our system. When you want a new navy blazer, fresh trousers, or a suit for an upcoming wedding, you just pick your fabric and style. We cut and tailor it right away without you having to start from zero.',
      highlights: [
        'Your unique pattern archived securely in Nairobi',
        'Quick reordering via WhatsApp or a short visit',
        'Seasonal updates and new fabrics ready on demand',
      ],
    },
  ];

  const comparison = [
    {
      feature: 'Chest Structure',
      factory: 'Glued synthetic fusing that traps heat and bubbles after dry cleaning',
      modernMan: 'Floating natural horsehair and wool canvas that breathes and molds to you',
    },
    {
      feature: 'Sizing & Cut',
      factory: 'Generic standard sizes (S, M, L / 38, 40, 42) made for an average mannequin',
      modernMan: '35 individual measurements cut specifically for your shoulders and posture',
    },
    {
      feature: 'Trouser Waist',
      factory: 'Requires a belt that can bunch and fold the waistband awkwardly',
      modernMan: 'Gurkha metal side adjusters and clean waistband for effortless fit without a belt',
    },
    {
      feature: 'Sleeve Cuffs',
      factory: 'Sealed fake buttons sewn flat onto the sleeve with no real holes',
      modernMan: 'Real functioning buttonholes (surgeon\'s cuffs) hand-finished with horn buttons',
    },
    {
      feature: 'Fitting Process',
      factory: 'You take what is on the rack and hope a quick local alteration works',
      modernMan: 'A personal fitting on the half-stitched jacket to ensure absolute comfort',
    },
    {
      feature: 'Reordering',
      factory: 'Start shopping from scratch every single time',
      modernMan: 'Your custom pattern is saved so you can order new pieces with a simple message',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#12131A] text-stone-800 dark:text-slate-100 transition-colors duration-200">
      
      {/* 1. Hero Section */}
      <section className="relative bg-brand-navy text-white py-16 sm:py-24 border-b-2 border-brand-gold/30 overflow-hidden">
        <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-gold text-xs uppercase tracking-luxury font-semibold border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modern Man Kenya Sartorial Craft</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Crafted to Fit Your Body, Not a Shelf
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Honest tailoring built around your lifestyle. Explore our three suit categories, world-class Kenyan fabric selections, and internal silk linings.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all shadow-gold"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Fitting in Nairobi</span>
            </Link>

            <a
              href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20learn%20more%20about%20your%20suit%20categories%20and%20fabrics."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded transition-all border border-white/20"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Ask a Tailor on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. THREE SUIT CATEGORIES (STANDARD, PREMIUM, EXECUTIVE) */}
      <section id="suit-categories" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold inline-flex items-center space-x-2">
            <Scissors className="w-3.5 h-3.5" />
            <span>Tailoring Categories & Pricing</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white">
            Choose Your Tier
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-slate-300 font-light leading-relaxed">
            Every suit is made to your measurements. We offer 3 distinct tiers based on fabric quality, internal canvas precision, and craft time.
          </p>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SUIT_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border relative ${
                tier.isPopular
                  ? 'bg-white dark:bg-[#1E202B] border-brand-gold shadow-2xl ring-2 ring-brand-gold/40'
                  : 'bg-white dark:bg-[#1A1C27] border-stone-200 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-brand-gold/50'
              }`}
            >
              {/* Badge for Popular or Master */}
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-navy text-[10px] uppercase font-bold tracking-luxury px-3.5 py-1 rounded-full shadow-md flex items-center space-x-1">
                  {tier.id === 'executive' ? <Crown className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
                  <span>{tier.badge}</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Header */}
                <div className="border-b border-stone-100 dark:border-slate-800 pb-4">
                  <h3 className="font-serif text-2xl font-bold text-brand-navy dark:text-white">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-slate-400 mt-1">
                    {tier.subtitle}
                  </p>
                </div>

                {/* Price & Timeline Bar */}
                <div className="bg-stone-50 dark:bg-[#242738] p-4 rounded-xl space-y-2 border border-stone-200/60 dark:border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-500 dark:text-slate-400 flex items-center space-x-1">
                      <Tag className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Price:</span>
                    </span>
                    <span className="font-serif text-base sm:text-lg font-bold text-brand-navy dark:text-brand-gold">
                      {tier.priceRange}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-stone-500 dark:text-slate-400 flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Lead Time:</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      {tier.timeline}
                    </span>
                  </div>
                </div>

                {/* Fabric & Build Details in Simple Language */}
                <div className="space-y-2 text-xs text-stone-600 dark:text-slate-300">
                  <p>
                    <strong className="text-stone-900 dark:text-white block mb-0.5">Fabric Cloth:</strong>
                    {tier.fabric}
                  </p>
                  <p>
                    <strong className="text-stone-900 dark:text-white block mb-0.5">Construction:</strong>
                    {tier.build}
                  </p>
                  <p>
                    <strong className="text-stone-900 dark:text-white block mb-0.5">Best For:</strong>
                    {tier.bestFor}
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="pt-2 space-y-2 border-t border-stone-100 dark:border-slate-800">
                  {tier.points.map((pt, i) => (
                    <div key={i} className="flex items-start space-x-2 text-xs text-stone-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-6 mt-6 border-t border-stone-100 dark:border-slate-800">
                <Link
                  href={tier.ctaLink}
                  className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center space-x-1.5 ${
                    tier.isPopular
                      ? 'bg-brand-gold hover:bg-brand-gold-light text-brand-navy shadow-md'
                      : 'bg-brand-navy dark:bg-slate-800 hover:bg-brand-gold text-white hover:text-brand-navy'
                  }`}
                >
                  <span>Book {tier.name.split(' ')[0]} Fitting</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. MOST COMMONLY USED FABRICS IN KENYA */}
      <section id="fabrics" className="py-16 sm:py-24 bg-white dark:bg-[#161722] border-y border-stone-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold inline-flex items-center space-x-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Curated Cloths for Kenyan Living</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white">
              Signature Fabrics We Tailor
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-slate-300 font-light leading-relaxed">
              From statement tuxedos to daily boardroom wools and safari linens, here are the most popular fabrics we stock in our Nairobi atelier.
            </p>
          </div>

          {/* 4 Fabric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {FABRICS_DATA.map((fab) => (
              <div
                key={fab.id}
                className="bg-[#FAF8F5] dark:bg-[#1E202B] rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Photo */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
                  <Image
                    src={fab.image}
                    alt={fab.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block">
                      {fab.subtitle}
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold">{fab.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3 text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-stone-900 dark:text-white block mb-1">
                        Best Occasions:
                      </span>
                      <p className="text-stone-600 dark:text-slate-300">{fab.useCase}</p>
                    </div>

                    <div>
                      <span className="font-semibold text-stone-900 dark:text-white block mb-1">
                        Why Kenyans Choose It:
                      </span>
                      <p className="text-stone-600 dark:text-slate-300 leading-relaxed">
                        {fab.whyKenyansLoveIt}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {fab.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="px-2.5 py-1 bg-white dark:bg-[#282B3C] border border-stone-200 dark:border-slate-700 rounded text-[11px] text-stone-700 dark:text-slate-300 font-medium"
                        >
                          ✓ {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Internal Link */}
                  <div className="pt-3 border-t border-stone-200 dark:border-slate-800">
                    <Link
                      href={fab.linkHref}
                      className="text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>{fab.linkText}</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUIT LININGS (PATTERNED VS PLAIN) */}
      <section id="linings" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold inline-flex items-center space-x-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Interior Secret</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white">
            Patterned or Plain Linings
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-slate-300 font-light leading-relaxed">
            The inside of your jacket is your private touch. Choose an expressive pattern for weddings or classic silk satin for the boardroom.
          </p>
        </div>

        {/* 2 Lining Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {LININGS_DATA.map((lining, lIdx) => (
            <div
              key={lIdx}
              className="bg-white dark:bg-[#1A1C27] rounded-2xl overflow-hidden border border-stone-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-900">
                <Image
                  src={lining.image}
                  alt={lining.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-gold block">
                    {lining.type}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">{lining.title}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 leading-relaxed">
                  {lining.desc}
                </p>

                <div className="space-y-2 bg-stone-50 dark:bg-[#242738] p-4 rounded-xl border border-stone-200/60 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-brand-navy dark:text-brand-gold block">
                    Popular Client Choices:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-700 dark:text-slate-300">
                    {lining.examples.map((ex, eIdx) => (
                      <li key={eIdx} className="flex items-start space-x-2">
                        <span className="text-brand-gold font-bold">•</span>
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/ready-to-wear"
                    className="text-xs font-bold text-brand-navy dark:text-brand-gold hover:underline inline-flex items-center space-x-1"
                  >
                    <span>Pair with Fine Cotton Shirts & Ties</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Step by Step Walkthrough */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold inline-flex items-center space-x-2">
            <Ruler className="w-3.5 h-3.5" />
            <span>The 6 Tailoring Milestones</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy dark:text-white">
            How We Build Your Suit
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600 dark:text-slate-300 font-light leading-relaxed">
            From the initial tape measurement to the hand-stitched horn buttons, here is the journey of your bespoke garment.
          </p>
        </div>

        {steps.map((step, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column (5 cols) */}
              <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-luxury border-2 border-stone-200 dark:border-slate-800 group bg-stone-100 dark:bg-slate-900">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 450px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-brand-navy/90 text-brand-gold text-xs font-serif font-bold px-3 py-1.5 rounded-full border border-brand-gold/40 shadow-sm backdrop-blur-xs">
                    Step {step.number}
                  </div>
                </div>
              </div>

              {/* Text Column (7 cols) */}
              <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center space-x-3">
                  <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
                    Step {step.number} • Modern Man Standard
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy dark:text-white leading-snug">
                  {step.title}
                </h2>

                <p className="text-xs sm:text-sm font-medium text-stone-500 dark:text-slate-400 uppercase tracking-wider">
                  {step.tagline}
                </p>

                <p className="text-sm sm:text-base text-stone-600 dark:text-slate-300 font-light leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  {step.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-700 dark:text-slate-200 font-medium">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* 6. Comparison: Factory Suits vs Modern Man Custom */}
      <section className="bg-white dark:bg-[#161722] py-16 sm:py-24 border-y border-stone-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Clear Difference
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy dark:text-white">
              Factory Made Suits vs Modern Man Custom
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-300 font-light leading-relaxed">
              Why our suits feel lighter, breathe better, and look cleaner from every angle.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#1E202B]">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-brand-navy text-white text-xs uppercase font-bold tracking-wider py-4 px-6 border-b border-brand-gold/30">
              <div className="md:col-span-3 text-brand-gold">Detail</div>
              <div className="md:col-span-4 text-slate-300 mt-2 md:mt-0">Standard Factory / Off-The-Rack</div>
              <div className="md:col-span-5 text-emerald-400 mt-2 md:mt-0">Modern Man Custom Tailoring</div>
            </div>

            <div className="divide-y divide-stone-100 dark:divide-slate-800 text-xs sm:text-sm">
              {comparison.map((item, cIdx) => (
                <div key={cIdx} className="grid grid-cols-1 md:grid-cols-12 p-6 gap-3 items-center hover:bg-stone-50/60 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="md:col-span-3 font-semibold text-stone-900 dark:text-white font-serif">
                    {item.feature}
                  </div>
                  <div className="md:col-span-4 text-stone-500 dark:text-slate-400 flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{item.factory}</span>
                  </div>
                  <div className="md:col-span-5 text-stone-800 dark:text-slate-200 font-medium flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{item.modernMan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7. Trust & Location Banner */}
      <section className="py-16 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-navy text-white rounded-3xl p-8 sm:p-12 border-2 border-brand-gold/40 shadow-xl space-y-8 relative overflow-hidden text-center sm:text-left">
          <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[11px] uppercase tracking-luxury text-brand-gold font-bold bg-white/10 px-3 py-1 rounded-full inline-block border border-brand-gold/30">
                Visit Us in Nairobi
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
                Ready to Experience a True Custom Fit?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed max-w-xl">
                Come by our workshop on Tubman Road. Feel the fabrics in your hands, share what kind of suit you have in mind, and let us take your measurements.
              </p>
              <div className="pt-2 text-xs text-brand-gold font-medium">
                Trust Mansion, 1st Floor, opposite City Market, Tubman Road, Nairobi
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <Link
                href="/book-appointment"
                className="w-full py-3.5 px-6 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all text-center shadow-gold flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Fitting Session</span>
              </Link>

              <a
                href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20book%20a%20fitting%20or%20ask%20a%20question%20about%20your%20suits."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs rounded transition-all text-center flex items-center justify-center space-x-2 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>WhatsApp: 0114 122 510</span>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
