import React from 'react';
import { colors, borderRadius, transitions } from '../../tokens';

export interface ProgressProps {
  value: number;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  labelPosition?: 'top' | 'right' | 'inside';
  animated?: boolean;
  striped?: boolean;
}

const sizeMap = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
};

const colorMap = {
  primary: colors.primary[500],
  secondary: colors.secondary[500],
  success: colors.success.base,
  warning: colors.warning.base,
  error: colors.error.base,
};

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'primary',
  showLabel = false,
  labelPosition = 'right',
  animated = false,
  striped = false,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const height = sizeMap[size];
  const barColor = colorMap[color];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexDirection: labelPosition === 'top' ? 'column' : 'row',
  };

  const trackStyle: React.CSSProperties = {
    flex: 1,
    width: '100%',
    height,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  };

  const barStyle: React.CSSProperties = {
    width: `${percentage}%`,
    height: '100%',
    backgroundColor: barColor,
    borderRadius: borderRadius.full,
    transition: `width ${transitions.duration.slow} ${transitions.timing.easeOut}`,
    backgroundImage: striped
      ? 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)'
      : 'none',
    backgroundSize: striped ? '1rem 1rem' : 'auto',
    animation: animated && striped ? 'progress-stripe 1s linear infinite' : 'none',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: size === 'xs' || size === 'sm' ? '10px' : '12px',
    fontWeight: 500,
    color: labelPosition === 'inside' ? colors.neutral[0] : colors.neutral[600],
    whiteSpace: 'nowrap',
  };

  return (
    <div style={containerStyle}>
      {labelPosition === 'top' && showLabel && (
        <span style={labelStyle}>{Math.round(percentage)}%</span>
      )}
      <div style={trackStyle}>
        <div style={barStyle}>
          {labelPosition === 'inside' && showLabel && percentage > 10 && (
            <span style={labelStyle}>{Math.round(percentage)}%</span>
          )}
        </div>
      </div>
      {labelPosition === 'right' && showLabel && (
        <span style={labelStyle}>{Math.round(percentage)}%</span>
      )}
      {(animated && striped) && (
        <style>{`
          @keyframes progress-stripe {
            from { background-position: 1rem 0; }
            to { background-position: 0 0; }
          }
        `}</style>
      )}
    </div>
  );
};

export default Progress;
