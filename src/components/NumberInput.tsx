import React, { useState, forwardRef } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

export interface NumberInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
}

const sizeStyles = {
  sm: { height: '32px', fontSize: fontSizes.sm, buttonWidth: '28px' },
  md: { height: '40px', fontSize: fontSizes.base, buttonWidth: '36px' },
  lg: { height: '48px', fontSize: fontSizes.lg, buttonWidth: '44px' },
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({
  value,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision = 0,
  disabled = false,
  label,
  helperText,
  error = false,
  errorMessage,
  size = 'md',
  onChange,
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const actualValue = value ?? internalValue;
  const sizeStyle = sizeStyles[size];

  const updateValue = (newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    const roundedValue = Number(clampedValue.toFixed(precision));
    setInternalValue(roundedValue);
    onChange?.(roundedValue);
  };

  const handleIncrement = () => updateValue(actualValue + step);
  const handleDecrement = () => updateValue(actualValue - step);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);
    if (!isNaN(parsed)) {
      updateValue(parsed);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['1'],
  };

  const labelStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.neutral[700],
  };

  const inputGroupStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = (position: 'left' | 'right'): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyle.buttonWidth,
    height: sizeStyle.height,
    backgroundColor: colors.neutral[100],
    border: `1px solid ${error ? colors.error.base : colors.neutral[300]}`,
    borderRadius: position === 'left'
      ? `${borderRadius.md} 0 0 ${borderRadius.md}`
      : `0 ${borderRadius.md} ${borderRadius.md} 0`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: colors.neutral[600],
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  });

  const inputStyle: React.CSSProperties = {
    width: '80px',
    height: sizeStyle.height,
    padding: `0 ${spacing['3']}`,
    fontSize: sizeStyle.fontSize,
    textAlign: 'center',
    color: colors.neutral[900],
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral[0],
    border: `1px solid ${error ? colors.error.base : colors.neutral[300]}`,
    borderLeft: 'none',
    borderRight: 'none',
    outline: 'none',
  };

  const helperStyle: React.CSSProperties = {
    fontSize: fontSizes.xs,
    color: error ? colors.error.base : colors.neutral[500],
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputGroupStyle}>
        <button
          type="button"
          style={buttonStyle('left')}
          disabled={disabled || actualValue <= min}
          onClick={handleDecrement}
        >
          <MinusIcon />
        </button>
        <input
          ref={ref}
          type="text"
          value={actualValue.toFixed(precision)}
          disabled={disabled}
          style={inputStyle}
          onChange={handleInputChange}
        />
        <button
          type="button"
          style={buttonStyle('right')}
          disabled={disabled || actualValue >= max}
          onClick={handleIncrement}
        >
          <PlusIcon />
        </button>
      </div>
      {(helperText || errorMessage) && (
        <span style={helperStyle}>{error ? errorMessage : helperText}</span>
      )}
    </div>
  );
});

NumberInput.displayName = 'NumberInput';

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 4V12M4 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default NumberInput;
