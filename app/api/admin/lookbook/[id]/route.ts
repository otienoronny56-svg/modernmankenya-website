import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { GalleryItem } from '@/data/galleryData';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';

const STORAGE_FILE = path.join(process.cwd(), 'data', 'custom_lookbook.json');

function readCustomLookbook(): GalleryItem[] {
  try {
    if (!fs.existsSync(STORAGE_FILE)) return [];
    const data = fs.readFileSync(STORAGE_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeCustomLookbook(items: GalleryItem[]) {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(items, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing custom lookbook:', err);
  }
}

interface Context {
  params: Promise<{ id: string }>;
}

export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    const referer = req.headers.get('referer') || '';
    const isFromAdmin = referer.includes('/admin');

    if (!isValid && !isFromAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { id } = await params;
    const current = readCustomLookbook();
    const filtered = current.filter((item) => item.id !== id);
    writeCustomLookbook(filtered);

    return NextResponse.json({ success: true, message: 'Lookbook photo removed' });
  } catch (error) {
    console.error('Error deleting lookbook photo:', error);
    return NextResponse.json({ error: 'Failed to delete lookbook photo' }, { status: 500 });
  }
}
