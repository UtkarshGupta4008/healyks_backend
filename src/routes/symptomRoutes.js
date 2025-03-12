const express = require('express');
const router = express.Router();
const { analyzeUserSymptoms } = require('../controllers/symptomController');
const { authenticate } = require('../middlewares/authMiddlewareNew');

// Apply auth middleware to all routes
router.use(authenticate);

// Analyze symptoms
router.post('/analyze', analyzeUserSymptoms);

module.exports = router;
