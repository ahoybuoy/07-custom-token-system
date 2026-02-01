import React from 'react';
import { colors, borderRadius, shadows, transitions } from '../../tokens';

export interface IconButtonProps {
  icon: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'secondary' | 'neutral' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isRound?: boolean;
  disabled?: boolean;
  loading?: boolean;
  'aria-label': string;
  onClick?: () => void;
}

const sizeMap = {
  xs: { size: '24px', iconSize: '12px' },
  sm: { size: '32px', iconSize: '16px' },
  md: { size: '40px', iconSize: '20px' },
  lg: { size: '48px', iconSize: '24px' },
};

const colorMap = {
  primary: { base: colors.primary[500], hover: colors.primary[600], light: colors.primary[50] },
  secondary: { base: colors.secondary[500], hover: colors.secondary[600], light: colors.secondary[50] },
  neutral: { base: colors.neutral[600], hover: colors.neutral[700], light: colors.neutral[100] },
  danger: { base: colors.error.base, hover: colors.error.dark, light: colors.error.light },
};

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  isRound = false,
  disabled = false,
  loading = false,
  'aria-label': ariaLabel,
  onClick,
}) => {
  const sizeStyle = sizeMap[size];
  const colorStyle = colorMap[color];

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colorStyle.base,
          color: colors.neutral[0],
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colorStyle.base,
          border: `1px solid ${colorStyle.base}`,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: colorStyle.base,
          border: 'none',
        };
      default:
        return {};
    }
  };

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyle.size,
    height: sizeStyle.size,
    borderRadius: isRound ? borderRadius.full : borderRadius.md,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    boxShadow: variant === 'solid' ? shadows.sm : 'none',
    padding: 0,
    ...getVariantStyles(),
  };

  const iconStyle: React.CSSProperties = {
    width: sizeStyle.iconSize,
    height: sizeStyle.iconSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <button
      type="button"
      style={style}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {loading ? (
        <svg
          width={sizeStyle.iconSize}
          height={sizeStyle.iconSize}
          viewBox="0 0 24 24"
          fill="none"
          style={{ animation: 'spin 1s linear infinite' }}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeDasharray="32" strokeDashoffset="12" />
        </svg>
      ) : (
        <span style={iconStyle}>{icon}</span>
      )}
    </button>
  );
};

export default IconButton;
