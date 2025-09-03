
// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to check JWT token
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('hello')
  console.log('Authorization Header:', req.header('Authorization')); // Debug log


  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Authenticated User:', req.user);  
    next(); 
  } catch (error) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authenticateUser;
