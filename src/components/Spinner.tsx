import React from 'react';
import { colors } from '../../tokens';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  thickness?: number;
  speed?: 'slow' | 'normal' | 'fast';
  label?: string;
}

const sizeMap = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

const colorMap = {
  primary: colors.primary[500],
  secondary: colors.secondary[500],
  white: colors.neutral[0],
  current: 'currentColor',
};

const speedMap = {
  slow: '1s',
  normal: '0.75s',
  fast: '0.5s',
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  thickness = 2,
  speed = 'normal',
  label = 'Loading...',
}) => {
  const dimension = sizeMap[size];
  const strokeColor = colorMap[color];
  const duration = speedMap[speed];

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle} role="status" aria-label={label}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 24 24"
        fill="none"
        style={{
          animation: `spin ${duration} linear infinite`,
        }}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={colors.neutral[200]}
          strokeWidth={thickness}
          fill="none"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={strokeColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray="32"
          strokeDashoffset="12"
          fill="none"
        />
      </svg>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
