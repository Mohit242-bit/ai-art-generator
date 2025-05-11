import React, { useState } from 'react';

/**
 * A simple overlay component that adds hover effects
 * without modifying the existing GridDistortion component
 */
const HoverEffectOverlay = ({ className = '' }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };
  
  return (
    <div 
      className={`hover-effect-overlay ${className}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        pointerEvents: 'auto',
        cursor: 'pointer',
      }}
    >
      {/* Only show effects when hovering */}
      {isHovering && (
        <>
          {/* Glitch lines */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              style={{
                position: 'absolute',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 60 + 40}px`,
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                boxShadow: '0 0 8px rgba(0, 255, 255, 0.8)',
                opacity: 0.7,
                transform: `rotate(${Math.random() * 180}deg)`,
                pointerEvents: 'none',
              }}
            />
          ))}
          
          {/* Glowing circle following mouse */}
          <div 
            style={{
              position: 'absolute',
              left: `${mousePos.x}%`,
              top: `${mousePos.y}%`,
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(0,212,255,0) 70%)',
              pointerEvents: 'none',
              zIndex: 20,
            }}
          />
          
          {/* Color overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0, 100, 255, 0.1)',
              mixBlendMode: 'overlay',
              pointerEvents: 'none',
            }}
          />
        </>
      )}
    </div>
  );
};

export default HoverEffectOverlay;s
