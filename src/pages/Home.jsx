import React, { useState, useEffect } from 'react';
import ImageGenerator from '../components/features/ImageGenerator';
import Distortion from '../components/animations/Distortion';

const Home = () => {
  const [showDistortion, setShowDistortion] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // After 4 seconds, start fading out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    // After 5 seconds, remove the distortion completely
    const hideTimer = setTimeout(() => {
      setShowDistortion(false);
    }, 5000);

    // Clean up timers
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="relative">
      {/* Static Background - always visible */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900 to-primary-900">
        <img 
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Hyperspeed Animation - layered on top with transparency */}
      {showDistortion && (
        <div 
          className={`fixed inset-0 z-10 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-70'}`}
          style={{ pointerEvents: 'none' }}
        >
          <Hyperspeed 
            effectOptions={{
              distortion: 'turbulentDistortion',
              onSpeedUp: () => console.log('Speed up!'),
              onSlowDown: () => console.log('Slow down!'),
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0xFFFFFF,
                brokenLines: 0xFFFFFF,
                leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
                rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
                sticks: 0x03B3C3,
              }
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow">
            AI Art Generator
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10 text-white text-shadow">
            Transform your ideas into stunning AI-generated artwork with just a few words
          </p>
          
          <a href="#generator" className="bg-white text-primary-800 hover:bg-primary-100 px-8 py-4 rounded-lg font-bold text-lg transition-colors duration-300 shadow-lg">
            Start Creating
          </a>
        </section>

        {/* Image Generator Section with white background card for contrast */}
        <section id="generator" className="mb-16 bg-white bg-opacity-95 p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Your Masterpiece</h2>
          <ImageGenerator />
        </section>

        {/* How It Works Section */}
        <section className="mb-16 bg-white bg-opacity-95 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow p-6 rounded-xl">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-primary-800 font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Enter Your Prompt</h3>
              <p className="text-gray-600">Describe the image you want to create in detail.</p>
            </div>
            
            <div className="bg-white shadow p-6 rounded-xl">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-primary-800 font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Generate Image</h3>
              <p className="text-gray-600">Our AI creates an image based on your description.</p>
            </div>
            
            <div className="bg-white shadow p-6 rounded-xl">
              <div className="bg-primary-100 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                <span className="text-primary-800 font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Add Effects</h3>
              <p className="text-gray-600">Apply glitch effects and customize your creation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
