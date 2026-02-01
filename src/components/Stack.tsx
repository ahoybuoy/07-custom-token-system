import React from 'react';
import { componentSpacing } from '../../tokens';

export interface StackProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  spacing?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
  divider?: React.ReactNode;
  children: React.ReactNode;
}

const alignMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyMap = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  spacing = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  divider,
  children,
}) => {
  const gap = componentSpacing.stack[spacing];

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap,
  };

  if (divider) {
    const childArray = React.Children.toArray(children);
    const childrenWithDividers = childArray.reduce<React.ReactNode[]>((acc, child, index) => {
      if (index > 0) {
        acc.push(
          <React.Fragment key={`divider-${index}`}>
            {divider}
          </React.Fragment>
        );
      }
      acc.push(child);
      return acc;
    }, []);

    return <div style={style}>{childrenWithDividers}</div>;
  }

  return <div style={style}>{children}</div>;
};

export const HStack: React.FC<Omit<StackProps, 'direction'>> = (props) => (
  <Stack {...props} direction="row" />
);

export const VStack: React.FC<Omit<StackProps, 'direction'>> = (props) => (
  <Stack {...props} direction="column" />
);

export default Stack;
