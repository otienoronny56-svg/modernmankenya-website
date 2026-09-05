import { NextRequest, NextResponse } from 'next/server';
import { getMergedProducts, saveProduct, deleteProduct } from '@/lib/products/store';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';

interface Context {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: Context) {
  try {
    const { id } = await params;
    const products = await getMergedProducts();
    const product = products.find((p) => p.id === id || p.slug === id);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: Context) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const products = await getMergedProducts();
    const existing = products.find((p) => p.id === id);

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const updated = {
      ...existing,
      ...body,
      id,
      priceKes: body.priceKes ? Number(body.priceKes) : existing.priceKes,
      priceUsd: body.priceUsd ? Number(body.priceUsd) : (body.priceKes ? Math.round(Number(body.priceKes) / 129.5) : existing.priceUsd),
    };

    const saved = await saveProduct(updated);

    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      product: saved,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Context) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { id } = await params;
    await deleteProduct(id);

    return NextResponse.json({
      success: true,
      message: 'Product removed successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
