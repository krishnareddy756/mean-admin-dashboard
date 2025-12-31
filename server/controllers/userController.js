const User = require('../models/User');

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-googleId');
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch users', err: err.message });
  }
};

// GET SINGLE USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const usr = await User.findById(req.params.id);
    if (!usr) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(usr);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch user', err: err.message });
  }
};

// UPDATE USER INFO
exports.updateUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    const usr = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true }
    );
    if (!usr) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'Updated', usr });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update user', err: err.message });
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const usr = await User.findByIdAndDelete(req.params.id);
    if (!usr) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to delete user', err: err.message });
  }
};

// TOGGLE USER STATUS
exports.toggleUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const usr = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!usr) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'Status updated', usr });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update status', err: err.message });
  }
};
