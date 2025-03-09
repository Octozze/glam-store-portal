
import React from 'react';
import Layout from '@/components/Layout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Shipping = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6 text-cosmetic-black">
            Livraison et Retours
          </h1>
          
          <div className="space-y-10">
            {/* Section Livraison */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-cosmetic-pink">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">
                Informations de Livraison
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Modes de livraison</h3>
                  <p className="text-gray-600 mb-4">
                    Nous proposons plusieurs options de livraison pour répondre au mieux à vos besoins :
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Livraison Standard (2-3 jours ouvrés)</li>
                    <li>Livraison Express (24-48h)</li>
                    <li>Livraison en Point Relais</li>
                    <li>Livraison à domicile</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Frais de livraison</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Destination</TableHead>
                        <TableHead>Délai</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Gratuit à partir de</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>France métropolitaine</TableCell>
                        <TableCell>2-3 jours ouvrés</TableCell>
                        <TableCell>4,90 €</TableCell>
                        <TableCell>50 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>France métropolitaine (Express)</TableCell>
                        <TableCell>24-48h</TableCell>
                        <TableCell>9,90 €</TableCell>
                        <TableCell>80 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Union Européenne</TableCell>
                        <TableCell>3-5 jours ouvrés</TableCell>
                        <TableCell>9,90 €</TableCell>
                        <TableCell>100 €</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>International</TableCell>
                        <TableCell>5-10 jours ouvrés</TableCell>
                        <TableCell>14,90 €</TableCell>
                        <TableCell>150 €</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Suivi de commande</h3>
                  <p className="text-gray-600">
                    Dès l'expédition de votre commande, vous recevrez un email contenant un numéro de suivi qui vous permettra de suivre l'acheminement de votre colis. Vous pouvez également consulter l'état de votre commande dans votre espace client.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Section Retours */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-cosmetic-pink">
              <h2 className="text-2xl font-serif font-semibold mb-4 text-cosmetic-darkpink">
                Politique de Retour
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Conditions d'éligibilité</h3>
                  <p className="text-gray-600 mb-4">
                    Pour être éligible à un retour, votre article doit respecter les conditions suivantes :
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    <li>Le produit doit être retourné dans les 14 jours suivant la réception</li>
                    <li>Le produit doit être non ouvert et dans son emballage d'origine</li>
                    <li>Le produit ne doit pas avoir été utilisé</li>
                    <li>Vous devez disposer de la preuve d'achat (confirmation de commande ou facture)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Procédure de retour</h3>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-600">
                    <li>Connectez-vous à votre compte client</li>
                    <li>Accédez à la section "Mes commandes"</li>
                    <li>Sélectionnez la commande concernée</li>
                    <li>Cliquez sur "Demander un retour"</li>
                    <li>Suivez les instructions pour imprimer l'étiquette de retour</li>
                    <li>Emballez soigneusement le produit dans son emballage d'origine</li>
                    <li>Collez l'étiquette de retour sur le colis</li>
                    <li>Déposez le colis au point de collecte indiqué</li>
                  </ol>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Remboursements</h3>
                  <p className="text-gray-600">
                    Une fois votre retour reçu et vérifié, nous vous informerons par email. Le remboursement sera effectué automatiquement sur le moyen de paiement utilisé lors de l'achat. Le délai de remboursement dépend de votre banque, mais il faut généralement compter 5 à 10 jours ouvrés après validation du retour.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Produits défectueux</h3>
                  <p className="text-gray-600">
                    Si vous recevez un produit défectueux ou endommagé, veuillez nous contacter dans les 48 heures suivant la réception en joignant des photos du produit et de l'emballage. Nous prendrons en charge les frais de retour et procéderons au remboursement ou à l'échange selon votre préférence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shipping;
