/**
 * OCCASIONS DATA REGISTRY
 * 
 * 1. Executive wear
 *    - Official suit
 *    - Smart Casual
 * 
 * 2. Black Tie & Wedding
 *    - Official
 *    - Tuxedo
 *    - Kaunda
 * 
 * 3. African wear
 *    - Kaftan
 *    - Agbada
 *    - Tuxedo
 *    - Safari / Kaunda suit
 * 
 * Simple English: 1 to 2 words per name, no complex British wording.
 */

export interface OccasionHighlight {
  src: string;
  label: string; // 1 to 2 words (e.g. "Navy Suit", "Ivory Tuxedo")
  tag: string;   // 1 to 2 words (e.g. "Official Suit", "Tuxedo")
  subCategory: string;
  aspect?: 'square' | 'portrait' | 'landscape';
}

export interface OccasionSubCategory {
  id: string;
  slug: string;
  title: string;       // 1 to 3 words
  description: string; // 1 to 3 words
  heroImage: string;
  count: number;
}

export interface OccasionCategoryData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  heroImage: string;
  tagline: string;
  heroPills: string[];
  craftSpecs: { label: string; value: string }[];
  subCategories: OccasionSubCategory[];
  highlights: OccasionHighlight[];
  galleryImages: OccasionHighlight[];
}

