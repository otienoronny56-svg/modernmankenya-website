import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const next = searchParams.get('next') || '/';

    const redirectUrl = `${origin}/auth/callback?next=${encodeURIComponent(next)}`;

    // Generate OAuth URL with PKCE
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl,
        skipBrowserRedirect: true,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error || !data?.url) {
      return NextResponse.json(
        {
          enabled: false,
          error: error?.message || 'Failed to initialize Google OAuth',
          message: error?.message || 'Unable to connect to Google authentication service.',
        },
        { status: 400 }
      );
    }

    // Pre-flight check against Supabase authorize endpoint
    try {
      const preflight = await fetch(data.url, {
        method: 'GET',
        redirect: 'manual',
      });

      if (preflight.status === 400) {
        const errorJson = await preflight.json().catch(() => ({}));
        if (
          errorJson.error_code === 'validation_failed' ||
          (errorJson.msg && errorJson.msg.includes('not enabled'))
        ) {
          return NextResponse.json(
            {
              enabled: false,
              error: 'GOOGLE_NOT_ENABLED',
              message:
                'Google sign-in is not yet enabled in your Supabase Auth dashboard. Please enable the Google provider in Supabase > Authentication > Providers, or sign in with email / checkout as guest.',
            },
            { status: 200 }
          );
        }
      }

      // If status is 302, 303, 200 or anything else, Google provider is ready
      return NextResponse.json({
        enabled: true,
        url: data.url,
      });
    } catch (fetchErr: any) {
      // If preflight check network fails, allow client to attempt redirect
      return NextResponse.json({
        enabled: true,
        url: data.url,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      {
        enabled: false,
        error: err.message || 'Server error',
        message: 'An unexpected error occurred while verifying Google OAuth.',
      },
      { status: 500 }
    );
  }
}
