/**
 * MODERN MAN KENYA - MASTER IMAGE & MEDIA REGISTRY
 * 
 * Comprehensive pre-analyzed catalogue of all visual assets across public/images
 * and public/images/more. Use this registry across all upcoming pages (Bespoke, RTW,
 * Occasions, Weddings, Gallery, The Craft, About, etc.) without needing to re-scan.
 */

export interface RegisteredMediaItem {
  id: string;
  filename: string;
  src: string;
  title: string; // 2 to 5 words
  category: 
    | 'kaunda-senator'
    | 'signature-african'
    | 'business-executive'
    | 'wedding-groom'
    | 'formal-eveningwear'
    | 'blazer-separates'
    | 'craft-atelier'
    | 'editorial'
    | 'brand-heritage';
  secondaryCategories: string[];
  tags: string[];
  aspect: 'portrait' | 'landscape' | 'square';
  width: number | null;
  height: number | null;
  size: number;
  suggestedPages: string[];
  featured: boolean;
}

export const MEDIA_REGISTRY: RegisteredMediaItem[] = [
  {
    "id": "root-1-bespoke-suit-jpg",
    "filename": "Bespoke Suit.jpg",
    "src": "/images/Bespoke Suit.jpg",
    "size": 50596,
    "width": 1024,
    "height": 682,
    "aspect": "landscape",
    "title": "Atelier Hand Canvas Padding",
    "category": "craft-atelier",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "floating-canvas",
      "horsehair",
      "atelier",
      "hand-padding",
      "bespoke"
    ],
    "suggestedPages": [
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "root-2-black-jpg",
    "filename": "Black.jpg",
    "src": "/images/Black.jpg",
    "size": 45164,
    "width": 1024,
    "height": 683,
    "aspect": "landscape",
    "title": "Midnight Barathea Floating Canvas",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "midnight-black",
      "barathea",
      "floating-canvas",
      "black-tie"
    ],
    "suggestedPages": [
      "/bespoke/bespoke-evening-wear",
      "/occasions/formal-eveningwear"
    ],
    "featured": false
  },
  {
    "id": "root-3-blazer-jpg",
    "filename": "Blazer.jpg",
    "src": "/images/Blazer.jpg",
    "size": 126392,
    "width": 1024,
    "height": 682,
    "aspect": "landscape",
    "title": "Tailored Double Breasted Blazer",
    "category": "blazer-separates",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "blazer",
      "double-breasted",
      "crest-buttons",
      "separates"
    ],
    "suggestedPages": [
      "/ready-to-wear",
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-4-brock-wegner-7yonarousby-unsplash-jpg",
    "filename": "brock-wegner-7yONARoUsbY-unsplash.jpg",
    "src": "/images/brock-wegner-7yONARoUsbY-unsplash.jpg",
    "size": 7894512,
    "width": 4298,
    "height": 6444,
    "aspect": "portrait",
    "title": "brock wegner 7yONARoUsbY unsplash",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-5-dsc04888-jpg",
    "filename": "DSC04888.jpg",
    "src": "/images/DSC04888.jpg",
    "size": 9481603,
    "width": 256,
    "height": 166,
    "aspect": "landscape",
    "title": "Outdoor Nuptial Ceremony Vows",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "wedding-vows",
      "groom",
      "outdoor-ceremony",
      "bespoke-suit"
    ],
    "suggestedPages": [
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "root-6-dsc04947-jpg",
    "filename": "DSC04947.jpg",
    "src": "/images/DSC04947.jpg",
    "size": 6663004,
    "width": 256,
    "height": 171,
    "aspect": "landscape",
    "title": "Bridal Party Garden Procession",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "bridal-party",
      "garden-wedding",
      "entourage",
      "suits"
    ],
    "suggestedPages": [
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "root-7-dsc04995-jpg",
    "filename": "DSC04995.jpg",
    "src": "/images/DSC04995.jpg",
    "size": 4630820,
    "width": 188,
    "height": 256,
    "aspect": "portrait",
    "title": "Three Piece Groom Nuptial Suit",
    "category": "wedding-groom",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "groom-suit",
      "three-piece",
      "horseshoe-vest",
      "wedding"
    ],
    "suggestedPages": [
      "/occasions/wedding-groom",
      "/bespoke/weddings",
      "/gallery"
    ],
    "featured": true
  },
  {
    "id": "root-8-dsc05022-jpg",
    "filename": "DSC05022.jpg",
    "src": "/images/DSC05022.jpg",
    "size": 7111561,
    "width": 172,
    "height": 256,
    "aspect": "portrait",
    "title": "Groom & Bride Reception Walk",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "reception-walk",
      "groom",
      "bride",
      "celebration"
    ],
    "suggestedPages": [
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": true
  },
  {
    "id": "root-9-dsc05098-jpg",
    "filename": "DSC05098.jpg",
    "src": "/images/DSC05098.jpg",
    "size": 6010516,
    "width": 256,
    "height": 171,
    "aspect": "landscape",
    "title": "Groomsmen Toast Celebration",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "groomsmen",
      "champagne-toast",
      "celebration",
      "wedding-party"
    ],
    "suggestedPages": [
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "root-10-erc-0341-jpg",
    "filename": "ERC_0341.JPG",
    "src": "/images/ERC_0341.JPG",
    "size": 1180128,
    "width": 170,
    "height": 256,
    "aspect": "portrait",
    "title": "Distinguished Executive Portrait",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "executive",
      "portrait",
      "tailored-suit",
      "nairobi"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "root-11-excellence--1--jpg",
    "filename": "Excellence (1).jpg",
    "src": "/images/Excellence (1).jpg",
    "size": 45808,
    "width": 1024,
    "height": 682,
    "aspect": "landscape",
    "title": "Heritage Sartorial Excellence",
    "category": "craft-atelier",
    "secondaryCategories": [
      "brand-heritage"
    ],
    "tags": [
      "heritage",
      "excellence",
      "craftsmanship",
      "atelier"
    ],
    "suggestedPages": [
      "/about",
      "/the-craft"
    ],
    "featured": false
  },
  {
    "id": "root-12-humberto-chavez-jsgzqvd-jkq-unsplash-jpg",
    "filename": "humberto-chavez-JsGZQvd_jkQ-unsplash.jpg",
    "src": "/images/humberto-chavez-JsGZQvd_jkQ-unsplash.jpg",
    "size": 492130,
    "width": 2400,
    "height": 3601,
    "aspect": "portrait",
    "title": "humberto chavez JsGZQvd jkQ unsplash",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-13-jonathan-francisca-yhbcum51jb0-unsplash-jpg",
    "filename": "jonathan-francisca-YHbcum51JB0-unsplash.jpg",
    "src": "/images/jonathan-francisca-YHbcum51JB0-unsplash.jpg",
    "size": 435707,
    "width": 2400,
    "height": 1600,
    "aspect": "landscape",
    "title": "jonathan francisca YHbcum51JB0 unsplash",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-14-kaunda-suit-jpeg",
    "filename": "kaunda suit.jpeg",
    "src": "/images/kaunda suit.jpeg",
    "size": 128066,
    "width": 914,
    "height": 1280,
    "aspect": "portrait",
    "title": "Asymmetric Cream Kaunda Suit",
    "category": "kaunda-senator",
    "secondaryCategories": [
      "signature-african",
      "wedding-groom"
    ],
    "tags": [
      "kaunda",
      "senator",
      "mandarin-collar",
      "african-luxury",
      "asymmetric"
    ],
    "suggestedPages": [
      "/bespoke/kaunda-suits",
      "/occasions/signature-occasion",
      "/gallery"
    ],
    "featured": true
  },
  {
    "id": "root-15-lkm-1600-jpg",
    "filename": "LKM_1600.jpg",
    "src": "/images/LKM_1600.jpg",
    "size": 1784331,
    "width": 3769,
    "height": 4711,
    "aspect": "portrait",
    "title": "Millimetric Pattern Drafting Table",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "pattern-drafting",
      "tailor-shears",
      "chalk",
      "atelier"
    ],
    "suggestedPages": [
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "root-16-lkm-1607-jpg",
    "filename": "LKM_1607.jpg",
    "src": "/images/LKM_1607.jpg",
    "size": 1634588,
    "width": 4554,
    "height": 3643,
    "aspect": "landscape",
    "title": "Hand Cutting Wool Suiting",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "hand-cutting",
      "shears",
      "wool-worsted",
      "craftsmanship"
    ],
    "suggestedPages": [
      "/the-craft",
      "/about"
    ],
    "featured": false
  },
  {
    "id": "root-17-lkm-1741-jpg",
    "filename": "LKM_1741.jpg",
    "src": "/images/LKM_1741.jpg",
    "size": 1616478,
    "width": 4016,
    "height": 6016,
    "aspect": "portrait",
    "title": "Basting Internal Floating Canvas",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "basting-stitch",
      "horsehair-canvas",
      "internal-structure"
    ],
    "suggestedPages": [
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "root-18-lkm-1745-jpg",
    "filename": "LKM_1745.jpg",
    "src": "/images/LKM_1745.jpg",
    "size": 2038226,
    "width": 4016,
    "height": 5020,
    "aspect": "portrait",
    "title": "Hand Pressed Collar Shaping",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "iron-pressing",
      "collar-shaping",
      "traditional-tailoring"
    ],
    "suggestedPages": [
      "/the-craft"
    ],
    "featured": false
  },
  {
    "id": "root-19-lkm-1755-jpg",
    "filename": "LKM_1755.jpg",
    "src": "/images/LKM_1755.jpg",
    "size": 1918054,
    "width": 6016,
    "height": 4016,
    "aspect": "landscape",
    "title": "Shoulder Pad Alignment Fitting",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "shoulder-alignment",
      "anatomical-fit",
      "master-tailor"
    ],
    "suggestedPages": [
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "root-20-lkm-1776-jpg",
    "filename": "LKM_1776.jpg",
    "src": "/images/LKM_1776.jpg",
    "size": 1559289,
    "width": 5020,
    "height": 4016,
    "aspect": "landscape",
    "title": "Hand Sewn Milanese Buttonhole",
    "category": "craft-atelier",
    "secondaryCategories": [
      "details-finishing"
    ],
    "tags": [
      "milanese-buttonhole",
      "silk-twist",
      "hand-sewn",
      "lapel"
    ],
    "suggestedPages": [
      "/the-craft",
      "/gallery"
    ],
    "featured": true
  },
  {
    "id": "root-21-lkm-1793-jpg",
    "filename": "LKM_1793.jpg",
    "src": "/images/LKM_1793.jpg",
    "size": 1678060,
    "width": 4987,
    "height": 3990,
    "aspect": "landscape",
    "title": "Final Steaming & Inspection",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "final-inspection",
      "steaming",
      "ready-for-handover"
    ],
    "suggestedPages": [
      "/the-craft",
      "/about"
    ],
    "featured": false
  },
  {
    "id": "root-22-logo-emblem-png",
    "filename": "logo-emblem.png",
    "src": "/images/logo-emblem.png",
    "size": 46826,
    "width": 1020,
    "height": 840,
    "aspect": "landscape",
    "title": "logo emblem",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-23-logo-full-png",
    "filename": "logo-full.png",
    "src": "/images/logo-full.png",
    "size": 99343,
    "width": 1531,
    "height": 1372,
    "aspect": "square",
    "title": "logo full",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-24-logo-png",
    "filename": "logo.png",
    "src": "/images/logo.png",
    "size": 97755,
    "width": 1380,
    "height": 1240,
    "aspect": "square",
    "title": "logo",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-25-logo-svg",
    "filename": "logo.svg",
    "src": "/images/logo.svg",
    "size": 93536,
    "width": null,
    "height": null,
    "aspect": "portrait",
    "title": "logo",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-26-modern-man-logo-final-jpg",
    "filename": "Modern Man Logo FINAL.jpg",
    "src": "/images/Modern Man Logo FINAL.jpg",
    "size": 287559,
    "width": 160,
    "height": 143,
    "aspect": "square",
    "title": "Modern Man Logo FINAL",
    "category": "editorial",
    "secondaryCategories": [],
    "tags": [
      "bespoke",
      "modern-man-kenya"
    ],
    "suggestedPages": [
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-27-mok-1920-jpg",
    "filename": "MOK_1920.jpg",
    "src": "/images/MOK_1920.jpg",
    "size": 6325218,
    "width": 4068,
    "height": 5086,
    "aspect": "portrait",
    "title": "Black Tie Studio Profile",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "black-tie",
      "studio",
      "satin-lapel",
      "gala"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-28-mok-2101-jpg",
    "filename": "MOK_2101.jpg",
    "src": "/images/MOK_2101.jpg",
    "size": 6188844,
    "width": 4114,
    "height": 6171,
    "aspect": "portrait",
    "title": "Black Satin Peak Tuxedo",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "satin-peak",
      "tuxedo",
      "black-tie",
      "formal"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": true
  },
  {
    "id": "root-29-mok-2129-jpg",
    "filename": "MOK_2129.jpg",
    "src": "/images/MOK_2129.jpg",
    "size": 7174771,
    "width": 4127,
    "height": 6192,
    "aspect": "portrait",
    "title": "Gala Eveningwear Stance",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "gala",
      "eveningwear",
      "black-tie",
      "tailored"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-30-mok-2142-jpg",
    "filename": "MOK_2142.jpg",
    "src": "/images/MOK_2142.jpg",
    "size": 6439561,
    "width": 4115,
    "height": 6172,
    "aspect": "portrait",
    "title": "Sartorial Contrast Lapel Dinner Suit",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "contrast-lapel",
      "dinner-suit",
      "evening",
      "bowtie"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "root-31-mok-2146--1--jpg",
    "filename": "MOK_2146 (1).jpg",
    "src": "/images/MOK_2146 (1).jpg",
    "size": 5877173,
    "width": 3800,
    "height": 5699,
    "aspect": "portrait",
    "title": "Editorial Black Tie Full Length",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "black-tie",
      "full-length",
      "tuxedo",
      "studio"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-32-mok-2154-jpg",
    "filename": "MOK_2154.jpg",
    "src": "/images/MOK_2154.jpg",
    "size": 7134672,
    "width": 4073,
    "height": 6109,
    "aspect": "portrait",
    "title": "Emerald Velvet Smoking Jacket",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "blazer-separates"
    ],
    "tags": [
      "emerald-green",
      "velvet",
      "smoking-jacket",
      "shawl-lapel"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/gallery",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": true
  },
  {
    "id": "root-33-mok-2171-jpg",
    "filename": "MOK_2171.jpg",
    "src": "/images/MOK_2171.jpg",
    "size": 6206513,
    "width": 3929,
    "height": 5894,
    "aspect": "portrait",
    "title": "Navy Velvet Dinner Jacket",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "blazer-separates"
    ],
    "tags": [
      "navy-velvet",
      "dinner-jacket",
      "satin-facing",
      "luxury"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-34-mok-2198-jpg",
    "filename": "MOK_2198.jpg",
    "src": "/images/MOK_2198.jpg",
    "size": 8168085,
    "width": 4022,
    "height": 6033,
    "aspect": "portrait",
    "title": "Royal Navy Peak Lapel Suit",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "royal-navy",
      "peak-lapel",
      "executive-cut"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "root-35-mok-2204-jpg",
    "filename": "MOK_2204.jpg",
    "src": "/images/MOK_2204.jpg",
    "size": 7994178,
    "width": 3931,
    "height": 5897,
    "aspect": "portrait",
    "title": "Houndstooth Evening Waistcoat Set",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "houndstooth",
      "evening-waistcoat",
      "tuxedo-set"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/occasions/wedding-groom"
    ],
    "featured": false
  },
  {
    "id": "root-36-mok-2219-jpg",
    "filename": "MOK_2219.jpg",
    "src": "/images/MOK_2219.jpg",
    "size": 10064482,
    "width": 4028,
    "height": 6041,
    "aspect": "portrait",
    "title": "Velvet Dinner Coat in Motion",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "velvet",
      "motion",
      "opulence",
      "sartorial"
    ],
    "suggestedPages": [
      "/occasions/formal-eveningwear",
      "/gallery"
    ],
    "featured": true
  },
  {
    "id": "root-37-mok-7655-jpg",
    "filename": "MOK_7655.jpg",
    "src": "/images/MOK_7655.jpg",
    "size": 9745653,
    "width": 128,
    "height": 160,
    "aspect": "portrait",
    "title": "Nairobi Boardroom Royal Blue",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "royal-blue",
      "boardroom",
      "two-piece",
      "power-suit"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/bespoke/bespoke-suits",
      "/gallery"
    ],
    "featured": true
  },
  {
    "id": "root-38-mok-7660-jpg",
    "filename": "MOK_7660.jpg",
    "src": "/images/MOK_7660.jpg",
    "size": 8896136,
    "width": 128,
    "height": 160,
    "aspect": "portrait",
    "title": "Double Breasted Chalkstripe Suit",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "chalkstripe",
      "double-breasted",
      "peak-lapel",
      "power-suit"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "root-39-mok-7662-jpg",
    "filename": "MOK_7662.jpg",
    "src": "/images/MOK_7662.jpg",
    "size": 9424853,
    "width": 128,
    "height": 160,
    "aspect": "portrait",
    "title": "Classic Slate Three Piece Suit",
    "category": "business-executive",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "slate-grey",
      "three-piece",
      "horseshoe-waistcoat",
      "executive"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "root-40-mok-7688-jpg",
    "filename": "MOK_7688.jpg",
    "src": "/images/MOK_7688.jpg",
    "size": 9120468,
    "width": 128,
    "height": 160,
    "aspect": "portrait",
    "title": "Charcoal Glen Plaid Executive",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "glen-plaid",
      "charcoal",
      "wool",
      "hacking-pockets"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/gallery"
    ],
    "featured": false
  },
  {
    "id": "root-41-mok-7716-jpg",
    "filename": "MOK_7716.jpg",
    "src": "/images/MOK_7716.jpg",
    "size": 6523580,
    "width": 128,
    "height": 160,
    "aspect": "portrait",
    "title": "Deep Navy Flannel Suit",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "navy-flannel",
      "wool-worsted",
      "classic-tailoring"
    ],
    "suggestedPages": [
      "/occasions/business-executive",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "root-42-slide-jpeg",
    "filename": "slide.jpeg",
    "src": "/images/slide.jpeg",
    "size": 46013,
    "width": 1080,
    "height": 840,
    "aspect": "landscape",
    "title": "Surgeon Cuffs & French Cuffs",
    "category": "craft-atelier",
    "secondaryCategories": [
      "business-executive",
      "details-finishing"
    ],
    "tags": [
      "surgeon-cuffs",
      "french-cuffs",
      "horn-buttons",
      "sleeve-detail",
      "atelier"
    ],
    "suggestedPages": [
      "/the-craft",
      "/occasions/business-executive",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "root-43-tuxedo-jpeg",
    "filename": "tuxedo.jpeg",
    "src": "/images/tuxedo.jpeg",
    "size": 630034,
    "width": 1703,
    "height": 2560,
    "aspect": "portrait",
    "title": "Ivory Black Shawl Tuxedo",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom",
      "tuxedos"
    ],
    "tags": [
      "tuxedo",
      "ivory",
      "shawl-lapel",
      "black-tie",
      "gala",
      "altar"
    ],
    "suggestedPages": [
      "/bespoke/bespoke-evening-wear",
      "/occasions/formal-eveningwear",
      "/occasions/wedding-groom",
      "/gallery"
    ],
    "featured": true
  },
  {
    "id": "root-44--mg-3310-jpg",
    "filename": "_MG_3310.jpg",
    "src": "/images/_MG_3310.jpg",
    "size": 3034888,
    "width": 171,
    "height": 256,
    "aspect": "portrait",
    "title": "Sartorial Silhouette Model Spread",
    "category": "editorial",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "editorial",
      "silhouette",
      "bespoke-tailoring"
    ],
    "suggestedPages": [
      "/gallery",
      "/lookbook"
    ],
    "featured": false
  },
  {
    "id": "more-1",
    "filename": "WhatsApp Image 2026-10-19 at 3.41.30 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.41.30 PM.jpeg",
    "size": 200612,
    "width": 1600,
    "height": 1068,
    "aspect": "landscape",
    "title": "Master Tailor Anatomical Measurement",
    "category": "craft-atelier",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "tape-measure",
      "master-tailor",
      "chest-calibration",
      "atelier"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "more-2",
    "filename": "WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg",
    "size": 101610,
    "width": 960,
    "height": 1280,
    "aspect": "portrait",
    "title": "Ivory Double Breasted Highland Groom",
    "category": "wedding-groom",
    "secondaryCategories": [
      "formal-eveningwear"
    ],
    "tags": [
      "highland-wedding",
      "ivory-suit",
      "tea-estate",
      "groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": true
  },
  {
    "id": "more-3",
    "filename": "WhatsApp Image 2026-10-19 at 3.47.54 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.47.54 PM.jpeg",
    "size": 127280,
    "width": 868,
    "height": 1280,
    "aspect": "portrait",
    "title": "Tea Plantation Romance Portrait",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "tea-plantation",
      "couples-portrait",
      "nuptials",
      "highland"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-4",
    "filename": "WhatsApp Image 2026-10-19 at 3.47.56 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.47.56 PM.jpeg",
    "size": 71998,
    "width": 684,
    "height": 1025,
    "aspect": "portrait",
    "title": "Highland Altar Boutonniere Close Up",
    "category": "wedding-groom",
    "secondaryCategories": [
      "craft-atelier"
    ],
    "tags": [
      "boutonniere",
      "lapel",
      "cream-suit",
      "groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-5",
    "filename": "WhatsApp Image 2026-10-19 at 3.47.59 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.47.59 PM.jpeg",
    "size": 102873,
    "width": 886,
    "height": 1280,
    "aspect": "portrait",
    "title": "Ivory Jacket Black Trouser Stride",
    "category": "wedding-groom",
    "secondaryCategories": [
      "formal-eveningwear"
    ],
    "tags": [
      "ivory-jacket",
      "tea-estate",
      "contrast-facing",
      "groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-6",
    "filename": "WhatsApp Image 2026-10-19 at 3.48.53 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.48.53 PM.jpeg",
    "size": 102873,
    "width": 886,
    "height": 1280,
    "aspect": "portrait",
    "title": "Highland Garden Romance Stride",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "highland-garden",
      "wedding-couple",
      "greenery"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-7",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.12 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.12 PM.jpeg",
    "size": 127280,
    "width": 868,
    "height": 1280,
    "aspect": "portrait",
    "title": "Bespoke Navy Two Piece Fitting",
    "category": "business-executive",
    "secondaryCategories": [
      "bespoke-suits"
    ],
    "tags": [
      "navy-suit",
      "fitting-room",
      "bespoke-tailor"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-8",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.13 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.13 PM.jpeg",
    "size": 71998,
    "width": 684,
    "height": 1025,
    "aspect": "portrait",
    "title": "Charcoal Worsted Consultation Fitting",
    "category": "business-executive",
    "secondaryCategories": [
      "bespoke-suits"
    ],
    "tags": [
      "charcoal-worsted",
      "fitting-mirror",
      "two-piece"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-9",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.14 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.14 PM.jpeg",
    "size": 79781,
    "width": 769,
    "height": 1025,
    "aspect": "portrait",
    "title": "Architectural Ivory Evening Jacket",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "ivory-jacket",
      "double-monks",
      "studio-fitting",
      "tuxedo"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "more-10",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.15 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.15 PM.jpeg",
    "size": 35965,
    "width": 769,
    "height": 1025,
    "aspect": "portrait",
    "title": "Master Tailor Lapel Adjustment",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "lapel-adjustment",
      "master-tailor",
      "fitting-session"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "more-11",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.17 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.17 PM.jpeg",
    "size": 77964,
    "width": 769,
    "height": 1025,
    "aspect": "portrait",
    "title": "Full Floating Canvas Drape Check",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-suits"
    ],
    "tags": [
      "canvas-drape",
      "fitting-room",
      "bespoke-cut"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "more-12",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.19 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.19 PM.jpeg",
    "size": 28676,
    "width": 684,
    "height": 1025,
    "aspect": "portrait",
    "title": "Shoulder Slope Millimetric Check",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-suits"
    ],
    "tags": [
      "shoulder-slope",
      "fitting-studio",
      "precision"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "more-13",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.23 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.23 PM.jpeg",
    "size": 41729,
    "width": 684,
    "height": 1025,
    "aspect": "portrait",
    "title": "Navy Three Piece Horseshoe Vest Fitting",
    "category": "business-executive",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "horseshoe-vest",
      "three-piece",
      "navy-suit"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-14",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.26 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.26 PM.jpeg",
    "size": 39440,
    "width": 684,
    "height": 1025,
    "aspect": "portrait",
    "title": "Editorial Lapel Drape Monochrome",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "craft-atelier"
    ],
    "tags": [
      "monochrome",
      "lapel-drape",
      "editorial-portrait"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "more-15",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.31 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.31 PM.jpeg",
    "size": 40367,
    "width": 684,
    "height": 1025,
    "aspect": "portrait",
    "title": "Sleeve Pitch Balance Inspection",
    "category": "craft-atelier",
    "secondaryCategories": [
      "details-finishing"
    ],
    "tags": [
      "sleeve-pitch",
      "armhole-scye",
      "atelier-discipline"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "more-16",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.36 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.36 PM.jpeg",
    "size": 70093,
    "width": 1280,
    "height": 720,
    "aspect": "landscape",
    "title": "Cloth Bunch Consultation Session",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "cloth-bunch",
      "swatch-book",
      "scabal-huddersfield"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "more-17",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.45 PM.jpeg",
    "size": 87259,
    "width": 1121,
    "height": 631,
    "aspect": "landscape",
    "title": "Jacquard Dinner Coat & Golden Cane",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom",
      "signature-african"
    ],
    "tags": [
      "jacquard",
      "golden-cane",
      "lion-head",
      "monarch-wear"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": true
  },
  {
    "id": "more-18",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.49 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.49 PM.jpeg",
    "size": 72341,
    "width": 1280,
    "height": 720,
    "aspect": "landscape",
    "title": "Monarch Jacquard Standing Portrait",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "signature-african"
    ],
    "tags": [
      "jacquard",
      "standing-portrait",
      "ceremonial-gala"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "more-19",
    "filename": "WhatsApp Image 2026-10-19 at 3.50.56 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.50.56 PM.jpeg",
    "size": 92443,
    "width": 914,
    "height": 1280,
    "aspect": "portrait",
    "title": "Nairobi Skyline Executive Stroll",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "nairobi-skyline",
      "executive-suit",
      "urban-stride"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-20",
    "filename": "WhatsApp Image 2026-10-19 at 3.51.00 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.51.00 PM.jpeg",
    "size": 128066,
    "width": 914,
    "height": 1280,
    "aspect": "portrait",
    "title": "Bespoke Navy Patch Pocket Blazer",
    "category": "blazer-separates",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "patch-pocket",
      "navy-blazer",
      "horn-buttons"
    ],
    "suggestedPages": [
      "/gallery",
      "/ready-to-wear"
    ],
    "featured": false
  },
  {
    "id": "more-21",
    "filename": "WhatsApp Image 2026-10-19 at 3.51.08 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.51.08 PM.jpeg",
    "size": 102606,
    "width": 1024,
    "height": 1280,
    "aspect": "portrait",
    "title": "Groomsmen Champagne Toast Dressing",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "champagne-toast",
      "groomsmen-dressing",
      "celebration"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-22",
    "filename": "WhatsApp Image 2026-10-19 at 3.51.41 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.51.41 PM.jpeg",
    "size": 69381,
    "width": 769,
    "height": 1025,
    "aspect": "portrait",
    "title": "Groom Champagne Flute Toast",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "groom-toast",
      "champagne-flute",
      "celebratory"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-23",
    "filename": "WhatsApp Image 2026-10-19 at 3.54.58 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.54.58 PM.jpeg",
    "size": 115424,
    "width": 959,
    "height": 1280,
    "aspect": "portrait",
    "title": "Ceremonial African Entourage Procession",
    "category": "signature-african",
    "secondaryCategories": [
      "kaunda-senator"
    ],
    "tags": [
      "african-procession",
      "ceremonial-tunics",
      "dowry-party"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-24",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.00 PM.jpeg",
    "size": 74139,
    "width": 914,
    "height": 1280,
    "aspect": "portrait",
    "title": "Ceremonial Gold Cap & Coral Beads",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "gold-cap",
      "coral-beads",
      "african-vows",
      "sacred-dowry"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-25",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.06 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.06 PM.jpeg",
    "size": 107337,
    "width": 1024,
    "height": 1280,
    "aspect": "portrait",
    "title": "Ruracio Joyful Entourage Dance",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "ruracio-dance",
      "entourage",
      "african-celebration"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-26",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.21 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.21 PM.jpeg",
    "size": 150305,
    "width": 1280,
    "height": 914,
    "aspect": "landscape",
    "title": "Traditional Groomsmen Flywhisk Line",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "flywhisk-line",
      "traditional-groomsmen",
      "ceremonial-tunics"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-27",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg",
    "size": 142842,
    "width": 1024,
    "height": 1280,
    "aspect": "portrait",
    "title": "Emerald Caps & Flywhisks Entourage",
    "category": "signature-african",
    "secondaryCategories": [
      "kaunda-senator"
    ],
    "tags": [
      "emerald-caps",
      "flywhisks",
      "senator-suits",
      "ruracio-groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": true
  },
  {
    "id": "more-28",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.28 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.28 PM.jpeg",
    "size": 123987,
    "width": 914,
    "height": 1280,
    "aspect": "portrait",
    "title": "Traditional Nuptial Joy Celebration",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "nuptial-joy",
      "traditional-bride-groom",
      "cultural-pride"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-29",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.34 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.34 PM.jpeg",
    "size": 118607,
    "width": 1280,
    "height": 853,
    "aspect": "landscape",
    "title": "Cultural Procession Sacred Steps",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "sacred-procession",
      "traditional-attire",
      "kenyan-heritage"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-30",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.38 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.38 PM.jpeg",
    "size": 104066,
    "width": 854,
    "height": 1280,
    "aspect": "portrait",
    "title": "Ruracio Dowry Elders Blessing",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "dowry-blessing",
      "elders",
      "traditional-ceremony"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-31",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.46 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.46 PM.jpeg",
    "size": 103020,
    "width": 854,
    "height": 1280,
    "aspect": "portrait",
    "title": "Sacred Cultural Nuptials Couple",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "sacred-nuptials",
      "cultural-couple",
      "african-heritage"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-32",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.48 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.48 PM.jpeg",
    "size": 141803,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Garden Procession Cultural Walk",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "garden-walk",
      "cultural-tunics",
      "celebration"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-33",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.49 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.49 PM.jpeg",
    "size": 213960,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Carved Antelope Cane & Velvet Cap",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "antelope-cane",
      "velvet-cap",
      "ceremonial-groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-34",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.53 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.53 PM.jpeg",
    "size": 201826,
    "width": 1280,
    "height": 853,
    "aspect": "landscape",
    "title": "Ruracio Cowhide Beaded Vest Dance",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "cowhide-vest",
      "beaded-vest",
      "walking-canes",
      "ruracio-dance"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": true
  },
  {
    "id": "more-35",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.55 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.55 PM.jpeg",
    "size": 201383,
    "width": 851,
    "height": 1280,
    "aspect": "portrait",
    "title": "Dowry Procession Walking Canes",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "walking-canes",
      "dowry-procession",
      "african-tradition"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-36",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.56 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.56 PM.jpeg",
    "size": 100874,
    "width": 1044,
    "height": 696,
    "aspect": "landscape",
    "title": "Dowry Gathering Sartorial Pride",
    "category": "signature-african",
    "secondaryCategories": [
      "kaunda-senator"
    ],
    "tags": [
      "dowry-gathering",
      "sartorial-pride",
      "african-tunics"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-37",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.57 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.57 PM.jpeg",
    "size": 78354,
    "width": 1280,
    "height": 914,
    "aspect": "landscape",
    "title": "Traditional Groom Entrance March",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "groom-entrance",
      "march",
      "traditional-celebration"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-38",
    "filename": "WhatsApp Image 2026-10-19 at 3.55.58 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.55.58 PM.jpeg",
    "size": 117714,
    "width": 914,
    "height": 1280,
    "aspect": "portrait",
    "title": "Cultural Wedding Grand Gateway",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "grand-gateway",
      "cultural-entrance",
      "heritage"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-39",
    "filename": "WhatsApp Image 2026-10-19 at 3.56.01 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.56.01 PM.jpeg",
    "size": 91052,
    "width": 1024,
    "height": 1280,
    "aspect": "portrait",
    "title": "Celebratory Garden Festivities Attire",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "garden-festivities",
      "ceremonial-suits",
      "celebration"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-40",
    "filename": "WhatsApp Image 2026-10-19 at 3.56.04 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 3.56.04 PM.jpeg",
    "size": 118924,
    "width": 1024,
    "height": 1280,
    "aspect": "portrait",
    "title": "African Nuptial Community Toast",
    "category": "signature-african",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "community-toast",
      "african-nuptials",
      "joyful"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-41",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.39 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.39 PM.jpeg",
    "size": 267533,
    "width": 1011,
    "height": 1280,
    "aspect": "portrait",
    "title": "Hand Shears Pattern Scribing",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "hand-shears",
      "chalk-scribing",
      "pattern-cutting",
      "atelier"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": true
  },
  {
    "id": "more-42",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.43 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.43 PM.jpeg",
    "size": 81504,
    "width": 844,
    "height": 1126,
    "aspect": "portrait",
    "title": "Horsehair Canvas Basting Stitches",
    "category": "craft-atelier",
    "secondaryCategories": [
      "bespoke-process"
    ],
    "tags": [
      "basting-stitches",
      "floating-canvas",
      "horsehair",
      "atelier"
    ],
    "suggestedPages": [
      "/gallery",
      "/the-craft",
      "/bespoke/bespoke-suits"
    ],
    "featured": false
  },
  {
    "id": "more-43",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.50 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.50 PM.jpeg",
    "size": 125163,
    "width": 1138,
    "height": 760,
    "aspect": "landscape",
    "title": "Rose Petal Altar Garden Entrance",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "rose-petal-aisle",
      "garden-wedding",
      "bride-groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-44",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.51 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM (1).jpeg",
    "size": 286625,
    "width": 1138,
    "height": 760,
    "aspect": "landscape",
    "title": "Rose Petal Aisle Nuptial Walk",
    "category": "wedding-groom",
    "secondaryCategories": [
      "formal-eveningwear"
    ],
    "tags": [
      "rose-petals",
      "aisle-walk",
      "navy-suit",
      "champagne-vest"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": true
  },
  {
    "id": "more-45",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.51 PM (2).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM (2).jpeg",
    "size": 109840,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Garden Nuptial Entourage Gathering",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "nuptial-entourage",
      "garden-wedding",
      "coordinated-suits"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-46",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.51 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.51 PM.jpeg",
    "size": 172347,
    "width": 1138,
    "height": 760,
    "aspect": "landscape",
    "title": "Garden Reception Entourage Entrance",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "garden-reception",
      "entourage-entrance",
      "bespoke-suits"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-47",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.52 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.52 PM (1).jpeg",
    "size": 104907,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Outdoor Groomsmen Lineup Smile",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "groomsmen-lineup",
      "smile",
      "tailored-suits"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-48",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.52 PM (2).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.52 PM (2).jpeg",
    "size": 32305,
    "width": 1280,
    "height": 853,
    "aspect": "landscape",
    "title": "Celebratory Groomsmen Laughter",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "groomsmen-laughter",
      "camaraderie",
      "celebration"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-49",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.52 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.52 PM.jpeg",
    "size": 119197,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Garden Altar Bridal Procession",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "bridal-procession",
      "three-piece-suit",
      "garden-wedding"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-50",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.53 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.53 PM (1).jpeg",
    "size": 113744,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Tan Suit Groomsmen Camaraderie",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "tan-suit",
      "camaraderie",
      "groomsmen-party"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-51",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.53 PM (2).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.53 PM (2).jpeg",
    "size": 120938,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "Entourage Coordinated Suiting Palette",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "coordinated-palette",
      "champagne-navy",
      "entourage"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-52",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.53 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.53 PM.jpeg",
    "size": 122856,
    "width": 1280,
    "height": 853,
    "aspect": "landscape",
    "title": "Groom & Groomsmen Candid Joy",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "candid-joy",
      "wedding-smiles",
      "bespoke-groom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-53",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.54 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (1).jpeg",
    "size": 338313,
    "width": 1138,
    "height": 760,
    "aspect": "landscape",
    "title": "Minimalist Ivory Senator Tunic",
    "category": "kaunda-senator",
    "secondaryCategories": [
      "signature-african"
    ],
    "tags": [
      "senator-tunic",
      "ivory",
      "minimalist-collar",
      "african-statesman"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-54",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.54 PM (2).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM (2).jpeg",
    "size": 294440,
    "width": 1138,
    "height": 760,
    "aspect": "landscape",
    "title": "Embroidered Placket Senator Cut",
    "category": "kaunda-senator",
    "secondaryCategories": [
      "signature-african"
    ],
    "tags": [
      "embroidered-placket",
      "senator-cut",
      "mandarin-collar"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-55",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.54 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.54 PM.jpeg",
    "size": 115108,
    "width": 853,
    "height": 1280,
    "aspect": "portrait",
    "title": "White Senator Tunic Ankara Panel",
    "category": "kaunda-senator",
    "secondaryCategories": [
      "signature-african"
    ],
    "tags": [
      "ankara-panel",
      "senator-tunic",
      "african-modernity"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": true
  },
  {
    "id": "more-56",
    "filename": "WhatsApp Image 2026-10-19 at 4.16.55 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.16.55 PM.jpeg",
    "size": 134726,
    "width": 754,
    "height": 1132,
    "aspect": "portrait",
    "title": "African Ankara Accent Pocket Square",
    "category": "signature-african",
    "secondaryCategories": [
      "blazer-separates"
    ],
    "tags": [
      "ankara-accent",
      "pocket-square",
      "bespoke-blazer"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-57",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.10 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.10 PM.jpeg",
    "size": 68349,
    "width": 1000,
    "height": 1250,
    "aspect": "portrait",
    "title": "Navy Pinstripe Peak Lapel Detail",
    "category": "business-executive",
    "secondaryCategories": [
      "craft-atelier"
    ],
    "tags": [
      "navy-pinstripe",
      "peak-lapel",
      "pick-stitching"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-58",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.12 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.12 PM.jpeg",
    "size": 269450,
    "width": 1080,
    "height": 1265,
    "aspect": "portrait",
    "title": "Midnight Navy Horseshoe Waistcoat",
    "category": "business-executive",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "horseshoe-waistcoat",
      "double-breasted-vest",
      "three-piece",
      "navy-suit"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": true
  },
  {
    "id": "more-59",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.13 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.13 PM (1).jpeg",
    "size": 85038,
    "width": 1070,
    "height": 1280,
    "aspect": "portrait",
    "title": "Slate Grey Boardroom Silk Foulard",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "slate-grey",
      "silk-foulard",
      "boardroom-suit"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-60",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.13 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.13 PM.jpeg",
    "size": 103133,
    "width": 1080,
    "height": 1080,
    "aspect": "square",
    "title": "Airforce Blue Wool Linen Two Piece",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "airforce-blue",
      "wool-linen",
      "two-button-cut"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-61",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.14 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.14 PM.jpeg",
    "size": 74663,
    "width": 1063,
    "height": 1080,
    "aspect": "square",
    "title": "Cognac Groomsmen & Champagne Groom",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "cognac-groomsmen",
      "champagne-groom",
      "tobacco-palette"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": true
  },
  {
    "id": "more-62",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.15 PM.jpeg",
    "size": 107003,
    "width": 1080,
    "height": 1080,
    "aspect": "square",
    "title": "Charcoal Birdseye Executive Suit",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "charcoal-birdseye",
      "super-150s",
      "two-button-cut",
      "boardroom"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": true
  },
  {
    "id": "more-63",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.17 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM (1).jpeg",
    "size": 114455,
    "width": 1440,
    "height": 1440,
    "aspect": "square",
    "title": "Royal Blue Double Breasted Blazer",
    "category": "blazer-separates",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "royal-blue",
      "double-breasted",
      "brass-buttons"
    ],
    "suggestedPages": [
      "/gallery",
      "/ready-to-wear"
    ],
    "featured": false
  },
  {
    "id": "more-64",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.17 PM (2).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM (2).jpeg",
    "size": 277461,
    "width": 1440,
    "height": 1440,
    "aspect": "square",
    "title": "French Blue Gold Flower Lapel",
    "category": "wedding-groom",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "french-blue",
      "boutonniere-pin",
      "tailored-suit"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-65",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.17 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.17 PM.jpeg",
    "size": 68776,
    "width": 1280,
    "height": 1280,
    "aspect": "square",
    "title": "Classic Navy Worsted Single Breasted",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "classic-navy",
      "single-breasted",
      "white-shirt"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-66",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.18 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM (1).jpeg",
    "size": 82461,
    "width": 1080,
    "height": 1069,
    "aspect": "square",
    "title": "Tan Double Breasted Groom Laughter",
    "category": "wedding-groom",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "tan-double-breasted",
      "groom-laughter",
      "groomsmen-moment"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/wedding-groom",
      "/bespoke/weddings"
    ],
    "featured": false
  },
  {
    "id": "more-67",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.18 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.18 PM.jpeg",
    "size": 67138,
    "width": 1280,
    "height": 1280,
    "aspect": "square",
    "title": "Navy Glen Check Tuxedo Waistcoat",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "business-executive"
    ],
    "tags": [
      "glen-check-waistcoat",
      "black-tie",
      "micro-dot-bowtie"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "more-68",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.19 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.19 PM.jpeg",
    "size": 67373,
    "width": 1280,
    "height": 1280,
    "aspect": "square",
    "title": "French Navy Two Button Executive",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "french-navy",
      "hand-rolled-lapel",
      "two-piece"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-69",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.21 PM.jpeg",
    "size": 336377,
    "width": 1600,
    "height": 1600,
    "aspect": "square",
    "title": "Sand Beige Crossover Waistcoat Set",
    "category": "business-executive",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "sand-beige",
      "crossover-waistcoat",
      "daylight-suit",
      "horn-buttons"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-70",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.22 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.22 PM.jpeg",
    "size": 59407,
    "width": 1280,
    "height": 1280,
    "aspect": "square",
    "title": "Definitive Black Tie Horseshoe Tuxedo",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "black-tie",
      "horseshoe-vest",
      "barathea-wool",
      "satin-lapel"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": true
  },
  {
    "id": "more-71",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.23 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (1).jpeg",
    "size": 141271,
    "width": 1600,
    "height": 1600,
    "aspect": "square",
    "title": "Midnight Single Button Burgundy Bow",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "midnight-navy",
      "single-button",
      "burgundy-bowtie"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "more-72",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.23 PM (2).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM (2).jpeg",
    "size": 172919,
    "width": 917,
    "height": 1220,
    "aspect": "portrait",
    "title": "Check Suit Historic Locomotive Stride",
    "category": "signature-african",
    "secondaryCategories": [
      "blazer-separates",
      "editorial"
    ],
    "tags": [
      "steam-locomotive",
      "nairobi-railway",
      "check-suit",
      "heritage-stride"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/signature-occasion",
      "/bespoke/kaunda-suits"
    ],
    "featured": false
  },
  {
    "id": "more-73",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.23 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.23 PM.jpeg",
    "size": 324479,
    "width": 1600,
    "height": 1600,
    "aspect": "square",
    "title": "Crimson Scarlet Statement Blazer",
    "category": "blazer-separates",
    "secondaryCategories": [
      "signature-african"
    ],
    "tags": [
      "crimson-scarlet",
      "statement-blazer",
      "houndstooth-pocket-square"
    ],
    "suggestedPages": [
      "/gallery",
      "/ready-to-wear"
    ],
    "featured": true
  },
  {
    "id": "more-74",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.24 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.24 PM.jpeg",
    "size": 79769,
    "width": 1280,
    "height": 1280,
    "aspect": "square",
    "title": "Charcoal Glen Plaid Hacking Flap",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "glen-plaid",
      "hacking-flap",
      "british-cut",
      "charcoal"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-75",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.25 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM (1).jpeg",
    "size": 179714,
    "width": 1283,
    "height": 1599,
    "aspect": "portrait",
    "title": "Stone Ivory Double Breasted Ascot",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "wedding-groom"
    ],
    "tags": [
      "stone-ivory",
      "double-breasted",
      "ascot-cravat",
      "gala-lounge"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": false
  },
  {
    "id": "more-76",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.25 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.25 PM.jpeg",
    "size": 78092,
    "width": 985,
    "height": 984,
    "aspect": "square",
    "title": "Dark Navy Chalk Stripe Worsted",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "chalk-stripe",
      "worsted-wool",
      "power-silhouette",
      "peak-lapel"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-77",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.26 PM (1).jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM (1).jpeg",
    "size": 76910,
    "width": 1280,
    "height": 1280,
    "aspect": "square",
    "title": "Executive Pinstripe Tie Bar Accent",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "pinstripe",
      "tie-bar",
      "double-vented",
      "leadership"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-78",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.26 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.26 PM.jpeg",
    "size": 46013,
    "width": 1080,
    "height": 840,
    "aspect": "landscape",
    "title": "Navy Double Breasted Ticket Pocket",
    "category": "business-executive",
    "secondaryCategories": [
      "editorial"
    ],
    "tags": [
      "double-breasted",
      "ticket-pocket",
      "navy-wool"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/business-executive",
      "/bespoke/corporate-wardrobes"
    ],
    "featured": false
  },
  {
    "id": "more-79",
    "filename": "WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg",
    "src": "/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg",
    "size": 98991,
    "width": 1200,
    "height": 1200,
    "aspect": "square",
    "title": "Crimson Burgundy Velvet Dinner Jacket",
    "category": "formal-eveningwear",
    "secondaryCategories": [
      "blazer-separates"
    ],
    "tags": [
      "burgundy-velvet",
      "satin-peak-lapel",
      "black-tie-luxury",
      "evening"
    ],
    "suggestedPages": [
      "/gallery",
      "/occasions/formal-eveningwear",
      "/bespoke/bespoke-evening-wear"
    ],
    "featured": true
  }
];

/**
 * Filter helper functions for pages
 */
export function getMediaByCategory(category: RegisteredMediaItem['category'] | string): RegisteredMediaItem[] {
  return MEDIA_REGISTRY.filter(
    (item) => item.category === category || item.secondaryCategories.includes(category)
  );
}

export function getMediaForPage(pagePath: string): RegisteredMediaItem[] {
  return MEDIA_REGISTRY.filter((item) =>
    item.suggestedPages.some((p) => p.toLowerCase().includes(pagePath.toLowerCase()))
  );
}

export function getFeaturedMedia(): RegisteredMediaItem[] {
  return MEDIA_REGISTRY.filter((item) => item.featured);
}

export function getMediaByTag(tag: string): RegisteredMediaItem[] {
  return MEDIA_REGISTRY.filter((item) => item.tags.some((t) => t.toLowerCase() === tag.toLowerCase()));
}

export function getMediaById(id: string): RegisteredMediaItem | undefined {
  return MEDIA_REGISTRY.find((item) => item.id === id);
}

export function getMediaBySrc(src: string): RegisteredMediaItem | undefined {
  return MEDIA_REGISTRY.find((item) => item.src === src);
}
