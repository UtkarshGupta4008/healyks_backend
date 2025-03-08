const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    medicationName: { type: String, required: true },
    dosage: String,
    time: String,
});

module.exports = mongoose.model("Reminder", ReminderSchema);
