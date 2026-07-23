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
            <Link to="/about" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>About Us</Link>
            <Link to="/branches" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Branches</Link>
            <Link to="/facilities" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Facilities</Link>
            <Link to="/membership" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Memberships</Link>
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
                <span>+91 95796 98009</span>
              </div>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Email: </strong>
              <a href={`mailto:pmlfitnessandhelthclub7413@gmail.com`} style={{ color: 'var(--color-text-muted)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>
                pmlfitnessandhelthclub7413@gmail.com
              </a>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Barshi Branch: </strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                Paranda Road, Gadegaon Road, Barshi – 413401, Solapur District, Maharashtra, India
              </div>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Shivaji Nagar Branch: </strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                College Road, Opposite Bank of Maharashtra, Near Shri Shivaji Mahavidyalaya, Shivaji Nagar, Barshi, Solapur District, Maharashtra, India
              </div>
            </li>
            <li>
              <strong style={{ color: 'var(--color-text-white)' }}>Hours: </strong>
              <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', marginTop: '2px', lineHeight: '1.4' }}>
                Open 7 Days a Week<br />
                Morning: 5:00 AM – 10:00 AM<br />
                Evening: 5:00 PM – 10:00 PM
              </div>
            </li>
          </ul>
        </div>

        {/* Social Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ color: 'var(--color-text-white)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Follow Us</h4>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {Object.entries(siteConfig.socialLinks).map(([platform, url]) => (
              <a 
                key={platform} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.9rem',
                  textTransform: 'capitalize',
                  color: 'var(--color-text-muted)'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
              >
                {platform}
              </a>
            ))}
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
        gap: '16px'
      }}>
        <span>&copy; {currentYear} {siteConfig.gymName}. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Privacy Policy</a>
          <a href="#" onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = ''}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
