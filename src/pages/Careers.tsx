
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Layout from '@/components/Layout';
import { Briefcase, User, Phone, Mail, MapPin, FileText, Upload, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Define the job positions
const jobPositions = [
  {
    id: 1,
    title: "Responsable Marketing Digital",
    location: "Paris, France",
    type: "CDI",
    department: "Marketing",
    description: "Nous recherchons un(e) Responsable Marketing Digital pour superviser notre stratégie digitale et développer notre présence en ligne.",
    responsibilities: [
      "Élaborer et mettre en œuvre la stratégie marketing digital",
      "Gérer les campagnes publicitaires sur les réseaux sociaux",
      "Analyser les performances des campagnes et proposer des optimisations",
      "Collaborer avec l'équipe produit pour les lancements",
      "Superviser le contenu du site web et des newsletters"
    ],
    requirements: [
      "Diplôme en marketing ou communication",
      "3-5 ans d'expérience en marketing digital",
      "Maîtrise des outils d'analyse (Google Analytics, Meta Business)",
      "Excellentes compétences rédactionnelles",
      "Connaissance du secteur cosmétique appréciée"
    ]
  },
  {
    id: 2,
    title: "Conseiller(ère) de Vente",
    location: "Lyon, France",
    type: "CDI",
    department: "Ventes",
    description: "Nous recherchons un(e) conseiller(ère) de vente passionné(e) par la cosmétique pour rejoindre notre boutique à Lyon.",
    responsibilities: [
      "Accueillir et conseiller la clientèle",
      "Réaliser des ventes et fidéliser la clientèle",
      "Assurer la mise en valeur des produits",
      "Participer à la gestion des stocks",
      "Participer aux animations et événements en boutique"
    ],
    requirements: [
      "Expérience en vente, idéalement dans le secteur cosmétique",
      "Excellente présentation et sens du service client",
      "Connaissance des produits cosmétiques",
      "Dynamisme et esprit d'équipe",
      "Disponibilité les week-ends"
    ]
  },
  {
    id: 3,
    title: "Développeur Full Stack",
    location: "Remote",
    type: "CDI",
    department: "IT",
    description: "Rejoignez notre équipe technique pour développer notre plateforme e-commerce et nos outils internes.",
    responsibilities: [
      "Développer et maintenir notre site e-commerce",
      "Implémenter de nouvelles fonctionnalités",
      "Optimiser les performances et l'expérience utilisateur",
      "Collaborer avec les équipes produit et design",
      "Participer à l'architecture technique"
    ],
    requirements: [
      "3+ ans d'expérience en développement web",
      "Maîtrise de React, Node.js et des bases de données",
      "Expérience avec les API et les systèmes de paiement",
      "Connaissance des bonnes pratiques SEO",
      "Capacité à travailler en autonomie"
    ]
  }
];

// Define the form validation schema
const applicationSchema = z.object({
  firstName: z.string().min(2, { message: "Le prénom doit comporter au moins 2 caractères" }),
  lastName: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères" }),
  email: z.string().email({ message: "L'email n'est pas valide" }),
  phone: z.string().min(10, { message: "Le numéro de téléphone n'est pas valide" }),
  address: z.string().min(5, { message: "L'adresse est requise" }),
  jobPosition: z.string().min(1, { message: "Veuillez sélectionner un poste" }),
  coverLetter: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const Careers: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [uploadedCV, setUploadedCV] = useState<File | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      jobPosition: '',
      coverLetter: '',
    },
  });

  const handleViewJobDetails = (jobId: number) => {
    setSelectedJob(jobId);
    setShowJobDetails(true);
  };

  const handleApplyForJob = (jobId: number) => {
    setSelectedJob(jobId);
    setShowJobDetails(false);
    const job = jobPositions.find(job => job.id === jobId);
    if (job) {
      form.setValue('jobPosition', job.title);
    }
  };

  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type.includes('word')) {
        setUploadedCV(file);
        toast({
          title: "CV téléchargé",
          description: `Le fichier ${file.name} a été téléchargé avec succès.`,
        });
      } else {
        toast({
          title: "Format non supporté",
          description: "Veuillez télécharger un fichier PDF ou DOC/DOCX.",
          variant: "destructive",
        });
      }
    }
  };

  const onSubmit = (data: ApplicationFormValues) => {
    if (!uploadedCV) {
      toast({
        title: "CV manquant",
        description: "Veuillez télécharger votre CV pour postuler.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would send the form data and CV to your backend
    console.log("Application data:", data, "CV:", uploadedCV);
    
    setTimeout(() => {
      setApplicationSubmitted(true);
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été enregistrée avec succès. Nous reviendrons vers vous rapidement.",
      });
    }, 1000);
  };

  const selectedJobDetails = selectedJob ? jobPositions.find(job => job.id === selectedJob) : null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Carrières</h1>
        <p className="text-gray-600 mb-8">
          Rejoignez notre équipe et participez à la révolution de la beauté éthique et durable.
        </p>
        
        <Tabs defaultValue="jobs" className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="jobs">Offres d'emploi</TabsTrigger>
            <TabsTrigger value="application">Postuler</TabsTrigger>
            <TabsTrigger value="about">À propos de nous</TabsTrigger>
          </TabsList>
          
          <TabsContent value="jobs">
            {showJobDetails && selectedJobDetails ? (
              <div className="space-y-6">
                <Button 
                  variant="outline" 
                  className="mb-4"
                  onClick={() => setShowJobDetails(false)}
                >
                  Retour aux offres
                </Button>
                
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div>
                        <CardTitle className="text-2xl font-serif">{selectedJobDetails.title}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" /> {selectedJobDetails.department}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" /> {selectedJobDetails.location}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span>{selectedJobDetails.type}</span>
                        </CardDescription>
                      </div>
                      <Button 
                        className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                        onClick={() => handleApplyForJob(selectedJobDetails.id)}
                      >
                        Postuler maintenant
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-3">Description du poste</h3>
                      <p className="text-gray-700">{selectedJobDetails.description}</p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Responsabilités</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {selectedJobDetails.responsibilities.map((resp, index) => (
                          <li key={index}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="font-medium text-lg mb-3">Qualifications requises</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {selectedJobDetails.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mt-6">
                      <h3 className="font-medium text-lg mb-2">Ce que nous offrons</h3>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        <li>Environnement de travail dynamique et bienveillant</li>
                        <li>Produits à prix préférentiels</li>
                        <li>Formation continue et développement professionnel</li>
                        <li>Équipe passionnée et collaborative</li>
                        <li>Avantages sociaux attractifs</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowJobDetails(false)}
                    >
                      Retour aux offres
                    </Button>
                    <Button 
                      className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                      onClick={() => handleApplyForJob(selectedJobDetails.id)}
                    >
                      Postuler maintenant
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {jobPositions.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div>
                            <h3 className="text-xl font-medium mb-1">{job.title}</h3>
                            <p className="text-gray-600 text-sm flex flex-col sm:flex-row sm:items-center gap-2">
                              <span className="flex items-center">
                                <Briefcase className="h-4 w-4 mr-1" /> {job.department}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" /> {job.location}
                              </span>
                              <span className="hidden sm:inline">•</span>
                              <span>{job.type}</span>
                            </p>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline"
                              onClick={() => handleViewJobDetails(job.id)}
                            >
                              Voir détails
                            </Button>
                            <Button 
                              className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                              onClick={() => handleApplyForJob(job.id)}
                            >
                              Postuler
                            </Button>
                          </div>
                        </div>
                        <p className="mt-4 text-gray-700">{job.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="application">
            {!applicationSubmitted ? (
              <Card>
                <CardHeader>
                  <CardTitle>Formulaire de candidature</CardTitle>
                  <CardDescription>
                    Remplissez ce formulaire pour postuler à l'une de nos offres d'emploi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prénom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre prénom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom</FormLabel>
                              <FormControl>
                                <Input placeholder="Votre nom" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="votre.email@exemple.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder="06 XX XX XX XX" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Input placeholder="Votre adresse complète" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="jobPosition"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Poste convoité</FormLabel>
                            <FormControl>
                              <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                {...field}
                              >
                                <option value="">Sélectionnez un poste</option>
                                {jobPositions.map((job) => (
                                  <option key={job.id} value={job.title}>
                                    {job.title}
                                  </option>
                                ))}
                                <option value="Autre">Autre / Candidature spontanée</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-3">
                        <Label htmlFor="cv-upload">CV (PDF, DOC, DOCX)</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                          {uploadedCV ? (
                            <div className="space-y-3 w-full">
                              <div className="bg-gray-100 p-3 rounded-md flex items-center">
                                <FileText className="h-6 w-6 text-cosmetic-darkpink mr-2" />
                                <span className="text-sm font-medium truncate">{uploadedCV.name}</span>
                              </div>
                              <div className="text-center">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => setUploadedCV(null)}
                                >
                                  Supprimer le CV
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-12 w-12 text-gray-400 mb-2" />
                              <div className="text-center">
                                <p className="text-sm text-gray-600 mb-1">
                                  Glissez-déposez votre CV ou
                                </p>
                                <Button
                                  type="button"
                                  variant="outline"
                                  className="relative"
                                >
                                  Parcourir
                                  <input
                                    id="cv-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    onChange={handleCVUpload}
                                  />
                                </Button>
                              </div>
                              <p className="text-xs text-gray-500 mt-2">
                                PDF, DOC ou DOCX jusqu'à 5MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Lettre de motivation (optionnel)</FormLabel>
                            <FormControl>
                              <textarea
                                className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                                placeholder="Pourquoi souhaitez-vous rejoindre notre entreprise ?"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          className="w-full bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
                        >
                          Envoyer ma candidature
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-6">
                    <div className="bg-green-100 p-3 rounded-full inline-flex items-center justify-center mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="font-serif text-2xl font-bold mb-2">Candidature envoyée avec succès</h2>
                    <p className="text-gray-600 mb-4">
                      Nous avons bien reçu votre candidature et nous l'étudierons avec attention. 
                      Vous recevrez un email de confirmation dans les prochaines minutes.
                    </p>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setApplicationSubmitted(false);
                          form.reset();
                          setUploadedCV(null);
                        }}
                      >
                        Envoyer une autre candidature
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>À propos de notre entreprise</CardTitle>
                <CardDescription>
                  Découvrez notre culture d'entreprise et ce qui nous distingue
                </CardDescription>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <h3>Notre Mission</h3>
                <p>
                  Chez Beauté Cosmétique, nous sommes dédiés à créer des produits de beauté innovants, éthiques et durables. Notre mission est d'aider chaque personne à révéler sa beauté naturelle tout en préservant la planète.
                </p>
                
                <h3>Notre Culture</h3>
                <p>
                  Nous cultivons un environnement de travail bienveillant et dynamique où chaque membre de l'équipe est encouragé à partager ses idées et à contribuer à notre succès collectif. Nous valorisons la diversité, l'inclusion et le développement personnel.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="bg-cosmetic-pink p-3 rounded-full inline-flex items-center justify-center mb-3">
                      <User className="h-6 w-6 text-cosmetic-darkpink" />
                    </div>
                    <h4 className="font-medium text-lg mb-2">Développement personnel</h4>
                    <p className="text-gray-700 text-sm">
                      Nous investissons dans la formation et le développement de nos employés pour les aider à atteindre leur plein potentiel.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="bg-cosmetic-pink p-3 rounded-full inline-flex items-center justify-center mb-3">
                      <Briefcase className="h-6 w-6 text-cosmetic-darkpink" />
                    </div>
                    <h4 className="font-medium text-lg mb-2">Innovation constante</h4>
                    <p className="text-gray-700 text-sm">
                      Nous encourageons la créativité et l'expérimentation pour rester à la pointe de l'industrie cosmétique.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="bg-cosmetic-pink p-3 rounded-full inline-flex items-center justify-center mb-3">
                      <CheckCircle className="h-6 w-6 text-cosmetic-darkpink" />
                    </div>
                    <h4 className="font-medium text-lg mb-2">Engagement éthique</h4>
                    <p className="text-gray-700 text-sm">
                      Notre engagement pour la durabilité et l'éthique guide toutes nos décisions commerciales.
                    </p>
                  </div>
                </div>
                
                <h3>Pourquoi nous rejoindre ?</h3>
                <ul>
                  <li>Participer à la croissance d'une entreprise innovante dans le secteur de la beauté</li>
                  <li>Bénéficier d'un package salarial compétitif et d'avantages sociaux attractifs</li>
                  <li>Évoluer dans un environnement de travail flexible et bienveillant</li>
                  <li>Contribuer à un impact positif sur l'industrie de la beauté</li>
                  <li>Accéder à nos produits avec des remises exclusives pour les employés</li>
                </ul>
                
                <blockquote className="italic border-l-4 border-cosmetic-darkpink pl-4 my-6">
                  "Nous cherchons des talents passionnés qui partagent notre vision d'une beauté éthique et durable. Rejoignez-nous pour faire partie de cette aventure extraordinaire."<br />
                  <span className="not-italic font-medium">— Marie Dupont, Directrice des Ressources Humaines</span>
                </blockquote>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Careers;
