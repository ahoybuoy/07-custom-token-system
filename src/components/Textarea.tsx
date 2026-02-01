import React, { forwardRef } from 'react';
import { colors, spacing, borderRadius, transitions, fontFamilies, fontSizes, fontWeights } from '../../tokens';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  error?: boolean;
  errorMessage?: string;
  label?: string;
  helperText?: string;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  error = false,
  errorMessage,
  label,
  helperText,
  resize = 'vertical',
  fullWidth = false,
  disabled,
  rows = 4,
  ...props
}, ref) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['1'],
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.neutral[700],
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: spacing['3'],
    fontFamily: fontFamilies.sans,
    fontSize: fontSizes.base,
    lineHeight: 1.5,
    color: colors.neutral[900],
    backgroundColor: disabled ? colors.neutral[100] : colors.neutral[0],
    border: `1px solid ${error ? colors.error.base : colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    outline: 'none',
    resize,
    transition: `border-color ${transitions.duration.fast} ${transitions.timing.ease}`,
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const helperStyle: React.CSSProperties = {
    fontSize: fontSizes.xs,
    color: error ? colors.error.base : colors.neutral[500],
  };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <textarea
        ref={ref}
        disabled={disabled}
        rows={rows}
        style={textareaStyle}
        {...props}
      />
      {(helperText || errorMessage) && (
        <span style={helperStyle}>{error ? errorMessage : helperText}</span>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
