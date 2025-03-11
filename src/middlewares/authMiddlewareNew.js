const admin = require('../config/firebase');
const { getFirestore } = require('firebase-admin/firestore');

// Cache to store recently verified tokens
const tokenCache = new Map();
const TOKEN_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

const authenticate = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    // First check if the token is in our cache
    const cachedUser = getCachedToken(token);
    if (cachedUser) {
      req.user = cachedUser;
      return next();
    }
    
    // If not in cache, verify with Firebase
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      
      // Optionally fetch additional user data from Firestore
      const userRecord = await admin.auth().getUser(decodedToken.uid);
      
      // Create a user object with relevant information
      const user = {
        uid: decodedToken.uid,
        email: decodedToken.email || userRecord.email,
        displayName: decodedToken.name || userRecord.displayName,
        // Add any other user fields you need
        emailVerified: decodedToken.email_verified || userRecord.emailVerified,
        tokenIssuedAt: new Date(decodedToken.iat * 1000).toISOString()
      };
      
      // Store user in the request for route handlers
      req.user = user;
      
      // Cache the user object
      cacheToken(token, user);
      
      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      
      // Return appropriate error responses based on the error type
      if (error.code === 'auth/id-token-expired') {
        return res.status(401).json({
          success: false,
          message: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
      } else if (error.code === 'auth/id-token-revoked') {
        return res.status(401).json({
          success: false,
          message: 'Token revoked',
          code: 'TOKEN_REVOKED'
        });
      } else if (error.code === 'auth/invalid-id-token') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token',
          code: 'INVALID_TOKEN'
        });
      } else if (error.code === 'auth/user-disabled') {
        return res.status(403).json({
          success: false,
          message: 'User account disabled',
          code: 'USER_DISABLED'
        });
      } else {
        return res.status(401).json({
          success: false,
          message: 'Authentication failed',
          code: 'AUTH_FAILED'
        });
      }
    }
  } catch (error) {
    console.error('Authentication processing error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error during authentication'
    });
  }
};

// Function to check for a valid cached token
function getCachedToken(token) {
  if (tokenCache.has(token)) {
    const { user, expiry } = tokenCache.get(token);
    if (expiry > Date.now()) {
      return user;
    } else {
      // Token cache expired, remove it
      tokenCache.delete(token);
    }
  }
  return null;
}

// Function to cache a token
function cacheToken(token, user) {
  tokenCache.set(token, {
    user,
    expiry: Date.now() + TOKEN_CACHE_DURATION
  });
  
  // Cleanup: remove expired tokens periodically
  if (tokenCache.size > 100) { // Prevent memory leaks by limiting cache size
    cleanupExpiredTokens();
  }
}

// Remove expired tokens from cache
function cleanupExpiredTokens() {
  const now = Date.now();
  for (const [token, { expiry }] of tokenCache.entries()) {
    if (expiry <= now) {
      tokenCache.delete(token);
    }
  }
}

// Additional utility function for requiring specific claims/roles
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    
    // Check if user has the required role
    // This assumes Firebase custom claims or your user object contains a "role" property
    const userRole = req.user.role || (req.user.customClaims ? req.user.customClaims.role : null);
    
    if (!userRole || (Array.isArray(roles) ? !roles.includes(userRole) : roles !== userRole)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
};

module.exports = { 
  authenticate, 
  requireRole 
};
