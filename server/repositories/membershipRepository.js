const db = require('../config/db');

class MembershipRepository {
  async findAll() {
    return await db.query('SELECT * FROM memberships ORDER BY price ASC');
  }

  async findById(id) {
    const results = await db.query('SELECT * FROM memberships WHERE id = ?', [id]);
    return results[0] || null;
  }
}

module.exports = new MembershipRepository();
