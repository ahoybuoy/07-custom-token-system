import React from 'react';
import { colors, componentSpacing, borderRadius, shadows, transitions } from '../../tokens';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const variantStyles = {
  primary: {
    background: colors.primary[500],
    color: colors.neutral[0],
    border: 'none',
    hoverBackground: colors.primary[600],
    activeBackground: colors.primary[700],
  },
  secondary: {
    background: colors.secondary[500],
    color: colors.neutral[0],
    border: 'none',
    hoverBackground: colors.secondary[600],
    activeBackground: colors.secondary[700],
  },
  outline: {
    background: 'transparent',
    color: colors.primary[600],
    border: `1px solid ${colors.primary[500]}`,
    hoverBackground: colors.primary[50],
    activeBackground: colors.primary[100],
  },
  ghost: {
    background: 'transparent',
    color: colors.neutral[700],
    border: 'none',
    hoverBackground: colors.neutral[100],
    activeBackground: colors.neutral[200],
  },
  danger: {
    background: colors.error.base,
    color: colors.neutral[0],
    border: 'none',
    hoverBackground: colors.error.dark,
    activeBackground: colors.error.dark,
  },
};

const sizeStyles = {
  sm: {
    paddingX: componentSpacing.button.paddingX.sm,
    paddingY: componentSpacing.button.paddingY.sm,
    fontSize: '0.875rem',
  },
  md: {
    paddingX: componentSpacing.button.paddingX.md,
    paddingY: componentSpacing.button.paddingY.md,
    fontSize: '1rem',
  },
  lg: {
    paddingX: componentSpacing.button.paddingX.lg,
    paddingY: componentSpacing.button.paddingY.lg,
    fontSize: '1.125rem',
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  children,
  onClick,
  type = 'button',
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: componentSpacing.button.gap,
    padding: `${sizeStyle.paddingY} ${sizeStyle.paddingX}`,
    fontSize: sizeStyle.fontSize,
    fontWeight: 500,
    lineHeight: 1.5,
    borderRadius: borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    width: fullWidth ? '100%' : 'auto',
    backgroundColor: variantStyle.background,
    color: variantStyle.color,
    border: variantStyle.border,
    boxShadow: variant === 'primary' ? shadows.sm : 'none',
  };

  return (
    <button
      type={type}
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <LoadingSpinner />}
      {!loading && leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

const LoadingSpinner: React.FC = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ animation: 'spin 1s linear infinite' }}
  >
    <circle
      cx="8"
      cy="8"
      r="6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="32"
      strokeDashoffset="12"
    />
  </svg>
);

export default Button;
