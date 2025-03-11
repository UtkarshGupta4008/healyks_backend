const express = require('express');
const router = express.Router();
const { postUserBody, getUserDetails } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authMiddlewareNew');

// Apply auth middleware to all routes
router.use(authenticate);

// Save user body data
router.post('/postUserBody', postUserBody);

// Get user details
router.get('/details', getUserDetails);

module.exports = router;