import crypto from 'crypto';

// Base32 alphabet for TOTP
const BASE32_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

export function generateBase32Secret(length = 20): string {
  let secret = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    secret += BASE32_CHARS[bytes[i] % BASE32_CHARS.length];
  }
  return secret;
}

export function generateBackupCodes(count = 6): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const hex = crypto.randomBytes(4).toString('hex').toUpperCase();
    codes.push(`${hex.slice(0, 4)}-${hex.slice(4)}`);
  }
  return codes;
}

function base32ToBuffer(base32: string): Buffer {
  const clean = base32.toUpperCase().replace(/=+$/, '');
  let bits = '';
  for (let i = 0; i < clean.length; i++) {
    const val = BASE32_CHARS.indexOf(clean[i]);
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return Buffer.from(bytes);
}

export function generateTOTPCode(secret: string, timeStepWindow = 0): string {
  const counter = Math.floor(Date.now() / 1000 / 30) + timeStepWindow;
  const counterBuffer = Buffer.alloc(8);
  counterBuffer.writeBigInt64BE(BigInt(counter));

  const key = base32ToBuffer(secret);
  const hmac = crypto.createHmac('sha1', key);
  hmac.update(counterBuffer);
  const digest = hmac.digest();

  const offset = digest[digest.length - 1] & 0xf;
  const codeInt =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff);

  const otp = (codeInt % 1000000).toString().padStart(6, '0');
  return otp;
}

export function verifyTOTP(secret: string, token: string): boolean {
  const cleaned = token.replace(/\s+/g, '');
  if (!cleaned || cleaned.length !== 6) return false;

  // Check window -1, 0, +1 (accounting for slight clock skew)
  for (let step = -1; step <= 1; step++) {
    const expected = generateTOTPCode(secret, step);
    if (expected === cleaned) {
      return true;
    }
  }
  return false;
}

export function getTOTPUri(secret: string, email: string): string {
  const encodedEmail = encodeURIComponent(email);
  const issuer = encodeURIComponent('Modern Man Kenya');
  return `otpauth://totp/${issuer}:${encodedEmail}?secret=${secret}&issuer=${issuer}&algorithm=SHA1&digits=6&period=30`;
}

