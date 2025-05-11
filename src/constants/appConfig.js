/**
 * Application Configuration
 */

// API Configuration
export const API_CONFIG = {
  // Hugging Face API
  huggingFace: {
    name: 'Hugging Face (Stable Diffusion)',
    url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
    headers: {
      'Content-Type': 'application/json',
      // NOTE: Set your API key in .env file and uncomment the line below
      // 'Authorization': `Bearer ${import.meta.env.VITE_HF_API_KEY}`
    }
  },
  
  // Craiyon API
  craiyon: {
    name: 'Craiyon',
    url: 'https://api.craiyon.com/v3',
    headers: {
      'Content-Type': 'application/json'
    }
  }
};

// Glitch Effect Presets
export const GLITCH_PRESETS = {
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

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' }
];

// App Settings
export const APP_SETTINGS = {
  title: 'AI Art Generator',
  description: 'Create stunning AI-generated artwork with just a text prompt',
  theme: {
    primary: 'indigo',
    secondary: 'purple',
  },
  storage: {
    imagesKey: 'aiArtImages',
    promptHistoryKey: 'promptHistory'
  }
};
