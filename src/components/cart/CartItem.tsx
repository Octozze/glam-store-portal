
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/product';

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const { addToCart, removeFromCart, updateQuantity } = useCart();

  const incrementQuantity = () => {
    addToCart(product);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  // Calculate discount price if applicable
  const price = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : product.price;

  return (
    <div className="flex items-start py-4 border-b border-gray-200">
      <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">{product.brand}</p>
            <h3 className="font-medium">{product.name}</h3>
            {product.discount && (
              <div className="flex items-center space-x-2 mt-1">
                <p className="text-cosmetic-darkpink font-medium">{price.toFixed(2)}€</p>
                <p className="text-sm text-gray-500 line-through">{product.price.toFixed(2)}€</p>
              </div>
            )}
            {!product.discount && (
              <p className="text-cosmetic-darkpink font-medium mt-1">{price.toFixed(2)}€</p>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-red-500 h-8 w-8"
            onClick={handleRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center border border-gray-300 rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none text-gray-500"
              onClick={decrementQuantity}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none text-gray-500"
              onClick={incrementQuantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <p className="font-medium text-cosmetic-black">
            {(price * quantity).toFixed(2)}€
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
