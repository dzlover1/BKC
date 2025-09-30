import React from 'react';

const VisceralFatIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    <rect x="9" y="12" width="6" height="5" rx="1" stroke="none" fill="currentColor" className="text-red-400 opacity-75" />
  </svg>
);

export default VisceralFatIcon;
