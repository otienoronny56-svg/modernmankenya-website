import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/';

  if (code) {
    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        return NextResponse.redirect(`${origin}${next}`);
      }
      console.warn('Modern Man Kenya: OAuth code exchange notice:', error.message);
    } catch (err) {
      console.warn('Modern Man Kenya: OAuth callback processing notice:', err);
    }
  }

  // Fallback to homepage
  return NextResponse.redirect(`${origin}/`);
}
