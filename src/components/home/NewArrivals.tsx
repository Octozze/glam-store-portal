
import React from 'react';
import FeaturedProducts from './FeaturedProducts';
import { Product } from '@/types/product';

interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  return (
    <FeaturedProducts
      title="Nouveautés"
      description="Découvrez nos derniers produits pour rester à la pointe des tendances beauté."
      products={products}
      linkText="Voir toutes les nouveautés"
      linkTo="/products?category=new"
    />
  );
};

export default NewArrivals;
