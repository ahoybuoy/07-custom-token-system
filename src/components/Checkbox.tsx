import React, { forwardRef } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
}

const sizeStyles = {
  sm: { box: '16px', icon: '10px', fontSize: fontSizes.sm },
  md: { box: '20px', icon: '12px', fontSize: fontSizes.base },
  lg: { box: '24px', icon: '14px', fontSize: fontSizes.lg },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  label,
  description,
  size = 'md',
  onChange,
  name,
  value,
}, ref) => {
  const sizeStyle = sizeStyles[size];
  const [isChecked, setIsChecked] = React.useState(defaultChecked ?? false);
  const actualChecked = checked ?? isChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    }
  };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: spacing['3'],
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const checkboxStyle: React.CSSProperties = {
    position: 'relative',
    width: sizeStyle.box,
    height: sizeStyle.box,
    flexShrink: 0,
  };

  const inputStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    margin: 0,
  };

  const boxStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.base,
    border: `2px solid ${actualChecked || indeterminate ? colors.primary[500] : colors.neutral[300]}`,
    backgroundColor: actualChecked || indeterminate ? colors.primary[500] : colors.neutral[0],
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const labelContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['0.5'],
  };

  const labelStyle: React.CSSProperties = {
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
    color: colors.neutral[900],
    lineHeight: 1.4,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    lineHeight: 1.4,
  };

  return (
    <label style={containerStyle}>
      <div style={checkboxStyle}>
        <input
          ref={ref}
          type="checkbox"
          checked={actualChecked}
          disabled={disabled}
          name={name}
          value={value}
          onChange={handleChange}
          style={inputStyle}
        />
        <div style={boxStyle}>
          {actualChecked && !indeterminate && (
            <CheckIcon size={sizeStyle.icon} />
          )}
          {indeterminate && (
            <MinusIcon size={sizeStyle.icon} />
          )}
        </div>
      </div>
      {(label || description) && (
        <div style={labelContainerStyle}>
          {label && <span style={labelStyle}>{label}</span>}
          {description && <span style={descriptionStyle}>{description}</span>}
        </div>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';

const CheckIcon: React.FC<{ size: string }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6L5 8.5L9.5 3.5"
      stroke={colors.neutral[0]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MinusIcon: React.FC<{ size: string }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path
      d="M2.5 6H9.5"
      stroke={colors.neutral[0]}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default Checkbox;
