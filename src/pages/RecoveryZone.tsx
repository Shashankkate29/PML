import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { RecoverySection } from '../sections/RecoverySection';
import { GlassCard } from '../ui/GlassCard';
import { imageMap } from '../assets/config/images';

export const RecoveryZone: React.FC = () => {
  const navigate = useNavigate();

  const recoveryServices = [
    {
      title: 'Cold Plunge Ice Bath',
      image: imageMap['facilities_recovery'],
      category: 'Contrast Therapy',
      desc: 'Recover with our professional cold plunge pool. Designed to support muscle relief, reduce post-workout soreness, improve circulation, and speed up training recovery.',
      details: 'Available at Barshi Branch.',
      ctaText: 'Enquire About Access',
      subject: 'Ice Bath Contrast Therapy Enquiry',
      message: 'I would like to enquire about Ice Bath contrast therapy protocols, access schedules, and availability.'
    },
    {
      title: 'Therapeutic Steam Bath',
      image: imageMap['facilities_steam'],
      category: 'Thermal Therapy',
      desc: 'Relax and unwind in our premium steam suite. Ideal for releasing muscle tension, promoting relaxation, and supporting recovery after a heavy training session.',
      details: 'Available at Barshi Branch.',
      ctaText: 'Enquire About Access',
      subject: 'Steam Bath Recovery Enquiry',
      message: 'I would like to enquire about Steam Bath facility hours, contrast therapy benefits, and availability.'
    },
    {
      title: 'Massage Service',
      category: 'Paid Service',
      desc: 'Paid service available at the gym. Charges apply — enquire for current pricing and availability.',
      details: 'Charges apply — enquire for current pricing and availability.',
      ctaText: 'Enquire Now',
      subject: 'Massage Service Enquiry',
      message: 'I would like to enquire about the massage service, charges and availability.',
      isPaid: true
    }
  ];

  const handleEnquire = (subject: string, message: string) => {
    navigate('/contact', {
      state: { subject, message }
    });
  };

  return (
    <>
      <SEO 
        title="Recovery Zone" 
        description="Experience contrast therapy suites at PML GYM's Recovery Zone. Warm steam room relaxation, cold plunge ice baths, and paid professional athletic massage."
        canonicalPath="/recovery-zone"
      />

      {/* Hero Header */}
      <div style={{ padding: 'clamp(6rem, 10vw, 10rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 5vw, 5rem)', backgroundColor: 'var(--color-bg-deep)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>Recovery Zone</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Dedicated recovery areas built to support post-workout muscle relief and physical relaxation.
          </p>
        </div>
      </div>

      {/* General Recovery Intro */}
      <RecoverySection />

      {/* Services Grid Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              OUR RECOVERY SERVICES
            </span>
            <h2 style={{ fontSize: '2.2rem' }}>Contrast Suites & Therapies</h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'stretch'
          }}>
            {recoveryServices.map((service, i) => (
              <GlassCard key={i} hoverEffect={true} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0px', overflow: 'hidden', height: '100%', border: '1px solid var(--border-glass)' }}>
                <div>
                  {service.isPaid ? (
                    <div style={{ 
                      height: '220px', 
                      background: 'linear-gradient(135deg, rgba(25, 22, 18, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '24px',
                      borderBottom: '1px solid var(--border-glass)',
                      textAlign: 'center'
                    }}>
                      <svg style={{ width: '48px', height: '48px', color: 'var(--color-primary)', marginBottom: '16px' }} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                      <div style={{
                        padding: '4px 14px',
                        backgroundColor: 'rgba(197, 168, 128, 0.15)',
                        color: 'var(--color-primary)',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '700',
                        letterSpacing: '1.5px',
                        border: '1px solid var(--color-primary)'
                      }}>
                        {service.category}
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        padding: '4px 12px',
                        backgroundColor: 'rgba(10,10,10,0.85)',
                        color: 'var(--color-primary)',
                        borderRadius: '4px',
                        fontSize: '0.78rem',
                        fontFamily: 'var(--font-display)',
                        fontWeight: '700',
                        letterSpacing: '1px',
                        border: '1px solid var(--border-glass)'
                      }}>
                        {service.category}
                      </div>
                    </div>
                  )}
                  <div style={{ padding: '24px 24px 10px 24px' }}>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: 'var(--color-text-white)' }}>
                      {service.title}
                    </h3>
                    <p style={{ fontSize: '0.92rem', lineHeight: '1.6', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                      {service.desc}
                    </p>
                  </div>
                </div>

                <div style={{ padding: '0 24px 24px 24px' }}>
                  <p style={{ 
                    fontSize: '0.85rem', 
                    color: service.isPaid ? 'var(--color-primary)' : 'var(--color-text-muted)', 
                    fontWeight: service.isPaid ? '600' : '400',
                    lineHeight: '1.4',
                    borderTop: '1px solid var(--border-glass)',
                    paddingTop: '14px',
                    marginBottom: '16px'
                  }}>
                    {service.details}
                  </p>
                  <button 
                    onClick={() => handleEnquire(service.subject, service.message)} 
                    className="btn-primary" 
                    style={{ width: '100%', border: 'none', cursor: 'pointer', padding: '10px 0' }}
                  >
                    {service.ctaText}
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecoveryZone;
