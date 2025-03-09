
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="hero-gradient absolute inset-0 z-0"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-center md:text-left">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
            Révélez votre beauté naturelle
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 animate-slide-up">
            Découvrez notre collection de cosmétiques premium pour prendre soin de votre peau et révéler votre éclat naturel.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button 
              size="lg" 
              className="bg-cosmetic-darkpink hover:bg-cosmetic-darkpink/90 text-white"
              asChild
            >
              <Link to="/products">
                Acheter maintenant <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-cosmetic-darkpink text-cosmetic-darkpink hover:bg-cosmetic-pink/20"
              asChild
            >
              <Link to="/about">
                En savoir plus
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cosmetic-pink/20 -z-10 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
