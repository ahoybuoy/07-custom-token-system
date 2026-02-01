import React from 'react';
import { colors, fontSizes, fontWeights, lineHeights, textStyles } from '../../tokens';

type TextVariant = keyof typeof textStyles;

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: TextVariant;
  size?: keyof typeof fontSizes;
  weight?: keyof typeof fontWeights;
  lineHeight?: keyof typeof lineHeights;
  color?: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  noWrap?: boolean;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  variant,
  size,
  weight,
  lineHeight,
  color,
  align,
  truncate = false,
  noWrap = false,
  children,
}) => {
  const variantStyle = variant ? textStyles[variant] : {};

  const style: React.CSSProperties = {
    ...variantStyle,
    fontSize: size ? fontSizes[size] : variantStyle.fontSize,
    fontWeight: weight ? fontWeights[weight] : variantStyle.fontWeight,
    lineHeight: lineHeight ? lineHeights[lineHeight] : variantStyle.lineHeight,
    color: color || colors.neutral[900],
    textAlign: align,
    whiteSpace: noWrap ? 'nowrap' : undefined,
    overflow: truncate ? 'hidden' : undefined,
    textOverflow: truncate ? 'ellipsis' : undefined,
    margin: 0,
  };

  return React.createElement(Component, { style }, children);
};

export const Heading: React.FC<Omit<TextProps, 'as'> & { level?: 1 | 2 | 3 | 4 | 5 | 6 }> = ({
  level = 2,
  variant,
  ...props
}) => {
  const Component = `h${level}` as const;
  const defaultVariant = `h${level}` as TextVariant;

  return <Text as={Component} variant={variant || defaultVariant} {...props} />;
};

export default Text;
