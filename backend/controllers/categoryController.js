const Category = require('../models/Category');

const categoryController = {
  async getAll(req, res) {
    const categories = await Category.findAll();
    res.json(categories);
  }
};

module.exports = categoryController;
