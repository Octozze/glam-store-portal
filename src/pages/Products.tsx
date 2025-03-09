
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import ProductFilter from '@/components/products/ProductFilter';
import ProductCard from '@/components/products/ProductCard';
import { products, filterOptions } from '@/data/mockData';
import { Product } from '@/types/product';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number]>(filterOptions.priceRange);

  // Apply filters whenever they change
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }

    // Filter by skin type
    if (selectedSkinTypes.length > 0) {
      result = result.filter(product => 
        product.skinType && product.skinType.some(type => selectedSkinTypes.includes(type))
      );
    }

    // Filter by price
    result = result.filter(product => {
      const price = product.discount 
        ? product.price - (product.price * product.discount / 100)
        : product.price;
      return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
    });

    // Special filters from URL
    if (initialCategory === 'new') {
      result = result.filter(product => product.isNew);
    } else if (initialCategory === 'bestseller') {
      result = result.filter(product => product.isBestSeller);
    }

    setFilteredProducts(result);
  }, [selectedCategories, selectedBrands, selectedSkinTypes, selectedPriceRange, initialCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleSkinTypeChange = (skinType: string) => {
    setSelectedSkinTypes(prev => 
      prev.includes(skinType)
        ? prev.filter(t => t !== skinType)
        : [...prev, skinType]
    );
  };

  const handlePriceChange = (range: [number, number]) => {
    setSelectedPriceRange(range);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedSkinTypes([]);
    setSelectedPriceRange(filterOptions.priceRange);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Nos Produits</h1>
        <p className="text-gray-600 mb-8">Découvrez notre gamme de produits cosmétiques de qualité supérieure.</p>
        
        <div className="flex flex-col md:flex-row">
          {/* Filters */}
          <ProductFilter
            categories={filterOptions.categories}
            brands={filterOptions.brands}
            skinTypes={filterOptions.skinTypes}
            priceRange={filterOptions.priceRange}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            selectedSkinTypes={selectedSkinTypes}
            selectedPriceRange={selectedPriceRange}
            onCategoryChange={handleCategoryChange}
            onBrandChange={handleBrandChange}
            onSkinTypeChange={handleSkinTypeChange}
            onPriceChange={handlePriceChange}
            onClearAll={handleClearAll}
          />
          
          {/* Product Grid */}
          <div className="flex-grow">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">Aucun produit ne correspond à vos critères de recherche.</p>
                <button 
                  className="mt-4 text-cosmetic-darkpink hover:underline" 
                  onClick={handleClearAll}
                >
                  Effacer tous les filtres
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
