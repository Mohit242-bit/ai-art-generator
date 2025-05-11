import { useState, useCallback } from 'react';

// Configuration for different AI providers
const providers = {
  huggingFace: {
    name: 'Hugging Face (Stable Diffusion)',
    url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    headers: {
      'Content-Type': 'application/json',
      // Note: You would set API key in .env file and access it via import.meta.env.VITE_HF_API_KEY
      // 'Authorization': `Bearer ${import.meta.env.VITE_HF_API_KEY}`
    }
  },
  craiyon: {
    name: 'Craiyon',
    url: 'https://api.craiyon.com/v3',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

/**
 * Hook for handling AI image generation
 * @param {string} defaultProvider - The default provider to use
 * @returns {Object} - Hook methods and state
 */
const useImageGeneration = (defaultProvider = 'huggingFace') => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProvider, setCurrentProvider] = useState(defaultProvider);
  const [promptHistory, setPromptHistory] = useState(() => {
    const saved = localStorage.getItem('promptHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Save prompt history to localStorage whenever it changes
  const savePromptToHistory = useCallback((prompt) => {
    const newHistory = [
      { prompt, timestamp: Date.now() }, 
      ...promptHistory.slice(0, 9)
    ];
    setPromptHistory(newHistory);
    localStorage.setItem('promptHistory', JSON.stringify(newHistory));
  }, [promptHistory]);

  // Function to generate image based on provider
  const generateImage = useCallback(async (prompt, options = {}) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    const provider = providers[currentProvider];
    if (!provider) {
      setError('Invalid provider selected');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Save to history
      savePromptToHistory(prompt);
      
      // Prepare request based on provider
      const requestBody = currentProvider === 'huggingFace' 
        ? JSON.stringify({ inputs: prompt, ...options })
        : JSON.stringify({ prompt, ...options });
      
      // Make API call
      const response = await fetch(provider.url, {
        method: 'POST',
        headers: provider.headers,
        body: requestBody
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      // Handle response based on provider
      if (currentProvider === 'huggingFace') {
        // HF returns binary image data
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImages([{ url: imageUrl, prompt, timestamp: Date.now() }, ...images]);
      } else if (currentProvider === 'craiyon') {
        // Craiyon returns JSON with image URLs
        const data = await response.json();
        const newImages = data.images.map(img => ({
          url: img,
          prompt,
          timestamp: Date.now()
        }));
        setImages([...newImages, ...images]);
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.message || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  }, [currentProvider, images, savePromptToHistory]);

  // Function to clear all generated images
  const clearImages = useCallback(() => {
    // Revoke object URLs to prevent memory leaks
    images.forEach(img => {
      if (img.url.startsWith('blob:')) {
        URL.revokeObjectURL(img.url);
      }
    });
    setImages([]);
  }, [images]);

  // Change the current provider
  const changeProvider = useCallback((providerKey) => {
    if (providers[providerKey]) {
      setCurrentProvider(providerKey);
    }
  }, []);

  return {
    images,
    loading,
    error,
    generateImage,
    clearImages,
    currentProvider,
    changeProvider,
    providers: Object.keys(providers).map(key => ({
      key,
      name: providers[key].name
    })),
    promptHistory
  };
};

export default useImageGeneration;
