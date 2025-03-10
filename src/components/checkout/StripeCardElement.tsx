
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
  hidePostalCode: true,
};

interface StripeCardElementProps {
  amount: number;
  onSuccess: (orderNumber: string) => void;
  onError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}

const StripeCardElement: React.FC<StripeCardElementProps> = ({ 
  amount, 
  onSuccess, 
  onError, 
  isProcessing, 
  setIsProcessing 
}) => {
  const [cardError, setCardError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);
    setCardError(null);

    try {
      // In a real implementation, you would send a request to your server
      // which would create a PaymentIntent and return the client_secret
      
      // Mock payment intent creation, normally done on the server
      const clientSecret = 'mock_client_secret';
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This is where you would confirm the payment with Stripe
      // For now, let's just simulate a successful payment
      const success = Math.random() > 0.2; // 80% success rate
      
      if (success) {
        // Generate a random order number
        const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        
        toast({
          title: 'Paiement réussi',
          description: `Votre paiement de ${amount.toFixed(2)}€ a été traité avec succès.`,
        });
        
        onSuccess(orderNumber);
      } else {
        throw new Error('Votre carte a été refusée. Veuillez essayer avec une autre carte.');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors du traitement du paiement.';
      setCardError(errorMessage);
      onError(errorMessage);
      
      toast({
        title: 'Erreur de paiement',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardChange = (event: any) => {
    setCardError(event.error ? event.error.message : null);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="border rounded-md p-4">
            <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
          </div>
          
          {cardError && (
            <div className="mt-3 text-red-500 text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {cardError}
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full mt-4 bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
            disabled={!stripe || isProcessing}
          >
            {isProcessing 
              ? "Traitement en cours..." 
              : `Payer ${amount.toFixed(2)}€`
            }
          </Button>
        </form>
        
        <div className="flex items-center justify-center text-xs text-gray-500 mt-4">
          <Lock className="h-3 w-3 mr-1" />
          Toutes les transactions sont sécurisées et cryptées. Les informations de carte de crédit ne sont jamais stockées.
        </div>
      </CardContent>
    </Card>
  );
};

export default StripeCardElement;
