import React from 'react';
import { spacing } from '../../tokens';

export interface GridProps {
  columns?: number | { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
  gap?: keyof typeof spacing;
  rowGap?: keyof typeof spacing;
  columnGap?: keyof typeof spacing;
  children: React.ReactNode;
}

export const Grid: React.FC<GridProps> = ({
  columns = 12,
  gap = '4',
  rowGap,
  columnGap,
  children,
}) => {
  const colCount = typeof columns === 'number' ? columns : columns.base || 12;

  const style: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
    gap: spacing[gap],
    rowGap: rowGap ? spacing[rowGap] : undefined,
    columnGap: columnGap ? spacing[columnGap] : undefined,
  };

  return <div style={style}>{children}</div>;
};

export interface GridItemProps {
  colSpan?: number;
  rowSpan?: number;
  colStart?: number;
  colEnd?: number;
  children: React.ReactNode;
}

export const GridItem: React.FC<GridItemProps> = ({
  colSpan,
  rowSpan,
  colStart,
  colEnd,
  children,
}) => {
  const style: React.CSSProperties = {
    gridColumn: colSpan ? `span ${colSpan}` : colStart && colEnd ? `${colStart} / ${colEnd}` : undefined,
    gridRow: rowSpan ? `span ${rowSpan}` : undefined,
  };

  return <div style={style}>{children}</div>;
};

export default Grid;
