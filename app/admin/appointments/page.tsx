'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Check,
  X,
  ChevronRight,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Edit2,
  Trash2,
  ChevronLeft
} from 'lucide-react';
import { LuxuryCalendarPicker } from '@/components/booking/LuxuryCalendarPicker';
import { STANDARD_FITTING_SLOTS, type StoredAppointment } from '@/types/appointments';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  const [viewMode, setViewMode] = useState<'calendar' | 'table'>('calendar');

  // Selected date for daily board
  const todayIso = useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(todayIso);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState<string>('Today');

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [rescheduleModalApt, setRescheduleModalApt] = useState<StoredAppointment | null>(null);
  const [deleteModalApt, setDeleteModalApt] = useState<StoredAppointment | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Booking Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDiscipline, setFormDiscipline] = useState('Initial Made to Measure Consultation');
  const [formLocation, setFormLocation] = useState('Flagship Atelier Nairobi');
  const [formDate, setFormDate] = useState(todayIso);
  const [formTimeSlot, setFormTimeSlot] = useState<string>('11:00 AM');
  const [formNotes, setFormNotes] = useState('');
  const [formSendEmail, setFormSendEmail] = useState(true);

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleSlot, setRescheduleSlot] = useState('');

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      if (data.success && Array.isArray(data.appointments)) {
        setAppointments(data.appointments);
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Compute calendar summary map
  const calendarSummary = useMemo(() => {
    const map: {
      [dateIso: string]: {
        totalBooked: number;
        isFull: boolean;
        bookedSlots: string[];
        freeSlots: string[];
      };
    } = {};

    for (const apt of appointments) {
      if (apt.status === 'cancelled') continue;
      const iso = apt.appointment_date_iso;
      if (!map[iso]) {
        map[iso] = {
          totalBooked: 0,
          isFull: false,
          bookedSlots: [],
          freeSlots: [...STANDARD_FITTING_SLOTS],
        };
      }
      map[iso].bookedSlots.push(apt.time_slot);
      map[iso].totalBooked += 1;
      map[iso].freeSlots = STANDARD_FITTING_SLOTS.filter(
        (s) => !map[iso].bookedSlots.includes(s)
      );
      map[iso].isFull = map[iso].freeSlots.length === 0;
    }

    return map;
  }, [appointments]);

  // Appointments for currently selected date on daily schedule board
  const selectedDayAppointments = useMemo(() => {
    return appointments.filter(
      (a) => a.appointment_date_iso === selectedDate && a.status !== 'cancelled'
    );
  }, [appointments, selectedDate]);

  // Booked slots on selected date
  const bookedSlotsOnSelectedDate = useMemo(() => {
    return selectedDayAppointments.map((a) => a.time_slot);
  }, [selectedDayAppointments]);

  // Metrics
  const stats = useMemo(() => {
    const active = appointments.filter((a) => a.status !== 'cancelled');
    const todayApts = appointments.filter(
      (a) => a.appointment_date_iso === todayIso && a.status !== 'cancelled'
    );
    const completed = appointments.filter((a) => a.status === 'completed');
    const fullDays = Object.values(calendarSummary).filter((s) => s.isFull).length;

    return {
      total: active.length,
      today: todayApts.length,
      completed: completed.length,
      fullDays,
    };
  }, [appointments, todayIso, calendarSummary]);

  // Handle Quick Status Update (Mark Completed / Cancel)
  const handleUpdateStatus = async (id: string, newStatus: StoredAppointment['status']) => {
    setActionLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: `Appointment marked as ${newStatus}.`,
        });
        await fetchAppointments();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to update appointment' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error updating appointment status.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Permanent Appointment Deletion
  const handleDeleteAppointment = async () => {
    if (!deleteModalApt) return;
    setActionLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/appointments/${deleteModalApt.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: `Appointment for ${deleteModalApt.client_name} (${deleteModalApt.reference_id}) has been deleted and the time slot is now available.`,
        });
        setDeleteModalApt(null);
        await fetchAppointments();
      } else {
        setFeedback({ type: 'error', message: data.error || 'Failed to delete appointment.' });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error deleting appointment.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Open Add Modal prefilling slot
  const handleOpenAddModal = (slot?: string, date?: string) => {
    if (date) setFormDate(date);
    if (slot) setFormTimeSlot(slot);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormNotes('');
    setFeedback(null);
    setAddModalOpen(true);
  };

  // Handle Manual Booking Submission by Admin
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || !formDate || !formTimeSlot) {
      setFeedback({ type: 'error', message: 'Name, phone, date, and time slot are required.' });
      return;
    }

    setActionLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formName.trim(),
          clientEmail: formEmail.trim(),
          clientPhone: formPhone.trim(),
          fittingType: formDiscipline,
          locationType: formLocation,
          appointmentDate: formDate,
          timeSlot: formTimeSlot,
          notes: formNotes.trim(),
          createdBy: 'admin',
          sendClientEmail: formSendEmail,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: `Booking created successfully! Reference: ${data.referenceId}`,
        });
        setAddModalOpen(false);
        setSelectedDate(formDate);
        await fetchAppointments();
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Failed to create booking. Please check slot availability.',
        });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error while creating booking.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Handle Reschedule
  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleModalApt || !rescheduleDate || !rescheduleSlot) return;

    setActionLoading(true);
    setFeedback(null);

    try {
      const res = await fetch(`/api/appointments/${rescheduleModalApt.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appointment_date: rescheduleDate,
          time_slot: rescheduleSlot,
          status: 'rescheduled',
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFeedback({
          type: 'success',
          message: `Appointment rescheduled to ${rescheduleDate} at ${rescheduleSlot}.`,
        });
        setRescheduleModalApt(null);
        setSelectedDate(rescheduleDate);
        await fetchAppointments();
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Failed to reschedule appointment.',
        });
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network error rescheduling appointment.' });
    } finally {
      setActionLoading(false);
    }
  };

  // Filtered appointments for table view
  const filteredAppointments = useMemo(() => {
    return appointments.filter((apt) => {
      const matchStatus = statusFilter === 'all' || apt.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !searchQuery ||
        apt.client_name.toLowerCase().includes(q) ||
        apt.client_email.toLowerCase().includes(q) ||
        apt.client_phone.includes(q) ||
        apt.reference_id.toLowerCase().includes(q) ||
        apt.fitting_type.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [appointments, statusFilter, searchQuery]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-brand-gold text-xs font-bold tracking-luxury uppercase mb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>Atelier Calendar & Appointments</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-navy">
            Fittings & Private Schedule
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time fitting bookings, free slot availability, and master cutter daily calendar.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={fetchAppointments}
            disabled={loading}
            className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
            title="Refresh appointments"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={() => handleOpenAddModal()}
            className="px-4 py-2.5 bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold text-xs uppercase tracking-wider rounded-lg shadow-md flex items-center space-x-2 border border-brand-gold/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Book Walk-In / Fitting</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Today&apos;s Fittings</p>
            <p className="text-xl font-bold text-brand-navy">{stats.today} Scheduled</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-brand-gold/15 text-brand-gold border border-brand-gold/30 flex items-center justify-center font-bold">
            <CalendarIcon className="w-5 h-5 text-brand-navy" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Active</p>
            <p className="text-xl font-bold text-brand-navy">{stats.total} Bookings</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Completed Fittings</p>
            <p className="text-xl font-bold text-emerald-800">{stats.completed} Sessions</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Fully Booked Days</p>
            <p className="text-xl font-bold text-rose-800">{stats.fullDays} Days</p>
          </div>
        </div>
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-4 rounded-xl border text-xs sm:text-sm flex items-start space-x-3 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          )}
          <span className="font-medium">{feedback.message}</span>
        </div>
      )}

      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-3">
        <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'calendar'
                ? 'bg-brand-navy text-brand-gold shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Calendar & Daily Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
              viewMode === 'table'
                ? 'bg-brand-navy text-brand-gold shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Bookings Registry ({appointments.length})
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium hidden sm:block">
          Atelier Operating Hours: <strong className="text-brand-navy">Mon - Sat, 08:00 AM - 07:00 PM</strong>
        </div>
      </div>

      {/* VIEW 1: Calendar & Daily Board */}
      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Luxury Calendar */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center space-x-1.5">
                <CalendarIcon className="w-4 h-4 text-brand-navy" />
                <span>Atelier Master Calendar</span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Click a date to inspect slots</span>
            </div>

            <LuxuryCalendarPicker
              selectedDate={selectedDate}
              calendarSummary={calendarSummary}
              onSelectDate={(dateStr, displayStr) => {
                setSelectedDate(dateStr);
                setSelectedDateDisplay(displayStr);
              }}
            />

            {/* Calendar Legend */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Free Day (All slots open)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                <span>Partially Booked</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Fully Booked</span>
              </span>
            </div>
          </div>

          {/* Right Column: Daily Fitting Schedule Board */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-5">
            {/* Daily Board Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-luxury text-brand-gold bg-brand-navy px-2 py-0.5 rounded">
                  Daily Master Schedule
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-brand-navy mt-1">
                  {selectedDateDisplay || selectedDate}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {bookedSlotsOnSelectedDate.length} Booked
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {6 - bookedSlotsOnSelectedDate.length} Free Slot{6 - bookedSlotsOnSelectedDate.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>

            {/* All 6 Standard Time Slots */}
            <div className="space-y-3">
              {STANDARD_FITTING_SLOTS.map((slot) => {
                const booking = selectedDayAppointments.find((a) => a.time_slot === slot);
                const isBooked = Boolean(booking);

                if (isBooked && booking) {
                  return (
                    <div
                      key={slot}
                      className="p-4 rounded-xl border-2 border-brand-gold/40 bg-gradient-to-r from-amber-50/40 via-white to-amber-50/20 shadow-xs space-y-3 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                        <div className="flex items-center space-x-2.5">
                          <span className="px-3 py-1 rounded-lg bg-brand-navy text-brand-gold font-mono font-bold text-xs">
                            {slot}
                          </span>
                          <span className="font-serif font-bold text-brand-navy text-sm sm:text-base">
                            {booking.client_name}
                          </span>
                          <span
                            className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              booking.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : booking.status === 'rescheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-brand-gold/20 text-brand-navy border border-brand-gold/40'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <span className="font-mono text-[11px] text-slate-400">
                          {booking.reference_id}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <a href={`tel:${booking.client_phone}`} className="hover:text-brand-navy font-medium underline">
                            {booking.client_phone}
                          </a>
                        </div>
                        {booking.client_email && (
                          <div className="flex items-center space-x-2 truncate">
                            <Mail className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                            <a href={`mailto:${booking.client_email}`} className="hover:text-brand-navy truncate">
                              {booking.client_email}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <span className="font-semibold text-brand-navy">{booking.fitting_type}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                          <span className="truncate">{booking.location_type}</span>
                        </div>
                      </div>

                      {booking.notes && (
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700 italic">
                          &quot;{booking.notes}&quot;
                        </div>
                      )}

                      {/* Action buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100 text-xs">
                        <div className="flex items-center space-x-2">
                          <a
                            href={`https://wa.me/${booking.client_phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[11px] flex items-center space-x-1"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>WhatsApp Client</span>
                          </a>
                        </div>

                        <div className="flex items-center space-x-2">
                          {booking.status !== 'completed' && (
                            <button
                              onClick={() => handleUpdateStatus(booking.id, 'completed')}
                              disabled={actionLoading}
                              className="px-2.5 py-1 rounded bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 font-semibold text-[11px] transition-colors"
                            >
                              ✓ Mark Done
                            </button>
                          )}

                          <button
                            onClick={() => {
                              setRescheduleModalApt(booking);
                              setRescheduleDate(booking.appointment_date_iso);
                              setRescheduleSlot(booking.time_slot);
                            }}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-700 font-semibold text-[11px] transition-colors"
                          >
                            Reschedule
                          </button>

                          <button
                            onClick={() => setDeleteModalApt(booking)}
                            disabled={actionLoading}
                            className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[11px] transition-colors flex items-center space-x-1"
                            title="Delete this appointment permanently"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                }

                // FREE SLOT CARD
                return (
                  <div
                    key={slot}
                    className="p-3.5 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/30 flex items-center justify-between gap-3 hover:bg-emerald-50/60 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="px-2.5 py-1 rounded-md bg-white border border-emerald-300 text-emerald-800 font-mono font-bold text-xs">
                        {slot}
                      </span>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 flex items-center space-x-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>AVAILABLE FITTING HOUR</span>
                        </span>
                        <span className="text-[10px] text-slate-400 block">Master cutter available for walk-in or commission</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenAddModal(slot, selectedDate)}
                      className="px-3 py-1.5 rounded-lg bg-white hover:bg-brand-navy hover:text-brand-gold text-slate-700 border border-slate-200 text-xs font-bold uppercase tracking-wider transition-all shadow-xs flex items-center space-x-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-brand-gold" />
                      <span>Book Slot</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: Table / Registry View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-6">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, email, phone, or reference..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs text-slate-500 font-semibold">Filter:</span>
              {(['all', 'confirmed', 'completed', 'cancelled'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    statusFilter === st
                      ? 'bg-brand-navy text-brand-gold font-bold shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold text-[10px]">
                  <th className="p-3">Reference</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Fitting Discipline</th>
                  <th className="p-3">Date & Time</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-400">
                      No fitting appointments found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-brand-navy">
                        {apt.reference_id}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-900">{apt.client_name}</div>
                        <div className="text-[11px] text-slate-400">{apt.client_phone}</div>
                      </td>
                      <td className="p-3 font-medium text-slate-700">
                        {apt.fitting_type}
                      </td>
                      <td className="p-3">
                        <div className="font-bold text-slate-800">{apt.appointment_date}</div>
                        <div className="text-[11px] font-mono text-brand-gold font-bold">{apt.time_slot}</div>
                      </td>
                      <td className="p-3 text-slate-500">
                        {apt.location_type}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            apt.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : apt.status === 'cancelled'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-brand-gold/20 text-brand-navy'
                          }`}
                        >
                          {apt.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                        {apt.status !== 'completed' && apt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleUpdateStatus(apt.id, 'completed')}
                            className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold text-[10px]"
                            title="Mark Completed"
                          >
                            ✓ Done
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setRescheduleModalApt(apt);
                            setRescheduleDate(apt.appointment_date_iso);
                            setRescheduleSlot(apt.time_slot);
                          }}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-brand-navy hover:text-white text-slate-700 font-semibold text-[10px]"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => setDeleteModalApt(apt)}
                          className="px-2 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-[10px] inline-flex items-center space-x-1"
                          title="Delete appointment permanently"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: Add Manual Fitting / Walk-In by Admin */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-brand-navy text-brand-gold flex items-center justify-center">
                  <CalendarIcon className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-navy">
                  Schedule Private Fitting / Walk-In
                </h3>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. David Mwangi"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+254 7..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Fitting Discipline
                </label>
                <select
                  value={formDiscipline}
                  onChange={(e) => setFormDiscipline(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                >
                  <option value="Initial Made to Measure Consultation">Initial Made to Measure Consultation (45 Min)</option>
                  <option value="Wedding Party & Groomsmen Wardrobe">Wedding Party & Groomsmen Wardrobe (60 Min)</option>
                  <option value="Tailoring & Alteration Fitting">Tailoring & Alteration Fitting (30 Min)</option>
                  <option value="Executive Tuxedo & Gala Fitting">Executive Tuxedo & Gala Fitting (45 Min)</option>
                  <option value="Senator & African Couture Fitting">Senator & African Couture Fitting (45 Min)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Fitting Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Consultation Hour *
                  </label>
                  <select
                    value={formTimeSlot}
                    onChange={(e) => setFormTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden font-bold text-brand-navy"
                  >
                    {STANDARD_FITTING_SLOTS.map((s) => {
                      const isTaken = appointments.some(
                        (a) => a.appointment_date_iso === formDate && a.time_slot === s && a.status !== 'cancelled'
                      );
                      return (
                        <option key={s} value={s} disabled={isTaken}>
                          {s} {isTaken ? '(Booked)' : '(Available)'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Atelier Location
                </label>
                <select
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                >
                  <option value="Flagship Atelier Nairobi">Flagship Atelier Nairobi (Tubman Road)</option>
                  <option value="Private Residence / Luxury Suite">Private Residence / Luxury Suite (Nairobi)</option>
                  <option value="Virtual Master Tailor Consultation">Virtual Consultation (Video)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Master Tailor Notes / Cloth References
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="Notes on fabrics (Super 130s, Jacquard), basted fittings, or wedding color schemes..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:ring-2 focus:ring-brand-gold focus:outline-hidden"
                />
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="sendEmailCheck"
                  checked={formSendEmail}
                  onChange={(e) => setFormSendEmail(e.target.checked)}
                  className="rounded text-brand-navy focus:ring-brand-gold"
                />
                <label htmlFor="sendEmailCheck" className="text-slate-600 font-medium">
                  Send automated confirmation email via <span className="font-semibold text-brand-navy">support@modernmanke.com</span>
                </label>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-5 py-2 bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold uppercase tracking-wider rounded-lg shadow-md border border-brand-gold/30 disabled:opacity-50"
                >
                  {actionLoading ? 'Scheduling...' : 'Confirm Fitting'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Reschedule Appointment Modal */}
      {rescheduleModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-serif text-lg font-bold text-brand-navy">
                  Reschedule Fitting
                </h3>
                <p className="text-xs text-slate-500">
                  Client: <strong className="text-slate-800">{rescheduleModalApt.client_name}</strong> ({rescheduleModalApt.reference_id})
                </p>
              </div>
              <button
                onClick={() => setRescheduleModalApt(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRescheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Fitting Date
                </label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  New Consultation Hour
                </label>
                <select
                  value={rescheduleSlot}
                  onChange={(e) => setRescheduleSlot(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-brand-navy"
                >
                  {STANDARD_FITTING_SLOTS.map((s) => {
                    const isTaken = appointments.some(
                      (a) =>
                        a.id !== rescheduleModalApt.id &&
                        a.appointment_date_iso === rescheduleDate &&
                        a.time_slot === s &&
                        a.status !== 'cancelled'
                    );
                    return (
                      <option key={s} value={s} disabled={isTaken}>
                        {s} {isTaken ? '(Already Booked)' : '(Available)'}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    const toDelete = rescheduleModalApt;
                    setRescheduleModalApt(null);
                    setDeleteModalApt(toDelete);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center space-x-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Appointment</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setRescheduleModalApt(null)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="px-5 py-2 bg-brand-navy hover:bg-brand-navy/90 text-brand-gold font-bold uppercase tracking-wider rounded-lg shadow-md border border-brand-gold/30 disabled:opacity-50"
                  >
                    {actionLoading ? 'Updating...' : 'Save New Time'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Delete Confirmation Modal */}
      {deleteModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif text-xl font-bold text-brand-navy">
                Delete Fitting Appointment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to permanently delete the booking for{' '}
                <strong className="text-brand-navy">{deleteModalApt.client_name}</strong> (
                {deleteModalApt.reference_id})?
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Date & Time:</span>
                <span className="font-bold text-brand-navy">{deleteModalApt.appointment_date} at {deleteModalApt.time_slot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Discipline:</span>
                <span className="font-medium text-slate-800">{deleteModalApt.fitting_type}</span>
              </div>
              <p className="text-[11px] text-rose-600 font-medium pt-1 border-t border-slate-200/60">
                ⚠️ This appointment will be permanently removed, and this hour will immediately be marked as <strong>AVAILABLE</strong> on the calendar.
              </p>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModalApt(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Keep Booking
              </button>
              <button
                type="button"
                onClick={handleDeleteAppointment}
                disabled={actionLoading}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md disabled:opacity-50"
              >
                {actionLoading ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

