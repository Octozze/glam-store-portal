
import React, { useState } from 'react';
import { 
  Package, Users, ShoppingCart, Tag, BarChart, Settings, 
  ChevronRight, Plus, Search 
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { products } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Tableau de Bord Admin</h1>
        <p className="text-gray-600 mb-8">Gérez vos produits, commandes et clients.</p>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Produits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">{products.length}</div>
                <Package className="h-5 w-5 text-cosmetic-darkpink" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">24</div>
                <ShoppingCart className="h-5 w-5 text-cosmetic-darkpink" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">156</div>
                <Users className="h-5 w-5 text-cosmetic-darkpink" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">4,280€</div>
                <BarChart className="h-5 w-5 text-cosmetic-darkpink" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                    <Package className="mr-2 h-5 w-5 text-cosmetic-darkpink" />
                    <span>Produits</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    <span>Commandes</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                    <Users className="mr-2 h-5 w-5" />
                    <span>Clients</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                    <Tag className="mr-2 h-5 w-5" />
                    <span>Promotions</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                    <BarChart className="mr-2 h-5 w-5" />
                    <span>Statistiques</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-4 rounded-none">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Paramètres</span>
                    <ChevronRight className="ml-auto h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
                <CardTitle>Gestion des Produits</CardTitle>
                <div className="flex items-center mt-2 sm:mt-0">
                  <div className="relative mr-2">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input 
                      type="search" 
                      placeholder="Rechercher..." 
                      className="pl-8 h-10" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button className="h-10 bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Ajouter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Nom</TableHead>
                        <TableHead>Catégorie</TableHead>
                        <TableHead>Marque</TableHead>
                        <TableHead>Prix</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.slice(0, 5).map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-10 h-10 mr-3 bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover" 
                                />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>{product.price.toFixed(2)}€</TableCell>
                          <TableCell>
                            {product.isNew && <Badge className="bg-green-500">Nouveau</Badge>}
                            {product.isBestSeller && <Badge className="bg-blue-500">Populaire</Badge>}
                            {product.discount && <Badge className="bg-cosmetic-gold">Remise {product.discount}%</Badge>}
                            {!product.isNew && !product.isBestSeller && !product.discount && 
                              <Badge className="bg-gray-500">Standard</Badge>
                            }
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Settings className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                {filteredProducts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucun produit trouvé.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
