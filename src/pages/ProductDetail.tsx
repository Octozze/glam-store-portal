
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductDetailComponent from '@/components/products/ProductDetail';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Find the product by ID
  const product = products.find(p => p.id === Number(id));
  
  // Get similar products (same category)
  const similarProducts = product 
    ? products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-3xl font-bold mb-4">Produit non trouvé</h1>
          <p className="text-gray-600 mb-8">Le produit que vous recherchez n'existe pas.</p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
          >
            Retourner aux produits
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          className="mb-6 text-gray-600 hover:text-cosmetic-darkpink"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        
        <ProductDetailComponent product={product} />
        
        {similarProducts.length > 0 && (
          <div className="mt-16">
            <FeaturedProducts
              title="Vous pourriez aussi aimer"
              products={similarProducts}
              linkText="Voir plus de produits similaires"
              linkTo={`/products?category=${product.category}`}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
