const Message = require('../models/Message');

const messageController = {
  async create(req, res) {
    const { toUserId, listingId, content } = req.body;
    const fromUserId = req.user.id;
    const id = await Message.create({ fromUserId, toUserId, listingId, content });
    res.status(201).json({ id });
  },
  async getByListing(req, res) {
    const messages = await Message.findByListing(req.params.listingId);
    res.json(messages);
  },
  async getByUser(req, res) {
    const messages = await Message.findByUser(req.user.id);
    res.json(messages);
  }
};

module.exports = messageController;
