/**
 * Spacing Design Tokens
 *
 * Based on a 4px base unit with a geometric progression.
 * Use these tokens for margins, padding, and gaps.
 */

export const spacing = {
  // Micro spacing
  '0': '0px',
  'px': '1px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '3.5': '14px',
  '4': '16px',

  // Standard spacing
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',

  // Large spacing
  '14': '56px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',

  // Extra large spacing
  '44': '176px',
  '48': '192px',
  '52': '208px',
  '56': '224px',
  '60': '240px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '96': '384px',
} as const;

// Semantic spacing aliases
export const spacingAliases = {
  none: spacing['0'],
  xs: spacing['1'],
  sm: spacing['2'],
  md: spacing['4'],
  lg: spacing['6'],
  xl: spacing['8'],
  '2xl': spacing['12'],
  '3xl': spacing['16'],
  '4xl': spacing['24'],
  '5xl': spacing['32'],
} as const;

// Component-specific spacing
export const componentSpacing = {
  button: {
    paddingX: {
      sm: spacing['3'],
      md: spacing['4'],
      lg: spacing['6'],
    },
    paddingY: {
      sm: spacing['1.5'],
      md: spacing['2'],
      lg: spacing['3'],
    },
    gap: spacing['2'],
  },
  card: {
    padding: {
      sm: spacing['4'],
      md: spacing['6'],
      lg: spacing['8'],
    },
    gap: spacing['4'],
  },
  input: {
    paddingX: spacing['3'],
    paddingY: spacing['2'],
  },
  modal: {
    padding: spacing['6'],
    gap: spacing['4'],
  },
  stack: {
    xs: spacing['1'],
    sm: spacing['2'],
    md: spacing['4'],
    lg: spacing['6'],
    xl: spacing['8'],
  },
} as const;

export type SpacingToken = keyof typeof spacing;
export type SpacingAlias = keyof typeof spacingAliases;