export const OCCASIONS_DATA: Record<string, OccasionCategoryData> = {
  // ==========================================
  // 1. EXECUTIVE WEAR
  // ==========================================
  'executive-wear': {
    id: 'executive-wear',
    slug: 'executive-wear',
    title: 'Executive Wear',
    shortTitle: 'Executive',
    badge: 'Executive',
    heroImage: '/images/MOK_7716.jpg',
    tagline: 'Office & Boardroom',
    heroPills: [
      'Custom Fit',
      'Pure Wool',
      'Perfect Cut',
      'Crease Free',
    ],
    craftSpecs: [
      { label: 'Style', value: 'Custom Made' },
      { label: 'Fabric', value: 'Fine Wool' },
      { label: 'Fittings', value: '3 Sessions' },
    ],
    subCategories: [
      {
        id: 'official-suit',
        slug: 'official-suit',
        title: 'Official Suit',
        description: '2 & 3-Piece Suits',
        heroImage: '/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg',
        count: 14,
      },
      {
        id: 'smart-casual',
        slug: 'smart-casual',
        title: 'Smart Casual',
        description: 'Blazers & Jackets',
        heroImage: '/images/more/WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg',
        count: 8,
      },
    ],
    highlights: [
      {
        src: '/images/three-piece-suit-blue.jpeg',
        label: 'Royal Blue 3-Piece',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/executive-three-piece-navy-ivory-waistcoat.jpeg',
        label: 'Navy & Ivory Vest',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/smart-casual-beige-blazer-parking.jpeg',
        label: 'Beige Blazer',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'portrait',
      },
      {
        src: '/images/double-breasted-suit-navy.jpeg',
        label: 'Double Breasted',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/advocate-legal-barrister-navy-1.jpeg',
        label: 'Advocate Attire',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/bespoke-trousers-gurkha-side-adjusters.jpeg',
        label: 'Gurkha Trousers',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
    ],
    galleryImages: [
      // Official Suit
      {
        src: '/images/three-piece-suit-blue.jpeg',
        label: 'Royal Blue 3-Piece',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/two-piece-suit-blue.jpeg',
        label: 'Royal Blue 2-Piece',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/three-piece-vest-look.jpeg',
        label: 'Waistcoat Drape',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/three-piece-suit-olive-sage.jpeg',
        label: 'Olive Sage 3-Piece',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/two-piece-suit-ocean-blue-rooftop.jpeg',
        label: 'Ocean Blue Suit',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/executive-three-piece-navy-ivory-waistcoat.jpeg',
        label: 'Navy & Ivory Vest',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/double-breasted-suit-navy.jpeg',
        label: 'Navy Double Breasted',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/advocate-legal-barrister-navy-1.jpeg',
        label: 'Advocate Court Wear',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/advocate-legal-barrister-navy-2.jpeg',
        label: 'Legal Robe Silhouette',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/bespoke-trousers-gurkha-side-adjusters.jpeg',
        label: 'Gurkha Trousers Detail',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/executive-portrait-silver-hair-navy-suit.jpeg',
        label: 'Distinguished Executive',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_7655.jpg',
        label: 'Blue Suit',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_7660.jpg',
        label: 'Pinstripe Suit',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_7662.jpg',
        label: 'Grey 3-Piece',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg',
        label: 'Charcoal Suit',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.12 PM.jpeg',
        label: 'Navy 3-Piece',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM.jpeg',
        label: 'Navy Stripe',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM (1).jpeg',
        label: 'Classic Pinstripe',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM.jpeg',
        label: 'Double Breasted',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.24 PM.jpeg',
        label: 'Check Suit',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.19 PM.jpeg',
        label: 'Navy Suit',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM.jpeg',
        label: 'Classic Navy',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.12 PM.jpeg',
        label: 'Tailored Navy',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/slide.jpeg',
        label: 'Sleeve Detail',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.41.30 PM.jpeg',
        label: 'Fitting Session',
        tag: 'Official Suit',
        subCategory: 'official-suit',
        aspect: 'landscape',
      },

      // Smart Casual
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg',
        label: 'Beige Blazer',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.51.00 PM.jpeg',
        label: 'Navy Blazer',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.13 PM.jpeg',
        label: 'Blue Casual',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM (1).jpeg',
        label: 'Royal Blazer',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM.jpeg',
        label: 'Red Blazer',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (2).jpeg',
        label: 'Check Suit',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'square',
      },
      {
        src: '/images/Blazer.jpg',
        label: 'Double Breasted',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.56 PM.jpeg',
        label: 'City Suit',
        tag: 'Smart Casual',
        subCategory: 'smart-casual',
        aspect: 'portrait',
      },
    ],
  },

  // ==========================================
  // 2. BLACK TIE & WEDDING
  // ==========================================
  'black-tie-wedding': {
    id: 'black-tie-wedding',
    slug: 'black-tie-wedding',
    title: 'Black Tie & Wedding',
    shortTitle: 'Wedding & Black Tie',
    badge: 'Weddings',
    heroImage: '/images/wedding-groom-white-tuxedo-groomsmen-beige.jpeg',
    tagline: 'Weddings & Dinners',
    heroPills: [
      'Groom Sets',
      'Groomsmen Sets',
      'Silk Lapels',
      'Velvet Suits',
    ],
    craftSpecs: [
      { label: 'Event', value: 'Wedding & Gala' },
      { label: 'Lapels', value: 'Silk Satin' },
      { label: 'Lead Time', value: '4 Weeks' },
    ],
    subCategories: [
      {
        id: 'official',
        slug: 'official',
        title: 'Official',
        description: 'Wedding Suits',
        heroImage: '/images/wedding-groom-white-tuxedo-groomsmen-beige.jpeg',
        count: 15,
      },
      {
        id: 'tuxedo',
        slug: 'tuxedo',
        title: 'Tuxedo',
        description: 'Dinner Jackets',
        heroImage: '/images/DSC09238.jpg.jpeg',
        count: 28,
      },
      {
        id: 'kaunda',
        slug: 'kaunda',
        title: 'Kaunda',
        description: 'Wedding Kaunda',
        heroImage: '/images/kaunda-safari-purple-suit-1.jpeg',
        count: 8,
      },
    ],
    highlights: [
      {
        src: '/images/DSC09233.jpg.jpeg',
        label: 'Sartorial Stride',
        tag: 'Black Tie',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/IMG-142.jpg.jpeg',
        label: 'Embroidered Shawl',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC_0865-1.jpg.jpeg',
        label: 'Cognac Groomsmen',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'landscape',
      },
      {
        src: '/images/wedding-groom-white-tuxedo-groomsmen-beige.jpeg',
        label: 'White Tuxedo Groom',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-black-tie-classic.jpeg',
        label: 'Black Tie Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/wedding-groom-ivory-gold-embroidered-bride.jpeg',
        label: 'Ivory Gold Groom',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-navy-shawl-red-vest.jpeg',
        label: 'Navy Shawl Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-sky-blue-wedding.jpeg',
        label: 'Sky Blue Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-velvet-burgundy.jpeg',
        label: 'Burgundy Velvet',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
    ],
    galleryImages: [
      // Official (Wedding)
      {
        src: '/images/DSC_0865-1.jpg.jpeg',
        label: 'Cognac Groomsmen',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'landscape',
      },
      {
        src: '/images/wedding-groom-white-tuxedo-groomsmen-beige.jpeg',
        label: 'Groom & Groomsmen Party',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/wedding-groom-ivory-gold-embroidered-bride.jpeg',
        label: 'Bespoke Groom & Bride',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/groomsmen-champagne-courtyard-circle.jpeg',
        label: 'Champagne Groomsmen Circle',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/groomsmen-celebration-navy-vests-garden.jpeg',
        label: 'Garden Groomsmen Celebration',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'landscape',
      },
      {
        src: '/images/wedding-entourage-light-grey-suits-bride.jpeg',
        label: 'Light Grey Entourage with Bride',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'square',
      },
      {
        src: '/images/tuxedo-ivory-black-velvet-entourage.jpeg',
        label: 'Velvet Black Tie Entourage',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-black-tie-classic.jpeg',
        label: 'Classic Satin Peak Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-navy-shawl-red-vest.jpeg',
        label: 'Navy Shawl & Crimson Vest',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-sky-blue-wedding.jpeg',
        label: 'Sky Blue Celebration Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo-velvet-burgundy.jpeg',
        label: 'Burgundy Velvet Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.14 PM.jpeg',
        label: 'Groomsmen Party',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM (1).jpeg',
        label: 'Aisle Entrance',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM (1).jpeg',
        label: 'Tan Suit',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.54 PM.jpeg',
        label: 'Wedding Couple',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM.jpeg',
        label: 'Wedding Party',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.52 PM (1).jpeg',
        label: 'Groomsmen Lineup',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.52 PM.jpeg',
        label: 'Garden Wedding',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'landscape',
      },
      {
        src: '/images/DSC04995.jpg',
        label: 'Groom 3-Piece',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC05022.jpg',
        label: 'Reception Walk',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.51.08 PM.jpeg',
        label: 'Toast Moment',
        tag: 'Official',
        subCategory: 'official',
        aspect: 'portrait',
      },

      // Tuxedo
      {
        src: '/images/tuxedo.jpeg',
        label: 'Ivory Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg',
        label: 'Double Breasted',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.59 PM.jpeg',
        label: 'Ivory Jacket',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg',
        label: 'Burgundy Velvet',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.22 PM.jpeg',
        label: 'Black Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (1).jpeg',
        label: 'Navy Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM (1).jpeg',
        label: 'Cream Dinner',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM.jpeg',
        label: 'Evening Vest',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },
      {
        src: '/images/MOK_2101.jpg',
        label: 'Classic Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2154.jpg',
        label: 'Green Velvet',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2219.jpg',
        label: 'Velvet Smoking',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2204.jpg',
        label: 'Houndstooth Set',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC09202.jpg.jpeg',
        label: 'Gala Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC09216.jpg.jpeg',
        label: 'Grand Entrance',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC09233.jpg.jpeg',
        label: 'Sartorial Stride',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC09238.jpg.jpeg',
        label: 'Lapel Craft',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC09241.jpg.jpeg',
        label: 'Regal Poise',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC09238.jpg.jpeg',
        label: 'Scarlet Lapel Tuxedo',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/IMG-142.jpg.jpeg',
        label: 'Embroidered Shawl',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/IMG-143.jpg.jpeg',
        label: 'Midnight Sovereign',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/IMG-145.jpg.jpeg',
        label: 'Double Vest',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/IMG-146.jpg.jpeg',
        label: 'Jacquard Draped',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },

      // Kaunda (Wedding)
      {
        src: '/images/kaunda suit.jpeg',
        label: 'Cream Kaunda',
        tag: 'Kaunda',
        subCategory: 'kaunda',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg',
        label: 'Wedding Entourage',
        tag: 'Kaunda',
        subCategory: 'kaunda',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg',
        label: 'Traditional Groom',
        tag: 'Kaunda',
        subCategory: 'kaunda',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.28 PM.jpeg',
        label: 'Wedding Couple',
        tag: 'Kaunda',
        subCategory: 'kaunda',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (1).jpeg',
        label: 'White Senator',
        tag: 'Kaunda',
        subCategory: 'kaunda',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.46 PM.jpeg',
        label: 'Couple Portrait',
        tag: 'Kaunda',
        subCategory: 'kaunda',
        aspect: 'portrait',
      },
    ],
  },

  // ==========================================
  // 3. AFRICAN WEAR
  // ==========================================
  'african-wear': {
    id: 'african-wear',
    slug: 'african-wear',
    title: 'African Wear',
    shortTitle: 'African Wear',
    badge: 'African Wear',
    heroImage: '/images/WhatsApp Image 2026-10-21 at 10.48.42 AM.jpeg',
    tagline: 'Traditional & Modern',
    heroPills: [
      'Custom Kaftans',
      'Grand Agbada',
      'African Tuxedos',
      'Safari Suits',
    ],
    craftSpecs: [
      { label: 'Heritage', value: 'African' },
      { label: 'Occasions', value: 'Ruracio & Dowry' },
      { label: 'Details', value: 'Ankara Trims' },
    ],
    subCategories: [
      {
        id: 'kaftan',
        slug: 'kaftan',
        title: 'Kaftan',
        description: 'Simple & Elegant',
        heroImage: '/images/kaftan-groomsmen-entourage-green.jpeg',
        count: 13,
      },
      {
        id: 'agbada',
        slug: 'agbada',
        title: 'Agbada',
        description: 'Grand Traditional',
        heroImage: '/images/agbada-navy-copper-embroidery.jpeg',
        count: 15,
      },
      {
        id: 'tuxedo',
        slug: 'tuxedo',
        title: 'Tuxedo',
        description: 'African Print',
        heroImage: '/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg',
        count: 5,
      },
      {
        id: 'safari-kaunda-suit',
        slug: 'safari-kaunda-suit',
        title: 'Safari / Kaunda Suit',
        description: 'Senator Suits',
        heroImage: '/images/kaunda-safari-purple-suit-1.jpeg',
        count: 10,
      },
    ],
    highlights: [
      {
        src: '/images/DSC_2606.jpg.jpeg',
        label: 'Navy Brocade',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-navy-copper-embroidery.jpeg',
        label: 'Navy Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/traditional-wedding-ruracio-groom-dance.jpeg',
        label: 'Ruracio Groom',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/traditional-wedding-ruracio-groom-gold-bride.jpeg',
        label: 'Gold Heritage Couple',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/traditional-bespoke-cream-groomsmen-cane.jpeg',
        label: 'Cream Bespoke Suit',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/kaunda-safari-purple-suit-1.jpeg',
        label: 'Purple Kaunda Suit',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/kaftan-groomsmen-entourage-green.jpeg',
        label: 'Kaftan Entourage',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
    ],
    galleryImages: [
      // Kaftan
      {
        src: '/images/DSC_2606.jpg.jpeg',
        label: 'Navy Brocade Kaftan',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/kaftan-groomsmen-entourage-green.jpeg',
        label: 'Emerald Kaftan Entourage',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/kaftan-groomsmen-group-2.jpeg',
        label: 'Groomsmen Kaftan Lineup',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/kaftan-groomsmen-group-3.jpeg',
        label: 'Ceremony Kaftan Ensemble',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/kaftan-groomsmen-group-4.jpeg',
        label: 'Heritage Kaftan Party',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/traditional-wedding-ruracio-groom-dance.jpeg',
        label: 'Ruracio Celebration Dance',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/traditional-wedding-ruracio-groom-gold-bride.jpeg',
        label: 'Traditional Bride & Groom',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      // Agbada
      {
        src: '/images/agbada-navy-copper-embroidery.jpeg',
        label: 'Navy Copper Grand Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-chocolate-brown.jpeg',
        label: 'Chocolate Brown Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-1.jpeg',
        label: 'Royal Agbada Atelier I',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-2.jpeg',
        label: 'Royal Agbada Atelier II',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-3.jpeg',
        label: 'Royal Agbada Atelier III',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-4.jpeg',
        label: 'Royal Agbada Atelier IV',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-5.jpeg',
        label: 'Royal Agbada Atelier V',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-6.jpeg',
        label: 'Royal Agbada Atelier VI',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-7.jpeg',
        label: 'Royal Agbada Atelier VII',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/agbada-classic-8.jpeg',
        label: 'Royal Agbada Atelier VIII',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      // Safari / Kaunda Suit
      {
        src: '/images/traditional-bespoke-cream-groomsmen-cane.jpeg',
        label: 'Cream Bespoke Suit with Cane',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/kaunda-safari-purple-suit-1.jpeg',
        label: 'Purple Kaunda Suit Streetwear',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/kaunda-safari-purple-suit-2.jpeg',
        label: 'Purple Kaunda Suit Full Cut',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (1).jpeg',
        label: 'White Kaftan',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (2).jpeg',
        label: 'Pattern Kaftan',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.54.58 PM.jpeg',
        label: 'Kaftan Group',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.56 PM.jpeg',
        label: 'Dowry Kaftan',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.56.04 PM.jpeg',
        label: 'Cream Kaftan',
        tag: 'Kaftan',
        subCategory: 'kaftan',
        aspect: 'portrait',
      },

      // Agbada
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg',
        label: 'Gold Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.06 PM.jpeg',
        label: 'Celebration Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.34 PM.jpeg',
        label: 'Grand Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.58 PM.jpeg',
        label: 'Royal Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.56.01 PM.jpeg',
        label: 'Ceremony Agbada',
        tag: 'Agbada',
        subCategory: 'agbada',
        aspect: 'portrait',
      },

      // Tuxedo (African / Jacquard)
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg',
        label: 'Jacquard Coat',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.49 PM.jpeg',
        label: 'Pattern Dinner',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.55 PM.jpeg',
        label: 'Ankara Jacket',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg',
        label: 'Velvet Dinner',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (1).jpeg',
        label: 'Paisley Dinner',
        tag: 'Tuxedo',
        subCategory: 'tuxedo',
        aspect: 'square',
      },

      // Safari / Kaunda Suit
      {
        src: '/images/kaunda suit.jpeg',
        label: 'Cream Kaunda',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM.jpeg',
        label: 'Ankara Kaunda',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.53 PM.jpeg',
        label: 'Traditional Vest',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.49 PM.jpeg',
        label: 'Senator Suit',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg',
        label: 'Senator Group',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.38 PM.jpeg',
        label: 'Dowry Suit',
        tag: 'Safari / Kaunda suit',
        subCategory: 'safari-kaunda-suit',
        aspect: 'portrait',
      },
    ],
  },
};

// Aliases for backward compatibility
export const OCCASION_SLUG_ALIASES: Record<string, string> = {
  'business-executive': 'executive-wear',
  'wedding-groom': 'black-tie-wedding',
  'formal-eveningwear': 'black-tie-wedding',
  'signature-occasion': 'african-wear',
};

export const ALL_OCCASIONS_LIST: OccasionCategoryData[] = [
  OCCASIONS_DATA['executive-wear'],
  OCCASIONS_DATA['black-tie-wedding'],
  OCCASIONS_DATA['african-wear'],
];

export function getOccasionBySlug(slug: string): OccasionCategoryData | undefined {
  const direct = OCCASIONS_DATA[slug];
  if (direct) return direct;
  const targetSlug = OCCASION_SLUG_ALIASES[slug];
  if (targetSlug) return OCCASIONS_DATA[targetSlug];
  return undefined;
}
