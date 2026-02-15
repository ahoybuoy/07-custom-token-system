import React from 'react';

// Activity feed that bypasses the custom TypeScript/CSS token system
export function ActivityFeed() {
  const activities = [
    { user: 'Alice', action: 'pushed to', target: 'main', time: '2m ago' },
    { user: 'Bob', action: 'opened PR', target: '#42', time: '15m ago' },
    { user: 'Carol', action: 'commented on', target: '#38', time: '1h ago' },
  ];

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '14px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
      border: '1px solid #e2e8f0',
      maxWidth: '400px',
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 600,
        color: '#1e293b',
        marginBottom: '16px',
        paddingBottom: '12px',
        borderBottom: '1px solid #f1f5f9',
      }}>
        Recent Activity
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
        {activities.map((a, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 12px',
            borderRadius: '8px',
            backgroundColor: '#f8fafc',
            transition: 'background-color 150ms ease',
            border: '1px solid transparent',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              flexShrink: 0,
            }}>
              {a.user[0]}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '14px', color: '#334155' }}>
                <strong style={{ fontWeight: 600 }}>{a.user}</strong>
                {' '}{a.action}{' '}
                <span style={{ color: '#3b82f6', fontWeight: 500 }}>{a.target}</span>
              </p>
              <p style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginTop: '2px',
                opacity: 0.8,
              }}>
                {a.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button style={{
        marginTop: '16px',
        width: '100%',
        padding: '8px',
        backgroundColor: 'transparent',
        color: '#3b82f6',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 200ms ease',
        zIndex: 1,
      }}>
        View All Activity
      </button>
    </div>
  );
}
// Updated: 2026-02-15T23:30:45Z
// Rescan: 2026-02-15T23:40:18Z
