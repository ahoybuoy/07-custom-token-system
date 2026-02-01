import React, { useEffect, useCallback } from 'react';
import { colors, componentSpacing, borderRadius, shadows, zIndex, transitions } from '../../tokens';
import { textStyles } from '../../tokens/typography';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeStyles = {
  sm: { width: '400px', maxWidth: '90vw' },
  md: { width: '560px', maxWidth: '90vw' },
  lg: { width: '720px', maxWidth: '90vw' },
  xl: { width: '960px', maxWidth: '90vw' },
  full: { width: '100vw', height: '100vh', maxWidth: '100vw' },
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  children,
  footer,
}) => {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      onClose();
    }
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: zIndex.overlay,
    animation: `fadeIn ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const modalStyle: React.CSSProperties = {
    ...sizeStyles[size],
    backgroundColor: colors.neutral[0],
    borderRadius: size === 'full' ? 0 : borderRadius.xl,
    boxShadow: shadows['2xl'],
    zIndex: zIndex.modal,
    display: 'flex',
    flexDirection: 'column',
    maxHeight: size === 'full' ? '100vh' : '90vh',
    animation: `slideUp ${transitions.duration.normal} ${transitions.timing.easeOut}`,
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: componentSpacing.modal.padding,
    borderBottom: `1px solid ${colors.neutral[200]}`,
  };

  const titleStyle: React.CSSProperties = {
    ...textStyles.h4,
    margin: 0,
  };

  const bodyStyle: React.CSSProperties = {
    padding: componentSpacing.modal.padding,
    flex: 1,
    overflow: 'auto',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: componentSpacing.modal.gap,
    padding: componentSpacing.modal.padding,
    borderTop: `1px solid ${colors.neutral[200]}`,
  };

  const closeButtonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    borderRadius: borderRadius.md,
    color: colors.neutral[500],
  };

  return (
    <div
      style={overlayStyle}
      onClick={closeOnOverlayClick ? onClose : undefined}
    >
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button style={closeButtonStyle} onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        )}
        <div style={bodyStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </div>
  );
};

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M15 5L5 15M5 5l10 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default Modal;
