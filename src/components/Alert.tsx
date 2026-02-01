import React from 'react';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '../../tokens';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const variantStyles = {
  info: {
    background: colors.info.light,
    border: colors.info.base,
    text: colors.info.dark,
    icon: colors.info.base,
  },
  success: {
    background: colors.success.light,
    border: colors.success.base,
    text: colors.success.dark,
    icon: colors.success.base,
  },
  warning: {
    background: colors.warning.light,
    border: colors.warning.base,
    text: colors.warning.dark,
    icon: colors.warning.base,
  },
  error: {
    background: colors.error.light,
    border: colors.error.base,
    text: colors.error.dark,
    icon: colors.error.base,
  },
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  icon,
  action,
}) => {
  const styles = variantStyles[variant];

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing['3'],
    padding: spacing['4'],
    backgroundColor: styles.background,
    borderLeft: `4px solid ${styles.border}`,
    borderRadius: borderRadius.md,
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '20px',
    height: '20px',
    color: styles.icon,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['1'],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: styles.text,
  };

  const textStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: styles.text,
  };

  const closeButtonStyle: React.CSSProperties = {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: borderRadius.base,
    color: styles.text,
  };

  return (
    <div role="alert" style={containerStyle}>
      {icon && <span style={iconStyle}>{icon}</span>}
      {!icon && <DefaultIcon variant={variant} />}
      <div style={contentStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={textStyle}>{children}</div>
        {action && <div style={{ marginTop: spacing['2'] }}>{action}</div>}
      </div>
      {onClose && (
        <button style={closeButtonStyle} onClick={onClose} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
};

const DefaultIcon: React.FC<{ variant: string }> = ({ variant }) => {
  const color = variantStyles[variant as keyof typeof variantStyles].icon;

  if (variant === 'success') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" />
        <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === 'error') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" />
        <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === 'warning') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
        <path d="M10 3L18 17H2L10 3Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
        <path d="M10 8v4M10 14v1" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" />
      <path d="M10 6v5M10 13v1" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

export default Alert;
