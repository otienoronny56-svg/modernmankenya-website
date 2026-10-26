import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { SARTORIAL_GALLERY_ITEMS, GalleryItem } from '@/data/galleryData';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_lookbook.json');

function readCustomLookbook(): GalleryItem[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) {
      return [];
    }
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading custom lookbook:', err);
    return [];
  }
}

function writeCustomLookbook(items: GalleryItem[]) {
  try {
    const dir = path.dirname(STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing custom lookbook:', err);
  }
}

export async function GET(req: NextRequest) {
  try {
    const customItems = readCustomLookbook();
    // Return custom first (newest), followed by seeded archive
    const merged = [...customItems, ...SARTORIAL_GALLERY_ITEMS];
    return NextResponse.json({ items: merged, customCount: customItems.length });
  } catch (error) {
    console.error('Error fetching lookbook items:', error);
    return NextResponse.json({ error: 'Failed to fetch lookbook' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    const referer = req.headers.get('referer') || '';
    const isFromAdmin = referer.includes('/admin');

    if (!isValid && !isFromAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await req.json();
    const { title, tag, category, image, images, aspect } = body;

    if (!title || !category || !image) {
      return NextResponse.json(
        { error: 'Title, category, and main photo are required' },
        { status: 400 }
      );
    }

    const newItem: GalleryItem = {
      id: `lookbook-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      tag: tag || 'Atelier Bespoke',
      category,
      image,
      images: images && images.length > 0 ? images : [image],
      aspect: aspect || 'portrait',
    };

    const current = readCustomLookbook();
    current.unshift(newItem);
    writeCustomLookbook(current);

    return NextResponse.json({
      success: true,
      message: 'Lookbook showcase published successfully',
      item: newItem,
    }, { status: 201 });
  } catch (error) {
    console.error('Error saving lookbook item:', error);
    return NextResponse.json({ error: 'Failed to save lookbook showcase' }, { status: 500 });
  }
}
