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

async function processAndUploadWatches() {
  if (!fs.existsSync(WATCHES_DIR)) {
    console.log('watches upload directory does not exist.');
    return;
  }

  const files = fs.readdirSync(WATCHES_DIR);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f));

  if (imageFiles.length === 0) {
    console.log('No image files found in "watches upload" yet.');
    console.log('Drop your watch images into the folder and run this script again.');
    return;
  }

  console.log(`Found ${imageFiles.length} watch images to process and upload...`);

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i];
    const filePath = path.join(WATCHES_DIR, file);

    try {
      const ext = path.extname(file);
      const baseName = path.basename(file, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      const targetFileName = `watches/watch_${Date.now()}_${i + 1}_${baseName}.webp`;

      // Optimize image: resize if huge, convert to webp at 85% quality
      const buffer = await sharp(filePath)
        .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toBuffer();

      // Upload to Supabase Storage: product-images bucket
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(targetFileName, buffer, {
          contentType: 'image/webp',
          upsert: true,
        });

      if (error) {
        console.error(`[${i + 1}/${imageFiles.length}] Failed to upload ${file}:`, error.message);
        failCount++;
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(targetFileName);

        results.push({
          originalName: file,
          supabasePath: targetFileName,
          publicUrl: publicUrlData.publicUrl,
        });
        successCount++;
        console.log(`[${i + 1}/${imageFiles.length}] Uploaded: ${file} -> ${publicUrlData.publicUrl}`);
      }
    } catch (err) {
      console.error(`[${i + 1}/${imageFiles.length}] Error processing ${file}:`, err.message);
      failCount++;
    }
  }

  console.log('\n=======================================');
  console.log(`Upload Complete: ${successCount} succeeded, ${failCount} failed.`);
  console.log('=======================================');

  // Save the manifest of uploaded URLs so we can easily attach them to database products
  const manifestPath = path.join(process.cwd(), 'scripts', 'uploaded_watches_manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(results, null, 2), 'utf8');
  console.log(`Saved image URL manifest to: ${manifestPath}`);

  // Once all succeed, clean up the watch upload folder as requested
  if (successCount > 0 && failCount === 0) {
    console.log('\nCleaning up "watches upload" folder as requested...');
    for (const f of imageFiles) {
      try {
        fs.unlinkSync(path.join(WATCHES_DIR, f));
      } catch (e) {}
    }
    try {
      fs.rmdirSync(WATCHES_DIR);
      console.log('Successfully removed "watches upload" folder.');
    } catch (e) {
      console.log('Folder emptied.');
    }
  }
}

processAndUploadWatches().catch(err => {
  console.error('Fatal upload error:', err);
});

