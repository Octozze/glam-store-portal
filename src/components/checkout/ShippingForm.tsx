
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, Home, MapPin, Phone } from 'lucide-react';

// Validation schema
const shippingSchema = z.object({
  fullName: z.string().min(2, { message: 'Le nom est requis (2 caractères minimum)' }),
  email: z.string().email({ message: 'Email invalide' }),
  address: z.string().min(5, { message: 'Adresse requise (5 caractères minimum)' }),
  city: z.string().min(2, { message: 'Ville requise' }),
  postalCode: z.string().regex(/^\d{5}$/, { message: 'Code postal invalide (5 chiffres)' }),
  country: z.string().min(1, { message: 'Pays requis' }),
  phone: z.string().regex(/^((\+)33|0)[1-9](\d{2}){4}$/, { message: 'Numéro de téléphone invalide' }),
  shippingMethod: z.enum(['standard', 'express', 'relais'], { 
    required_error: 'Sélectionnez un mode de livraison' 
  })
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

interface ShippingFormProps {
  onSubmit: (data: ShippingFormValues) => void;
  initialData?: Partial<ShippingFormValues>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({ onSubmit, initialData = {} }) => {
  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: initialData.fullName || '',
      email: initialData.email || '',
      address: initialData.address || '',
      city: initialData.city || '',
      postalCode: initialData.postalCode || '',
      country: initialData.country || 'France',
      phone: initialData.phone || '',
      shippingMethod: initialData.shippingMethod || 'standard'
    }
  });
  
  const handleSubmit = (data: ShippingFormValues) => {
    onSubmit(data);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h2 className="text-xl font-serif font-bold mb-6">Informations de livraison</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom complet</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input className="pl-10" placeholder="Jean Dupont" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input className="pl-10" placeholder="jean.dupont@exemple.com" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input className="pl-10" placeholder="15 Rue de Paris" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input className="pl-10" placeholder="Paris" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="75001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="France">France</SelectItem>
                      <SelectItem value="Belgique">Belgique</SelectItem>
                      <SelectItem value="Suisse">Suisse</SelectItem>
                      <SelectItem value="Luxembourg">Luxembourg</SelectItem>
                      <SelectItem value="Canada">Canada</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input className="pl-10" placeholder="0612345678" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-4">
            <FormField
              control={form.control}
              name="shippingMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Mode de livraison</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="flex-1 cursor-pointer">
                          <div className="font-medium">Livraison Standard</div>
                          <div className="text-sm text-muted-foreground">2-3 jours ouvrés - 4,90€</div>
                        </Label>
                        <div className="text-cosmetic-darkpink font-medium">4,90€</div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="flex-1 cursor-pointer">
                          <div className="font-medium">Livraison Express</div>
                          <div className="text-sm text-muted-foreground">24-48h - 9,90€</div>
                        </Label>
                        <div className="text-cosmetic-darkpink font-medium">9,90€</div>
                      </div>
                      
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="relais" id="relais" />
                        <Label htmlFor="relais" className="flex-1 cursor-pointer">
                          <div className="font-medium">Point Relais</div>
                          <div className="text-sm text-muted-foreground">3-4 jours ouvrés - 3,90€</div>
                        </Label>
                        <div className="text-cosmetic-darkpink font-medium">3,90€</div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
            >
              Continuer vers le paiement
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingForm;
