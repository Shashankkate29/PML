import React from 'react';
import { SEO } from '../components/SEO';
import { AboutSection } from '../sections/AboutSection';
import { GlassCard } from '../ui/GlassCard';

export const About: React.FC = () => {
  const values = [
    { title: 'Uncompromising Standards', desc: 'Every barbell, recovery tub, and coaching protocol is vetted to meet professional athletic specifications.' },
    { title: 'Scientific Foundations', desc: 'We utilize biomechanics assessments and physiological research to guide conditioning and recovery programs.' },
    { title: 'Integrated Wellness', desc: 'Performance is nothing without restoration. We unite training and recovery labs under one roof.' }
  ];

  return (
    <>
      <SEO 
        title="About Us" 
        description="Learn about the heritage, mission, and scientific principles behind PML GYM's training and recovery systems."
        canonicalPath="/about"
      />
      
      <div style={{ padding: 'clamp(6rem, 10vw, 10rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 5vw, 5rem)', backgroundColor: 'var(--color-bg-deep)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>Our Philosophy</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Building resilient bodies and sharp minds through balanced training and clinical-grade recovery.
          </p>
        </div>
      </div>

      <AboutSection />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              OUR BENCHMARKS
            </span>
            <h2 style={{ fontSize: '2rem' }}>Our Core Principles</h2>
          </div>
          <div className="grid-auto-fit" style={{ alignItems: 'stretch' }}>
            {values.map((val, i) => (
              <GlassCard key={i} hoverEffect={true} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>{val.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', flex: 1 }}>{val.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
