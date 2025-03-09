
import React from 'react';
import Layout from '@/components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-serif font-bold mb-6 text-cosmetic-black">
            À propos de <span className="text-cosmetic-darkpink">Belle</span>Cosmetics
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg mb-6">
              Bienvenue chez BelleCosmetics, votre destination beauté de confiance. Fondée en 2020, notre entreprise s'est donnée pour mission de proposer des produits cosmétiques de haute qualité, adaptés à tous les types de peau et respectueux de l'environnement.
            </p>
            
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-cosmetic-black">Notre mission</h2>
            <p className="mb-6">
              Chez BelleCosmetics, nous croyons que chaque personne mérite de se sentir belle et confiante dans sa peau. Notre mission est de proposer des produits cosmétiques qui mettent en valeur la beauté naturelle de chacun, tout en prenant soin de la peau et de l'environnement.
            </p>
            
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-cosmetic-black">Nos valeurs</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><span className="font-bold">Qualité</span> : Nous sélectionnons rigoureusement chaque produit pour garantir les meilleurs résultats.</li>
              <li><span className="font-bold">Transparence</span> : Nous croyons en une communication honnête sur nos produits et leurs ingrédients.</li>
              <li><span className="font-bold">Durabilité</span> : Nos produits sont formulés et emballés de manière à minimiser notre impact environnemental.</li>
              <li><span className="font-bold">Accessibilité</span> : Nous proposons des produits de qualité à des prix abordables pour tous.</li>
            </ul>
            
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-cosmetic-black">Notre histoire</h2>
            <p className="mb-6">
              BelleCosmetics a été fondée par Sophie Martin, passionnée de cosmétiques et soucieuse de proposer des produits adaptés à tous les types de peau. Après des années d'expérience dans l'industrie cosmétique, Sophie a décidé de créer sa propre marque, avec une attention particulière portée à la qualité des ingrédients et à la transparence.
            </p>
            <p className="mb-6">
              Depuis notre création, nous avons développé une large gamme de produits, des soins de la peau aux maquillages, en passant par les parfums et les accessoires. Notre équipe s'agrandit chaque année, partageant tous la même passion pour la beauté et le bien-être.
            </p>
            
            <h2 className="text-2xl font-serif font-bold mt-8 mb-4 text-cosmetic-black">Contactez-nous</h2>
            <p>
              Nous sommes à votre écoute ! N'hésitez pas à nous contacter pour toute question ou suggestion. Notre équipe de service client est disponible du lundi au vendredi, de 9h à 18h.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
