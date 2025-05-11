import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import InputField from '../ui/InputField';

const PromptForm = ({ onSubmit, loading = false, suggestions = [] }) => {
  const [prompt, setPrompt] = useState('');

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-gray-700 font-medium mb-2">
          What would you like to create?
        </label>
        <InputField
          id="prompt"
          type="textarea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to create in detail..."
          required
          className="h-24"
        />
      </div>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2 animate-fadeIn">
          <span className="text-sm text-gray-600">Try:</span>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="text-sm bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-700 transition-colors duration-200 animate-pulse"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-center pt-2">
        <Button
          type="submit"
          disabled={loading || !prompt.trim()}
          loading={loading}
          icon={<Sparkles className="h-5 w-5" />}
        >
          Generate Image
        </Button>
      </div>
    </form>
  );
};

export default PromptForm;
