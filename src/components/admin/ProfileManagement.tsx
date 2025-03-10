
import React, { useState } from 'react';
import { 
  Card, CardContent, CardHeader, CardTitle, 
  CardDescription, CardFooter 
} from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Phone, MapPin, Mail, Edit, Save, 
  Trash2, Eye, ShoppingBag, Lock, Search,
  Plus, MoreHorizontal, UserCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogTrigger, DialogFooter, 
  DialogDescription
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock user data for client profiles
const mockUsers = [
  { 
    id: 1, 
    name: 'Sophie Martin', 
    email: 'sophie.martin@example.com', 
    phone: '+33 6 12 34 56 78',
    address: '15 Rue de la Paix, 75001 Paris, France',
    registeredDate: '2023-05-12',
    ordersCount: 3,
    totalSpent: 385.70,
    lastLogin: '2023-10-15',
    isActive: true
  },
  { 
    id: 2, 
    name: 'Lucas Dubois', 
    email: 'lucas.dubois@example.com', 
    phone: '+33 6 98 76 54 32',
    address: '28 Avenue Victor Hugo, 69002 Lyon, France',
    registeredDate: '2023-06-20',
    ordersCount: 2,
    totalSpent: 189.90,
    lastLogin: '2023-10-10',
    isActive: true
  },
  { 
    id: 3, 
    name: 'Emma Bernard', 
    email: 'emma.bernard@example.com', 
    phone: '+33 6 45 67 89 01',
    address: '7 Boulevard Saint-Michel, 33000 Bordeaux, France',
    registeredDate: '2023-07-05',
    ordersCount: 1,
    totalSpent: 215.30,
    lastLogin: '2023-10-08',
    isActive: true
  },
  { 
    id: 4, 
    name: 'Thomas Petit', 
    email: 'thomas.petit@example.com', 
    phone: '+33 6 23 45 67 89',
    address: '42 Rue de la République, 13001 Marseille, France',
    registeredDate: '2023-08-15',
    ordersCount: 4,
    totalSpent: 456.45,
    lastLogin: '2023-10-16',
    isActive: true
  },
  { 
    id: 5, 
    name: 'Camille Leroy', 
    email: 'camille.leroy@example.com', 
    phone: '+33 6 56 78 90 12',
    address: '10 Place du Capitole, 31000 Toulouse, France',
    registeredDate: '2023-09-01',
    ordersCount: 2,
    totalSpent: 298.60,
    lastLogin: '2023-10-12',
    isActive: false
  }
];

// Mock orders for user history
const mockOrderHistory = [
  { id: 1001, userId: 1, date: '2023-10-15', status: 'completed', products: [
    { name: 'Sérum Hydratant', quantity: 1, price: 45.90 },
    { name: 'Crème Anti-Âge', quantity: 1, price: 89.90 }
  ], total: 135.80 },
  { id: 1002, userId: 1, date: '2023-09-28', status: 'completed', products: [
    { name: 'Masque Purifiant', quantity: 2, price: 19.95 },
    { name: 'Huile Démaquillante', quantity: 1, price: 29.90 }
  ], total: 69.80 },
  { id: 1003, userId: 1, date: '2023-08-17', status: 'refunded', products: [
    { name: 'Tonique Apaisant', quantity: 1, price: 22.50 }
  ], total: 22.50 },
  { id: 2001, userId: 2, date: '2023-10-10', status: 'completed', products: [
    { name: 'Sérum Hydratant', quantity: 1, price: 45.90 },
    { name: 'Huile Démaquillante', quantity: 1, price: 29.90 }
  ], total: 75.80 },
  { id: 2002, userId: 2, date: '2023-09-05', status: 'completed', products: [
    { name: 'Crème Anti-Âge', quantity: 1, price: 89.90 },
    { name: 'Tonique Apaisant', quantity: 1, price: 22.50 }
  ], total: 112.40 }
];

const ProfileManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [userForm, setUserForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState('all');

  // Filter users based on search and active status
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && user.isActive;
    if (activeTab === 'inactive') return matchesSearch && !user.isActive;
    return matchesSearch;
  });

  // Handle user selection for viewing details
  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setUserForm({ ...user });
    setEditMode(false);
  };

  // Toggle edit mode
  const handleEditUser = () => {
    setEditMode(true);
  };

  // Handle form field changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  // Save user changes (in a real app, this would update the database)
  const handleSaveUser = () => {
    // In a real app, this would call an API to update the user
    setSelectedUser(userForm);
    setEditMode(false);
  };

  // Get orders for selected user
  const getUserOrders = (userId: number) => {
    return mockOrderHistory.filter(order => order.userId === userId);
  };

  // Get order status badge
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2">
          <CardTitle>Gestion des Profils Clients</CardTitle>
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
          <Tabs defaultValue="all" className="w-full mb-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="active">Actifs</TabsTrigger>
              <TabsTrigger value="inactive">Inactifs</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Total dépensé</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.ordersCount}</TableCell>
                    <TableCell>{user.totalSpent.toFixed(2)}€</TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <Badge className="bg-green-500">Actif</Badge>
                      ) : (
                        <Badge className="bg-gray-500">Inactif</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewUser(user)}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Voir détails</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShoppingBag className="mr-2 h-4 w-4" />
                            <span>Commandes</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Lock className="mr-2 h-4 w-4" />
                            <span>Réinitialiser mot de passe</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className={user.isActive ? "text-red-500" : "text-green-500"}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            <span>{user.isActive ? "Désactiver" : "Activer"}</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun client trouvé.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Profil de {selectedUser.name}</DialogTitle>
              <DialogDescription>
                Client depuis le {selectedUser.registeredDate}
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="info" className="mt-4">
              <TabsList>
                <TabsTrigger value="info">Informations</TabsTrigger>
                <TabsTrigger value="orders">Historique des commandes</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="space-y-4 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Nom complet</label>
                      {editMode ? (
                        <Input 
                          name="name" 
                          value={userForm.name} 
                          onChange={handleFormChange} 
                        />
                      ) : (
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedUser.name}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Email</label>
                      {editMode ? (
                        <Input 
                          name="email" 
                          value={userForm.email} 
                          onChange={handleFormChange} 
                        />
                      ) : (
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedUser.email}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Téléphone</label>
                      {editMode ? (
                        <Input 
                          name="phone" 
                          value={userForm.phone} 
                          onChange={handleFormChange} 
                        />
                      ) : (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedUser.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Adresse</label>
                      {editMode ? (
                        <Input 
                          name="address" 
                          value={userForm.address} 
                          onChange={handleFormChange} 
                        />
                      ) : (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{selectedUser.address}</span>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Dernière connexion</label>
                      <div className="flex items-center">
                        <span>{selectedUser.lastLogin}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500 mb-1 block">Statut</label>
                      <div>
                        {selectedUser.isActive ? (
                          <Badge className="bg-green-500">Actif</Badge>
                        ) : (
                          <Badge className="bg-gray-500">Inactif</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="pt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Produits</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getUserOrders(selectedUser.id).map((order) => (
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
                
                {getUserOrders(selectedUser.id).length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Aucune commande trouvée pour ce client.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="security" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Sécurité du compte</CardTitle>
                    <CardDescription>
                      Gérez les paramètres de sécurité du compte utilisateur
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Button variant="outline" className="w-full sm:w-auto">
                        <Lock className="h-4 w-4 mr-2" />
                        Réinitialiser le mot de passe
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        Un email sera envoyé à l'utilisateur pour réinitialiser son mot de passe.
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Connexion au compte</h4>
                      <Button variant={selectedUser.isActive ? "destructive" : "outline"} className="w-full sm:w-auto">
                        {selectedUser.isActive ? (
                          <>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Désactiver le compte
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Activer le compte
                          </>
                        )}
                      </Button>
                      <p className="text-sm text-gray-500 mt-2">
                        {selectedUser.isActive
                          ? "La désactivation empêchera l'utilisateur de se connecter à son compte."
                          : "L'activation permettra à l'utilisateur de se connecter à son compte."}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex justify-between items-center">
              {editMode ? (
                <>
                  <Button variant="outline" onClick={() => setEditMode(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleSaveUser}>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => setSelectedUser(null)}>
                    Fermer
                  </Button>
                  <Button onClick={handleEditUser}>
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProfileManagement;
