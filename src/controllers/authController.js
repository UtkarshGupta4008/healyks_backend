const admin = require('../config/firebase');
const User = require('../models/user');

/*
 * Verify Firebase token and return user details
 * @route GET /api/auth/verify
 */
const verifyToken = async (req, res) => {
  // Token is already verified by the middleware
  try {
    return res.status(200).json({
      success: true,
      message: 'valid token',
      //user: req.user
    });
  } catch (error) {
    //console.error('Error in token verification:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Server error during token verification' 
    });
  }
};

module.exports = { verifyToken };