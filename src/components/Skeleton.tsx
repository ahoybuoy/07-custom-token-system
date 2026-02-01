import React from 'react';
import { colors, borderRadius } from '../../tokens';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'circular':
        return {
          borderRadius: '50%',
          width: width || '40px',
          height: height || '40px',
        };
      case 'rectangular':
        return {
          borderRadius: 0,
          width: width || '100%',
          height: height || '100px',
        };
      case 'rounded':
        return {
          borderRadius: borderRadius.md,
          width: width || '100%',
          height: height || '100px',
        };
      case 'text':
      default:
        return {
          borderRadius: borderRadius.base,
          width: width || '100%',
          height: height || '1em',
        };
    }
  };

  const baseStyle: React.CSSProperties = {
    backgroundColor: colors.neutral[200],
    display: 'block',
    ...getVariantStyles(),
  };

  const animationStyle = animation === 'pulse'
    ? { animation: 'skeleton-pulse 1.5s ease-in-out infinite' }
    : animation === 'wave'
    ? { animation: 'skeleton-wave 1.6s linear infinite', backgroundImage: `linear-gradient(90deg, ${colors.neutral[200]} 0%, ${colors.neutral[100]} 50%, ${colors.neutral[200]} 100%)`, backgroundSize: '200% 100%' }
    : {};

  return (
    <>
      <span style={{ ...baseStyle, ...animationStyle }} />
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes skeleton-wave {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </>
  );
};

export const SkeletonText: React.FC<{ lines?: number; width?: string }> = ({
  lines = 3,
  width = '100%',
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width }}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        variant="text"
        width={i === lines - 1 ? '80%' : '100%'}
        height="16px"
      />
    ))}
  </div>
);

export const SkeletonCard: React.FC = () => (
  <div style={{ padding: '16px', border: `1px solid ${colors.neutral[200]}`, borderRadius: borderRadius.lg }}>
    <Skeleton variant="rounded" height="120px" />
    <div style={{ marginTop: '16px' }}>
      <Skeleton variant="text" width="60%" height="24px" />
      <div style={{ marginTop: '8px' }}>
        <SkeletonText lines={2} />
      </div>
    </div>
  </div>
);

export default Skeleton;
