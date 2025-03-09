
import React from 'react';
import Layout from '@/components/Layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6 text-cosmetic-black">
            Foire Aux Questions (FAQ)
          </h1>
          
          <div className="space-y-8">
            {/* Section Commandes et Paiements */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">
                Commandes et Paiements
              </h2>
              
              <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-sm border border-cosmetic-pink">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-base font-medium">Comment passer une commande sur votre site ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Pour passer une commande, il vous suffit de parcourir notre catalogue, d'ajouter les produits souhaités à votre panier, puis de procéder au paiement en suivant les instructions. Vous pouvez payer par carte bancaire, PayPal ou virement bancaire.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-base font-medium">Quels modes de paiement acceptez-vous ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Nous acceptons les paiements par Visa, Mastercard, American Express, PayPal et virement bancaire. Tous les paiements sont sécurisés grâce à un cryptage SSL.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-base font-medium">Comment suivre ma commande ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Une fois votre commande expédiée, vous recevrez un email contenant un numéro de suivi. Vous pourrez également suivre l'état de votre commande en vous connectant à votre compte client et en accédant à la section "Mes commandes".
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-base font-medium">Puis-je modifier ma commande une fois validée ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Vous pouvez modifier votre commande uniquement si elle n'a pas encore été expédiée. Pour ce faire, contactez-nous rapidement par téléphone ou par email avec votre numéro de commande.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Section Livraison */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">
                Livraison
              </h2>
              
              <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-sm border border-cosmetic-pink">
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-base font-medium">Quels sont les délais de livraison ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Les délais de livraison varient selon votre localisation : France métropolitaine (2-3 jours ouvrés), Europe (3-5 jours ouvrés), International (5-10 jours ouvrés). Ces délais sont indicatifs à partir de la date d'expédition.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-base font-medium">Livrez-vous à l'international ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Oui, nous livrons dans la plupart des pays. Toutefois, certaines restrictions peuvent s'appliquer selon la destination. Les frais de livraison et les délais varient en fonction du pays de destination.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-7">
                  <AccordionTrigger className="text-base font-medium">La livraison est-elle gratuite ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    La livraison est gratuite en France métropolitaine pour toute commande supérieure à 50€. En dessous de ce montant, les frais de livraison s'élèvent à 4,90€. Pour l'international, les frais dépendent de la destination et du poids du colis.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Section Retours et Remboursements */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">
                Retours et Remboursements
              </h2>
              
              <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-sm border border-cosmetic-pink">
                <AccordionItem value="item-8">
                  <AccordionTrigger className="text-base font-medium">Quelle est votre politique de retour ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Vous disposez de 14 jours à compter de la réception de votre commande pour nous retourner un produit. Le produit doit être non ouvert, dans son emballage d'origine et en parfait état pour être éligible à un remboursement.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-9">
                  <AccordionTrigger className="text-base font-medium">Comment effectuer un retour ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Pour effectuer un retour, connectez-vous à votre compte client, allez dans "Mes commandes", sélectionnez la commande concernée et cliquez sur "Demander un retour". Suivez ensuite les instructions pour générer une étiquette de retour.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-10">
                  <AccordionTrigger className="text-base font-medium">Quand serai-je remboursé ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Une fois votre retour reçu et vérifié, nous procéderons au remboursement. Le délai de remboursement dépend de votre banque, mais il faut généralement compter 5 à 10 jours ouvrés. Vous serez informé par email dès que le remboursement sera effectué.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            {/* Section Support Client */}
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">
                Support Client
              </h2>
              
              <Accordion type="single" collapsible className="bg-white p-6 rounded-lg shadow-sm border border-cosmetic-pink">
                <AccordionItem value="item-11">
                  <AccordionTrigger className="text-base font-medium">Comment contacter le service client ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Vous pouvez contacter notre service client par email à support@bellecosmetics.com, par téléphone au +33 1 23 45 67 89 (du lundi au vendredi, de 9h à 18h), ou via le formulaire de contact sur notre site.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-12">
                  <AccordionTrigger className="text-base font-medium">Où trouver des conseils sur les produits ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Vous trouverez des conseils et informations sur nos produits dans notre blog, ainsi que sur chaque fiche produit. Notre équipe de conseillers beauté est également disponible pour répondre à vos questions spécifiques par email ou téléphone.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-13">
                  <AccordionTrigger className="text-base font-medium">Comment réinitialiser mon mot de passe ?</AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    Pour réinitialiser votre mot de passe, cliquez sur "Connexion", puis sur "Mot de passe oublié". Saisissez votre adresse email et suivez les instructions qui vous seront envoyées par email.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;
