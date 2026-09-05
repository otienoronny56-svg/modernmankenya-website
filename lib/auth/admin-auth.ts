// Modern Man Kenya - Admin Authentication Layer

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@modernmankenya.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ModernMan@2026!';
const SESSION_SECRET = process.env.ADMIN_SECRET || 'modern-man-kenya-bespoke-secret-2026-sartorial';
export const ADMIN_COOKIE_NAME = 'mm_admin_token';

// Simple base64 encode/decode that works across Edge and Node environments
function base64UrlEncode(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) {
    str += '=';
  }
  return Buffer.from(str, 'base64').toString();
}

/**
 * Generates an HMAC SHA-256 signature
 */
async function sign(data: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Buffer.from(signature)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Validates admin credentials
 */
export function verifyAdminCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false;
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase() &&
    pass === ADMIN_PASSWORD
  );
}

/**
 * Creates a signed session token valid for 7 days
 */
export async function createAdminSessionToken(email: string): Promise<string> {
  const payload = {
    sub: email,
    role: 'admin',
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };

  const payloadStr = base64UrlEncode(JSON.stringify(payload));
  const signature = await sign(payloadStr, SESSION_SECRET);

  return `${payloadStr}.${signature}`;
}

/**
 * Verifies the admin session token
 */
export async function verifyAdminSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadStr, signature] = parts;

  try {
    const expectedSignature = await sign(payloadStr, SESSION_SECRET);
    if (signature !== expectedSignature) return false;

    const payload = JSON.parse(base64UrlDecode(payloadStr));
    if (!payload.exp || Date.now() > payload.exp) {
      return false; // Token expired
    }

    return payload.role === 'admin';
  } catch {
    return false;
  }
}
