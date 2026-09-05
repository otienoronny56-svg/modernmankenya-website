import { NextRequest, NextResponse } from 'next/server';
import { 
  verifyAdminCredentials, 
  createAdminSessionToken, 
  ADMIN_COOKIE_NAME 
} from '@/lib/auth/admin-auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const isValid = verifyAdminCredentials(email, password);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid admin credentials. Please check your email and password.' },
        { status: 401 }
      );
    }

    const token = await createAdminSessionToken(email);

    const response = NextResponse.json({
      success: true,
      message: 'Admin authenticated successfully',
      user: {
        email,
        role: 'admin',
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during login' },
      { status: 500 }
    );
  }
}
