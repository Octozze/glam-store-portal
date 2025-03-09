
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../products/ProductCard';
import { Product } from '@/types/product';

interface FeaturedProductsProps {
  title: string;
  description?: string;
  products: Product[];
  linkText?: string;
  linkTo: string;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  title,
  description,
  products,
  linkText = "Voir tous les produits",
  linkTo
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-cosmetic-darkpink text-cosmetic-darkpink hover:bg-cosmetic-pink/20"
            asChild
          >
            <Link to={linkTo}>
              {linkText} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
