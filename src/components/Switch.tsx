import React, { forwardRef } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (checked: boolean) => void;
  name?: string;
}

const sizeStyles = {
  sm: { track: { width: '32px', height: '18px' }, thumb: '14px', translate: '14px' },
  md: { track: { width: '44px', height: '24px' }, thumb: '20px', translate: '20px' },
  lg: { track: { width: '56px', height: '30px' }, thumb: '26px', translate: '26px' },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  checked,
  defaultChecked = false,
  disabled = false,
  label,
  description,
  size = 'md',
  onChange,
  name,
}, ref) => {
  const [isChecked, setIsChecked] = React.useState(defaultChecked);
  const actualChecked = checked ?? isChecked;
  const sizeStyle = sizeStyles[size];

  const handleChange = () => {
    if (!disabled) {
      const newChecked = !actualChecked;
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

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: sizeStyle.track.width,
    height: sizeStyle.track.height,
    backgroundColor: actualChecked ? colors.primary[500] : colors.neutral[300],
    borderRadius: borderRadius.full,
    transition: `background-color ${transitions.duration.fast} ${transitions.timing.ease}`,
    flexShrink: 0,
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: '2px',
    width: sizeStyle.thumb,
    height: sizeStyle.thumb,
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.full,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
    transform: actualChecked ? `translateX(${sizeStyle.translate})` : 'translateX(0)',
    transition: `transform ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const inputStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: disabled ? 'not-allowed' : 'pointer',
    margin: 0,
  };

  const labelContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['0.5'],
  };

  const labelStyle: React.CSSProperties = {
    fontSize: size === 'sm' ? fontSizes.sm : fontSizes.base,
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
      <div style={trackStyle}>
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          checked={actualChecked}
          disabled={disabled}
          name={name}
          onChange={handleChange}
          style={inputStyle}
        />
        <div style={thumbStyle} />
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

Switch.displayName = 'Switch';

export default Switch;
