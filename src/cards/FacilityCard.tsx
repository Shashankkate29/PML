import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { resolveImageUrl } from '../assets/config/images';

interface Facility {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category: string;
}

interface FacilityCardProps {
  facility: Facility;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const resolvedImage = resolveImageUrl(facility.image_url);

  return (
    <GlassCard hoverEffect={true} style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', padding: '0px', overflow: 'hidden' }}>
      <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={resolvedImage} 
          alt={facility.name} 
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          <div>
            {facility.category && facility.category.toUpperCase() !== 'GENERAL' && (
              <span style={{ 
                color: 'var(--color-primary)', 
                fontSize: '0.7rem', 
                fontWeight: '700', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px', 
                display: 'block', 
                marginBottom: '6px' 
              }}>
                {facility.category}
              </span>
            )}
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{facility.name}</h3>
          </div>
        </div>
      </div>
      <div style={{ padding: '24px', paddingTop: '12px' }}>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{facility.description}</p>
      </div>
    </GlassCard>
  );
};

export default FacilityCard;
