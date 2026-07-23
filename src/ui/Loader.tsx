import React from 'react';
import siteConfig from '../config/siteConfig';

interface LoaderProps {
  fullPage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Loader: React.FC<LoaderProps> = ({ fullPage = false, size = 'md' }) => {
  const spinnerSize = size === 'sm' ? '24px' : size === 'md' ? '48px' : '72px';
  const borderWidth = size === 'sm' ? '2px' : size === 'md' ? '4px' : '6px';

  const spinner = (
    <div 
      aria-label="Loading"
      role="status"
      style={{
        width: spinnerSize,
        height: spinnerSize,
        border: `${borderWidth} solid rgba(197, 168, 128, 0.1)`,
        borderTop: `${borderWidth} solid var(--color-primary)`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}
    />
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--color-bg-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}>
        {/* Splash screen element */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          {/* Logo element placeholder (or rendered safely) */}
          <div style={{
            fontSize: '2rem',
            fontFamily: 'var(--font-display)',
            fontWeight: '800',
            letterSpacing: '0.1em',
            color: 'var(--color-primary)'
          }}>
            {siteConfig.gymName}
          </div>
          {spinner}
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      {spinner}
    </div>
  );
};

export default Loader;
