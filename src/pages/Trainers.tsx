import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { GlassCard } from '../ui/GlassCard';

export const Trainers: React.FC = () => {
  return (
    <>
      <SEO 
        title="Coaching & Trainers" 
        description="Learn about personal training and fitness coaching at PML GYM. Professional guidance customized for your fitness and strength goals."
        canonicalPath="/trainers"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', flex: 1, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              PERSONAL COACHING
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Train with Professional Guidance</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '32px' }}>
              At PML GYM, our certified fitness coaches are dedicated to helping you build strength, improve endurance, and recover safely. We offer customized one-to-one coaching programs and structured training plans tailored to your specific fitness objectives.
            </p>
          </div>

          <GlassCard style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--color-primary)', margin: 0 }}>Start Your Personal Training Journey</h3>
            <p style={{ color: 'var(--color-text-light)', fontSize: '1rem', lineHeight: '1.6', margin: 0 }}>
              Trainer availability, schedules, and personalized packages vary by branch. Get in touch with our team to match with a coach at your preferred location.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
              <Link to="/branches" className="btn-secondary" style={{ textDecoration: 'none' }}>
                View Branches
              </Link>
              <Link to="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
                Enquire Now
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
};

export default Trainers;
