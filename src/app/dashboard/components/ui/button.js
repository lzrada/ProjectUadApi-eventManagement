import React from 'react';

export const Button = ({ children, variant = 'solid', className = '', ...props }) => {
  const variantClass = variant === 'ghost' 
    ? 'bg-transparent text-white border border-white hover:bg-white hover:text-black' 
    : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <button
      className={`py-2 px-4 rounded-md focus:outline-none ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
