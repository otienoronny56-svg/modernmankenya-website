import fs from 'fs';
import path from 'path';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';
import type { Product } from '@/types';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_products.json');

/**
 * Reads local custom products from disk
 */
function readLocalProducts(): Product[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading custom products file:', err);
    return [];
  }
}

/**
 * Writes local custom products to disk
 */
function writeLocalProducts(products: Product[]) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(products, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing custom products file:', err);
  }
}

/**
 * Checks if Supabase is configured
 */
function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY !== ''
  );
}

/**
 * Fetches all products (base mock catalogue + admin created/edited items)
 */
export async function getMergedProducts(): Promise<Product[]> {
  // If Supabase is connected, attempt to fetch from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map Supabase DB rows to Product interface
        return data.map((row: any) => ({
          id: row.id,
          name: row.name,
          slug: row.slug,
          tagline: row.tagline || '',
          description: row.description || '',
          category: row.category,
          fabricDetails: row.fabric_details || '',
          construction: row.construction || 'Full Floating Canvas',
          priceKes: Number(row.price_kes),
          priceUsd: Number(row.price_usd),
          images: row.images || [],
          isFeatured: Boolean(row.is_featured),
          isInStock: Boolean(row.is_in_stock),
          variants: [
            { id: `v-${row.id}-38`, size: '38R', color: 'Bespoke', stockQuantity: 5, sku: `MM-${row.slug}-38R` },
            { id: `v-${row.id}-40`, size: '40R', color: 'Bespoke', stockQuantity: 5, sku: `MM-${row.slug}-40R` },
            { id: `v-${row.id}-42`, size: '42R', color: 'Bespoke', stockQuantity: 5, sku: `MM-${row.slug}-42R` },
            { id: `v-${row.id}-44`, size: '44R', color: 'Bespoke', stockQuantity: 5, sku: `MM-${row.slug}-44R` },
          ],
          detailsList: [
            row.fabric_details || 'Handcrafted bespoke craftsmanship',
            row.construction || 'Full Floating Canvas',
            'Made to measure in Nairobi Atelier',
          ],
        }));
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local store:', err);
    }
  }

  // Fallback to local store merged with mock items
  const customProducts = readLocalProducts();
  const customMap = new Map(customProducts.map((p) => [p.id, p]));

  // Merge mock products: if an item was edited in custom, use the edited version
  const merged: Product[] = [];
  
  // Custom products first (newest additions)
  for (const custom of customProducts) {
    if (!READY_TO_WEAR_PRODUCTS.some((m) => m.id === custom.id)) {
      merged.push(custom);
    }
  }

  // Base products (or their edited custom overrides)
  for (const base of READY_TO_WEAR_PRODUCTS) {
    if (customMap.has(base.id)) {
      merged.push(customMap.get(base.id)!);
    } else {
      merged.push(base);
    }
  }

  return merged;
}

/**
 * Creates or updates a product
 */
export async function saveProduct(product: Product): Promise<Product> {
  // If Supabase configured, write to Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const dbPayload = {
        name: product.name,
        slug: product.slug,
        tagline: product.tagline,
        description: product.description,
        category: product.category,
        fabric_details: product.fabricDetails,
        construction: product.construction,
        price_kes: product.priceKes,
        price_usd: product.priceUsd,
        images: product.images,
        is_featured: product.isFeatured ?? false,
        is_in_stock: product.isInStock ?? true,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await (supabase
        .from('products') as any)
        .upsert(dbPayload, { onConflict: 'slug' })
        .select()
        .single();

      if (!error && data) {
        return {
          ...product,
          id: data.id,
        };
      }
    } catch (err) {
      console.warn('Supabase upsert failed, saving to local store:', err);
    }
  }

  // Local storage save
  const customProducts = readLocalProducts();
  const index = customProducts.findIndex((p) => p.id === product.id);

  if (index >= 0) {
    customProducts[index] = product;
  } else {
    customProducts.unshift(product);
  }

  writeLocalProducts(customProducts);
  return product;
}

/**
 * Deletes a product by ID
 */
export async function deleteProduct(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      await supabase.from('products').delete().eq('id', id);
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  const customProducts = readLocalProducts();
  const filtered = customProducts.filter((p) => p.id !== id);
  writeLocalProducts(filtered);

  return true;
}
