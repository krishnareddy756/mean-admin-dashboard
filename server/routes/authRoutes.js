const express = require('express');
const authCtrl = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// EMAIL LOGIN
router.post('/login', authCtrl.emailLogin);

// GOOGLE SSO LOGIN
router.post('/google-login', authCtrl.googleLogin);

// GET CURRENT USER
router.get('/me', authenticateToken, authCtrl.getCurrentUser);

module.exports = router;
