
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/Layout';
import { 
  Image, Package, Plus, Save, Trash2, 
  Search, Edit, AlertCircle, CheckCircle, UploadCloud, 
  ArrowLeft, Filter, ShoppingBag, Tag, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/data/mockData';
import { Product } from '@/types/product';

// Define the form validation schema
const productSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit comporter au moins 3 caractères" }),
  brand: z.string().min(2, { message: "La marque est requise" }),
  category: z.string().min(2, { message: "La catégorie est requise" }),
  price: z.coerce.number().positive({ message: "Le prix doit être supérieur à 0" }),
  description: z.string().min(10, { message: "La description doit comporter au moins 10 caractères" }),
  ingredients: z.string().optional(),
  skinType: z.array(z.string()).optional(),
  isNew: z.boolean().optional(),
  isBestSeller: z.boolean().optional(),
  discount: z.coerce.number().min(0).max(100).optional(),
  stock: z.coerce.number().int().nonnegative({ message: "Le stock ne peut pas être négatif" }),
});

type ProductFormValues = z.infer<typeof productSchema>;

const ProductManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentProducts, setCurrentProducts] = useState<Product[]>(products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      brand: '',
      category: '',
      price: 0,
      description: '',
      ingredients: '',
      skinType: [],
      isNew: false,
      isBestSeller: false,
      discount: 0,
      stock: 0,
    },
  });

  // Reset form when selectedProduct changes
  useEffect(() => {
    if (selectedProduct && isEditing) {
      form.reset({
        name: selectedProduct.name,
        brand: selectedProduct.brand,
        category: selectedProduct.category,
        price: selectedProduct.price,
        description: selectedProduct.description || '',
        ingredients: selectedProduct.ingredients || '',
        skinType: selectedProduct.skinType || [],
        isNew: selectedProduct.isNew || false,
        isBestSeller: selectedProduct.isBestSeller || false,
        discount: selectedProduct.discount || 0,
        stock: 10, // Mock value since it's not in the Product interface
      });
      setUploadedImage(selectedProduct.image);
    } else if (isCreating) {
      form.reset({
        name: '',
        brand: '',
        category: '',
        price: 0,
        description: '',
        ingredients: '',
        skinType: [],
        isNew: false,
        isBestSeller: false,
        discount: 0,
        stock: 0,
      });
      setUploadedImage(null);
    }
  }, [selectedProduct, isEditing, isCreating]);

  // Filter products based on search term and category
  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }
    
    setCurrentProducts(filtered);
  }, [searchTerm, filterCategory]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if it's an image type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Format non supporté",
          description: "Veuillez télécharger une image (JPG, PNG, GIF).",
          variant: "destructive",
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Image téléchargée",
        description: `L'image ${file.name} a été téléchargée avec succès.`,
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsCreating(false);
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsCreating(true);
  };

  const handleCancel = () => {
    setSelectedProduct(null);
    setIsEditing(false);
    setIsCreating(false);
    setUploadedImage(null);
    form.reset();
  };

  const onSubmit = (data: ProductFormValues) => {
    if (!uploadedImage) {
      toast({
        title: "Image requise",
        description: "Veuillez télécharger une image du produit.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send this data to your backend
    console.log("Product data:", data, "Image:", uploadedImage);
    
    if (isEditing && selectedProduct) {
      // Mock update - in a real app this would update the database
      const updatedProducts = currentProducts.map(p => 
        p.id === selectedProduct.id ? { 
          ...p, 
          ...data, 
          image: uploadedImage 
        } : p
      );
      
      setCurrentProducts(updatedProducts);
      toast({
        title: "Produit mis à jour",
        description: `Le produit ${data.name} a été mis à jour avec succès.`,
      });
    } else if (isCreating) {
      // Mock creation - in a real app this would add to the database
      const newProduct: Product = {
        id: Math.max(...currentProducts.map(p => p.id)) + 1,
        name: data.name,
        price: data.price,
        image: uploadedImage,
        category: data.category,
        brand: data.brand,
        description: data.description,
        ingredients: data.ingredients,
        skinType: data.skinType,
        isNew: data.isNew,
        isBestSeller: data.isBestSeller,
        discount: data.discount,
      };
      
      setCurrentProducts([...currentProducts, newProduct]);
      toast({
        title: "Produit ajouté",
        description: `Le produit ${data.name} a été ajouté avec succès.`,
      });
    }
    
    // Reset state after submission
    setIsEditing(false);
    setIsCreating(false);
    setSelectedProduct(null);
    setUploadedImage(null);
    form.reset();
  };

  const handleDeleteProduct = (product: Product) => {
    // Mock deletion - in a real app this would remove from the database
    const updatedProducts = currentProducts.filter(p => p.id !== product.id);
    setCurrentProducts(updatedProducts);
    
    toast({
      title: "Produit supprimé",
      description: `Le produit ${product.name} a été supprimé avec succès.`,
    });
  };

  // Extract unique categories for filter
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Gestion des Produits</h1>
        <p className="text-gray-600 mb-8">
          Ajoutez, modifiez et gérez les produits cosmétiques de votre catalogue.
        </p>
        
        {(isEditing || isCreating) ? (
          <div className="space-y-6">
            <Button 
              variant="outline" 
              className="mb-4 flex items-center gap-2"
              onClick={handleCancel}
            >
              <ArrowLeft className="h-4 w-4" /> Retour à la liste
            </Button>
            
            <Card>
              <CardHeader>
                <CardTitle>{isEditing ? "Modifier un produit" : "Ajouter un nouveau produit"}</CardTitle>
                <CardDescription>
                  {isEditing 
                    ? "Modifiez les détails du produit existant" 
                    : "Remplissez le formulaire pour ajouter un nouveau produit"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom du produit</FormLabel>
                                <FormControl>
                                  <Input placeholder="Nom du produit" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="brand"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Marque</FormLabel>
                                <FormControl>
                                  <Input placeholder="Marque du produit" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Catégorie</FormLabel>
                                <FormControl>
                                  <select
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    {...field}
                                  >
                                    <option value="" disabled>Sélectionnez une catégorie</option>
                                    <option value="Maquillage">Maquillage</option>
                                    <option value="Soin">Soin</option>
                                    <option value="Parfum">Parfum</option>
                                    <option value="Corps">Corps</option>
                                    <option value="Cheveux">Cheveux</option>
                                  </select>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Prix (€)</FormLabel>
                                <FormControl>
                                  <Input type="number" step="0.01" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Stock disponible</FormLabel>
                                <FormControl>
                                  <Input type="number" min="0" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <textarea
                                  className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  placeholder="Description détaillée du produit"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="ingredients"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Ingrédients</FormLabel>
                              <FormControl>
                                <textarea
                                  className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                  placeholder="Liste des ingrédients"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-3">
                          <Label>Types de peau adaptés</Label>
                          <div className="grid grid-cols-2 gap-4">
                            {['Normale', 'Sèche', 'Grasse', 'Mixte', 'Sensible', 'Mature'].map(type => (
                              <div key={type} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={`skin-${type}`}
                                  value={type}
                                  onChange={(e) => {
                                    const currentSkinTypes = form.getValues('skinType') || [];
                                    if (e.target.checked) {
                                      form.setValue('skinType', [...currentSkinTypes, type]);
                                    } else {
                                      form.setValue('skinType', currentSkinTypes.filter(t => t !== type));
                                    }
                                  }}
                                  checked={(form.getValues('skinType') || []).includes(type)}
                                  className="h-4 w-4 border-gray-300 rounded"
                                />
                                <Label htmlFor={`skin-${type}`}>{type}</Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="space-y-3">
                            <Label>Statut du produit</Label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="is-new"
                                checked={form.getValues('isNew')}
                                onChange={(e) => form.setValue('isNew', e.target.checked)}
                                className="h-4 w-4 border-gray-300 rounded"
                              />
                              <Label htmlFor="is-new">Nouveau produit</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id="is-bestseller"
                                checked={form.getValues('isBestSeller')}
                                onChange={(e) => form.setValue('isBestSeller', e.target.checked)}
                                className="h-4 w-4 border-gray-300 rounded"
                              />
                              <Label htmlFor="is-bestseller">Produit populaire</Label>
                            </div>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Remise (%)</FormLabel>
                                <FormControl>
                                  <Input 
                                    type="number" 
                                    min="0" 
                                    max="100" 
                                    placeholder="0" 
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      <div className="lg:col-span-1">
                        <div className="space-y-3">
                          <Label>Image du produit</Label>
                          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                            {uploadedImage ? (
                              <div className="space-y-4 w-full">
                                <div className="aspect-square w-full overflow-hidden rounded-md">
                                  <img 
                                    src={uploadedImage} 
                                    alt="Product" 
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="text-center">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setUploadedImage(null)}
                                    className="mt-2"
                                  >
                                    Supprimer l'image
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <>
                                <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                                <div className="text-center">
                                  <p className="text-sm text-gray-600 mb-1">
                                    Glissez-déposez une image ou
                                  </p>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    className="relative"
                                  >
                                    Parcourir
                                    <input
                                      type="file"
                                      accept="image/*"
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                      onChange={handleImageUpload}
                                    />
                                  </Button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                  PNG, JPG ou GIF jusqu'à 5MB
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium mb-2">Conseils pour les images</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>Utilisez des images de haute qualité (minimum 800x800px)</li>
                            <li>Fond blanc ou neutre pour une meilleure présentation</li>
                            <li>Montrez le produit sous plusieurs angles si possible</li>
                            <li>Évitez les images avec du texte ou des logos proéminents</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-3 pt-4">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={handleCancel}
                      >
                        Annuler
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        {isEditing ? "Mettre à jour" : "Ajouter le produit"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
              <CardTitle>Catalogue de produits</CardTitle>
              <Button 
                className="mt-2 sm:mt-0 bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                onClick={handleCreateProduct}
              >
                <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    type="search" 
                    placeholder="Rechercher un produit..." 
                    className="pl-8 h-10" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">Toutes catégories</option>
                    {categories.filter(c => c !== 'all').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  
                  <Button variant="outline" size="sm" onClick={() => {
                    setSearchTerm('');
                    setFilterCategory('all');
                  }}>
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produit</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Prix</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <div className="w-12 h-12 mr-3 bg-gray-100 rounded-md overflow-hidden">
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-xs text-gray-500">{product.brand}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{product.category}</Badge>
                        </TableCell>
                        <TableCell>
                          {product.discount ? (
                            <div>
                              <span className="line-through text-gray-500 text-sm">{product.price.toFixed(2)}€</span>
                              <span className="font-medium ml-2">
                                {(product.price * (1 - product.discount / 100)).toFixed(2)}€
                              </span>
                            </div>
                          ) : (
                            <span>{product.price.toFixed(2)}€</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-2">
                            {product.isNew && <Badge className="bg-green-500">Nouveau</Badge>}
                            {product.isBestSeller && <Badge className="bg-blue-500">Populaire</Badge>}
                            {product.discount && <Badge className="bg-cosmetic-gold">-{product.discount}%</Badge>}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-red-500"
                              onClick={() => handleDeleteProduct(product)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              {currentProducts.length === 0 && (
                <div className="text-center py-8">
                  <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <h3 className="text-lg font-medium mb-1">Aucun produit trouvé</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterCategory !== 'all' 
                      ? "Essayez de modifier vos filtres de recherche" 
                      : "Ajoutez votre premier produit pour commencer"}
                  </p>
                  {searchTerm || filterCategory !== 'all' ? (
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSearchTerm('');
                        setFilterCategory('all');
                      }}
                    >
                      Effacer les filtres
                    </Button>
                  ) : (
                    <Button 
                      className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                      onClick={handleCreateProduct}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default ProductManagement;
