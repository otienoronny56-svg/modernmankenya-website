const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read environment variables from .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
    env[k] = v;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Error: Supabase environment variables missing in .env.local');
  process.exit(1);
}

const supabase = createClient(url, key);

// Supplier prices in KES directly from Big Ben WhatsApp screenshots
// Markup rule:
// - Below 30k (or <= 30k): add 2k (+ 2,000 KES)
// - Above 30k (> 30k): add 5k (+ 5,000 KES)
function calculateRetailPrice(supplierKes) {
  if (supplierKes <= 30000) {
    return supplierKes + 2000;
  } else {
    return supplierKes + 5000;
  }
}

const SUPPLIER_PRICES = {
  // Screenshot 1 & 5: Cartier Tanks, Nautilus, RM, Crazy Hours
  'watch-vantage-04': 28000,        // Cartier Tank Steel -> 30,000
  'watch-sovereign-03': 28000,      // Cartier Tank Gold -> 30,000
  'watch-chronos-01': 28000,        // Cartier Tank Gold Elongated -> 30,000
  'watch-presage-09': 28000,        // Cartier Tank Steel White Dial -> 30,000
  'watch-zenith-11': 25000,         // Cartier Tank Ladies Blue Strap -> 27,000
  'watch-royale-05': 35000,         // Patek Philippe Nautilus Two-Tone -> 40,000
  'watch-nautilus-02': 95000,       // Franck Muller Crazy Hours Rainbow -> 100,000
  'watch-legacy-10': 95000,         // Franck Muller Crazy Hours Multi-color -> 100,000
  'watch-heritage-08': 85000,       // Richard Mille RM 011 Red Strap -> 90,000
  'watch-imperium-13': 35000,       // Patek Philippe Nautilus Steel Blue -> 40,000
  'watch-eclipse-07': 80000,        // Patek Philippe Calatrava Charcoal -> 85,000
  'watch-meridian-06': 80000,       // Patek Philippe Calatrava Embossed -> 85,000
  'watch-calatrava-14': 40000,      // Audemars Piguet Royal Oak Steel Blue -> 45,000
  'watch-astral-15': 25000,         // Tory Burch Eleanor Purple/Gold -> 27,000
  'watch-monaco-12': 80000,         // Franck Muller Vanguard -> 85,000
  'watch-horizon-16': 43000,        // Hublot Big Bang Skeleton -> 48,000
  'watch-summit-20': 30000,         // Tory Burch Eleanor Gold Bracelet -> 32,000
  'watch-vanguard-17': 43000,       // Hublot Big Bang -> 48,000
  'watch-dynasty-18': 35000,        // Cartier Ballon Bleu Purple Strap -> 40,000
  'watch-apex-19': 25000,           // Rolex Datejust Ladies Gold Jubilee -> 27,000
  'watch-orbit-21': 30000,          // Piaget Limelight Gala Ladies Gold -> 32,000
  'watch-titanium-22': 30000,       // Tory Burch Eleanor Ladies Gold -> 32,000
  'watch-obsidian-23': 35000,       // Rolex Datejust Diamond Paved -> 40,000
  'watch-prestige-27': 40000,       // Audemars Piguet Royal Oak Rose Gold -> 45,000
  'watch-sapphire-24': 25000,       // Rado True Thinline White Ceramic -> 27,000
  'watch-aureus-25': 30000,         // Versace Palazzo Empire Ladies Rose Gold -> 32,000
  'watch-solstice-26': 35000,       // Cartier Santos Gold Bracelet -> 40,000
  'watch-paragon-28': 80000,        // Franck Muller Crazy Hours Diamond -> 85,000
  'watch-tempest-30': 250000,       // Rolex Daytona Panda on Stand with Pouch -> 255,000
  'watch-maestro-29': 30000,        // Omega Speedmaster Blue Chrono -> 32,000
  'watch-spectre-31': 212000,       // Richard Mille RM 27 Tourbillon Black -> 217,000
  'watch-navigator-32': 30000,      // Rolex Datejust Steel Grey Dial -> 32,000
  'watch-equinox-33': 35000,        // Rolex Datejust Two-Tone Fluted Bezel -> 40,000
  'watch-centurion-34': 53000,      // Breitling Chrono Blue Dial -> 58,000
  'watch-chronograph-36': 35000,    // Patek Philippe Moonphase Cream Dial -> 40,000

  // Screenshot 3 & 7: Gucci 25H collection (55k across all colorways)
  'watch-viceroy-35': 55000,        // Gucci 25H Black -> 60,000
  'watch-stellar-37': 55000,        // Gucci 25H Silver-Grey -> 60,000
  'watch-odyssey-38': 55000,        // Gucci 25H Turquoise -> 60,000
  'watch-carrera-39': 55000,        // Gucci 25H White -> 60,000
  'watch-daytona-40': 55000,        // Gucci 25H Gold -> 60,000
  'watch-submariner-43': 55000,     // Gucci 25H Olive Green -> 60,000

  // Additional confirmed watches from supplier chat
  'watch-santos-49': 35000,         // Rolex Day-Date Yellow Gold -> 40,000
  'watch-saturn-83': 33000,         // Patek Philippe Golden Ellipse Gold Mesh -> 38,000
  'watch-aldebaran-92': 40000,      // Rolex Submariner Date Green Cerachrom -> 45,000
  'watch-corinth-123': 40000        // Rolex GMT-Master II Pepsi Bezel -> 45,000
};

