/**
 * Theme Configuration
 *
 * Combines all tokens into a complete theme object.
 * Use this for styled-components ThemeProvider or similar.
 */

import { colors } from '../tokens/colors';
import { spacing, spacingAliases, componentSpacing } from '../tokens/spacing';
import {
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacing,
  textStyles
} from '../tokens/typography';
import { borderRadius, shadows, transitions, zIndex, breakpoints } from '../tokens';

export const theme = {
  colors: {
    ...colors,
    // Semantic color aliases
    text: {
      primary: colors.neutral[900],
      secondary: colors.neutral[600],
      tertiary: colors.neutral[500],
      disabled: colors.neutral[400],
      inverse: colors.neutral[0],
      link: colors.primary[600],
      linkHover: colors.primary[700],
    },
    background: {
      primary: colors.neutral[0],
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
      inverse: colors.neutral[900],
      overlay: 'rgba(0, 0, 0, 0.5)',
    },
    border: {
      default: colors.neutral[200],
      hover: colors.neutral[300],
      focus: colors.primary[500],
      error: colors.error.base,
    },
  },
  spacing: {
    ...spacing,
    ...spacingAliases,
  },
  componentSpacing,
  typography: {
    fontFamilies,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacing,
    textStyles,
  },
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
} as const;

export type Theme = typeof theme;

// Theme type helpers
export type ThemeColors = Theme['colors'];
export type ThemeSpacing = Theme['spacing'];
export type ThemeTypography = Theme['typography'];

// Dark theme override
export const darkTheme: Theme = {
  ...theme,
  colors: {
    ...theme.colors,
    text: {
      primary: colors.neutral[50],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[400],
      disabled: colors.neutral[500],
      inverse: colors.neutral[900],
      link: colors.primary[400],
      linkHover: colors.primary[300],
    },
    background: {
      primary: colors.neutral[900],
      secondary: colors.neutral[800],
      tertiary: colors.neutral[700],
      inverse: colors.neutral[50],
      overlay: 'rgba(0, 0, 0, 0.7)',
    },
    border: {
      default: colors.neutral[700],
      hover: colors.neutral[600],
      focus: colors.primary[400],
      error: colors.error.base,
    },
  },
};

// Utility to create themed styles
export function createThemedStyles<T extends Record<string, unknown>>(
  styleCreator: (theme: Theme) => T
): (theme: Theme) => T {
  return styleCreator;
}
