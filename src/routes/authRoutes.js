const express = require('express');
const router = express.Router();
const { verifyToken } = require('../controllers/authController');
const {authenticate} = require('../middlewares/authMiddlewareNew');

// Verify Firebase token
router.get('/verify', authenticate, verifyToken);

module.exports = router;