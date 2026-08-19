import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';

interface Membership {
  id: number;
  name: string;
  price: number;
  billing_period: string;
  features: string[] | string;
  popular: boolean | number;
}

interface MembershipCardProps {
  membership: Membership;
  onEnquireClick?: () => void;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ membership, onEnquireClick }) => {
  const navigate = useNavigate();

  // Safe parsing for features list from DB or fallback
  const resolvedFeatures: string[] = (() => {
    if (Array.isArray(membership.features)) {
      return membership.features;
    }
    if (typeof membership.features === 'string') {
      try {
        return JSON.parse(membership.features);
      } catch {
        return [membership.features];
      }
    }
    return [];
  })();

  const handleEnquire = () => {
    if (onEnquireClick) {
      onEnquireClick();
    } else {
      navigate('/contact', {
        state: {
          subject: `Membership Enquiry: ${membership.name}`,
          message: `I would like to enquire about enrollment details for the ${membership.name} membership plan (₹${parseInt(membership.price.toString()).toLocaleString('en-IN')}).`
        }
      });
    }
  };

  return (
    <GlassCard 
      hoverEffect={true} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        gap: '30px', 
        height: '100%', 
        border: '1px solid var(--border-glass)',
        position: 'relative',
        backgroundColor: 'var(--bg-glass)',
        padding: '24px'
      }}
    >
      <div>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
          Membership Plan
        </span>
        <h3 style={{ fontSize: '1.65rem', marginBottom: '16px' }}>{membership.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '20px' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
            ₹{parseInt(membership.price.toString()).toLocaleString('en-IN')}
          </span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            / {membership.billing_period.toLowerCase()}
          </span>
        </div>

        {/* Features Checklist */}
        <ul style={{ 
          listStyle: 'none', 
          padding: 0, 
          margin: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '12px',
          borderTop: '1px solid var(--border-glass)',
          paddingTop: '20px'
        }}>
          {resolvedFeatures.map((feat, i) => (
            <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.9rem', color: 'var(--color-text-light)' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ width: '100%' }}>
        <button 
          className="btn-secondary"
          style={{ width: '100%', padding: '10px 0', border: '1px solid var(--border-glass)', cursor: 'pointer' }}
          onClick={handleEnquire}
        >
          Enquire Now
        </button>
      </div>
    </GlassCard>
  );
};

export default MembershipCard;
