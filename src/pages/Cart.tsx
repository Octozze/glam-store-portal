
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { 
    cartItems, 
    clearCart, 
    getCartSubtotal, 
    getCartTax, 
    getCartShipping, 
    getCartTotal 
  } = useCart();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Votre Panier</h1>
        <p className="text-gray-600 mb-8">Vérifiez et modifiez votre panier avant de passer à la caisse.</p>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-serif text-xl font-bold">
                    Articles ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                  <Button 
                    variant="ghost" 
                    className="text-cosmetic-darkpink hover:text-cosmetic-darkpink/80 text-sm h-8"
                    onClick={clearCart}
                  >
                    Vider le panier
                  </Button>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map(item => (
                    <CartItem 
                      key={item.product.id} 
                      product={item.product} 
                      quantity={item.quantity} 
                    />
                  ))}
                </div>
                
                <div className="mt-6 text-center md:text-left">
                  <Link to="/products" className="text-cosmetic-darkpink hover:underline inline-flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" /> 
                    Continuer vos achats
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary 
                subtotal={getCartSubtotal()}
                shipping={getCartShipping()}
                tax={getCartTax()}
                total={getCartTotal()}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="flex justify-center mb-4">
              <ShoppingBag className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="font-serif text-2xl font-bold mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">Commencez à magasiner pour ajouter des produits à votre panier.</p>
            <Button 
              className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
              asChild
            >
              <Link to="/products">
                Découvrir nos produits <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
