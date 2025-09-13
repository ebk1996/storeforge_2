const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.create);
router.get('/listing/:listingId', messageController.getByListing);
router.get('/user', messageController.getByUser);

module.exports = router;
