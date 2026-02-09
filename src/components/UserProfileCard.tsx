import React from 'react';
import { colors, componentSpacing, borderRadius, shadows } from '../../tokens';

export interface UserProfileCardProps {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isOnline?: boolean;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  name,
  email,
  role,
  avatar,
  isOnline = false,
}) => {
  return (
    <div
      style={{
        padding: componentSpacing.card.padding.md,
        borderRadius: borderRadius.xl,
        backgroundColor: '#F0F4FF',
        border: '1px solid #CBD5E1',
        display: 'flex',
        gap: componentSpacing.card.gap,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '48px',
          height: '48px',
          borderRadius: borderRadius.full,
          backgroundColor: '#E0E7FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: 600,
          color: '#3730A3',
        }}
      >
        {avatar ? (
          <img src={avatar} alt={name} style={{ width: '100%', height: '100%', borderRadius: borderRadius.full, objectFit: 'cover' }} />
        ) : (
          name.charAt(0).toUpperCase()
        )}
        {isOnline && (
          <span
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              borderRadius: borderRadius.full,
              backgroundColor: '#10B981',
              border: '2px solid white',
            }}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '2px' }}>
          {name}
        </div>
        <div style={{ fontSize: '14px', color: '#64748B' }}>
          {email}
        </div>
        <div
          style={{
            display: 'inline-block',
            marginTop: componentSpacing.card.gap,
            padding: '2px 8px',
            borderRadius: borderRadius.full,
            backgroundColor: '#DBEAFE',
            color: '#1D4ED8',
            fontSize: '12px',
            fontWeight: 500,
          }}
        >
          {role}
        </div>
      </div>
    </div>
  );
};
