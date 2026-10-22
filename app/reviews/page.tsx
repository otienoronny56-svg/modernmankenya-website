'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  Quote, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  ExternalLink,
  Filter,
  MessageSquare
} from 'lucide-react';

interface ReviewItem {
  id: string;
  client: string;
  title: string;
  city: string;
  category: 'weddings' | 'executive' | 'african' | 'black-tie';
  rating: number;
  date: string;
  commission: string;
  fabric: string;
  quote: string;
  fullReview: string;
  image: string;
  verified: boolean;
}

const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-01',
    client: 'Dr. David Ochieng',
    title: 'Groom & Neurosurgeon',
    city: 'Nairobi & Great Rift Valley',
    category: 'weddings',
    rating: 5,
    date: 'February 2026',
    commission: 'Bespoke Groom 3-Piece Tuxedo + 7 Groomsmen',
    fabric: 'English Barathea Wool & Hand-cut Satin Lapels',
    quote: 'For our wedding at the Great Rift Valley, they outfitted both myself and my groomsmen with millimetric precision.',
    fullReview:
      'Finding a tailoring house in Nairobi that understands modern silhouette proportions while maintaining traditional canvassing seemed impossible until I met the master cutters at Modern Man Kenya. The shoulders rested naturally without tension, and the bespoke gold paisley lining was pure opulence. The groomsmen suits were delivered three weeks ahead of schedule.',
    image: '/images/groomsmen-celebration-navy-vests-garden.jpeg',
    verified: true,
  },
  {
    id: 'rev-02',
    client: 'Ambassador K. Mwangi',
    title: 'Diplomatic Envoy & Collector',
    city: 'Nairobi & Geneva',
    category: 'executive',
    rating: 5,
    date: 'January 2026',
    commission: 'Two-Piece Midnight Navy Executive Suit',
    fabric: 'Super 140s Huddersfield Worsted Wool',
    quote: 'The level of craftsmanship at Modern Man Kenya is unmatched. The floating canvas feels like a second skin in the Nairobi climate.',
    fullReview:
      'I have had garments tailored on Savile Row and in Milan. Modern Man Kenya executes hand-stitched pick accents, horn button closures, and floating horsehair canvases at world-class standards right here in Nairobi. Their consultation at Trust Mansion was discreet, knowledgeable, and genuinely bespoke.',
    image: '/images/executive-portrait-silver-hair-navy-suit.jpeg',
    verified: true,
  },
  {
    id: 'rev-03',
    client: 'Hon. Nelson Kipkorir',
    title: 'Senior Advocate & Managing Partner',
    city: 'Nairobi (Upper Hill)',
    category: 'executive',
    rating: 5,
    date: 'March 2026',
    commission: 'Double-Breasted Courtroom & Boardroom Ensemble',
    fabric: 'Super 130s British Charcoal Twill',
    quote: 'In court and corporate arbitrations, presentation communicates authority before you even utter a word.',
    fullReview:
      'The drape of the trousers with side adjusters eliminates any need for belts, and the double-breasted jacket stays completely flat across the chest when moving. The team accommodated my tight litigation schedule for fittings with absolute grace.',
    image: '/images/advocate-legal-barrister-navy-1.jpeg',
    verified: true,
  },
  {
    id: 'rev-04',
    client: 'Brian & Vanessa Mutua',
    title: 'Ruracio / Traditional Wedding Celebrants',
    city: 'Machakos & Nairobi',
    category: 'african',
    rating: 5,
    date: 'December 2025',
    commission: 'Handcrafted Navy Agbada & Copper Embroidery',
    fabric: 'Heavy Weight Polish Cotton with Metallic Threading',
    quote: 'Our families were left in awe. The agbada combined ancestral nobility with contemporary tailored structure.',
    fullReview:
      'Traditional African garments are often either too bulky or lack structure. Modern Man Kenya drafted an engineered inner tunic that fit my shoulders like an Italian blazer while maintaining the sweeping grandeur of the outer agbada robe. The copper hand embroidery matched Vanessa’s gown flawlessly.',
    image: '/images/traditional-wedding-ruracio-groom-dance.jpeg',
    verified: true,
  },
  {
    id: 'rev-05',
    client: 'Marcus Vance',
    title: 'Managing Partner, Private Equity',
    city: 'London & Nairobi',
    category: 'black-tie',
    rating: 5,
    date: 'November 2025',
    commission: 'Black Tie Peak Lapel Tuxedo',
    fabric: '320g Holland & Sherry Pure Wool Barathea',
    quote: 'A rare sanctuary of true made-to-measure tailoring in East Africa. The balance and cloth quality is extraordinary.',
    fullReview:
      'Attending international charity galas across Europe and Africa requires black tie attire that stands up to close inspection. The grosgrain silk lapels and single-button stance crafted by Modern Man are exemplary. They have earned my ongoing commissions.',
    image: '/images/tuxedo-black-tie-classic.jpeg',
    verified: true,
  },
  {
    id: 'rev-06',
    client: 'Kiplagat Chepkwony',
    title: 'Corporate Executive & State Gala Guest',
    city: 'Eldoret & Nairobi',
    category: 'african',
    rating: 5,
    date: 'October 2025',
    commission: 'Royal Purple Senator / Kaunda Suit',
    fabric: 'Structured Tropical Wool-Silk Blend',
    quote: 'The Kaunda suit reimagined for modern power dressing. Impeccable shoulder drape and custom brass accents.',
    fullReview:
      'The Modern Man team has restored the Kaunda suit to its rightful stature as the definitive African executive uniform. The hidden placket, Mandarin collar height, and tailored trousers draw compliments every time I wear it to state and commercial functions.',
    image: '/images/kaunda-safari-purple-suit-1.jpeg',
    verified: true,
  },
  {
    id: 'rev-07',
    client: 'Anthony Githae',
    title: 'Tech Founder & Keynote Speaker',
    city: 'Nairobi & San Francisco',
    category: 'executive',
    rating: 5,
    date: 'September 2025',
    commission: 'Olive Sage 3-Piece Autumn Wool Suit',
    fabric: 'Super 120s Sage Green Fine Worsted Wool',
    quote: 'They understood exactly how to make a suit that looks modern and dynamic on international stages.',
    fullReview:
      'I did not want a boring black or grey corporate suit for my international tech summits. Modern Man Kenya recommended an earthy olive sage three-piece with a scoop waistcoat. The fit is razor-sharp yet exceptionally comfortable during long conference days.',
    image: '/images/three-piece-suit-olive-sage.jpeg',
    verified: true,
  },
  {
    id: 'rev-08',
    client: 'Dennis & Nicole Kariuki',
    title: 'Destination Wedding Groomsmen Party',
    city: 'Diani Beach & Nairobi',
    category: 'weddings',
    rating: 5,
    date: 'August 2025',
    commission: 'Sky Blue Shawl Collar Tuxedo Ensemble',
    fabric: 'Lightweight Tropical Worsted Wool & Black Satin Trim',
    quote: 'Lightweight, breathable, and breathtaking in coastal wedding photography.',
    fullReview:
      'Diani’s tropical humidity can ruin poorly constructed suits. Modern Man Kenya built our wedding party suits using lightweight tropical wool that breathed effortlessly while maintaining crisp chest canvas rigidity under the coastal heat.',
    image: '/images/tuxedo-sky-blue-wedding.jpeg',
    verified: true,
  },
];

