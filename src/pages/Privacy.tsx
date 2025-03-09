
import React from 'react';
import Layout from '@/components/Layout';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6 text-cosmetic-black">
            Politique de Confidentialité
          </h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm border border-cosmetic-pink">
            <div className="prose max-w-none">
              <p className="mb-6">
                Dernière mise à jour : {new Date().toLocaleDateString()}
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">1. Introduction</h2>
              <p className="mb-4">
                Chez BelleCosmetics, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité décrit les types de données que nous collectons, comment nous les utilisons, les mesures prises pour les protéger, et vos droits concernant ces informations.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">2. Collecte des données personnelles</h2>
              <p className="mb-4">
                Nous collectons les informations personnelles suivantes lorsque vous utilisez notre site web, créez un compte, passez une commande ou interagissez avec nous :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Informations d'identification (nom, prénom, adresse email)</li>
                <li>Informations de contact (adresse postale, numéro de téléphone)</li>
                <li>Informations de paiement (numéro de carte bancaire, date d'expiration, cryptogramme)</li>
                <li>Historique d'achat et préférences de produits</li>
                <li>Informations de navigation et d'utilisation du site</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">3. Utilisation des données</h2>
              <p className="mb-4">
                Nous utilisons vos données personnelles pour :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Traiter vos commandes et paiements</li>
                <li>Gérer votre compte client</li>
                <li>Vous fournir une assistance client</li>
                <li>Vous envoyer des communications marketing (avec votre consentement)</li>
                <li>Améliorer nos produits et services</li>
                <li>Prévenir la fraude et assurer la sécurité de notre site</li>
                <li>Respecter nos obligations légales</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">4. Cookies et technologies similaires</h2>
              <p className="mb-4">
                Notre site utilise des cookies et technologies similaires pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur ou le bandeau de cookies présent sur notre site.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">5. Partage des données</h2>
              <p className="mb-4">
                Nous ne vendons jamais vos données personnelles. Cependant, nous pouvons les partager avec :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Nos prestataires de services (traitement des paiements, livraison, hébergement web)</li>
                <li>Nos partenaires commerciaux (avec votre consentement)</li>
                <li>Les autorités légales lorsque la loi l'exige</li>
              </ul>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">6. Sécurité des données</h2>
              <p className="mb-4">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la perte, l'accès non autorisé, la modification ou la divulgation.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">7. Durée de conservation</h2>
              <p className="mb-4">
                Nous conservons vos données personnelles aussi longtemps que nécessaire pour atteindre les finalités pour lesquelles elles ont été collectées, sauf si la loi exige une période de conservation plus longue.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">8. Vos droits</h2>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et autres lois applicables, vous disposez des droits suivants :
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Droit d'accès à vos données personnelles</li>
                <li>Droit de rectification des données inexactes</li>
                <li>Droit à l'effacement de vos données</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition au traitement</li>
                <li>Droit de retirer votre consentement à tout moment</li>
              </ul>
              <p className="mb-4">
                Pour exercer ces droits, veuillez nous contacter à l'adresse privacy@bellecosmetics.com ou via notre formulaire de contact.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">9. Modifications de la politique de confidentialité</h2>
              <p className="mb-4">
                Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement significatif par email ou par une notification sur notre site web.
              </p>
              
              <h2 className="text-2xl font-serif font-semibold mt-8 mb-4 text-cosmetic-black">10. Contact</h2>
              <p className="mb-4">
                Si vous avez des questions concernant cette politique de confidentialité ou la façon dont nous traitons vos données personnelles, veuillez nous contacter à :
              </p>
              <p className="mb-4">
                BelleCosmetics<br />
                Service Protection des Données<br />
                10 Rue de la Beauté<br />
                75008 Paris, France<br />
                Email : privacy@bellecosmetics.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
