const express = require("express");
const { analyzeSymptoms } = require("../controllers/symptomController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/analyze", authMiddleware, analyzeSymptoms);

module.exports = router;
