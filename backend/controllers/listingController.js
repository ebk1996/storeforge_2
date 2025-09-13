const Listing = require('../models/Listing');

const listingController = {
  async getAll(req, res) {
    const listings = await Listing.findAll();
    res.json(listings);
  },
  async getById(req, res) {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: 'Listing not found' });
    res.json(listing);
  },
  async getByCategory(req, res) {
    const listings = await Listing.findByCategory(req.params.category);
    res.json(listings);
  },
  async getByLocation(req, res) {
    const listings = await Listing.findByLocation(req.params.location);
    res.json(listings);
  },
  async create(req, res) {
    const { title, description, price, category, location } = req.body;
    const userId = req.user.id;
    const id = await Listing.create({ title, description, price, category, location, userId });
    res.status(201).json({ id });
  },
  async delete(req, res) {
    await Listing.delete(req.params.id, req.user.id);
    res.status(204).end();
  }
};

module.exports = listingController;
