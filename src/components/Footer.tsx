
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cosmetic-cream border-t border-cosmetic-pink">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">
              <span className="text-cosmetic-darkpink">Belle</span>Cosmetics
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Des produits cosmétiques de qualité pour sublimer votre beauté naturelle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-cosmetic-darkpink hover:text-cosmetic-black transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cosmetic-darkpink hover:text-cosmetic-black transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-cosmetic-darkpink hover:text-cosmetic-black transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-serif font-bold mb-4">Boutique</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link to="/products?category=skincare" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Soins de la peau
                </Link>
              </li>
              <li>
                <Link to="/products?category=makeup" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Maquillage
                </Link>
              </li>
              <li>
                <Link to="/products?category=fragrance" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Parfums
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-serif font-bold mb-4">Aide</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-serif font-bold mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Conditions générales
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-cosmetic-darkpink transition-colors">
                  Carrières
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cosmetic-pink mt-8 pt-8 text-sm text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} BelleCosmetics. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
