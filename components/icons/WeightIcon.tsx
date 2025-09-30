
import React from 'react';

const WeightIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a2 2 0 002 2h10a2 2 0 002-2L18 7l3-1M6 7l6 9 6-9" />
  </svg>
);

export default WeightIcon;
