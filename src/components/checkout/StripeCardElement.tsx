
import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { Card, CardContent } from '@/components/ui/card';

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
};

const StripeCardElement: React.FC = () => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6 space-y-4">
        <div className="border rounded-md p-4">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs text-gray-500">
          Toutes les transactions sont sécurisées et cryptées. Les informations de carte de crédit ne sont jamais stockées.
        </p>
      </CardContent>
    </Card>
  );
};

export default StripeCardElement;
