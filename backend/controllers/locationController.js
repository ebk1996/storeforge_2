const Location = require('../models/Location');

const locationController = {
  async getAll(req, res) {
    const locations = await Location.findAll();
    res.json(locations);
  }
};

module.exports = locationController;
