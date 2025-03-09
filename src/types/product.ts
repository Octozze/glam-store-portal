
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  skinType?: string[];
  brand: string;
  description?: string;
  ingredients?: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  discount?: number;
}
