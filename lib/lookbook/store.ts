import fs from 'fs';
import path from 'path';
import { SARTORIAL_GALLERY_ITEMS, GalleryItem } from '@/data/galleryData';
import { getSupabaseAdmin } from '@/lib/supabase/server';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_lookbook.json');
const DELETED_FILE = path.join(process.cwd(), 'data', 'deleted_lookbook_ids.json');
const BUCKET_NAME = 'lookbook-data';
const BUCKET_FILE = 'custom_lookbook.json';
const BUCKET_DELETED_FILE = 'deleted_lookbook_ids.json';

let cachedItems: GalleryItem[] | null = null;
let cachedDeletedIds: string[] | null = null;
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
    console.warn('Notice: Unable to write to local filesystem (expected on serverless):', err);
  }
}

function readLocalDeletedIds(): string[] {
  try {
    if (!fs.existsSync(DELETED_FILE)) return [];
    const raw = fs.readFileSync(DELETED_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalDeletedIds(ids: string[]) {
  try {
    const dir = path.dirname(DELETED_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DELETED_FILE, JSON.stringify(ids, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Notice: Unable to write local deleted IDs (expected on serverless):', err);
  }
}

export async function getDeletedLookbookIds(): Promise<string[]> {
  const now = Date.now();
  if (cachedDeletedIds && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedDeletedIds;
  }

  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = getSupabaseAdmin();
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .download(BUCKET_DELETED_FILE);

      if (!error && data) {
        const text = await data.text();
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed)) {
          cachedDeletedIds = parsed;
          writeLocalDeletedIds(parsed);
          return parsed;
        }
      }
    }
  } catch (err) {
    console.warn('Error fetching deleted lookbook IDs from Supabase:', err);
  }

  const local = readLocalDeletedIds();
  cachedDeletedIds = local;
  return local;
}

export async function saveDeletedLookbookIds(ids: string[]): Promise<boolean> {
  cachedDeletedIds = ids;
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = getSupabaseAdmin();
      const buffer = Buffer.from(JSON.stringify(ids, null, 2), 'utf-8');
      await supabase.storage
        .from(BUCKET_NAME)
        .upload(BUCKET_DELETED_FILE, buffer, {
          contentType: 'application/json',
          upsert: true,
        });
    }
  } catch (err) {
    console.warn('Error saving deleted IDs to Supabase:', err);
  }
  writeLocalDeletedIds(ids);
  return true;
}

export async function getCustomLookbookItems(): Promise<GalleryItem[]> {
  const now = Date.now();
  if (cachedItems && now - lastFetchTime < CACHE_TTL_MS) {
    return cachedItems;
  }

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
          writeLocalLookbook(parsed);
          return parsed;
        }
      }
    }
  } catch (supabaseErr) {
    console.warn('Notice: Supabase storage read error, falling back to local storage:', supabaseErr);
  }

  const local = readLocalLookbook();
  cachedItems = local;
  lastFetchTime = now;
  return local;
}

export async function saveCustomLookbookItems(items: GalleryItem[]): Promise<boolean> {
  cachedItems = items;
  lastFetchTime = Date.now();

  let savedToSupabase = false;
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
      }
    }
  } catch (err) {
    console.warn('Error saving lookbook to Supabase storage:', err);
  }

  writeLocalLookbook(items);
  return savedToSupabase || true;
}

export async function getMergedLookbookItems(): Promise<GalleryItem[]> {
  const [customItems, deletedIdsList] = await Promise.all([
    getCustomLookbookItems(),
    getDeletedLookbookIds(),
  ]);

  const deletedIds = new Set(deletedIdsList);
  const customIds = new Set(customItems.map((i) => i.id));

  const filteredCustom = customItems.filter((i) => !deletedIds.has(i.id));
  const remainingSeeded = SARTORIAL_GALLERY_ITEMS.filter(
    (item) => !customIds.has(item.id) && !deletedIds.has(item.id)
  );

  return [...filteredCustom, ...remainingSeeded];
}

export async function addCustomLookbookItem(item: GalleryItem): Promise<GalleryItem> {
  const current = await getCustomLookbookItems();
  const updated = [item, ...current.filter((i) => i.id !== item.id)];
  await saveCustomLookbookItems(updated);

  // If this item was previously marked as deleted, unmark it
  const deletedIds = await getDeletedLookbookIds();
  if (deletedIds.includes(item.id)) {
    await saveDeletedLookbookIds(deletedIds.filter((id) => id !== item.id));
  }

  return item;
}

export async function updateCustomLookbookItem(
  id: string,
  updates: Partial<GalleryItem>
): Promise<GalleryItem | null> {
  const current = await getCustomLookbookItems();
  const index = current.findIndex((item) => item.id === id);

  let updatedItem: GalleryItem;

  if (index > -1) {
    const existing = current[index];
    updatedItem = {
      ...existing,
      ...updates,
      id: existing.id,
      images: updates.images && updates.images.length > 0 ? updates.images : (updates.image ? [updates.image] : existing.images),
      image: updates.image || (updates.images && updates.images[0]) || existing.image,
    };
    current[index] = updatedItem;
  } else {
    // Check if it's an archive/seeded item
    const seeded = SARTORIAL_GALLERY_ITEMS.find((item) => item.id === id);
    if (!seeded) {
      return null;
    }
    updatedItem = {
      ...seeded,
      ...updates,
      id: seeded.id,
      images: updates.images && updates.images.length > 0 ? updates.images : (updates.image ? [updates.image] : seeded.images),
      image: updates.image || (updates.images && updates.images[0]) || seeded.image,
    };
    current.unshift(updatedItem);
  }

  // Ensure it's not marked as deleted
  const deletedIds = await getDeletedLookbookIds();
  if (deletedIds.includes(id)) {
    await saveDeletedLookbookIds(deletedIds.filter((dId) => dId !== id));
  }

  await saveCustomLookbookItems(current);
  return updatedItem;
}

export async function deleteCustomLookbookItem(id: string): Promise<boolean> {
  // 1. Remove from custom items if present
  const current = await getCustomLookbookItems();
  const filtered = current.filter((item) => item.id !== id);
  if (filtered.length !== current.length) {
    await saveCustomLookbookItems(filtered);
  }

  // 2. Add to deleted IDs set
  const deletedIds = await getDeletedLookbookIds();
  if (!deletedIds.includes(id)) {
    await saveDeletedLookbookIds([...deletedIds, id]);
  }

  return true;
}
