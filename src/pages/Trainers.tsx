import React from 'react';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { TrainerCard } from '../cards/TrainerCard';
import { Loader } from '../ui/Loader';

const fallbackTrainers = [
  {
    id: 1,
    name: 'Marcus Thorne',
    role: 'Director of Athletic Performance',
    bio: 'Former competitive decathlete with 12+ years of experience coaching elite athletes and powerlifters. Specializes in force development and biomechanical alignment.',
    image_url: 'trainer_1',
    specialties: ['Olympic Weightlifting', 'Speed & Agility', 'Injury Rehabilitation'],
    social_links: { instagram: '@marcusthorne_pml', twitter: '@marcus_pml' }
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'Lead Mobility & Reformer Specialist',
    bio: 'Dedicated to building resilient bodies through functional movement, advanced Pilates reformer, and active flexibility training. Focuses on longevity and posture alignment.',
    image_url: 'trainer_2',
    specialties: ['Pilates Reformer', 'Mobility & Flexibility', 'Core Conditioning'],
    social_links: { instagram: '@sarahj_mobility', twitter: '@sarah_pml' }
  }
];

export const Trainers: React.FC = () => {
  const { data: trainers, loading } = useFetch('/trainers', fallbackTrainers);

  return (
    <>
      <SEO 
        title="Trainers" 
        description="Meet PML GYM's professional athletic coaches. Specialists in Olympic lifting, rehabilitation, mobility, and high-performance training."
        canonicalPath="/trainers"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', flex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              OUR COACHES
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Performance Specialists</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We don't hire standard trainers. Our coaches hold advanced athletic credentials and focus on biomechanical efficiency, rehabilitation, and long-term health.
            </p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid-auto-fit">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer.id} trainer={trainer} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Trainers;
