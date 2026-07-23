import React from 'react';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { FacilityCard } from '../cards/FacilityCard';
import { Loader } from '../ui/Loader';

const fallbackFacilities = [
  {
    id: 1,
    name: 'Weight Training',
    description: 'Dedicated high-performance strength zone with heavy dumbbells, specialized plates, lifting platforms, and pin-selected selectorized machines.',
    image_url: 'facilities_gym',
    category: 'General'
  },
  {
    id: 2,
    name: 'CrossFit',
    description: 'Functional conditioning space featuring power cages, gymnastics rings, air bikes, rowing machines, and sled tracks.',
    image_url: 'facilities_cardio',
    category: 'General'
  },
  {
    id: 3,
    name: 'Yoga',
    description: 'Tranquil ambient-lit studio space hosting Vinyasa, Hatha, and alignment-focused guided sessions.',
    image_url: 'gallery_1',
    category: 'General'
  },
  {
    id: 4,
    name: 'Zumba',
    description: 'Energetic cardio-dance classes in our premium sound-equipped aerobics studio.',
    image_url: 'facilities_zumba',
    category: 'General'
  },
  {
    id: 5,
    name: 'Personal Training',
    description: '1-on-1 private coaching programs backed by biometric assessments and tailored progressive loading.',
    image_url: 'trainer_1',
    category: 'General'
  },
  {
    id: 6,
    name: 'Ladies Trainer',
    description: 'Dedicated female coaching staff providing comfortable, focused strength and lifestyle guidance.',
    image_url: 'trainer_2',
    category: 'General'
  },
  {
    id: 7,
    name: 'Nutrition Guidance',
    description: 'Professional dietary planning, macro breakdown targets, and calorie tracking structures.',
    image_url: 'facilities_nutrition',
    category: 'General'
  },
  {
    id: 8,
    name: 'Fitness Kitchen',
    description: 'Nutritious meal prep prep-packs, premium protein shakes, and performance recovery food options.',
    image_url: 'facilities_kitchen',
    category: 'General'
  },
  {
    id: 9,
    name: 'Steam Bath',
    description: 'Relax and recover in our premium steam bath designed to improve circulation, reduce muscle tension, detoxify the body, and enhance post-workout recovery.',
    image_url: 'facilities_steam',
    category: 'Recovery'
  },
  {
    id: 10,
    name: 'Ice Bath',
    description: 'Cold plunge contrast tubs maintained at optimal sub-10°C temperatures to accelerate muscle recovery and reduce inflammation.',
    image_url: 'facilities_recovery',
    category: 'Recovery'
  }
];

export const Facilities: React.FC = () => {
  const { data: facilities, loading } = useFetch('/facilities', fallbackFacilities);

  // Group facilities dynamically by category (defaults to 'General' if category is undefined)
  const grouped = (facilities || []).reduce((acc: Record<string, typeof fallbackFacilities>, facility) => {
    const cat = facility.category || 'General';
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(facility);
    return acc;
  }, {});

  // Maintain predictable render order: General facilities first, then Recovery Zone
  const categoriesOrder = ['General', 'Recovery'];

  return (
    <>
      <SEO 
        title="Facilities" 
        description="Explore PML GYM's world-class facilities, featuring custom heavy-duty weights, biometric cardio equipment, and therapeutic contrast suites."
        canonicalPath="/facilities"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', flex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              OUR FACILITIES
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>World-Class Gym Layouts</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We have spared no expense. Explore our highly specialized zones designed for heavy performance strength, metabolic conditioning, and recovery.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
              {categoriesOrder.map((category) => {
                const groupFacilities = grouped[category] || [];
                if (groupFacilities.length === 0) return null;

                const isRecovery = category === 'Recovery';

                return (
                  <div 
                    key={category} 
                    style={{ 
                      borderRadius: '16px',
                      padding: isRecovery ? 'clamp(1.5rem, 4vw, 3rem)' : '0px',
                      backgroundColor: isRecovery ? 'rgba(197, 168, 128, 0.02)' : 'transparent',
                      border: isRecovery ? '1px dashed rgba(197, 168, 128, 0.15)' : 'none',
                      boxShadow: isRecovery ? 'inset 0 0 40px rgba(0,0,0,0.4)' : 'none'
                    }}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 10px' }}>
                      <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                        {isRecovery ? 'Contrast & Restoration' : 'CORE OFFERINGS'}
                      </span>
                      <h2 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>
                        {isRecovery ? 'Recovery Zone' : 'General Facilities'}
                      </h2>
                      {isRecovery ? (
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                          Our clinically validated Recovery Zone utilizes thermal contrast therapy and cellular restoration suites to speed up muscle healing, reduce inflammation, and enhance physical longevity.
                        </p>
                      ) : (
                        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                          Train with no limits. Explore our highly specialized training environments designed for strength, metabolic conditioning, and complete core athletic development.
                        </p>
                      )}
                    </div>

                    <div className="grid-auto-fit" style={{ alignItems: 'stretch' }}>
                      {groupFacilities.map((facility) => (
                        <FacilityCard key={facility.id} facility={facility} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Facilities;
