import { useState, useCallback } from 'react';
import glitch from 'glitch-canvas';

/**
 * Custom hook for applying glitch effects to images
 */
const useGlitchEffect = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  // Predefined glitch presets
  const presets = {
    mild: {
      amount: 10,
      iterations: 20,
      quality: 30,
      seed: Math.random() * 100
    },
    medium: {
      amount: 35,
      iterations: 40,
      quality: 30,
      seed: Math.random() * 100
    },
    heavy: {
      amount: 70,
      iterations: 60,
      quality: 30,
      seed: Math.random() * 100
    },
    crazy: {
      amount: 99,
      iterations: 99,
      quality: 30,
      seed: Math.random() * 100
    },
    cyberpunk: {
      amount: 50,
      iterations: 30,
      quality: 15,
      seed: Math.random() * 100
    },
    retro: {
      amount: 35,
      iterations: 15,
      quality: 70,
      seed: Math.random() * 100
    }
  };

  /**
   * Apply glitch effect to an image
   * 
   * @param {string} imageUrl - URL of the image to glitch
   * @param {Object} parameters - Glitch parameters
   * @param {number} parameters.amount - Amount of glitch (1-99)
   * @param {number} parameters.iterations - Number of iterations (1-99)
   * @param {number} parameters.quality - JPEG quality (1-99)
   * @param {number} parameters.seed - Random seed
   * @returns {Promise<string>} - URL of the glitched image
   */
  const applyGlitchEffect = useCallback(async (imageUrl, parameters = presets.medium) => {
    setProcessing(true);
    setError(null);
    
    try {
      // Load the image
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      
      // Return a promise that resolves with the glitched image
      return new Promise((resolve, reject) => {
        image.onload = () => {
          // Create a canvas to draw the image
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0);
          
          // Get image data from canvas
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          // Apply glitch effect
          glitch(parameters)
            .fromImageData(imageData)
            .toImageData()
            .then(glitchedImageData => {
              // Draw glitched image data back to canvas
              ctx.putImageData(glitchedImageData, 0, 0);
              
              // Convert canvas to data URL
              const glitchedImageUrl = canvas.toDataURL('image/jpeg', 0.85);
              setProcessing(false);
              resolve(glitchedImageUrl);
            })
            .catch(err => {
              setError('Failed to apply glitch effect');
              setProcessing(false);
              reject(err);
            });
        };
        
        image.onerror = () => {
          setError('Failed to load image');
          setProcessing(false);
          reject(new Error('Failed to load image'));
        };
        
        // Start loading the image
        image.src = imageUrl;
      });
    } catch (err) {
      setError(err.message || 'An error occurred');
      setProcessing(false);
      throw err;
    }
  }, []);

  /**
   * Apply a specific preset glitch effect
   * 
   * @param {string} imageUrl - URL of the image to glitch
   * @param {string} presetName - Name of the preset to apply
   * @returns {Promise<string>} - URL of the glitched image
   */
  const applyPreset = useCallback((imageUrl, presetName) => {
    if (!presets[presetName]) {
      setError(`Preset "${presetName}" does not exist`);
      return Promise.reject(new Error(`Preset "${presetName}" does not exist`));
    }
    
    return applyGlitchEffect(imageUrl, presets[presetName]);
  }, [applyGlitchEffect]);

  return {
    processing,
    error,
    applyGlitchEffect,
    applyPreset,
    presets: Object.keys(presets),
  };
};

export default useGlitchEffect;
