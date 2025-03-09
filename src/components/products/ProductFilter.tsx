
import React, { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface FilterOption {
  label: string;
  value: string;
}

interface ProductFilterProps {
  categories: FilterOption[];
  brands: FilterOption[];
  skinTypes: FilterOption[];
  priceRange: [number, number];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedSkinTypes: string[];
  selectedPriceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
  onSkinTypeChange: (skinType: string) => void;
  onPriceChange: (range: [number, number]) => void;
  onClearAll: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  brands,
  skinTypes,
  priceRange,
  selectedCategories,
  selectedBrands,
  selectedSkinTypes,
  selectedPriceRange,
  onCategoryChange,
  onBrandChange,
  onSkinTypeChange,
  onPriceChange,
  onClearAll,
}) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(selectedPriceRange);

  const handlePriceChange = (value: number[]) => {
    const newRange: [number, number] = [value[0], value[1]];
    setLocalPriceRange(newRange);
  };

  const applyPriceRange = () => {
    onPriceChange(localPriceRange);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Filtres</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-cosmetic-darkpink hover:text-cosmetic-darkpink/80 text-sm h-8"
          onClick={onClearAll}
        >
          Effacer tout
        </Button>
      </div>

      <Separator />

      {/* Categories */}
      <div>
        <h4 className="font-medium mb-3">Catégories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category.value}`}
                checked={selectedCategories.includes(category.value)}
                onCheckedChange={() => onCategoryChange(category.value)}
                className="text-cosmetic-darkpink border-gray-300 focus:ring-cosmetic-darkpink"
              />
              <label
                htmlFor={`category-${category.value}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {category.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brands */}
      <div>
        <h4 className="font-medium mb-3">Marques</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.value} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.value}`}
                checked={selectedBrands.includes(brand.value)}
                onCheckedChange={() => onBrandChange(brand.value)}
                className="text-cosmetic-darkpink border-gray-300 focus:ring-cosmetic-darkpink"
              />
              <label
                htmlFor={`brand-${brand.value}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Skin Types */}
      <div>
        <h4 className="font-medium mb-3">Types de peau</h4>
        <div className="space-y-2">
          {skinTypes.map((skinType) => (
            <div key={skinType.value} className="flex items-center space-x-2">
              <Checkbox
                id={`skinType-${skinType.value}`}
                checked={selectedSkinTypes.includes(skinType.value)}
                onCheckedChange={() => onSkinTypeChange(skinType.value)}
                className="text-cosmetic-darkpink border-gray-300 focus:ring-cosmetic-darkpink"
              />
              <label
                htmlFor={`skinType-${skinType.value}`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {skinType.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3">Prix</h4>
        <Slider
          defaultValue={localPriceRange}
          min={priceRange[0]}
          max={priceRange[1]}
          step={1}
          onValueChange={handlePriceChange}
          onValueCommit={applyPriceRange}
          className="mb-4"
        />
        <div className="flex justify-between text-sm">
          <span>{localPriceRange[0]}€</span>
          <span>{localPriceRange[1]}€</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter */}
      <div className="hidden md:block w-64 pr-8">
        <FilterContent />
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mb-4">
              <Filter className="mr-2 h-4 w-4" /> Filtrer
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-sm">
            <SheetHeader>
              <SheetTitle>Filtres</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default ProductFilter;
