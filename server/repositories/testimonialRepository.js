const db = require('../config/db');

class TestimonialRepository {
  async findAll() {
    return await db.query('SELECT * FROM testimonials ORDER BY id DESC');
  }

  async findFeatured() {
    return await db.query('SELECT * FROM testimonials WHERE rating >= 4 ORDER BY id DESC LIMIT 5');
  }
}

module.exports = new TestimonialRepository();
