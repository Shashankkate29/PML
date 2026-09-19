import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { images } from '../assets/config/images';
import siteConfig from '../config/siteConfig';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Branches', path: '/branches' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Recovery Zone', path: '/recovery-zone' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="glass-navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo & Name */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }} onClick={() => setMobileMenuOpen(false)}>
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
            color: 'var(--color-primary)' 
          }}>
            {siteConfig.gymName}
          </span>
        </NavLink>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '30px' }} className="desktop-nav">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Action Button */}
        <div className="desktop-nav">
          <a 
            href="https://wa.me/919699677413?text=Hello%20PML%20GYM%2C%20I%20would%20like%20to%20enquire%20about%20joining%20the%20gym." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary" 
            style={{ padding: '8px 20px', fontSize: '0.9rem', textDecoration: 'none' }}
          >
            Join Now
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle Navigation Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none', // Overridden in media queries
            flexDirection: 'column',
            gap: '6px',
            padding: '4px'
          }}
          className="mobile-toggle"
        >
          <span style={{ width: '25px', height: '2px', backgroundColor: 'var(--color-text-white)', transition: 'var(--transition-smooth)', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : '' }} />
          <span style={{ width: '25px', height: '2px', backgroundColor: 'var(--color-text-white)', transition: 'var(--transition-smooth)', opacity: mobileMenuOpen ? 0 : 1 }} />
          <span style={{ width: '25px', height: '2px', backgroundColor: 'var(--color-text-white)', transition: 'var(--transition-smooth)', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : '' }} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          width: '100%',
          height: 'calc(100vh - 80px)',
          backgroundColor: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(10px)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          paddingBottom: '80px',
          animation: 'fadeIn 0.3s ease-out'
        }}>
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              {link.name}
            </NavLink>
          ))}
          <a 
            href="https://wa.me/919699677413?text=Hello%20PML%20GYM%2C%20I%20would%20like%20to%20enquire%20about%20joining%20the%20gym." 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={() => setMobileMenuOpen(false)} 
            className="btn-primary" 
            style={{ marginTop: '20px', textDecoration: 'none' }}
          >
            Join Now
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
