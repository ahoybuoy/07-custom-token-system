import React from 'react';
import { colors, spacing, borderRadius, fontSizes, fontWeights, transitions } from '../../tokens';

export interface TagProps {
  label: string;
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRemove?: () => void;
  onClick?: () => void;
}

const colorMap = {
  primary: { base: colors.primary[500], light: colors.primary[100], dark: colors.primary[700] },
  secondary: { base: colors.secondary[500], light: colors.secondary[100], dark: colors.secondary[700] },
  success: { base: colors.success.base, light: colors.success.light, dark: colors.success.dark },
  warning: { base: colors.warning.base, light: colors.warning.light, dark: colors.warning.dark },
  error: { base: colors.error.base, light: colors.error.light, dark: colors.error.dark },
  info: { base: colors.info.base, light: colors.info.light, dark: colors.info.dark },
  neutral: { base: colors.neutral[500], light: colors.neutral[100], dark: colors.neutral[700] },
};

const sizeStyles = {
  sm: { padding: `${spacing['0.5']} ${spacing['2']}`, fontSize: fontSizes.xs, iconSize: '12px' },
  md: { padding: `${spacing['1']} ${spacing['2.5']}`, fontSize: fontSizes.sm, iconSize: '14px' },
  lg: { padding: `${spacing['1.5']} ${spacing['3']}`, fontSize: fontSizes.base, iconSize: '16px' },
};

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'subtle',
  color = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  onRemove,
  onClick,
}) => {
  const colorStyle = colorMap[color];
  const sizeStyle = sizeStyles[size];

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'solid':
        return {
          backgroundColor: colorStyle.base,
          color: colors.neutral[0],
          border: 'none',
        };
      case 'subtle':
        return {
          backgroundColor: colorStyle.light,
          color: colorStyle.dark,
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: colorStyle.base,
          border: `1px solid ${colorStyle.base}`,
        };
      default:
        return {};
    }
  };

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: spacing['1'],
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
    lineHeight: 1,
    borderRadius: borderRadius.md,
    cursor: onClick ? 'pointer' : 'default',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    ...getVariantStyles(),
  };

  const iconStyle: React.CSSProperties = {
    width: sizeStyle.iconSize,
    height: sizeStyle.iconSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const removeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: sizeStyle.iconSize,
    height: sizeStyle.iconSize,
    padding: 0,
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: 'inherit',
    opacity: 0.7,
    marginLeft: spacing['1'],
  };

  const Component = onClick ? 'button' : 'span';

  return (
    <Component
      style={style}
      onClick={onClick}
      type={onClick ? 'button' : undefined}
    >
      {leftIcon && <span style={iconStyle}>{leftIcon}</span>}
      {label}
      {rightIcon && <span style={iconStyle}>{rightIcon}</span>}
      {onRemove && (
        <button
          type="button"
          style={removeButtonStyle}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove"
        >
          <svg width={sizeStyle.iconSize} height={sizeStyle.iconSize} viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </Component>
  );
};

export default Tag;
