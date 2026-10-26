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

console.log('Supabase URL present:', Boolean(url));
console.log('Supabase Key present:', Boolean(key));

async function main() {
  if (!url || !key) {
    console.log('Supabase credentials not configured in .env.local');
    return;
  }
  const client = createClient(url, key);
  const { data, error } = await client.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
  } else {
    console.log('Total products in Supabase:', data ? data.length : 0);
    if (data && data.length > 0) {
      console.log('First 3 items:', data.slice(0, 3).map(p => ({ id: p.id, name: p.name, slug: p.slug, category: p.category })));
    }
  }
}

main().catch(console.error);
