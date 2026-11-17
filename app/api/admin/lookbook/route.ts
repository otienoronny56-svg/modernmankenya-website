import { NextRequest, NextResponse } from 'next/server';
import { SARTORIAL_GALLERY_ITEMS, GalleryItem } from '@/data/galleryData';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';
import { getCustomLookbookItems, addCustomLookbookItem } from '@/lib/lookbook/store';

export async function GET(req: NextRequest) {
  try {
    const customItems = await getCustomLookbookItems();
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

    await addCustomLookbookItem(newItem);

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
