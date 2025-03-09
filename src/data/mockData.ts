
import { Product } from '@/types/product';

// Mock product data
export const products: Product[] = [
  {
    id: 1,
    name: "Sérum Hydratant Intense",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "skincare",
    skinType: ["dry", "normal"],
    brand: "Lumine",
    description: "Un sérum hydratant enrichi en acide hyaluronique pour une peau intensément hydratée et repulpée.",
    ingredients: "Aqua, Glycerin, Sodium Hyaluronate, Pentylene Glycol, Phenoxyethanol, Ethylhexylglycerin",
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: 2,
    name: "Crème Anti-âge Régénérante",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1585232351009-aa87416fca90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "skincare",
    skinType: ["mature", "dry"],
    brand: "Elixir",
    description: "Cette crème de nuit anti-âge aide à réduire l'apparence des rides et des ridules tout en nourrissant la peau.",
    ingredients: "Aqua, Caprylic/Capric Triglyceride, Glycerin, Cetearyl Alcohol, Cetyl Alcohol, Retinol",
    rating: 4.6,
    reviews: 89,
    isBestSeller: true,
  },
  {
    id: 3,
    name: "Fond de Teint Fluide Longue Tenue",
    price: 38.50,
    image: "https://images.unsplash.com/photo-1590156524419-7d8233840fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "makeup",
    brand: "Lumière",
    description: "Un fond de teint longue tenue qui offre une couvrance modulable et un fini naturel.",
    rating: 4.3,
    reviews: 207,
    discount: 15,
  },
  {
    id: 4,
    name: "Palette de Fards à Paupières Nude",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "makeup",
    brand: "Céleste",
    description: "Une palette de 12 teintes neutres mates et satinées pour créer des looks jour et soir.",
    rating: 4.7,
    reviews: 156,
    isBestSeller: true,
  },
  {
    id: 5,
    name: "Eau de Parfum Floral",
    price: 89.00,
    image: "https://images.unsplash.com/photo-1588405748880-b434f2d715c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "fragrance",
    brand: "Rose Dorée",
    description: "Un parfum élégant aux notes de rose, jasmin et vanille pour une fragrance féminine et sophistiquée.",
    rating: 4.9,
    reviews: 78,
    isNew: true,
  },
  {
    id: 6,
    name: "Gel Nettoyant Purifiant",
    price: 28.50,
    image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "skincare",
    skinType: ["oily", "combination"],
    brand: "Pure",
    description: "Un gel nettoyant qui élimine en douceur les impuretés et l'excès de sébum sans dessécher la peau.",
    ingredients: "Aqua, Sodium Laureth Sulfate, Cocamidopropyl Betaine, Glycerin, Zinc PCA",
    rating: 4.5,
    reviews: 113,
    discount: 10,
  },
  {
    id: 7,
    name: "Huile Sèche Corps et Cheveux",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1601056643188-b8a95072daae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "bodycare",
    brand: "Éclat",
    description: "Une huile sèche multi-usage qui nourrit la peau et apporte brillance aux cheveux.",
    rating: 4.4,
    reviews: 92,
    isBestSeller: true,
  },
  {
    id: 8,
    name: "Rouge à Lèvres Mat",
    price: 25.99,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    category: "makeup",
    brand: "Lumière",
    description: "Un rouge à lèvres à la texture crémeuse qui offre une couleur intense et un fini mat longue tenue.",
    rating: 4.2,
    reviews: 165,
  }
];

// Filter options
export const filterOptions = {
  categories: [
    { label: "Soins de la peau", value: "skincare" },
    { label: "Maquillage", value: "makeup" },
    { label: "Parfums", value: "fragrance" },
    { label: "Soins du corps", value: "bodycare" }
  ],
  brands: [
    { label: "Lumine", value: "Lumine" },
    { label: "Elixir", value: "Elixir" },
    { label: "Lumière", value: "Lumière" },
    { label: "Céleste", value: "Céleste" },
    { label: "Rose Dorée", value: "Rose Dorée" },
    { label: "Pure", value: "Pure" },
    { label: "Éclat", value: "Éclat" }
  ],
  skinTypes: [
    { label: "Normale", value: "normal" },
    { label: "Sèche", value: "dry" },
    { label: "Grasse", value: "oily" },
    { label: "Mixte", value: "combination" },
    { label: "Mature", value: "mature" }
  ],
  priceRange: [0, 100] as [number, number]
};

// Testimonials
export const testimonials = [
  {
    id: 1,
    name: "Sophie L.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    comment: "Le Sérum Hydratant Intense a complètement transformé ma peau sèche. Je ne peux plus m'en passer !",
    rating: 5,
    product: "Sérum Hydratant Intense"
  },
  {
    id: 2,
    name: "Camille D.",
    avatar: "https://randomuser.me/api/portraits/women/39.jpg",
    comment: "Cette palette de fards à paupières offre de superbes teintes qui se fondent parfaitement. Idéale pour les looks quotidiens.",
    rating: 4,
    product: "Palette de Fards à Paupières Nude"
  },
  {
    id: 3,
    name: "Marie-Claire P.",
    avatar: "https://randomuser.me/api/portraits/women/58.jpg",
    comment: "J'utilise la Crème Anti-âge depuis 3 mois et je vois déjà une différence visible sur mes ridules. Très satisfaite !",
    rating: 5,
    product: "Crème Anti-âge Régénérante"
  }
];
