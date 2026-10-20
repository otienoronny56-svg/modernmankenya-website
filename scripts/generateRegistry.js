const fs = require('fs');
const path = require('path');

function getJpegDimensions(buffer) {
  let i = 2;
  while (i < buffer.length - 8) {
    if (buffer[i] === 0xFF && (buffer[i + 1] === 0xC0 || buffer[i + 1] === 0xC2)) {
      const height = buffer.readUInt16BE(i + 5);
      const width = buffer.readUInt16BE(i + 7);
      return { width, height };
    }
    i++;
  }
  return null;
}

function getDimensions(filePath) {
  try {
    const buf = fs.readFileSync(filePath);
    if (filePath.endsWith('.png')) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      return { width, height };
    }
    return getJpegDimensions(buf);
  } catch (e) {
    return null;
  }
}

// Visual catalog classification map based on our detailed analysis
const visualKnowledge = {
  // Key custom covers
  "kaunda suit.jpeg": {
    title: "Asymmetric Cream Kaunda Suit",
    category: "kaunda-senator",
    secondary: ["signature-african", "wedding-groom"],
    tags: ["kaunda", "senator", "mandarin-collar", "african-luxury", "asymmetric"],
    suggestedPages: ["/bespoke/kaunda-suits", "/occasions/signature-occasion", "/gallery"],
    featured: true
  },
  "tuxedo.jpeg": {
    title: "Ivory Black Shawl Tuxedo",
    category: "formal-eveningwear",
    secondary: ["wedding-groom", "tuxedos"],
    tags: ["tuxedo", "ivory", "shawl-lapel", "black-tie", "gala", "altar"],
    suggestedPages: ["/bespoke/bespoke-evening-wear", "/occasions/formal-eveningwear", "/occasions/wedding-groom", "/gallery"],
    featured: true
  },
  "slide.jpeg": {
    title: "Surgeon Cuffs & French Cuffs",
    category: "craft-atelier",
    secondary: ["business-executive", "details-finishing"],
    tags: ["surgeon-cuffs", "french-cuffs", "horn-buttons", "sleeve-detail", "atelier"],
    suggestedPages: ["/the-craft", "/occasions/business-executive", "/bespoke/bespoke-suits"],
    featured: true
  },
  "Bespoke Suit.jpg": {
    title: "Atelier Hand Canvas Padding",
    category: "craft-atelier",
    secondary: ["business-executive"],
    tags: ["floating-canvas", "horsehair", "atelier", "hand-padding", "bespoke"],
    suggestedPages: ["/the-craft", "/bespoke/bespoke-suits"],
    featured: true
  },
  "Black.jpg": {
    title: "Midnight Barathea Floating Canvas",
    category: "formal-eveningwear",
    secondary: ["business-executive"],
    tags: ["midnight-black", "barathea", "floating-canvas", "black-tie"],
    suggestedPages: ["/bespoke/bespoke-evening-wear", "/occasions/formal-eveningwear"],
    featured: false
  },
  "Blazer.jpg": {
    title: "Tailored Double Breasted Blazer",
    category: "blazer-separates",
    secondary: ["business-executive"],
    tags: ["blazer", "double-breasted", "crest-buttons", "separates"],
    suggestedPages: ["/ready-to-wear", "/gallery"],
    featured: false
  },
  "Excellence (1).jpg": {
    title: "Heritage Sartorial Excellence",
    category: "craft-atelier",
    secondary: ["brand-heritage"],
    tags: ["heritage", "excellence", "craftsmanship", "atelier"],
    suggestedPages: ["/about", "/the-craft"],
    featured: false
  },
  "_MG_3310.jpg": {
    title: "Sartorial Silhouette Model Spread",
    category: "editorial",
    secondary: ["business-executive"],
    tags: ["editorial", "silhouette", "bespoke-tailoring"],
    suggestedPages: ["/gallery", "/lookbook"],
    featured: false
  },
  "ERC_0341.JPG": {
    title: "Distinguished Executive Portrait",
    category: "business-executive",
    secondary: ["editorial"],
    tags: ["executive", "portrait", "tailored-suit", "nairobi"],
    suggestedPages: ["/occasions/business-executive", "/bespoke/corporate-wardrobes"],
    featured: false
  },

  // MOK photoshoot series
  "MOK_7655.jpg": {
    title: "Nairobi Boardroom Royal Blue",
    category: "business-executive",
    secondary: ["editorial"],
    tags: ["royal-blue", "boardroom", "two-piece", "power-suit"],
    suggestedPages: ["/occasions/business-executive", "/bespoke/bespoke-suits", "/gallery"],
    featured: true
  },
  "MOK_7660.jpg": {
    title: "Double Breasted Chalkstripe Suit",
    category: "business-executive",
    secondary: ["editorial"],
    tags: ["chalkstripe", "double-breasted", "peak-lapel", "power-suit"],
    suggestedPages: ["/occasions/business-executive", "/bespoke/bespoke-suits"],
    featured: true
  },
  "MOK_7662.jpg": {
    title: "Classic Slate Three Piece Suit",
    category: "business-executive",
    secondary: ["wedding-groom"],
    tags: ["slate-grey", "three-piece", "horseshoe-waistcoat", "executive"],
    suggestedPages: ["/occasions/business-executive", "/bespoke/corporate-wardrobes"],
    featured: false
  },
  "MOK_7688.jpg": {
    title: "Charcoal Glen Plaid Executive",
    category: "business-executive",
    secondary: ["editorial"],
    tags: ["glen-plaid", "charcoal", "wool", "hacking-pockets"],
    suggestedPages: ["/occasions/business-executive", "/gallery"],
    featured: false
  },
  "MOK_7716.jpg": {
    title: "Deep Navy Flannel Suit",
    category: "business-executive",
    secondary: ["editorial"],
    tags: ["navy-flannel", "wool-worsted", "classic-tailoring"],
    suggestedPages: ["/occasions/business-executive", "/bespoke/bespoke-suits"],
    featured: false
  },
  "MOK_1920.jpg": {
    title: "Black Tie Studio Profile",
    category: "formal-eveningwear",
    secondary: ["editorial"],
    tags: ["black-tie", "studio", "satin-lapel", "gala"],
    suggestedPages: ["/occasions/formal-eveningwear", "/gallery"],
    featured: false
  },
  "MOK_2101.jpg": {
    title: "Black Satin Peak Tuxedo",
    category: "formal-eveningwear",
    secondary: ["wedding-groom"],
    tags: ["satin-peak", "tuxedo", "black-tie", "formal"],
    suggestedPages: ["/occasions/formal-eveningwear", "/bespoke/bespoke-evening-wear"],
    featured: true
  },
  "MOK_2129.jpg": {
    title: "Gala Eveningwear Stance",
    category: "formal-eveningwear",
    secondary: ["editorial"],
    tags: ["gala", "eveningwear", "black-tie", "tailored"],
    suggestedPages: ["/occasions/formal-eveningwear", "/gallery"],
    featured: false
  },
  "MOK_2142.jpg": {
    title: "Sartorial Contrast Lapel Dinner Suit",
    category: "formal-eveningwear",
    secondary: ["wedding-groom"],
    tags: ["contrast-lapel", "dinner-suit", "evening", "bowtie"],
    suggestedPages: ["/occasions/formal-eveningwear", "/bespoke/bespoke-evening-wear"],
    featured: false
  },
  "MOK_2146 (1).jpg": {
    title: "Editorial Black Tie Full Length",
    category: "formal-eveningwear",
    secondary: ["editorial"],
    tags: ["black-tie", "full-length", "tuxedo", "studio"],
    suggestedPages: ["/occasions/formal-eveningwear", "/gallery"],
    featured: false
  },
  "MOK_2154.jpg": {
    title: "Emerald Velvet Smoking Jacket",
    category: "formal-eveningwear",
    secondary: ["blazer-separates"],
    tags: ["emerald-green", "velvet", "smoking-jacket", "shawl-lapel"],
    suggestedPages: ["/occasions/formal-eveningwear", "/gallery", "/bespoke/bespoke-evening-wear"],
    featured: true
  },
  "MOK_2171.jpg": {
    title: "Navy Velvet Dinner Jacket",
    category: "formal-eveningwear",
    secondary: ["blazer-separates"],
    tags: ["navy-velvet", "dinner-jacket", "satin-facing", "luxury"],
    suggestedPages: ["/occasions/formal-eveningwear", "/gallery"],
    featured: false
  },
  "MOK_2198.jpg": {
    title: "Royal Navy Peak Lapel Suit",
    category: "business-executive",
    secondary: ["editorial"],
    tags: ["royal-navy", "peak-lapel", "executive-cut"],
    suggestedPages: ["/occasions/business-executive", "/bespoke/bespoke-suits"],
    featured: false
  },
  "MOK_2204.jpg": {
    title: "Houndstooth Evening Waistcoat Set",
    category: "formal-eveningwear",
    secondary: ["wedding-groom"],
    tags: ["houndstooth", "evening-waistcoat", "tuxedo-set"],
    suggestedPages: ["/occasions/formal-eveningwear", "/occasions/wedding-groom"],
    featured: false
  },
  "MOK_2219.jpg": {
    title: "Velvet Dinner Coat in Motion",
    category: "formal-eveningwear",
    secondary: ["editorial"],
    tags: ["velvet", "motion", "opulence", "sartorial"],
    suggestedPages: ["/occasions/formal-eveningwear", "/gallery"],
    featured: true
  },

  // DSC wedding photo series
  "DSC04888.jpg": {
    title: "Outdoor Nuptial Ceremony Vows",
    category: "wedding-groom",
    secondary: ["editorial"],
    tags: ["wedding-vows", "groom", "outdoor-ceremony", "bespoke-suit"],
    suggestedPages: ["/occasions/wedding-groom", "/bespoke/weddings"],
    featured: false
  },
  "DSC04947.jpg": {
    title: "Bridal Party Garden Procession",
    category: "wedding-groom",
    secondary: ["editorial"],
    tags: ["bridal-party", "garden-wedding", "entourage", "suits"],
    suggestedPages: ["/occasions/wedding-groom", "/bespoke/weddings"],
    featured: false
  },
  "DSC04995.jpg": {
    title: "Three Piece Groom Nuptial Suit",
    category: "wedding-groom",
    secondary: ["business-executive"],
    tags: ["groom-suit", "three-piece", "horseshoe-vest", "wedding"],
    suggestedPages: ["/occasions/wedding-groom", "/bespoke/weddings", "/gallery"],
    featured: true
  },
  "DSC05022.jpg": {
    title: "Groom & Bride Reception Walk",
    category: "wedding-groom",
    secondary: ["editorial"],
    tags: ["reception-walk", "groom", "bride", "celebration"],
    suggestedPages: ["/occasions/wedding-groom", "/bespoke/weddings"],
    featured: true
  },
  "DSC05098.jpg": {
    title: "Groomsmen Toast Celebration",
    category: "wedding-groom",
    secondary: ["editorial"],
    tags: ["groomsmen", "champagne-toast", "celebration", "wedding-party"],
    suggestedPages: ["/occasions/wedding-groom", "/bespoke/weddings"],
    featured: false
  },

  // LKM atelier craft series
  "LKM_1600.jpg": {
    title: "Millimetric Pattern Drafting Table",
    category: "craft-atelier",
    secondary: ["bespoke-process"],
    tags: ["pattern-drafting", "tailor-shears", "chalk", "atelier"],
    suggestedPages: ["/the-craft", "/bespoke/bespoke-suits"],
    featured: true
  },
  "LKM_1607.jpg": {
    title: "Hand Cutting Wool Suiting",
    category: "craft-atelier",
    secondary: ["bespoke-process"],
    tags: ["hand-cutting", "shears", "wool-worsted", "craftsmanship"],
    suggestedPages: ["/the-craft", "/about"],
    featured: false
  },
  "LKM_1741.jpg": {
    title: "Basting Internal Floating Canvas",
    category: "craft-atelier",
    secondary: ["bespoke-process"],
    tags: ["basting-stitch", "horsehair-canvas", "internal-structure"],
    suggestedPages: ["/the-craft", "/bespoke/bespoke-suits"],
    featured: true
  },
  "LKM_1745.jpg": {
    title: "Hand Pressed Collar Shaping",
    category: "craft-atelier",
    secondary: ["bespoke-process"],
    tags: ["iron-pressing", "collar-shaping", "traditional-tailoring"],
    suggestedPages: ["/the-craft"],
    featured: false
  },
  "LKM_1755.jpg": {
    title: "Shoulder Pad Alignment Fitting",
    category: "craft-atelier",
    secondary: ["bespoke-process"],
    tags: ["shoulder-alignment", "anatomical-fit", "master-tailor"],
    suggestedPages: ["/the-craft", "/bespoke/bespoke-suits"],
    featured: false
  },
  "LKM_1776.jpg": {
    title: "Hand Sewn Milanese Buttonhole",
    category: "craft-atelier",
    secondary: ["details-finishing"],
    tags: ["milanese-buttonhole", "silk-twist", "hand-sewn", "lapel"],
    suggestedPages: ["/the-craft", "/gallery"],
    featured: true
  },
  "LKM_1793.jpg": {
    title: "Final Steaming & Inspection",
    category: "craft-atelier",
    secondary: ["bespoke-process"],
    tags: ["final-inspection", "steaming", "ready-for-handover"],
    suggestedPages: ["/the-craft", "/about"],
    featured: false
  }
};

