import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <FadeIn duration={500}>
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-primary-700">AI Art Generator</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-300 hover:text-primary-600 ${
                  location.pathname === link.path ? 'text-primary-600' : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <SlideDown duration={300}>
            <div className="md:hidden px-4 py-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block py-2 px-4 font-medium ${
                    location.pathname === link.path ? 'text-primary-600 bg-primary-50' : 'text-gray-600'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </SlideDown>
        )}
      </nav>
    </FadeIn>
  );
};

export default Navbar;
