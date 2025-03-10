
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/Layout';
import { UploadCloud, Package, ArrowLeft, Check, RefreshCcw, AlignLeft, FileText, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Define the form validation schema
const returnFormSchema = z.object({
  orderNumber: z.string().min(1, { message: "Le numéro de commande est requis" }),
  reason: z.enum(["defective", "wrong_item", "not_satisfied", "other"], {
    required_error: "Veuillez sélectionner une raison",
  }),
  comments: z.string().optional(),
});

type ReturnFormValues = z.infer<typeof returnFormSchema>;

const Returns: React.FC = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [returnSubmitted, setReturnSubmitted] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnFormSchema),
    defaultValues: {
      orderNumber: '',
      reason: "defective",
      comments: '',
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      toast({
        title: "Image téléchargée",
        description: `Le fichier ${file.name} a été téléchargé avec succès.`,
      });
    }
  };

  const onSubmit = (data: ReturnFormValues) => {
    console.log("Return request submitted:", data, uploadedImage);
    
    // In a real app, you would send this data to your backend
    setTimeout(() => {
      setReturnSubmitted(true);
      toast({
        title: "Demande envoyée",
        description: "Votre demande de retour a été enregistrée avec succès.",
      });
    }, 1000);
  };

  const getLabel = (reason: string) => {
    switch (reason) {
      case 'defective': return 'Produit défectueux';
      case 'wrong_item': return 'Mauvaise commande';
      case 'not_satisfied': return 'Insatisfaction';
      case 'other': return 'Autre raison';
      default: return '';
    }
  };

  const handleDownloadLabel = () => {
    // In a real app, this would generate a return shipping label
    toast({
      title: "Étiquette générée",
      description: "L'étiquette de retour a été générée et téléchargée.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Retours et Remboursements</h1>
        <p className="text-gray-600 mb-8">
          Nous voulons que vous soyez entièrement satisfait de votre achat. Si ce n'est pas le cas, nous sommes là pour vous aider.
        </p>
        
        <Tabs defaultValue="form" onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="form">Demande de retour</TabsTrigger>
            <TabsTrigger value="tracking">Suivi de demande</TabsTrigger>
            <TabsTrigger value="policy">Politique de retour</TabsTrigger>
          </TabsList>
          
          <TabsContent value="form">
            {!returnSubmitted ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Formulaire de demande de retour</CardTitle>
                      <CardDescription>
                        Remplissez ce formulaire pour initier un retour de produit
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                          <FormField
                            control={form.control}
                            name="orderNumber"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Numéro de commande</FormLabel>
                                <FormControl>
                                  <Input placeholder="Par ex. ORD-12345" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="reason"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Motif du retour</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-y-2"
                                  >
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="defective" id="defective" />
                                      <Label htmlFor="defective">Produit défectueux</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="wrong_item" id="wrong_item" />
                                      <Label htmlFor="wrong_item">Mauvaise commande</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="not_satisfied" id="not_satisfied" />
                                      <Label htmlFor="not_satisfied">Insatisfaction</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <RadioGroupItem value="other" id="other" />
                                      <Label htmlFor="other">Autre raison</Label>
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="comments"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Commentaires additionnels</FormLabel>
                                <FormControl>
                                  <textarea
                                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                    placeholder="Décrivez le problème rencontré..."
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="space-y-2">
                            <Label htmlFor="product-image">Télécharger une photo du produit</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                              {uploadedImage ? (
                                <div className="space-y-4 w-full">
                                  <div className="aspect-square w-32 mx-auto overflow-hidden rounded-md">
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
                                        id="product-image"
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
                          
                          <div className="pt-4">
                            <Button 
                              type="submit" 
                              className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                            >
                              Soumettre la demande
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informations utiles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-cosmetic-pink p-2 rounded-full">
                            <Package className="h-5 w-5 text-cosmetic-darkpink" />
                          </div>
                          <div>
                            <h4 className="font-medium">Retours gratuits</h4>
                            <p className="text-sm text-gray-600">Tous les retours sont gratuits dans les 30 jours suivant l'achat</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-cosmetic-pink p-2 rounded-full">
                            <RefreshCcw className="h-5 w-5 text-cosmetic-darkpink" />
                          </div>
                          <div>
                            <h4 className="font-medium">Remboursement rapide</h4>
                            <p className="text-sm text-gray-600">Remboursement traité sous 5 jours ouvrés après réception</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <div className="bg-cosmetic-pink p-2 rounded-full">
                            <AlignLeft className="h-5 w-5 text-cosmetic-darkpink" />
                          </div>
                          <div>
                            <h4 className="font-medium">Procédure simple</h4>
                            <p className="text-sm text-gray-600">Instructions détaillées envoyées par email après soumission</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold mb-2">Demande enregistrée avec succès</h2>
                    <p className="text-gray-600 mb-4">
                      Votre demande de retour a bien été prise en compte. Un email de confirmation avec les étapes suivantes a été envoyé à votre adresse.
                    </p>
                    <Button 
                      onClick={handleDownloadLabel} 
                      className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white mb-4"
                    >
                      Télécharger l'étiquette de retour
                    </Button>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setReturnSubmitted(false);
                          form.reset();
                          setUploadedImage(null);
                        }}
                      >
                        Soumettre une autre demande
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="tracking">
            <Card>
              <CardHeader>
                <CardTitle>Suivi de votre demande de retour</CardTitle>
                <CardDescription>
                  Entrez votre numéro de commande pour suivre l'état de votre demande de retour
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4">
                  <Input placeholder="Numéro de commande (ex: ORD-12345)" className="flex-1" />
                  <Button className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white">
                    Vérifier
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="font-medium text-lg mb-2">Entrez votre numéro de commande</h3>
                    <p className="text-gray-600">
                      Saisissez le numéro de commande fourni dans votre email de confirmation pour suivre l'état de votre demande de retour.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="policy">
            <Card>
              <CardHeader>
                <CardTitle>Notre politique de retour</CardTitle>
                <CardDescription>
                  Informations détaillées sur notre politique de retours et remboursements
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Conditions générales de retour</h3>
                <p>
                  Chez Beauté Cosmétique, nous nous engageons à vous offrir des produits de qualité. Si vous n'êtes pas satisfait(e) de votre achat, vous pouvez le retourner sous 30 jours à compter de la date de réception.
                </p>
                
                <h4>Produits éligibles au retour</h4>
                <ul>
                  <li>Le produit doit être dans son emballage d'origine, non ouvert et non utilisé.</li>
                  <li>Les produits scellés ne peuvent être retournés s'ils ont été ouverts, pour des raisons d'hygiène.</li>
                  <li>Les articles en promotion ou soldés peuvent être soumis à des conditions spécifiques.</li>
                </ul>
                
                <h4>Procédure de retour</h4>
                <ol>
                  <li>Remplissez le formulaire de demande de retour en ligne.</li>
                  <li>Après validation, vous recevrez une étiquette de retour par email.</li>
                  <li>Emballez soigneusement le produit dans son emballage d'origine.</li>
                  <li>Collez l'étiquette de retour sur le colis.</li>
                  <li>Déposez le colis au point de collecte indiqué.</li>
                </ol>
                
                <h4>Remboursements</h4>
                <p>
                  Une fois votre retour reçu et inspecté, nous traiterons votre remboursement dans un délai de 5 jours ouvrés. Le montant sera crédité sur le mode de paiement utilisé lors de l'achat.
                </p>
                
                <h4>Produits défectueux</h4>
                <p>
                  Si vous recevez un produit défectueux, veuillez nous contacter dans les 14 jours suivant la réception. Nous vous enverrons un produit de remplacement ou procéderons à un remboursement intégral, frais de livraison inclus.
                </p>
                
                <h4>Exceptions</h4>
                <p>
                  Certains produits ne sont pas éligibles au retour, notamment :
                </p>
                <ul>
                  <li>Les échantillons gratuits et coffrets cadeaux.</li>
                  <li>Les produits personnalisés.</li>
                  <li>Les cartes cadeaux.</li>
                </ul>
                
                <h4>Questions fréquentes</h4>
                <p><strong>Combien de temps ai-je pour retourner un produit ?</strong><br />
                Vous disposez de 30 jours à compter de la date de réception pour retourner un produit.</p>
                
                <p><strong>Les frais de retour sont-ils gratuits ?</strong><br />
                Oui, tous les retours sont gratuits au sein de la France métropolitaine.</p>
                
                <p><strong>Combien de temps faut-il pour recevoir mon remboursement ?</strong><br />
                Le remboursement est traité dans les 5 jours ouvrés suivant la réception de votre retour.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Returns;
