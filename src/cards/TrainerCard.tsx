import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { imageMap } from '../assets/config/images';

interface Trainer {
  id: number;
  name: string;
  role: string;
  bio: string;
  image_url: string;
  specialties: string[];
  social_links: {
    instagram?: string;
    twitter?: string;
  };
}

interface TrainerCardProps {
  trainer: Trainer;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({ trainer }) => {
  const resolvedImage = imageMap[trainer.image_url] || imageMap['trainer_1'];

  // Parse specialties if stored as a stringified JSON array in the database
  const specialtiesList = Array.isArray(trainer.specialties) 
    ? trainer.specialties 
    : typeof trainer.specialties === 'string'
      ? JSON.parse(trainer.specialties)
      : [];

  const socialLinksObj = typeof trainer.social_links === 'string'
    ? JSON.parse(trainer.social_links)
    : trainer.social_links;

  return (
    <GlassCard hoverEffect={true} style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', padding: '0px', overflow: 'hidden' }}>
      <div style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
        <img 
          src={resolvedImage} 
          alt={trainer.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }}
        />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          width: '100%',
          padding: '24px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.9) 20%, transparent)'
        }}>
          <h3 style={{ fontSize: '1.4rem', marginBottom: '2px' }}>{trainer.name}</h3>
          <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
            {trainer.role}
          </span>
        </div>
      </div>
      <div style={{ padding: '24px', paddingTop: '0px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>{trainer.bio}</p>
        
        {specialtiesList.length > 0 && (
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-white)', display: 'block', marginBottom: '8px', letterSpacing: '0.5px' }}>
              Specialties
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {specialtiesList.map((spec: string, i: number) => (
                <span key={i} style={{ fontSize: '0.75rem', backgroundColor: 'rgba(197, 168, 128, 0.1)', color: 'var(--color-primary)', border: '1px solid var(--border-glass)', padding: '4px 10px', borderRadius: '4px' }}>
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {socialLinksObj && (
          <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '16px', display: 'flex', gap: '12px' }}>
            {socialLinksObj.instagram && (
              <a href={`https://instagram.com/${socialLinksObj.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                Instagram
              </a>
            )}
            {socialLinksObj.twitter && (
              <a href={`https://twitter.com/${socialLinksObj.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                Twitter
              </a>
            )}
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default TrainerCard;
