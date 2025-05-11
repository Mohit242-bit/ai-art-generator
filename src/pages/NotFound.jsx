import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center animate-fade-in">
      <div className="bg-red-100 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h1>
      
      <p className="text-xl text-gray-600 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      
      <Link to="/">
        <Button variant="primary" size="lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
