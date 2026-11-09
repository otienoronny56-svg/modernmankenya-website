import { NextResponse } from 'next/server';
import { dispatchAppointmentEmails } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientEmail,
      clientPhone,
      fittingType,
      locationType,
      appointmentDate,
      timeSlot,
      notes,
      prefilledFabric,
      prefilledService,
    } = body;

    const referenceId = `MMK-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Persist to Supabase if available
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase/server');
      const supabaseAdmin = getSupabaseAdmin();
      await (supabaseAdmin.from('appointments') as any).insert({
        client_name: clientName,
        client_email: clientEmail,
        client_phone: clientPhone,
        fitting_type: fittingType,
        location_type: locationType,
        appointment_date: appointmentDate,
        time_slot: timeSlot,
        status: 'confirmed',
        notes: notes || '',
        sartorial_preferences: {
          prefilledFabric: prefilledFabric || '',
          prefilledService: prefilledService || '',
        },
      });
    } catch (dbErr) {
      console.warn('Supabase appointment insert notice (resilient mode):', dbErr);
    }

    // 2. Dispatch automated transactional emails in background
    dispatchAppointmentEmails({
      referenceId,
      clientName: clientName || 'Valued Client',
      clientEmail: clientEmail || '',
      clientPhone: clientPhone || '',
      fittingType: fittingType || 'Bespoke Sartorial Fitting',
      locationType: locationType || 'Private Atelier Suite, Nairobi',
      appointmentDate: appointmentDate || 'Upcoming',
      timeSlot: timeSlot || 'Selected Time',
      notes: notes || '',
    }).catch((emailErr) => console.error('Appointment email dispatch notice:', emailErr));

    return NextResponse.json({
      success: true,
      referenceId,
      message: 'Appointment reserved successfully',
    });
  } catch (error: any) {
    console.error('Appointment API error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to process appointment' },
      { status: 500 }
    );
  }
}

