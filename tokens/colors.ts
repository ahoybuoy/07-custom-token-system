/**
 * Color Design Tokens
 *
 * Our color system follows a semantic naming convention:
 * - Primary: Main brand colors
 * - Secondary: Supporting brand colors
 * - Neutral: Grays for text and backgrounds
 * - Semantic: Success, warning, error, info states
 */

export const colors = {
  // Primary palette - Ocean Blue
  primary: {
    50: '#E6F3FF',
    100: '#CCE7FF',
    200: '#99CFFF',
    300: '#66B7FF',
    400: '#339FFF',
    500: '#0087FF', // Base primary
    600: '#006CCC',
    700: '#005199',
    800: '#003666',
    900: '#001B33',
  },

  // Secondary palette - Coral
  secondary: {
    50: '#FFF0ED',
    100: '#FFE1DB',
    200: '#FFC3B7',
    300: '#FFA593',
    400: '#FF876F',
    500: '#FF694B', // Base secondary
    600: '#CC543C',
    700: '#993F2D',
    800: '#662A1E',
    900: '#33150F',
  },

  // Neutral palette
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    1000: '#000000',
  },

  // Semantic colors
  success: {
    light: '#D1FAE5',
    base: '#10B981',
    dark: '#065F46',
  },

  warning: {
    light: '#FEF3C7',
    base: '#F59E0B',
    dark: '#92400E',
  },

  error: {
    light: '#FEE2E2',
    base: '#EF4444',
    dark: '#991B1B',
  },

  info: {
    light: '#DBEAFE',
    base: '#3B82F6',
    dark: '#1E40AF',
  },
} as const;

export type ColorToken = typeof colors;
export type PrimaryShade = keyof typeof colors.primary;
export type SecondaryShade = keyof typeof colors.secondary;
export type NeutralShade = keyof typeof colors.neutral;
