const express = require('express');
const router = express.Router();
const { getDashboardContent } = require('../controllers/dashboardController');
const { authenticate } = require('../middlewares/authMiddlewareNew');

// Apply auth middleware
router.use(authenticate);

// Get dashboard content
router.get('/', getDashboardContent);

module.exports = router;