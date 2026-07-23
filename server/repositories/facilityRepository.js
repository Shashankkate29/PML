const db = require('../config/db');

class FacilityRepository {
  async findAll() {
    return await db.query('SELECT * FROM facilities ORDER BY category ASC, name ASC');
  }

  async findByCategory(category) {
    return await db.query('SELECT * FROM facilities WHERE category = ? ORDER BY name ASC', [category]);
  }
}

module.exports = new FacilityRepository();
