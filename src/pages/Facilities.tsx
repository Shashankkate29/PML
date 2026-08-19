import React from 'react';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { FacilityCard } from '../cards/FacilityCard';
import { Loader } from '../ui/Loader';

import { fallbackFacilities } from '../config/facilities';

export const Facilities: React.FC = () => {
  const { data: facilities, loading } = useFetch('/facilities', fallbackFacilities);

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
            <div className="grid-auto-fit" style={{ alignItems: 'stretch' }}>
              {(facilities || []).map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Facilities;
