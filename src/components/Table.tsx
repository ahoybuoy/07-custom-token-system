import React from 'react';
import { colors, spacing, borderRadius, fontSizes, fontWeights } from '../../tokens';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: T, index: number) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onRowClick?: (row: T, index: number) => void;
  emptyMessage?: string;
}

const sizeStyles = {
  sm: { padding: `${spacing['2']} ${spacing['3']}`, fontSize: fontSizes.sm },
  md: { padding: `${spacing['3']} ${spacing['4']}`, fontSize: fontSizes.base },
  lg: { padding: `${spacing['4']} ${spacing['5']}`, fontSize: fontSizes.lg },
};

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  striped = false,
  hoverable = true,
  bordered = true,
  size = 'md',
  onRowClick,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const sizeStyle = sizeStyles[size];

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: sizeStyle.fontSize,
  };

  const wrapperStyle: React.CSSProperties = {
    overflowX: 'auto',
    border: bordered ? `1px solid ${colors.neutral[200]}` : undefined,
    borderRadius: bordered ? borderRadius.lg : undefined,
  };

  const headerCellStyle = (column: TableColumn<T>): React.CSSProperties => ({
    padding: sizeStyle.padding,
    textAlign: column.align || 'left',
    fontWeight: fontWeights.semibold,
    color: colors.neutral[700],
    backgroundColor: colors.neutral[50],
    borderBottom: `1px solid ${colors.neutral[200]}`,
    width: column.width,
    whiteSpace: 'nowrap',
  });

  const cellStyle = (column: TableColumn<T>, rowIndex: number): React.CSSProperties => ({
    padding: sizeStyle.padding,
    textAlign: column.align || 'left',
    color: colors.neutral[900],
    backgroundColor: striped && rowIndex % 2 === 1 ? colors.neutral[50] : colors.neutral[0],
    borderBottom: `1px solid ${colors.neutral[100]}`,
  });

  const rowStyle: React.CSSProperties = {
    cursor: onRowClick ? 'pointer' : 'default',
  };

  const getCellValue = (row: T, column: TableColumn<T>, index: number) => {
    if (column.render) {
      return column.render(row, index);
    }
    const value = row[column.key as keyof T];
    return value !== undefined && value !== null ? String(value) : '';
  };

  return (
    <div style={wrapperStyle}>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} style={headerCellStyle(column)}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: spacing['8'],
                  textAlign: 'center',
                  color: colors.neutral[500],
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={rowStyle}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={cellStyle(column, rowIndex)}>
                    {getCellValue(row, column, rowIndex)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
