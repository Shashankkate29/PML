import React from 'react';
import { NavLink } from 'react-router-dom';
import { images } from '../assets/config/images';
import siteConfig from '../config/siteConfig';

export const HeroSection: React.FC = () => {
  return (
    <section style={{
      position: 'relative',
      height: '90vh',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '0 20px',
      backgroundColor: '#000000'
    }}>
      {/* Background Image Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <img 
          src={images.heroBg} 
          alt="Premium Gym Interior" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.4
          }}
        />
        {/* Deep overlay gradient */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.9) 100%)'
        }} />
      </div>

      {/* Hero Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '900px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }} className="animate-fade-in">
        <span style={{
          color: 'var(--color-primary)',
          fontFamily: 'var(--font-display)',
          fontWeight: '700',
          fontSize: '0.9rem',
          letterSpacing: '3px',
          textTransform: 'uppercase'
        }}>
          WELCOME TO PML GYM
        </span>
        
        <h1 style={{ textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
          Redefining <span style={{ color: 'var(--color-primary)' }}>Strength</span> & <span style={{ color: 'var(--color-primary)' }}>Recovery</span>
        </h1>
        
        <p style={{
          fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
          color: 'var(--color-text-light)',
          maxWidth: '650px',
          lineHeight: '1.6',
          textShadow: '0 2px 4px rgba(0,0,0,0.8)'
        }}>
          {siteConfig.tagline}
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          marginTop: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <NavLink to="/branches" className="btn-primary">
            Explore Branches
          </NavLink>
          <a 
            href="https://wa.me/919699677413?text=Hello%20PML%20GYM%2C%20I%20would%20like%20to%20enquire%20about%20joining%20the%20gym." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
            style={{ textDecoration: 'none' }}
          >
            Enquire on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
