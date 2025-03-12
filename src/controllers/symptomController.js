const { analyzeSymptoms } = require('../utils/geminiHelper');
const User = require('../models/userModel');

/**
 * Analyze symptoms using Google Gemini API
 * @route POST /api/symptoms/analyze
 */
const analyzeUserSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    
    if (!symptoms) {
      return res.status(400).json({ 
        message: 'Symptoms are required'
      });
    }
    
    // Get user profile for context if available
    const uid = req.user.uid;
    const userProfile = await User.findOne({ uid }).lean();
    
    // Analyze symptoms with Gemini API
    const analysis = await analyzeSymptoms(symptoms, userProfile);
    
    res.status(200).json(analysis);
  } catch (error) {
    console.error('Error analyzing symptoms:', error);
    res.status(500).json({ 
      message: 'Failed to analyze symptoms',
      error: error.message 
    });
  }
};

module.exports = { analyzeUserSymptoms };
