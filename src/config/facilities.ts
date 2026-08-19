export interface Facility {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category: string;
}

export const fallbackFacilities: Facility[] = [
  {
    id: 1,
    name: 'Weight Training',
    description: 'Dedicated strength-training area equipped with plate-loaded stations, selectorized machines, and free weights.',
    image_url: 'gym_photo_2',
    category: 'General'
  },
  {
    id: 2,
    name: 'Cardio Training',
    description: 'Equipped with professional treadmills, elliptical trainers, and stationary bikes for cardiovascular conditioning.',
    image_url: 'gym_photo_1',
    category: 'General'
  },
  {
    id: 9,
    name: 'Steam Bath',
    description: 'Dedicated steam-bath experience for muscle relaxation and post-workout recovery.',
    image_url: 'facilities_steam',
    category: 'Recovery'
  },
  {
    id: 10,
    name: 'Ice Bath',
    description: 'Cold-water recovery plunge designed to support post-workout muscle relief and circulation.',
    image_url: 'facilities_recovery',
    category: 'Recovery'
  }
];

