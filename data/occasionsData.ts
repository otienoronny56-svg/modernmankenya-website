export interface OccasionHighlight {
  src: string;
  label: string; // 2 to 5 words
  tag: string;   // 2 to 3 words
  aspect?: 'square' | 'portrait' | 'landscape';
}

export interface OccasionPageData {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  heroImage: string;
  tagline: string; // 2 to 5 words
  heroPills: string[]; // 2 to 4 words each
  highlights: OccasionHighlight[];
  galleryImages: OccasionHighlight[];
  craftSpecs: { label: string; value: string }[];
}

export const OCCASIONS_DATA: Record<string, OccasionPageData> = {
  'business-executive': {
    id: 'business-executive',
    slug: 'business-executive',
    title: 'Business & Executive',
    shortTitle: 'Boardroom & Leadership',
    badge: 'Executive Sartorial Mastery',
    heroImage: '/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg',
    tagline: 'Commanding Authority & Flawless Balance',
    heroPills: [
      'Super 150s English Worsteds',
      'Full Floating Horsehair Canvas',
      'Millimetric Hand Drafting',
      'All-Day Crease Resistance',
    ],
    craftSpecs: [
      { label: 'Chest Construction', value: 'Full Floating Canvas' },
      { label: 'Cloth Provenance', value: 'Scabal & Huddersfield 150s' },
      { label: 'Handover Fittings', value: '3 Anatomical Sessions' },
    ],
    highlights: [
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.12 PM.jpeg',
        label: 'Navy Double-Breasted Horseshoe Waistcoat',
        tag: 'Executive Three-Piece',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg',
        label: 'Charcoal Micro-Weave Business Suit',
        tag: 'Boardroom Essential',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM (1).jpeg',
        label: 'Charcoal Pinstripe Tie-Bar Commission',
        tag: 'Classic Leadership',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM.jpeg',
        label: 'Dark Navy Chalk-Stripe Wool',
        tag: 'Power Silhouette',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg',
        label: 'Sand Beige Crossover Waistcoat',
        tag: 'Executive Daylight Suit',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.41.30 PM.jpeg',
        label: 'Master Tailor Anatomical Measurement',
        tag: 'Atelier Discipline',
        aspect: 'landscape',
      },
    ],
    galleryImages: [
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.12 PM.jpeg',
        label: 'Midnight Navy Horseshoe Waistcoat',
        tag: 'Three-Piece Suiting',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg',
        label: 'Charcoal Birdseye Two-Button Cut',
        tag: 'Super 150s Wool',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.13 PM.jpeg',
        label: 'Airforce Blue Wool-Linen Ensemble',
        tag: 'Daytime Executive',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.24 PM.jpeg',
        label: 'Charcoal Glen-Plaid Bespoke Cut',
        tag: 'British Hacking Flap',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.19 PM.jpeg',
        label: 'French Navy Two-Button Suit',
        tag: 'Hand-Rolled Lapel',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM (1).jpeg',
        label: 'Executive Pinstripe Silver Accent',
        tag: 'Double-Vented Silhouette',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM.jpeg',
        label: 'Chalk-Stripe Worsted Peak Lapel',
        tag: 'Bespoke Pattern Cut',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg',
        label: 'Sand Melange Crossover Waistcoat',
        tag: 'Horn Button Detail',
        aspect: 'square',
      },
      {
        src: '/images/slide.jpeg',
        label: 'French Cuff Surgeon Finishing',
        tag: 'Functional Sleeve Cuffs',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.41.30 PM.jpeg',
        label: 'Chest Pitch Calibration Session',
        tag: '35 Measurements',
        aspect: 'landscape',
      },
      {
        src: '/images/MOK_7655.jpg',
        label: 'The Nairobi Boardroom Blue',
        tag: 'Handcrafted Atelier Piece',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_7660.jpg',
        label: 'Double-Breasted Pinstripe Power Suit',
        tag: 'Peak Lapel 4-Inch',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_7662.jpg',
        label: 'Classic Slate Three-Piece Suit',
        tag: 'Floating Canvas Internal',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2198.jpg',
        label: 'Royal Navy Peak Lapel Suit',
        tag: 'Bespoke Executive Cut',
        aspect: 'portrait',
      },
      {
        src: '/images/Bespoke Suit.jpg',
        label: 'Atelier Hand-Padding Detail',
        tag: 'Sartorial Craftsmanship',
        aspect: 'landscape',
      },
    ],
  },

  'wedding-groom': {
    id: 'wedding-groom',
    slug: 'wedding-groom',
    title: 'Wedding & Groom',
    shortTitle: 'Groom & Bridal Party',
    badge: 'Nuptial Distinction & Ceremony',
    heroImage: '/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg',
    tagline: 'Celebrated Milestones & Nuptial Grandeur',
    heroPills: [
      'Groom & Groomsmen Coordinated Sets',
      'Ceremonial Floating Canvas Drape',
      'Ivory & Contrast Shawl Facings',
      'Dedicated Bridal Tailoring Concierge',
    ],
    craftSpecs: [
      { label: 'Entourage Coordination', value: 'Full Groomsmen Sets' },
      { label: 'Cloth Selection', value: 'Barathea, Silk & Velvet' },
      { label: 'Turnaround Timeline', value: '4 to 6 Weeks' },
    ],
    highlights: [
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg',
        label: 'Ivory Double-Breasted Dinner Suit',
        tag: 'Highland Wedding Commission',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.14 PM.jpeg',
        label: 'Cognac Groomsmen Party Ensemble',
        tag: 'Coordinated Entourage',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM (1).jpeg',
        label: 'Navy Three-Piece Aisle Entrance',
        tag: 'Champagne Waistcoat Accents',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg',
        label: 'Jacquard Dinner Jacket & Golden Cane',
        tag: 'Monarch Ceremony Attire',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM (1).jpeg',
        label: 'Beige Double-Breasted Groom Suit',
        tag: 'Joyful Groomsmen Moment',
        aspect: 'square',
      },
      {
        src: '/images/tuxedo.jpeg',
        label: 'Ivory Tuxedo & Silk Bowtie',
        tag: 'Ceremonial Altar Look',
        aspect: 'portrait',
      },
    ],
    galleryImages: [
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg',
        label: 'Ivory Double-Breasted Groom Silhouette',
        tag: 'Outdoor Nuptials',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.14 PM.jpeg',
        label: 'Champagne Groom & Tobacco Groomsmen',
        tag: 'Full Wedding Party',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.14 PM.jpeg',
        label: 'Double-Breasted Tuxedo Room Fitting',
        tag: 'Made to Measure Peak',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.26 PM.jpeg',
        label: 'Bespoke Satin Lapel Adjustment',
        tag: 'Editorial Black & White',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg',
        label: 'Ceremonial White Jacquard Dinner Jacket',
        tag: 'Golden Cane Accessory',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM (1).jpeg',
        label: 'Navy & Gold Bridal Rose Petal Aisle',
        tag: 'Outdoor Garden Wedding',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM (1).jpeg',
        label: 'Groom Laughing in Tan Three-Piece',
        tag: 'Groomsmen Bonding',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.54 PM.jpeg',
        label: 'Tea Plantation Romance Portrait',
        tag: 'Fine Wool Silhouette',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.47.59 PM.jpeg',
        label: 'Ivory Jacket Black Trouser Stride',
        tag: 'Contrasting Facings',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.51.08 PM.jpeg',
        label: 'Groomsmen Champagne Toast Fitting',
        tag: 'Celebratory Camaraderie',
        aspect: 'portrait',
      },
      {
        src: '/images/tuxedo.jpeg',
        label: 'The Altar Statement Ivory Tuxedo',
        tag: 'Black Shawl Satin Trim',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC04995.jpg',
        label: 'Classic Nuptial Three-Piece Suit',
        tag: 'Horseshoe Vest Detail',
        aspect: 'portrait',
      },
      {
        src: '/images/DSC05022.jpg',
        label: 'Groom & Bride Reception Walk',
        tag: 'Sartorial Distinction',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM.jpeg',
        label: 'Garden Reception Entourage Entrance',
        tag: 'Bespoke Tailoring',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM (2).jpeg',
        label: 'French Blue Gold Lapel Flower',
        tag: 'Boutonniere Finish',
        aspect: 'square',
      },
    ],
  },

  'formal-eveningwear': {
    id: 'formal-eveningwear',
    slug: 'formal-eveningwear',
    title: 'Formal & Black Tie',
    shortTitle: 'Black Tie & Galas',
    badge: 'Red Carpet & Black Tie',
    heroImage: '/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg',
    tagline: 'Black-Tie Distinction & Velvet Opulence',
    heroPills: [
      'Italian Silk Grosgrain Facings',
      'Holland & Sherry Cotton Velvet',
      'Barathea Light-Absorbing Wool',
      'Horseshoe Silk Waistcoats',
    ],
    craftSpecs: [
      { label: 'Lapel Facing', value: 'Pure Silk Grosgrain & Satin' },
      { label: 'Tuxedo Trousers', value: 'Side Braid Silk Stripe' },
      { label: 'Buttons', value: 'Hand-Covered Silk Satin' },
    ],
    highlights: [
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg',
        label: 'Crimson Burgundy Velvet Dinner Jacket',
        tag: 'Satin Peak Lapel',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.22 PM.jpeg',
        label: 'Midnight Black Tie Horseshoe Ensemble',
        tag: 'Black Tie Standard',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM (1).jpeg',
        label: 'Stone Ivory Double-Breasted Ascot Look',
        tag: 'Gala Lounge Splendor',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM.jpeg',
        label: 'Royal Navy Glen Check Waistcoat',
        tag: 'Creative Black Tie',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (1).jpeg',
        label: 'Navy Peak Jacket Burgundy Bowtie',
        tag: 'Milestone Dinner Suit',
        aspect: 'square',
      },
      {
        src: '/images/tuxedo.jpeg',
        label: 'Ivory Shawl Lapel Gala Tuxedo',
        tag: 'Classic Evening Posture',
        aspect: 'portrait',
      },
    ],
    galleryImages: [
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg',
        label: 'Crimson Royal Velvet Dinner Jacket',
        tag: 'Heavyweight Velvet 320g',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.22 PM.jpeg',
        label: 'The Definitive Black Tie Tuxedo',
        tag: 'Barathea Cloth Weave',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM (1).jpeg',
        label: 'Ivory Double-Breasted Royal Cravat',
        tag: 'Bespoke Ascot Ensemble',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM.jpeg',
        label: 'Midnight Tuxedo Prince of Wales Vest',
        tag: 'Micro-Dot Silk Bowtie',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (1).jpeg',
        label: 'Deep Navy Single-Button Tuxedo',
        tag: 'Burgundy Paisley Silk',
        aspect: 'square',
      },
      {
        src: '/images/tuxedo.jpeg',
        label: 'Contrast Black Shawl Ivory Dinner Coat',
        tag: 'Altar & Red Carpet',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2101.jpg',
        label: 'Black Tie Satin Peak Jacket',
        tag: 'Classic Black Tie',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2204.jpg',
        label: 'Ceremonial Houndstooth Dinner Ensemble',
        tag: 'Horseshoe Waistcoat',
        aspect: 'portrait',
      },
      {
        src: '/images/MOK_2219.jpg',
        label: 'Velvet Smoking Jacket in Motion',
        tag: 'Opulence & Simplicity',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg',
        label: 'White Jacquard Gala Walking Cane',
        tag: 'Lion Head Gold Handle',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.50.14 PM.jpeg',
        label: 'Architectural Ivory Evening Jacket',
        tag: 'Double Monk Shoe Pair',
        aspect: 'portrait',
      },
      {
        src: '/images/Black.jpg',
        label: 'Midnight Black Floating Canvas',
        tag: 'Pure Barathea Wool',
        aspect: 'landscape',
      },
    ],
  },

  'signature-occasion': {
    id: 'signature-occasion',
    slug: 'signature-occasion',
    title: 'Signature & African Ceremonies',
    shortTitle: 'Kaunda Suits & Heritage',
    badge: 'Contemporary African Identity',
    heroImage: '/images/kaunda suit.jpeg',
    tagline: 'African Statesman Heritage & Cultural Pride',
    heroPills: [
      'Bespoke Kaunda & Senator Cuts',
      'Ceremonial Ruracio & Dowry Wear',
      'Hand-Finished Ankara Trim Accents',
      'Structured Breathable Tropical Cloth',
    ],
    craftSpecs: [
      { label: 'Garment Heritage', value: 'Kaunda, Senator & Traditional' },
      { label: 'Ceremonial Options', value: 'Ruracio, Dowry & Milestone' },
      { label: 'Craft Detailing', value: 'Ankara, Cowhide & Flywhisks' },
    ],
    highlights: [
      {
        src: '/images/kaunda suit.jpeg',
        label: 'Asymmetrical Cream Kaunda Suit Couple',
        tag: 'Signature African Elegance',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg',
        label: 'Groom & Groomsmen Flywhisk Entourage',
        tag: 'Embroidered Senator Tunics',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.53 PM.jpeg',
        label: 'Ruracio Dowry Ceremonial Cane Dance',
        tag: 'Beaded Cowhide Waistcoat',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg',
        label: 'Gold Ceremonial Cap & Coral Beads',
        tag: 'Traditional Nuptial Vow',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM.jpeg',
        label: 'White Senator Tunic Ankara Panel',
        tag: 'African Modernity',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM.jpeg',
        label: 'Crimson Scarlet Statement Blazer',
        tag: 'Houndstooth Pocket Square',
        aspect: 'square',
      },
    ],
    galleryImages: [
      {
        src: '/images/kaunda suit.jpeg',
        label: 'Asymmetric Mandarin Collar Kaunda Suit',
        tag: 'Ceremonial Cream Fabric',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg',
        label: 'Senator Suits & Emerald Caps',
        tag: 'Traditional Horsetail Flywhisks',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.53 PM.jpeg',
        label: 'Ruracio Procession Walking Canes',
        tag: 'Celebratory Dance Stride',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg',
        label: 'Embroidered Cap & African Coral Beads',
        tag: 'Sacred Dowry Heritage',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM.jpeg',
        label: 'Crisp White Tunic Ankara Panel Trim',
        tag: 'Contemporary Senator Cut',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.49 PM.jpeg',
        label: 'Groom with Carved Wooden Antelope Cane',
        tag: 'Orange Velvet Cap Detail',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM.jpeg',
        label: 'Scarlet Red Statement Jacket',
        tag: 'Notch Lapel 3-Inch',
        aspect: 'square',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (2).jpeg',
        label: 'Check Suit Nairobi Railway Steam Train',
        tag: 'Urban Statement Tailoring',
        aspect: 'portrait',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.21 PM.jpeg',
        label: 'Groomsmen Stride Across Savannah Grass',
        tag: 'Emerald Velvet Caps',
        aspect: 'landscape',
      },
      {
        src: '/images/more/WhatsApp Image 2026-10-19 at 3.55.34 PM.jpeg',
        label: 'Traditional Entourage Outdoor Ceremony',
        tag: 'Kenyan Bespoke Heritage',
        aspect: 'landscape',
      },
      {
        src: '/images/LKM_1600.jpg',
        label: 'Senator Suit Handcrafted Embroidery',
        tag: 'Artisanal Needlework',
        aspect: 'portrait',
      },
      {
        src: '/images/LKM_1607.jpg',
        label: 'Traditional Pocket & Placket Detailing',
        tag: 'Heritage & Modernity',
        aspect: 'portrait',
      },
      {
        src: '/images/LKM_1745.jpg',
        label: 'Contemporary African Occasion Garment',
        tag: 'Bespoke Atelier Cut',
        aspect: 'portrait',
      },
      {
        src: '/images/LKM_1755.jpg',
        label: 'Kaftan & Agbada Sartorial Volume',
        tag: 'African Sophistication',
        aspect: 'portrait',
      },
      {
        src: '/images/LKM_1793.jpg',
        label: 'Nairobi Ceremony Attire in Texture',
        tag: 'Natural Fiber Blend',
        aspect: 'portrait',
      },
    ],
  },
};

export const ALL_OCCASIONS_LIST = [
  OCCASIONS_DATA['business-executive'],
  OCCASIONS_DATA['wedding-groom'],
  OCCASIONS_DATA['formal-eveningwear'],
  OCCASIONS_DATA['signature-occasion'],
];
