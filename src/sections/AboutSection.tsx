import React from 'react';
import { images } from '../assets/config/images';
import siteConfig from '../config/siteConfig';

export const AboutSection: React.FC = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-card)', borderTop: '1px solid var(--border-glass)' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '60px',
        alignItems: 'center'
      }}>
        {/* Left Column: Image Branding */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          position: 'relative'
        }}>
          {/* Accent lighting glow */}
          <div style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary)',
            filter: 'blur(100px)',
            opacity: 0.15,
            zIndex: 1
          }} />
          <img 
            src={images.pmlLogo} 
            alt={`${siteConfig.gymName} Official Lion Logo`} 
            style={{ 
              maxWidth: '300px', 
              width: '80%', 
              height: 'auto',
              objectFit: 'contain',
              zIndex: 2,
              borderRadius: '50%'
            }} 
          />
        </div>

        {/* Right Column: Narrative content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
            ABOUT THE BRAND
          </span>
          <h2 style={{ fontSize: '2.2rem' }}>A New Standard For Strength & Fitness</h2>
          <p style={{ lineHeight: '1.7' }}>
            PML GYM — Perfect Management Longtime is dedicated to providing a premium environment for strength, fitness, and conditioning in Barshi.
          </p>
          <p style={{ lineHeight: '1.7' }}>
            We believe that consistency and structured coaching are the keys to long-term progress. By combining professional equipment, group classes, and recovery facilities like steam and ice baths, we help members achieve lasting fitness results.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
