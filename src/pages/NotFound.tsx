import React from 'react';
import { NavLink } from 'react-router-dom';
import { SEO } from '../components/SEO';

export const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="Page Not Found" description="The page you are looking for does not exist." />
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg-deep)'
      }}>
        <h1 style={{ fontSize: '6rem', color: 'var(--color-primary)', lineHeight: '1', marginBottom: '20px' }}>404</h1>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '500', marginBottom: '16px' }}>Page Not Found</h2>
        <p style={{ maxWidth: '450px', marginBottom: '32px' }}>
          The link you followed may be broken, or the page may have been removed. Use the navigation to find your way back.
        </p>
        <NavLink to="/" className="btn-primary">
          Back to Safety
        </NavLink>
      </div>
    </>
  );
};

export default NotFound;
