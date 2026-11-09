const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dzglmkwjbvvvqfieofdt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6Z2xta3dqYnZ2dnFmaWVvZmR0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4ODYwNTc4NywiZXhwIjoyMTA0MTgxNzg3fQ.vY9KmBAtC-hRnOQWwxzfSaPds-Eg5woDFFF_w7eXS_Y';

const FRAGRANCES = [
  {
    id: 'frag-sovereign-oud-01',
    name: 'Sovereign Oud & Ambergris Extrait de Parfum',
    slug: 'sovereign-oud-ambergris-extrait-de-parfum',
    category: 'fragrances',
    tagline: 'Rare Cambodian Oud, Golden Ambergris & Taif Rose Extrait (100ml)',
    description: 'An imposing, commanding evening extrait formulated exclusively for the Modern Man. Opens with crisp Calabrian bergamot and pink pepper, melting into an opulent heart of smoked Cambodian oud, Moroccan cedarwood, and rich golden ambergris. Handcrafted in micro-batches with heavy octagonal smoked obsidian flacon, engraved gold brass plaque, and magnetic cap.',
    fabric_details: 'Extrait de Parfum (35% High Oil Concentration) / Rare Cambodian Oud & Natural Ambergris',
    fabricDetails: 'Extrait de Parfum (35% High Oil Concentration) / Rare Cambodian Oud & Natural Ambergris',
    construction: 'Hand-blended in small atelier batches, heavy smoked crystal flacon with gold brass plaque',
    price_kes: 18500,
    priceKes: 18500,
    price_usd: 145,
    priceUsd: 145,
    images: ['/images/accessories/modern-man-sovereign-oud-ambergris.jpg'],
    is_featured: true,
    isFeatured: true,
    is_in_stock: true,
    isInStock: true,
    variants: [
      { id: 'v-oud-100', size: '100ml Extrait', color: 'Cognac Gold', stockQuantity: 8, sku: 'MM-FRAG-OUD-100' },
      { id: 'v-oud-50', size: '50ml Extrait', color: 'Cognac Gold', stockQuantity: 6, sku: 'MM-FRAG-OUD-50' },
    ],
    detailsList: [
      'Extrait de Parfum (35% High Oil Concentration)',
      'Top: Calabrian Bergamot, Pink Pepper | Heart: Taif Rose, Smoked Cedar | Base: Cambodian Oud, Golden Ambergris',
      'Heavy smoked obsidian crystal flacon with engraved brushed gold brass plaque',
      'Solid knurled magnetic brass cap',
      'Signature Modern Man Nairobi velvet-lined presentation gift box included',
    ],
  },
  {
    id: 'frag-savile-cedar-02',
    name: 'Savile Cedar & Spiced Vetiver Eau de Parfum',
    slug: 'savile-cedar-spiced-vetiver-eau-de-parfum',
    category: 'fragrances',
    tagline: 'Crisp Haitian Vetiver, Atlas Cedar & Pink Peppercorn (100ml)',
    description: 'Inspired by bespoke Savile Row tailoring traditions and crisp Kenyan highlands morning air. A razor-sharp sartorial signature blending Haitian vetiver, aromatic Atlas cedarwood, crushed cardamon, and vibrant green juniper. Housed in a tall fluted faceted crystal flacon with emerald leather ribbon and solid brass cap.',
    fabric_details: 'Eau de Parfum (22% Fine Fragrance Concentration) / Haitian Vetiver & Atlas Cedar',
    fabricDetails: 'Eau de Parfum (22% Fine Fragrance Concentration) / Haitian Vetiver & Atlas Cedar',
    construction: 'Fluted crystal flacon with genuine emerald leather neck collar and solid brass cap',
    price_kes: 15500,
    priceKes: 15500,
    price_usd: 120,
    priceUsd: 120,
    images: ['/images/accessories/modern-man-savile-cedar-vetiver.jpg'],
    is_featured: true,
    isFeatured: true,
    is_in_stock: true,
    isInStock: true,
    variants: [
      { id: 'v-cedar-100', size: '100ml Eau de Parfum', color: 'Champagne Gold', stockQuantity: 12, sku: 'MM-FRAG-CED-100' },
      { id: 'v-cedar-50', size: '50ml Eau de Parfum', color: 'Champagne Gold', stockQuantity: 8, sku: 'MM-FRAG-CED-50' },
    ],
    detailsList: [
      'Eau de Parfum (22% Fine Fragrance Concentration)',
      'Top: Italian Grapefruit, Pink Peppercorn | Heart: Crushed Cardamom, Juniper | Base: Haitian Vetiver, Atlas Cedarwood',
      'Tall fluted faceted crystal glass flacon',
      'Emerald green full-grain leather collar with gold rivet accent',
      'Signature Modern Man Nairobi gift presentation packaging',
    ],
  },
  {
    id: 'frag-atelier-santal-03',
    name: 'Atelier Santal & Black Leather Private Reserve',
    slug: 'atelier-santal-black-leather-private-reserve',
    category: 'fragrances',
    tagline: 'Creamy Mysore Sandalwood, Tuscan Leather & Smoked Birch (100ml)',
    description: 'An intimate, deeply sensual portrait of our bespoke cutting rooms. Evoking aged Italian full-grain leather, fragrant shavings of Mysore sandalwood, warm cashmere musk, and dried tobacco leaf. Packaged in a minimalist heavy espresso glass flacon with rose-gold metallic lettering and dark bronze cap.',
    fabric_details: 'Private Reserve Extrait (30% Oil Concentration) / Mysore Sandalwood & Tuscan Leather',
    fabricDetails: 'Private Reserve Extrait (30% Oil Concentration) / Mysore Sandalwood & Tuscan Leather',
    construction: 'Heavy espresso glass flacon with rose-gold typography and matte bronze cap',
    price_kes: 19500,
    priceKes: 19500,
    price_usd: 150,
    priceUsd: 150,
    images: ['/images/accessories/modern-man-atelier-santal-leather.jpg'],
    is_featured: true,
    isFeatured: true,
    is_in_stock: true,
    isInStock: true,
    variants: [
      { id: 'v-santal-100', size: '100ml Extrait', color: 'Amber Bronze', stockQuantity: 6, sku: 'MM-FRAG-SAN-100' },
      { id: 'v-santal-50', size: '50ml Extrait', color: 'Amber Bronze', stockQuantity: 4, sku: 'MM-FRAG-SAN-50' },
    ],
    detailsList: [
      'Private Reserve Extrait (30% Oil Concentration)',
      'Top: Cardamom, Fresh Violet Leaf | Heart: Tuscan Leather, Papyrus | Base: Mysore Sandalwood, Smoked Birch, Amber',
      'Minimalist heavy espresso tinted glass flacon with rose-gold metallic lettering',
      'Architectural matte bronze cap',
      'Signature Modern Man Kenya luxury gift box with certificate of authenticity',
    ],
  },
];

