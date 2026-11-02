import { NextResponse } from 'next/server';
import { getClientProfile, upsertClientProfile } from '@/lib/clients/store';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');

    const identifier = email || id;
    if (!identifier) {
      return NextResponse.json({ error: 'Email or ID is required' }, { status: 400 });
    }

    const profile = await getClientProfile(identifier);
    return NextResponse.json({ success: true, profile });
  } catch (err: any) {
    console.error('Error in GET /api/client/profile:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const updated = await upsertClientProfile(body);
    return NextResponse.json({ success: true, profile: updated });
  } catch (err: any) {
    console.error('Error in POST /api/client/profile:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

