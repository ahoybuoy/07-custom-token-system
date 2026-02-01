import React, { useState, useRef } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions, fontSizes } from '../../tokens';

export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  children: React.ReactElement;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  delay = 200,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    padding: `${spacing['1.5']} ${spacing['3']}`,
    backgroundColor: colors.neutral[800],
    color: colors.neutral[0],
    fontSize: fontSizes.sm,
    borderRadius: borderRadius.md,
    boxShadow: shadows.lg,
    zIndex: zIndex.tooltip,
    whiteSpace: 'nowrap',
    opacity: isVisible ? 1 : 0,
    visibility: isVisible ? 'visible' : 'hidden',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    pointerEvents: 'none',
    ...getPlacementStyles(placement),
  };

  const arrowStyle: React.CSSProperties = {
    position: 'absolute',
    width: '8px',
    height: '8px',
    backgroundColor: colors.neutral[800],
    transform: 'rotate(45deg)',
    ...getArrowStyles(placement),
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <div style={tooltipStyle}>
        <div style={arrowStyle} />
        {content}
      </div>
    </div>
  );
};

function getPlacementStyles(placement: string): React.CSSProperties {
  const offset = '8px';
  switch (placement) {
    case 'top':
      return { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: offset };
    case 'bottom':
      return { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: offset };
    case 'left':
      return { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: offset };
    case 'right':
      return { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: offset };
    default:
      return {};
  }
}

function getArrowStyles(placement: string): React.CSSProperties {
  switch (placement) {
    case 'top':
      return { bottom: '-4px', left: '50%', marginLeft: '-4px' };
    case 'bottom':
      return { top: '-4px', left: '50%', marginLeft: '-4px' };
    case 'left':
      return { right: '-4px', top: '50%', marginTop: '-4px' };
    case 'right':
      return { left: '-4px', top: '50%', marginTop: '-4px' };
    default:
      return {};
  }
}

export default Tooltip;
