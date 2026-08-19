import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { resolveImageUrl } from '../assets/config/images';

interface Branch {
  id: number;
  branchNumber?: number;
  branch_number?: number;
  name: string;
  shortName?: string;
  short_name?: string;
  slug?: string;
  address: string;
  phone: string;
  email: string;
  operating_hours: string;
  image_url: string;
}

interface BranchCardProps {
  branch: Branch;
}

export const BranchCard: React.FC<BranchCardProps> = ({ branch }) => {
  const resolvedImage = resolveImageUrl(branch.image_url);

  return (
    <GlassCard 
      hoverEffect={true} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        height: '100%',
        padding: '24px',
        gap: '24px'
      }}
    >
      <div>
        <div style={{ 
          height: '200px', 
          overflow: 'hidden', 
          borderRadius: '8px', 
          position: 'relative',
          marginBottom: '20px'
        }}>
          <img 
            src={resolvedImage} 
            alt={`${branch.name} exterior`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }}
            className="card-image"
          />
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            padding: '6px 12px',
            backgroundColor: 'rgba(10,10,10,0.85)',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontFamily: 'var(--font-display)',
            fontWeight: '700',
            color: 'var(--color-primary)',
            letterSpacing: '1px',
            border: '1px solid var(--border-glass)'
          }}>
            {`BRANCH ${branch.branchNumber || branch.branch_number || (branch.id === 1 ? 1 : 2)}`}
          </div>
        </div>
        <h3 style={{ marginBottom: '8px', fontSize: '1.4rem' }}>{branch.name}</h3>
        <p style={{ 
          fontSize: '0.9rem', 
          color: 'var(--color-text-muted)', 
          lineHeight: '1.5',
          wordBreak: 'break-word',
          overflowWrap: 'break-word'
        }}>
          {branch.address}
        </p>
      </div>

      <div style={{ 
        borderTop: '1px solid var(--border-glass)', 
        paddingTop: '20px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px', 
        fontSize: '0.85rem' 
      }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <svg style={{ width: '16px', height: '16px', color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            <strong style={{ color: 'var(--color-text-white)', display: 'block', marginBottom: '2px' }}>Hours:</strong>
            {branch.operating_hours}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <svg style={{ width: '16px', height: '16px', color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            <strong style={{ color: 'var(--color-text-white)', display: 'block', marginBottom: '2px' }}>Phone:</strong>
            <a 
              href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`} 
              style={{ color: 'var(--color-text-muted)', transition: 'var(--transition-smooth)' }} 
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {branch.phone}
            </a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <svg style={{ width: '16px', height: '16px', color: 'var(--color-primary)', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <div style={{ color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
            <strong style={{ color: 'var(--color-text-white)', display: 'block', marginBottom: '2px' }}>Email:</strong>
            <a 
              href={`mailto:${branch.email}`} 
              style={{ color: 'var(--color-text-muted)', transition: 'var(--transition-smooth)' }} 
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} 
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
            >
              {branch.email}
            </a>
          </div>
        </div>
        
        <Link 
          to={`/branches/${branch.slug || (branch.id === 1 ? 'barshi' : 'shivaji-nagar')}`}
          className="btn-primary"
          style={{ 
            textAlign: 'center', 
            textDecoration: 'none', 
            display: 'block',
            width: '100%',
            boxSizing: 'border-box'
          }}
        >
          Visit Branch
        </Link>
      </div>
    </GlassCard>
  );
};

export default BranchCard;
