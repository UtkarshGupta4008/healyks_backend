const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other', 'Prefer not to say']
  },
  weight: {
    type: Number
  },
  height: {
    type: Number
  },
  bloodGroup: {
    type: String
  },
  allergies: [{
    type: String
  }],
  chronicDiseases: [{
    type: String
  }],
  medications: [{
    type: String
  }],
  lifestyle: {
    smoking: {
      type: Boolean,
      default: false
    },
    alcohol: {
      type: Boolean,
      default: false
    },
    physicalActivity: {
      type: String,
      enum: ['None', 'Occasional', 'Regular', 'Daily']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);