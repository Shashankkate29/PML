import React from 'react';
import { SEO } from '../components/SEO';
import { ContactSection } from '../sections/ContactSection';

export const Contact: React.FC = () => {
  return (
    <>
      <SEO 
        title="Contact Us" 
        description="Get in touch with PML GYM to learn more about our branches, check facilities, or inquire about memberships."
        canonicalPath="/contact"
      />
      <div style={{ paddingTop: '40px', backgroundColor: 'var(--color-bg-deep)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Contact Us</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>We are here to assist. Connect with our team or visit a local branch today.</p>
        </div>
      </div>
      <ContactSection />
    </>
  );
};

export default Contact;
