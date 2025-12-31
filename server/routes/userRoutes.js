const express = require('express');
const usrCtrl = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// ALL ROUTES PROTECTED
router.use(authenticateToken);

// GET ALL USERS
router.get('/', usrCtrl.getAllUsers);

// GET USER BY ID
router.get('/:id', usrCtrl.getUserById);

// UPDATE USER INFO
router.put('/:id', usrCtrl.updateUser);

// DELETE USER
router.delete('/:id', usrCtrl.deleteUser);

// TOGGLE STATUS
router.patch('/:id/status', usrCtrl.toggleUserStatus);

module.exports = router;
