const db = require('../config/db');

// Listing model for Craigslist Clone
// Fields: id, title, description, price, category, location, userId, createdAt
const Listing = {
  async create({ title, description, price, category, location, userId }) {
    const result = await db.query(
      'INSERT INTO listings (title, description, price, category, location, userId, createdAt) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id',
      [title, description, price, category, location, userId]
    );
    return result.rows[0].id;
  },

  async findAll() {
    const result = await db.query('SELECT * FROM listings ORDER BY createdAt DESC');
    return result.rows;
  },

  async findById(id) {
    const result = await db.query('SELECT * FROM listings WHERE id = $1', [id]);
    return result.rows[0];
  },

  async findByCategory(category) {
    const result = await db.query('SELECT * FROM listings WHERE category = $1 ORDER BY createdAt DESC', [category]);
    return result.rows;
  },

  async findByLocation(location) {
    const result = await db.query('SELECT * FROM listings WHERE location = $1 ORDER BY createdAt DESC', [location]);
    return result.rows;
  },

  async delete(id, userId) {
    await db.query('DELETE FROM listings WHERE id = $1 AND userId = $2', [id, userId]);
  }
};

module.exports = Listing;
