
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Calculate discount price if applicable
  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : null;

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden border-cosmetic-pink/20 product-card-hover">
        <div className="relative pt-[100%] bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {product.isNew && (
            <Badge className="absolute top-2 left-2 bg-cosmetic-darkpink text-white">
              Nouveau
            </Badge>
          )}
          {product.discount && (
            <Badge className="absolute top-2 right-2 bg-cosmetic-gold text-white">
              -{product.discount}%
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-cosmetic-darkpink rounded-full"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <CardContent className="p-4">
          <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-medium text-cosmetic-black mb-1 line-clamp-2">{product.name}</h3>
          <div className="flex items-center space-x-2">
            {discountedPrice ? (
              <>
                <p className="font-bold text-cosmetic-darkpink">{discountedPrice.toFixed(2)}€</p>
                <p className="text-gray-500 line-through text-sm">{product.price.toFixed(2)}€</p>
              </>
            ) : (
              <p className="font-bold text-cosmetic-darkpink">{product.price.toFixed(2)}€</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" /> Ajouter au panier
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
