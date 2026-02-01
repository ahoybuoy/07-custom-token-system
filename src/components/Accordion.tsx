import React, { useState, createContext, useContext } from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

interface AccordionContextValue {
  expandedItems: string[];
  toggleItem: (id: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  allowMultiple = false,
  defaultExpanded = [],
  children,
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(defaultExpanded);

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      }
      return allowMultiple ? [...prev, id] : [id];
    });
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    border: `1px solid ${colors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  };

  return (
    <AccordionContext.Provider value={{ expandedItems, toggleItem, allowMultiple }}>
      <div style={containerStyle}>{children}</div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  title,
  icon,
  disabled = false,
  children,
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isExpanded = context.expandedItems.includes(id);

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing['3'],
    width: '100%',
    padding: spacing['4'],
    fontSize: fontSizes.base,
    fontWeight: fontWeights.medium,
    color: disabled ? colors.neutral[400] : colors.neutral[900],
    backgroundColor: colors.neutral[0],
    border: 'none',
    borderBottom: `1px solid ${colors.neutral[200]}`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    textAlign: 'left',
    transition: `background-color ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const iconContainerStyle: React.CSSProperties = {
    marginLeft: 'auto',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
    transition: `transform ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const contentStyle: React.CSSProperties = {
    maxHeight: isExpanded ? '1000px' : '0',
    overflow: 'hidden',
    transition: `max-height ${transitions.duration.slow} ${transitions.timing.ease}`,
  };

  const innerContentStyle: React.CSSProperties = {
    padding: spacing['4'],
    backgroundColor: colors.neutral[50],
    borderBottom: `1px solid ${colors.neutral[200]}`,
  };

  return (
    <div>
      <button
        type="button"
        style={headerStyle}
        disabled={disabled}
        onClick={() => !disabled && context.toggleItem(id)}
        aria-expanded={isExpanded}
      >
        {icon && <span style={{ width: '20px', height: '20px' }}>{icon}</span>}
        <span>{title}</span>
        <span style={iconContainerStyle}>
          <ChevronDownIcon />
        </span>
      </button>
      <div style={contentStyle}>
        <div style={innerContentStyle}>{children}</div>
      </div>
    </div>
  );
};

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 6L8 10L12 6"
      stroke={colors.neutral[500]}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Accordion;
