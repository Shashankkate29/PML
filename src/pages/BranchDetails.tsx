import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { useFetch } from '../common/hooks/useFetch';
import { branchesConfig } from '../config/branches';
import { fallbackFacilities } from '../config/facilities';
import { FacilityCard } from '../cards/FacilityCard';
import { GlassCard } from '../ui/GlassCard';
import { Loader } from '../ui/Loader';
import { imageMap, resolveImageUrl } from '../assets/config/images';
import NotFound from './NotFound';

interface BranchDbResponse {
  id: number;
  branch_number?: number;
  branchNumber?: number;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  operating_hours: string;
  image_url: string;
  description: string | null;
  map_url: string | null;
  facilities?: Array<{
    id: number;
    name: string;
    description: string;
    image_url: string;
    category: string;
  }>;
  gallery?: Array<{
    id: number;
    title: string;
    description: string | null;
    image_url: string;
    category: string;
  }>;
}

export const BranchDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Fetch branch details from backend (called unconditionally at the top of the component)
  const { data: dbBranch, loading } = useFetch<BranchDbResponse | null>(slug ? `/branches/${slug}` : '', null);

  // Validate slug
  const validSlugs = ['barshi', 'shivaji-nagar'];
  const isValidSlug = slug && validSlugs.includes(slug);

  if (!isValidSlug) {
    return <NotFound />;
  }

  // Find local configuration fallback
  const fallbackConfig = branchesConfig.find(b => b.slug === slug)!;

  // Resolve values (prioritizing DB data with local config fallback for offline resilience)
  const branchName = dbBranch?.name || fallbackConfig.name;
  const branchNum = dbBranch?.branch_number || dbBranch?.branchNumber || fallbackConfig.branchNumber || (slug === 'barshi' ? 1 : 2);
  const address = dbBranch?.address || fallbackConfig.address;
  const description = dbBranch?.description || fallbackConfig.description;
  const operatingHours = dbBranch?.operating_hours || fallbackConfig.workingHours;
  const email = dbBranch?.email || fallbackConfig.email;
  const mapUrl = dbBranch?.map_url || fallbackConfig.mapUrl || (slug === 'barshi' ? 'https://share.google/R1vC0byDdp3Bm7nwC' : 'https://share.google/FdrSW79SbNBIwvMmS');
  const mainImageKey = dbBranch?.image_url || fallbackConfig.image;
  const resolvedMainImage = imageMap[mainImageKey] || imageMap['facilities_gym'];

  const whatsappMessage = slug === 'barshi'
    ? 'Hello PML GYM, I would like to enquire about the Barshi Branch.'
    : 'Hello PML GYM, I would like to enquire about the Shivaji Nagar Branch.';
  const whatsappUrl = `https://wa.me/918668987413?text=${encodeURIComponent(whatsappMessage)}`;

  // Centralized phone list resolution
  const phoneList = fallbackConfig.phoneNumbers;

  // Resolve facilities dynamically (relational db facilities or static config mapping fallback)
  const resolvedFacilities = (() => {
    let rawFacilities = [];
    if (dbBranch?.facilities && dbBranch.facilities.length > 0) {
      rawFacilities = dbBranch.facilities.map(f => ({ ...f }));
    } else {
      rawFacilities = fallbackConfig.facilities.map(name => {
        const found = fallbackFacilities.find(f => f.name === name);
        return found ? { ...found } : {
          id: Math.random(),
          name,
          description: 'Premium fitness facility sector.',
          image_url: 'facilities_gym',
          category: 'General'
        };
      });
    }

    // Override facility images with branch-specific real photographs
    return rawFacilities.map(f => {
      if (slug === 'barshi') {
        if (f.name === 'Cardio Training') {
          return { ...f, image_url: 'branch1_photo_5' }; // Treadmills and spin bike
        } else if (f.name === 'Weight Training') {
          return { ...f, image_url: 'branch1_photo_3' }; // Flat bench press & free weights
        } else if (f.name === 'Steam Bath') {
          return { ...f, image_url: 'facilities_steam' };
        } else if (f.name === 'Ice Bath') {
          return { ...f, image_url: 'facilities_recovery' };
        }
      } else if (slug === 'shivaji-nagar') {
        if (f.name === 'Cardio Training') {
          return { ...f, image_url: 'branch2_photo_1' }; // Shivaji Nagar treadmills
        } else if (f.name === 'Weight Training') {
          return { ...f, image_url: 'branch2_photo_5' }; // Dumbbells & cable crossovers
        }
      }
      return f;
    });
  })();

  // Resolve gallery images dynamically (prioritizing DB data with fallback config)
  const resolvedGallery = (() => {
    if (dbBranch?.gallery && dbBranch.gallery.length > 0) {
      return dbBranch.gallery.map(item => ({
        id: item.id,
        title: item.title,
        image_url: item.image_url
      }));
    }
    return fallbackConfig.gallery.map((imgKey, idx) => ({
      id: idx,
      title: 'Gallery Preview',
      image_url: imgKey
    }));
  })();

  // Build unique dynamic schema.org LocalBusiness JSON-LD
  const currentUrl = window.location.href;
  const branchSchema = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${currentUrl}#branch`,
    'name': branchName,
    'url': currentUrl,
    'description': description,
    'telephone': phoneList[0],
    'email': email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': slug === 'barshi' ? 'Paranda Road, Gadegaon Road' : 'College Road, Opposite Bank of Maharashtra, Near Shri Shivaji Mahavidyalaya, Shivaji Nagar',
      'addressLocality': 'Barshi',
      'addressRegion': 'Solapur District, Maharashtra',
      'postalCode': '413401',
      'addressCountry': 'IN'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '05:00',
        'closes': '10:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '17:00',
        'closes': '22:00'
      }
    ]
  };

  if (loading && !dbBranch) {
    return (
      <div style={{ display: 'flex', flex: 1, minHeight: '60vh', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--color-bg-deep)' }}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={branchName} 
        description={description}
        canonicalPath={`/branches/${slug}`}
        customSchema={branchSchema}
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
          
          {/* Back Navigation */}
          <div style={{ marginBottom: '32px' }}>
            <Link 
              to="/branches" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                color: 'var(--color-primary)', 
                textDecoration: 'none', 
                fontWeight: '600', 
                fontSize: '0.95rem',
                transition: 'var(--transition-smooth)'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
            >
              <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Branches
            </Link>
          </div>

          {/* Branch Hero banner layout */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '60px' }}>
            <div style={{ position: 'relative', height: 'clamp(250px, 45vw, 450px)', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
              <img 
                src={resolvedMainImage} 
                alt={`${branchName} interior`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="eager"
              />
              <div style={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                right: 0, 
                padding: '30px', 
                background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, rgba(10,10,10,0) 100%)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                <span style={{ 
                  color: 'var(--color-primary)', 
                  fontSize: '0.8rem', 
                  fontWeight: '700', 
                  textTransform: 'uppercase', 
                  letterSpacing: '2px', 
                  display: 'block' 
                }}>
                  {`BRANCH ${branchNum}`} — PML GYM
                </span>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', margin: 0, fontFamily: 'var(--font-display)', color: 'var(--color-text-white)' }}>
                  {branchName}
                </h1>
              </div>
            </div>

            {/* Quick overview */}
            <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '30px' }}>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.7', margin: 0, color: 'var(--color-text-light)' }}>
                {description}
              </p>

              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '16px', 
                borderTop: '1px solid var(--border-glass)', 
                paddingTop: '20px', 
                marginTop: '8px' 
              }}>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Enquire on WhatsApp
                </a>
                <a 
                  href={mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary" 
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  View Location
                </a>
              </div>
            </GlassCard>
          </div>

          {/* Side-by-side Branch Info Details & Services list */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
            
            {/* Contact & Hours */}
            <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', margin: 0 }}>
                Branch Information
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg style={{ width: '20px', height: '20px', color: 'var(--color-primary)', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Address</strong>
                    <span style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{address}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg style={{ width: '20px', height: '20px', color: 'var(--color-primary)', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Opening Hours</strong>
                    <span style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>{operatingHours}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg style={{ width: '20px', height: '20px', color: 'var(--color-primary)', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Contact Numbers</strong>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {phoneList.map((ph, idx) => (
                        <a 
                          key={idx}
                          href={`tel:${ph.replace(/[^0-9+]/g, '')}`} 
                          style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                          onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                          onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                        >
                          {ph}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <svg style={{ width: '20px', height: '20px', color: 'var(--color-primary)', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>Email Address</strong>
                    <a 
                      href={`mailto:${email}`} 
                      style={{ fontSize: '0.92rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                      onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div style={{ 
                  borderTop: '1px solid var(--border-glass)', 
                  paddingTop: '16px', 
                  marginTop: '8px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px' 
                }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '1.5px', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                    LOCATION
                  </span>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-text-white)', fontWeight: '600' }}>
                    {branchName}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.5' }}>
                    {address}
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '4px' }}>
                    <a 
                      href={mapUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-secondary" 
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.88rem' }}
                    >
                      View Location
                    </a>
                    <a 
                      href={whatsappUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary" 
                      style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.88rem' }}
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Services */}
            <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', borderBottom: '1px solid var(--border-glass)', paddingBottom: '12px', margin: 0 }}>
                Training Programs & Services
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {fallbackConfig.services.map((cat, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <h3 style={{ fontSize: '0.95rem', color: 'var(--color-primary)', fontWeight: '700', letterSpacing: '1px', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
                      {cat.category}
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {cat.items.map((item, itemIdx) => {
                        const isMassage = item.toLowerCase().includes('massage');
                        return (
                          <li key={itemIdx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <svg style={{ width: '14px', height: '14px', color: 'var(--color-primary)', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                              <span style={{ fontSize: '0.88rem', color: 'var(--color-text-light)', fontWeight: isMassage ? '700' : 'normal' }}>
                                {item}
                              </span>
                            </div>
                            {isMassage && (
                              <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '2px', marginBottom: '8px' }}>
                                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                                  Paid service available at the gym.<br />
                                  Charges apply — enquire for current pricing and availability.
                                </p>
                                <button
                                  onClick={() => navigate('/contact', {
                                    state: {
                                      subject: 'Massage Service Enquiry',
                                      message: 'I would like to enquire about the Massage Service, current charges and availability.'
                                    }
                                  })}
                                  style={{
                                    alignSelf: 'flex-start',
                                    padding: '4px 10px',
                                    fontSize: '0.75rem',
                                    fontWeight: '700',
                                    color: 'var(--color-bg-deep)',
                                    backgroundColor: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    textTransform: 'uppercase',
                                    transition: 'var(--transition-smooth)'
                                  }}
                                  onMouseOver={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.filter = 'brightness(1.2)';
                                  }}
                                  onMouseOut={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.filter = 'none';
                                  }}
                                >
                                  Enquire Now
                                </button>
                              </div>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Branch Specific Facilities */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2rem', margin: 0 }}>Available Facilities</h2>
              <p style={{ margin: '8px 0 0 0', color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
                Explore the premium equipment and sectors reserved exclusively for this branch.
              </p>
            </div>

            <div className="grid-auto-fit">
              {resolvedFacilities.map((fac) => (
                <FacilityCard key={fac.id} facility={fac} />
              ))}
            </div>
          </div>

          {/* Branch Gallery */}
          <div style={{ marginBottom: '60px', borderTop: '1px solid var(--border-glass)', paddingTop: '40px' }}>
            <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '16px', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '2.2rem', margin: 0, fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                OUR GALLERY
              </h2>
              <h3 style={{ margin: '8px 0 0 0', color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
                {`BRANCH ${branchNum} — ${slug === 'barshi' ? 'BARSHI BRANCH' : 'SHIVAJI NAGAR BRANCH'}`}
              </h3>
            </div>

            {resolvedGallery.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
                gap: '20px' 
              }}>
                {resolvedGallery.map((item) => {
                  const imgUrl = resolveImageUrl(item.image_url);
                  return (
                    <GlassCard 
                      key={item.id} 
                      hoverEffect={true} 
                      style={{ 
                        padding: 0, 
                        overflow: 'hidden', 
                        borderRadius: '8px', 
                        height: '220px', 
                        position: 'relative',
                        border: '1px solid var(--border-glass)' 
                      }}
                    >
                      <img 
                        src={imgUrl} 
                        alt={item.title || `${branchName} gallery view`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }}
                        className="card-image"
                        loading="lazy"
                      />
                    </GlassCard>
                  );
                })}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                borderRadius: '8px',
                border: '1px dashed var(--border-glass)',
                backgroundColor: 'rgba(255, 255, 255, 0.01)'
              }}>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '1rem' }}>
                  Branch photographs coming soon.
                </p>
              </div>
            )}
          </div>

          {/* Enquiry CTA Section */}
          <div style={{ 
            marginTop: '80px', 
            textAlign: 'center', 
            padding: '60px 20px', 
            borderRadius: '16px', 
            backgroundColor: 'rgba(197, 168, 128, 0.02)', 
            border: '1px solid var(--border-glass)' 
          }}>
            <span style={{ 
              color: 'var(--color-primary)', 
              fontSize: '0.85rem', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '2px', 
              display: 'block', 
              marginBottom: '12px' 
            }}>
              Ready to Start?
            </span>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontFamily: 'var(--font-display)', 
              marginBottom: '20px', 
              color: 'var(--color-text-white)',
              margin: 0
            }}>
              Join PML GYM
            </h2>
            <p style={{ 
              maxWidth: '600px', 
              margin: '16px auto 30px auto', 
              color: 'var(--color-text-muted)', 
              lineHeight: '1.6' 
            }}>
              Take the first step toward your strength and recovery goals. Our team is ready to welcome you.
            </p>
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ padding: '12px 36px', fontSize: '1rem', textDecoration: 'none', display: 'inline-block' }}
            >
              Enquire on WhatsApp
            </a>
          </div>

        </div>
      </section>
    </>
  );
};

export default BranchDetails;
