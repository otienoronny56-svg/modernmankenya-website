import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from './lib/auth/admin-auth';
import { LAUNCH_CONFIG } from './lib/config/launch';

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // 1. Static assets, API routes, and files pass through untouched
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.endsWith('.png') ||
    pathname.endsWith('.jpg') ||
    pathname.endsWith('.jpeg') ||
    pathname.endsWith('.svg') ||
    pathname.endsWith('.webp') ||
    pathname.endsWith('.ico')
  ) {
    return NextResponse.next();
  }

  // 2. VIP Secret Passcode in URL (e.g. https://www.modernmanke.com/?preview=modernman2026)
  const previewQuery = searchParams.get('preview')?.trim().toLowerCase();
  if (previewQuery && previewQuery === LAUNCH_CONFIG.previewPasscode.toLowerCase()) {
    const cleanUrl = req.nextUrl.clone();
    cleanUrl.searchParams.delete('preview');

    const res = NextResponse.redirect(cleanUrl);
    res.cookies.set({
      name: LAUNCH_CONFIG.cookieName,
      value: LAUNCH_CONFIG.previewPasscode,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: 'lax',
      httpOnly: false,
    });
    return res;
  }

  // 3. Option B: Secret Custom Admin Portal (/atelier-portal)
  if (pathname === '/atelier-portal' || pathname === '/atelier-control') {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (isValid) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('portal', 'atelier');
    return NextResponse.redirect(loginUrl);
  }

  // 4. Admin Portal Access & Bot Cloaking
  if (pathname.startsWith('/admin')) {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);

    if (pathname === '/admin/login') {
      if (isValid) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      // Allow login form if accessed via secret portal or in preview mode
      const isViaSecretPortal = searchParams.get('portal') === 'atelier';
      const previewCookie = req.cookies.get(LAUNCH_CONFIG.cookieName)?.value;
      const hasPreview = previewCookie?.toLowerCase() === LAUNCH_CONFIG.previewPasscode.toLowerCase();

      if (isViaSecretPortal || hasPreview || !LAUNCH_CONFIG.isPrelaunch) {
        return NextResponse.next();
      }

      // If a bot or stranger directly probes /admin/login, cloak it with coming-soon
      return NextResponse.rewrite(new URL('/coming-soon', req.url));
    }

    // Direct access to /admin dashboards requires valid token
    if (!isValid) {
      return NextResponse.rewrite(new URL('/coming-soon', req.url));
    }
    return NextResponse.next();
  }

  // 5. Pre-Launch Holding Mode
  if (LAUNCH_CONFIG.isPrelaunch) {
    if (pathname === '/coming-soon') {
      return NextResponse.next();
    }

    const previewCookie = req.cookies.get(LAUNCH_CONFIG.cookieName)?.value;
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

    const hasBypassAccess =
      previewCookie?.toLowerCase() === LAUNCH_CONFIG.previewPasscode.toLowerCase() ||
      Boolean(adminToken);

    if (!hasBypassAccess) {
      return NextResponse.rewrite(new URL('/coming-soon', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
