import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions, fontSizes, fontWeights } from '../../tokens';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const sizeStyles = {
  sm: { height: '32px', fontSize: fontSizes.sm, padding: spacing['2'] },
  md: { height: '40px', fontSize: fontSizes.base, padding: spacing['3'] },
  lg: { height: '48px', fontSize: fontSizes.lg, padding: spacing['4'] },
};

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue = '',
  placeholder = 'Select an option',
  disabled = false,
  error = false,
  errorMessage,
  label,
  helperText,
  size = 'md',
  fullWidth = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);
  const actualValue = value ?? selectedValue;
  const sizeStyle = sizeStyles[size];

  const selectedOption = options.find(opt => opt.value === actualValue);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optValue: string) => {
    setSelectedValue(optValue);
    onChange?.(optValue);
    setIsOpen(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: fullWidth ? '100%' : '240px',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: spacing['1'],
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.neutral[700],
  };

  const triggerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: sizeStyle.height,
    padding: `0 ${sizeStyle.padding}`,
    fontSize: sizeStyle.fontSize,
    color: selectedOption ? colors.neutral[900] : colors.neutral[500],
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral[0],
    border: `1px solid ${error ? colors.error.base : isOpen ? colors.primary[500] : colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: spacing['1'],
    backgroundColor: colors.neutral[0],
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: borderRadius.md,
    boxShadow: shadows.lg,
    zIndex: zIndex.dropdown,
    maxHeight: '240px',
    overflowY: 'auto',
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'translateY(0)' : 'translateY(-8px)',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const optionStyle = (opt: SelectOption): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing['2']} ${spacing['3']}`,
    fontSize: sizeStyle.fontSize,
    color: opt.disabled ? colors.neutral[400] : colors.neutral[900],
    backgroundColor: opt.value === actualValue ? colors.primary[50] : 'transparent',
    cursor: opt.disabled ? 'not-allowed' : 'pointer',
  });

  const helperStyle: React.CSSProperties = {
    marginTop: spacing['1'],
    fontSize: fontSizes.xs,
    color: error ? colors.error.base : colors.neutral[500],
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <button
        type="button"
        disabled={disabled}
        style={triggerStyle}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <ChevronIcon isOpen={isOpen} />
      </button>
      <div style={dropdownStyle}>
        {options.map(opt => (
          <div
            key={opt.value}
            style={optionStyle(opt)}
            onClick={() => !opt.disabled && handleSelect(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
      {(helperText || errorMessage) && (
        <span style={helperStyle}>{error ? errorMessage : helperText}</span>
      )}
    </div>
  );
};

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
      transition: `transform ${transitions.duration.fast} ${transitions.timing.ease}`,
    }}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke={colors.neutral[500]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Select;
