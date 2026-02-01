import React from 'react';
import { colors, fontSizes, fontWeights, transitions } from '../../tokens';

export interface LinkProps {
  href: string;
  external?: boolean;
  underline?: 'always' | 'hover' | 'none';
  color?: 'primary' | 'secondary' | 'neutral' | 'inherit';
  size?: keyof typeof fontSizes;
  weight?: keyof typeof fontWeights;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const colorMap = {
  primary: { default: colors.primary[600], hover: colors.primary[700] },
  secondary: { default: colors.secondary[600], hover: colors.secondary[700] },
  neutral: { default: colors.neutral[600], hover: colors.neutral[800] },
  inherit: { default: 'inherit', hover: 'inherit' },
};

export const Link: React.FC<LinkProps> = ({
  href,
  external = false,
  underline = 'hover',
  color = 'primary',
  size,
  weight,
  children,
  onClick,
}) => {
  const colorStyle = colorMap[color];

  const style: React.CSSProperties = {
    color: colorStyle.default,
    fontSize: size ? fontSizes[size] : 'inherit',
    fontWeight: weight ? fontWeights[weight] : 'inherit',
    textDecoration: underline === 'always' ? 'underline' : 'none',
    cursor: 'pointer',
    transition: `color ${transitions.duration.fast} ${transitions.timing.ease}`,
  };

  const externalProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      href={href}
      style={style}
      onClick={onClick}
      {...externalProps}
    >
      {children}
      {external && (
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ marginLeft: '4px', verticalAlign: 'middle' }}
        >
          <path
            d="M3 9L9 3M9 3H4M9 3V8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  );
};

export default Link;
