'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Tag, 
  Share2, 
  Check, 
  X,
  ChevronRight
} from 'lucide-react';

interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: 'Style Guides' | 'Craftsmanship' | 'Weddings' | 'Heritage';
  readTime: string;
  publishedDate: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

const ARTICLES: JournalArticle[] = [
  {
    id: 'art-01',
    slug: 'anatomy-of-modern-tuxedo',
    title: 'The Anatomy of a Modern Tuxedo: Velvet Shawl vs. Wool Peak Lapel',
    subtitle: 'Navigating Black Tie Dress Codes with Sartorial Authority',
    category: 'Style Guides',
    readTime: '5 min read',
    publishedDate: 'March 2026',
    coverImage: '/images/tuxedo-black-tie-classic.jpeg',
    excerpt: 'Understanding the nuanced distinction between the traditional midnight Barathea wool peak lapel and the opulent silk-velvet shawl collar for evening galas.',
    content: [
      'Black tie remains the pinnacle of formal eveningwear for the discerning modern gentleman. While contemporary trends periodically test boundaries, the fundamentals of the tuxedo are governed by strict proportions that elevate posture and presence.',
      'The Peak Lapel Tuxedo is rooted in British formal tailoring. Its sweeping upward lapels visually broaden the chest and accentuate the shoulders, creating an athletic V-taper. Paired with pure wool Barathea (typically 280g–320g from Yorkshire mills) and trimmed with silk grosgrain or satin, the peak lapel commands undisputed authority at corporate galas and formal dinners.',
      'Conversely, the Velvet Shawl Collar Smoking Jacket exudes relaxed opulence. Originating from Victorian smoking parlours, rich cotton velvet absorbs ambient light differently than flat wool, offering deep jewel tones—such as midnight emerald or deep burgundy—that photograph with extraordinary texture.',
      'Key Rule of Thumb: For strictly traditional state banquets, white-tie galas, or diplomatic protocols, choose the wool peak lapel in midnight navy (which looks darker and richer than pure black under artificial evening lights). For weddings, charity balls, and celebratory galas, the velvet shawl collar provides distinctive aristocratic charisma.'
    ],
    keyTakeaways: [
      'Midnight navy appears richer and darker than black under artificial ballroom lighting.',
      'Peak lapels widen the chest line, whereas shawl collars soften the shoulder transition.',
      'Never wear a belt with a tuxedo; use side adjusters or silk braces to maintain a flush waistline.'
    ]
  },
  {
    id: 'art-02',
    slug: 'floating-canvas-vs-fused-suits',
    title: 'Floating Canvas vs. Fused Construction: Why True Tailoring Shapes to Your Anatomy',
    subtitle: 'The Invisible Engineering That Separates Bespoke from Mass Production',
    category: 'Craftsmanship',
    readTime: '6 min read',
    publishedDate: 'February 2026',
    coverImage: '/images/three-piece-suit-blue.jpeg',
    excerpt: 'Inside the jacket: how natural horsehair canvas breathes, flexes, and creates a living three-dimensional mold of your chest over years of wear.',
    content: [
      'The most critical component of a luxury suit is one you will never visibly see from the outside: the internal chest canvas. In off-the-rack and budget commercial suits, outer cloth is bonded directly to synthetic glue interlinings using heat presses—a process known as fusing.',
      'While fused suits may look crisp on a hanger in a department store, glue restricts air permeability and stiffens unnaturally against the body. More detrimentally, dry-cleaning solvents gradually dissolve the adhesive, creating unsightly bubbles and permanent ripples across the chest.',
      'At Modern Man Kenya, every bespoke suit is engineered with a Full Floating Horsehair Canvas. Floating canvas consists of woven horsehair and wool pad-stitched by hand between the outer suiting cloth and silk interior lining. Because the canvas is suspended rather than glued, it shifts fluidly with your body.',
      'Over successive wears, body heat and natural moisture allow the horsehair fibers to mold permanently to the contours of your chest, shoulders, and posture. The jacket fits significantly better in year five than it did on day one.'
    ],
    keyTakeaways: [
      'Floating horsehair canvas breathes naturally in tropical and equatorial climates.',
      'Fused glue suits blister and bubble after repeated dry cleaning sessions.',
      'A canvassed jacket creates a three-dimensional rolling lapel that can never be pressed flat.'
    ]
  },
  {
    id: 'art-03',
    slug: 'resurgence-of-the-kaunda-suit',
    title: 'The Contemporary Kaunda Suit: Reclaiming African Sartorial Power Dressing',
    subtitle: 'How Modern Cutters Transformed a Post-Colonial Icon into a Luxury Staple',
    category: 'Heritage',
    readTime: '4 min read',
    publishedDate: 'January 2026',
    coverImage: '/images/kaunda-safari-purple-suit-1.jpeg',
    excerpt: 'From Kenneth Kaunda’s pan-African liberation uniform to modern executive boardrooms, discover the architectural reinvention of the safari/senator suit.',
    content: [
      'The Kaunda suit—known regionally across the continent as the Safari suit or Senator style—holds a storied position in African political history. Named after Zambia’s founding president Kenneth Kaunda, it was originally adopted as a rejection of Western formal neckwear in favor of climate-appropriate dignity.',
      'In recent years, African statesmen, entrepreneurs, and creatives have led a major sartorial resurgence of the silhouette. However, the vintage Kaunda suit often suffered from stiff synthetic polyesters, boxy sleeves, and utilitarian pocket flap configurations.',
      'Modern Man Kenya has completely re-engineered the Kaunda suit for the 21st-century leader. We construct the silhouette using high-twist tropical wools, lightweight silk-linen blends, and architectural shoulder pad structures borrowed from Italian Neapolitan tailoring.',
      'With sleek hidden button plackets, structured Mandarin collars, and bespoke hand-embossed brass hardware, the modern Kaunda suit has taken its rightful place alongside the three-piece suit in Nairobi’s highest executive chambers.'
    ],
    keyTakeaways: [
      'Modern Kaunda suits replace boxy vintage cuts with tapered Italian-inspired torso drapes.',
      'Mandarin collar heights must be proportioned strictly to the wearer’s neck length.',
      'Super 110s and 120s tropical wools eliminate synthetic heat retention while staying wrinkle-resistant.'
    ]
  },
  {
    id: 'art-04',
    slug: 'groom-bespoke-wedding-timeline',
    title: 'The Master Groom Timeline: When to Begin Your Bespoke Wedding Commissions',
    subtitle: 'A Step-by-Step Guide to Coordinating Wedding Ensembles Without Stress',
    category: 'Weddings',
    readTime: '5 min read',
    publishedDate: 'December 2025',
    coverImage: '/images/groomsmen-celebration-navy-vests-garden.jpeg',
    excerpt: 'An essential timeline for grooms and wedding parties to ensure imported mills, baste fittings, and groomsmen deliveries happen flawlessly.',
    content: [
      'A bespoke wedding suit is not a transaction—it is an artisanal journey requiring deliberate pacing. While ready-to-wear alterations can be executed in days, true bespoke construction from raw cloth requires between 6 to 10 weeks to achieve millimetric excellence.',
      'Step 1: 10 to 12 Weeks Out — The Style & Mill Consultation. This is where the groom meets our head stylist at Trust Mansion to review venue conditions, floral palettes, and gown colors. Fabric bolts are selected from international mills (Scabal, Huddersfield, Holland & Sherry) and ordered for courier arrival.',
      'Step 2: 6 to 8 Weeks Out — The Baste Fitting. The garment is assembled using temporary white basting thread without linings or pockets. This allows our master cutter to sculpt the shoulders, refine chest drape, and set sleeve pitch directly against your anatomy.',
      'Step 3: 3 to 4 Weeks Out — Groomsmen Measurements. Synchronizing 4 to 8 groomsmen across different physical builds requires precise standardization. We take 24 individual measurements for each member to ensure identical sleeve lengths and trouser break levels in photography.',
      'Step 4: 10 Days Out — Final Handover & Pressing. The completed garments are tried on one final time, steam-pressed with industrial irons, and packed in breathable cedar wood garment bags ready for the big day.'
    ],
    keyTakeaways: [
      'Begin your custom wedding suit consultation at least 8 to 12 weeks before the wedding date.',
      'The baste fitting is non-negotiable for achieving a flawless shoulder and lapel balance.',
      'Ensure all groomsmen are fitted simultaneously to guarantee consistent cloth dye-lot matching.'
    ]
  },
];

