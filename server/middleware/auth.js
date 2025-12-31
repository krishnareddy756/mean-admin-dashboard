const jwt = require('jsonwebtoken');

// VERIFY JWT TOKEN
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const tok = authHeader && authHeader.split(' ')[1];

  if (!tok) {
    return res.status(401).json({ msg: 'Token required' });
  }

  jwt.verify(tok, process.env.JWT_SECRET, (err, usr) => {
    if (err) {
      return res.status(403).json({ msg: 'Invalid token' });
    }
    req.user = usr;
    next();
  });
};

// CHECK IF ADMIN
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ msg: 'Admin access required' });
  }
};

module.exports = { authenticateToken, authorizeAdmin };
