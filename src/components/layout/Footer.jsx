import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-lg font-bold text-primary-700">AI Art Generator</span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/gallery" className="text-gray-600 hover:text-primary-600 transition-colors">Gallery</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} AI Art Generator. All rights reserved.</p>
          <p className="mt-1">Created with React, Tailwind CSS, and Three.js</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
