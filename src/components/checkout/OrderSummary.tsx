
import React from 'react';
import { CartItem } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';

interface OrderSummaryProps {
  cartItems: CartItem[];
  shippingMethod?: string;
  shippingAddress?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, shippingMethod, shippingAddress }) => {
  // Calculate totals
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product.discount 
        ? item.product.price - (item.product.price * item.product.discount / 100)
        : item.product.price;
      return total + (price * item.quantity);
    }, 0);
  };
  
  const getShippingCost = () => {
    const subtotal = getSubtotal();
    if (subtotal >= 50) return 0;
    
    switch (shippingMethod) {
      case 'standard':
        return 4.90;
      case 'express':
        return 9.90;
      case 'relais':
        return 3.90;
      default:
        return 4.90;
    }
  };
  
  const getTax = () => {
    return getSubtotal() * 0.2; // 20% VAT
  };
  
  const getTotal = () => {
    return getSubtotal() + getShippingCost() + getTax();
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 sticky top-8">
      <h2 className="font-serif text-xl font-bold mb-4">Résumé de la commande</h2>
      
      <div className="mb-4">
        {cartItems.map((item) => {
          const price = item.product.discount 
            ? item.product.price - (item.product.price * item.product.discount / 100)
            : item.product.price;
          
          return (
            <div key={item.product.id} className="flex justify-between items-start py-2">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-100 rounded flex-shrink-0 mr-3 overflow-hidden">
                  {item.product.images && item.product.images.length > 0 && (
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">Qté: {item.quantity}</p>
                </div>
              </div>
              <p className="font-medium">{(price * item.quantity).toFixed(2)}€</p>
            </div>
          );
        })}
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span>{getSubtotal().toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Frais de livraison</span>
          <span>{getShippingCost() === 0 ? 'Gratuit' : `${getShippingCost().toFixed(2)}€`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">TVA (20%)</span>
          <span>{getTax().toFixed(2)}€</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span className="text-cosmetic-darkpink">{getTotal().toFixed(2)}€</span>
      </div>
      
      {shippingAddress && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="font-medium mb-2">Adresse de livraison</h3>
          <p className="text-sm text-gray-600">{shippingAddress}</p>
        </div>
      )}
      
      <div className="mt-6">
        <div className="flex items-center bg-green-50 p-3 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <p className="text-sm">Livraison gratuite à partir de 50€ d'achat</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
