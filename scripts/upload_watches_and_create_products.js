const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
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
const WATCHES_DIR = path.join(process.cwd(), 'watches upload');

// 100 Distinct Luxury One-Word Watch Names
const LUXURY_NAMES = [
  'Chronos', 'Nautilus', 'Sovereign', 'Vantage', 'Royale', 'Meridian', 'Eclipse', 'Heritage', 'Presage', 'Legacy',
  'Zenith', 'Monaco', 'Imperium', 'Calatrava', 'Astral', 'Horizon', 'Vanguard', 'Dynasty', 'Apex', 'Summit',
  'Orbit', 'Titanium', 'Obsidian', 'Sapphire', 'Aureus', 'Solstice', 'Prestige', 'Paragon', 'Maestro', 'Tempest',
  'Spectre', 'Navigator', 'Equinox', 'Centurion', 'Viceroy', 'Chronograph', 'Stellar', 'Odyssey', 'Carrera', 'Daytona',
  'Speedmaster', 'Seamaster', 'Submariner', 'Aquaracer', 'Constellation', 'Radiomir', 'Luminor', 'Tank', 'Santos', 'Ballon',
  'Overseas', 'Tradition', 'Classique', 'Octo', 'Defy', 'Pilot', 'Ingenieur', 'Portofino', 'Portugieser', 'BigBang',
  'Fusion', 'Classic', 'Falcon', 'Eagle', 'Hawk', 'Condor', 'Phoenix', 'Griffin', 'Pegasus', 'Titan',
  'Atlas', 'Orion', 'Apollo', 'Hermes', 'Zeus', 'Poseidon', 'Ares', 'Vulcan', 'Jupiter', 'Neptune',
  'Mercury', 'Mars', 'Saturn', 'Pluto', 'Sirius', 'Vega', 'Polaris', 'Castor', 'Pollux', 'Rigel',
  'Betelgeuse', 'Aldebaran', 'Antares', 'Spica', 'Regulus', 'Arcturus', 'Capella', 'Altair', 'Deneb', 'Procyon'
];

