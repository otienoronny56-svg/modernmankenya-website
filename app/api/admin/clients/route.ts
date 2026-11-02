import { NextResponse } from 'next/server';
import { getAllClients, approveClientMeasurements, upsertClientProfile } from '@/lib/clients/store';

export async function GET() {
  try {
    const clients = await getAllClients();
    return NextResponse.json({ success: true, clients });
  } catch (err: any) {
    console.error('Error in GET /api/admin/clients:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, id, approvedBy, tailorNotes, profileData } = body;

    const identifier = email || id;
    if (!identifier) {
      return NextResponse.json({ error: 'Client email or ID required' }, { status: 400 });
    }

    if (action === 'approve') {
      const approved = await approveClientMeasurements(
        identifier,
        approvedBy || 'Master Tailor (Samuel M.)',
        tailorNotes
      );
      if (!approved) {
        return NextResponse.json({ error: 'Client profile not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, profile: approved, message: 'Measurements approved successfully' });
    }

    if (profileData) {
      const updated = await upsertClientProfile({ ...profileData, email: identifier });
      return NextResponse.json({ success: true, profile: updated });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error in POST /api/admin/clients:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}

