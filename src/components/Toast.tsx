import React, { useEffect, useState } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions, fontSizes, fontWeights } from '../../tokens';

export interface ToastProps {
  id: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const variantStyles = {
  info: { accent: colors.info.base, icon: 'info' },
  success: { accent: colors.success.base, icon: 'check' },
  warning: { accent: colors.warning.base, icon: 'warning' },
  error: { accent: colors.error.base, icon: 'error' },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  variant = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  action,
}) => {
  const [isExiting, setIsExiting] = useState(false);
  const styles = variantStyles[variant];

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => onClose(id), 200);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 200);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: spacing['3'],
    padding: spacing['4'],
    backgroundColor: colors.neutral[0],
    borderRadius: borderRadius.lg,
    boxShadow: shadows.lg,
    borderLeft: `4px solid ${styles.accent}`,
    minWidth: '320px',
    maxWidth: '420px',
    opacity: isExiting ? 0 : 1,
    transform: isExiting ? 'translateX(100%)' : 'translateX(0)',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '20px',
    height: '20px',
    color: styles.accent,
  };

  const contentStyle: React.CSSProperties = {
    flex: 1,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.neutral[900],
    marginBottom: spacing['0.5'],
  };

  const messageStyle: React.CSSProperties = {
    fontSize: fontSizes.sm,
    color: colors.neutral[600],
  };

  const actionStyle: React.CSSProperties = {
    marginTop: spacing['2'],
    padding: 0,
    border: 'none',
    background: 'none',
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: styles.accent,
    cursor: 'pointer',
  };

  const closeStyle: React.CSSProperties = {
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
    color: colors.neutral[400],
  };

  return (
    <div style={containerStyle} role="alert">
      <span style={iconStyle}>
        <ToastIcon variant={variant} />
      </span>
      <div style={contentStyle}>
        {title && <div style={titleStyle}>{title}</div>}
        <div style={messageStyle}>{message}</div>
        {action && (
          <button style={actionStyle} onClick={action.onClick}>
            {action.label}
          </button>
        )}
      </div>
      <button style={closeStyle} onClick={handleClose} aria-label="Close">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

const ToastIcon: React.FC<{ variant: string }> = ({ variant }) => {
  const color = variantStyles[variant as keyof typeof variantStyles].accent;

  const icons: Record<string, JSX.Element> = {
    info: <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" />,
    success: (
      <>
        <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" />
        <path d="M6 10l3 3 5-5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
    warning: <path d="M10 3L18 17H2L10 3Z" stroke={color} strokeWidth="2" />,
    error: (
      <>
        <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="2" />
        <path d="M7 7l6 6M13 7l-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  };

  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none">{icons[variant]}</svg>;
};

export const ToastContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const style: React.CSSProperties = {
    position: 'fixed',
    top: spacing['4'],
    right: spacing['4'],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing['3'],
    zIndex: zIndex.toast,
  };

  return <div style={style}>{children}</div>;
};

export default Toast;
