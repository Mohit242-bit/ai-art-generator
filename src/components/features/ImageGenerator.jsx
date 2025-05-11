import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import LoadingSpinner from '../ui/LoadingSpinner';

// Sample prompt suggestions
const promptSuggestions = [
  "cyberpunk city at sunset with neon lights",
  "dreamy forest with magical creatures",
  "surreal floating islands with waterfalls",
  "retro synthwave landscape with sun grid"
];

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  // Simulate image generation
  const handleGenerateImage = () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError(null);
    setIsGenerating(true);

    // Simulate API call delay
    setTimeout(() => {
      // For now, we'll use a placeholder image
      const placeholderImages = [
        'https://source.unsplash.com/random/800x600/?cyberpunk',
        'https://source.unsplash.com/random/800x600/?nature',
        'https://source.unsplash.com/random/800x600/?fantasy',
        'https://source.unsplash.com/random/800x600/?art'
      ];

      // Use a random placeholder based on the prompt content
      const randomIndex = Math.floor(Math.random() * placeholderImages.length);
      setGeneratedImage({
        id: Date.now(),
        url: placeholderImages[randomIndex],
        prompt: prompt,
        timestamp: new Date().toISOString()
      });
      
      setIsGenerating(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-visible">
        <Card.Body>
          <form onSubmit={(e) => { e.preventDefault(); handleGenerateImage(); }} className="space-y-4">
            <div>
              <label htmlFor="prompt" className="block text-gray-700 font-medium mb-2">
                Enter your prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create..."
                className="input-field h-24 resize-none"
                required
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-gray-600">Try:</span>
              {promptSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            
            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isGenerating}
                className="btn-primary"
              >
                {isGenerating ? 'Generating...' : 'Generate Image'}
              </Button>
            </div>
            
            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}
          </form>
        </Card.Body>
      </Card>

      {isGenerating && (
        <div className="text-center py-10">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">Generating your masterpiece...</p>
        </div>
      )}

      {generatedImage && !isGenerating && (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Creation</h2>
          <Card className="overflow-hidden">
            <img 
              src={generatedImage.url} 
              alt={`Generated from: ${generatedImage.prompt}`}
              className="w-full h-64 object-cover"
            />
            <Card.Body>
              <p className="text-gray-600">{generatedImage.prompt}</p>
              <div className="mt-4 flex justify-between">
                <Button variant="secondary">
                  Apply Effects
                </Button>
                <Button variant="primary">
                  Download
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}

      {!generatedImage && !isGenerating && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No images generated yet</h3>
          <p className="text-gray-600 mb-4">
            Enter a prompt above to create your first AI-generated image!
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
