import React from 'react';

const LotusIcon = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="2"/>
      
      {/* Center */}
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
      
      {/* Inner Petals */}
      <path d="M50 42 L40 30 L50 25 L60 30 L50 42" fill="currentColor"/>
      <path d="M58 50 L70 40 L75 50 L70 60 L58 50" fill="currentColor"/>
      <path d="M50 58 L60 70 L50 75 L40 70 L50 58" fill="currentColor"/>
      <path d="M42 50 L30 60 L25 50 L30 40 L42 50" fill="currentColor"/>
      
      {/* Outer Petals */}
      <path d="M50 25 L40 10 L50 5 L60 10 L50 25" fill="currentColor"/>
      <path d="M75 50 L90 40 L95 50 L90 60 L75 50" fill="currentColor"/>
      <path d="M50 75 L60 90 L50 95 L40 90 L50 75" fill="currentColor"/>
      <path d="M25 50 L10 60 L5 50 L10 40 L25 50" fill="currentColor"/>
    </svg>
  );
};

export default LotusIcon;
