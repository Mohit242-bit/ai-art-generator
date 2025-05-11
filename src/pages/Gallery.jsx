import React, { useState, useEffect } from 'react';
import { Search, Filter, Image as ImageIcon } from 'lucide-react';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import Button from '../components/ui/Button';
import DecryptedText from '../components/animations/DecryptedText';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate loading saved images
  useEffect(() => {
    const loadImages = async () => {
      // In a real app, this would load from IndexedDB, localStorage, or an API
      const savedImages = localStorage.getItem('aiArtImages');
      
      setTimeout(() => {
        if (savedImages) {
          const parsedImages = JSON.parse(savedImages);
          setImages(parsedImages);
          setFilteredImages(parsedImages);
        }
        setLoading(false);
      }, 800); // Simulate loading delay
    };

    loadImages();
  }, []);

  // Filter images when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredImages(images);
      return;
    }

    const filtered = images.filter(
      img => img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredImages(filtered);
  }, [searchTerm, images]);

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem('aiArtImages', JSON.stringify(updatedImages));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <section className="text-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-primary-800 mb-4">
          <DecryptedText 
            text="Your Gallery"
            speed={40}
            sequential={true}
            revealDirection="center"
            animateOn="view"
            parentClassName="decrypted-text-parent"
            className="text-primary-800"
            encryptedClassName="text-primary-500"
          />
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          <DecryptedText 
            text="Browse, filter, and manage your AI-generated masterpieces."
            speed={30}
            sequential={true}
            animateOn="view"
            parentClassName="decrypted-text-parent"
            className="text-gray-600"
            encryptedClassName="text-gray-400"
          />
        </p>
      </section>

      <Card className="mb-8 animate-slide-in">
        <Card.Body>
          <div className="flex flex-col sm:flex-row gap-4">
            <InputField
              placeholder="Search by prompt..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
              leftIcon={<Search className="h-5 w-5" />}
            />
            
            <Button variant="secondary" className="whitespace-nowrap">
              <Filter className="h-5 w-5 mr-2" />
              Filter
            </Button>
          </div>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="bg-gray-200 h-6 w-24 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 w-32 rounded"></div>
          </div>
        </div>
      ) : (
        <>
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="animate-zoom-in" 
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <Card hoverable className="h-full">
                    <img
                      src={image.url}
                      alt={`AI artwork: ${image.prompt}`}
                      className="w-full h-64 object-cover"
                    />
                    <Card.Body>
                      <p className="text-sm text-gray-700">{image.prompt}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-xs text-gray-500">
                          {new Date(image.timestamp).toLocaleDateString()}
                        </span>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            className="text-blue-600 hover:bg-blue-50"
                            onClick={() => {/* Handle edit */}}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center animate-fade-in">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                <DecryptedText 
                  text="No images found"
                  speed={50}
                  sequential={true}
                  animateOn="view"
                  parentClassName="decrypted-text-parent"
                  className="text-gray-700"
                  encryptedClassName="text-gray-500"
                />
              </h3>
              {searchTerm ? (
                <p className="text-gray-600">
                  No images match your search term. Try a different search.
                </p>
              ) : (
                <p className="text-gray-600">
                  You haven't saved any images yet. Generate and save some artwork first!
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Gallery;
