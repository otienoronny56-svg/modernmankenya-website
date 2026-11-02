import { NextResponse } from 'next/server';
import { generateBase32Secret, generateBackupCodes, getTOTPUri, verifyTOTP } from '@/lib/auth/twoFactor';
import { get2FAStatus, set2FAEnabled, disable2FA, verifyClient2FA } from '@/lib/clients/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const action = searchParams.get('action') || 'status';

    if (!email) {
      return NextResponse.json({ error: 'Email parameter required' }, { status: 400 });
    }

    if (action === 'status') {
      const status = await get2FAStatus(email);
      return NextResponse.json({ success: true, ...status });
    }

    if (action === 'setup') {
      const secret = generateBase32Secret(20);
      const backupCodes = generateBackupCodes(6);
      const otpauthUri = getTOTPUri(secret, email);

      return NextResponse.json({
        success: true,
        secret,
        backupCodes,
        otpauthUri,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error in GET /api/auth/2fa:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, token, secret, backupCodes } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (action === 'verify-setup') {
      if (!secret || !token) {
        return NextResponse.json({ error: 'Secret and verification code are required' }, { status: 400 });
      }

      // Verify token with prospective secret
      const isValid = verifyTOTP(secret, token);
      if (!isValid) {
        return NextResponse.json(
          { success: false, error: 'Invalid 6-digit verification code. Please check your authenticator app.' },
          { status: 400 }
        );
      }

      await set2FAEnabled(email, secret, backupCodes || [], 'totp');
      return NextResponse.json({
        success: true,
        message: 'Two-Factor Authentication has been successfully enabled and verified!',
      });
    }

    if (action === 'verify-login') {
      if (!token) {
        return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
      }

      const result = await verifyClient2FA(email, token);
      if (!result.valid) {
        return NextResponse.json(
          { success: false, error: 'Incorrect two-factor verification code or backup code.' },
          { status: 401 }
        );
      }

      return NextResponse.json({
        success: true,
        usedBackupCode: result.usedBackupCode || false,
        message: 'Two-Factor Authentication verified successfully',
      });
    }

    if (action === 'disable') {
      if (!token) {
        return NextResponse.json({ error: 'Verification token required to disable 2FA' }, { status: 400 });
      }

      const result = await verifyClient2FA(email, token);
      if (!result.valid) {
        return NextResponse.json({ success: false, error: 'Invalid verification code' }, { status: 401 });
      }

      await disable2FA(email);
      return NextResponse.json({
        success: true,
        message: 'Two-Factor Authentication has been disabled',
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error in POST /api/auth/2fa:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

