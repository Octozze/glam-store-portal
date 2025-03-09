
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const newsletterSchema = z.object({
  email: z.string().email('Adresse email invalide')
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const NewsletterSignup = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema)
  });

  const onSubmit = async (data: NewsletterFormValues) => {
    // Simulation d'envoi de l'inscription à la newsletter (à remplacer par un appel API réel)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Newsletter signup:', data);
    
    // Affichage d'une notification de succès
    toast({
      title: 'Inscription réussie',
      description: 'Vous êtes maintenant inscrit(e) à notre newsletter.',
      variant: 'default',
    });
    
    // Réinitialisation du formulaire
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-grow">
          <Input
            type="email"
            placeholder="Votre adresse email"
            {...register('email')}
            className={`h-12 ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
        <Button 
          type="submit" 
          className="h-12 bg-cosmetic-darkpink hover:bg-pink-600 px-6" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
        </Button>
      </div>
    </form>
  );
};

export default NewsletterSignup;
