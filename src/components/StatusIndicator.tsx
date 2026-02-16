import React from 'react';

type Status = 'online' | 'offline' | 'busy' | 'away';

const statusConfig: Record<Status, { color: string; bg: string; label: string }> = {
  online: { color: '#22c55e', bg: '#f0fdf4', label: 'Online' },
  offline: { color: '#6b7280', bg: '#f9fafb', label: 'Offline' },
  busy: { color: '#ef4444', bg: '#fef2f2', label: 'Busy' },
  away: { color: '#f59e0b', bg: '#fffbeb', label: 'Away' },
};

export function StatusIndicator({ status, name }: { status: Status; name: string }) {
  const config = statusConfig[status];
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '8px 14px',
      backgroundColor: config.bg,
      borderRadius: '8px',
      border: `1px solid ${config.color}20`,
    }}>
      <div style={{
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        backgroundColor: config.color,
        boxShadow: `0 0 0 3px ${config.color}30`,
      }} />
      <div>
        <p style={{ fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>{name}</p>
        <p style={{ fontSize: '12px', color: '#6b7280' }}>{config.label}</p>
      </div>
    </div>
  );
}
