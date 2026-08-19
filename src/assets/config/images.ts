import pmlLogo from '../images/pml_logo.jpg';
import heroBg from '../images/hero_bg.png';
import facilitiesGym from '../images/facilities_gym.png';
import facilitiesCardio from '../images/facilities_cardio.png';
import facilitiesRecovery from '../images/facilities_recovery.png';
import facilitiesSteam from '../images/facilities_steam.png';
import facilitiesNutrition from '../images/facilities_nutrition.png';
import facilitiesKitchen from '../images/facilities_kitchen.png';
import facilitiesZumba from '../images/facilities_zumba.png';
import trainer1 from '../images/trainer_1.png';
import trainer2 from '../images/trainer_2.png';
import gallery1 from '../images/gallery_1.png';
import gallery2 from '../images/gallery_2.png';

// Import real gym photographs
import gymPhoto1 from '../images/gym_photo_1.jpeg';
import gymPhoto2 from '../images/gym_photo_2.jpeg';
import gymPhoto3 from '../images/gym_photo_3.jpeg';
import gymPhoto4 from '../images/gym_photo_4.jpeg';
import gymPhoto5 from '../images/gym_photo_5.jpeg';
import gymPhoto6 from '../images/gym_photo_6.jpeg';
import gymPhoto7 from '../images/gym_photo_7.jpeg';
import gymPhoto8 from '../images/gym_photo_8.jpeg';
import gymPhoto9 from '../images/gym_photo_9.jpeg';
import gymPhoto10 from '../images/gym_photo_10.jpeg';

// Import branch1-specific photographs
import branch1Photo1 from '../images/branch1/01.jpeg';
import branch1Photo2 from '../images/branch1/02.jpeg';
import branch1Photo3 from '../images/branch1/03.jpeg';
import branch1Photo4 from '../images/branch1/04.jpeg';
import branch1Photo5 from '../images/branch1/05.jpeg';
import branch1Photo6 from '../images/branch1/06.jpeg';
import branch1Photo7 from '../images/branch1/07.jpeg';

// Import branch2-specific photographs
import branch2Photo1 from '../images/branch2/0.1.jpeg';
import branch2Photo2 from '../images/branch2/0.2.jpeg';
import branch2Photo3 from '../images/branch2/0.3.jpeg';
import branch2Photo4 from '../images/branch2/0.4.jpeg';
import branch2Photo5 from '../images/branch2/0.5.jpeg';
import branch2Photo6 from '../images/branch2/0.6.jpeg';
import branch2Photo7 from '../images/branch2/0.7.jpeg';
import branch2Photo8 from '../images/branch2/0.8.jpeg';
import branch2Photo9 from '../images/branch2/0.9.jpeg';
import branch2Photo10 from '../images/branch2/0.10.jpeg';

export const images = {
  pmlLogo,
  heroBg,
  facilitiesGym,
  facilitiesCardio,
  facilitiesRecovery,
  facilitiesSteam,
  facilitiesNutrition,
  facilitiesKitchen,
  facilitiesZumba,
  trainer1,
  trainer2,
  gallery1,
  gallery2,
  gymPhoto1,
  gymPhoto2,
  gymPhoto3,
  gymPhoto4,
  gymPhoto5,
  gymPhoto6,
  gymPhoto7,
  gymPhoto8,
  gymPhoto9,
  gymPhoto10,
  branch2Photo1,
  branch2Photo2,
  branch2Photo3,
  branch2Photo4,
  branch2Photo5,
  branch2Photo6,
  branch2Photo7,
  branch2Photo8,
  branch2Photo9,
  branch2Photo10,
  branch1Photo1,
  branch1Photo2,
  branch1Photo3,
  branch1Photo4,
  branch1Photo5,
  branch1Photo6,
  branch1Photo7,
};

export const imageMap: Record<string, string> = {
  'pml_logo': pmlLogo,
  'hero_bg': heroBg,
  'facilities_gym': facilitiesGym,
  'facilities_cardio': facilitiesCardio,
  'facilities_recovery': facilitiesRecovery,
  'facilities_steam': facilitiesSteam,
  'facilities_nutrition': facilitiesNutrition,
  'facilities_kitchen': facilitiesKitchen,
  'facilities_zumba': facilitiesZumba,
  'trainer_1': trainer1,
  'trainer_2': trainer2,
  'gallery_1': gallery1,
  'gallery_2': gallery2,
  'gym_photo_1': gymPhoto1,
  'gym_photo_2': gymPhoto2,
  'gym_photo_3': gymPhoto3,
  'gym_photo_4': gymPhoto4,
  'gym_photo_5': gymPhoto5,
  'gym_photo_6': gymPhoto6,
  'gym_photo_7': gymPhoto7,
  'gym_photo_8': gymPhoto8,
  'gym_photo_9': gymPhoto9,
  'gym_photo_10': gymPhoto10,
  'branch2_photo_1': branch2Photo1,
  'branch2_photo_2': branch2Photo2,
  'branch2_photo_3': branch2Photo3,
  'branch2_photo_4': branch2Photo4,
  'branch2_photo_5': branch2Photo5,
  'branch2_photo_6': branch2Photo6,
  'branch2_photo_7': branch2Photo7,
  'branch2_photo_8': branch2Photo8,
  'branch2_photo_9': branch2Photo9,
  'branch2_photo_10': branch2Photo10,
  'branch1_photo_1': branch1Photo1,
  'branch1_photo_2': branch1Photo2,
  'branch1_photo_3': branch1Photo3,
  'branch1_photo_4': branch1Photo4,
  'branch1_photo_5': branch1Photo5,
  'branch1_photo_6': branch1Photo6,
  'branch1_photo_7': branch1Photo7,
};

export function resolveImageUrl(imageUrl: string | undefined): string {
  if (!imageUrl) return imageMap['facilities_gym'];
  if (imageUrl.startsWith('http')) return imageUrl;
  
  let key = imageUrl;
  
  // For branch1: /photos/branch1/01.jpeg -> branch1_photo_1
  const branch1Match = imageUrl.match(/\/photos\/branch1\/0?(\d+)\.jpe?g/i);
  if (branch1Match) {
    key = `branch1_photo_${branch1Match[1]}`;
  }
  
  // For branch2: /photos/branch2/0.1.jpeg -> branch2_photo_1
  const branch2Match = imageUrl.match(/\/photos\/branch2\/0?\.?(\d+)\.jpe?g/i);
  if (branch2Match) {
    key = `branch2_photo_${branch2Match[1]}`;
  }
  
  // For general: /photos/gym_photo_1.jpeg -> gym_photo_1
  const gymPhotoMatch = imageUrl.match(/\/photos\/gym_photo_(\d+)\.jpe?g/i);
  if (gymPhotoMatch) {
    key = `gym_photo_${gymPhotoMatch[1]}`;
  }
  
  // If the key is in imageMap, return it
  if (imageMap[key]) {
    return imageMap[key];
  }
  
  // If imageUrl is directly a key in imageMap
  if (imageMap[imageUrl]) {
    return imageMap[imageUrl];
  }
  
  // Fallback to relative path directly if starting with /
  if (imageUrl.startsWith('/')) {
    return imageUrl;
  }
  
  return imageMap['facilities_gym'];
}

export default images;

