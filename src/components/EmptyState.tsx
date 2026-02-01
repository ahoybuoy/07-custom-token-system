import React from 'react';
import { colors, spacing, fontSizes, fontWeights } from '../../tokens';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: { iconSize: '48px', titleSize: fontSizes.lg, descSize: fontSizes.sm, padding: spacing['6'] },
  md: { iconSize: '64px', titleSize: fontSizes.xl, descSize: fontSizes.base, padding: spacing['8'] },
  lg: { iconSize: '80px', titleSize: fontSizes['2xl'], descSize: fontSizes.lg, padding: spacing['12'] },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  size = 'md',
}) => {
  const sizeStyle = sizeStyles[size];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: sizeStyle.padding,
  };

  const iconStyle: React.CSSProperties = {
    width: sizeStyle.iconSize,
    height: sizeStyle.iconSize,
    marginBottom: spacing['4'],
    color: colors.neutral[400],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: sizeStyle.titleSize,
    fontWeight: fontWeights.semibold,
    color: colors.neutral[900],
    marginBottom: spacing['2'],
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: sizeStyle.descSize,
    color: colors.neutral[500],
    maxWidth: '400px',
    marginBottom: action ? spacing['6'] : 0,
  };

  return (
    <div style={containerStyle}>
      {icon ? (
        <div style={iconStyle}>{icon}</div>
      ) : (
        <DefaultEmptyIcon style={iconStyle} />
      )}
      <h3 style={titleStyle}>{title}</h3>
      {description && <p style={descriptionStyle}>{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

const DefaultEmptyIcon: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <svg style={style} viewBox="0 0 64 64" fill="none">
    <rect x="8" y="16" width="48" height="36" rx="4" stroke="currentColor" strokeWidth="2" />
    <path d="M8 28L32 40L56 28" stroke="currentColor" strokeWidth="2" />
    <circle cx="32" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

export default EmptyState;
