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
  BookmarkCheck,
  ArrowRight
} from 'lucide-react';

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
      image: '/images/traditional-bespoke-cream-groomsmen-cane.jpeg',
      alt: 'Tailored by Modern Man signature sleeve detailing',
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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800">
      
      {/* Hero Section */}
      <section className="relative bg-brand-navy text-white py-20 sm:py-24 border-b-2 border-brand-gold/30 overflow-hidden">
        <div className="absolute inset-0 sartorial-pinstripe opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-brand-gold text-xs uppercase tracking-luxury font-semibold border border-brand-gold/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>How We Make Your Suit</span>
          </div>
          
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Crafted to Fit Your Body, Not a Shelf
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Simple, honest tailoring. From 35 individual body measurements to our floating chest canvas and hand-finished details, here is how we build a suit you will feel confident wearing anywhere.
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
              href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20learn%20more%20about%20how%20you%20make%20suits."
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

      {/* Step by Step Walkthrough */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-24">
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
                <div className="relative h-[340px] sm:h-[420px] rounded-2xl overflow-hidden shadow-luxury border-2 border-stone-200 group bg-stone-100">
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

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-navy leading-snug">
                  {step.title}
                </h2>

                <p className="text-xs sm:text-sm font-medium text-stone-500 uppercase tracking-wider">
                  {step.tagline}
                </p>

                <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                  {step.description}
                </p>

                <div className="pt-2 space-y-2.5">
                  {step.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-stone-700 font-medium">
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

      {/* Comparison: Factory Suits vs Modern Man Custom */}
      <section className="bg-white py-16 sm:py-24 border-y border-stone-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
              Clear Difference
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy">
              Factory Made Suits vs Modern Man Custom
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Why our suits feel lighter, breathe better, and look cleaner from every angle.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 bg-brand-navy text-white text-xs uppercase font-bold tracking-wider py-4 px-6 border-b border-brand-gold/30">
              <div className="md:col-span-3 text-brand-gold">Detail</div>
              <div className="md:col-span-4 text-slate-300 mt-2 md:mt-0">Standard Factory / Off-The-Rack</div>
              <div className="md:col-span-5 text-emerald-400 mt-2 md:mt-0">Modern Man Custom Tailoring</div>
            </div>

            <div className="divide-y divide-stone-100 text-xs sm:text-sm">
              {comparison.map((item, cIdx) => (
                <div key={cIdx} className="grid grid-cols-1 md:grid-cols-12 p-6 gap-3 items-center hover:bg-stone-50/60 transition-colors">
                  <div className="md:col-span-3 font-semibold text-stone-900 font-serif">
                    {item.feature}
                  </div>
                  <div className="md:col-span-4 text-stone-500 flex items-start space-x-2">
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <span>{item.factory}</span>
                  </div>
                  <div className="md:col-span-5 text-stone-800 font-medium flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item.modernMan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Location Banner */}
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