// WhatsApp Images catalog mappings
const whatsappClassifications = [
  // Highland tea plantation wedding
  { match: "3.47.01 PM", title: "Ivory Double Breasted Highland Groom", category: "wedding-groom", secondary: ["formal-eveningwear"], tags: ["highland-wedding", "ivory-suit", "tea-estate", "groom"], hero: true },
  { match: "3.47.54 PM", title: "Tea Plantation Romance Portrait", category: "wedding-groom", secondary: ["editorial"], tags: ["tea-plantation", "couples-portrait", "nuptials", "highland"] },
  { match: "3.47.56 PM", title: "Highland Altar Boutonniere Close Up", category: "wedding-groom", secondary: ["craft-atelier"], tags: ["boutonniere", "lapel", "cream-suit", "groom"] },
  { match: "3.47.59 PM", title: "Ivory Jacket Black Trouser Stride", category: "wedding-groom", secondary: ["formal-eveningwear"], tags: ["ivory-jacket", "tea-estate", "contrast-facing", "groom"] },
  { match: "3.48.53 PM", title: "Highland Garden Romance Stride", category: "wedding-groom", secondary: ["editorial"], tags: ["highland-garden", "wedding-couple", "greenery"] },

  // Fitting room & tailoring consultations
  { match: "3.41.30 PM", title: "Master Tailor Anatomical Measurement", category: "craft-atelier", secondary: ["business-executive"], tags: ["tape-measure", "master-tailor", "chest-calibration", "atelier"], hero: true },
  { match: "3.50.12 PM", title: "Bespoke Navy Two Piece Fitting", category: "business-executive", secondary: ["bespoke-suits"], tags: ["navy-suit", "fitting-room", "bespoke-tailor"] },
  { match: "3.50.13 PM", title: "Charcoal Worsted Consultation Fitting", category: "business-executive", secondary: ["bespoke-suits"], tags: ["charcoal-worsted", "fitting-mirror", "two-piece"] },
  { match: "3.50.14 PM", title: "Architectural Ivory Evening Jacket", category: "formal-eveningwear", secondary: ["wedding-groom"], tags: ["ivory-jacket", "double-monks", "studio-fitting", "tuxedo"] },
  { match: "3.50.15 PM", title: "Master Tailor Lapel Adjustment", category: "craft-atelier", secondary: ["bespoke-process"], tags: ["lapel-adjustment", "master-tailor", "fitting-session"] },
  { match: "3.50.17 PM", title: "Full Floating Canvas Drape Check", category: "craft-atelier", secondary: ["bespoke-suits"], tags: ["canvas-drape", "fitting-room", "bespoke-cut"] },
  { match: "3.50.19 PM", title: "Shoulder Slope Millimetric Check", category: "craft-atelier", secondary: ["bespoke-suits"], tags: ["shoulder-slope", "fitting-studio", "precision"] },
  { match: "3.50.23 PM", title: "Navy Three Piece Horseshoe Vest Fitting", category: "business-executive", secondary: ["wedding-groom"], tags: ["horseshoe-vest", "three-piece", "navy-suit"] },
  { match: "3.50.26 PM", title: "Editorial Lapel Drape Monochrome", category: "formal-eveningwear", secondary: ["craft-atelier"], tags: ["monochrome", "lapel-drape", "editorial-portrait"] },
  { match: "3.50.31 PM", title: "Sleeve Pitch Balance Inspection", category: "craft-atelier", secondary: ["details-finishing"], tags: ["sleeve-pitch", "armhole-scye", "atelier-discipline"] },
  { match: "3.50.36 PM", title: "Cloth Bunch Consultation Session", category: "craft-atelier", secondary: ["bespoke-process"], tags: ["cloth-bunch", "swatch-book", "scabal-huddersfield"] },

  // Monarch & Jacquard
  { match: "3.50.45 PM", title: "Jacquard Dinner Coat & Golden Cane", category: "formal-eveningwear", secondary: ["wedding-groom", "signature-african"], tags: ["jacquard", "golden-cane", "lion-head", "monarch-wear"], hero: true },
  { match: "3.50.49 PM", title: "Monarch Jacquard Standing Portrait", category: "formal-eveningwear", secondary: ["signature-african"], tags: ["jacquard", "standing-portrait", "ceremonial-gala"] },

  // Urban Executive & Blazer
  { match: "3.50.56 PM", title: "Nairobi Skyline Executive Stroll", category: "business-executive", secondary: ["editorial"], tags: ["nairobi-skyline", "executive-suit", "urban-stride"] },
  { match: "3.51.00 PM", title: "Bespoke Navy Patch Pocket Blazer", category: "blazer-separates", secondary: ["business-executive"], tags: ["patch-pocket", "navy-blazer", "horn-buttons"] },

  // Wedding champagne & groomsmen
  { match: "3.51.08 PM", title: "Groomsmen Champagne Toast Dressing", category: "wedding-groom", secondary: ["editorial"], tags: ["champagne-toast", "groomsmen-dressing", "celebration"] },
  { match: "3.51.41 PM", title: "Groom Champagne Flute Toast", category: "wedding-groom", secondary: ["editorial"], tags: ["groom-toast", "champagne-flute", "celebratory"] },

  // Ruracio / African Traditional Ceremonies & Senator Suits
  { match: "3.54.58 PM", title: "Ceremonial African Entourage Procession", category: "signature-african", secondary: ["kaunda-senator"], tags: ["african-procession", "ceremonial-tunics", "dowry-party"] },
  { match: "3.55.00 PM", title: "Ceremonial Gold Cap & Coral Beads", category: "signature-african", secondary: ["wedding-groom"], tags: ["gold-cap", "coral-beads", "african-vows", "sacred-dowry"] },
  { match: "3.55.06 PM", title: "Ruracio Joyful Entourage Dance", category: "signature-african", secondary: ["wedding-groom"], tags: ["ruracio-dance", "entourage", "african-celebration"] },
  { match: "3.55.21 PM", title: "Traditional Groomsmen Flywhisk Line", category: "signature-african", secondary: ["wedding-groom"], tags: ["flywhisk-line", "traditional-groomsmen", "ceremonial-tunics"] },
  { match: "3.55.24 PM", title: "Emerald Caps & Flywhisks Entourage", category: "signature-african", secondary: ["kaunda-senator"], tags: ["emerald-caps", "flywhisks", "senator-suits", "ruracio-groom"], hero: true },
  { match: "3.55.28 PM", title: "Traditional Nuptial Joy Celebration", category: "signature-african", secondary: ["wedding-groom"], tags: ["nuptial-joy", "traditional-bride-groom", "cultural-pride"] },
  { match: "3.55.34 PM", title: "Cultural Procession Sacred Steps", category: "signature-african", secondary: ["wedding-groom"], tags: ["sacred-procession", "traditional-attire", "kenyan-heritage"] },
  { match: "3.55.38 PM", title: "Ruracio Dowry Elders Blessing", category: "signature-african", secondary: ["wedding-groom"], tags: ["dowry-blessing", "elders", "traditional-ceremony"] },
  { match: "3.55.46 PM", title: "Sacred Cultural Nuptials Couple", category: "signature-african", secondary: ["wedding-groom"], tags: ["sacred-nuptials", "cultural-couple", "african-heritage"] },
  { match: "3.55.48 PM", title: "Garden Procession Cultural Walk", category: "signature-african", secondary: ["wedding-groom"], tags: ["garden-walk", "cultural-tunics", "celebration"] },
  { match: "3.55.49 PM", title: "Carved Antelope Cane & Velvet Cap", category: "signature-african", secondary: ["wedding-groom"], tags: ["antelope-cane", "velvet-cap", "ceremonial-groom"] },
  { match: "3.55.53 PM", title: "Ruracio Cowhide Beaded Vest Dance", category: "signature-african", secondary: ["wedding-groom"], tags: ["cowhide-vest", "beaded-vest", "walking-canes", "ruracio-dance"], hero: true },
  { match: "3.55.55 PM", title: "Dowry Procession Walking Canes", category: "signature-african", secondary: ["wedding-groom"], tags: ["walking-canes", "dowry-procession", "african-tradition"] },
  { match: "3.55.56 PM", title: "Dowry Gathering Sartorial Pride", category: "signature-african", secondary: ["kaunda-senator"], tags: ["dowry-gathering", "sartorial-pride", "african-tunics"] },
  { match: "3.55.57 PM", title: "Traditional Groom Entrance March", category: "signature-african", secondary: ["wedding-groom"], tags: ["groom-entrance", "march", "traditional-celebration"] },
  { match: "3.55.58 PM", title: "Cultural Wedding Grand Gateway", category: "signature-african", secondary: ["wedding-groom"], tags: ["grand-gateway", "cultural-entrance", "heritage"] },
  { match: "3.56.01 PM", title: "Celebratory Garden Festivities Attire", category: "signature-african", secondary: ["wedding-groom"], tags: ["garden-festivities", "ceremonial-suits", "celebration"] },
  { match: "3.56.04 PM", title: "African Nuptial Community Toast", category: "signature-african", secondary: ["wedding-groom"], tags: ["community-toast", "african-nuptials", "joyful"] },

  // Craft shears & basting
  { match: "4.16.39 PM", title: "Hand Shears Pattern Scribing", category: "craft-atelier", secondary: ["bespoke-process"], tags: ["hand-shears", "chalk-scribing", "pattern-cutting", "atelier"], hero: true },
  { match: "4.16.43 PM", title: "Horsehair Canvas Basting Stitches", category: "craft-atelier", secondary: ["bespoke-process"], tags: ["basting-stitches", "floating-canvas", "horsehair", "atelier"] },

  // Outdoor wedding rose petal aisle & groomsmen
  { match: "4.16.50 PM", title: "Rose Petal Altar Garden Entrance", category: "wedding-groom", secondary: ["editorial"], tags: ["rose-petal-aisle", "garden-wedding", "bride-groom"] },
  { match: "4.16.51 PM (1)", title: "Rose Petal Aisle Nuptial Walk", category: "wedding-groom", secondary: ["formal-eveningwear"], tags: ["rose-petals", "aisle-walk", "navy-suit", "champagne-vest"], hero: true },
  { match: "4.16.51 PM (2)", title: "Garden Nuptial Entourage Gathering", category: "wedding-groom", secondary: ["editorial"], tags: ["nuptial-entourage", "garden-wedding", "coordinated-suits"] },
  { match: "4.16.51 PM.", title: "Garden Reception Entourage Entrance", category: "wedding-groom", secondary: ["editorial"], tags: ["garden-reception", "entourage-entrance", "bespoke-suits"] },
  { match: "4.16.52 PM (1)", title: "Outdoor Groomsmen Lineup Smile", category: "wedding-groom", secondary: ["editorial"], tags: ["groomsmen-lineup", "smile", "tailored-suits"] },
  { match: "4.16.52 PM (2)", title: "Celebratory Groomsmen Laughter", category: "wedding-groom", secondary: ["editorial"], tags: ["groomsmen-laughter", "camaraderie", "celebration"] },
  { match: "4.16.52 PM.", title: "Garden Altar Bridal Procession", category: "wedding-groom", secondary: ["editorial"], tags: ["bridal-procession", "three-piece-suit", "garden-wedding"] },
  { match: "4.16.53 PM (1)", title: "Tan Suit Groomsmen Camaraderie", category: "wedding-groom", secondary: ["editorial"], tags: ["tan-suit", "camaraderie", "groomsmen-party"] },
  { match: "4.16.53 PM (2)", title: "Entourage Coordinated Suiting Palette", category: "wedding-groom", secondary: ["editorial"], tags: ["coordinated-palette", "champagne-navy", "entourage"] },
  { match: "4.16.53 PM.", title: "Groom & Groomsmen Candid Joy", category: "wedding-groom", secondary: ["editorial"], tags: ["candid-joy", "wedding-smiles", "bespoke-groom"] },

  // Senator / Kaunda suits with Ankara & African motifs
  { match: "4.16.54 PM (1)", title: "Minimalist Ivory Senator Tunic", category: "kaunda-senator", secondary: ["signature-african"], tags: ["senator-tunic", "ivory", "minimalist-collar", "african-statesman"] },
  { match: "4.16.54 PM (2)", title: "Embroidered Placket Senator Cut", category: "kaunda-senator", secondary: ["signature-african"], tags: ["embroidered-placket", "senator-cut", "mandarin-collar"] },
  { match: "4.16.54 PM.", title: "White Senator Tunic Ankara Panel", category: "kaunda-senator", secondary: ["signature-african"], tags: ["ankara-panel", "senator-tunic", "african-modernity"], hero: true },
  { match: "4.16.55 PM", title: "African Ankara Accent Pocket Square", category: "signature-african", secondary: ["blazer-separates"], tags: ["ankara-accent", "pocket-square", "bespoke-blazer"] },

  // Executive suiting, waistcoats & boardroom
  { match: "4.17.10 PM", title: "Navy Pinstripe Peak Lapel Detail", category: "business-executive", secondary: ["craft-atelier"], tags: ["navy-pinstripe", "peak-lapel", "pick-stitching"] },
  { match: "4.17.12 PM", title: "Midnight Navy Horseshoe Waistcoat", category: "business-executive", secondary: ["wedding-groom"], tags: ["horseshoe-waistcoat", "double-breasted-vest", "three-piece", "navy-suit"], hero: true },
  { match: "4.17.13 PM (1)", title: "Slate Grey Boardroom Silk Foulard", category: "business-executive", secondary: ["editorial"], tags: ["slate-grey", "silk-foulard", "boardroom-suit"] },
  { match: "4.17.13 PM.", title: "Airforce Blue Wool Linen Two Piece", category: "business-executive", secondary: ["editorial"], tags: ["airforce-blue", "wool-linen", "two-button-cut"] },
  { match: "4.17.14 PM", title: "Cognac Groomsmen & Champagne Groom", category: "wedding-groom", secondary: ["editorial"], tags: ["cognac-groomsmen", "champagne-groom", "tobacco-palette"], hero: true },
  { match: "4.17.15 PM", title: "Charcoal Birdseye Executive Suit", category: "business-executive", secondary: ["editorial"], tags: ["charcoal-birdseye", "super-150s", "two-button-cut", "boardroom"], hero: true },
  { match: "4.17.17 PM (1)", title: "Royal Blue Double Breasted Blazer", category: "blazer-separates", secondary: ["business-executive"], tags: ["royal-blue", "double-breasted", "brass-buttons"] },
  { match: "4.17.17 PM (2)", title: "French Blue Gold Flower Lapel", category: "wedding-groom", secondary: ["business-executive"], tags: ["french-blue", "boutonniere-pin", "tailored-suit"] },
  { match: "4.17.17 PM.", title: "Classic Navy Worsted Single Breasted", category: "business-executive", secondary: ["editorial"], tags: ["classic-navy", "single-breasted", "white-shirt"] },
  { match: "4.17.18 PM (1)", title: "Tan Double Breasted Groom Laughter", category: "wedding-groom", secondary: ["editorial"], tags: ["tan-double-breasted", "groom-laughter", "groomsmen-moment"] },
  { match: "4.17.18 PM.", title: "Navy Glen Check Tuxedo Waistcoat", category: "formal-eveningwear", secondary: ["business-executive"], tags: ["glen-check-waistcoat", "black-tie", "micro-dot-bowtie"] },
  { match: "4.17.19 PM", title: "French Navy Two Button Executive", category: "business-executive", secondary: ["editorial"], tags: ["french-navy", "hand-rolled-lapel", "two-piece"] },
  { match: "4.17.21 PM", title: "Sand Beige Crossover Waistcoat Set", category: "business-executive", secondary: ["wedding-groom"], tags: ["sand-beige", "crossover-waistcoat", "daylight-suit", "horn-buttons"] },
  { match: "4.17.22 PM", title: "Definitive Black Tie Horseshoe Tuxedo", category: "formal-eveningwear", secondary: ["wedding-groom"], tags: ["black-tie", "horseshoe-vest", "barathea-wool", "satin-lapel"], hero: true },
  { match: "4.17.23 PM (1)", title: "Midnight Single Button Burgundy Bow", category: "formal-eveningwear", secondary: ["wedding-groom"], tags: ["midnight-navy", "single-button", "burgundy-bowtie"] },
  { match: "4.17.23 PM (2)", title: "Check Suit Historic Locomotive Stride", category: "signature-african", secondary: ["blazer-separates", "editorial"], tags: ["steam-locomotive", "nairobi-railway", "check-suit", "heritage-stride"] },
  { match: "4.17.23 PM.", title: "Crimson Scarlet Statement Blazer", category: "blazer-separates", secondary: ["signature-african"], tags: ["crimson-scarlet", "statement-blazer", "houndstooth-pocket-square"], hero: true },
  { match: "4.17.24 PM", title: "Charcoal Glen Plaid Hacking Flap", category: "business-executive", secondary: ["editorial"], tags: ["glen-plaid", "hacking-flap", "british-cut", "charcoal"] },
  { match: "4.17.25 PM (1)", title: "Stone Ivory Double Breasted Ascot", category: "formal-eveningwear", secondary: ["wedding-groom"], tags: ["stone-ivory", "double-breasted", "ascot-cravat", "gala-lounge"] },
  { match: "4.17.25 PM.", title: "Dark Navy Chalk Stripe Worsted", category: "business-executive", secondary: ["editorial"], tags: ["chalk-stripe", "worsted-wool", "power-silhouette", "peak-lapel"] },
  { match: "4.17.26 PM (1)", title: "Executive Pinstripe Tie Bar Accent", category: "business-executive", secondary: ["editorial"], tags: ["pinstripe", "tie-bar", "double-vented", "leadership"] },
  { match: "4.17.26 PM.", title: "Navy Double Breasted Ticket Pocket", category: "business-executive", secondary: ["editorial"], tags: ["double-breasted", "ticket-pocket", "navy-wool"] },
  { match: "4.17.27 PM", title: "Crimson Burgundy Velvet Dinner Jacket", category: "formal-eveningwear", secondary: ["blazer-separates"], tags: ["burgundy-velvet", "satin-peak-lapel", "black-tie-luxury", "evening"], hero: true }
];

