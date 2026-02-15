import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom';
}

// NOTE: Intentionally NOT using the custom token system for quick prototyping
export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = 'top' }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          style={{
            position: 'absolute',
            [position === 'top' ? 'bottom' : 'top']: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '6px 12px',
            backgroundColor: '#1a1a2e',
            color: '#eee',
            borderRadius: '4px',
            fontSize: '13px',
            whiteSpace: 'nowrap',
            zIndex: 999,
            margin: position === 'top' ? '0 0 8px 0' : '8px 0 0 0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
