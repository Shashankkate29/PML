import React from 'react';
import { Link } from 'react-router-dom';
import { images } from '../assets/config/images';
import siteConfig from '../config/siteConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--color-bg-card)',
      borderTop: '1px solid var(--border-glass)',
      padding: '80px 20px 30px 20px',
      color: 'var(--color-text-muted)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '60px'
      }}>
        {/* Brand Information Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img 
              src={images.pmlLogo} 
              alt={`${siteConfig.gymName} Logo`} 
              style={{ 
                height: '48px', 
                width: '48px', 
                objectFit: 'contain',
                borderRadius: '50%'
              }} 
            />
            <span style={{ 
              fontFamily: 'var(--font-display)', 
              fontWeight: '800', 
              fontSize: '1.4rem', 
              letterSpacing: '0.05em', 
              color: 'var(--color-text-white)' 
            }}>
              {siteConfig.gymName}
            </span>
          </Link>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            {siteConfig.seoDefaults.description}
          </p>
        </div>

        {/* Quick Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Quick Links</h4>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <Link to="/" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Home</Link>
            <Link to="/about" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>About</Link>
            <Link to="/branches" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Branches</Link>
            <Link to="/trainers" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Trainers</Link>
            <Link to="/recovery-zone" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Recovery Zone</Link>
            <Link to="/gallery" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Gallery</Link>
            <Link to="/contact" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Contact</Link>
          </nav>
        </div>

        {/* Contact Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Contact Info</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Phone: </strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px', color: 'var(--color-text-muted)' }}>
                <span>+91 91307 65750</span>
                <span>+91 86685 23713</span>
                <span>+91 95796 80009</span>
              </div>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Email: </strong>
              <a href={`mailto:pmlfitnessandhelthclub7413@gmail.com`} style={{ color: 'var(--color-text-muted)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>
                pmlfitnessandhelthclub7413@gmail.com
              </a>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>BRANCH 1 — PML GYM – Barshi Branch: </strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                Paranda Road, Gadegaon Road, Barshi – 413401, Maharashtra
              </div>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>BRANCH 2 — PML GYM – Shivaji Nagar Branch: </strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                Shri Shivaji Mahavidyalaya College Road, opposite Bank of Maharashtra, Shivaji Nagar, Barshi, Maharashtra
              </div>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Working Hours: </strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                Monday – Sunday<br />
                Morning: 5:00 AM – 10:00 AM<br />
                Evening: 5:00 PM – 10:00 PM
              </div>
            </li>
          </ul>
        </div>

        {/* Social Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {Object.entries(siteConfig.socialLinks).map(([platform, url]) => {
              const renderIcon = () => {
                if (platform === 'instagram') {
                  return (
                    <svg aria-hidden="true" style={{ width: '20px', height: '20px', display: 'block' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  );
                }
                if (platform === 'facebook') {
                  return (
                    <svg aria-hidden="true" style={{ width: '20px', height: '20px', display: 'block' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  );
                }
                return null;
              };
              return (
                <a 
                  key={platform} 
                  href={url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${platform}`}
                  style={{
                    color: 'var(--color-text-muted)',
                    transition: 'var(--transition-smooth)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                >
                  {renderIcon()}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid var(--border-glass)',
        paddingTop: '30px',
        textAlign: 'center',
        fontSize: '0.8rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '24px'
      }}>
        <span>&copy; {currentYear} {siteConfig.gymName}. All rights reserved.</span>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '2px', color: 'var(--color-text-white)' }}>DEVELOPED BY</span>
          <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '600' }}>Shashank & Sandesh</span>
          <a 
            href="mailto:shashankkate30@gmail.com" 
            style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '0.8rem' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-white)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
          >
            shashankkate30@gmail.com
          </a>
        </div>

        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Privacy Policy</a>
          <a href="#" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
