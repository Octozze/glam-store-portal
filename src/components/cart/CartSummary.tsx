
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, CreditCard } from 'lucide-react';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ subtotal, shipping, tax, total }) => {
  const { cartItems } = useCart();
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h2 className="font-serif text-xl font-bold mb-4">Résumé de la commande</h2>
      
      <div className="space-y-3 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span>{subtotal.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Frais de livraison</span>
          <span>{shipping === 0 ? 'Gratuit' : `${shipping.toFixed(2)}€`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">TVA</span>
          <span>{tax.toFixed(2)}€</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between font-bold text-lg mb-6">
        <span>Total</span>
        <span className="text-cosmetic-darkpink">{total.toFixed(2)}€</span>
      </div>
      
      <Button 
        className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
        disabled={cartItems.length === 0}
        asChild
      >
        <Link to="/checkout" className="flex items-center justify-center">
          <CreditCard className="mr-2 h-4 w-4" />
          Passer à la caisse
        </Link>
      </Button>
      
      <p className="text-center text-xs text-gray-500 mt-4">
        Paiements sécurisés. Livraison gratuite à partir de 50€ d'achat.
      </p>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <Link to="/products" className="text-cosmetic-darkpink hover:underline inline-flex items-center text-sm">
          <ShoppingBag className="mr-2 h-3 w-3" /> 
          Continuer vos achats
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
