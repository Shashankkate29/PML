import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import siteConfig from '../config/siteConfig';

export const ContactSection: React.FC = () => {
  const location = useLocation();
  const state = location.state as { subject?: string; message?: string } | null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: state?.subject || '',
    message: state?.message || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const apiHost = import.meta.env.DEV ? 'http://localhost:5000' : '';
      const response = await fetch(`${apiHost}/api/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setAlert({ 
          type: 'success', 
          text: 'Thank you! Your enquiry has been received successfully. Our team will contact you shortly.' 
        });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(result.message || result.error || "We're currently unable to process your enquiry. Please try again later or contact us directly.");
      }
    } catch (err: any) {
      setAlert({ 
        type: 'error', 
        text: err.message || "We're currently unable to process your enquiry. Please try again later or contact us directly." 
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-deep)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
          
          {/* Quick info column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>
              GET IN TOUCH
            </span>
            <h2 style={{ fontSize: '2.2rem' }}>Contact Our Team</h2>
            <p style={{ lineHeight: '1.6' }}>
              Whether you are looking to inquire about our membership options, arrange a visit, or have questions about our facilities, our team is here to assist.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '10px' }}>
              <div>
                <strong style={{ color: 'var(--color-text-white)', display: 'block', fontSize: '0.95rem', marginBottom: '6px' }}>Call Us</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <a href="tel:+919130765750" style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: '600', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-white)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}>
                    +91 91307 65750
                  </a>
                  <a href="tel:+918668523713" style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: '600', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-white)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}>
                    +91 86685 23713
                  </a>
                  <a href="tel:+919579680009" style={{ color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: '600', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-white)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}>
                    +91 95796 80009
                  </a>
                </div>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-white)', display: 'block', fontSize: '0.95rem', marginBottom: '6px' }}>Email Us</strong>
                <a 
                  href={`mailto:${siteConfig.contact.email}`} 
                  style={{ 
                    color: 'var(--color-primary)', 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    wordBreak: 'break-all',
                    transition: 'var(--transition-smooth)' 
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-text-white)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-primary)'}
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-white)', display: 'block', fontSize: '0.95rem', marginBottom: '6px' }}>Working Hours</strong>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                  Monday – Sunday<br />
                  Morning: 5:00 AM – 10:00 AM<br />
                  Evening: 5:00 PM – 10:00 PM
                </p>
              </div>
              <div>
                <strong style={{ color: 'var(--color-text-white)', display: 'block', fontSize: '0.95rem', marginBottom: '6px' }}>Branch Locations</strong>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '2px' }}>PML GYM – Barshi Branch</span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                      Paranda Road, Gadegaon Road,<br />
                      Barshi – 413401,<br />
                      Maharashtra
                    </p>
                  </div>
                  <div>
                    <span style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '600', display: 'block', marginBottom: '2px' }}>PML GYM – Shivaji Nagar Branch</span>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                      Shri Shivaji Mahavidyalaya College Road,<br />
                      opposite Bank of Maharashtra,<br />
                      Shivaji Nagar, Barshi,<br />
                      Maharashtra
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form container */}
          <div>
            <GlassCard hoverEffect={false}>
              <h3 style={{ marginBottom: '24px', fontSize: '1.4rem' }}>Send a Message</h3>
              
              {alert && (
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  fontSize: '0.9rem',
                  backgroundColor: alert.type === 'success' ? 'rgba(40,167,69,0.1)' : 'rgba(220,53,69,0.1)',
                  color: alert.type === 'success' ? '#28a745' : '#dc3545',
                  border: `1px solid ${alert.type === 'success' ? 'rgba(40,167,69,0.2)' : 'rgba(220,53,69,0.2)'}`
                }}>
                  {alert.text}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-mobile-single">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="name" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-white)' }}>Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      value={formData.name} 
                      onChange={handleChange}
                      style={{ padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--color-text-white)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="email" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-white)' }}>Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email} 
                      onChange={handleChange}
                      style={{ padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--color-text-white)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="grid-mobile-single">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="phone" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-white)' }}>Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      style={{ padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--color-text-white)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label htmlFor="subject" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-white)' }}>Subject *</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      required 
                      value={formData.subject} 
                      onChange={handleChange}
                      style={{ padding: '10px 14px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--color-text-white)', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="message" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-text-white)' }}>Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    required 
                    rows={4}
                    value={formData.message} 
                    onChange={handleChange}
                    style={{ padding: '12px 14px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)', borderRadius: '4px', color: 'var(--color-text-white)', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <Button type="submit" disabled={loading} style={{ width: '100%', marginTop: '10px' }}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
