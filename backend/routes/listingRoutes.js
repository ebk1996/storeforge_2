const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');

// Listings routes
router.get('/', listingController.getAll);
router.get('/:id', listingController.getById);
router.get('/category/:category', listingController.getByCategory);
router.get('/location/:location', listingController.getByLocation);
router.post('/', listingController.create);
router.delete('/:id', listingController.delete);

module.exports = router;
