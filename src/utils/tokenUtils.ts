/**
 * Token Utilities
 *
 * Helper functions for working with design tokens.
 */

import { colors, spacing, spacingAliases } from '../../tokens';

/**
 * Get a color value from the token system
 */
export function getColor(
  palette: keyof typeof colors,
  shade?: string | number
): string {
  const colorPalette = colors[palette];
  if (typeof colorPalette === 'string') {
    return colorPalette;
  }
  if (shade !== undefined && typeof colorPalette === 'object') {
    return (colorPalette as Record<string | number, string>)[shade] || '';
  }
  return '';
}

/**
 * Get a spacing value from the token system
 */
export function getSpacing(size: keyof typeof spacing | keyof typeof spacingAliases): string {
  if (size in spacingAliases) {
    return spacingAliases[size as keyof typeof spacingAliases];
  }
  return spacing[size as keyof typeof spacing] || '0px';
}

/**
 * Convert token to CSS variable reference
 */
export function cssVar(tokenName: string): string {
  return `var(--${tokenName})`;
}

/**
 * Create a responsive value object
 */
export function responsive<T>(
  base: T,
  overrides?: Partial<Record<'sm' | 'md' | 'lg' | 'xl', T>>
): Record<string, T> {
  return {
    base,
    ...overrides,
  };
}

/**
 * Merge token values with custom styles
 */
export function mergeStyles<T extends Record<string, unknown>>(
  tokenStyles: T,
  customStyles?: Partial<T>
): T {
  return { ...tokenStyles, ...customStyles };
}

/**
 * Get opacity variant of a color
 */
export function withOpacity(color: string, opacity: number): string {
  // For hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}
