import React from 'react';

export function TestDrift() {
  return (
    <div
      style={{
        backgroundColor: '#0d1117',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #30363d',
      }}
    >
      <div className="flex items-center gap-[10px] mb-[14px]">
        <div
          className="w-[36px] h-[36px] rounded-full bg-[#ff0000]"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <span style={{ color: '#fff', fontSize: '16px' }}>A</span>
        </div>
        <h3 style={{ color: '#c9d1d9', fontSize: '16px', fontWeight: 600, margin: 0 }}>
          Avatar Card
        </h3>
      </div>
      <p className="text-[#8b949e] text-[13px] p-[17px] bg-[#161b22] rounded-[6px]">
        Uses raw hex values instead of the custom token system.
      </p>
    </div>
  );
}
