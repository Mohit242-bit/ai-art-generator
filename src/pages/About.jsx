import React from 'react';
import { Sparkles, Code, PenTool, Palette, Zap } from 'lucide-react';
import Card from '../components/ui/Card';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="text-center mb-12 animate-fade-in">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-800 mb-4">
          About AI Art Generator
        </h1>
        <p className="text-lg text-gray-600">
          A free, creative tool to generate and customize AI artwork
        </p>
      </section>

      <div className="animate-slide-in" style={{ animationDelay: '200ms' }}>
        <Card className="mb-10">
          <Card.Body>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Sparkles className="h-6 w-6 text-primary-600 mr-2" />
              What is AI Art Generator?
            </h2>
            <p className="text-gray-700 mb-4">
              AI Art Generator is a web application that allows you to create stunning artwork using artificial intelligence. 
              Simply enter a text description (prompt), and our AI will generate an image based on your words.
            </p>
            <p className="text-gray-700">
              After generating your image, you can add glitch effects, customize it further, and download your creations for personal use.
              It's a fun and accessible way to explore AI art creation without any technical knowledge or expensive software.
            </p>
          </Card.Body>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="animate-slide-in" style={{ animationDelay: '400ms' }}>
          <Card>
            <Card.Body>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="h-5 w-5 text-primary-600 mr-2" />
                How It Works
              </h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700 pl-2">
                <li>Enter a prompt describing your desired image</li>
                <li>Our AI generates an image based on your description</li>
                <li>Add effects and customize your creation</li>
                <li>Download and share your artwork</li>
              </ol>
            </Card.Body>
          </Card>
        </div>

        <div className="animate-slide-in" style={{ animationDelay: '500ms' }}>
          <Card>
            <Card.Body>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <PenTool className="h-5 w-5 text-primary-600 mr-2" />
                Features
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="bg-primary-100 p-1 rounded mr-2 text-primary-800">✓</span>
                  <span>Text-to-image AI generation</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 p-1 rounded mr-2 text-primary-800">✓</span>
                  <span>Customizable glitch effects</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 p-1 rounded mr-2 text-primary-800">✓</span>
                  <span>Image editing and filtering</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary-100 p-1 rounded mr-2 text-primary-800">✓</span>
                  <span>Free and open-source</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="animate-zoom-in" style={{ animationDelay: '600ms' }}>
        <Card>
          <Card.Body>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Code className="h-6 w-6 text-primary-600 mr-2" />
              Technologies Used
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: "React", category: "Frontend" },
                { name: "Tailwind CSS", category: "Styling" },
                { name: "Hugging Face", category: "AI API" },
                { name: "glitch-canvas", category: "Effects" },
                { name: "Three.js", category: "3D Graphics" },
                { name: "Vite", category: "Build Tool" }
              ].map((tech, index) => (
                <div 
                  key={tech.name} 
                  className="bg-gray-50 p-4 rounded-lg text-center transform transition-transform hover:scale-105 duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 500ms ease-out forwards'
                  }}
                >
                  <div className="font-medium text-gray-800">{tech.name}</div>
                  <div className="text-sm text-gray-600">{tech.category}</div>
                </div>
              ))}
            </div>
            <style jsx>{`
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default About;
