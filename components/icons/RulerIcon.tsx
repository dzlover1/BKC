
import React from 'react';

const RulerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16M8 4v4m8-4v4M8 12v4m8-4v4m-3-6h.01M7 14h.01" />
  </svg>
);

export default RulerIcon;
