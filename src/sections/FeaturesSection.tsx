import React from 'react';
import { GlassCard } from '../ui/GlassCard';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Science-Backed Recovery',
      description: 'Contrast therapy cold plunges, infrared saunas, and localized compression therapies optimized for cellular recovery and physical longevity.',
      icon: '❄️'
    },
    {
      title: 'Biometric Training',
      description: 'Our certified performance coaches build bespoke programs backed by structural biomechanics and physical assessments.',
      icon: '🧬'
    },
    {
      title: 'Elite Gym Arenas',
      description: 'Equipped with custom premium plates, specialized lifting platforms, and professional strength machines.',
      icon: '🏋️‍♂️'
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
            WHY PML GYM
          </span>
          <h2 style={{ fontSize: '2.2rem' }}>Engineered for Performance</h2>
        </div>

        <div className="grid-auto-fit">
          {features.map((feature, i) => (
            <GlassCard key={i} hoverEffect={true} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{
                fontSize: '2.5rem',
                backgroundColor: 'rgba(197, 168, 128, 0.1)',
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '12px',
                border: '1px solid var(--border-glass)'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem' }}>{feature.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
