export interface SiteConfig {
  gymName: string;
  tagline: string;
  themeColor: string;
  themeColorSecondary: string;
  contact: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    operatingHours: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
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
    whatsapp: '+91 86689 87413',
    email: 'pmlfitnessandhelthclub7413@gmail.com',
    address: 'Paranda Road, Gadegaon Road, Barshi – 413401, Maharashtra',
    operatingHours: 'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM'
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/pml_fitness_and_health_club?igsh=MTUzdXlhczhlemtlZw==',
    facebook: 'https://www.facebook.com/watch/?v=611387358295310'
  },
  seoDefaults: {
    title: 'PML GYM | Premium Fitness & Recovery',
    description: 'Experience PML GYM, a premier fitness destination in Barshi, offering high-performance strength training, CrossFit, group classes, and dedicated recovery facilities.',
    keywords: ['pml gym', 'fitness club', 'recovery zone', 'ice bath', 'steam bath', 'personal training', 'barshi gym', 'solapur gym'],
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
