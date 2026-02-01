import React, { useState, useRef, useCallback } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes } from '../../tokens';

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  disabled?: boolean;
  showValue?: boolean;
  showMarks?: boolean;
  marks?: { value: number; label?: string }[];
  color?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
}

const sizeStyles = {
  sm: { track: '4px', thumb: '12px' },
  md: { track: '6px', thumb: '16px' },
  lg: { track: '8px', thumb: '20px' },
};

export const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 0,
  disabled = false,
  showValue = false,
  showMarks = false,
  marks,
  color = 'primary',
  size = 'md',
  onChange,
  onChangeEnd,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const actualValue = value ?? internalValue;
  const percentage = ((actualValue - min) / (max - min)) * 100;
  const sizeStyle = sizeStyles[size];
  const trackColor = color === 'primary' ? colors.primary[500] : colors.secondary[500];

  const updateValue = useCallback((clientX: number) => {
    if (!trackRef.current || disabled) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percent * (max - min);
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));

    setInternalValue(clampedValue);
    onChange?.(clampedValue);
  }, [min, max, step, disabled, onChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    updateValue(e.clientX);

    const handleMouseMove = (e: MouseEvent) => updateValue(e.clientX);
    const handleMouseUp = () => {
      setIsDragging(false);
      onChangeEnd?.(actualValue);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    padding: `${spacing['2']} 0`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  };

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: sizeStyle.track,
    backgroundColor: colors.neutral[200],
    borderRadius: borderRadius.full,
  };

  const filledTrackStyle: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: `${percentage}%`,
    backgroundColor: trackColor,
    borderRadius: borderRadius.full,
    transition: isDragging ? 'none' : `width ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${percentage}%`,
    transform: 'translate(-50%, -50%)',
    width: sizeStyle.thumb,
    height: sizeStyle.thumb,
    backgroundColor: colors.neutral[0],
    border: `2px solid ${trackColor}`,
    borderRadius: borderRadius.full,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: isDragging ? 'none' : `left ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const valueStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
    marginTop: spacing['2'],
    textAlign: 'center',
  };

  const marksContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    marginTop: spacing['2'],
  };

  return (
    <div style={containerStyle}>
      <div
        ref={trackRef}
        style={trackStyle}
        onMouseDown={handleMouseDown}
      >
        <div style={filledTrackStyle} />
        <div style={thumbStyle} />
      </div>
      {showMarks && marks && (
        <div style={marksContainerStyle}>
          {marks.map((mark, index) => {
            const markPercent = ((mark.value - min) / (max - min)) * 100;
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${markPercent}%`,
                  transform: 'translateX(-50%)',
                  fontSize: fontSizes.xs,
                  color: colors.neutral[500],
                }}
              >
                {mark.label ?? mark.value}
              </div>
            );
          })}
        </div>
      )}
      {showValue && <div style={valueStyle}>{actualValue}</div>}
    </div>
  );
};

export default Slider;
