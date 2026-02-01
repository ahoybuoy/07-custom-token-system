import React, { useState } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions, fontSizes, fontWeights } from '../../tokens';

export interface DatePickerProps {
  value?: Date;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholder?: string;
  onChange?: (date: Date | null) => void;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  minDate,
  maxDate,
  disabled = false,
  placeholder = 'Select date',
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || null);
  const [viewDate, setViewDate] = useState(selectedDate || new Date());

  const actualDate = value ?? selectedDate;

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange?.(newDate);
    setIsOpen(false);
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const { firstDay, daysInMonth } = getDaysInMonth(viewDate);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '240px',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: `${spacing['2']} ${spacing['3']}`,
    fontSize: fontSizes.base,
    color: actualDate ? colors.neutral[900] : colors.neutral[500],
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral[0],
    border: `1px solid ${isOpen ? colors.primary[500] : colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `border-color ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const calendarStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    marginTop: spacing['1'],
    padding: spacing['3'],
    backgroundColor: colors.neutral[0],
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.lg,
    zIndex: zIndex.dropdown,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing['3'],
  };

  const navButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: borderRadius.base,
    color: colors.neutral[600],
  };

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: spacing['1'],
  };

  const dayHeaderStyle: React.CSSProperties = {
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    color: colors.neutral[500],
    textAlign: 'center',
    padding: spacing['1'],
  };

  const dayButtonStyle = (day: number, isDisabled: boolean): React.CSSProperties => {
    const isSelected = actualDate?.getDate() === day &&
      actualDate?.getMonth() === viewDate.getMonth() &&
      actualDate?.getFullYear() === viewDate.getFullYear();

    return {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '28px',
      height: '28px',
      fontSize: fontSizes.sm,
      color: isSelected ? colors.neutral[0] : isDisabled ? colors.neutral[300] : colors.neutral[900],
      backgroundColor: isSelected ? colors.primary[500] : 'transparent',
      border: 'none',
      borderRadius: borderRadius.full,
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    };
  };

  return (
    <div style={containerStyle}>
      <input
        readOnly
        disabled={disabled}
        style={inputStyle}
        value={actualDate ? actualDate.toLocaleDateString() : ''}
        placeholder={placeholder}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      />
      <div style={calendarStyle}>
        <div style={headerStyle}>
          <button
            style={navButtonStyle}
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1))}
          >
            &lt;
          </button>
          <span style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.medium }}>
            {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <button
            style={navButtonStyle}
            onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1))}
          >
            &gt;
          </button>
        </div>
        <div style={gridStyle}>
          {DAYS.map(day => (
            <div key={day} style={dayHeaderStyle}>{day}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isDisabled = isDateDisabled(day);
            return (
              <button
                key={day}
                style={dayButtonStyle(day, isDisabled)}
                disabled={isDisabled}
                onClick={() => handleDateSelect(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
