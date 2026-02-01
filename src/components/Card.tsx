import React from 'react';
import { colors, componentSpacing, borderRadius, shadows } from '../../tokens';

export interface CardProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  size = 'md',
  interactive = false,
  children,
  onClick,
  className,
}) => {
  const padding = componentSpacing.card.padding[size];

  const baseStyle: React.CSSProperties = {
    padding,
    borderRadius: borderRadius.lg,
    transition: 'all 200ms ease',
    cursor: interactive ? 'pointer' : 'default',
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    elevated: {
      backgroundColor: colors.neutral[0],
      boxShadow: shadows.md,
      border: 'none',
    },
    outlined: {
      backgroundColor: colors.neutral[0],
      boxShadow: 'none',
      border: `1px solid ${colors.neutral[200]}`,
    },
    filled: {
      backgroundColor: colors.neutral[50],
      boxShadow: 'none',
      border: 'none',
    },
  };

  return (
    <div
      style={{ ...baseStyle, ...variantStyles[variant] }}
      onClick={onClick}
      className={className}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ marginBottom: componentSpacing.card.gap }}>{children}</div>
);

export const CardBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ marginTop: componentSpacing.card.gap, display: 'flex', gap: '8px' }}>
    {children}
  </div>
);

export default Card;