export default function JournalPage() {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Style Guides', 'Craftsmanship', 'Weddings', 'Heritage'];

  const filteredArticles = selectedTag === 'All'
    ? ARTICLES
    : ARTICLES.filter((art) => art.category === selectedTag);

  const handleShare = (article: JournalArticle) => {
    if (typeof window !== 'undefined') {
      const shareUrl = `${window.location.origin}/journal#${article.slug}`;
      navigator.clipboard.writeText(shareUrl);
      setCopiedSlug(article.slug);
      setTimeout(() => setCopiedSlug(null), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-brand-canvas-alt">
      
      {/* 1. Grand Editorial Hero */}
      <section className="bg-brand-navy text-white py-16 sm:py-24 relative overflow-hidden border-b border-brand-gold/30">
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-brand-gold/20 text-brand-gold border border-brand-gold/40 text-xs uppercase tracking-luxury font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Modern Man Kenya Journal</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Sartorial Notes &amp; The Craft
          </h1>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm md:text-base text-slate-300 font-light leading-relaxed">
            Essential guides on fabric mills, silhouette architecture, black tie etiquette, and the modern revival of African executive dressing.
          </p>
        </div>
      </section>

      {/* 2. Category Navigation */}
      <section className="sticky top-[58px] sm:top-[64px] z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
            <span className="text-stone-400 font-bold uppercase tracking-wider text-[11px] mr-2 hidden sm:inline">
              Topic:
            </span>
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-brand-navy text-brand-gold font-bold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Articles Editorial Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setActiveArticle(article)}
            >
              {/* Cover Image Container */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-stone-900">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4 bg-brand-navy/90 backdrop-blur-md text-brand-gold text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border border-brand-gold/30">
                  {article.category}
                </div>

                {/* Read Time & Date */}
                <div className="absolute bottom-3 left-4 flex items-center space-x-3 text-white text-xs">
                  <span className="flex items-center space-x-1 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{article.readTime}</span>
                  </span>
                  <span>•</span>
                  <span className="font-mono text-[11px] text-slate-300">
                    {article.publishedDate}
                  </span>
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy group-hover:text-brand-gold transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="text-xs text-stone-500 font-mono">
                    {article.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed line-clamp-3 pt-1">
                    {article.excerpt}
                  </p>
                </div>

                {/* Bottom Trigger Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-navy group-hover:text-brand-gold flex items-center space-x-1 uppercase tracking-wider">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(article);
                    }}
                    className="p-1.5 text-stone-400 hover:text-brand-navy transition-colors rounded-full hover:bg-stone-100"
                    title="Copy Article Link"
                  >
                    {copiedSlug === article.slug ? (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center space-x-1">
                        <Check className="w-3 h-3" />
                        <span>Copied</span>
                      </span>
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Consultation CTA */}
        <div className="mt-16 bg-white rounded-2xl border border-brand-gold/30 p-8 sm:p-12 shadow-md text-center max-w-4xl mx-auto space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] uppercase tracking-luxury text-brand-gold font-bold">
              Private Sartorial Consultation
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-brand-navy">
              Have Questions on Cloth, Cut or Dress Codes?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              Book a one-on-one session at our Nairobi atelier to touch fabric swatches from Huddersfield, Scabal, and Dormeuil with a master cutter.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/book-appointment"
              className="inline-flex items-center space-x-2 px-7 py-3.5 rounded bg-brand-navy hover:bg-brand-navy-light text-white font-bold uppercase tracking-luxury text-xs shadow-md transition-all"
            >
              <Calendar className="w-4 h-4 text-brand-gold" />
              <span>Schedule Atelier Fitting</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Full Article Reading Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-slate-200 my-8">
            
            {/* Modal Header Bar */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-stone-50">
              <div className="flex items-center space-x-2 text-xs">
                <span className="bg-brand-navy text-brand-gold font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded">
                  {activeArticle.category}
                </span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-600 font-mono text-[11px]">{activeArticle.readTime}</span>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-stone-900">
              <Image
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-10 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy mb-2">
                  {activeArticle.title}
                </h2>
                <p className="text-xs font-mono text-brand-gold uppercase tracking-wider">
                  {activeArticle.subtitle} • {activeArticle.publishedDate}
                </p>
              </div>

              {/* Key Takeaways Callout Box */}
              <div className="bg-brand-canvas p-4 sm:p-5 rounded-xl border border-brand-gold/40 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-navy flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Key Sartorial Principles</span>
                </p>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {activeArticle.keyTakeaways.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-brand-gold font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Article Paragraphs */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Footer Modal CTA */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/book-appointment"
                  onClick={() => setActiveArticle(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded bg-brand-navy hover:bg-brand-navy-light text-white text-xs font-bold uppercase tracking-wider"
                >
                  <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                  <span>Commission This Style</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleShare(activeArticle)}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-3 rounded border border-stone-200 hover:bg-stone-50 text-xs text-stone-700 font-medium"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedSlug === activeArticle.slug ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
