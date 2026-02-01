import React, { useState, createContext, useContext } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  variant: 'line' | 'enclosed' | 'soft-rounded';
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  defaultTab?: string;
  variant?: 'line' | 'enclosed' | 'soft-rounded';
  children: React.ReactNode;
  onChange?: (tabId: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultTab = '',
  variant = 'line',
  children,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleTabChange, variant }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  children: React.ReactNode;
}

export const TabList: React.FC<TabListProps> = ({ children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabList must be used within Tabs');

  const listStyle: React.CSSProperties = {
    display: 'flex',
    gap: context.variant === 'line' ? spacing['4'] : spacing['1'],
    borderBottom: context.variant === 'line' ? `1px solid ${colors.neutral[200]}` : 'none',
    backgroundColor: context.variant === 'enclosed' ? colors.neutral[100] : 'transparent',
    padding: context.variant === 'enclosed' ? spacing['1'] : 0,
    borderRadius: context.variant === 'enclosed' ? borderRadius.lg : 0,
  };

  return <div style={listStyle} role="tablist">{children}</div>;
};

export interface TabProps {
  id: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Tab: React.FC<TabProps> = ({ id, disabled = false, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const isActive = context.activeTab === id;

  const getTabStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: `${spacing['2']} ${spacing['4']}`,
      fontSize: fontSizes.sm,
      fontWeight: isActive ? fontWeights.medium : fontWeights.normal,
      color: isActive ? colors.primary[600] : colors.neutral[600],
      backgroundColor: 'transparent',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
    };

    switch (context.variant) {
      case 'line':
        return {
          ...baseStyle,
          borderBottom: isActive ? `2px solid ${colors.primary[500]}` : '2px solid transparent',
          marginBottom: '-1px',
        };
      case 'enclosed':
        return {
          ...baseStyle,
          backgroundColor: isActive ? colors.neutral[0] : 'transparent',
          borderRadius: borderRadius.md,
          boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
        };
      case 'soft-rounded':
        return {
          ...baseStyle,
          backgroundColor: isActive ? colors.primary[100] : 'transparent',
          color: isActive ? colors.primary[700] : colors.neutral[600],
          borderRadius: borderRadius.full,
        };
      default:
        return baseStyle;
    }
  };

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      style={getTabStyle()}
      onClick={() => !disabled && context.setActiveTab(id)}
    >
      {children}
    </button>
  );
};

export interface TabPanelProps {
  id: string;
  children: React.ReactNode;
}

export const TabPanel: React.FC<TabPanelProps> = ({ id, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  if (context.activeTab !== id) return null;

  return (
    <div
      role="tabpanel"
      style={{ padding: `${spacing['4']} 0` }}
    >
      {children}
    </div>
  );
};

export default Tabs;
