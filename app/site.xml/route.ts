import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(new URL('/sitemap.xml', 'https://www.modernmanke.com'), 301);
}
