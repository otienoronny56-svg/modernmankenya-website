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

async function main() {
  const batchFiles = [
    'data/watches_analyzed_1_to_40.json',
    'data/watches_analyzed_41_to_80.json',
    'data/watches_analyzed_81_to_120.json',
    'data/watches_analyzed_121_to_160.json',
    'data/watches_analyzed_161_to_200.json'
  ];

  const missing = batchFiles.filter(f => !fs.existsSync(f));
  if (missing.length > 0) {
    console.log(`Waiting for subagent batch files: missing ${missing.join(', ')}`);
    return false;
  }

  let allAnalyzed = [];
  for (const f of batchFiles) {
    try {
      const data = JSON.parse(fs.readFileSync(f, 'utf8'));
      if (Array.isArray(data)) {
        allAnalyzed = allAnalyzed.concat(data);
      }
    } catch (e) {
      console.error(`Error reading ${f}:`, e.message);
      return false;
    }
  }

  console.log(`Loaded ${allAnalyzed.length} analyzed watches from all 5 batches.`);

  // Map by id and by slug
  const analysisMapById = new Map();
  const analysisMapBySlug = new Map();
  for (const item of allAnalyzed) {
    if (item.id) analysisMapById.set(item.id, item);
    if (item.slug) analysisMapBySlug.set(item.slug, item);
  }

  // 1. Update data/custom_products.json
  const customProductsPath = path.join(process.cwd(), 'data', 'custom_products.json');
  const products = JSON.parse(fs.readFileSync(customProductsPath, 'utf8'));

  let updatedCount = 0;
  for (const p of products) {
    const analysis = analysisMapById.get(p.id) || analysisMapBySlug.get(p.slug);
    if (analysis && analysis.name) {
      p.name = analysis.name;
      if (analysis.description) p.description = analysis.description;
      if (analysis.tagline) p.tagline = analysis.tagline;
      if (analysis.brand) p.brand = analysis.brand;
      if (analysis.detailsList && Array.isArray(analysis.detailsList)) {
        p.detailsList = analysis.detailsList;
      }
      updatedCount++;
    }
  }

  fs.writeFileSync(customProductsPath, JSON.stringify(products, null, 2), 'utf8');
  console.log(`Updated ${updatedCount} watch products in data/custom_products.json`);

  // 2. Sync updates to Supabase products table
  console.log('Syncing updates to Supabase products table in batches...');
  let supabaseUpdated = 0;
  for (let i = 0; i < allAnalyzed.length; i += 20) {
    const chunk = allAnalyzed.slice(i, i + 20);
    for (const item of chunk) {
      const updateData = {
        name: item.name,
      };
      if (item.description) updateData.description = item.description;
      if (item.tagline) updateData.tagline = item.tagline;

      const query = item.id 
        ? supabase.from('products').update(updateData).eq('id', item.id)
        : supabase.from('products').update(updateData).eq('slug', item.slug);

      const { error } = await query;
      if (error) {
        console.error(`Failed to update Supabase product ${item.slug || item.id}:`, error.message);
      } else {
        supabaseUpdated++;
      }
    }
  }

  console.log(`Successfully updated ${supabaseUpdated} watches in Supabase database!`);
  return true;
}

main().then(success => {
  if (success) console.log('All watch updates applied successfully!');
}).catch(err => {
  console.error('Fatal error applying watch analysis:', err);
});
