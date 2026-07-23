import React from 'react';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { BranchCard } from '../cards/BranchCard';
import { Loader } from '../ui/Loader';

const fallbackBranches = [
  {
    id: 1,
    name: 'PML GYM – Barshi Branch',
    address: 'Paranda Road, Gadegaon Road, Barshi – 413401, Solapur District, Maharashtra, India',
    phone: '+91 91307 65750',
    email: 'pmlfitnessandhelthclub7413@gmail.com',
    operating_hours: 'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM',
    image_url: 'facilities_gym'
  },
  {
    id: 2,
    name: 'PML GYM – Shivaji Nagar Branch',
    address: 'College Road, Opposite Bank of Maharashtra, Near Shri Shivaji Mahavidyalaya, Shivaji Nagar, Barshi, Solapur District, Maharashtra, India',
    phone: '+91 86685 23713',
    email: 'pmlfitnessandhelthclub7413@gmail.com',
    operating_hours: 'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM',
    image_url: 'facilities_cardio'
  }
];

export const Branches: React.FC = () => {
  const { data: branches, loading } = useFetch('/branches', fallbackBranches);

  return (
    <>
      <SEO 
        title="Branches" 
        description="Find a PML GYM branch near you. Premium locations in Barshi (Paranda Road) and Shivaji Nagar offering luxury fitness equipment and recovery zones."
        canonicalPath="/branches"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', flex: 1 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              OUR LOCATIONS
            </span>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Explore PML Branches</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>Select a branch to explore state-of-the-art facilities, operating schedules, and tailored local training packages.</p>
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="grid-auto-fit">
              {branches.map((branch) => (
                <BranchCard key={branch.id} branch={branch} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Branches;
