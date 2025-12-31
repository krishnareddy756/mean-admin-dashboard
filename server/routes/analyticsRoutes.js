const express = require('express');
const analyticsCtrl = require('../controllers/analyticsController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// ALL PROTECTED
router.use(authenticateToken);

// GET ANALYTICS DATA
router.get('/', analyticsCtrl.getAnalytics);

// GET ANALYTICS SUMMARY
router.get('/summary', analyticsCtrl.getAnalyticsSummary);

module.exports = router;
