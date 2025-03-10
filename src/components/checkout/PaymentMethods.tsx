
import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CreditCard, Calendar, Lock, User, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PaymentMethodsProps {
  shippingInfo: any;
  onOrderComplete: () => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ shippingInfo, onOrderComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const { toast } = useToast();

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Card number formatting (add spaces every 4 digits)
    if (name === 'number') {
      const formattedValue = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .substring(0, 19);
      
      setCardInfo({
        ...cardInfo,
        [name]: formattedValue
      });
      return;
    }
    
    // Expiry date formatting (MM/YY)
    if (name === 'expiry') {
      const formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
      
      setCardInfo({
        ...cardInfo,
        [name]: formattedValue
      });
      return;
    }
    
    // CVC (3-4 digits only)
    if (name === 'cvc') {
      const formattedValue = value.replace(/\D/g, '').substring(0, 4);
      
      setCardInfo({
        ...cardInfo,
        [name]: formattedValue
      });
      return;
    }
    
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (paymentMethod === 'card') {
      if (cardInfo.number.replace(/\s/g, '').length < 16) {
        toast({
          title: "Erreur de paiement",
          description: "Numéro de carte incomplet",
          variant: "destructive"
        });
        return;
      }
      
      if (cardInfo.name.length < 3) {
        toast({
          title: "Erreur de paiement",
          description: "Nom du titulaire requis",
          variant: "destructive"
        });
        return;
      }
      
      if (cardInfo.expiry.length < 5) {
        toast({
          title: "Erreur de paiement",
          description: "Date d'expiration invalide",
          variant: "destructive"
        });
        return;
      }
      
      if (cardInfo.cvc.length < 3) {
        toast({
          title: "Erreur de paiement",
          description: "Code de sécurité (CVC) invalide",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Simulate payment processing
    setIsProcessing(true);
    
    // In a real application, this would be an API call to a payment processor
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Paiement accepté",
        description: "Votre paiement a été traité avec succès.",
      });
      
      // Complete the order
      onOrderComplete();
    }, 2000);
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
          <form onSubmit={handleSubmit}>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
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
              
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="applepay" id="applepay" />
                <Label htmlFor="applepay" className="flex-1 cursor-pointer">
                  <div className="font-medium">Apple Pay</div>
                  <div className="text-sm text-muted-foreground">Paiement rapide avec votre appareil Apple</div>
                </Label>
                <img src="https://raw.githubusercontent.com/danielmconrad/payment-icons/master/min/flat/apple-pay.svg" alt="Apple Pay" className="h-8" />
              </div>
              
              <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod" className="flex-1 cursor-pointer">
                  <div className="font-medium">Paiement à la livraison</div>
                  <div className="text-sm text-muted-foreground">Payez lors de la réception de votre colis</div>
                </Label>
                <div className="text-cosmetic-darkpink font-medium">+5,00€</div>
              </div>
            </RadioGroup>
            
            {paymentMethod === 'card' && (
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Numéro de carte</Label>
                      <div className="relative mt-1">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          id="cardNumber"
                          name="number"
                          className="pl-10"
                          placeholder="4242 4242 4242 4242"
                          value={cardInfo.number}
                          onChange={handleCardInfoChange}
                          maxLength={19}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="cardName">Nom du titulaire</Label>
                      <div className="relative mt-1">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input 
                          id="cardName"
                          name="name"
                          className="pl-10"
                          placeholder="JOHN DOE"
                          value={cardInfo.name}
                          onChange={handleCardInfoChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <div className="relative mt-1">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            id="expiry"
                            name="expiry"
                            className="pl-10"
                            placeholder="MM/YY"
                            value={cardInfo.expiry}
                            onChange={handleCardInfoChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="cvc">CVC</Label>
                        <div className="relative mt-1">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input 
                            id="cvc"
                            name="cvc"
                            className="pl-10"
                            placeholder="123"
                            value={cardInfo.cvc}
                            onChange={handleCardInfoChange}
                            required
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
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
              disabled={isProcessing}
            >
              {isProcessing ? 'Traitement en cours...' : 'Confirmer la commande'}
            </Button>
          </form>
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
            
            <Button
              onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
              className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
              disabled={isProcessing}
            >
              {isProcessing ? 'Traitement en cours...' : 'Confirmer la commande'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentMethods;
