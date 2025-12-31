const jwt = require('jsonwebtoken');
const User = require('../models/User');

// HANDLE EMAIL LOGIN
exports.emailLogin = async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const normalizedEmail = email.toLowerCase();
    
    // LOOK FOR USER IN DB
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        pic: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', err: err.message });
  }
};

// GOOGLE SSO FLOW
exports.googleLogin = async (req, res) => {
  try {
    const { googleId, email, name, profilePicture: pic } = req.body;
    const adminList = ['krishnacareer8826@gmail.com', 'admin@example.com'];

    // CHECK IF USER EXISTS
    let user = await User.findOne({ googleId });

    if (!user) {
      // DETERMINE ROLE BASED ON EMAIL
      const isAdmin = adminList.some(a => a.toLowerCase() === email.toLowerCase());
      
      user = new User({
        googleId,
        email,
        name,
        profilePicture: pic,
        role: isAdmin ? 'Admin' : 'User',
        status: 'Active',
      });
      await user.save();
    }

    // GENERATE JWT TOKEN
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
        pic: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed', err: err.message });
  }
};

// FETCH CURRENT USER
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch user', err: err.message });
  }
};