const moreDir = path.join(__dirname, '..', 'public', 'images', 'more');
const rootDir = path.join(__dirname, '..', 'public', 'images');

const moreFiles = fs.readdirSync(moreDir);
const rootFiles = fs.readdirSync(rootDir).filter(f => !fs.statSync(path.join(rootDir, f)).isDirectory());

const allRegistry = [];

// Process root files
rootFiles.forEach((file, index) => {
  const filePath = path.join(rootDir, file);
  const dim = getDimensions(filePath);
  const size = fs.statSync(filePath).size;
  const aspect = dim ? (dim.height > dim.width * 1.15 ? 'portrait' : dim.width > dim.height * 1.15 ? 'landscape' : 'square') : 'portrait';

  const knowledge = visualKnowledge[file] || {
    title: file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    category: "editorial",
    secondary: [],
    tags: ["bespoke", "modern-man-kenya"],
    suggestedPages: ["/gallery"],
    featured: false
  };

  allRegistry.push({
    id: `root-${index + 1}-${file.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    filename: file,
    src: `/images/${file}`,
    size,
    width: dim ? dim.width : null,
    height: dim ? dim.height : null,
    aspect,
    title: knowledge.title,
    category: knowledge.category,
    secondaryCategories: knowledge.secondary || [],
    tags: knowledge.tags || [],
    suggestedPages: knowledge.suggestedPages || ['/gallery'],
    featured: !!knowledge.featured
  });
});

// Process more/ files
moreFiles.forEach((file, index) => {
  const filePath = path.join(moreDir, file);
  const dim = getDimensions(filePath);
  const size = fs.statSync(filePath).size;
  const aspect = dim ? (dim.height > dim.width * 1.15 ? 'portrait' : dim.width > dim.height * 1.15 ? 'landscape' : 'square') : 'portrait';

  // find match in whatsappClassifications
  let matched = null;
  for (const c of whatsappClassifications) {
    if (file.includes(c.match)) {
      matched = c;
      break;
    }
  }

  const title = matched ? matched.title : "Sartorial Bespoke Look";
  const category = matched ? matched.category : "editorial";
  const secondaryCategories = matched ? (matched.secondary || []) : [];
  const tags = matched ? (matched.tags || []) : ["bespoke", "kenya"];
  const featured = matched ? !!matched.hero : false;

  let suggestedPages = ["/gallery"];
  if (category === 'business-executive') suggestedPages.push('/occasions/business-executive', '/bespoke/corporate-wardrobes');
  else if (category === 'wedding-groom') suggestedPages.push('/occasions/wedding-groom', '/bespoke/weddings');
  else if (category === 'formal-eveningwear') suggestedPages.push('/occasions/formal-eveningwear', '/bespoke/bespoke-evening-wear');
  else if (category === 'signature-african' || category === 'kaunda-senator') suggestedPages.push('/occasions/signature-occasion', '/bespoke/kaunda-suits');
  else if (category === 'craft-atelier') suggestedPages.push('/the-craft', '/bespoke/bespoke-suits');
  else if (category === 'blazer-separates') suggestedPages.push('/ready-to-wear');

  allRegistry.push({
    id: `more-${index + 1}`,
    filename: file,
    src: `/images/more/${file}`,
    size,
    width: dim ? dim.width : null,
    height: dim ? dim.height : null,
    aspect,
    title,
    category,
    secondaryCategories,
    tags,
    suggestedPages,
    featured
  });
});

console.log(`Total images registered: ${allRegistry.length}`);

// Generate TypeScript registry file
const tsCode = `/**
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

export const MEDIA_REGISTRY: RegisteredMediaItem[] = ${JSON.stringify(allRegistry, null, 2)};

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
`;

const registryTsPath = path.join(__dirname, '..', 'data', 'mediaRegistry.ts');
fs.writeFileSync(registryTsPath, tsCode);
console.log(`Saved ${registryTsPath}`);

// Generate Markdown Knowledge Reference Doc
let md = `# Modern Man Kenya - Visual Media Knowledge Reference

> Curated master index of all ${allRegistry.length} imagery assets in the project (\`public/images\` & \`public/images/more\`).
> Keep this document as primary reference when building future pages to immediately select the right photos.

## Key Covers & Anchor Imagery
- **Tuxedo Cover**: \`/images/tuxedo.jpeg\` (Ivory Black Shawl Altar Tuxedo)
- **Kaunda / Senator Suit Cover**: \`/images/kaunda suit.jpeg\` (Asymmetric Cream Kaunda Suit)
- **Craftsmanship / Hero Slide**: \`/images/slide.jpeg\` (Surgeon Cuffs & French Cuffs)
- **Boardroom Blue Cover**: \`/images/MOK_7655.jpg\` (Nairobi Boardroom Royal Blue)
- **Velvet Gala Cover**: \`/images/more/WhatsApp Image 2026-10-19 at 4.17.27 PM.jpeg\` (Crimson Burgundy Velvet Dinner Jacket)
- **Ruracio / Cultural Cover**: \`/images/more/WhatsApp Image 2026-10-19 at 3.55.24 PM.jpeg\` (Groom & Groomsmen Flywhisks & Emerald Caps)
- **Highland Wedding Cover**: \`/images/more/WhatsApp Image 2026-10-19 at 3.47.01 PM.jpeg\` (Ivory Double Breasted Highland Groom)

---

## Category Breakdown

`;

const categories = [
  { key: 'kaunda-senator', label: 'Kaunda Suits & African Senator Ensembles' },
  { key: 'business-executive', label: 'Business & Boardroom Executive Suiting' },
  { key: 'wedding-groom', label: 'Weddings & Groom Entourage Ensembles' },
  { key: 'formal-eveningwear', label: 'Formal Eveningwear & Black Tie Tuxedos' },
  { key: 'blazer-separates', label: 'Tailored Blazers & Statement Separates' },
  { key: 'craft-atelier', label: 'Atelier Craftsmanship, Fitting & Shears' },
  { key: 'editorial', label: 'Editorial & Brand Heritage' }
];

categories.forEach(cat => {
  const items = allRegistry.filter(i => i.category === cat.key || (cat.key === 'kaunda-senator' && i.category === 'signature-african'));
  md += `### ${cat.label} (${items.length} items)\n\n`;
  md += `| Title (2-5 words) | Path | Aspect | Suggested Pages |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;
  items.forEach(it => {
    md += `| **${it.title}** | \`${it.src}\` | ${it.aspect} | ${it.suggestedPages.join(', ')} |\n`;
  });
  md += `\n`;
});

const docsDir = path.join(__dirname, '..', 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir);
const mdPath = path.join(docsDir, 'IMAGE_REGISTRY.md');
fs.writeFileSync(mdPath, md);
console.log(`Saved ${mdPath}`);
