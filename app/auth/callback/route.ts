import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

function getCanonicalOrigin(request: Request): string {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  if (host && !host.includes('localhost') && !host.includes('127.0.0.1')) {
    if (host.includes('vercel.app')) {
      return 'https://www.modernmanke.com';
    }
    return `${proto}://${host}`;
  }
  const url = new URL(request.url);
  if (url.origin.includes('vercel.app')) {
    return 'https://www.modernmanke.com';
  }
  return url.origin;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = getCanonicalOrigin(request);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/account';

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        const dest = next.startsWith('/') ? next : `/${next}`;
        return NextResponse.redirect(`${origin}${dest}`);
      }
      console.warn('Modern Man Kenya: OAuth code exchange notice:', error.message);
    } catch (err) {
      console.warn('Modern Man Kenya: OAuth callback processing notice:', err);
    }
  }

  // Fallback to client dashboard
  return NextResponse.redirect(`${origin}/account`);
}
