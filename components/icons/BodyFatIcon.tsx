import React from 'react';

const BodyFatIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 15l9-9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 15a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
  </svg>
);

export default BodyFatIcon;
