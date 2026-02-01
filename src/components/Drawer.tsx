import React, { useEffect, useCallback } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions, fontWeights } from '../../tokens';
import { textStyles } from '../../tokens/typography';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const sizeMap = {
  xs: '256px',
  sm: '320px',
  md: '448px',
  lg: '576px',
  xl: '768px',
  full: '100%',
};

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  placement = 'right',
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

  const isHorizontal = placement === 'left' || placement === 'right';
  const drawerSize = sizeMap[size];

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: zIndex.overlay,
    opacity: isOpen ? 1 : 0,
    transition: `opacity ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const getDrawerPosition = (): React.CSSProperties => {
    const base: React.CSSProperties = {
      position: 'fixed',
      backgroundColor: colors.neutral[0],
      boxShadow: shadows['2xl'],
      zIndex: zIndex.modal,
      display: 'flex',
      flexDirection: 'column',
    };

    switch (placement) {
      case 'left':
        return { ...base, top: 0, left: 0, bottom: 0, width: drawerSize };
      case 'right':
        return { ...base, top: 0, right: 0, bottom: 0, width: drawerSize };
      case 'top':
        return { ...base, top: 0, left: 0, right: 0, height: drawerSize };
      case 'bottom':
        return { ...base, bottom: 0, left: 0, right: 0, height: drawerSize };
      default:
        return base;
    }
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing['4'],
    borderBottom: `1px solid ${colors.neutral[200]}`,
  };

  const titleStyle: React.CSSProperties = {
    ...textStyles.h5,
    margin: 0,
  };

  const bodyStyle: React.CSSProperties = {
    flex: 1,
    padding: spacing['4'],
    overflow: 'auto',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing['3'],
    padding: spacing['4'],
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
    <>
      <div
        style={overlayStyle}
        onClick={closeOnOverlayClick ? onClose : undefined}
      />
      <div style={getDrawerPosition()}>
        {title && (
          <div style={headerStyle}>
            <h2 style={titleStyle}>{title}</h2>
            <button style={closeButtonStyle} onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
        <div style={bodyStyle}>{children}</div>
        {footer && <div style={footerStyle}>{footer}</div>}
      </div>
    </>
  );
};

export default Drawer;
