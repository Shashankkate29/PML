const galleryRepository = require('../repositories/galleryRepository');

class GalleryService {
  async getAllGalleryItems() {
    return await galleryRepository.findAll();
  }

  async getGalleryItemsByCategory(category) {
    return await galleryRepository.findByCategory(category);
  }
}

module.exports = new GalleryService();
