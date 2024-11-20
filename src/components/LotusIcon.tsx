const LotusIcon = ({ className = "h-8 w-8" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Center */}
      <circle cx="50" cy="50" r="8" fill="currentColor"/>
      
      {/* Inner Petals */}
      <path d="M50 42 L35 25 L50 20 L65 25 L50 42" fill="currentColor"/>
      <path d="M65 50 L82 35 L87 50 L82 65 L65 50" fill="currentColor"/>
      <path d="M50 65 L65 82 L50 87 L35 82 L50 65" fill="currentColor"/>
      <path d="M35 50 L18 65 L13 50 L18 35 L35 50" fill="currentColor"/>
      
      {/* Middle Petals */}
      <path d="M57 46 L75 15 L82 35 L65 50 L57 46" fill="currentColor"/>
      <path d="M54 57 L85 75 L65 82 L50 65 L54 57" fill="currentColor"/>
      <path d="M43 54 L15 75 L35 82 L50 65 L43 54" fill="currentColor"/>
      <path d="M46 43 L15 25 L35 18 L50 35 L46 43" fill="currentColor"/>
      
      {/* Outer Petals */}
      <path d="M50 35 L40 5 L50 0 L60 5 L50 35" fill="currentColor"/>
      <path d="M65 50 L95 40 L100 50 L95 60 L65 50" fill="currentColor"/>
      <path d="M50 65 L60 95 L50 100 L40 95 L50 65" fill="currentColor"/>
      <path d="M35 50 L5 60 L0 50 L5 40 L35 50" fill="currentColor"/>
    </svg>
  );
};

export default LotusIcon;
