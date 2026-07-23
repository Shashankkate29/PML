const db = require('../config/db');

class TrainerRepository {
  async findAll() {
    return await db.query('SELECT * FROM trainers ORDER BY name ASC');
  }

  async findById(id) {
    const results = await db.query('SELECT * FROM trainers WHERE id = ?', [id]);
    return results[0] || null;
  }
}

module.exports = new TrainerRepository();
