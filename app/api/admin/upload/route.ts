import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate admin request
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse form data
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // 3. Validate image type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Uploaded file must be an image' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename and create unique timestamped name
    const ext = path.extname(file.name) || '.jpg';
    const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueFilename = `mm_${Date.now()}_${cleanName}${ext}`;

    let supabaseErrorMsg = '';

    // 4. Try Supabase Storage if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = getSupabaseAdmin();
        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(uniqueFilename, buffer, {
            contentType: file.type || 'image/jpeg',
            upsert: true,
          });

        if (!error && data) {
          const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(data.path);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            filename: uniqueFilename,
          });
        }

        if (error) {
          console.warn('Supabase storage upload error:', error.message);
          supabaseErrorMsg = error.message;
        }
      } catch (storageErr: any) {
        console.warn('Supabase storage upload failed, falling back to local storage:', storageErr);
        supabaseErrorMsg = storageErr?.message || 'Storage error';
      }
    }

    // 5. Local Fallback: write to public/uploads/products (for local dev)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'products');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, uniqueFilename);
      fs.writeFileSync(filePath, buffer);

      const publicUrl = `/uploads/products/${uniqueFilename}`;

      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: uniqueFilename,
      });
    } catch (localErr: any) {
      console.error('Local file write error:', localErr);
      return NextResponse.json(
        { error: supabaseErrorMsg || localErr?.message || 'Failed to save uploaded image' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Photo upload error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to upload photo' },
      { status: 500 }
    );
  }
}
