import fs from 'fs';
import path from 'path';
import {
  STANDARD_FITTING_SLOTS,
  type StoredAppointment,
  type StandardFittingSlot,
} from '@/types/appointments';

export { STANDARD_FITTING_SLOTS, type StoredAppointment, type StandardFittingSlot };

const APPOINTMENTS_FILE = path.join(process.cwd(), 'data', 'appointments.json');

function readLocalAppointments(): StoredAppointment[] {
  try {
    if (!fs.existsSync(APPOINTMENTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(APPOINTMENTS_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Error reading appointments.json:', err);
    return [];
  }
}

function writeLocalAppointments(appointments: StoredAppointment[]) {
  try {
    const dir = path.dirname(APPOINTMENTS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing appointments.json:', err);
  }
}

/**
 * Normalizes any date string or display string into a YYYY-MM-DD ISO string
 */
export function normalizeDateToIso(dateStr: string): string {
  if (!dateStr) return '';
  const clean = dateStr.trim();

  // If already in YYYY-MM-DD format
  if (/^\d{4}-\d{2}-\d{2}$/.test(clean)) {
    return clean;
  }

  // If friendly string (e.g. "Thu, Nov 12, 2026" or "Nov 12, 2026")
  const parsed = new Date(clean);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, '0');
    const d = String(parsed.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  return clean;
}

/**
 * Normalizes any date string into a friendly display string
 */
export function formatFriendlyDate(dateStr: string): string {
  const iso = normalizeDateToIso(dateStr);
  if (!iso || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return dateStr;
  const [y, m, d] = iso.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Get all appointments directly from Supabase (primary) merged with local cache
 */
export async function getAllAppointments(): Promise<StoredAppointment[]> {
  const appointmentsMap = new Map<string, StoredAppointment>();

  // 1. Load from Supabase as primary persistent source of truth
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase/server');
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await (supabaseAdmin.from('appointments') as any)
      .select('*')
      .order('appointment_date', { ascending: true });

    if (!error && Array.isArray(data)) {
      for (const row of data) {
        const id = String(row.id);
        const prefs = (typeof row.sartorial_preferences === 'object' && row.sartorial_preferences) || {};
        const dateIso = normalizeDateToIso(row.appointment_date || row.created_at);
        const refId =
          prefs.reference_id ||
          `MMK-${id.replace(/[^0-9]/g, '').slice(0, 6) || Math.floor(100000 + Math.random() * 900000)}`;

        appointmentsMap.set(id, {
          id,
          reference_id: refId,
          client_name: row.client_name || 'VIP Client',
          client_email: row.client_email || '',
          client_phone: row.client_phone || '',
          fitting_type: row.fitting_type || 'Initial Made to Measure Consultation',
          location_type: row.location_type || 'Flagship Atelier Nairobi',
          appointment_date: formatFriendlyDate(dateIso),
          appointment_date_iso: dateIso,
          time_slot: row.time_slot || '11:00 AM',
          status: (row.status as any) || 'confirmed',
          notes: row.notes || '',
          created_by: prefs.created_by || 'client',
          created_at: row.created_at || new Date().toISOString(),
          updated_at: row.created_at || new Date().toISOString(),
          sartorial_preferences: prefs,
        });
      }
    } else if (error) {
      console.warn('Notice from Supabase appointments query:', error.message);
    }
  } catch (err) {
    console.warn('Could not query Supabase appointments:', err);
  }

  // 2. Also merge any local development records if not already represented
  const localList = readLocalAppointments();
  for (const localApt of localList) {
    const exists = Array.from(appointmentsMap.values()).some(
      (a) =>
        a.reference_id === localApt.reference_id ||
        (a.client_phone === localApt.client_phone &&
          a.appointment_date_iso === localApt.appointment_date_iso &&
          a.time_slot === localApt.time_slot)
    );
    if (!exists) {
      appointmentsMap.set(localApt.id, localApt);
    }
  }

  const combined = Array.from(appointmentsMap.values());

  // Sort upcoming by date and time
  return combined.sort((a, b) => {
    const dateComp = a.appointment_date_iso.localeCompare(b.appointment_date_iso);
    if (dateComp !== 0) return dateComp;
    return a.time_slot.localeCompare(b.time_slot);
  });
}

/**
 * Get all active (non-cancelled) appointments for a specific ISO date
 */
export async function getAppointmentsForDate(dateIso: string): Promise<StoredAppointment[]> {
  const all = await getAllAppointments();
  const cleanIso = normalizeDateToIso(dateIso);
  return all.filter(
    (a) => a.appointment_date_iso === cleanIso && a.status !== 'cancelled'
  );
}

/**
 * Get a list of booked time slots for a specific ISO date
 */
export async function getBookedSlotsForDate(dateIso: string): Promise<string[]> {
  const appointments = await getAppointmentsForDate(dateIso);
  return appointments.map((a) => a.time_slot);
}

/**
 * Check if a time slot is already booked on a given date
 */
export async function isSlotBooked(
  dateIso: string,
  timeSlot: string,
  excludeId?: string
): Promise<boolean> {
  const cleanIso = normalizeDateToIso(dateIso);
  const cleanSlot = timeSlot.trim().toUpperCase();
  const appointments = await getAllAppointments();

  return appointments.some((a) => {
    if (excludeId && (a.id === excludeId || a.reference_id === excludeId)) return false;
    if (a.status === 'cancelled') return false;
    return (
      a.appointment_date_iso === cleanIso &&
      a.time_slot.trim().toUpperCase() === cleanSlot
    );
  });
}

/**
 * Create a new appointment, persisting directly to Supabase as primary database
 */
export async function createAppointment(
  data: Omit<StoredAppointment, 'id' | 'reference_id' | 'created_at' | 'updated_at' | 'appointment_date_iso'> & {
    appointment_date_iso?: string;
  }
): Promise<{ success: boolean; appointment?: StoredAppointment; error?: string; conflict?: boolean }> {
  const dateIso = data.appointment_date_iso || normalizeDateToIso(data.appointment_date);
  if (!dateIso) {
    return { success: false, error: 'Valid appointment date is required' };
  }

  // Check for time slot conflict
  const slotConflict = await isSlotBooked(dateIso, data.time_slot);
  if (slotConflict) {
    return {
      success: false,
      conflict: true,
      error: `The ${data.time_slot} fitting slot on ${formatFriendlyDate(dateIso)} is already booked. Please choose an alternate hour or a different date.`,
    };
  }

  const referenceId = `MMK-${Math.floor(100000 + Math.random() * 900000)}`;
  const now = new Date().toISOString();

  const sartorialPrefs = {
    ...(data.sartorial_preferences || {}),
    reference_id: referenceId,
    created_by: data.created_by || 'client',
  };

  let createdAppointment: StoredAppointment;

  // 1. Primary write directly into Supabase
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase/server');
    const supabaseAdmin = getSupabaseAdmin();
    const { data: inserted, error: insertError } = await (supabaseAdmin.from('appointments') as any)
      .insert({
        client_name: data.client_name.trim(),
        client_email: (data.client_email || '').trim(),
        client_phone: data.client_phone.trim(),
        fitting_type: data.fitting_type || 'Initial Made to Measure Consultation',
        location_type: data.location_type || 'Flagship Atelier Nairobi',
        appointment_date: dateIso, // Strict Postgres DATE format (YYYY-MM-DD)
        time_slot: data.time_slot,
        status: data.status || 'confirmed',
        notes: data.notes || '',
        sartorial_preferences: sartorialPrefs,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Supabase appointment insert error:', insertError);
      throw insertError;
    }

    createdAppointment = {
      id: String(inserted.id),
      reference_id: referenceId,
      client_name: inserted.client_name,
      client_email: inserted.client_email,
      client_phone: inserted.client_phone,
      fitting_type: inserted.fitting_type,
      location_type: inserted.location_type,
      appointment_date: formatFriendlyDate(dateIso),
      appointment_date_iso: dateIso,
      time_slot: inserted.time_slot,
      status: inserted.status as any,
      notes: inserted.notes || '',
      created_by: data.created_by || 'client',
      created_at: inserted.created_at || now,
      updated_at: inserted.created_at || now,
      sartorial_preferences: sartorialPrefs,
    };
  } catch (err) {
    console.warn('Fallback to local appointment caching due to Supabase error:', err);
    createdAppointment = {
      id: `apt-${Date.now()}`,
      reference_id: referenceId,
      client_name: data.client_name,
      client_email: data.client_email,
      client_phone: data.client_phone,
      fitting_type: data.fitting_type,
      location_type: data.location_type,
      appointment_date: formatFriendlyDate(dateIso),
      appointment_date_iso: dateIso,
      time_slot: data.time_slot,
      status: data.status || 'confirmed',
      notes: data.notes || '',
      created_by: data.created_by || 'client',
      created_at: now,
      updated_at: now,
      sartorial_preferences: sartorialPrefs,
    };
  }

  // 2. Also write to local store for offline/local development cache
  try {
    const localList = readLocalAppointments();
    localList.unshift(createdAppointment);
    writeLocalAppointments(localList);
  } catch {
    // Non-fatal if filesystem is read-only
  }

  return { success: true, appointment: createdAppointment };
}

/**
 * Update an appointment's status, notes, or date/time in Supabase and local cache
 */
export async function updateAppointment(
  id: string,
  updates: Partial<StoredAppointment>
): Promise<{ success: boolean; appointment?: StoredAppointment; error?: string; conflict?: boolean }> {
  const all = await getAllAppointments();
  const existing = all.find((a) => a.id === id || a.reference_id === id);

  if (!existing) {
    return { success: false, error: 'Appointment not found' };
  }

  const newDateIso = updates.appointment_date
    ? normalizeDateToIso(updates.appointment_date)
    : updates.appointment_date_iso || existing.appointment_date_iso;
  const newTimeSlot = updates.time_slot || existing.time_slot;

  // If date or time changed, check if the new slot is already booked
  if (
    (newDateIso !== existing.appointment_date_iso || newTimeSlot !== existing.time_slot) &&
    updates.status !== 'cancelled'
  ) {
    const conflict = await isSlotBooked(newDateIso, newTimeSlot, existing.id);
    if (conflict) {
      return {
        success: false,
        conflict: true,
        error: `Cannot reschedule: The ${newTimeSlot} slot on ${formatFriendlyDate(newDateIso)} is already booked by another client.`,
      };
    }
  }

  const updatedApt: StoredAppointment = {
    ...existing,
    ...updates,
    appointment_date_iso: newDateIso,
    appointment_date: formatFriendlyDate(newDateIso),
    time_slot: newTimeSlot,
    updated_at: new Date().toISOString(),
  };

  // 1. Update in Supabase
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase/server');
    const supabaseAdmin = getSupabaseAdmin();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(existing.id);

    const sbUpdate: any = {};
    if (updates.status) sbUpdate.status = updates.status;
    if (updates.notes !== undefined) sbUpdate.notes = updates.notes;
    if (newDateIso) sbUpdate.appointment_date = newDateIso;
    if (updates.time_slot) sbUpdate.time_slot = updates.time_slot;

    if (isUuid) {
      await (supabaseAdmin.from('appointments') as any).update(sbUpdate).eq('id', existing.id);
    } else {
      await (supabaseAdmin.from('appointments') as any)
        .update(sbUpdate)
        .contains('sartorial_preferences', { reference_id: existing.reference_id });
    }
  } catch (sbErr) {
    console.warn('Could not update appointment in Supabase:', sbErr);
  }

  // 2. Update in local cache
  try {
    const localList = readLocalAppointments();
    const idx = localList.findIndex((a) => a.id === id || a.reference_id === id);
    if (idx > -1) {
      localList[idx] = updatedApt;
      writeLocalAppointments(localList);
    }
  } catch {
    // Non-fatal
  }

  return { success: true, appointment: updatedApt };
}

/**
 * Delete an appointment permanently from Supabase and local cache
 */
export async function deleteAppointment(id: string): Promise<boolean> {
  let deletedFromSupabase = false;

  // 1. Delete from Supabase
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase/server');
    const supabaseAdmin = getSupabaseAdmin();
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

    if (isUuid) {
      const { error } = await (supabaseAdmin.from('appointments') as any)
        .delete()
        .eq('id', id);
      if (!error) deletedFromSupabase = true;
    } else {
      const { error } = await (supabaseAdmin.from('appointments') as any)
        .delete()
        .contains('sartorial_preferences', { reference_id: id });
      if (!error) deletedFromSupabase = true;
    }
  } catch (err) {
    console.warn('Could not delete from Supabase:', err);
  }

  // 2. Delete from local cache
  let deletedFromLocal = false;
  try {
    const localList = readLocalAppointments();
    const filtered = localList.filter((a) => a.id !== id && a.reference_id !== id);
    if (filtered.length !== localList.length) {
      writeLocalAppointments(filtered);
      deletedFromLocal = true;
    }
  } catch {
    // Non-fatal
  }

  return deletedFromSupabase || deletedFromLocal;
}

/**
 * Get calendar summary map of booked vs free slots across dates
 */
export async function getCalendarSummary(): Promise<{
  [dateIso: string]: {
    totalBooked: number;
    bookedSlots: string[];
    freeSlots: string[];
    isFull: boolean;
    appointments: { id: string; clientName: string; timeSlot: string; fittingType: string }[];
  };
}> {
  const all = await getAllAppointments();
  const summary: {
    [dateIso: string]: {
      totalBooked: number;
      bookedSlots: string[];
      freeSlots: string[];
      isFull: boolean;
      appointments: { id: string; clientName: string; timeSlot: string; fittingType: string }[];
    };
  } = {};

  for (const apt of all) {
    if (apt.status === 'cancelled') continue;
    const iso = apt.appointment_date_iso;
    if (!summary[iso]) {
      summary[iso] = {
        totalBooked: 0,
        bookedSlots: [],
        freeSlots: [...STANDARD_FITTING_SLOTS],
        isFull: false,
        appointments: [],
      };
    }
    summary[iso].bookedSlots.push(apt.time_slot);
    summary[iso].totalBooked += 1;
    summary[iso].appointments.push({
      id: apt.id,
      clientName: apt.client_name,
      timeSlot: apt.time_slot,
      fittingType: apt.fitting_type,
    });
    summary[iso].freeSlots = STANDARD_FITTING_SLOTS.filter(
      (slot) => !summary[iso].bookedSlots.includes(slot)
    );
    summary[iso].isFull = summary[iso].freeSlots.length === 0;
  }

  return summary;
}
