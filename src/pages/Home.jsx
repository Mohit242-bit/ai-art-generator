import React, { useState, useEffect } from 'react';
import ImageGenerator from '../components/features/ImageGenerator';
import TrueFocus from '../components/animations/TrueFocus';
import SplashCursor from '../components/animations/SplashCursor';

const Home = () => {
  const [showTitleFocus, setShowTitleFocus] = useState(false);
  


  useEffect(() => {
    // Show the TrueFocus animation after a short delay
    const showTimer = setTimeout(() => {
      setShowTitleFocus(true);
    }, 2000);

    // Clean up timer
    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <div className="relative">
      {/* Static Background - always visible */}
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-gray-900 to-primary-900">
        <img 
          src={backgroundImage}
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
      </div>

      {/* SplashCursor Animation - layered on top */}
      <SplashCursor 
        SIM_RESOLUTION={128}
        DYE_RESOLUTION={1440}
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={1}
        PRESSURE={0.1}
        PRESSURE_ITERATIONS={20}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={4000}
        SHADING={true}
        COLOR_UPDATE_SPEED={10}
        BACK_COLOR={{ r: 0.5, g: 0, b: 0 }}
        TRANSPARENT={true}
      />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center text-center mb-16">
          {!showTitleFocus ? (
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white text-shadow">
              AI Art Generator
            </h1>
          ) : (
            <div className="mb-6">
              <TrueFocus 
                sentence="AI Art Generator"
                blurAmount={4}
                borderColor="#0284c7" // primary-600 from your tailwind config
                glowColor="rgba(2, 132, 199, 0.6)" // primary-600 with opacity
                animationDuration={0.8}
                pauseBetweenAnimations={2}
                fontSize="5xl md:text-7xl"
                fontWeight="bold"
                startAnimation={showTitleFocus}
                className="text-white text-shadow"
              />
            </div>
          )}
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
