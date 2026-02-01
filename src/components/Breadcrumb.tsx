import React from 'react';
import { colors, spacing, fontSizes } from '../../tokens';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  maxItems?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  maxItems,
}) => {
  let displayItems = items;
  let showEllipsis = false;

  if (maxItems && items.length > maxItems) {
    const firstItems = items.slice(0, 1);
    const lastItems = items.slice(-(maxItems - 1));
    displayItems = [...firstItems, { label: '...' }, ...lastItems];
    showEllipsis = true;
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing['2'],
  };

  const separatorStyle: React.CSSProperties = {
    color: colors.neutral[400],
    fontSize: fontSizes.sm,
    userSelect: 'none',
  };

  const itemStyle = (isLast: boolean): React.CSSProperties => ({
    fontSize: fontSizes.sm,
    color: isLast ? colors.neutral[900] : colors.neutral[600],
    textDecoration: 'none',
    cursor: isLast ? 'default' : 'pointer',
  });

  const linkStyle: React.CSSProperties = {
    color: colors.neutral[600],
    textDecoration: 'none',
  };

  return (
    <nav aria-label="Breadcrumb">
      <ol style={containerStyle}>
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isEllipsis = item.label === '...';

          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: spacing['2'] }}>
              {index > 0 && <span style={separatorStyle}>{separator}</span>}
              {isEllipsis ? (
                <span style={itemStyle(false)}>...</span>
              ) : isLast ? (
                <span style={itemStyle(true)} aria-current="page">{item.label}</span>
              ) : item.href ? (
                <a href={item.href} style={{ ...itemStyle(false), ...linkStyle }}>
                  {item.label}
                </a>
              ) : (
                <button
                  onClick={item.onClick}
                  style={{
                    ...itemStyle(false),
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
