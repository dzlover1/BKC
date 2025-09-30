import React from 'react';

const MuscleIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 8.25v-1.5a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9.75h7.5v-.75a3 3 0 00-3-3h-1.5a3 3 0 00-3 3v.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 11.25a.75.75 0 00-1.5 0v3.75c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 11.25a.75.75 0 01-1.5 0v3.75c0 .414.336.75.75.75h1.5a.75.75 0 01.75-.75v-3a.75.75 0 01-.75-.75h-.75Z" />
  </svg>
);

export default MuscleIcon;
