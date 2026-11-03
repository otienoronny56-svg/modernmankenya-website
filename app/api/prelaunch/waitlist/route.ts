import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: NextRequest) {
  try {
    const { contact, fullName } = await req.json();

    if (!contact || typeof contact !== 'string' || contact.trim().length < 4) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid phone number or email address.' },
        { status: 400 }
      );
    }

    const cleanContact = contact.trim();
    const cleanName = (fullName || 'VIP Guest').trim();
    const isEmail = cleanContact.includes('@');

    // Attempt to record lead in Supabase waitlist / newsletter table if configured
    try {
      if (supabase) {
        await (supabase as any).from('launch_waitlist').insert([
          {
            contact: cleanContact,
            contact_type: isEmail ? 'email' : 'phone',
            full_name: cleanName,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    } catch (dbErr) {
      // Graceful fallback if database table is not yet migrated; log lead safely
      console.log(`[Launch Waitlist Lead]: ${cleanName} - ${cleanContact} (${new Date().toISOString()})`);
    }

    return NextResponse.json({
      success: true,
      message: 'You have been registered for VIP Launch Access. We will notify you on November 17!',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Unable to save VIP registration. Please try again or WhatsApp us directly.' },
      { status: 500 }
    );
  }
}

