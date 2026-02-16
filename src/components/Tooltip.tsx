import React, { useState, useRef } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: '6px' },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: '6px' },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: '6px' },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: '6px' },
  };

  return (
    <div
      ref={ref}
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            ...positionStyles[position],
            backgroundColor: '#1f2937',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 500,
            padding: '6px 10px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            zIndex: 50,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
            pointerEvents: 'none',
            animation: 'fadeIn 150ms ease-out',
          }}
        >
          {content}
          <div
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              backgroundColor: '#1f2937',
              transform: 'rotate(45deg)',
              ...(position === 'top'
                ? { bottom: '-3px', left: '50%', marginLeft: '-3px' }
                : position === 'bottom'
                ? { top: '-3px', left: '50%', marginLeft: '-3px' }
                : position === 'left'
                ? { right: '-3px', top: '50%', marginTop: '-3px' }
                : { left: '-3px', top: '50%', marginTop: '-3px' }),
            }}
          />
        </div>
      )}
    </div>
  );
}
