
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';

const Header: React.FC = () => {
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white bg-opacity-95 backdrop-blur-sm border-b border-cosmetic-pink shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-cosmetic-black">
              <span className="text-cosmetic-darkpink">Belle</span>Cosmetics
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors">
              Accueil
            </Link>
            <Link to="/products" className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors">
              Produits
            </Link>
            <Link to="/about" className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors">
              À propos
            </Link>
            <Link to="/contact" className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-cosmetic-black hover:text-cosmetic-darkpink">
              <Search size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="text-cosmetic-black hover:text-cosmetic-darkpink">
              <User size={20} />
            </Button>
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="text-cosmetic-black hover:text-cosmetic-darkpink">
                <ShoppingBag size={20} />
              </Button>
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-cosmetic-darkpink text-white text-xs h-5 w-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </Badge>
              )}
            </Link>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-cosmetic-black hover:text-cosmetic-darkpink"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/products" 
                className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
              <Link 
                to="/about" 
                className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="text-cosmetic-black hover:text-cosmetic-darkpink font-medium transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
