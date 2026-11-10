import { NextResponse } from 'next/server';
import { dispatchPasswordResetEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.modernmanke.com';

    let resetUrl = `${siteUrl}/account/reset-password?email=${encodeURIComponent(cleanEmail)}`;

    // Attempt to generate official Supabase recovery action link if service role is available
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase/server');
      const supabaseAdmin = getSupabaseAdmin();
      const { data, error } = await supabaseAdmin.auth.admin.generateLink({
        type: 'recovery',
        email: cleanEmail,
        options: {
          redirectTo: `${siteUrl}/auth/callback?next=/account/reset-password`,
        },
      });

      if (!error && data?.properties?.action_link) {
        resetUrl = data.properties.action_link;
      }
    } catch (adminErr) {
      console.warn('Supabase admin generateLink not available, using client recovery fallback:', adminErr);
    }

    // Dispatch branded luxury email from support@modernmanke.com
    await dispatchPasswordResetEmail({
      email: cleanEmail,
      resetUrl,
    });

    return NextResponse.json({
      success: true,
      message: 'A password reset link has been dispatched to your email address.',
    });
  } catch (err: any) {
    console.error('Password reset route error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Unable to process password reset request.' },
      { status: 500 }
    );
  }
}

