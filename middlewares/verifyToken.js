const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.authToken

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    const secret = process.env.JWT_SECRET
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach the decoded user data to the request object
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
