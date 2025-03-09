
import React, { useState } from 'react';
import { Star, Truck, ShieldCheck, RotateCcw, ShoppingBag, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Calculate discount price if applicable
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {/* Product Image */}
      <div className="relative">
        <div className="aspect-square bg-gray-100 overflow-hidden rounded-md">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        {product.isNew && (
          <Badge className="absolute top-4 left-4 bg-cosmetic-darkpink text-white">
            Nouveau
          </Badge>
        )}
        {product.discount && (
          <Badge className="absolute top-4 right-4 bg-cosmetic-gold text-white">
            -{product.discount}%
          </Badge>
        )}
      </div>

      {/* Product Info */}
      <div>
        <p className="text-gray-500 mb-2">{product.brand}</p>
        <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'fill-cosmetic-gold text-cosmetic-gold' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="ml-2 text-sm text-gray-500">
              {product.rating.toFixed(1)} ({product.reviews} avis)
            </p>
          </div>
        )}

        {/* Price */}
        <div className="mb-6">
          {discountedPrice ? (
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold text-cosmetic-darkpink">{discountedPrice.toFixed(2)}€</p>
              <p className="text-gray-500 line-through">{product.price.toFixed(2)}€</p>
              <Badge className="bg-cosmetic-gold text-white">Économisez {product.discount}%</Badge>
            </div>
          ) : (
            <p className="text-2xl font-bold text-cosmetic-darkpink">{product.price.toFixed(2)}€</p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Quantity */}
        <div className="flex items-center mb-6">
          <span className="mr-4 font-medium">Quantité:</span>
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-none text-gray-500"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-none text-gray-500"
              onClick={incrementQuantity}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Add to Cart & Wishlist */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mb-8">
          <Button 
            className="flex-1 bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-5 w-5" /> Ajouter au panier
          </Button>
          <Button variant="outline" className="flex-1 border-cosmetic-darkpink text-cosmetic-darkpink hover:bg-cosmetic-pink/20">
            <Heart className="mr-2 h-5 w-5" /> Ajouter aux favoris
          </Button>
        </div>

        {/* Shipping & Returns */}
        <div className="border-t border-b border-gray-200 py-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-cosmetic-darkpink mr-2" />
              <span className="text-sm">Livraison gratuite dès 50€</span>
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-cosmetic-darkpink mr-2" />
              <span className="text-sm">Garantie qualité</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 text-cosmetic-darkpink mr-2" />
              <span className="text-sm">Retours sous 30 jours</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="ingredients">Ingrédients</TabsTrigger>
            <TabsTrigger value="how-to-use">Utilisation</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="text-sm text-gray-700 mt-4">
            <p>{product.description}</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Type de peau: {product.skinType?.join(', ') || 'Tous types de peau'}</li>
              <li>Catégorie: {product.category}</li>
              <li>Marque: {product.brand}</li>
            </ul>
          </TabsContent>
          <TabsContent value="ingredients" className="text-sm text-gray-700 mt-4">
            <p>{product.ingredients || 'Informations sur les ingrédients à venir.'}</p>
          </TabsContent>
          <TabsContent value="how-to-use" className="text-sm text-gray-700 mt-4">
            <p>Appliquer sur peau propre. Pour de meilleurs résultats, utiliser matin et soir.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
