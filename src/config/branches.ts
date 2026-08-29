export interface ServiceCategory {
  category: string;
  items: string[];
}

export interface BranchConfig {
  id: number;
  branchNumber: number;
  name: string;
  shortName: string;
  slug: string;
  address: string;
  phoneNumbers: string[];
  email: string;
  workingHours: string;
  description: string;
  facilities: string[];
  services: ServiceCategory[];
  gallery: string[];
  mapUrl: string | null;
  image: string;
}

export const branchesConfig: BranchConfig[] = [
  {
    id: 1,
    branchNumber: 1,
    name: 'PML GYM – Barshi Branch',
    shortName: 'Barshi',
    slug: 'barshi',
    address: 'Paranda Road, Gadegaon Road, Barshi – 413401, Maharashtra',
    phoneNumbers: ['+91 91307 65750', '+91 86685 23713', '+91 95796 98009'],
    email: 'pmlfitnessandhelthclub7413@gmail.com',
    workingHours: 'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM (Sunday Open)',
    description: 'PML GYM Barshi — Perfect Management Longtime is our premier flagship fitness facility. Fully equipped for heavy performance strength training, professional cardiovascular conditioning, and signature thermal contrast therapy protocols (Steam & Ice Bath).',
    facilities: ['Weight Training', 'Cardio Training', 'Steam Bath', 'Ice Bath'],
    services: [
      {
        category: 'TRAINING PROGRAMS',
        items: [
          'Strength Training',
          'Weight Training',
          'Cardio Training',
          'Functional Training',
          'Personal Training',
          'Muscle Building Program',
          'Fat Loss & Weight Management',
          'General Fitness Training'
        ]
      },
      {
        category: 'FITNESS SUPPORT',
        items: [
          'Workout Guidance',
          'Personalized Training Plans',
          'Fitness Assessment',
          'Progress Tracking',
          'Nutrition Guidance'
        ]
      },
      {
        category: 'RECOVERY SERVICES',
        items: [
          'Ice Bath / Cold Plunge',
          'Steam Bath',
          'Massage Service — Paid Service'
        ]
      }
    ],
    gallery: [
      'branch1_photo_1',
      'branch1_photo_2',
      'branch1_photo_3',
      'branch1_photo_4',
      'branch1_photo_5',
      'branch1_photo_6',
      'branch1_photo_7'
    ],
    mapUrl: null, // Left empty to prevent coordinate fabrication
    image: 'branch1_photo_2'
  },
  {
    id: 2,
    branchNumber: 2,
    name: 'PML GYM – Shivaji Nagar Branch',
    shortName: 'Shivaji Nagar',
    slug: 'shivaji-nagar',
    address: 'Shri Shivaji Mahavidyalaya College Road, opposite Bank of Maharashtra, Shivaji Nagar, Barshi, Maharashtra',
    phoneNumbers: ['+91 86685 23713', '+91 91307 65750', '+91 95796 98009'],
    email: 'pmlfitnessandhelthclub7413@gmail.com',
    workingHours: 'Monday – Sunday | Morning: 5:00 AM – 10:00 AM | Evening: 5:00 PM – 10:00 PM (Sunday Open)',
    description: 'PML GYM Shivaji Nagar Branch — Perfect Management Longtime delivers a dedicated environment for targeted athletic conditioning, cardio workouts, and personalized fitness coaching metrics.',
    facilities: ['Weight Training', 'Cardio Training'],
    services: [
      {
        category: 'TRAINING PROGRAMS',
        items: [
          'Strength Training',
          'Weight Training',
          'Cardio Training',
          'Functional Training',
          'Personal Training',
          'Muscle Building Program',
          'Fat Loss & Weight Management',
          'General Fitness Training'
        ]
      },
      {
        category: 'FITNESS SUPPORT',
        items: [
          'Workout Guidance',
          'Personalized Training Plans',
          'Fitness Assessment',
          'Progress Tracking',
          'Nutrition Guidance'
        ]
      }
    ],
    gallery: [
      'branch2_photo_1',
      'branch2_photo_2',
      'branch2_photo_3',
      'branch2_photo_4',
      'branch2_photo_5',
      'branch2_photo_6',
      'branch2_photo_7',
      'branch2_photo_8',
      'branch2_photo_9',
      'branch2_photo_10'
    ],
    mapUrl: null, // Left empty to prevent coordinate fabrication
    image: 'branch2_photo_1'
  }
];