export default function ReviewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredReviews = selectedCategory === 'all' 
    ? REVIEWS_DATA 
    : REVIEWS_DATA.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-brand-canvas-alt">
      
      {/* 1. Header Banner */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 relative overflow-hidden border-b border-brand-gold/30">
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-xs uppercase tracking-luxury font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Patron Testimonials</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Words of Distinction
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
            From boardroom arbitrations in Upper Hill to destination weddings in the Rift Valley and international galas, read how discerning gentlemen experience Modern Man Kenya tailoring.
          </p>

          {/* Social Proof Stats Banner */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center border-t border-white/10 mt-6">
            <div className="p-3">
              <div className="flex items-center justify-center space-x-1 text-brand-gold text-lg sm:text-xl font-bold">
                <span>5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1">Google Rating</p>
            </div>

            <div className="p-3">
              <p className="text-brand-gold text-lg sm:text-xl font-bold font-serif">180+</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1">Groom Ensembles</p>
            </div>

            <div className="p-3">
              <p className="text-brand-gold text-lg sm:text-xl font-bold font-serif">100%</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1">Floating Canvas</p>
            </div>

            <div className="p-3">
              <p className="text-brand-gold text-lg sm:text-xl font-bold font-serif">Nairobi</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1">Tubman Road Flagship</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter Tabs */}
      <section className="sticky top-[58px] sm:top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="hidden sm:inline-flex items-center space-x-1.5 text-stone-500 font-bold uppercase tracking-wider mr-2 text-[11px]">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>

            {[
              { id: 'all', label: 'All Reviews' },
              { id: 'weddings', label: 'Weddings & Grooms' },
              { id: 'executive', label: 'Executive & Boardroom' },
              { id: 'african', label: 'African & Kaunda Suits' },
              { id: 'black-tie', label: 'Black Tie & Tuxedos' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-brand-navy text-brand-gold font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredReviews.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              {/* Garment / Client Image */}
              <div className="relative w-full md:w-5/12 aspect-[4/5] md:aspect-auto flex-shrink-0 bg-stone-900 overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.client} wearing Modern Man Kenya`}
                  fill
                  sizes="(max-width: 768px) 100vw, 350px"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent md:hidden" />
                <div className="absolute bottom-3 left-3 text-white text-[11px] font-mono bg-black/60 backdrop-blur-md px-2 py-0.5 rounded md:hidden">
                  {item.commission}
                </div>
              </div>

              {/* Review Content */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-3">
                  {/* Rating Stars & Verification */}
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {item.verified && (
                      <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Commission</span>
                      </span>
                    )}
                  </div>

                  {/* Highlight Quote */}
                  <div className="relative">
                    <Quote className="w-6 h-6 text-brand-gold/30 absolute -top-2 -left-1" />
                    <p className="font-serif text-base sm:text-lg font-bold text-brand-navy pl-6 italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Full Story */}
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                    {item.fullReview}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div>
                    <p className="font-serif font-bold text-sm text-brand-navy">
                      {item.client}
                    </p>
                    <p className="text-stone-500 text-[11px]">
                      {item.title} • {item.city}
                    </p>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded text-[11px] text-stone-600 space-y-1">
                    <p>
                      <strong className="text-brand-navy font-semibold">Commission:</strong> {item.commission}
                    </p>
                    <p>
                      <strong className="text-brand-navy font-semibold">Cloth:</strong> {item.fabric}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Action Banner: Leave a Review & Book Appointment */}
        <div className="mt-16 bg-white rounded-2xl border border-brand-gold/30 p-8 sm:p-12 shadow-md text-center max-w-4xl mx-auto space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-luxury text-brand-gold font-bold">
              Experience the Craft
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy">
              Ready to Commission Your Own Silhouette?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Join over 180 discerning gentlemen across Kenya, the African diaspora, and international capitals who trust Modern Man Kenya for their crowning occasions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/book-appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-luxury text-xs shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Schedule Private Fitting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/254114122510?text=Hello%20Modern%20Man%20Kenya%2C%20I%20would%20like%20to%20share%20my%20fitting%20review%20and%20photos."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded border border-brand-gold/60 text-brand-navy hover:bg-brand-canvas text-xs font-bold uppercase tracking-luxury transition-all"
            >
              <MessageSquare className="w-4 h-4 text-brand-gold" />
              <span>Share Your Fitting Review</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
