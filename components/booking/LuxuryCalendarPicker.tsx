'use client';

import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles,
  Check,
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
      const dateObj = new Date(prevYear, prevMonth, d);
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

    // Fill remaining grid to 35 or 42 cells
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

  // Format display string helper (e.g. "Thu, Sep 10, 2026")
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

  // Find next Saturday
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
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
      
      {/* Calendar Header: Month/Year and Navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-brand-gold/10 text-brand-gold rounded-md">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif text-base sm:text-lg font-bold text-brand-navy tracking-tight">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
              Private Fitting Calendar
            </p>
          </div>
        </div>

        {/* Month Navigation Chevrons */}
        <div className="flex items-center space-x-1.5">
          <button
            type="button"
            onClick={handlePreviousMonth}
            disabled={!canGoPrevious}
            className={`p-2 rounded-lg border text-brand-navy transition-all ${
              canGoPrevious
                ? 'border-slate-200 hover:border-brand-gold hover:bg-brand-gold/10 hover:text-brand-navy shadow-sm'
                : 'border-slate-100 text-slate-300 cursor-not-allowed opacity-40'
            }`}
            aria-label="Previous Month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleNextMonth}
            className="p-2 rounded-lg border border-slate-200 hover:border-brand-gold hover:bg-brand-gold/10 text-brand-navy hover:text-brand-navy transition-all shadow-sm"
            aria-label="Next Month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Header Row */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="py-1 text-[11px] font-bold uppercase tracking-luxury text-slate-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day Cells Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {calendarDays.map((slot, index) => {
          if (!slot.isCurrentMonth) {
            return (
              <div
                key={index}
                className="h-10 sm:h-11 flex items-center justify-center text-xs text-slate-300 select-none opacity-20"
              >
                {slot.day}
              </div>
            );
          }

          if (slot.disabled) {
            return (
              <div
                key={index}
                className="h-10 sm:h-11 flex items-center justify-center text-xs text-slate-300 bg-slate-50/40 rounded-lg cursor-not-allowed select-none line-through decoration-slate-300/60"
                title="Date is in the past"
              >
                {slot.day}
              </div>
            );
          }

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(slot.dateString)}
              className={`h-10 sm:h-11 rounded-lg flex flex-col items-center justify-center text-xs sm:text-sm font-semibold transition-all relative group ${
                slot.isSelected
                  ? 'bg-brand-navy text-brand-gold border-2 border-brand-gold shadow-md scale-105 font-bold z-10'
                  : 'text-brand-navy bg-slate-50/70 hover:bg-amber-50/60 border border-slate-200/80 hover:border-brand-gold/50'
              }`}
            >
              <span>{slot.day}</span>
              
              {/* Gold dot indicator for Today */}
              {slot.isToday && !slot.isSelected && (
                <span 
                  className="w-1.5 h-1.5 rounded-full bg-brand-gold absolute bottom-1" 
                  title="Today" 
                />
              )}

              {/* Selected subtle checkmark hint */}
              {slot.isSelected && (
                <span className="text-[8px] uppercase tracking-tighter text-brand-gold/80 font-bold leading-none mt-0.5">
                  Chosen
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Select Shortcut Chips */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mr-1">
            Quick:
          </span>
          <button
            type="button"
            onClick={() => selectQuickOffset(1)}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-brand-gold/15 hover:text-brand-navy text-slate-600 text-[11px] font-semibold transition-all border border-slate-200"
          >
            Tomorrow
          </button>
          <button
            type="button"
            onClick={() => selectQuickOffset(3)}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-brand-gold/15 hover:text-brand-navy text-slate-600 text-[11px] font-semibold transition-all border border-slate-200"
          >
            In 3 Days
          </button>
          <button
            type="button"
            onClick={selectNextSaturday}
            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-brand-gold/15 hover:text-brand-navy text-slate-600 text-[11px] font-semibold transition-all border border-slate-200"
          >
            This Saturday
          </button>
        </div>

        {/* Selected Date Confirmation Badge */}
        {selectedDate && (
          <div className="flex items-center space-x-1.5 text-brand-navy font-semibold text-[11px] bg-amber-50/80 px-2.5 py-1 rounded border border-brand-gold/30">
            <Check className="w-3.5 h-3.5 text-brand-gold stroke-[3]" />
            <span className="font-serif font-bold text-brand-navy">
              {formatFriendlyDate(selectedDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
