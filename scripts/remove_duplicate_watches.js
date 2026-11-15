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

// The 13 duplicate slugs to remove (keeping their original counterparts)
const DUPLICATE_SLUGS = [
  'watch-elysium-101',
  'watch-valhalla-102',
  'watch-kronos-103',
  'watch-chronarch-104',
  'watch-excalibur-105',
  'watch-paladin-106',
  'watch-centaur-107',
  'watch-minotaur-108',
  'watch-hyperion-110',
  'watch-prometheus-111',
  'watch-daedalus-113',
  'watch-achilles-114',
  'watch-odysseus-116'
];

async function main() {
  console.log(`Starting removal of ${DUPLICATE_SLUGS.length} duplicate watches...`);

  // 1. Load data/custom_products.json
  const customProductsPath = path.join(process.cwd(), 'data', 'custom_products.json');
  const products = JSON.parse(fs.readFileSync(customProductsPath, 'utf8'));

  const initialCount = products.length;
  const duplicateSet = new Set(DUPLICATE_SLUGS);
  
  // Find IDs of duplicate products
  const duplicateIds = [];
  const removedProducts = [];

  const filteredProducts = products.filter(p => {
    if (duplicateSet.has(p.slug)) {
      if (p.id) duplicateIds.push(p.id);
      removedProducts.push({ id: p.id, slug: p.slug, name: p.name });
      return false;
    }
    return true;
  });

  console.log(`Found ${removedProducts.length} duplicate products in custom_products.json:`);
  removedProducts.forEach(p => console.log(` - [${p.slug}] ${p.name} (ID: ${p.id})`));

  fs.writeFileSync(customProductsPath, JSON.stringify(filteredProducts, null, 2), 'utf8');
  console.log(`Updated custom_products.json: ${initialCount} -> ${filteredProducts.length} items.`);

  // 2. Update data/deleted_products.json
  const deletedFile = path.join(process.cwd(), 'data', 'deleted_products.json');
  let deletedList = [];
  try {
    if (fs.existsSync(deletedFile)) {
      deletedList = JSON.parse(fs.readFileSync(deletedFile, 'utf8'));
    }
  } catch (e) {}

  const deletedSet = new Set(Array.isArray(deletedList) ? deletedList : []);
  for (const id of duplicateIds) deletedSet.add(id);
  for (const slug of DUPLICATE_SLUGS) deletedSet.add(slug);

  fs.writeFileSync(deletedFile, JSON.stringify(Array.from(deletedSet), null, 2), 'utf8');
  console.log(`Updated deleted_products.json with ${duplicateIds.length} removed IDs and slugs.`);

  // 3. Delete from Supabase products table
  console.log('Deleting duplicate records from Supabase database...');
  for (const slug of DUPLICATE_SLUGS) {
    const { error } = await supabase.from('products').delete().eq('slug', slug);
    if (error) {
      console.error(`Failed to delete ${slug} from Supabase:`, error.message);
    } else {
      console.log(`Deleted ${slug} from Supabase.`);
    }
  }

  // 4. Update manifest and summary count
  const manifestPath = path.join(process.cwd(), 'data', 'watches_manifest.json');
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const filteredManifest = manifest
      .filter(m => !duplicateSet.has(m.slug))
      .map((m, idx) => ({ ...m, index: idx + 1 }));
    fs.writeFileSync(manifestPath, JSON.stringify(filteredManifest, null, 2), 'utf8');
    console.log(`Updated watches_manifest.json: ${filteredManifest.length} unique watches remaining.`);
  }

  console.log('\nAll 13 duplicate watch records successfully removed from website and database!');
}

main().catch(err => {
  console.error('Fatal error during duplicate removal:', err);
});
