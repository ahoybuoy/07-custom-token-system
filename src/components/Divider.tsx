import React from 'react';
import { colors, spacing, fontSizes } from '../../tokens';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  color?: 'light' | 'medium' | 'dark';
  thickness?: 'thin' | 'medium' | 'thick';
  label?: string;
  labelPosition?: 'left' | 'center' | 'right';
}

const thicknessMap = { thin: '1px', medium: '2px', thick: '4px' };
const colorMap = {
  light: colors.neutral[100],
  medium: colors.neutral[200],
  dark: colors.neutral[300],
};

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'medium',
  thickness = 'thin',
  label,
  labelPosition = 'center',
}) => {
  const isHorizontal = orientation === 'horizontal';
  const lineColor = colorMap[color];
  const lineThickness = thicknessMap[thickness];

  if (label && isHorizontal) {
    const containerStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: spacing['4'],
    };

    const lineStyle: React.CSSProperties = {
      flex: labelPosition === 'center' ? 1 : labelPosition === 'left' ? 0 : 1,
      height: lineThickness,
      backgroundColor: lineColor,
      borderStyle: variant,
    };

    const labelStyle: React.CSSProperties = {
      fontSize: fontSizes.sm,
      color: colors.neutral[500],
      whiteSpace: 'nowrap',
    };

    return (
      <div style={containerStyle} role="separator">
        {labelPosition !== 'left' && <div style={lineStyle} />}
        <span style={labelStyle}>{label}</span>
        {labelPosition !== 'right' && <div style={{ ...lineStyle, flex: labelPosition === 'left' ? 1 : undefined }} />}
      </div>
    );
  }

  const style: React.CSSProperties = isHorizontal
    ? {
        width: '100%',
        height: lineThickness,
        backgroundColor: lineColor,
        borderStyle: variant === 'solid' ? undefined : variant,
        borderWidth: variant !== 'solid' ? lineThickness : undefined,
        borderColor: variant !== 'solid' ? lineColor : undefined,
      }
    : {
        width: lineThickness,
        height: '100%',
        minHeight: '20px',
        backgroundColor: lineColor,
      };

  return <div style={style} role="separator" />;
};

export default Divider;
