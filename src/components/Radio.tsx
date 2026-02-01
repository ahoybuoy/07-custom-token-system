import React, { createContext, useContext, forwardRef } from 'react';
import { colors, spacing, transitions, fontSizes, fontWeights } from '../../tokens';

interface RadioGroupContextValue {
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  size: 'sm' | 'md' | 'lg';
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  defaultValue = '',
  onChange,
  disabled = false,
  size = 'md',
  children,
  direction = 'vertical',
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const actualValue = value ?? internalValue;

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    gap: spacing['3'],
  };

  return (
    <RadioGroupContext.Provider value={{ name, value: actualValue, onChange: handleChange, disabled, size }}>
      <div role="radiogroup" style={style}>{children}</div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
}

const sizeStyles = {
  sm: { radio: '16px', dot: '6px', fontSize: fontSizes.sm },
  md: { radio: '20px', dot: '8px', fontSize: fontSizes.base },
  lg: { radio: '24px', dot: '10px', fontSize: fontSizes.lg },
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(({
  value,
  label,
  description,
  disabled: radioDisabled,
}, ref) => {
  const context = useContext(RadioGroupContext);
  if (!context) throw new Error('Radio must be used within RadioGroup');

  const isDisabled = radioDisabled ?? context.disabled;
  const isChecked = context.value === value;
  const sizeStyle = sizeStyles[context.size];

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'flex-start',
    gap: spacing['3'],
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
  };

  const radioStyle: React.CSSProperties = {
    position: 'relative',
    width: sizeStyle.radio,
    height: sizeStyle.radio,
    flexShrink: 0,
  };

  const inputStyle: React.CSSProperties = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    margin: 0,
  };

  const circleStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: `2px solid ${isChecked ? colors.primary[500] : colors.neutral[300]}`,
    backgroundColor: colors.neutral[0],
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const dotStyle: React.CSSProperties = {
    width: sizeStyle.dot,
    height: sizeStyle.dot,
    borderRadius: '50%',
    backgroundColor: colors.primary[500],
    transform: isChecked ? 'scale(1)' : 'scale(0)',
    transition: `transform ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: sizeStyle.fontSize,
    fontWeight: fontWeights.medium,
    color: colors.neutral[900],
    lineHeight: 1.4,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
    lineHeight: 1.4,
  };

  return (
    <label style={containerStyle}>
      <div style={radioStyle}>
        <input
          ref={ref}
          type="radio"
          name={context.name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => !isDisabled && context.onChange(value)}
          style={inputStyle}
        />
        <div style={circleStyle}>
          <div style={dotStyle} />
        </div>
      </div>
      {(label || description) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing['0.5'] }}>
          {label && <span style={labelStyle}>{label}</span>}
          {description && <span style={descriptionStyle}>{description}</span>}
        </div>
      )}
    </label>
  );
});

Radio.displayName = 'Radio';

export default Radio;