async function main() {
  if (!fs.existsSync(WATCHES_DIR)) {
    console.error('Directory "watches upload" does not exist.');
    return;
  }

  const files = fs.readdirSync(WATCHES_DIR);
  const imageFiles = files
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .sort();

  console.log(`Starting bulk import of ${imageFiles.length} watch images...`);

  const createdProducts = [];
  const errors = [];

  // Concurrency pool helper
  const CONCURRENCY = 5;
  let currentIndex = 0;

  async function worker(workerId) {
    while (currentIndex < imageFiles.length) {
      const idx = currentIndex++;
      const file = imageFiles[idx];
      const filePath = path.join(WATCHES_DIR, file);
      const name = LUXURY_NAMES[idx] || `Chronograph-${idx + 1}`;
      const slug = `watch-${name.toLowerCase()}-${String(idx + 1).padStart(2, '0')}`;
      const targetFileName = `watches/${slug}.webp`;

      try {
        // Step A: Optimize with sharp
        const optimizedBuffer = await sharp(filePath)
          .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();

        // Step B: Upload to Supabase Storage bucket 'product-images'
        const { error: storageError } = await supabase.storage
          .from('product-images')
          .upload(targetFileName, optimizedBuffer, {
            contentType: 'image/webp',
            upsert: true,
          });

        if (storageError) {
          throw new Error(`Storage upload failed: ${storageError.message}`);
        }

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(targetFileName);

        const publicUrl = publicUrlData.publicUrl;

        // Step C: Build product record
        const productPayload = {
          name: name,
          slug: slug,
          tagline: 'Luxury Timepiece • Made to Measure',
          description: `Handcrafted ${name} luxury timepiece. Engineered with precision mechanical movement, scratch-resistant sapphire crystal glass, and bespoke finishing. Edit details, price, and specs anytime in your admin dashboard.`,
          category: 'accessories',
          fabric_details: '316L Stainless Steel & Double-Domed Sapphire Crystal',
          construction: 'Precision Automatic Mechanical Movement • 50M Water Resistance',
          price_kes: 24500,
          price_usd: 190,
          images: [publicUrl],
          is_featured: idx < 6, // feature the first 6
          is_in_stock: true,
          updated_at: new Date().toISOString(),
        };

        // Step D: Insert into Supabase 'products' table
        const { data: dbData, error: dbError } = await supabase
          .from('products')
          .upsert(productPayload, { onConflict: 'slug' })
          .select()
          .single();

        if (dbError) {
          throw new Error(`DB insert failed: ${dbError.message}`);
        }

        createdProducts.push({
          id: dbData.id,
          name: name,
          slug: slug,
          priceKes: 24500,
          imageUrl: publicUrl,
        });

        console.log(`[${idx + 1}/${imageFiles.length}] [Worker ${workerId}] Successfully processed "${name}" -> ${slug}`);
      } catch (err) {
        console.error(`[${idx + 1}/${imageFiles.length}] Failed on "${file}":`, err.message);
        errors.push({ file, error: err.message });
      }
    }
  }

  // Run workers concurrently
  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  console.log('\n=======================================');
  console.log(`IMPORT COMPLETE: ${createdProducts.length} watches added, ${errors.length} errors.`);
  console.log('=======================================');

  // Also update local custom_products.json so fallback store is in sync
  try {
    const customJsonPath = path.join(process.cwd(), 'data', 'custom_products.json');
    let existingCustom = [];
    if (fs.existsSync(customJsonPath)) {
      try {
        existingCustom = JSON.parse(fs.readFileSync(customJsonPath, 'utf8'));
      } catch (e) {}
    }

    const localMap = new Map(existingCustom.map(p => [p.slug, p]));
    for (const cp of createdProducts) {
      localMap.set(cp.slug, {
        id: cp.id,
        name: cp.name,
        slug: cp.slug,
        tagline: 'Luxury Timepiece • Made to Measure',
        description: `Handcrafted ${cp.name} luxury timepiece. Engineered with precision mechanical movement, scratch-resistant sapphire crystal glass, and bespoke finishing. Edit details, price, and specs anytime in your admin dashboard.`,
        category: 'accessories',
        fabricDetails: '316L Stainless Steel & Double-Domed Sapphire Crystal',
        construction: 'Precision Automatic Mechanical Movement • 50M Water Resistance',
        priceKes: cp.priceKes,
        priceUsd: 190,
        images: [cp.imageUrl],
        isFeatured: cp.isFeatured ?? false,
        isInStock: true,
        variants: [
          { id: `v-${cp.slug}-1`, size: 'Standard (40mm)', color: 'Stainless Steel', stockQuantity: 5, sku: `MM-${cp.slug.toUpperCase()}` },
        ],
        detailsList: [
          '316L Stainless Steel & Double-Domed Sapphire Crystal',
          'Precision Automatic Mechanical Movement • 50M Water Resistance',
          'Hand-assembled • Nairobi Atelier'
        ]
      });
    }

    fs.writeFileSync(customJsonPath, JSON.stringify(Array.from(localMap.values()), null, 2), 'utf8');
    console.log(`Synchronized ${createdProducts.length} items to local fallback store (data/custom_products.json).`);
  } catch (err) {
    console.warn('Could not sync to local JSON:', err.message);
  }

  // Save full manifest
  fs.writeFileSync(
    path.join(process.cwd(), 'scripts', 'watches_import_summary.json'),
    JSON.stringify({ total: createdProducts.length, createdProducts, errors }, null, 2),
    'utf8'
  );

  // If all succeeded with 0 errors, delete the watches upload folder as requested
  if (createdProducts.length > 0 && errors.length === 0) {
    console.log('\nCleaning up "watches upload" folder as requested...');
    for (const f of imageFiles) {
      try {
        fs.unlinkSync(path.join(WATCHES_DIR, f));
      } catch (e) {}
    }
    try {
      fs.rmdirSync(WATCHES_DIR);
      console.log('Successfully deleted the "watches upload" folder.');
    } catch (e) {
      console.log('Removed all files inside "watches upload".');
    }
  }
}

main().catch(err => {
  console.error('Fatal import error:', err);
});
