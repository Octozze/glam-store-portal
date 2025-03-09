
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import RegisterForm from '@/components/auth/RegisterForm';
import LoginForm from '@/components/auth/LoginForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultTab = location.hash === '#register' ? 'register' : 'login';

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6 border border-cosmetic-pink">
          <h1 className="text-2xl font-serif text-center mb-6">
            <span className="text-cosmetic-darkpink">Belle</span>Cosmetics
          </h1>
          
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login" onClick={() => navigate('/auth#login')}>Connexion</TabsTrigger>
              <TabsTrigger value="register" onClick={() => navigate('/auth#register')}>Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
