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
 * Get all appointments, merging local cache with Supabase if configured
 */
export async function getAllAppointments(): Promise<StoredAppointment[]> {
  const localList = readLocalAppointments();

  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase/server');
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await (supabaseAdmin.from('appointments') as any)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data)) {
      for (const row of data) {
        const id = String(row.id);
        const exists = localList.some(
          (a) => a.id === id || a.reference_id === row.reference_id
        );
        if (!exists) {
          const dateIso = normalizeDateToIso(row.appointment_date || row.created_at);
          localList.unshift({
            id: `supabase-${id}`,
            reference_id: row.reference_id || `MMK-${row.id.slice(0, 6)}`,
            client_name: row.client_name || 'Client',
            client_email: row.client_email || '',
            client_phone: row.client_phone || '',
            fitting_type: row.fitting_type || 'Bespoke Fitting',
            location_type: row.location_type || 'Flagship Atelier Nairobi',
            appointment_date: formatFriendlyDate(dateIso),
            appointment_date_iso: dateIso,
            time_slot: row.time_slot || '11:00 AM',
            status: (row.status as any) || 'confirmed',
            notes: row.notes || '',
            created_by: 'client',
            created_at: row.created_at || new Date().toISOString(),
            updated_at: row.updated_at || new Date().toISOString(),
          });
        }
      }
      writeLocalAppointments(localList);
    }
  } catch {
    // Resilient offline fallback to local store
  }

  // Sort upcoming by date and time
  return localList.sort((a, b) => {
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
    if (excludeId && a.id === excludeId) return false;
    if (a.status === 'cancelled') return false;
    return (
      a.appointment_date_iso === cleanIso &&
      a.time_slot.trim().toUpperCase() === cleanSlot
    );
  });
}

/**
 * Create a new appointment with conflict detection
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

  const localList = readLocalAppointments();
  const now = new Date().toISOString();
  const referenceId = `MMK-${Math.floor(100000 + Math.random() * 900000)}`;
  const newAppointment: StoredAppointment = {
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
    sartorial_preferences: data.sartorial_preferences,
  };

  localList.unshift(newAppointment);
  writeLocalAppointments(localList);

  // Sync to Supabase in background
  try {
    const { getSupabaseAdmin } = await import('@/lib/supabase/server');
    const supabaseAdmin = getSupabaseAdmin();
    await (supabaseAdmin.from('appointments') as any).insert({
      client_name: newAppointment.client_name,
      client_email: newAppointment.client_email,
      client_phone: newAppointment.client_phone,
      fitting_type: newAppointment.fitting_type,
      location_type: newAppointment.location_type,
      appointment_date: newAppointment.appointment_date,
      time_slot: newAppointment.time_slot,
      status: newAppointment.status,
      notes: newAppointment.notes,
      reference_id: newAppointment.reference_id,
      sartorial_preferences: newAppointment.sartorial_preferences || {},
    });
  } catch {
    // Supabase resilient fallback
  }

  return { success: true, appointment: newAppointment };
}

/**
 * Update an appointment's status, notes, or date/time with conflict check
 */
export async function updateAppointment(
  id: string,
  updates: Partial<StoredAppointment>
): Promise<{ success: boolean; appointment?: StoredAppointment; error?: string; conflict?: boolean }> {
  const localList = readLocalAppointments();
  const index = localList.findIndex((a) => a.id === id || a.reference_id === id);

  if (index === -1) {
    return { success: false, error: 'Appointment not found' };
  }

  const existing = localList[index];
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

  const updated: StoredAppointment = {
    ...existing,
    ...updates,
    appointment_date_iso: newDateIso,
    appointment_date: formatFriendlyDate(newDateIso),
    time_slot: newTimeSlot,
    updated_at: new Date().toISOString(),
  };

  localList[index] = updated;
  writeLocalAppointments(localList);

  return { success: true, appointment: updated };
}

/**
 * Delete / remove an appointment permanently
 */
export async function deleteAppointment(id: string): Promise<boolean> {
  const localList = readLocalAppointments();
  const match = localList.find((a) => a.id === id || a.reference_id === id);
  const filtered = localList.filter((a) => a.id !== id && a.reference_id !== id);

  if (filtered.length !== localList.length) {
    writeLocalAppointments(filtered);

    // Sync deletion to Supabase in background
    try {
      const { getSupabaseAdmin } = await import('@/lib/supabase/server');
      const supabaseAdmin = getSupabaseAdmin();
      const rawId = id.replace('supabase-', '');
      if (match?.reference_id) {
        await (supabaseAdmin.from('appointments') as any)
          .delete()
          .or(`reference_id.eq.${match.reference_id},id.eq.${rawId}`);
      } else {
        await (supabaseAdmin.from('appointments') as any)
          .delete()
          .eq('id', rawId);
      }
    } catch {
      // Offline fallback
    }

    return true;
  }
  return false;
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

