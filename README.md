# Custom Token System Test Repo

## Purpose
This test repository validates Buoy's ability to detect and understand **custom design token implementations** that aren't from established design systems like Material UI or Chakra.

## What This Tests
- Detection of custom design token files (CSS custom properties, TypeScript constants)
- Recognition of a `/tokens` or `/design-system` folder structure
- Understanding of token usage patterns across 50+ components
- Identification of a cohesive, internally-consistent design system

## Structure
```
├── tokens/
│   ├── colors.ts          # Color token definitions
│   ├── spacing.ts         # Spacing scale tokens
│   ├── typography.ts      # Font tokens
│   └── index.ts           # Token exports
├── design-system/
│   ├── tokens.css         # CSS custom properties
│   └── theme.ts           # Theme configuration
├── src/
│   ├── components/        # 50+ components using tokens
│   ├── utils/             # Token utilities
│   └── styles/            # Global styles
└── package.json
```

## Expected Buoy Behavior
1. **Should detect**: Custom design system present
2. **Should identify**: Token structure and naming conventions
3. **Should recognize**: Consistent usage patterns
4. **Should NOT**: Suggest adopting a third-party design system (they have their own)

## Token Naming Convention
- Colors: `--color-{category}-{shade}` (e.g., `--color-primary-500`)
- Spacing: `--spacing-{size}` (e.g., `--spacing-md`)
- Typography: `--font-{property}-{variant}` (e.g., `--font-size-lg`)
