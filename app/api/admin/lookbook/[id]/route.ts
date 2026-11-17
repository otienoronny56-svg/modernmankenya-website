import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';
import { updateCustomLookbookItem, deleteCustomLookbookItem } from '@/lib/lookbook/store';

interface Context {
  params: Promise<{ id: string }>;
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    const referer = req.headers.get('referer') || '';
    const isFromAdmin = referer.includes('/admin');

    if (!isValid && !isFromAdmin) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const { title, tag, category, image, images, aspect } = body;

    const updated = await updateCustomLookbookItem(id, {
      title,
      tag,
      category,
      image,
      images,
      aspect,
    });

    if (!updated) {
      return NextResponse.json({ error: 'Lookbook item not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Lookbook showcase updated successfully',
      item: updated,
    });
  } catch (error) {
    console.error('Error updating lookbook photo:', error);
    return NextResponse.json({ error: 'Failed to update lookbook showcase' }, { status: 500 });
  }
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
    const deleted = await deleteCustomLookbookItem(id);

    return NextResponse.json({
      success: true,
      deleted,
      message: 'Lookbook photo removed successfully',
    });
  } catch (error) {
    console.error('Error deleting lookbook photo:', error);
    return NextResponse.json({ error: 'Failed to delete lookbook photo' }, { status: 500 });
  }
}
