
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/home/Hero';
import NewArrivals from '@/components/home/NewArrivals';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Testimonials from '@/components/home/Testimonials';
import { products, testimonials } from '@/data/mockData';

const Index: React.FC = () => {
  // Filter new arrivals and bestsellers
  const newArrivalsProducts = products.filter(product => product.isNew).slice(0, 4);
  const bestSellersProducts = products.filter(product => product.isBestSeller).slice(0, 4);

  return (
    <Layout>
      <Hero />
      
      <NewArrivals products={newArrivalsProducts} />
      
      <FeaturedProducts
        title="Meilleures Ventes"
        description="Découvrez nos produits les plus populaires, plébiscités par nos clients."
        products={bestSellersProducts}
        linkText="Voir toutes les meilleures ventes"
        linkTo="/products?category=bestseller"
      />
      
      <Testimonials testimonials={testimonials} />
    </Layout>
  );
};

export default Index;
