import React from 'react';

const Card = ({ children, className = '', ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden ${className}`} {...props}>
      {children}
    </div>
  );
};

// Add subcomponents for better organization
Card.Body = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Header = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.Footer = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