async function main() {
  console.log('--- Applying Supplier Pricing & Catalog Pruning ---');

  // 1. Read custom_products.json
  const customProductsPath = path.join(process.cwd(), 'data', 'custom_products.json');
  const products = JSON.parse(fs.readFileSync(customProductsPath, 'utf8'));

  const keptProducts = [];
  const removedWatchSlugs = [];
  const removedWatchIds = [];

  for (const p of products) {
    const isWatch = p.slug && p.slug.startsWith('watch-');
    if (!isWatch) {
      // Keep all non-watch products (perfumes, suits, shirts, etc.)
      keptProducts.push(p);
      continue;
    }

    if (SUPPLIER_PRICES[p.slug]) {
      // Watch is confirmed by supplier! Apply markup rule
      const supplierKes = SUPPLIER_PRICES[p.slug];
      const retailKes = calculateRetailPrice(supplierKes);
      const retailUsd = Math.round(retailKes / 130);

      p.priceKes = retailKes;
      p.priceUsd = retailUsd;
      keptProducts.push(p);
      console.log(`✓ KEPT: [${p.slug}] ${p.name} | Supplier: KES ${supplierKes.toLocaleString()} -> Retail: KES ${retailKes.toLocaleString()} ($${retailUsd})`);
    } else {
      // Unlisted / unpriced by supplier -> mark for deletion
      removedWatchSlugs.push(p.slug);
      if (p.id) removedWatchIds.push(p.id);
    }
  }

  console.log(`\nPreserving ${keptProducts.filter(p => p.slug && p.slug.startsWith('watch-')).length} verified supplier watches.`);
  console.log(`Deleting ${removedWatchSlugs.length} unlisted watch references as instructed.\n`);

  // 2. Save filtered custom_products.json
  fs.writeFileSync(customProductsPath, JSON.stringify(keptProducts, null, 2), 'utf8');
  console.log(`Updated data/custom_products.json (${products.length} -> ${keptProducts.length} items total).`);

  // 3. Update data/deleted_products.json so deleted watches don't resurrect
  const deletedFile = path.join(process.cwd(), 'data', 'deleted_products.json');
  let deletedList = [];
  try {
    if (fs.existsSync(deletedFile)) {
      deletedList = JSON.parse(fs.readFileSync(deletedFile, 'utf8'));
    }
  } catch (e) {}

  const deletedSet = new Set(Array.isArray(deletedList) ? deletedList : []);
  for (const id of removedWatchIds) deletedSet.add(id);
  for (const slug of removedWatchSlugs) deletedSet.add(slug);

  fs.writeFileSync(deletedFile, JSON.stringify(Array.from(deletedSet), null, 2), 'utf8');
  console.log(`Updated data/deleted_products.json with ${deletedSet.size} deleted identifiers.`);

  // 4. Update data/watches_manifest.json
  const manifestPath = path.join(process.cwd(), 'data', 'watches_manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const keptSlugsSet = new Set(Object.keys(SUPPLIER_PRICES));
    const filteredManifest = manifest
      .filter(m => keptSlugsSet.has(m.slug))
      .map((m, idx) => ({
        ...m,
        index: idx + 1,
        supplier_price_kes: SUPPLIER_PRICES[m.slug],
        price_kes: calculateRetailPrice(SUPPLIER_PRICES[m.slug]),
        price_usd: Math.round(calculateRetailPrice(SUPPLIER_PRICES[m.slug]) / 130)
      }));

    fs.writeFileSync(manifestPath, JSON.stringify(filteredManifest, null, 2), 'utf8');
    console.log(`Updated data/watches_manifest.json with ${filteredManifest.length} verified listings.`);
  }

  // 5. Update Supabase database
  console.log('\n--- Syncing Updates to Supabase Database ---');
  // 5a. Delete unlisted watches from Supabase
  console.log(`Deleting ${removedWatchSlugs.length} unlisted watches from Supabase in batches...`);
  for (let i = 0; i < removedWatchSlugs.length; i += 25) {
    const chunk = removedWatchSlugs.slice(i, i + 25);
    const { error } = await supabase.from('products').delete().in('slug', chunk);
    if (error) {
      console.error(`Error deleting chunk from Supabase:`, error.message);
    }
  }
  console.log('Unlisted watches deleted from Supabase.');

  // 5b. Update prices of kept watches in Supabase
  console.log(`Updating prices for ${Object.keys(SUPPLIER_PRICES).length} kept watches in Supabase...`);
  for (const [slug, supplierKes] of Object.entries(SUPPLIER_PRICES)) {
    const retailKes = calculateRetailPrice(supplierKes);
    const retailUsd = Math.round(retailKes / 130);
    const { error } = await supabase.from('products')
      .update({ price_kes: retailKes, price_usd: retailUsd })
      .eq('slug', slug);

    if (error) {
      console.error(`Failed to update price for ${slug}:`, error.message);
    }
  }

  console.log('All Supabase database records successfully updated!');
  console.log('\n=== Process Complete! ===');
}

main().catch(err => {
  console.error('Fatal error during pricing and pruning:', err);
});
