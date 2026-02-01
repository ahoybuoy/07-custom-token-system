import React from 'react';
import { colors, spacing, borderRadius, transitions, fontSizes, fontWeights } from '../../tokens';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  showFirstLast?: boolean;
  disabled?: boolean;
}

function getPageNumbers(current: number, total: number, siblings: number): (number | string)[] {
  const pages: (number | string)[] = [];
  const leftSibling = Math.max(current - siblings, 1);
  const rightSibling = Math.min(current + siblings, total);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  if (showLeftDots) {
    pages.push('...');
  } else if (leftSibling === 2) {
    pages.push(2);
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== total) {
      pages.push(i);
    }
  }

  if (showRightDots) {
    pages.push('...');
  } else if (rightSibling === total - 1) {
    pages.push(total - 1);
  }

  if (total > 1) {
    pages.push(total);
  }

  return pages;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  disabled = false,
}) => {
  const pages = getPageNumbers(currentPage, totalPages, siblingCount);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing['1'],
  };

  const buttonStyle = (isActive: boolean, isDisabled: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    height: '36px',
    padding: `0 ${spacing['2']}`,
    fontSize: fontSizes.sm,
    fontWeight: isActive ? fontWeights.semibold : fontWeights.normal,
    color: isActive ? colors.neutral[0] : colors.neutral[700],
    backgroundColor: isActive ? colors.primary[500] : 'transparent',
    border: isActive ? 'none' : `1px solid ${colors.neutral[300]}`,
    borderRadius: borderRadius.md,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 0.5 : 1,
    transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
  });

  const navButtonStyle = (isDisabled: boolean): React.CSSProperties => ({
    ...buttonStyle(false, isDisabled),
    minWidth: 'auto',
    padding: spacing['2'],
  });

  const dotsStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '36px',
    height: '36px',
    fontSize: fontSizes.sm,
    color: colors.neutral[500],
  };

  return (
    <nav aria-label="Pagination">
      <ul style={containerStyle}>
        {showFirstLast && (
          <li>
            <button
              style={navButtonStyle(currentPage === 1 || disabled)}
              disabled={currentPage === 1 || disabled}
              onClick={() => onPageChange(1)}
              aria-label="First page"
            >
              <DoubleChevronLeft />
            </button>
          </li>
        )}
        <li>
          <button
            style={navButtonStyle(currentPage === 1 || disabled)}
            disabled={currentPage === 1 || disabled}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>
        </li>
        {pages.map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span style={dotsStyle}>...</span>
            ) : (
              <button
                style={buttonStyle(page === currentPage, disabled)}
                disabled={disabled}
                onClick={() => onPageChange(page as number)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            style={navButtonStyle(currentPage === totalPages || disabled)}
            disabled={currentPage === totalPages || disabled}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </li>
        {showFirstLast && (
          <li>
            <button
              style={navButtonStyle(currentPage === totalPages || disabled)}
              disabled={currentPage === totalPages || disabled}
              onClick={() => onPageChange(totalPages)}
              aria-label="Last page"
            >
              <DoubleChevronRight />
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DoubleChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 12L4 8L8 4M12 12L8 8L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DoubleChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M4 4L8 8L4 12M8 4L12 8L8 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Pagination;
