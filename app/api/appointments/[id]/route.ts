import { NextResponse } from 'next/server';
import { updateAppointment, deleteAppointment } from '@/lib/appointments/store';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const updates = await request.json();

    const result = await updateAppointment(id, updates);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error, conflict: result.conflict },
        { status: result.conflict ? 409 : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      appointment: result.appointment,
      message: 'Appointment updated successfully',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteAppointment(id);
    if (!success) {
      return NextResponse.json({ success: false, error: 'Appointment not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: 'Appointment removed' });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to delete appointment' },
      { status: 500 }
    );
  }
}

