import React from 'react';
import { colors, spacing, borderRadius, shadows } from '../../tokens';

type SpacingValue = keyof typeof spacing;
type ColorValue = string;
type RadiusValue = keyof typeof borderRadius;
type ShadowValue = keyof typeof shadows;

export interface BoxProps {
  as?: keyof JSX.IntrinsicElements;
  // Spacing
  p?: SpacingValue;
  px?: SpacingValue;
  py?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  m?: SpacingValue;
  mx?: SpacingValue;
  my?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  // Colors
  bg?: ColorValue;
  color?: ColorValue;
  borderColor?: ColorValue;
  // Layout
  display?: React.CSSProperties['display'];
  position?: React.CSSProperties['position'];
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  overflow?: React.CSSProperties['overflow'];
  // Border
  border?: string;
  borderWidth?: string;
  borderRadius?: RadiusValue;
  // Shadow
  shadow?: ShadowValue;
  // Flex
  flex?: React.CSSProperties['flex'];
  flexGrow?: React.CSSProperties['flexGrow'];
  flexShrink?: React.CSSProperties['flexShrink'];
  // Other
  opacity?: number;
  cursor?: React.CSSProperties['cursor'];
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = ({
  as: Component = 'div',
  p, px, py, pt, pr, pb, pl,
  m, mx, my, mt, mr, mb, ml,
  bg,
  color: textColor,
  borderColor: bColor,
  display,
  position,
  width,
  height,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  overflow,
  border,
  borderWidth,
  borderRadius: radius,
  shadow,
  flex,
  flexGrow,
  flexShrink,
  opacity,
  cursor,
  children,
  style,
  onClick,
}) => {
  const boxStyle: React.CSSProperties = {
    padding: p ? spacing[p] : undefined,
    paddingLeft: px ? spacing[px] : pl ? spacing[pl] : undefined,
    paddingRight: px ? spacing[px] : pr ? spacing[pr] : undefined,
    paddingTop: py ? spacing[py] : pt ? spacing[pt] : undefined,
    paddingBottom: py ? spacing[py] : pb ? spacing[pb] : undefined,
    margin: m ? spacing[m] : undefined,
    marginLeft: mx ? spacing[mx] : ml ? spacing[ml] : undefined,
    marginRight: mx ? spacing[mx] : mr ? spacing[mr] : undefined,
    marginTop: my ? spacing[my] : mt ? spacing[mt] : undefined,
    marginBottom: my ? spacing[my] : mb ? spacing[mb] : undefined,
    backgroundColor: bg,
    color: textColor,
    borderColor: bColor,
    display,
    position,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    overflow,
    border,
    borderWidth,
    borderRadius: radius ? borderRadius[radius] : undefined,
    boxShadow: shadow ? shadows[shadow] : undefined,
    flex,
    flexGrow,
    flexShrink,
    opacity,
    cursor,
    ...style,
  };

  return React.createElement(Component, { style: boxStyle, onClick }, children);
};

export default Box;
