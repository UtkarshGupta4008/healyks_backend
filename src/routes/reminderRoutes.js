const express = require("express");
const { addReminder, getReminders, deleteReminder } = require("../controllers/reminderController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, addReminder);
router.get("/", authMiddleware, getReminders);
router.delete("/:id", authMiddleware, deleteReminder);

module.exports = router;