async function seed() {
  console.log('--- Modern Man Kenya: Seeding Fragrances to Supabase & Local Store ---');

  // 1. Update Supabase
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  for (const f of FRAGRANCES) {
    const dbPayload = {
      name: f.name,
      slug: f.slug,
      tagline: f.tagline,
      description: f.description,
      category: f.category,
      fabric_details: f.fabric_details,
      construction: f.construction,
      price_kes: f.price_kes,
      price_usd: f.price_usd,
      images: f.images,
      is_featured: f.is_featured,
      is_in_stock: f.is_in_stock,
      updated_at: new Date().toISOString(),
    };

    console.log(`Upserting ${f.name} into Supabase...`);
    const { data, error } = await supabase
      .from('products')
      .upsert(dbPayload, { onConflict: 'slug' })
      .select();

    if (error) {
      console.error(`Supabase error for ${f.slug}:`, error);
    } else {
      console.log(`✓ Supabase success for ${f.slug} (ID: ${data[0]?.id})`);
    }
  }

  // 2. Update local custom_products.json
  const customProductsPath = path.join(__dirname, '..', 'data', 'custom_products.json');
  let customProducts = [];
  try {
    if (fs.existsSync(customProductsPath)) {
      customProducts = JSON.parse(fs.readFileSync(customProductsPath, 'utf8'));
    }
  } catch (err) {
    console.warn('Could not read existing custom_products.json, starting fresh');
  }

  for (const f of FRAGRANCES) {
    const existingIdx = customProducts.findIndex(p => p.slug === f.slug || p.id === f.id);
    const item = {
      id: f.id,
      name: f.name,
      slug: f.slug,
      category: f.category,
      tagline: f.tagline,
      description: f.description,
      fabricDetails: f.fabricDetails,
      construction: f.construction,
      priceKes: f.priceKes,
      priceUsd: f.priceUsd,
      images: f.images,
      isFeatured: f.isFeatured,
      isInStock: f.isInStock,
      variants: f.variants,
      detailsList: f.detailsList,
    };

    if (existingIdx >= 0) {
      customProducts[existingIdx] = item;
    } else {
      customProducts.unshift(item);
    }
  }

  fs.writeFileSync(customProductsPath, JSON.stringify(customProducts, null, 2), 'utf8');
  console.log(`✓ Saved ${FRAGRANCES.length} fragrances to ${customProductsPath}`);
  console.log('Seeding complete!');
}

seed().catch(console.error);

