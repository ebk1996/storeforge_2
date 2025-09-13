const db = require('../config/db');

// Category model for Craigslist Clone
const Category = {
  async findAll() {
    const result = await db.query('SELECT * FROM categories ORDER BY name ASC');
    return result.rows;
  }
};

module.exports = Category;
