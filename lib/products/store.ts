import fs from 'fs';
import path from 'path';
import { READY_TO_WEAR_PRODUCTS } from '@/data/mockData';
import type { Product } from '@/types';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_products.json');
const DELETED_FILE = path.join(process.cwd(), 'data', 'deleted_products.json');

/**
 * Reads deleted product IDs from disk
 */
function readDeletedIds(): Set<string> {
  try {
    if (!fs.existsSync(DELETED_FILE)) {
      return new Set();
    }
    const data = fs.readFileSync(DELETED_FILE, 'utf-8');
    const arr = JSON.parse(data);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch (err) {
    return new Set();
  }
}

/**
 * Adds an ID to the deleted list
 */
function addDeletedId(id: string) {
  try {
    const set = readDeletedIds();
    set.add(id);
    const dir = path.dirname(DELETED_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DELETED_FILE, JSON.stringify(Array.from(set), null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing deleted products file:', err);
  }
}

/**
 * Removes an ID from the deleted list (if recreating an item)
 */
function removeDeletedId(id: string) {
  try {
    const set = readDeletedIds();
    if (set.has(id)) {
      set.delete(id);
      fs.writeFileSync(DELETED_FILE, JSON.stringify(Array.from(set), null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('Error updating deleted products file:', err);
  }
}

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
 * Fetches all products (base mock catalogue + admin created/edited items, excluding deleted)
 */
export async function getMergedProducts(): Promise<Product[]> {
  const deletedIds = readDeletedIds();

  // If Supabase is connected, attempt to fetch from Supabase
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const { data, error } = await (supabase.from('products') as any)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        // Map Supabase DB rows to Product interface
        const dbProducts: Product[] = data
          .filter((row: any) => !deletedIds.has(row.id) && !deletedIds.has(row.slug))
          .map((row: any) => ({
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
              { id: `v-${row.id}-1`, size: 'Standard', color: 'Bespoke', stockQuantity: 5, sku: `MM-${row.slug}` },
            ],
            detailsList: [
              row.fabric_details || 'Handcrafted bespoke craftsmanship',
              row.construction || 'Full Floating Canvas',
              'Handcrafted in Nairobi Atelier',
            ],
          }));

        const dbSlugs = new Set(dbProducts.map((p) => p.slug));
        const mergedList = [...dbProducts];
        for (const base of READY_TO_WEAR_PRODUCTS) {
          if (!dbSlugs.has(base.slug) && !deletedIds.has(base.id) && !deletedIds.has(base.slug)) {
            mergedList.push(base);
          }
        }
        return mergedList;
      }
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local store:', err);
    }
  }

  // Fallback to local store merged with mock items
  const customProducts = readLocalProducts();
  const customMap = new Map(customProducts.map((p) => [p.id, p]));

  const merged: Product[] = [];
  
  // Custom products first (newest additions)
  for (const custom of customProducts) {
    if (!deletedIds.has(custom.id) && !deletedIds.has(custom.slug)) {
      merged.push(custom);
    }
  }

  // Base products (or their edited custom overrides)
  for (const base of READY_TO_WEAR_PRODUCTS) {
    if (deletedIds.has(base.id) || deletedIds.has(base.slug)) {
      continue;
    }
    if (customMap.has(base.id)) {
      // Overridden
      continue;
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
  // If previously deleted, un-blacklist it
  removeDeletedId(product.id);
  if (product.slug) removeDeletedId(product.slug);

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
  const index = customProducts.findIndex((p) => p.id === product.id || p.slug === product.slug);

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
  addDeletedId(id);

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
      if (isUUID) {
        await (supabase.from('products') as any)
          .delete()
          .or(`id.eq.${id},slug.eq.${id}`);
      } else {
        await (supabase.from('products') as any)
          .delete()
          .eq('slug', id);
      }
    } catch (err) {
      console.warn('Supabase delete error:', err);
    }
  }

  const customProducts = readLocalProducts();
  const filtered = customProducts.filter((p) => p.id !== id && p.slug !== id);
  writeLocalProducts(filtered);

  return true;
}
