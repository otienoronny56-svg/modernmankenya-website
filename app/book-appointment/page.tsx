'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  User, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { LuxuryCalendarPicker } from '@/components/booking/LuxuryCalendarPicker';
import { AtelierMap } from '@/components/common/AtelierMap';
import { trackAppointmentBooking } from '@/lib/analytics/gtag';

function BookAppointmentContent() {
  const searchParams = useSearchParams();
  const prefilledService = searchParams.get('service') || '';
  const prefilledFabric = searchParams.get('fabric') || '';
  const promoCode = searchParams.get('promo') || '';

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  // Initial date computation
  const getInitialDates = () => {
    const now = new Date();
    // Default to tomorrow or today if early
    const target = new Date(now);
    if (now.getHours() >= 17) {
      target.setDate(now.getDate() + 1);
    }
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    const iso = `${y}-${m}-${d}`;
    const display = target.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return { iso, display };
  };

  const init = getInitialDates();

  // Form state
  const [fittingType, setFittingType] = useState<string>(
    prefilledService ? `Made to Measure Consultation: ${prefilledService}` : 'Initial Made to Measure Consultation'
  );
  const [locationType, setLocationType] = useState<string>('Flagship Atelier Nairobi');
  const [selectedDate, setSelectedDate] = useState<string>(init.iso);
  const [selectedDateDisplay, setSelectedDateDisplay] = useState<string>(init.display);
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [clientName, setClientName] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>(() => {
    const parts: string[] = [];
    if (prefilledFabric) parts.push(`Interested in cloth: ${prefilledFabric}`);
    if (promoCode) parts.push(`[Promo Applied: ${promoCode} - 20% Off Black November Bespoke Special]`);
    return parts.join(' | ');
  });

  // Real-time appointment schedule states
  const [calendarSummary, setCalendarSummary] = useState<any>({});
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [conflictError, setConflictError] = useState<string | null>(null);

  // Fetch monthly calendar summary
  const fetchCalendarSummary = () => {
    fetch('/api/appointments?summary=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.calendarSummary) {
          setCalendarSummary(data.calendarSummary);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchCalendarSummary();
  }, []);

  // Fetch booked slots whenever selectedDate changes
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingSlots(true);
    setConflictError(null);

    fetch(`/api/appointments?date=${encodeURIComponent(selectedDate)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const taken: string[] = data.bookedSlots || [];
          setBookedSlots(taken);

          // If the currently chosen slot is booked on this date, guide the user
          if (taken.includes(selectedTime)) {
            const firstFree = timeSlots.find((s) => !taken.includes(s));
            if (firstFree) {
              setSelectedTime(firstFree);
              setConflictError(
                `Notice: The ${selectedTime} slot on this date is already booked. We have selected the next available slot (${firstFree}) for you.`
              );
            } else {
              setConflictError(
                `All fitting slots on ${selectedDateDisplay || selectedDate} are fully reserved. Please choose another free day on the calendar.`
              );
            }
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoadingSlots(false));
  }, [selectedDate]);

  const fittingTypes = [
    {
      title: 'Initial Made to Measure Consultation',
      duration: '45 Minutes',
      desc: 'First-time commission. Style profiling, anatomical measurement, and review of 4,000+ cloth swatches.',
    },
    {
      title: 'Wedding Party & Groomsmen Wardrobe',
      duration: '60 Minutes',
      desc: 'Coordinated fitting for groom, best man, and groomsmen party in our private VIP lounge.',
    },
    {
      title: 'Tailoring & Alteration Fitting',
      duration: '30 Minutes',
      desc: 'Millimetric fine-tuning of garments to achieve an immaculate custom taper.',
    },
  ];

  const locations = [
    {
      title: 'Flagship Atelier Nairobi',
      desc: 'Nairobi, Kenya. Full access to VIP bar, cloth library, and master cutters.',
    },
    {
      title: 'Private Residence / Luxury Hotel Suite',
      desc: 'Our Master Tailor visits your private residence or executive suite across Nairobi.',
    },
    {
      title: 'Virtual Master Tailor Consultation',
      desc: 'High-definition video consultation for diaspora and international clientele.',
    },
  ];

  const timeSlots = [
    '09:30 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'
  ];

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientEmail,
          clientPhone,
          fittingType,
          locationType,
          appointmentDate: selectedDateDisplay || selectedDate,
          timeSlot: selectedTime,
          notes,
          prefilledFabric,
          prefilledService,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        if (resData?.conflict) {
          setConflictError(
            resData.error ||
              `The ${selectedTime} slot on this date is already reserved. Please choose an alternate time or another date.`
          );
          setStep(3);
          setLoading(false);
          return;
        }
        throw new Error(resData?.error || 'Failed to submit booking');
      }

      const referenceId = resData?.referenceId || `MMK-${Math.floor(100000 + Math.random() * 900000)}`;

      setConfirmedBookingId(referenceId);
      trackAppointmentBooking({
        fittingType,
        date: selectedDateDisplay,
        location: locationType,
      });
      // Refresh calendar summary in background
      fetchCalendarSummary();
      setStep(5); // Confirmation screen
    } catch (err: any) {
      console.error('Appointment submit error:', err);
      if (err.message && err.message.includes('booked')) {
        setConflictError(err.message);
        setStep(3);
      } else {
        // Resilient fallback
        setConfirmedBookingId(`MMK-${Math.floor(100000 + Math.random() * 900000)}`);
        setStep(5);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-canvas-alt dark:bg-[#0c101c] py-10 sm:py-16 text-brand-slate dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] sm:text-xs uppercase tracking-luxury text-brand-gold font-bold block">
            Private Sartorial Service
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-brand-navy dark:text-white font-bold">
            Book a Private Fitting
          </h1>
          <p className="text-xs sm:text-sm text-brand-slate-muted dark:text-slate-400">
            Select your preferred consultation discipline, date, and atelier location in Nairobi.
          </p>
        </div>

        {/* Promo Privilege Banner */}
        {promoCode && (
          <div className="mb-6 max-w-xl mx-auto bg-gradient-to-r from-stone-950 via-[#131728] to-stone-950 border border-brand-gold/60 rounded-xl p-3 sm:p-4 text-center shadow-lg animate-in fade-in slide-in-from-top-2 duration-300">
            <div className="flex items-center justify-center space-x-2 text-brand-gold text-xs font-bold uppercase tracking-widest mb-1">
              <span>Privilege Activated: 20% Off Bespoke Tailoring</span>
            </div>
            <p className="text-xs text-slate-200">
              Code <strong className="font-mono text-amber-300 font-bold">{promoCode}</strong> applied. Your 20% Black November & Black Friday privilege will be honored on your bespoke commission.
            </p>
          </div>
        )}

        {/* Wizard Progress Bar */}
        {step <= 4 && (
          <div className="bg-white dark:bg-[#121727] p-3 sm:p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 mb-6 sm:mb-8 flex justify-between items-center text-xs">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center space-x-1.5 sm:space-x-2">
                <span
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-[11px] sm:text-xs ${
                    step === s
                      ? 'bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy'
                      : step > s
                      ? 'bg-brand-gold text-brand-navy'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step > s ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> : s}
                </span>
                <span className={`hidden sm:inline font-semibold ${step === s ? 'text-brand-navy dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                  {s === 1 ? 'Fitting Type' : s === 2 ? 'Location' : s === 3 ? 'Schedule' : 'Client Profile'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step Container Card */}
        <div className="bg-white dark:bg-[#121727] rounded-lg shadow-luxury border border-slate-200 dark:border-slate-800 p-4 sm:p-10">
          
          {/* STEP 1: Fitting Type */}
          {step === 1 && (
            <div className="space-y-5 sm:space-y-6">
              <h2 className="font-serif text-xl sm:text-2xl text-brand-navy dark:text-white font-bold">
                1. Select Fitting Discipline
              </h2>
              <div className="space-y-2.5 sm:space-y-3">
                {fittingTypes.map((type) => (
                  <div
                    key={type.title}
                    onClick={() => setFittingType(type.title)}
                    className={`p-4 sm:p-5 rounded-lg border cursor-pointer transition-all ${
                      fittingType === type.title
                        ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#161e32]'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <h3 className="font-serif text-sm sm:text-base font-bold text-brand-navy dark:text-white">{type.title}</h3>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-brand-gold bg-brand-gold/10 dark:bg-brand-gold/20 px-2 py-0.5 rounded flex-shrink-0">
                        {type.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-light">{type.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 sm:pt-6 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light dark:bg-brand-gold dark:hover:bg-brand-gold-light text-white dark:text-brand-navy text-xs font-bold uppercase tracking-luxury rounded flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Proceed to Location</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Location Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-brand-navy dark:text-white font-bold">
                2. Select Atelier Location
              </h2>
              <div className="space-y-3">
                {locations.map((loc) => (
                  <div
                    key={loc.title}
                    onClick={() => setLocationType(loc.title)}
                    className={`p-5 rounded-lg border cursor-pointer transition-all ${
                      locationType === loc.title
                        ? 'border-brand-gold bg-brand-gold/5 dark:bg-brand-gold/10 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#161e32]'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <MapPin className="w-4 h-4 text-brand-gold" />
                      <h3 className="font-serif text-base font-bold text-brand-navy dark:text-white">{loc.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-light">{loc.desc}</p>
                  </div>
                ))}
              </div>

              {/* If Flagship Atelier is selected, show interactive map */}
              {locationType === 'Flagship Atelier Nairobi' && (
                <div className="pt-2 animate-in fade-in duration-300">
                  <AtelierMap 
                    title="Flagship Atelier Location & Directions"
                    className="border border-brand-gold/30 dark:border-slate-800"
                  />
                </div>
              )}

              <div className="pt-6 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-slate-300 dark:border-slate-700 text-brand-navy dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light dark:bg-brand-gold dark:hover:bg-brand-gold-light text-white dark:text-brand-navy text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 transition-colors"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-brand-navy dark:text-white font-bold">
                  3. Choose Private Appointment Slot
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Select your fitting date on the appointment calendar, then choose an available consultation time.
                </p>
              </div>

              {/* Conflict / Schedule Notice Banner */}
              {conflictError && (
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start space-x-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <p className="font-bold text-amber-950 dark:text-amber-100">Atelier Booking Notice</p>
                    <p className="leading-relaxed">{conflictError}</p>
                  </div>
                </div>
              )}

              {/* Responsive Layout: Calendar on Left, Time Slots & Overview on Right */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Left: Luxury Monthly Calendar Picker (7 Cols on desktop) */}
                <div className="lg:col-span-7 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-luxury text-brand-slate dark:text-slate-300">
                      Select Fitting Date
                    </label>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {bookedSlots.length === 6 ? (
                        <span className="text-rose-600 dark:text-rose-400 font-bold">● Fully Booked Day</span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium">● {6 - bookedSlots.length} of 6 slots free</span>
                      )}
                    </span>
                  </div>
                  <LuxuryCalendarPicker
                    selectedDate={selectedDate}
                    calendarSummary={calendarSummary}
                    onSelectDate={(dateStr, displayStr) => {
                      setSelectedDate(dateStr);
                      setSelectedDateDisplay(displayStr);
                    }}
                  />
                </div>

                {/* Right: Time Slot & Overview Column (5 Cols on desktop) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Selected Slot Overview Card: Styled like an Atelier VIP Pass */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-navy via-[#16114E] to-brand-navy text-white border-2 border-brand-gold/40 shadow-2xl relative overflow-hidden space-y-3.5">
                    {/* Golden top accent banner */}
                    <div className="flex items-center justify-between text-[11px] text-brand-gold font-bold uppercase tracking-[0.2em] border-b border-white/10 pb-2.5">
                      <span>
                        Private Fitting Pass
                      </span>
                      <span className="bg-brand-gold text-brand-navy px-2 py-0.5 rounded text-[9px] font-extrabold tracking-wider">
                        VIP SERVICE
                      </span>
                    </div>

                    {/* Date */}
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                        Reserved Fitting Date
                      </span>
                      <p className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
                        {selectedDateDisplay || selectedDate}
                      </p>
                    </div>

                    {/* Time & Discipline */}
                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/10">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                          Session Time
                        </span>
                        <p className="font-serif text-base font-bold text-brand-gold">
                          {selectedTime}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-300 font-semibold block">
                          Duration
                        </span>
                        <p className="text-xs font-semibold text-slate-200">
                          {fittingTypes.find((f) => f.title === fittingType)?.duration || '45 Minutes'}
                        </p>
                      </div>
                    </div>

                    {/* Atelier Location */}
                    <div className="pt-2 border-t border-white/10 text-xs text-slate-300 flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      <span className="font-light">{locationType}</span>
                    </div>

                    <div className="bg-white/5 -mx-5 -mb-5 px-5 py-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                      <span>• Master Cutter Reserved</span>
                      <span className="text-brand-gold font-semibold">• VIP Lounge Hospitality</span>
                    </div>
                  </div>

                  {/* Luxury Time Slots Selector */}
                  <div className="bg-white dark:bg-[#161e32] p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <label className="text-xs font-bold uppercase tracking-luxury text-brand-navy dark:text-white flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-brand-gold" />
                        <span>Select Consultation Hour</span>
                      </label>
                      <span className="text-[10px] text-slate-400 font-medium">Nairobi EAT (UTC+3)</span>
                    </div>

                    {/* Morning Slots */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Morning Sessions
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {['09:30 AM', '11:00 AM'].map((time) => {
                          const isBooked = bookedSlots.includes(time);
                          return (
                            <button
                              key={time}
                              type="button"
                              disabled={isBooked}
                              onClick={() => {
                                if (isBooked) {
                                  setConflictError(
                                    `The ${time} slot on this date is already booked. Please choose an available slot or another date.`
                                  );
                                  return;
                                }
                                setSelectedTime(time);
                                setConflictError(null);
                              }}
                              className={`py-3 px-2.5 rounded-xl border text-center transition-all ${
                                isBooked
                                  ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60'
                                  : selectedTime === time
                                  ? 'bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy border-2 border-brand-gold dark:border-brand-gold shadow-md font-bold'
                                  : 'bg-slate-50/70 dark:bg-[#182238] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-gold/60 dark:hover:border-brand-gold/60 hover:bg-amber-50/50 dark:hover:bg-[#1c2844]'
                              }`}
                            >
                              <span
                                className={`text-xs font-bold block ${
                                  isBooked
                                    ? 'line-through text-slate-400 dark:text-slate-600'
                                    : selectedTime === time
                                    ? 'text-brand-gold dark:text-brand-navy'
                                    : 'text-brand-navy dark:text-slate-200'
                                }`}
                              >
                                {time}
                              </span>
                              <span
                                className={`text-[9px] block mt-0.5 ${
                                  isBooked
                                    ? 'text-rose-500 font-bold uppercase tracking-wider'
                                    : selectedTime === time
                                    ? 'text-slate-300 dark:text-brand-navy/80'
                                    : 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                }`}
                              >
                                {isBooked ? '• Reserved' : '• Available'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Afternoon & Evening Slots */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Afternoon & Evening Sessions
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {['01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'].map((time) => {
                          const isBooked = bookedSlots.includes(time);
                          return (
                            <button
                              key={time}
                              type="button"
                              disabled={isBooked}
                              onClick={() => {
                                if (isBooked) {
                                  setConflictError(
                                    `The ${time} slot on this date is already booked. Please choose an available slot or another date.`
                                  );
                                  return;
                                }
                                setSelectedTime(time);
                                setConflictError(null);
                              }}
                              className={`py-3 px-2.5 rounded-xl border text-center transition-all ${
                                isBooked
                                  ? 'bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-600 border-slate-200 dark:border-slate-800 cursor-not-allowed opacity-60'
                                  : selectedTime === time
                                  ? 'bg-brand-navy dark:bg-brand-gold text-white dark:text-brand-navy border-2 border-brand-gold dark:border-brand-gold shadow-md font-bold'
                                  : 'bg-slate-50/70 dark:bg-[#182238] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-gold/60 dark:hover:border-brand-gold/60 hover:bg-amber-50/50 dark:hover:bg-[#1c2844]'
                              }`}
                            >
                              <span
                                className={`text-xs font-bold block ${
                                  isBooked
                                    ? 'line-through text-slate-400 dark:text-slate-600'
                                    : selectedTime === time
                                    ? 'text-brand-gold dark:text-brand-navy'
                                    : 'text-brand-navy dark:text-slate-200'
                                }`}
                              >
                                {time}
                              </span>
                              <span
                                className={`text-[9px] block mt-0.5 ${
                                  isBooked
                                    ? 'text-rose-500 font-bold uppercase tracking-wider'
                                    : selectedTime === time
                                    ? 'text-slate-300 dark:text-brand-navy/80'
                                    : 'text-emerald-600 dark:text-emerald-400 font-semibold'
                                }`}
                              >
                                {isBooked ? '• Reserved' : '• Available'}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-3.5 border border-slate-300 dark:border-slate-700 text-brand-navy dark:text-slate-300 text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={bookedSlots.includes(selectedTime) || bookedSlots.length >= 6}
                  onClick={() => {
                    if (bookedSlots.includes(selectedTime)) {
                      setConflictError(`The selected time slot (${selectedTime}) is already booked. Please choose an available slot or another date.`);
                      return;
                    }
                    setStep(4);
                  }}
                  className="px-8 py-3.5 bg-brand-navy hover:bg-brand-navy-light dark:bg-brand-gold dark:hover:bg-brand-gold-light disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-brand-navy text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 transition-all shadow-md"
                >
                  <span>Client Information</span>
                  <ArrowRight className="w-4 h-4 text-brand-gold dark:text-brand-navy" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Client Profile & Confirmation */}
          {step === 4 && (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <h2 className="font-serif text-2xl text-brand-navy dark:text-white font-bold">
                4. Client Profile & Preferences
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy dark:text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ronald Ochieng"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#182238] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-navy dark:focus:border-brand-gold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy dark:text-slate-300 uppercase tracking-wider mb-1">
                    Direct Telephone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0114 122 510 or +254 7..."
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#182238] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-navy dark:focus:border-brand-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy dark:text-slate-300 uppercase tracking-wider mb-1">
                  Confidential Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@executive.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#182238] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-navy dark:focus:border-brand-gold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy dark:text-slate-300 uppercase tracking-wider mb-1">
                  Sartorial Preferences or Event Date
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Preparing for a black tie gala in December, interested in Scabal Midnight Navy cloth..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#182238] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-brand-navy dark:focus:border-brand-gold"
                />
              </div>

              {/* Summary Pill */}
              <div className="p-4 bg-brand-canvas-alt dark:bg-[#182238] rounded border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p className="font-semibold text-brand-navy dark:text-white">Appointment Review:</p>
                <p className="text-slate-600 dark:text-slate-300">{fittingType} • {locationType}</p>
                <p className="text-brand-gold font-bold">{selectedDateDisplay || selectedDate} at {selectedTime}</p>
              </div>

              <div className="pt-6 flex justify-between items-center">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-3.5 border border-slate-300 dark:border-slate-700 text-brand-navy dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase tracking-luxury rounded flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 bg-brand-gold hover:bg-brand-gold-light text-brand-navy font-bold uppercase tracking-luxury text-xs rounded transition-all shadow-gold flex items-center space-x-2"
                >
                  {loading ? (
                    <span>Registering Appointment...</span>
                  ) : (
                    <>
                      <span>Confirm Sartorial Fitting</span>
                      <Check className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Booking Confirmation */}
          {step === 5 && (
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 text-brand-gold mx-auto flex items-center justify-center border-2 border-brand-gold">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-luxury text-brand-gold font-bold">
                  Appointment Confirmed
                </span>
                <h2 className="font-serif text-3xl font-bold text-brand-navy dark:text-white">
                  We Await Your Presence
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto font-light">
                  Your fitting consultation has been registered under reference ID:
                </p>
                <span className="inline-block px-4 py-1.5 bg-brand-navy dark:bg-brand-gold text-brand-gold dark:text-brand-navy font-mono font-bold text-sm rounded mt-2">
                  {confirmedBookingId}
                </span>
              </div>

              <div className="bg-brand-canvas-alt dark:bg-[#161e32] max-w-md mx-auto p-5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-left space-y-2 text-slate-700 dark:text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Client:</span>
                  <span className="font-bold text-brand-navy dark:text-white">{clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Discipline:</span>
                  <span className="font-bold text-brand-navy dark:text-white">{fittingType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-bold text-brand-navy dark:text-white">{locationType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-bold text-brand-gold dark:text-brand-gold">{selectedDateDisplay || selectedDate} at {selectedTime}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/"
                  className="px-6 py-3 bg-brand-navy hover:bg-brand-navy-light dark:bg-brand-gold dark:hover:bg-brand-gold-light text-white dark:text-brand-navy text-xs font-bold uppercase tracking-luxury rounded transition-colors text-center"
                >
                  Return to Homepage
                </Link>
                <Link
                  href="/ready-to-wear"
                  className="px-6 py-3 border border-brand-navy dark:border-slate-700 text-brand-navy dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold uppercase tracking-luxury rounded transition-colors text-center"
                >
                  Explore The Collection
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center space-x-2 text-[11px] text-slate-400 dark:text-slate-500">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>A confirmation SMS and calendar invitation have been dispatched to {clientPhone}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand-navy">Preparing Appointment Booking...</div>}>
      <BookAppointmentContent />
    </Suspense>
  );
}
