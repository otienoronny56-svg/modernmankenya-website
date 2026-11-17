import fs from 'fs';
import path from 'path';
import { GalleryItem } from '@/data/galleryData';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_lookbook.json');
const BUCKET_NAME = 'lookbook-data';
const BUCKET_FILE = 'custom_lookbook.json';

let cachedItems: GalleryItem[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL_MS = 5000; // 5 seconds cache

function readLocalLookbook(): GalleryItem[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return [];
    const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Error reading local custom lookbook file:', err);
    return [];
  }
}

function writeLocalLookbook(items: GalleryItem[]) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    // Non-fatal on serverless readonly environments
    console.warn('Notice: Unable to write to local filesystem (expected on serverless):', err);
  }
}

export async function getCustomLookbookItems(): Promise<GalleryItem[]> {
  const now = Date.now();
  if (cachedItems && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedItems;
  }

  // 1. Try fetching from Supabase Storage
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(BUCKET_FILE);

      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          cachedItems = parsed;
          lastFetchTime = now;
          // Synchronize local copy as backup
          writeLocalLookbook(parsed);
          return parsed;
        }
      }
    }
  } catch (supabaseErr) {
    console.warn('Notice: Supabase storage read error, falling back to local storage:', supabaseErr);
  }

  // 2. Fallback to local storage
  const local = readLocalLookbook();
  cachedItems = local;
  lastFetchTime = now;
  return local;
}

export async function saveCustomLookbookItems(items: GalleryItem[]): Promise<boolean> {
  cachedItems = items;
  lastFetchTime = Date.now();

  let savedToSupabase = false;

  // 1. Upload to Supabase Storage
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = getSupabaseAdmin();
      const buffer = Buffer.from(JSON.stringify(items, null, 2), 'utf-8');
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(BUCKET_FILE, buffer, {
          contentType: 'application/json',
          upsert: true,
        });

      if (!error) {
        savedToSupabase = true;
      } else {
        console.warn('Supabase storage upload error:', error);
      }
    }
  } catch (err) {
    console.warn('Error saving lookbook to Supabase storage:', err);
  }

  // 2. Write to local file as backup
  writeLocalLookbook(items);

  return savedToSupabase || true;
}

export async function addCustomLookbookItem(item: GalleryItem): Promise<GalleryItem> {
  const current = await getCustomLookbookItems();
  const updated = [item, ...current.filter((i) => i.id !== item.id)];
  await saveCustomLookbookItems(updated);
  return item;
}

export async function updateCustomLookbookItem(
  id: string,
  updates: Partial<GalleryItem>
): Promise<GalleryItem | null> {
  const current = await getCustomLookbookItems();
  const index = current.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }

  const existing = current[index];
  const updatedItem: GalleryItem = {
    ...existing,
    ...updates,
    id: existing.id, // Preserve original ID
    images: updates.images && updates.images.length > 0 ? updates.images : (updates.image ? [updates.image] : existing.images),
    image: updates.image || (updates.images && updates.images[0]) || existing.image,
  };

  current[index] = updatedItem;
  await saveCustomLookbookItems(current);
  return updatedItem;
}

export async function deleteCustomLookbookItem(id: string): Promise<boolean> {
  const current = await getCustomLookbookItems();
  const filtered = current.filter((item) => item.id !== id);
  if (filtered.length === current.length) {
    return false; // Item not found
  }
  await saveCustomLookbookItems(filtered);
  return true;
}
