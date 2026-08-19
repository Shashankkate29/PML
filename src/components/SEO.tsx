import React, { useEffect } from 'react';
import { siteConfig } from '../config/siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  type?: string;
  customSchema?: object;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '',
  type = 'website',
  customSchema
}) => {
  const currentTitle = title ? `${title} | ${siteConfig.gymName}` : siteConfig.seoDefaults.title;
  const currentDescription = description || siteConfig.seoDefaults.description;
  const siteUrl = siteConfig.seoDefaults.siteUrl;
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  useEffect(() => {
    // 1. Update standard document title
    document.title = currentTitle;

    // 2. Update description meta tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', currentDescription);

    // 3. Update canonical link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 4. Update Open Graph tags
    const ogTags = {
      'og:title': currentTitle,
      'og:description': currentDescription,
      'og:url': canonicalUrl,
      'og:type': type,
      'og:site_name': siteConfig.gymName
    };

    Object.entries(ogTags).forEach(([property, content]) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 5. Update Twitter Cards tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:title': currentTitle,
      'twitter:description': currentDescription
    };

    Object.entries(twitterTags).forEach(([name, content]) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // 6. Schema.org LocalBusiness JSON-LD
    let scriptJsonLd = document.getElementById('jsonld-localbusiness');
    if (!scriptJsonLd) {
      scriptJsonLd = document.createElement('script');
      scriptJsonLd.setAttribute('id', 'jsonld-localbusiness');
      scriptJsonLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptJsonLd);
    }

    const localBusinessSchema = [
      {
        '@context': 'https://schema.org',
        '@type': 'ExerciseGym',
        '@id': `${siteUrl}/#barshi`,
        'name': 'PML GYM – Barshi Branch',
        'url': siteUrl,
        'description': siteConfig.tagline,
        'telephone': '+91 91307 65750',
        'email': siteConfig.contact.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Paranda Road, Gadegaon Road',
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
        ],
        'sameAs': [
          siteConfig.socialLinks.instagram,
          siteConfig.socialLinks.facebook
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ExerciseGym',
        '@id': `${siteUrl}/#shivajinagar`,
        'name': 'PML GYM – Shivaji Nagar Branch',
        'url': siteUrl,
        'description': siteConfig.tagline,
        'telephone': '+91 86685 23713',
        'email': siteConfig.contact.email,
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'College Road, Opposite Bank of Maharashtra, Near Shri Shivaji Mahavidyalaya, Shivaji Nagar',
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
        ],
        'sameAs': [
          siteConfig.socialLinks.instagram,
          siteConfig.socialLinks.facebook
        ]
      }
    ];

    if (customSchema) {
      scriptJsonLd.textContent = JSON.stringify(customSchema);
    } else {
      scriptJsonLd.textContent = JSON.stringify(localBusinessSchema);
    }

  }, [currentTitle, currentDescription, canonicalUrl, type, siteUrl, customSchema]);

  return null;
};

export default SEO;
