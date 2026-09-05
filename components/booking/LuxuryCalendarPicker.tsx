'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles,
  Check,
  Shield,
  Clock
} from 'lucide-react';

interface LuxuryCalendarPickerProps {
  selectedDate: string; // Format: 'YYYY-MM-DD'
  onSelectDate: (dateStr: string, displayStr: string) => void;
  minDate?: string; // Format: 'YYYY-MM-DD'
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function LuxuryCalendarPicker({
  selectedDate,
  onSelectDate,
  minDate,
}: LuxuryCalendarPickerProps) {
  // Parse selected date safely without timezone distortion
  const initialDate = useMemo(() => {
    if (selectedDate && /^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
      const [y, m, d] = selectedDate.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    return new Date();
  }, [selectedDate]);

  // Today's date at midnight local time
  const today = useMemo(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  // Minimum allowed date (defaults to today)
  const minimumDate = useMemo(() => {
    if (minDate && /^\d{4}-\d{2}-\d{2}$/.test(minDate)) {
      const [y, m, d] = minDate.split('-').map(Number);
      return new Date(y, m - 1, d);
    }
    return today;
  }, [minDate, today]);

  // Month and Year navigation state
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  // Can we navigate to previous month?
  const canGoPrevious = useMemo(() => {
    const prevMonthDate = new Date(currentYear, currentMonth, 0); // Last day of previous month
    return prevMonthDate >= minimumDate;
  }, [currentYear, currentMonth, minimumDate]);

  const handlePreviousMonth = () => {
    if (!canGoPrevious) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // Build calendar matrix for current month (Monday-start)
  const calendarDays = useMemo(() => {
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday
    // Convert Sunday=0 to Monday=0 (Monday=0, ..., Sunday=6)
    const startingBlankDays = (firstDayIndex + 6) % 7;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const days: Array<{
      day: number;
      month: number;
      year: number;
      isCurrentMonth: boolean;
      dateString: string;
      disabled: boolean;
      isToday: boolean;
      isSelected: boolean;
    }> = [];

    // Previous month padding
    for (let i = startingBlankDays - 1; i >= 0; i--) {
      const d = daysInPrevMonth - i;
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const str = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        month: prevMonth,
        year: prevYear,
        isCurrentMonth: false,
        dateString: str,
        disabled: true,
        isToday: false,
        isSelected: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(currentYear, currentMonth, d);
      const str = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isDisabled = dateObj < minimumDate;
      const isDayToday = (
        dateObj.getFullYear() === today.getFullYear() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getDate() === today.getDate()
      );
      const isDaySelected = str === selectedDate;

      days.push({
        day: d,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true,
        dateString: str,
        disabled: isDisabled,
        isToday: isDayToday,
        isSelected: isDaySelected,
      });
    }

    // Fill remaining grid to multiple of 7
    const totalSlots = Math.ceil(days.length / 7) * 7;
    const remainingSlots = totalSlots - days.length;
    for (let d = 1; d <= remainingSlots; d++) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      const str = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      days.push({
        day: d,
        month: nextMonth,
        year: nextYear,
        isCurrentMonth: false,
        dateString: str,
        disabled: true,
        isToday: false,
        isSelected: false,
      });
    }

    return days;
  }, [currentYear, currentMonth, minimumDate, today, selectedDate]);

  // Format display string helper (e.g. "Thursday, Sep 10, 2026")
  const formatFriendlyDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleSelect = (dateStr: string) => {
    const display = formatFriendlyDate(dateStr);
    onSelectDate(dateStr, display);
  };

  // Quick Preset Handlers
  const selectQuickOffset = (daysAhead: number) => {
    const target = new Date(today);
    target.setDate(today.getDate() + daysAhead);
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    setCurrentYear(target.getFullYear());
    setCurrentMonth(target.getMonth());
    handleSelect(dateStr);
  };

  const selectNextSaturday = () => {
    const target = new Date(today);
    const dayOfWeek = target.getDay(); // 0 = Sunday, 6 = Saturday
    const daysUntilSat = (6 - dayOfWeek + 7) % 7 || 7;
    target.setDate(today.getDate() + daysUntilSat);
    const y = target.getFullYear();
    const m = String(target.getMonth() + 1).padStart(2, '0');
    const d = String(target.getDate()).padStart(2, '0');
    const dateStr = `${y}-${m}-${d}`;
    setCurrentYear(target.getFullYear());
    setCurrentMonth(target.getMonth());
    handleSelect(dateStr);
  };

  return (
    <div className="w-full bg-gradient-to-b from-white to-amber-50/20 rounded-2xl border border-brand-gold/30 shadow-xl overflow-hidden">
      
      {/* Luxury Gold & Navy Crown Header */}
      <div className="bg-brand-navy p-5 sm:p-6 text-white border-b-2 border-brand-gold relative overflow-hidden">
        {/* Subtle Background Monogram Accent */}
        <div className="absolute -right-6 -bottom-8 opacity-10 pointer-events-none select-none text-white font-serif text-9xl font-bold">
          MM
        </div>

        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-gold">
                Atelier Calendar
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
              {MONTH_NAMES[currentMonth]} <span className="text-brand-gold font-light">{currentYear}</span>
            </h3>
            <p className="text-[11px] text-slate-300 font-light">
              Select an exclusive private fitting date
            </p>
          </div>

          {/* Luxury Month Navigation Chevrons */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handlePreviousMonth}
              disabled={!canGoPrevious}
              className={`p-2.5 rounded-full border transition-all ${
                canGoPrevious
                  ? 'border-brand-gold/40 hover:border-brand-gold hover:bg-brand-gold/20 text-white shadow-sm active:scale-95'
                  : 'border-white/10 text-white/30 cursor-not-allowed opacity-30'
              }`}
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4 text-brand-gold" />
            </button>

            <button
              type="button"
              onClick={handleNextMonth}
              className="p-2.5 rounded-full border border-brand-gold/40 hover:border-brand-gold hover:bg-brand-gold/20 text-white transition-all shadow-sm active:scale-95"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4 text-brand-gold" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Body */}
      <div className="p-4 sm:p-6 space-y-4">
        
        {/* Weekdays Row: Strict 7 Columns via explicit CSS grid */}
        <div 
          className="w-full pb-2 border-b border-slate-100"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: '6px'
          }}
        >
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid: Strict 7 Columns via explicit inline CSS grid */}
        <div 
          className="w-full"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
            gap: '8px'
          }}
        >
          {calendarDays.map((slot, index) => {
            // Inactive previous/next month slot
            if (!slot.isCurrentMonth) {
              return (
                <div
                  key={index}
                  className="aspect-square min-h-[42px] sm:min-h-[48px] rounded-xl flex items-center justify-center text-xs text-slate-300 select-none opacity-20 border border-transparent"
                >
                  {slot.day}
                </div>
              );
            }

            // Past date (Disabled)
            if (slot.disabled) {
              return (
                <div
                  key={index}
                  className="aspect-square min-h-[42px] sm:min-h-[48px] rounded-xl flex flex-col items-center justify-center text-xs text-slate-300 bg-slate-50/60 border border-slate-100 select-none cursor-not-allowed line-through decoration-slate-300"
                  title="Past Date"
                >
                  {slot.day}
                </div>
              );
            }

            // Active / Selectable Date
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelect(slot.dateString)}
                className={`aspect-square min-h-[42px] sm:min-h-[48px] rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all duration-200 relative group ${
                  slot.isSelected
                    ? 'bg-brand-navy text-white border-2 border-brand-gold shadow-[0_6px_20px_rgba(27,20,100,0.35)] scale-105 z-10'
                    : 'text-brand-navy bg-white hover:bg-amber-50/80 border border-slate-200 hover:border-brand-gold/60 shadow-sm hover:shadow hover:scale-[1.03]'
                }`}
              >
                <span className={`leading-none ${slot.isSelected ? 'text-brand-gold font-bold text-base sm:text-lg' : 'text-slate-800'}`}>
                  {slot.day}
                </span>

                {/* Subtle marker for Today */}
                {slot.isToday && !slot.isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold absolute bottom-1.5" title="Today" />
                )}

                {/* Golden Badge on Selected Day */}
                {slot.isSelected && (
                  <span className="text-[8px] uppercase tracking-widest text-brand-gold font-extrabold mt-0.5 leading-none">
                    FITTING
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Executive Preset Buttons */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mr-1">
              Shortcuts:
            </span>
            <button
              type="button"
              onClick={() => selectQuickOffset(1)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-brand-navy hover:text-white text-slate-700 text-xs font-semibold transition-all border border-slate-200 hover:border-brand-navy shadow-sm"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => selectQuickOffset(3)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-brand-navy hover:text-white text-slate-700 text-xs font-semibold transition-all border border-slate-200 hover:border-brand-navy shadow-sm"
            >
              In 3 Days
            </button>
            <button
              type="button"
              onClick={selectNextSaturday}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-brand-navy hover:text-white text-slate-700 text-xs font-semibold transition-all border border-slate-200 hover:border-brand-navy shadow-sm"
            >
              This Saturday
            </button>
          </div>

          {/* Active Status Badge */}
          <div className="flex items-center space-x-1.5 text-xs text-brand-navy bg-amber-50 px-3 py-1.5 rounded-full border border-brand-gold/40">
            <Check className="w-3.5 h-3.5 text-brand-gold stroke-[3]" />
            <span className="font-serif font-bold">
              {formatFriendlyDate(selectedDate)}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
