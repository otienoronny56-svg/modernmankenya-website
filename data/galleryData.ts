/**
 * Modern Man Kenya - Sartorial Gallery Visual Dataset
 * 
 * Auto-generated individual gallery items from IMAGE_REGISTRY and workspace assets.
 * Zero pricing, concise 1-2 word descriptions, multi-image carousel support for same outfit / same person.
 */

export interface GalleryItem {
  id: string;
  title: string;
  tag: string;
  category: 
    | 'suits'
    | 'evening-dinner'
    | 'kaunda-suits'
    | 'smart-casual'
    | 'traditional'
    | 'kaftan-agbada'
    | 'modern-kids'
    | 'modern-women'
    | 'shirts'
    | 'accessories';
  image: string;
  images?: string[];
  aspect?: 'portrait' | 'landscape' | 'square';
}

export const SARTORIAL_GALLERY_ITEMS: GalleryItem[] = [
  {
    "id": "kid-1",
    "title": "African Lavender",
    "tag": "Traditional Cut",
    "category": "modern-kids",
    "image": "/images/modern-kids-african-lavender.jpeg",
    "images": [
      "/images/modern-kids-african-lavender.jpeg",
      "/images/modern-kids-portrait-1.jpeg"
    ],
    "aspect": "portrait"
  },
  {
    "id": "kid-2",
    "title": "Little Aviator",
    "tag": "Captain Uniform",
    "category": "modern-kids",
    "image": "/images/modern-kids-portrait-2.jpeg",
    "images": [
      "/images/modern-kids-portrait-2.jpeg",
      "/images/modern-kids-portrait-3.jpeg"
    ],
    "aspect": "portrait"
  },
  {
    "id": "kid-3",
    "title": "Ceremonial Agbada",
    "tag": "Heritage Robe",
    "category": "modern-kids",
    "image": "/images/modern-kids-portrait-4.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kid-4",
    "title": "White Tuxedo",
    "tag": "Junior Tuxedo",
    "category": "modern-kids",
    "image": "/images/modern-kids-white-tuxedo.jpeg",
    "images": [
      "/images/modern-kids-white-tuxedo.jpeg",
      "/images/modern-kids-portrait-5.jpeg",
      "/images/modern-kids-portrait-6.jpeg"
    ],
    "aspect": "portrait"
  },
  {
    "id": "kid-5",
    "title": "Bespoke Youth",
    "tag": "Officer Uniform",
    "category": "modern-kids",
    "image": "/images/modern-kids-portrait-7.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kid-6",
    "title": "African Monarch",
    "tag": "African Prince",
    "category": "modern-kids",
    "image": "/images/modern-kids-portrait-8.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "women-1",
    "title": "Sage Green",
    "tag": "Trouser Suit",
    "category": "modern-women",
    "image": "/images/women-suit-sage-green-1.jpeg",
    "images": [
      "/images/women-suit-sage-green-1.jpeg",
      "/images/women-suit-sage-green-2.jpeg",
      "/images/women-suit-sage-green-3.jpeg"
    ],
    "aspect": "portrait"
  },
  {
    "id": "women-2",
    "title": "Emerald Green",
    "tag": "Executive Suit",
    "category": "modern-women",
    "image": "/images/women-suit-emerald-green.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "women-3",
    "title": "Pinstripe Three-Piece",
    "tag": "Waistcoat Suit",
    "category": "modern-women",
    "image": "/images/women-suit-pinstripe-three-piece.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "women-4",
    "title": "Nuptial Harmony",
    "tag": "Matching Waistcoat",
    "category": "modern-women",
    "image": "/images/women-suit-nuptial-couple.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "women-5",
    "title": "Royal Blue",
    "tag": "Skirt Suit",
    "category": "modern-women",
    "image": "/images/women-suit-royal-blue-skirt.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "women-6",
    "title": "Horseshoe Grey",
    "tag": "Double-Breasted Vest",
    "category": "modern-women",
    "image": "/images/women-suit-grey-horseshoe-vest.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "women-7",
    "title": "Tangerine Orange",
    "tag": "Statement Suit",
    "category": "modern-women",
    "image": "/images/women-suit-tangerine-pant.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "shirt-1",
    "title": "Navy Bengal",
    "tag": "Cutaway Collar",
    "category": "shirts",
    "image": "/images/shirts/modernman-shirt-navy-bengal-stripe.jpg",
    "aspect": "portrait"
  },
  {
    "id": "shirt-2",
    "title": "Sky Blue",
    "tag": "Contrast Collar",
    "category": "shirts",
    "image": "/images/shirts/modernman-shirt-sky-blue-pinpoint.jpg",
    "aspect": "portrait"
  },
  {
    "id": "shirt-3",
    "title": "Lavender Pinpoint",
    "tag": "Pastel Poplin",
    "category": "shirts",
    "image": "/images/shirts/modernman-shirt-lavender-pinpoint.jpg",
    "aspect": "portrait"
  },
  {
    "id": "shirt-4",
    "title": "Burgundy Bengal",
    "tag": "Crimson Stripe",
    "category": "shirts",
    "image": "/images/shirts/modernman-shirt-burgundy-bengal-stripe.jpg",
    "aspect": "portrait"
  },
  {
    "id": "shirt-5",
    "title": "Black Bengal",
    "tag": "Monochrome Stripe",
    "category": "shirts",
    "image": "/images/shirts/modernman-shirt-black-bengal-stripe.jpg",
    "aspect": "portrait"
  },
  {
    "id": "acc-1",
    "title": "Silk Tie",
    "tag": "Pocket Square",
    "category": "accessories",
    "image": "/images/accessories/modernman-tie-pocket-square.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-2",
    "title": "Velvet Bowtie",
    "tag": "Hand Tied",
    "category": "accessories",
    "image": "/images/accessories/modernman-velvet-bowtie.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-3",
    "title": "Onyx Cufflinks",
    "tag": "24K Gold",
    "category": "accessories",
    "image": "/images/accessories/modernman-cufflinks-studs.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-4",
    "title": "Lion Lapel",
    "tag": "Brooch Pin",
    "category": "accessories",
    "image": "/images/accessories/modernman-lapel-brooch-pins.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-5",
    "title": "Silk Cravat",
    "tag": "Ascot Tie",
    "category": "accessories",
    "image": "/images/accessories/modernman-silk-cravat.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-6",
    "title": "Belt Suspenders",
    "tag": "Calfskin Leather",
    "category": "accessories",
    "image": "/images/accessories/modernman-belt-suspenders.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-7",
    "title": "Dress Watch",
    "tag": "Alligator Strap",
    "category": "accessories",
    "image": "/images/accessories/modernman-dress-watch.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-8",
    "title": "Gold Tie Bar",
    "tag": "Engraved Clip",
    "category": "accessories",
    "image": "/images/accessories/modernman-tie-clips-bars.jpg",
    "aspect": "square"
  },
  {
    "id": "acc-9",
    "title": "Master Fedora",
    "tag": "Wool Felt",
    "category": "accessories",
    "image": "/images/accessories/modernman-master-fedora-hat.jpg",
    "aspect": "square"
  },
  {
    "id": "kaftan-1",
    "title": "Forest Kaftan",
    "tag": "Groomsmen Entourage",
    "category": "kaftan-agbada",
    "image": "/images/kaftan-groomsmen-entourage-green.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-2",
    "title": "Ceremonial Agbada",
    "tag": "Bespoke Drape",
    "category": "kaftan-agbada",
    "image": "/images/kaftan-groomsmen-group-2.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "kaftan-3",
    "title": "Emerald Entourage",
    "tag": "Royal Kaftan",
    "category": "kaftan-agbada",
    "image": "/images/kaftan-groomsmen-group-3.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-4",
    "title": "Golden Embroidery",
    "tag": "African Luxury",
    "category": "kaftan-agbada",
    "image": "/images/kaftan-groomsmen-group-4.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-5",
    "title": "Ivory Agbada",
    "tag": "Hand Embroidered",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.43 AM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-6",
    "title": "Royal Purple",
    "tag": "Grand Senator",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.44 AM (1).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-7",
    "title": "Bespoke Senator",
    "tag": "African Cut",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.44 AM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-8",
    "title": "Onyx Kaftan",
    "tag": "Contrast Embroidery",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.46 AM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-9",
    "title": "Sage Tunic",
    "tag": "Modern Kaftan",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.47 AM (1).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-10",
    "title": "Crimson Agbada",
    "tag": "Ceremonial Robe",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.47 AM (2).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-11",
    "title": "Azure Kaftan",
    "tag": "African Heritage",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.47 AM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-12",
    "title": "Champagne Kaftan",
    "tag": "Monarch Gold",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.48 AM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-13",
    "title": "Gold Filigree",
    "tag": "Bespoke Agbada",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.49 AM (1).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaftan-14",
    "title": "Monarch Agbada",
    "tag": "African Royalty",
    "category": "kaftan-agbada",
    "image": "/images/WhatsApp Image 2026-10-21 at 10.47.49 AM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaunda-1",
    "title": "Cream Kaunda",
    "tag": "Asymmetric Placket",
    "category": "kaunda-suits",
    "image": "/images/kaunda suit.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaunda-2",
    "title": "Purple Safari",
    "tag": "Bespoke Kaunda",
    "category": "kaunda-suits",
    "image": "/images/kaunda-safari-purple-suit-1.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaunda-3",
    "title": "Safari Pocket",
    "tag": "Senator Cut",
    "category": "kaunda-suits",
    "image": "/images/kaunda-safari-purple-suit-2.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaunda-4",
    "title": "White Senator",
    "tag": "Ankara Trim",
    "category": "kaunda-suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaunda-5",
    "title": "Embroidered Placket",
    "tag": "Senator Tunic",
    "category": "kaunda-suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (2).jpeg",
    "aspect": "landscape"
  },
  {
    "id": "kaunda-6",
    "title": "Minimalist Ivory",
    "tag": "Mandarin Collar",
    "category": "kaunda-suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (1).jpeg",
    "aspect": "landscape"
  },
  {
    "id": "kaunda-7",
    "title": "Ankara Accent",
    "tag": "Heritage Pocket",
    "category": "kaunda-suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.16.55 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "kaunda-8",
    "title": "Check Kaunda",
    "tag": "Historic Stride",
    "category": "kaunda-suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (2).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-1",
    "title": "Ruracio Dance",
    "tag": "Joyful Entourage",
    "category": "traditional",
    "image": "/images/traditional-wedding-ruracio-groom-dance.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-2",
    "title": "Gold Regalia",
    "tag": "Nuptial Blessing",
    "category": "traditional",
    "image": "/images/traditional-wedding-ruracio-groom-gold-bride.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-3",
    "title": "Ceremonial Cane",
    "tag": "Traditional Attire",
    "category": "traditional",
    "image": "/images/traditional-bespoke-cream-groomsmen-cane.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-4",
    "title": "African Entourage",
    "tag": "Ceremonial March",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.54.58 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-5",
    "title": "Gold Cap",
    "tag": "Coral Beads",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-6",
    "title": "Ruracio Joy",
    "tag": "Celebration",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.06 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-7",
    "title": "Flywhisk Line",
    "tag": "Groomsmen Honor",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.21 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "trad-8",
    "title": "Emerald Caps",
    "tag": "Sacred Entourage",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-9",
    "title": "Nuptial Joy",
    "tag": "Heritage Steps",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.28 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-10",
    "title": "Sacred Steps",
    "tag": "Ancestral Path",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.34 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "trad-11",
    "title": "Dowry Elders",
    "tag": "Elder Blessing",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.38 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-12",
    "title": "Sacred Nuptials",
    "tag": "Ruracio Union",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.46 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-13",
    "title": "Garden Walk",
    "tag": "Procession Walk",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.48 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-14",
    "title": "Antelope Cane",
    "tag": "Velvet Cap",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.49 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "trad-15",
    "title": "Cowhide Vest",
    "tag": "Beaded Regalia",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.53 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "trad-17",
    "title": "Sartorial Pride",
    "tag": "Cultural Elders",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.56 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "trad-18",
    "title": "Entrance March",
    "tag": "Groom March",
    "category": "traditional",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.55.57 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "trad-19",
    "title": "Navy Brocade",
    "tag": "Bespoke Kaftan",
    "category": "traditional",
    "image": "/images/DSC_2606.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-cover",
    "title": "Scarlet Lapel",
    "tag": "Bespoke Tuxedo",
    "category": "evening-dinner",
    "image": "/images/DSC09238.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-1",
    "title": "Ivory Shawl",
    "tag": "Altar Tuxedo",
    "category": "evening-dinner",
    "image": "/images/tuxedo.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-2",
    "title": "Black Barathea",
    "tag": "Floating Canvas",
    "category": "evening-dinner",
    "image": "/images/Black.jpg",
    "aspect": "landscape"
  },
  {
    "id": "tux-3",
    "title": "Studio Profile",
    "tag": "Black Tie",
    "category": "evening-dinner",
    "image": "/images/MOK_1920.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-4",
    "title": "Satin Peak",
    "tag": "Gala Tuxedo",
    "category": "evening-dinner",
    "image": "/images/MOK_2101.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-5",
    "title": "Evening Stance",
    "tag": "Formal Black Tie",
    "category": "evening-dinner",
    "image": "/images/MOK_2129.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-6",
    "title": "Contrast Lapel",
    "tag": "Dinner Suit",
    "category": "evening-dinner",
    "image": "/images/MOK_2142.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-7",
    "title": "Editorial Tux",
    "tag": "Full Length",
    "category": "evening-dinner",
    "image": "/images/MOK_2146 (1).jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-8",
    "title": "Emerald Velvet",
    "tag": "Smoking Jacket",
    "category": "evening-dinner",
    "image": "/images/MOK_2154.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-9",
    "title": "Navy Velvet",
    "tag": "Dinner Coat",
    "category": "evening-dinner",
    "image": "/images/MOK_2171.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-10",
    "title": "Velvet Motion",
    "tag": "Red Carpet",
    "category": "evening-dinner",
    "image": "/images/MOK_2219.jpg",
    "aspect": "portrait"
  },
  {
    "id": "tux-11",
    "title": "Classic Tuxedo",
    "tag": "Bowtie Ensemble",
    "category": "evening-dinner",
    "image": "/images/tuxedo-black-tie-classic.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-12",
    "title": "Velvet Entourage",
    "tag": "Gala Evening",
    "category": "evening-dinner",
    "image": "/images/tuxedo-ivory-black-velvet-entourage.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-13",
    "title": "Navy Shawl",
    "tag": "Crimson Waistcoat",
    "category": "evening-dinner",
    "image": "/images/tuxedo-navy-shawl-red-vest.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-14",
    "title": "Sky Blue Tux",
    "tag": "Daytime Black Tie",
    "category": "evening-dinner",
    "image": "/images/tuxedo-sky-blue-wedding.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-15",
    "title": "Burgundy Velvet",
    "tag": "Silk Shawl",
    "category": "evening-dinner",
    "image": "/images/tuxedo-velvet-burgundy.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-16",
    "title": "Architectural Ivory",
    "tag": "Peak Lapel",
    "category": "evening-dinner",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.14 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-17",
    "title": "Editorial Drape",
    "tag": "Monochrome Black",
    "category": "evening-dinner",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.26 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-18",
    "title": "Jacquard Coat",
    "tag": "Golden Cane",
    "category": "evening-dinner",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "tux-19",
    "title": "Monarch Jacquard",
    "tag": "Royal Barathea",
    "category": "evening-dinner",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.49 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "tux-20",
    "title": "Crimson Velvet",
    "tag": "Silk Lapel",
    "category": "evening-dinner",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "tux-21",
    "title": "Gala Tuxedo",
    "tag": "Scarlet Lapel",
    "category": "evening-dinner",
    "image": "/images/DSC09202.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-22",
    "title": "Grand Entrance",
    "tag": "Evening Wear",
    "category": "evening-dinner",
    "image": "/images/DSC09216.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-23",
    "title": "Sartorial Stride",
    "tag": "Black Tie",
    "category": "evening-dinner",
    "image": "/images/DSC09233.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-25",
    "title": "Regal Poise",
    "tag": "Bespoke Tuxedo",
    "category": "evening-dinner",
    "image": "/images/DSC09241.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-29",
    "title": "Embroidered Shawl",
    "tag": "Dinner Jacket",
    "category": "evening-dinner",
    "image": "/images/IMG-142.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-30",
    "title": "Midnight Sovereign",
    "tag": "White Tuxedo",
    "category": "evening-dinner",
    "image": "/images/IMG-143.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-31",
    "title": "Double Vest",
    "tag": "Groom Waistcoat",
    "category": "evening-dinner",
    "image": "/images/IMG-145.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "tux-32",
    "title": "Jacquard Draped",
    "tag": "Evening Luxury",
    "category": "evening-dinner",
    "image": "/images/IMG-146.jpg.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-1",
    "title": "Royal Blue",
    "tag": "Nairobi Boardroom",
    "category": "suits",
    "image": "/images/MOK_7655.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-2",
    "title": "Double Breasted",
    "tag": "Chalkstripe Worsted",
    "category": "suits",
    "image": "/images/MOK_7660.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-3",
    "title": "Slate Three-Piece",
    "tag": "Executive Vest",
    "category": "suits",
    "image": "/images/MOK_7662.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-4",
    "title": "Glen Plaid",
    "tag": "Charcoal Worsted",
    "category": "suits",
    "image": "/images/MOK_7688.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-5",
    "title": "Deep Flannel",
    "tag": "Midnight Navy",
    "category": "suits",
    "image": "/images/MOK_7716.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-6",
    "title": "Peak Lapel",
    "tag": "Royal Navy",
    "category": "suits",
    "image": "/images/MOK_2198.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-7",
    "title": "Distinguished Executive",
    "tag": "Bespoke Suiting",
    "category": "suits",
    "image": "/images/ERC_0341.JPG",
    "aspect": "portrait"
  },
  {
    "id": "suit-8",
    "title": "Double Breasted",
    "tag": "Navy Worsted",
    "category": "suits",
    "image": "/images/double breast.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-9",
    "title": "Navy Two-Piece",
    "tag": "Classic Two-Button",
    "category": "suits",
    "image": "/images/two-piece-suit-blue.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-10",
    "title": "Blue Three-Piece",
    "tag": "Horseshoe Vest",
    "category": "suits",
    "image": "/images/three-piece-suit-blue.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-11",
    "title": "Olive Sage",
    "tag": "Three-Piece Suit",
    "category": "suits",
    "image": "/images/three-piece-suit-olive-sage.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-12",
    "title": "Horseshoe Vest",
    "tag": "Waistcoat Line",
    "category": "suits",
    "image": "/images/three-piece-vest-look.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-13",
    "title": "Rooftop Ocean",
    "tag": "Skyline Blue",
    "category": "suits",
    "image": "/images/two-piece-suit-ocean-blue-rooftop.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-14",
    "title": "Silver Statesman",
    "tag": "Executive Portrait",
    "category": "suits",
    "image": "/images/executive-portrait-silver-hair-navy-suit.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-15",
    "title": "Ivory Waistcoat",
    "tag": "Three-Piece Navy",
    "category": "suits",
    "image": "/images/executive-three-piece-navy-ivory-waistcoat.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-16",
    "title": "Three-Piece Groom",
    "tag": "Wedding Nuptial",
    "category": "suits",
    "image": "/images/DSC04995.jpg",
    "aspect": "portrait"
  },
  {
    "id": "suit-17",
    "title": "Highland Groom",
    "tag": "Ivory Double Breasted",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-18",
    "title": "Tea Plantation",
    "tag": "Highland Romance",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.47.54 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-19",
    "title": "Highland Altar",
    "tag": "Boutonniere Detail",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.47.56 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-20",
    "title": "Ivory Jacket",
    "tag": "Black Trousers",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.47.59 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-21",
    "title": "Champagne Toast",
    "tag": "Groomsmen Toast",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.51.08 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-22",
    "title": "Groom Toast",
    "tag": "Champagne Flute",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.51.41 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-23",
    "title": "Garden Altar",
    "tag": "Rose Petal Walk",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM (1).jpeg",
    "aspect": "landscape"
  },
  {
    "id": "suit-24",
    "title": "Tan Entourage",
    "tag": "Groomsmen Suiting",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.16.53 PM (1).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-25",
    "title": "Cognac Palette",
    "tag": "Champagne Groom",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.14 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-26",
    "title": "French Blue",
    "tag": "Gold Lapel Pin",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM (2).jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-27",
    "title": "Tan Groom",
    "tag": "Double Breasted",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM (1).jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-28",
    "title": "Worsted Fitting",
    "tag": "Bespoke Atelier",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.12 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-29",
    "title": "Charcoal Worsted",
    "tag": "Consultation Drape",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.13 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-30",
    "title": "Horseshoe Fitting",
    "tag": "Three-Piece Line",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.23 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-31",
    "title": "Skyline Stride",
    "tag": "Nairobi City",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 3.50.56 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-32",
    "title": "Navy Pinstripe",
    "tag": "Peak Lapel",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.10 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-33",
    "title": "Midnight Horseshoe",
    "tag": "Waistcoat Curve",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.12 PM.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-34",
    "title": "Slate Grey",
    "tag": "Silk Foulard",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.13 PM (1).jpeg",
    "aspect": "portrait"
  },
  {
    "id": "suit-35",
    "title": "Airforce Blue",
    "tag": "Wool Linen Two-Piece",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.13 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-36",
    "title": "Charcoal Birdseye",
    "tag": "Executive Weave",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-37",
    "title": "Classic Worsted",
    "tag": "Navy Single-Breasted",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-38",
    "title": "French Navy",
    "tag": "Two-Button Front",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.19 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-39",
    "title": "Sand Beige",
    "tag": "Crossover Waistcoat",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-40",
    "title": "Hacking Pocket",
    "tag": "Glen Plaid Slanted",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.24 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-41",
    "title": "Chalk Stripe",
    "tag": "Dark Worsted",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM.jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-42",
    "title": "Gold Tie Bar",
    "tag": "Pinstripe Accent",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM (1).jpeg",
    "aspect": "square"
  },
  {
    "id": "suit-43",
    "title": "Ticket Pocket",
    "tag": "Double Breasted",
    "category": "suits",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "suit-44",
    "title": "Cognac Groomsmen",
    "tag": "Wedding Entourage",
    "category": "suits",
    "image": "/images/DSC_0865-1.jpg.jpeg",
    "aspect": "landscape"
  },
  {
    "id": "sc-1",
    "title": "Tailored Blazer",
    "tag": "Double Breasted",
    "category": "smart-casual",
    "image": "/images/Blazer.jpg",
    "aspect": "landscape"
  },
  {
    "id": "sc-2",
    "title": "Beige Blazer",
    "tag": "Smart Casual",
    "category": "smart-casual",
    "image": "/images/smart-casual-beige-blazer-parking.jpeg",
    "aspect": "portrait"
  },
  {
    "id": "sc-4",
    "title": "Royal Blazer",
    "tag": "Gold Buttons",
    "category": "smart-casual",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM (1).jpeg",
    "aspect": "square"
  },
  {
    "id": "sc-5",
    "title": "Scarlet Blazer",
    "tag": "Statement Coat",
    "category": "smart-casual",
    "image": "/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM.jpeg",
    "aspect": "square"
  }
];
