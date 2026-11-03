import { NextRequest, NextResponse } from 'next/server';
import { LAUNCH_CONFIG } from '@/lib/config/launch';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { passcode, action } = body;

    // Handle Exit Preview Mode
    if (action === 'exit') {
      const response = NextResponse.json({ success: true, message: 'Exited preview mode' });
      response.cookies.delete(LAUNCH_CONFIG.cookieName);
      return response;
    }

    // Handle Passcode Unlock
    const cleanPass = (passcode || '').trim().toLowerCase();
    const validPass = LAUNCH_CONFIG.previewPasscode.toLowerCase();

    if (cleanPass === validPass) {
      const response = NextResponse.json({
        success: true,
        message: 'VIP Atelier Access granted',
      });

      // Set cookie for 30 days
      response.cookies.set({
        name: LAUNCH_CONFIG.cookieName,
        value: LAUNCH_CONFIG.previewPasscode,
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: 'lax',
        httpOnly: false, // Accessible by client banner to show preview status
      });

      return response;
    }

    return NextResponse.json(
      { success: false, error: 'Incorrect VIP passcode. Please verify and try again.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process authentication request.' },
      { status: 500 }
    );
  }
}

