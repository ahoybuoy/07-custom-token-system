import React, { forwardRef } from 'react';
import { colors, componentSpacing, borderRadius, transitions, fontFamilies, fontSizes } from '../../tokens';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const sizeStyles = {
  sm: {
    height: '32px',
    fontSize: fontSizes.sm,
    iconSize: '14px',
  },
  md: {
    height: '40px',
    fontSize: fontSizes.base,
    iconSize: '16px',
  },
  lg: {
    height: '48px',
    fontSize: fontSizes.lg,
    iconSize: '20px',
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  error = false,
  errorMessage,
  label,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const sizeStyle = sizeStyles[size];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: 500,
    color: colors.neutral[700],
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: sizeStyle.height,
    padding: `0 ${componentSpacing.input.paddingX}`,
    paddingLeft: leftIcon ? '40px' : componentSpacing.input.paddingX,
    paddingRight: rightIcon ? '40px' : componentSpacing.input.paddingX,
    fontFamily: fontFamilies.sans,
    fontSize: sizeStyle.fontSize,
    color: colors.neutral[900],
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral[0],
    border: `1px solid ${error ? colors.error.base : colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    outline: 'none',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const iconStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyle.iconSize,
    height: sizeStyle.iconSize,
    color: colors.neutral[400],
  };

  const helperStyle: React.CSSProperties = {
    fontSize: fontSizes.xs,
    color: error ? colors.error.base : colors.neutral[500],
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <div style={inputWrapperStyle}>
        {leftIcon && (
          <span style={{ ...iconStyle, left: '12px' }}>{leftIcon}</span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          style={inputStyle}
          {...props}
        />
        {rightIcon && (
          <span style={{ ...iconStyle, right: '12px' }}>{rightIcon}</span>
        )}
      </div>
      {(helperText || errorMessage) && (
        <span style={helperStyle}>{error ? errorMessage : helperText}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
