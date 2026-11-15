const fs = require('fs');
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
  const { data, count, error } = await supabase.from('products').select('id, name, slug, category, images', { count: 'exact' });
  if (error) {
    console.error('Error querying Supabase:', error);
  } else {
    console.log('Total products in Supabase:', count);
    const watches = (data || []).filter(p => p.slug && p.slug.startsWith('watch-'));
    console.log('Watches with slug watch-* in Supabase:', watches.length);
    if (watches.length > 0) {
      console.log('Sample watch from Supabase:', watches[0]);
    }
  }
}

main();
