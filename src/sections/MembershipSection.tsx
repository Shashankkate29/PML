import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../common/hooks/useFetch';
import { MembershipCard } from '../cards/MembershipCard';
import { Loader } from '../ui/Loader';

const fallbackMemberships = [
  {
    id: 1,
    name: '1 Month',
    price: 1800.00,
    billing_period: 'Month',
    features: [
      'Full Gym Floor Access',
      'Cardio & Strength Zones',
      'Locker Room & Shower Access',
      'General Trainer Assistance'
    ],
    popular: false
  },
  {
    id: 2,
    name: '6 Months',
    price: 6000.00,
    billing_period: '6 Months',
    features: [
      'Access to all training facilities',
      'Locker Room & Steam Bath Access',
      'Personalized Workout Plan'
    ],
    popular: false
  },
  {
    id: 3,
    name: '12 Months',
    price: 8999.00,
    billing_period: '12 Months',
    features: [
      'Unlimited 1-year access',
      'Full facility access (All Zones)',
      'Complimentary Locker & Steam Bath'
    ],
    popular: false
  }
];

interface MembershipSectionProps {
  onEnquireClick?: () => void;
}

export const MembershipSection: React.FC<MembershipSectionProps> = ({ onEnquireClick }) => {
  const { data: memberships, loading } = useFetch('/memberships', fallbackMemberships);
  const navigate = useNavigate();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
            PRICING OPTIONS
          </span>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '24px' }}>Choose Your Tier of Excellence</h2>
        </div>

        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="grid-auto-fit" style={{ alignItems: 'stretch' }}>
              {memberships.map((membership) => (
                <MembershipCard 
                  key={membership.id} 
                  membership={membership} 
                  onEnquireClick={onEnquireClick}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-text-dim)', fontStyle: 'italic' }}>
                * Additional charges may apply for premium recovery therapies and chargeable services. Enquire for details.
              </p>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              marginTop: '40px',
              padding: '30px 20px',
              borderTop: '1px solid var(--border-glass)',
              animation: 'fadeIn 0.8s ease-out'
            }}>
              <h4 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.25rem', 
                fontWeight: '600', 
                color: 'var(--color-primary)',
                marginBottom: '8px' 
              }}>
                Need a custom plan?
              </h4>
              <p style={{ 
                fontSize: '0.95rem', 
                color: 'var(--color-text-muted)',
                maxWidth: '600px',
                margin: '0 auto' 
              }}>
                Contact us or send an enquiry for personalized membership plans.
              </p>
              <button 
                onClick={onEnquireClick || (() => navigate('/contact'))} 
                className="btn-primary" 
                style={{ padding: '8px 24px', fontSize: '0.9rem', border: 'none', cursor: 'pointer', marginTop: '16px' }}
              >
                Enquire Now
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MembershipSection;
