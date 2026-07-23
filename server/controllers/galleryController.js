const galleryService = require('../services/galleryService');
const { successResponse } = require('../utils/response');

class GalleryController {
  async getGalleryItems(req, res, next) {
    try {
      const { category } = req.query;
      let items;
      if (category) {
        items = await galleryService.getGalleryItemsByCategory(category);
      } else {
        items = await galleryService.getAllGalleryItems();
      }
      return successResponse(res, items, 'Gallery items retrieved successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GalleryController();
