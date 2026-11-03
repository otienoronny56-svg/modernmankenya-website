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

  // 2. VIP Secret Passcode in URL (e.g. https://modernmanke.com/?preview=modernman2026)
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
      httpOnly: false, // Allows the client PreviewModeBanner to detect active preview
    });
    return res;
  }

  // 3. Admin Portal Access & Authentication
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') {
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      const isValid = await verifyAdminSessionToken(token);
      if (isValid) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
      return NextResponse.next();
    }

    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);

    if (!isValid) {
      const loginUrl = new URL('/admin/login', req.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 4. Pre-Launch Holding Mode
  if (LAUNCH_CONFIG.isPrelaunch) {
    // Direct visits to /coming-soon are allowed
    if (pathname === '/coming-soon') {
      return NextResponse.next();
    }

    // Check if user has VIP bypass cookie OR an active admin session
    const previewCookie = req.cookies.get(LAUNCH_CONFIG.cookieName)?.value;
    const adminToken = req.cookies.get(ADMIN_COOKIE_NAME)?.value;

    const hasBypassAccess =
      previewCookie?.toLowerCase() === LAUNCH_CONFIG.previewPasscode.toLowerCase() ||
      Boolean(adminToken);

    // If no VIP bypass, rewrite all public page requests to the holding screen
    if (!hasBypassAccess) {
      return NextResponse.rewrite(new URL('/coming-soon', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
