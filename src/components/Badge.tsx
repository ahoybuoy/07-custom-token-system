import React from 'react';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '../../tokens';

export interface BadgeProps {
  variant?: 'solid' | 'subtle' | 'outline';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
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
  sm: { padding: `${spacing['0.5']} ${spacing['2']}`, fontSize: fontSizes.xs },
  md: { padding: `${spacing['1']} ${spacing['2.5']}`, fontSize: fontSizes.sm },
  lg: { padding: `${spacing['1.5']} ${spacing['3']}`, fontSize: fontSizes.base },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'subtle',
  color = 'primary',
  size = 'md',
  children,
}) => {
  const colorStyle = colorMap[color];
  const sizeStyle = sizeStyles[size];

  const variantStyles: Record<string, React.CSSProperties> = {
    solid: {
      backgroundColor: colorStyle.base,
      color: colors.neutral[0],
      border: 'none',
    },
    subtle: {
      backgroundColor: colorStyle.light,
      color: colorStyle.dark,
      border: 'none',
    },
    outline: {
      backgroundColor: 'transparent',
      color: colorStyle.base,
      border: `1px solid ${colorStyle.base}`,
    },
  };

  const style: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: sizeStyle.padding,
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
    lineHeight: 1,
    borderRadius: borderRadius.full,
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
  };

  return <span style={style}>{children}</span>;
};

export default Badge;
