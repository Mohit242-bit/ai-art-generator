import React from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) => {
  // Define button styles based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 hover:bg-primary-700 text-white shadow-md';
      case 'secondary':
        return 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-400 shadow';
      case 'outline':
        return 'bg-transparent hover:bg-gray-50 text-primary-600 border border-primary-600';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-md';
      default:
        return 'bg-primary-600 hover:bg-primary-700 text-white shadow-md';
    }
  };

  // Define button sizes
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-base';
      case 'lg':
        return 'px-5 py-2.5 text-lg';
      default:
        return 'px-4 py-2 text-base';
    }
  };

  // Base classes that apply to all buttons
  const baseClasses = 'font-medium rounded-lg transition-colors duration-300 flex items-center justify-center';
  
  // Disabled classes
  const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

  return (
    <button
      type={type}
      className={`
        ${baseClasses}
        ${getVariantClasses()}
        ${getSizeClasses()}
        ${disabled || loading ? disabledClasses : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;
