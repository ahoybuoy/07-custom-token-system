import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions } from '../../tokens';

export interface PopoverProps {
  trigger: React.ReactElement;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  triggerOn?: 'click' | 'hover';
  closeOnBlur?: boolean;
  children?: never;
}

export const Popover: React.FC<PopoverProps> = ({
  trigger,
  content,
  placement = 'bottom',
  triggerOn = 'click',
  closeOnBlur = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (closeOnBlur && triggerOn === 'click') {
      const handleClickOutside = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [closeOnBlur, triggerOn]);

  const handleMouseEnter = () => {
    if (triggerOn === 'hover') {
      clearTimeout(timeoutRef.current);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOn === 'hover') {
      timeoutRef.current = setTimeout(() => setIsOpen(false), 150);
    }
  };

  const getPlacementStyles = (): React.CSSProperties => {
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
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const popoverStyle: React.CSSProperties = {
    position: 'absolute',
    minWidth: '200px',
    padding: spacing['4'],
    backgroundColor: colors.neutral[0],
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.lg,
    zIndex: zIndex.popover,
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen
      ? getPlacementStyles().transform
      : `${getPlacementStyles().transform || ''} scale(0.95)`.trim(),
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    ...getPlacementStyles(),
  };

  return (
    <div
      ref={containerRef}
      style={containerStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {React.cloneElement(trigger, {
        onClick: triggerOn === 'click' ? () => setIsOpen(!isOpen) : undefined,
      })}
      <div style={popoverStyle}>
        {content}
      </div>
    </div>
  );
};

export default Popover;
