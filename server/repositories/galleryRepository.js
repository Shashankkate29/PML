const db = require('../config/db');

class GalleryRepository {
  async findAll() {
    return await db.query('SELECT * FROM gallery ORDER BY id DESC');
  }

  async findByCategory(category) {
    return await db.query('SELECT * FROM gallery WHERE category = ? ORDER BY id DESC', [category]);
  }
}

module.exports = new GalleryRepository();
