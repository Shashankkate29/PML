export interface SiteConfig {
  gymName: string;
  tagline: string;
  themeColor: string;
  themeColorSecondary: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    operatingHours: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  seoDefaults: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
  };
  featuresReady: {
    adminDashboard: boolean;
    onlineMembership: boolean;
    supplementStore: boolean;
    testimonials: boolean;
    blog: boolean;
    events: boolean;
  };
}

export const siteConfig: SiteConfig = {
  gymName: 'PML GYM',
  tagline: 'The Pinnacle of Physical Excellence & Recovery',
  themeColor: '#C5A880', // Premium Gold/Bronze accent
  themeColorSecondary: '#111111', // Deep Luxury Black
  contact: {
    phone: '+91 91307 65750, +91 86685 23713, +91 95796 98009',
    email: 'pmlfitnessandhelthclub7413@gmail.com',
    address: 'Paranda Road, Gadegaon Road, Barshi – 413401, Solapur District, Maharashtra, India',
    operatingHours: 'Open 7 Days a Week | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM'
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/pml_fitness_and_health_club?igsh=MTUzdXlhczhlemtlZw==',
    facebook: 'https://www.facebook.com/watch/?v=611387358295310',
    twitter: 'https://twitter.com/pmlgym',
    youtube: 'https://youtube.com/pmlgym'
  },
  seoDefaults: {
    title: 'PML GYM | Premium Fitness & Recovery Labs',
    description: 'Experience PML GYM, a state-of-the-art luxury fitness arena combining top-tier performance equipment with science-backed Recovery Labs.',
    keywords: ['luxury gym', 'fitness club', 'recovery zone', 'ice bath', 'infrared sauna', 'personal training', 'barshi gym', 'solapur gym'],
    siteUrl: 'https://pmlgym.com',
    ogImage: 'pml_logo'
  },
  featuresReady: {
    adminDashboard: false, // Architectural placeholders integrated
    onlineMembership: false,
    supplementStore: false,
    testimonials: true,
    blog: false,
    events: false
  }
};

export default siteConfig;
