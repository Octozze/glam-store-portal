
import React from 'react';
import Layout from '@/components/Layout';
import ContactForm from '@/components/contact/ContactForm';
import NewsletterSignup from '@/components/contact/NewsletterSignup';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6 text-cosmetic-black">
            Contactez <span className="text-cosmetic-darkpink">Belle</span>Cosmetics
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Coordonnées */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-cosmetic-pink">
              <h2 className="text-xl font-serif font-semibold mb-6 text-cosmetic-darkpink">Nos coordonnées</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="text-cosmetic-darkpink mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Email</p>
                    <a href="mailto:contact@bellecosmetics.com" className="text-cosmetic-darkpink hover:underline">
                      contact@bellecosmetics.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-cosmetic-darkpink mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Téléphone</p>
                    <a href="tel:+33123456789" className="text-cosmetic-darkpink hover:underline">
                      +33 1 23 45 67 89
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-cosmetic-darkpink mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Adresse</p>
                    <address className="not-italic">
                      10 Rue de la Beauté<br />
                      75008 Paris<br />
                      France
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-cosmetic-darkpink mt-1 h-5 w-5 flex-shrink-0" />
                  <div className="ml-4">
                    <p className="font-medium">Horaires d'ouverture</p>
                    <p>Lundi - Vendredi: 9h - 18h</p>
                    <p>Samedi: 10h - 17h</p>
                    <p>Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Formulaire de contact */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-cosmetic-pink">
              <h2 className="text-xl font-serif font-semibold mb-6 text-cosmetic-darkpink">Envoyez-nous un message</h2>
              <ContactForm />
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-cosmetic-cream rounded-lg shadow-md p-8 border border-cosmetic-pink text-center">
            <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">Abonnez-vous à notre newsletter</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Restez informé(e) des dernières nouveautés, promotions exclusives et conseils beauté en vous inscrivant à notre newsletter.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
