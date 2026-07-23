import React from 'react';
import { NavLink } from 'react-router-dom';
import { images } from '../assets/config/images';

export const RecoverySection: React.FC = () => {
  const recoveryLabs = [
    { name: 'Contrast Therapy Cold Plunge', desc: 'Sleek stainless steel tubs maintained at 4-6°C to flush metabolic wastes and accelerate muscle repair.' },
    { name: 'Infrared Wellness Sauna', desc: 'Deep electromagnetic heat waves penetrating cellular levels to trigger detoxification, soothe soreness, and boost vascular flow.' },
    { name: 'NormaTec Compression', desc: 'Pneumatic compression sleeves utilizing dynamic pulses to push lymphatic fluids and minimize stiffness.' }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)', borderTop: '1px solid var(--border-glass)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          
          {/* Narrative Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
              RECOVERY ZONE
            </span>
            <h2 style={{ fontSize: '2.2rem' }}>Train Hard. Recover Smarter.</h2>
            <p style={{ lineHeight: '1.6' }}>
              True physical progression does not end at the lifting platform. Our state-of-the-art Recovery Labs utilize clinically validated contrast therapies and localized compression tools to speed up healing times and maximize longevity.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
              {recoveryLabs.map((lab, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--color-primary)', fontSize: '1.25rem', lineHeight: '1' }}>✦</span>
                  <div>
                    <h4 style={{ color: 'var(--color-text-white)', fontSize: '1rem', marginBottom: '4px' }}>{lab.name}</h4>
                    <p style={{ fontSize: '0.88rem' }}>{lab.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '10px' }}>
              <NavLink to="/recovery" className="btn-primary">
                Explore Recovery Lab
              </NavLink>
            </div>
          </div>

          {/* Visual Showcase */}
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '400px', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-premium)' }}>
            <img 
              src={images.facilitiesRecovery} 
              alt="Contrast Therapy Recovery Suite" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {/* Ambient blue overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to top, rgba(10,10,10,0.85) 10%, transparent 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '30px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '4px', letterSpacing: '1px' }}>
                  Featured Facility
                </span>
                <h3 style={{ fontSize: '1.5rem' }}>Contrast Suites</h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default RecoverySection;
