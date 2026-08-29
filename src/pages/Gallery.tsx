import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { resolveImageUrl } from '../assets/config/images';
import { Loader } from '../ui/Loader';
import { GlassCard } from '../ui/GlassCard';

const fallbackGallery = [
  // General & Recovery
  { id: 1, title: 'Therapeutic Steam Bath', description: 'Separate luxury steam bath suite for recovery and relaxation.', image_url: 'facilities_steam', category: 'Recovery' },
  { id: 2, title: 'Contrast Therapy Ice Bath', description: 'Separate professional ice bath plunge for muscle recovery.', image_url: 'facilities_recovery', category: 'Recovery' },
  { id: 3, title: 'Cardio Conditioning Treadmills', description: 'Professional treadmills for cardiovascular endurance training.', image_url: 'gym_photo_1', category: 'Equipment' },
  { id: 4, title: 'Selectorized Strength Row', description: 'Row of commercial resistance stack strength machines.', image_url: 'gym_photo_2', category: 'Equipment' },
  { id: 5, title: 'Upper Body Chest Press Machine', description: 'Pin-selected chest press machine for upper body development.', image_url: 'gym_photo_3', category: 'Equipment' },
  { id: 6, title: 'Leg Conditioning Station', description: 'Leg extension conditioning machine for quad isolate training.', image_url: 'gym_photo_4', category: 'Equipment' },
  { id: 7, title: 'Dumbbells & Cable Crossover Area', description: 'Dumbbells station and multi-angle cable crossover pulley setup.', image_url: 'gym_photo_5', category: 'Equipment' },
  { id: 8, title: 'Heavy Squat Platform', description: 'Power cage platform for strength compound squats.', image_url: 'gym_photo_6', category: 'Training' },
  { id: 9, title: 'Linear Plate-Loaded Leg Press', description: 'Plate-loaded leg press sled for high-capacity lower body training.', image_url: 'gym_photo_7', category: 'Equipment' },
  { id: 10, title: 'Elite Free Weights Dumbbells Rack', description: 'Multiple tiers of professional-grade training dumbbells.', image_url: 'gym_photo_8', category: 'Equipment' },
  { id: 11, title: 'Strength Benches', description: 'Flat and incline bench press setups for strength training.', image_url: 'gym_photo_9', category: 'Equipment' },
  { id: 12, title: 'Flagship Squat Cage Setup', description: 'Heavy-duty power squat cage setup.', image_url: 'gym_photo_10', category: 'Equipment' },

  // Branch 1 (Barshi)
  { id: 13, title: 'Branch 1 - Leg Press Area', description: 'Heavy leg press plate-loaded machine setup for lower body development.', image_url: 'branch1_photo_1', category: 'Equipment' },
  { id: 14, title: 'Branch 1 - Incline Bench Press & Cable Crossover', description: 'Adjustable bench press and multi-pulley cable systems.', image_url: 'branch1_photo_2', category: 'Equipment' },
  { id: 15, title: 'Branch 1 - Flat Bench Station', description: 'Flat barbell bench press station and free weights floor.', image_url: 'branch1_photo_3', category: 'Equipment' },
  { id: 16, title: 'Branch 1 - Squat Platform & Cardio', description: 'Olympic power rack platform and cardio treadmills corridor.', image_url: 'branch1_photo_4', category: 'Training' },
  { id: 17, title: 'Branch 1 - Cardio Zone', description: 'Cardiovascular training section with spin bike and Athlon treadmills.', image_url: 'branch1_photo_5', category: 'Equipment' },
  { id: 18, title: 'Branch 1 - Core & Hyperextension Station', description: 'Back hyperextension bench, core stability plates, and stretching mat.', image_url: 'branch1_photo_6', category: 'Training' },
  { id: 19, title: 'Branch 1 - Reception Lobby', description: 'Clean reception desk lobby entrance and club backdrop.', image_url: 'branch1_photo_7', category: 'Equipment' },

  // Branch 2 (Shivaji Nagar)
  { id: 20, title: 'Branch 2 - Cardio Conditioning Treadmills', description: 'Professional treadmills for cardiovascular endurance training.', image_url: 'branch2_photo_1', category: 'Equipment' },
  { id: 21, title: 'Branch 2 - Selectorized Strength Row', description: 'Row of commercial resistance stack strength machines.', image_url: 'branch2_photo_2', category: 'Equipment' },
  { id: 22, title: 'Branch 2 - Upper Body Chest Press Machine', description: 'Pin-selected chest press machine for upper body development.', image_url: 'branch2_photo_3', category: 'Equipment' },
  { id: 23, title: 'Branch 2 - Leg Conditioning Station', description: 'Leg extension conditioning machine for quad isolate training.', image_url: 'branch2_photo_4', category: 'Equipment' },
  { id: 24, title: 'Branch 2 - Dumbbells & Cable Crossover Area', description: 'Dumbbells station and multi-angle cable crossover pulley setup.', image_url: 'branch2_photo_5', category: 'Equipment' },
  { id: 25, title: 'Branch 2 - Heavy Squat Platform', description: 'Power cage platform for strength compound squats.', image_url: 'branch2_photo_6', category: 'Training' },
  { id: 26, title: 'Branch 2 - Linear Plate-Loaded Leg Press', description: 'Plate-loaded leg press sled for high-capacity lower body training.', image_url: 'branch2_photo_7', category: 'Equipment' },
  { id: 27, title: 'Branch 2 - Elite Free Weights Dumbbells Rack', description: 'Multiple tiers of professional-grade training dumbbells.', image_url: 'branch2_photo_8', category: 'Equipment' },
  { id: 28, title: 'Branch 2 - Strength Benches', description: 'Flat and incline bench press setups for strength training.', image_url: 'branch2_photo_9', category: 'Equipment' },
  { id: 29, title: 'Branch 2 - Flagship Squat Cage Setup', description: 'Heavy-duty power squat cage setup.', image_url: 'branch2_photo_10', category: 'Equipment' }
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
