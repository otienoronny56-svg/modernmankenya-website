const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx !== -1) {
      const key = trimmed.slice(0, idx).trim();
      let val = trimmed.slice(idx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const client = createClient(url, key);

const artDir = 'C:\\\\Users\\\\ronny\\\\.gemini\\\\antigravity-ide\\\\brain\\\\751b9f82-e470-4729-9fe5-cf91a0a002b9';
const pubProdDir = path.join(__dirname, '..', 'public', 'images', 'products');
if (!fs.existsSync(pubProdDir)) {
  fs.mkdirSync(pubProdDir, { recursive: true });
}

// Image copy mapping
const imageMap = [
  { src: 'shirt_white_luxury_1793011995552.jpg', dest: 'shirt-white-egyptian-giza.jpg' },
  { src: 'shirt_white_cuff_zoom_1793012029897.jpg', dest: 'shirt-white-cuff-zoom.jpg' },
  { src: 'shirt_blue_herringbone_1793012065687.jpg', dest: 'shirt-blue-herringbone.jpg' },
  { src: 'tie_burgundy_silk_1793012097181.jpg', dest: 'tie-burgundy-silk-grenadine.jpg' },
  { src: 'cufflinks_rhodium_box_1793012118968.jpg', dest: 'cufflinks-rhodium-mother-pearl.jpg' },
  { src: 'belt_cognac_leather_1793012151090.jpg', dest: 'belt-cognac-leather-brass.jpg' },
  { src: 'lapel_pin_gold_1793012209741.jpg', dest: 'lapel-pin-gold-boutonniere.jpg' },
  { src: 'dress_watch_1792701739980.jpg', dest: 'watch-onyx-minimalist.jpg' },
  { src: 'velvet_bowtie_1792701514176.jpg', dest: 'bowtie-black-silk-velvet.jpg' },
  { src: 'white_tuxedo_shirt_1792749839450.jpg', dest: 'shirt-white-pleated-tuxedo.jpg' },
  { src: 'navy_block_stripe_1792749980885.jpg', dest: 'shirt-navy-bengal-stripe.jpg' },
];

for (const { src, dest } of imageMap) {
  const srcPath = path.join(artDir, src);
  const destPath = path.join(pubProdDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${src} -> ${dest}`);
  } else {
    console.warn(`Source image not found: ${srcPath}`);
  }
}

// Realistic Products Definition (strictly Shirts & Accessories)
const products = [
  {
    name: 'The Sovereign Egyptian Giza White Dress Shirt',
    slug: 'the-sovereign-egyptian-giza-white-dress-shirt',
    tagline: '140s 2-Ply Giza Cotton with French Cuffs & Hand-Stitched Hem',
    description: 'Woven from long-staple Egyptian Giza 140s 2-ply cotton for a silky hand and unmatched breathability. Features a spread cutaway collar, tailored French cuffs for cufflinks, and hand-shanked mother-of-pearl buttons.',
    category: 'shirts',
    fabricDetails: '100% Egyptian Giza Cotton (140s 2-Ply)',
    construction: 'Single-needle tailored French cuffs, hand-turned spread collar, removable brass stays',
    priceKes: 14500,
    priceUsd: 115,
    images: [
      '/images/products/shirt-white-egyptian-giza.jpg',
      '/images/products/shirt-white-cuff-zoom.jpg'
    ],
    isFeatured: true,
    isInStock: true,
    variants: [
      { id: 'v-giza-1', size: '15.0" (38cm)', color: 'Crisp White', stockQuantity: 6, sku: 'MM-SHT-GZA-150' },
      { id: 'v-giza-2', size: '15.5" (39cm)', color: 'Crisp White', stockQuantity: 8, sku: 'MM-SHT-GZA-155' },
      { id: 'v-giza-3', size: '16.0" (41cm)', color: 'Crisp White', stockQuantity: 10, sku: 'MM-SHT-GZA-160' },
      { id: 'v-giza-4', size: '16.5" (42cm)', color: 'Crisp White', stockQuantity: 6, sku: 'MM-SHT-GZA-165' },
      { id: 'v-giza-5', size: '17.0" (43cm)', color: 'Crisp White', stockQuantity: 4, sku: 'MM-SHT-GZA-170' },
    ],
    detailsList: [
      '140s 2-Ply Egyptian Giza Cotton',
      'Dual-angle preview: Front dress fold & Macro cuff zoom',
      'Hand-shanked natural Australian mother-of-pearl buttons',
      'Handcrafted in Nairobi Atelier'
    ]
  },
  {
    name: 'The St. James Sky Blue Herringbone Cutaway Shirt',
    slug: 'the-st-james-sky-blue-herringbone-cutaway-shirt',
    tagline: 'Subtle Herringbone Weave with High Cutaway Spread Collar',
    description: 'An executive staple crafted in double-twisted Italian cotton with a delicate micro-herringbone texture. Designed with a wide spread collar that perfectly frames four-in-hand and half-Windsor tie knots.',
    category: 'shirts',
    fabricDetails: '100% Italian Double-Twisted Cotton (120s Herringbone)',
    construction: 'Reinforced gussets, mother-of-pearl buttons, mitred barrel cuffs',
    priceKes: 15500,
    priceUsd: 120,
    images: [
      '/images/products/shirt-blue-herringbone.jpg'
    ],
    isFeatured: true,
    isInStock: true,
    variants: [
      { id: 'v-herring-1', size: '15.5" (39cm)', color: 'Sky Blue', stockQuantity: 7, sku: 'MM-SHT-HRB-155' },
      { id: 'v-herring-2', size: '16.0" (41cm)', color: 'Sky Blue', stockQuantity: 9, sku: 'MM-SHT-HRB-160' },
      { id: 'v-herring-3', size: '16.5" (42cm)', color: 'Sky Blue', stockQuantity: 5, sku: 'MM-SHT-HRB-165' },
      { id: 'v-herring-4', size: '17.0" (43cm)', color: 'Sky Blue', stockQuantity: 3, sku: 'MM-SHT-HRB-170' },
    ],
    detailsList: [
      '120s Double-Twisted Italian Cotton',
      'Cutaway spread collar with removable metal collar stiffeners',
      'Mitred dual-button barrel cuffs with gauntlet buttons',
      'Handcrafted in Nairobi Atelier'
    ]
  },
  {
    name: 'Sartorial Navy Bengal Stripe Poplin Dress Shirt',
    slug: 'sartorial-navy-bengal-stripe-poplin-dress-shirt',
    tagline: 'Classic 1/8" Bengal Stripe on Crisp White Ground Poplin',
    description: 'A sartorial power-shirt tailored from premium poplin featuring crisp navy and white bengal stripes. Styled with a semi-spread collar and tailored convertible cuffs that accommodate buttons or cufflinks.',
    category: 'shirts',
    fabricDetails: '100% Egyptian Combed Cotton Poplin',
    construction: 'Convertible cuff architecture, split back yoke for shoulder comfort',
    priceKes: 13500,
    priceUsd: 105,
    images: [
      '/images/products/shirt-navy-bengal-stripe.jpg'
    ],
    isFeatured: false,
    isInStock: true,
    variants: [
      { id: 'v-bengal-1', size: '15.5" (39cm)', color: 'Navy Stripe', stockQuantity: 5, sku: 'MM-SHT-BNG-155' },
      { id: 'v-bengal-2', size: '16.0" (41cm)', color: 'Navy Stripe', stockQuantity: 6, sku: 'MM-SHT-BNG-160' },
      { id: 'v-bengal-3', size: '16.5" (42cm)', color: 'Navy Stripe', stockQuantity: 4, sku: 'MM-SHT-BNG-165' },
    ],
    detailsList: [
      'Egyptian Combed Cotton Poplin',
      'Pattern-matched sleeve plackets and collar points',
      'Convertible cuffs (buttons or cufflinks)',
      'Handcrafted in Nairobi Atelier'
    ]
  },
  {
    name: 'Burgundy Silk Grenadine Tie & Hand-Rolled Pocket Square Set',
    slug: 'burgundy-silk-grenadine-tie-pocket-square-set',
    tagline: 'Garza Fina Silk Weave with Silk Twill Hand-Rolled Pocket Square',
    description: 'Woven in Como, Italy on historic shuttle looms. The garza fina grenadine weave gives an exquisite tactile depth. Paired with a complementary 42cm hand-rolled 100% silk twill pocket square.',
    category: 'accessories',
    fabricDetails: '100% Italian Grenadine Silk & Mulberry Silk Twill',
    construction: 'Hand-rolled edges, self-tipped three-fold construction with wool interlining',
    priceKes: 5500,
    priceUsd: 42,
    images: [
      '/images/products/tie-burgundy-silk-grenadine.jpg'
    ],
    isFeatured: true,
    isInStock: true,
    variants: [
      { id: 'v-tie-1', size: 'Standard Set', color: 'Deep Burgundy', stockQuantity: 12, sku: 'MM-ACC-GRN-SET' }
    ],
    detailsList: [
      'Authentic Italian Garza Fina Grenadine Silk',
      '8cm blade width with wool canvas interlining for a perfect dimple',
      'Includes 42x42cm hand-rolled silk twill pocket square',
      'Modern Man Atelier presentation box'
    ]
  },
  {
    name: 'Artisanal Rhodium & Mother-of-Pearl Cufflinks Set',
    slug: 'artisanal-rhodium-mother-pearl-cufflinks-set',
    tagline: 'Iridescent Natural Mother-of-Pearl with High-Polished Rhodium Plating',
    description: 'Precision-turned circular cufflinks featuring hand-selected natural Australian mother-of-pearl inserts bezel-set in solid rhodium-plated brass. Comes in an embossed black velvet presentation box.',
    category: 'accessories',
    fabricDetails: 'Natural White Mother-of-Pearl & Rhodium-Plated Solid Brass',
    construction: 'Precision swivel bar closure, hypoallergenic tarnish-resistant finish',
    priceKes: 4500,
    priceUsd: 35,
    images: [
      '/images/products/cufflinks-rhodium-mother-pearl.jpg'
    ],
    isFeatured: true,
    isInStock: true,
    variants: [
      { id: 'v-cuff-1', size: 'Standard Set', color: 'Silver / Iridescent', stockQuantity: 15, sku: 'MM-ACC-CFF-MOP' }
    ],
    detailsList: [
      'Australian Natural Mother-of-Pearl disc',
      'Heavy rhodium plating for lifetime tarnish resistance',
      'Engineered whale-back swivel mechanism',
      'Delivered in signature velvet gift case'
    ]
  },
  {
    name: 'Full-Grain Cognac Italian Leather Dress Belt',
    slug: 'full-grain-cognac-italian-leather-dress-belt',
    tagline: 'Hand-Burnished Vegetable Tanned Leather with Solid Brushed Brass Buckle',
    description: 'Crafted from 3.2mm full-grain vegetable-tanned Italian bridle leather that ages with a magnificent patina. Finished with feathered edges, tonal saddle stitching, and a solid brushed brass roller buckle.',
    category: 'accessories',
    fabricDetails: 'Full-Grain Italian Tuscan Cowhide',
    construction: 'Hand-burnished wax-sealed edges, solid brass hardware, 35mm width',
    priceKes: 6500,
    priceUsd: 50,
    images: [
      '/images/products/belt-cognac-leather-brass.jpg'
    ],
    isFeatured: true,
    isInStock: true,
    variants: [
      { id: 'v-belt-1', size: '32-34 (M)', color: 'Cognac Brown', stockQuantity: 6, sku: 'MM-ACC-BLT-34' },
      { id: 'v-belt-2', size: '36-38 (L)', color: 'Cognac Brown', stockQuantity: 8, sku: 'MM-ACC-BLT-38' },
      { id: 'v-belt-3', size: '40-42 (XL)', color: 'Cognac Brown', stockQuantity: 5, sku: 'MM-ACC-BLT-42' },
    ],
    detailsList: [
      'Full-grain Italian vegetable-tanned leather',
      'Solid brushed brass hardware (nickel-free)',
      '35mm width designed for suit and dress trousers',
      'Handcrafted in Nairobi Atelier'
    ]
  },
  {
    name: 'Handcrafted Gold Boutonnière Lapel Pin',
    slug: 'handcrafted-gold-boutonniere-lapel-pin',
    tagline: '24K Gold-Plated Botanical Pin with Black Enamel Center',
    description: 'A distinguished sartorial accent for tuxedos and tailored suits. Handcrafted with sculpted petal detailing in polished gold finish with a deep onyx black enamel core and push-pin safety backing.',
    category: 'accessories',
    fabricDetails: '24K Gold Plated Alloy & Hand-Poured Glass Enamel',
    construction: 'Safety clutch pin back, anti-twist stabilizer post',
    priceKes: 3500,
    priceUsd: 27,
    images: [
      '/images/products/lapel-pin-gold-boutonniere.jpg'
    ],
    isFeatured: false,
    isInStock: true,
    variants: [
      { id: 'v-pin-1', size: 'One Size', color: 'Gold / Onyx', stockQuantity: 20, sku: 'MM-ACC-PIN-GLD' }
    ],
    detailsList: [
      '24K Gold finish with black glass enamel',
      'Dual-prong clutch to maintain upright lapel positioning',
      'Perfect for gala black-tie, weddings, and formal ceremonies',
      'Modern Man bespoke packaging'
    ]
  },
  {
    name: 'The Sovereign Onyx Minimalist Dress Watch',
    slug: 'the-sovereign-onyx-minimalist-dress-watch',
    tagline: 'Ultra-Slim 38mm Case with Sapphire Crystal & Black Alligator Grain Leather',
    description: 'Engineered for understated elegance under French cuffs. Ultra-slim 6.8mm profile, genuine sapphire crystal glass, matte black sunburst dial with gold indices, and a Japanese precision quartz movement.',
    category: 'accessories',
    fabricDetails: '316L Surgical Stainless Steel & Genuine Leather Strap',
    construction: '5 ATM water resistance, sapphire crystal glass, butterfly deployant clasp',
    priceKes: 18500,
    priceUsd: 145,
    images: [
      '/images/products/watch-onyx-minimalist.jpg'
    ],
    isFeatured: false,
    isInStock: true,
    variants: [
      { id: 'v-wtch-1', size: '38mm Case (Standard)', color: 'Gold / Black', stockQuantity: 4, sku: 'MM-ACC-WTC-ONX' }
    ],
    detailsList: [
      'Ultra-thin 6.8mm case slides cleanly under shirt cuffs',
      'Scratch-resistant sapphire crystal lens',
      'Genuine Italian calfskin leather strap with quick-release spring bars',
      'Atelier 2-Year International Warranty'
    ]
  }
];

async function seed() {
  console.log('Seeding', products.length, 'realistic products...');

  // 1. Remove these slugs from deleted_products.json so they aren't blocked
  const deletedFile = path.join(__dirname, '..', 'data', 'deleted_products.json');
  if (fs.existsSync(deletedFile)) {
    const deletedArr = JSON.parse(fs.readFileSync(deletedFile, 'utf8'));
    const slugSet = new Set(products.map(p => p.slug));
    const cleaned = deletedArr.filter(id => !slugSet.has(id));
    fs.writeFileSync(deletedFile, JSON.stringify(cleaned, null, 2), 'utf8');
    console.log('Cleaned deleted_products.json of new slugs');
  }

  // 2. Insert or update Supabase products
  const dbRows = products.map(p => ({
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    description: p.description,
    category: p.category,
    fabric_details: p.fabricDetails,
    construction: p.construction,
    price_kes: p.priceKes,
    price_usd: p.priceUsd,
    images: p.images,
    is_featured: p.isFeatured,
    is_in_stock: p.isInStock,
    updated_at: new Date().toISOString()
  }));

  const { data: upsertData, error: upsertError } = await client
    .from('products')
    .upsert(dbRows, { onConflict: 'slug' })
    .select();

  if (upsertError) {
    console.error('Supabase upsert error:', upsertError.message);
  } else {
    console.log(`Successfully stored ${upsertData ? upsertData.length : 0} items in Supabase products table!`);
  }

  // 3. Save to local data/custom_products.json as synchronized cache
  const localProducts = products.map((p, idx) => {
    const matchingDb = upsertData ? upsertData.find(d => d.slug === p.slug) : null;
    return {
      ...p,
      id: matchingDb ? matchingDb.id : `prod-seed-${idx + 1}`
    };
  });

  const customFile = path.join(__dirname, '..', 'data', 'custom_products.json');
  fs.writeFileSync(customFile, JSON.stringify(localProducts, null, 2), 'utf8');
  console.log('Successfully written to data/custom_products.json');
}

seed().catch(console.error);
