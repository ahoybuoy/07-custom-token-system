import React, { useState, useRef, useEffect } from 'react';
import { colors, spacing, borderRadius, shadows, zIndex, transitions, fontSizes, fontWeights } from '../../tokens';

export interface MenuItemProps {
  icon?: React.ReactNode;
  label: string;
  shortcut?: string;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface MenuProps {
  trigger: React.ReactElement;
  items: MenuItemProps[];
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
}

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  placement = 'bottom-start',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPlacementStyles = (): React.CSSProperties => {
    switch (placement) {
      case 'bottom-start':
        return { top: '100%', left: 0, marginTop: spacing['1'] };
      case 'bottom-end':
        return { top: '100%', right: 0, marginTop: spacing['1'] };
      case 'top-start':
        return { bottom: '100%', left: 0, marginBottom: spacing['1'] };
      case 'top-end':
        return { bottom: '100%', right: 0, marginBottom: spacing['1'] };
      default:
        return {};
    }
  };

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const menuStyle: React.CSSProperties = {
    position: 'absolute',
    minWidth: '180px',
    backgroundColor: colors.neutral[0],
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.lg,
    zIndex: zIndex.dropdown,
    padding: spacing['1'],
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? 'visible' : 'hidden',
    transform: isOpen ? 'scale(1)' : 'scale(0.95)',
    transformOrigin: placement.includes('bottom') ? 'top' : 'bottom',
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    ...getPlacementStyles(),
  };

  const itemStyle = (item: MenuItemProps): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: spacing['2'],
    width: '100%',
    padding: `${spacing['2']} ${spacing['3']}`,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.normal,
    color: item.danger ? colors.error.base : item.disabled ? colors.neutral[400] : colors.neutral[700],
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: borderRadius.md,
    cursor: item.disabled ? 'not-allowed' : 'pointer',
    textAlign: 'left',
    transition: `background-color ${transitions.duration.fast} ${transitions.timing.ease}`,
  });

  const shortcutStyle: React.CSSProperties = {
    marginLeft: 'auto',
    fontSize: fontSizes.xs,
    color: colors.neutral[400],
  };

  return (
    <div ref={containerRef} style={containerStyle}>
      {React.cloneElement(trigger, { onClick: () => setIsOpen(!isOpen) })}
      <div style={menuStyle} role="menu">
        {items.map((item, index) => (
          <button
            key={index}
            role="menuitem"
            style={itemStyle(item)}
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.();
                setIsOpen(false);
              }
            }}
          >
            {item.icon && <span style={{ width: '16px', height: '16px' }}>{item.icon}</span>}
            <span>{item.label}</span>
            {item.shortcut && <span style={shortcutStyle}>{item.shortcut}</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

export const MenuDivider: React.FC = () => (
  <div
    style={{
      height: '1px',
      backgroundColor: colors.neutral[200],
      margin: `${spacing['1']} 0`,
    }}
  />
);

export default Menu;
