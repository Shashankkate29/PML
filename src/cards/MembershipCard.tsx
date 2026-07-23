import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';

interface Membership {
  id: number;
  name: string;
  price: number;
  billing_period: string;
  features: string[];
  popular: boolean;
}

interface MembershipCardProps {
  membership: Membership;
}

export const MembershipCard: React.FC<MembershipCardProps> = ({ membership }) => {
  // Parse features if stored as stringified JSON array in the database
  const featuresList = Array.isArray(membership.features) 
    ? membership.features 
    : typeof membership.features === 'string'
      ? JSON.parse(membership.features)
      : [];

  const cardBorderColor = membership.popular 
    ? 'solid 2px var(--color-primary)' 
    : '1px solid var(--border-glass)';

  return (
    <GlassCard 
      hoverEffect={true} 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        gap: '30px', 
        height: '100%', 
        border: cardBorderColor,
        position: 'relative',
        backgroundColor: membership.popular ? 'rgba(197, 168, 128, 0.03)' : 'var(--bg-glass)'
      }}
    >
      {membership.popular && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-bg-deep)',
          padding: '4px 16px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-display)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
        }}>
          Most Popular
        </div>
      )}
      <div>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
          {membership.popular ? 'Recommended' : 'Membership Plan'}
        </span>
        <h3 style={{ fontSize: '1.65rem', marginBottom: '16px' }}>{membership.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '24px' }}>
          <span style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-primary)' }}>
            ₹{parseInt(membership.price.toString()).toLocaleString('en-IN')}
          </span>
          <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            / {membership.billing_period.toLowerCase()}
          </span>
        </div>

        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {featuresList.map((feature: string, i: number) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
              <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ width: '100%' }}>
        <Button 
          variant={membership.popular ? 'primary' : 'outline'}
          style={{ width: '100%', padding: '10px 0' }}
          onClick={() => {
            alert(`Thank you for choosing ${membership.name}. Registration feature will launch soon!`);
          }}
        >
          Select Plan
        </Button>
      </div>
    </GlassCard>
  );
};

export default MembershipCard;
