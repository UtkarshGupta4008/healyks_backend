const User = require('../models/user');

/**
 * Save user body screen data
 * @route POST /api/user/postUserBody
 */
const postUserBody = async (req, res) => {
  try {
    const { 
      age, gender, weight, height, bloodGroup, 
      allergies, chronicDiseases, medications, lifestyle 
    } = req.body;
    
    // Get user ID from Firebase auth middleware
    const uid = req.user.uid;
    const email = req.user.email;
    
    // Find the user or create if doesn't exist
    let user = await User.findOne({ uid });
    
    if (user) {
      // Update existing user
      user.age = age;
      user.gender = gender;
      user.weight = weight;
      user.height = height;
      user.bloodGroup = bloodGroup;
      user.allergies = allergies;
      user.chronicDiseases = chronicDiseases;
      user.medications = medications;
      user.lifestyle = lifestyle;
    } else {
      // Create new user
      user = new User({
        uid,
        email,
        age,
        gender,
        weight,
        height,
        bloodGroup,
        allergies,
        chronicDiseases,
        medications,
        lifestyle
      });
    }
    
    await user.save();
    
    res.status(200).json({ 
      message: 'User body screen data saved successfully',
      sucess: 'True'
    });
  } catch (error) {
    console.error('Error saving user body data:', error);
    res.status(500).json({ 
      message: 'Failed to save user data',
      success: 'false',
      //error: error.message 
    });
  }
};

/**
 * Get user details
 * @route GET /api/user/details
 */
const getUserDetails = async (req, res) => {
  try {
    const uid = req.user.uid;
    
    const user = await User.findOne({ uid }).select('-__v -_id -uid');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    else if(user){
      return res.status(200).json({
        success: true,
        message: 'User details fetched',
      });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ 
      message: 'Failed to fetch user details',
      error: error.message 
    });
  }
};

module.exports = { postUserBody, getUserDetails };