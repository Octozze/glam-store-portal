
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCart } from '@/context/CartContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ChevronLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('shipping');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
    shippingMethod: 'standard' as 'standard' | 'express' | 'relais'
  });
  
  // Function for completing order - in a real app this would communicate with a backend
  const completeOrder = () => {
    // Generate a unique order number
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const newOrderNumber = `CMD-${timestamp}-${random}`;
    
    setOrderNumber(newOrderNumber);
    
    // Simulate API call delay
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      // In a real app, you would create an order record in the database here
    }, 1500);
  };
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Panier vide</AlertTitle>
            <AlertDescription>
              Votre panier est vide. Ajoutez des produits avant de passer à la caisse.
            </AlertDescription>
          </Alert>
          <Button asChild>
            <Link to="/products">Découvrir nos produits</Link>
          </Button>
        </div>
      </Layout>
    );
  }
  
  // If order was successfully placed
  if (orderPlaced) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="bg-green-50 rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-gray-900 mb-3">Commande confirmée !</h1>
            <p className="text-gray-600 mb-2">
              Merci pour votre commande. Vous recevrez un e-mail de confirmation avec les détails de livraison.
            </p>
            {orderNumber && (
              <p className="text-cosmetic-darkpink font-medium mb-6">
                N° de commande: {orderNumber}
              </p>
            )}
            <div className="space-y-4">
              <Button asChild className="w-full">
                <Link to="/products">Continuer mes achats</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/profile">Voir mes commandes</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleShippingSubmit = (data: any) => {
    setShippingInfo(data);
    setActiveTab('payment');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate('/cart')} className="mr-2">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Retour au panier
          </Button>
          <h1 className="font-serif text-2xl md:text-3xl font-bold">Paiement</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main checkout content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="shipping" className="flex-1">Livraison</TabsTrigger>
                <TabsTrigger value="payment" className="flex-1" disabled={!shippingInfo.address}>
                  Paiement
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="shipping">
                <ShippingForm
                  onSubmit={handleShippingSubmit}
                  initialData={shippingInfo}
                />
              </TabsContent>
              
              <TabsContent value="payment">
                <PaymentMethods
                  shippingInfo={shippingInfo}
                  onOrderComplete={completeOrder}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Order summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              cartItems={cartItems}
              shippingMethod={shippingInfo.shippingMethod}
              shippingAddress={shippingInfo.address ? 
                `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}` : 
                undefined
              }
              orderNumber={orderNumber}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
