const db = require('../config/db');

class GalleryRepository {
  async findAll() {
    try {
      // Fetch metadata from database
      const dbItems = await db.query('SELECT * FROM gallery ORDER BY id ASC');
      return dbItems;
    } catch (err) {
      console.error('[GalleryRepository] Failed to query gallery:', err.message);
      return [];
    }
  }

  async findByCategory(category) {
    const all = await this.findAll();
    return all.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }
}

module.exports = new GalleryRepository();
