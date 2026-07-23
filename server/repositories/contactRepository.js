const db = require('../config/db');

class ContactRepository {
  async create(contactData) {
    const { name, email, phone, subject, message, status = 'pending' } = contactData;
    const sql = 'INSERT INTO contact_messages (name, email, phone, subject, message, status) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [name, email, phone || null, subject, message, status];
    const result = await db.query(sql, params);
    return { id: result.insertId, ...contactData, status };
  }

  async findAll() {
    return await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
  }
}

module.exports = new ContactRepository();
