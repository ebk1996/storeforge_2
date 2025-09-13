const db = require('../config/db');

// Message model for Craigslist Clone
const Message = {
  async create({ fromUserId, toUserId, listingId, content }) {
    const result = await db.query(
      'INSERT INTO messages (fromUserId, toUserId, listingId, content, createdAt) VALUES ($1, $2, $3, $4, NOW()) RETURNING id',
      [fromUserId, toUserId, listingId, content]
    );
    return result.rows[0].id;
  },

  async findByListing(listingId) {
    const result = await db.query('SELECT * FROM messages WHERE listingId = $1 ORDER BY createdAt ASC', [listingId]);
    return result.rows;
  },

  async findByUser(userId) {
    const result = await db.query('SELECT * FROM messages WHERE toUserId = $1 OR fromUserId = $1 ORDER BY createdAt DESC', [userId]);
    return result.rows;
  }
};

module.exports = Message;
