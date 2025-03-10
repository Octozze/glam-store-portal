
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CreditCard, Calendar, Lock, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import StripeCardElement from './StripeCardElement';

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe('pk_test_51OxCPjJ0aVJxvZuQSN8I9YzUDWYNDc9Xa6YbQ8hRhqOJkxYSgzj0q58YcupwlvZFDC7u45HYTx3UlfMTtLzDhBYX00f6rHnwrE');

interface PaymentMethodsProps {
  shippingInfo: any;
  onOrderComplete: () => void;
}

const PaymentForm: React.FC<{ 
  paymentMethod: string;
  onSubmit: (e: React.FormEvent) => void;
  isProcessing: boolean;
  paymentError: string | null;
}> = ({ paymentMethod, onSubmit, isProcessing, paymentError }) => {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <form onSubmit={onSubmit}>
      {paymentError && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erreur de paiement</AlertTitle>
          <AlertDescription>{paymentError}</AlertDescription>
        </Alert>
      )}
      
      <RadioGroup 
        value={paymentMethod} 
        defaultValue="card"
        className="flex flex-col space-y-3 mb-6"
      >
        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
          <RadioGroupItem value="card" id="card" />
          <Label htmlFor="card" className="flex-1 cursor-pointer">
            <div className="font-medium">Carte bancaire</div>
            <div className="text-sm text-muted-foreground">Visa, Mastercard, AMEX</div>
          </Label>
          <div className="flex items-center space-x-2">
            <img src="https://raw.githubusercontent.com/danielmconrad/payment-icons/master/min/flat/visa.svg" alt="Visa" className="h-8" />
            <img src="https://raw.githubusercontent.com/danielmconrad/payment-icons/master/min/flat/mastercard.svg" alt="Mastercard" className="h-8" />
            <img src="https://raw.githubusercontent.com/danielmconrad/payment-icons/master/min/flat/amex.svg" alt="Amex" className="h-8" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
          <RadioGroupItem value="paypal" id="paypal" />
          <Label htmlFor="paypal" className="flex-1 cursor-pointer">
            <div className="font-medium">PayPal</div>
            <div className="text-sm text-muted-foreground">Paiement rapide et sécurisé</div>
          </Label>
          <img src="https://raw.githubusercontent.com/danielmconrad/payment-icons/master/min/flat/paypal.svg" alt="PayPal" className="h-8" />
        </div>
      </RadioGroup>
      
      {paymentMethod === 'card' && <StripeCardElement />}
      
      {paymentMethod === 'paypal' && (
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="mb-4">Vous serez redirigé vers PayPal pour effectuer votre paiement en toute sécurité.</p>
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" alt="PayPal payment options" className="mx-auto" />
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="flex items-center space-x-2 mb-6">
        <div className="border border-green-500 rounded-full p-0.5">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </div>
        <span className="text-sm text-gray-500">Paiement sécurisé avec cryptage SSL 256-bit</span>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? 'Traitement en cours...' : 'Confirmer la commande'}
      </Button>
    </form>
  );
};

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ shippingInfo, onOrderComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const { toast } = useToast();

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value);
    setPaymentError(null); // Clear any previous errors
  };

  const processCardPayment = async (stripe: any, elements: any) => {
    if (!stripe || !elements) {
      setPaymentError("Impossible de se connecter au service de paiement. Veuillez réessayer.");
      return false;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setPaymentError("Erreur lors de la récupération des informations de carte.");
      return false;
    }

    // In a real application, you would create a payment intent on your server
    // and pass the client secret to the frontend
    
    // Mock successful payment for this example
    // In a real app, this would be:
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: 'card',
    //   card: cardElement,
    // });
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 90% chance of success for testing purposes
    const isSuccessful = Math.random() < 0.9;
    
    if (!isSuccessful) {
      setPaymentError("Votre carte a été refusée. Veuillez vérifier vos informations ou essayer une autre méthode de paiement.");
      return false;
    }
    
    return true;
  };

  const processPayPalPayment = async () => {
    // Simulate PayPal payment process
    // In a real app, you would redirect to PayPal or use their SDK
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 90% chance of success for testing purposes
    const isSuccessful = Math.random() < 0.9;
    
    if (!isSuccessful) {
      setPaymentError("Erreur lors du traitement du paiement PayPal. Veuillez réessayer.");
      return false;
    }
    
    return true;
  };

  const generateOrderNumber = () => {
    const timestamp = new Date().getTime().toString().slice(-8);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `CMD-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      let paymentSuccessful = false;
      
      if (paymentMethod === 'card') {
        const stripe = await stripePromise;
        const elements = stripe?.elements();
        
        if (stripe && elements) {
          paymentSuccessful = await processCardPayment(stripe, elements);
        } else {
          throw new Error("Service de paiement non disponible");
        }
      } else if (paymentMethod === 'paypal') {
        paymentSuccessful = await processPayPalPayment();
      }
      
      if (paymentSuccessful) {
        const newOrderNumber = generateOrderNumber();
        setOrderNumber(newOrderNumber);
        
        // In a real app, you would store the order in the database here
        
        toast({
          title: "Paiement accepté",
          description: `Commande #${newOrderNumber} confirmée. Un email de confirmation vous a été envoyé.`,
        });
        
        // Complete the order flow
        onOrderComplete();
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors du traitement du paiement. Veuillez réessayer."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-serif font-bold mb-6">Mode de paiement</h2>
      
      <Tabs defaultValue="options" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="options" className="flex-1">Options de paiement</TabsTrigger>
          <TabsTrigger value="review" className="flex-1">Vérifier la commande</TabsTrigger>
        </TabsList>
        
        <TabsContent value="options">
          <Elements stripe={stripePromise}>
            <PaymentForm
              paymentMethod={paymentMethod}
              onSubmit={handleSubmit}
              isProcessing={isProcessing}
              paymentError={paymentError}
            />
          </Elements>
        </TabsContent>
        
        <TabsContent value="review">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Résumé de la commande</h3>
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Adresse de livraison</h4>
                  <div className="text-gray-600">
                    <p>{shippingInfo.fullName}</p>
                    <p>{shippingInfo.address}</p>
                    <p>{shippingInfo.postalCode} {shippingInfo.city}</p>
                    <p>{shippingInfo.country}</p>
                    <p>Tél: {shippingInfo.phone}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Mode de livraison</h4>
                  <div className="text-gray-600">
                    {shippingInfo.shippingMethod === 'standard' && <p>Livraison Standard (2-3 jours ouvrés)</p>}
                    {shippingInfo.shippingMethod === 'express' && <p>Livraison Express (24-48h)</p>}
                    {shippingInfo.shippingMethod === 'relais' && <p>Point Relais (3-4 jours ouvrés)</p>}
                  </div>
                </div>
              </div>
            </div>
            
            <Elements stripe={stripePromise}>
              <PaymentForm
                paymentMethod={paymentMethod}
                onSubmit={handleSubmit}
                isProcessing={isProcessing}
                paymentError={paymentError}
              />
            </Elements>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentMethods;
