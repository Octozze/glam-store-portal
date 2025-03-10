
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, LogOut, MapPin, Phone, ShoppingBag, Lock, Edit, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock order history for demo purposes
const mockOrders = [
  { 
    id: 1001, 
    date: '15/10/2023', 
    status: 'completed', 
    products: [
      { name: 'Sérum Hydratant', quantity: 1, price: 45.90 },
      { name: 'Crème Anti-Âge', quantity: 1, price: 89.90 }
    ], 
    total: 135.80 
  },
  { 
    id: 1002, 
    date: '28/09/2023', 
    status: 'delivered', 
    products: [
      { name: 'Masque Purifiant', quantity: 2, price: 19.95 },
      { name: 'Huile Démaquillante', quantity: 1, price: 29.90 }
    ], 
    total: 69.80 
  },
  { 
    id: 1003, 
    date: '17/08/2023', 
    status: 'refunded', 
    products: [
      { name: 'Tonique Apaisant', quantity: 1, price: 22.50 }
    ], 
    total: 22.50 
  }
];

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userForm, setUserForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+33 6 12 34 56 78', // Mock data
    address: '15 Rue de la Paix, 75001 Paris, France' // Mock data
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditToggle = () => {
    if (editMode) {
      // In a real app, save changes here
      setEditMode(false);
    } else {
      setEditMode(true);
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const getOrderStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge className="bg-green-500">Complétée</Badge>;
      case 'processing':
        return <Badge className="bg-blue-500">En cours</Badge>;
      case 'refunded':
        return <Badge className="bg-red-500">Remboursée</Badge>;
      case 'shipped':
        return <Badge className="bg-yellow-500">Expédiée</Badge>;
      case 'delivered':
        return <Badge className="bg-purple-500">Livrée</Badge>;
      default:
        return <Badge>En attente</Badge>;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-serif mb-6">Mon Profil</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-cosmetic-pink">
                  <AvatarFallback className="bg-cosmetic-darkpink text-white text-xl">
                    {user.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <CardDescription>Client depuis Mai 2023</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+33 6 12 34 56 78</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>15 Rue de la Paix, 75001 Paris, France</span>
                </div>
                
                <div className="border-t pt-4 mt-4 space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate('/cart')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Mon Panier
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Changer mon mot de passe
                  </Button>
                  
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                    className="w-full mt-4"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations personnelles</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="info" className="w-full">
                  <TabsList>
                    <TabsTrigger value="info">Mon Compte</TabsTrigger>
                    <TabsTrigger value="orders">Mes Commandes</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="info" className="mt-4 space-y-4">
                    {editMode ? (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Nom complet</label>
                          <Input 
                            name="name" 
                            value={userForm.name} 
                            onChange={handleFormChange} 
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Email</label>
                          <Input 
                            name="email" 
                            value={userForm.email} 
                            onChange={handleFormChange} 
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Téléphone</label>
                          <Input 
                            name="phone" 
                            value={userForm.phone} 
                            onChange={handleFormChange} 
                          />
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Adresse</label>
                          <Input 
                            name="address" 
                            value={userForm.address} 
                            onChange={handleFormChange} 
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Nom complet</label>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{userForm.name}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Email</label>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{userForm.email}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Téléphone</label>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{userForm.phone}</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500 mb-1 block">Adresse</label>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            <span>{userForm.address}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="orders" className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>N° Commande</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Produits</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>#{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>
                              <ul className="list-disc list-inside">
                                {order.products.map((product, index) => (
                                  <li key={index}>
                                    {product.name} x{product.quantity}
                                  </li>
                                ))}
                              </ul>
                            </TableCell>
                            <TableCell>{getOrderStatusBadge(order.status)}</TableCell>
                            <TableCell className="text-right">{order.total.toFixed(2)}€</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleEditToggle} className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90">
                  {editMode ? (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Modifier
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
