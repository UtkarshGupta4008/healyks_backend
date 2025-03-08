const express = require("express");
const { getHealthEducationContent } = require("../controllers/dashboardController");
//const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", authMiddleware, getHealthEducationContent);

module.exports = router;
