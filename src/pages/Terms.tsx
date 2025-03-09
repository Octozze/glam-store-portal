
import React from 'react';
import Layout from '@/components/Layout';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6 text-cosmetic-black">
            Conditions Générales de Vente
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-cosmetic-pink">
            <div className="prose max-w-none">
              <p className="mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">1. Préambule</h2>
              <p className="mb-4">
                Les présentes conditions générales de vente (CGV) établissent les relations contractuelles entre la société BelleCosmetics, SASU au capital de 10 000 €, immatriculée au RCS de Paris sous le numéro 123 456 789, dont le siège social est situé au 10 Rue de la Beauté, 75008 Paris, France (ci-après "le Vendeur") et toute personne effectuant un achat sur le site www.bellecosmetics.com (ci-après "le Client").
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">2. Objet et champ d'application</h2>
              <p className="mb-4">
                Les présentes CGV ont pour objet de définir les droits et obligations des parties dans le cadre de la vente en ligne de produits cosmétiques proposés par le Vendeur au Client. Elles s'appliquent à toutes les commandes passées sur le site www.bellecosmetics.com par tout Client.
              </p>
              <p className="mb-4">
                Le Client déclare avoir pris connaissance des présentes CGV avant la passation de sa commande. La validation de la commande vaut donc acceptation sans restriction ni réserve des présentes CGV.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">3. Produits et prix</h2>
              <p className="mb-4">
                Les produits proposés à la vente sont ceux qui figurent sur le site www.bellecosmetics.com, dans la limite des stocks disponibles. Le Vendeur se réserve le droit de modifier à tout moment son offre de produits.
              </p>
              <p className="mb-4">
                Les prix des produits sont indiqués en euros TTC (toutes taxes comprises) hors frais de livraison. Le montant des frais de livraison est précisé avant la validation de la commande.
              </p>
              <p className="mb-4">
                Le Vendeur se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">4. Commande</h2>
              <p className="mb-4">
                Pour passer une commande, le Client suit les différentes étapes de commande en ligne, à savoir :
              </p>
              <ul className="list-decimal pl-6 mb-4 space-y-2">
                <li>Sélection des produits et ajout au panier</li>
                <li>Validation du contenu du panier</li>
                <li>Identification du Client (création d'un compte ou connexion)</li>
                <li>Choix du mode de livraison</li>
                <li>Choix du mode de paiement</li>
                <li>Vérification et validation définitive de la commande</li>
              </ul>
              <p className="mb-4">
                La confirmation de la commande par le Client vaut acceptation des présentes CGV et forme le contrat de vente.
              </p>
              <p className="mb-4">
                Un email de confirmation récapitulant la commande (produits, prix, livraison, etc.) est envoyé au Client à l'adresse email indiquée dans son compte.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">5. Paiement</h2>
              <p className="mb-4">
                Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) ou via PayPal. Le débit de la carte est effectué au moment de la validation de la commande.
              </p>
              <p className="mb-4">
                Toutes les informations relatives au paiement sont transmises de manière sécurisée via un protocole de cryptage SSL. Le Vendeur n'a pas accès aux coordonnées bancaires du Client.
              </p>
              <p className="mb-4">
                Le Vendeur se réserve le droit de suspendre ou d'annuler toute commande en cas de refus d'autorisation de paiement par carte bancaire ou de non-paiement.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">6. Livraison</h2>
              <p className="mb-4">
                Les produits sont livrés à l'adresse de livraison indiquée par le Client lors de la commande. Les délais de livraison sont donnés à titre indicatif et dépendent du mode de livraison choisi.
              </p>
              <p className="mb-4">
                En cas de retard de livraison de plus de 7 jours par rapport à la date initialement prévue, le Client peut contacter le service client pour obtenir des informations sur l'état de sa commande.
              </p>
              <p className="mb-4">
                Le Client est tenu de vérifier l'état des produits à la livraison et de signaler immédiatement toute anomalie concernant la livraison (produits manquants, colis endommagé, etc.).
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">7. Droit de rétractation</h2>
              <p className="mb-4">
                Conformément à la législation en vigueur, le Client dispose d'un délai de 14 jours à compter de la réception des produits pour exercer son droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.
              </p>
              <p className="mb-4">
                Pour exercer ce droit, le Client doit notifier sa décision de rétractation par écrit (email, courrier) ou via le formulaire de contact du site. Les produits doivent être retournés dans leur emballage d'origine, non ouverts et en parfait état, accompagnés de la facture correspondante.
              </p>
              <p className="mb-4">
                Les frais de retour sont à la charge du Client. Le remboursement sera effectué dans un délai de 14 jours à compter de la réception des produits retournés, par le même moyen de paiement que celui utilisé lors de l'achat.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">8. Garanties et responsabilité</h2>
              <p className="mb-4">
                Les produits vendus sur le site sont conformes à la réglementation française et européenne en vigueur. Ils bénéficient de la garantie légale de conformité et de la garantie contre les vices cachés.
              </p>
              <p className="mb-4">
                Le Vendeur ne saurait être tenu pour responsable des dommages résultant d'une mauvaise utilisation des produits achetés sur le site.
              </p>
              <p className="mb-4">
                Le site peut contenir des liens vers d'autres sites internet. Le Vendeur ne peut être tenu responsable du contenu de ces sites et de l'usage qui pourrait en être fait par le Client.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">9. Protection des données personnelles</h2>
              <p className="mb-4">
                Les informations recueillies lors de la commande font l'objet d'un traitement informatique destiné à la gestion des commandes, au service après-vente et, si le Client y a consenti, à des fins de prospection commerciale.
              </p>
              <p className="mb-4">
                Conformément à la réglementation en vigueur, le Client dispose d'un droit d'accès, de rectification, d'opposition et de suppression des données le concernant. Pour exercer ces droits, le Client peut contacter le service client.
              </p>
              <p className="mb-4">
                Pour plus d'informations sur la gestion des données personnelles, veuillez consulter notre politique de confidentialité.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">10. Litiges et droit applicable</h2>
              <p className="mb-4">
                Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents.
              </p>
              <p className="mb-4">
                Le Client est informé qu'il peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des différends (conciliation, par exemple) en cas de contestation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
