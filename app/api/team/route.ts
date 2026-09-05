import { NextRequest, NextResponse } from 'next/server';
import { getMergedTeam, saveTeamMember, deleteTeamMember } from '@/lib/team/store';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth/admin-auth';
import type { TeamMember } from '@/types';

export async function GET() {
  try {
    const team = await getMergedTeam();
    return NextResponse.json({ team }, { status: 200 });
  } catch (error) {
    console.error('Error fetching team members:', error);
    return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Authenticate admin session
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      role, 
      specialty, 
      bio, 
      experienceYears, 
      image, 
      quote, 
      favoriteCloth,
      isLeadership,
      order 
    } = body;

    if (!name || !role) {
      return NextResponse.json(
        { error: 'Artisan name and role are required' },
        { status: 400 }
      );
    }

    const id = body.id || `team-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    const member: TeamMember = {
      id,
      name: name.trim(),
      role: role.trim(),
      specialty: specialty ? specialty.trim() : 'Master Tailoring Artisan',
      bio: bio ? bio.trim() : 'Dedicated artisan at the Modern Man Kenya Nairobi Atelier.',
      experienceYears: Number(experienceYears || 5),
      image: image && image.trim() !== '' 
        ? image.trim() 
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
      quote: quote ? quote.trim() : undefined,
      favoriteCloth: favoriteCloth ? favoriteCloth.trim() : undefined,
      isLeadership: Boolean(isLeadership),
      order: order !== undefined ? Number(order) : 50,
    };

    const saved = await saveTeamMember(member);
    return NextResponse.json({ success: true, member: saved }, { status: 200 });
  } catch (error) {
    console.error('Error saving team member:', error);
    return NextResponse.json({ error: 'Failed to save team member' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isValid = await verifyAdminSessionToken(token);
    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing team member id' }, { status: 400 });
    }

    await deleteTeamMember(id);
    return NextResponse.json({ success: true, message: 'Team member removed' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
