import React from 'react';
import { SEO } from '../components/SEO';
import { RecoverySection } from '../sections/RecoverySection';
import { GlassCard } from '../ui/GlassCard';

export const RecoveryZone: React.FC = () => {
  const recoveryProtocols = [
    { title: 'The Contrast Protocol', desc: '15 mins Infrared Sauna (80°C) directly followed by 3 mins Cold Plunge (4°C). Repeat 3 times to boost adrenaline, improve circulation, and reduce muscle soreness.' },
    { title: 'The Recovery Routine', desc: '20 mins NormaTec Compression Boots followed by a relaxing 20 mins full-spectrum infrared light therapy session to flush localized toxins.' },
    { title: 'The Cryo Flush', desc: '3 mins Whole Body Cryotherapy (-110°C) followed by localized contrast recovery to stimulate cell growth and speed joint recovery.' }
  ];

  return (
    <>
      <SEO 
        title="Recovery Zone" 
        description="Experience state-of-the-art contrast therapy wellness suites at PML GYM's Recovery Zone. Saunas, ice plunges, and compression therapies."
        canonicalPath="/recovery"
      />

      <div style={{ padding: 'clamp(6rem, 10vw, 10rem) clamp(1rem, 5vw, 4rem) clamp(3rem, 5vw, 5rem)', backgroundColor: 'var(--color-bg-deep)', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>Recovery Labs</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Science-backed cellular restoration suites built to maximize physical regeneration and health longevity.
          </p>
        </div>
      </div>

      <RecoverySection />

      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
              RECOVERY METHODOLOGY
            </span>
            <h2 style={{ fontSize: '2rem' }}>Optimized Protocols</h2>
          </div>
          <div className="grid-auto-fit" style={{ alignItems: 'stretch' }}>
            {recoveryProtocols.map((protocol, i) => (
              <GlassCard key={i} hoverEffect={true} style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ color: 'var(--color-primary)', fontSize: '1.25rem' }}>{protocol.title}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: '1.6', flex: 1 }}>{protocol.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default RecoveryZone;
