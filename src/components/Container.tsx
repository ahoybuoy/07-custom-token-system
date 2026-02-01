import React from 'react';
import { spacing, breakpoints } from '../../tokens';

export interface ContainerProps {
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  padding?: keyof typeof spacing;
  children: React.ReactNode;
}

const maxWidthMap = {
  sm: breakpoints.sm,
  md: breakpoints.md,
  lg: breakpoints.lg,
  xl: breakpoints.xl,
  '2xl': breakpoints['2xl'],
  full: '100%',
};

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 'xl',
  centered = true,
  padding = '4',
  children,
}) => {
  const style: React.CSSProperties = {
    width: '100%',
    maxWidth: maxWidthMap[maxWidth],
    marginLeft: centered ? 'auto' : undefined,
    marginRight: centered ? 'auto' : undefined,
    paddingLeft: spacing[padding],
    paddingRight: spacing[padding],
  };

  return <div style={style}>{children}</div>;
};

export default Container;
