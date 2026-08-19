import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { resolveImageUrl } from '../assets/config/images';
import { Loader } from '../ui/Loader';
import { GlassCard } from '../ui/GlassCard';

const fallbackGallery = [
  { id: 11, title: 'Therapeutic Steam Bath', description: 'Separate luxury steam bath suite for recovery and relaxation.', image_url: 'facilities_steam', category: 'Recovery' },
  { id: 12, title: 'Contrast Therapy Ice Bath', description: 'Separate professional ice bath plunge for muscle recovery.', image_url: 'facilities_recovery', category: 'Recovery' },
  { id: 13, title: 'General Fitness Training Floor', description: 'Real gym layout with cardio and weight zones.', image_url: 'gallery_1', category: 'Training' },
  { id: 14, title: 'Strength Training Facility', description: 'Premium training machinery and tools.', image_url: 'gallery_2', category: 'Equipment' }
];

export const Gallery: React.FC = () => {
  const { data: items, loading } = useFetch('/gallery', fallbackGallery);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Equipment', 'Training', 'Recovery'];

  const filteredItems = filter === 'All'
    ? items
    : items.filter(item => item.category === filter);

  return (
    <>
      <SEO 
        title="Gallery" 
        description="Browse photos of PML GYM's luxury training setups, equipment zones, and recovery contrast facilities."
        canonicalPath="/gallery"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', flex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              OUR GALLERY
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Inside PML GYM</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '30px' }}>
              Take a visual tour of our spaces, layout setups, and specialized training equipment zones.
            </p>

            {/* Filter controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-glass)',
                    backgroundColor: filter === cat ? 'var(--color-primary)' : 'transparent',
                    color: filter === cat ? 'var(--color-bg-deep)' : 'var(--color-text-light)',
                    fontWeight: '600',
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {filteredItems.map((item) => {
                const imgSource = resolveImageUrl(item.image_url);
                return (
                  <GlassCard key={item.id} hoverEffect={true} style={{ padding: '0px', overflow: 'hidden', height: '280px' }}>
                    <img 
                      src={imgSource} 
                      alt={item.title} 
                      title={item.title}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </GlassCard>
                );
              })}
            </div>
          )}

        </div>
      </section>
    </>
  );
};

export default Gallery;
