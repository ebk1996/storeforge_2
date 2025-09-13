const db = require('../config/db');

// Location model for Craigslist Clone
const Location = {
  async findAll() {
    const result = await db.query('SELECT * FROM locations ORDER BY name ASC');
    return result.rows;
  }
};

module.exports = Location;
