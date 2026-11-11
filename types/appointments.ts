export const STANDARD_FITTING_SLOTS = [
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
] as const;

export type StandardFittingSlot = typeof STANDARD_FITTING_SLOTS[number];

export interface StoredAppointment {
  id: string;
  reference_id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  fitting_type: string;
  location_type: string;
  appointment_date: string; // e.g. "Thu, Nov 12, 2026"
  appointment_date_iso: string; // e.g. "2026-11-12"
  time_slot: string; // e.g. "11:00 AM"
  status: 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  notes?: string;
  created_by?: 'client' | 'admin';
  created_at: string;
  updated_at: string;
  sartorial_preferences?: {
    prefilledFabric?: string;
    prefilledService?: string;
  };
}

