import { NextResponse } from 'next/server';
import { getClientProfile, upsertClientProfile, getAllClients } from '@/lib/clients/store';
import { dispatchNewMemberEmails } from '@/lib/email';

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

    const cleanEmail = body.email.toLowerCase().trim();

    // Check if client is already known in registry
    let isNewRegistration = Boolean(body.isNewRegistration);
    if (!isNewRegistration) {
      try {
        const existingClients = await getAllClients();
        const found = existingClients.some((c) => c.email?.toLowerCase().trim() === cleanEmail);
        if (!found) {
          isNewRegistration = true;
        }
      } catch {
        // Safe fallback
      }
    }

    const updated = await upsertClientProfile({
      ...body,
      email: cleanEmail,
    });

    // If new registration, send welcome to member & alert all admins
    if (isNewRegistration) {
      dispatchNewMemberEmails({
        fullName: body.fullName || updated.fullName || 'VIP Client',
        email: cleanEmail,
        phone: body.phone || updated.phone,
      }).catch((emailErr) => {
        console.error('Failed to dispatch new member welcome & admin alert:', emailErr);
      });
    }

    return NextResponse.json({ success: true, profile: updated });
  } catch (err: any) {
    console.error('Error in POST /api/client/profile:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

