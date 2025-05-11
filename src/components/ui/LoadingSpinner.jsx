import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = 'primary', className = '' }) => {
  // Size classes
  const sizeClasses = {
    small: 'w-6 h-6 border-2',
    medium: 'w-10 h-10 border-3',
    large: 'w-16 h-16 border-4',
  };

  // Color classes
  const colorClasses = {
    primary: 'border-primary-600',
    secondary: 'border-secondary-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          ${sizeClasses[size] || sizeClasses.medium}
          ${colorClasses[color] || colorClasses.primary}
          animate-spin rounded-full border-t-transparent
        `}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
