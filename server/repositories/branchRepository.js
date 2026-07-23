const db = require('../config/db');

class BranchRepository {
  async findAll() {
    return await db.query('SELECT * FROM branches ORDER BY name ASC');
  }

  async findById(id) {
    const results = await db.query('SELECT * FROM branches WHERE id = ?', [id]);
    return results[0] || null;
  }
}

module.exports = new BranchRepository();
