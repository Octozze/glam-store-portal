
import React, { useState } from 'react';
import { 
  Package, Users, ShoppingCart, Tag, BarChart, Settings, 
  ChevronRight, Plus, Search, PieChart, DollarSign, TrendingUp,
  Calendar, Eye, CreditCard, CheckCircle, XCircle, RotateCcw
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SalesChart from '@/components/admin/SalesChart';
import ConversionChart from '@/components/admin/ConversionChart';

const Admin: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedView, setSelectedView] = useState('overview');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mock data for dashboard
  const mockOrders = [
    { id: 1, customer: 'Sophie Martin', date: '2023-10-15', status: 'completed', total: 127.50 },
    { id: 2, customer: 'Lucas Dubois', date: '2023-10-16', status: 'processing', total: 89.90 },
    { id: 3, customer: 'Emma Bernard', date: '2023-10-16', status: 'processing', total: 215.30 },
    { id: 4, customer: 'Thomas Petit', date: '2023-10-14', status: 'refunded', total: 64.75 },
    { id: 5, customer: 'Camille Leroy', date: '2023-10-13', status: 'completed', total: 158.20 },
  ];

  const mockBestSellers = [
    { id: 1, name: 'Sérum Hydratant', sales: 128, revenue: 3840 },
    { id: 2, name: 'Crème Anti-Âge', sales: 94, revenue: 3290 },
    { id: 3, name: 'Masque Purifiant', sales: 83, revenue: 1660 },
    { id: 4, name: 'Huile Démaquillante', sales: 76, revenue: 1520 },
    { id: 5, name: 'Tonique Apaisant', sales: 65, revenue: 1300 },
  ];

  // Get order status badge
  const getOrderStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Complétée</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'refunded':
        return <Badge className="bg-red-500">Remboursée</Badge>;
      default:
        return <Badge>En attente</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Tableau de Bord Admin</h1>
            <p className="text-gray-600">Bienvenue, {user?.name}. Gérez vos produits, commandes et suivez les performances.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" /> 
              Derniers 30 jours
            </Button>
            <Button variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" /> 
              Actualiser
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList>
            <TabsTrigger value="overview" onClick={() => setSelectedView('overview')}>Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="products" onClick={() => setSelectedView('products')}>Produits</TabsTrigger>
            <TabsTrigger value="orders" onClick={() => setSelectedView('orders')}>Commandes</TabsTrigger>
            <TabsTrigger value="customers" onClick={() => setSelectedView('customers')}>Clients</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Revenus Totaux</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">4,280€</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +12.5% depuis le mois dernier
                      </div>
                    </div>
                    <DollarSign className="h-6 w-6 text-cosmetic-darkpink" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Visites</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">1,248</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +18.2% depuis le mois dernier
                      </div>
                    </div>
                    <Eye className="h-6 w-6 text-cosmetic-darkpink" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Commandes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> +5.3% depuis le mois dernier
                      </div>
                    </div>
                    <ShoppingCart className="h-6 w-6 text-cosmetic-darkpink" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Taux de Conversion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">3.4%</div>
                      <div className="text-xs text-red-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" /> -0.5% depuis le mois dernier
                      </div>
                    </div>
                    <PieChart className="h-6 w-6 text-cosmetic-darkpink" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Revenus générés</CardTitle>
                  <CardDescription>Revenus quotidiens des 30 derniers jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <SalesChart />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Taux de Conversion</CardTitle>
                  <CardDescription>Taux de visite/achat des 30 derniers jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <ConversionChart />
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Commandes Récentes</CardTitle>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Client</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                          <TableCell className="text-right">{order.total.toFixed(2)}€</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>Meilleures Ventes</CardTitle>
                  <Button variant="ghost" size="sm">Voir tout</Button>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Produit</TableHead>
                        <TableHead>Ventes</TableHead>
                        <TableHead className="text-right">Revenus</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockBestSellers.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.sales}</TableCell>
                          <TableCell className="text-right">{product.revenue}€</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
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
          </TabsContent>
          
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Gestion des Commandes</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <CheckCircle className="h-4 w-4" /> Complétées
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <CreditCard className="h-4 w-4" /> En cours
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <XCircle className="h-4 w-4" /> Remboursées
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                        <TableCell className="text-right">{order.total.toFixed(2)}€</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="customers" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Gestion des Clients</CardTitle>
                <Button className="h-10 bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white">
                  <Plus className="h-4 w-4 mr-2" /> Ajouter un client
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Commandes</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>1</TableCell>
                      <TableCell>Sophie Martin</TableCell>
                      <TableCell>sophie.martin@example.com</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>385.70€</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2</TableCell>
                      <TableCell>Lucas Dubois</TableCell>
                      <TableCell>lucas.dubois@example.com</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell>189.90€</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>3</TableCell>
                      <TableCell>Emma Bernard</TableCell>
                      <TableCell>emma.bernard@example.com</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>215.30€</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
