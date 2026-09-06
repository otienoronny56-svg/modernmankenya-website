import { NextRequest, NextResponse } from 'next/server';
import { getMergedProducts, saveProduct } from '@/lib/products/store';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';
import type { Product } from '@/types';

export async function GET() {
  try {
    const products = await getMergedProducts();
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate admin
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      tagline, 
      description, 
      category, 
      fabricDetails, 
      construction, 
      priceKes, 
      priceUsd, 
      images, 
      isFeatured, 
      isInStock,
      sizes 
    } = body;

    if (!name || !priceKes || !category) {
      return NextResponse.json(
        { error: 'Product name, price (KES), and category are required' },
        { status: 400 }
      );
    }

    const slug = body.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = body.id || `custom-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Auto calculate USD price if missing (approx 1 USD = 129.5 KES)
    const calculatedUsd = priceUsd ? Number(priceUsd) : Math.round(Number(priceKes) / 129.5);

    const availableSizes: string[] = sizes && sizes.length > 0 ? sizes : ['38R', '40R', '42R', '44R'];
    const audience = (['modernman', 'modernwoman', 'modernchild'].includes(body.audience)) 
      ? body.audience 
      : 'modernman';

    const newProduct: Product = {
      id,
      name,
      slug,
      tagline: tagline || '',
      description: description || '',
      category,
      audience,
      fabricDetails: fabricDetails || 'Bespoke English & Italian Cloth',
      construction: construction || 'Full Floating Canvas',
      priceKes: Number(priceKes),
      priceUsd: calculatedUsd,
      images: images && images.length > 0 ? images : ['/images/bespoke-placeholder.jpg'],
      isFeatured: Boolean(isFeatured),
      isInStock: isInStock !== undefined ? Boolean(isInStock) : true,
      variants: availableSizes.map((sz, idx) => ({
        id: `v-${id}-${idx}`,
        size: sz,
        color: 'Standard',
        stockQuantity: 5,
        sku: `MM-${slug.substring(0, 10).toUpperCase()}-${sz}`,
      })),
      detailsList: (body.detailsList && Array.isArray(body.detailsList) && body.detailsList.length > 0)
        ? body.detailsList
        : [
            fabricDetails || 'Luxury European Cloth',
            construction || 'Full Floating Canvas Construction',
            'Handcrafted in Nairobi Atelier',
          ],
    };

    const saved = await saveProduct(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Product published successfully',
      product: saved,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
