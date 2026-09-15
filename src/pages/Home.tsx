import React from 'react';
import { SEO } from '../components/SEO';
import { HeroSection } from '../sections/HeroSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { AboutSection } from '../sections/AboutSection';
import { RecoverySection } from '../sections/RecoverySection';
import { ContactSection } from '../sections/ContactSection';

export const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Home" 
        description="Experience the pinnacle of fitness at PML GYM. State-of-the-art weights, professional coaching, and premium Contrast Therapy Recovery Labs."
        canonicalPath="/"
      />
      
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <RecoverySection />
      <ContactSection />
    </>
  );
};

export default Home;
