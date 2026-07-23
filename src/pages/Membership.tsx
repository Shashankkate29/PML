import React from 'react';
import { SEO } from '../components/SEO';
import { MembershipSection } from '../sections/MembershipSection';

export const Membership: React.FC = () => {
  return (
    <>
      <SEO 
        title="Memberships" 
        description="Choose a membership tier at PML GYM: Standard Access, Elite Executive, or VIP Prestige. Flexible pricing plans, contrast suite access, and coaching options."
        canonicalPath="/membership"
      />
      <div style={{ paddingTop: '40px', backgroundColor: 'var(--color-bg-deep)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>Membership Plans</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto' }}>Invest in your health. Select a pricing structure tailored to your fitness objectives and recovery priorities.</p>
        </div>
      </div>
      <MembershipSection />
    </>
  );
};

export default Membership;
