import { NextResponse } from 'next/server';
import {
  getAllAppointments,
  getAppointmentsForDate,
  getBookedSlotsForDate,
  getCalendarSummary,
  createAppointment,
  normalizeDateToIso,
  STANDARD_FITTING_SLOTS,
} from '@/lib/appointments/store';
import { dispatchAppointmentEmails } from '@/lib/email';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const summary = searchParams.get('summary');

    if (summary === 'true') {
      const calendarSummary = await getCalendarSummary();
      return NextResponse.json({ success: true, calendarSummary });
    }

    if (date) {
      const dateIso = normalizeDateToIso(date);
      const appointments = await getAppointmentsForDate(dateIso);
      const bookedSlots = appointments.map((a) => a.time_slot);
      const freeSlots = STANDARD_FITTING_SLOTS.filter((s) => !bookedSlots.includes(s));

      return NextResponse.json({
        success: true,
        date: dateIso,
        bookedSlots,
        freeSlots,
        isFull: freeSlots.length === 0,
        appointments,
      });
    }

    const appointments = await getAllAppointments();
    return NextResponse.json({ success: true, appointments });
  } catch (err: any) {
    console.error('Error in GET /api/appointments:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

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
      createdBy = 'client',
      sendClientEmail = true,
    } = body;

    if (!clientName || !clientPhone || !appointmentDate || !timeSlot) {
      return NextResponse.json(
        { success: false, error: 'Client name, phone number, date, and time slot are required.' },
        { status: 400 }
      );
    }

    const dateIso = normalizeDateToIso(appointmentDate);

    // Create appointment with conflict validation
    const result = await createAppointment({
      client_name: clientName.trim(),
      client_email: (clientEmail || '').trim(),
      client_phone: clientPhone.trim(),
      fitting_type: fittingType || 'Initial Made to Measure Consultation',
      location_type: locationType || 'Flagship Atelier Nairobi',
      appointment_date: appointmentDate,
      appointment_date_iso: dateIso,
      time_slot: timeSlot,
      status: 'confirmed',
      notes: notes || '',
      created_by: createdBy,
      sartorial_preferences: {
        prefilledFabric: prefilledFabric || '',
        prefilledService: prefilledService || '',
      },
    });

    if (!result.success || !result.appointment) {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to reserve appointment.',
          conflict: Boolean(result.conflict),
        },
        { status: result.conflict ? 409 : 400 }
      );
    }

    const apt = result.appointment;

    // Dispatch automated emails in background
    if (sendClientEmail !== false) {
      dispatchAppointmentEmails({
        referenceId: apt.reference_id,
        clientName: apt.client_name,
        clientEmail: apt.client_email,
        clientPhone: apt.client_phone,
        fittingType: apt.fitting_type,
        locationType: apt.location_type,
        appointmentDate: apt.appointment_date,
        timeSlot: apt.time_slot,
        notes: apt.notes || '',
      }).catch((emailErr) => {
        console.error('Appointment email dispatch error:', emailErr);
      });
    }

    return NextResponse.json({
      success: true,
      appointment: apt,
      referenceId: apt.reference_id,
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
