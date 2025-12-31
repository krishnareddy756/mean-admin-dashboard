const Analytics = require('../models/Analytics');

// GET ANALYTICS BY DATE RANGE
exports.getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const q = {};
    if (startDate && endDate) {
      q.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const data = await Analytics.find(q).sort({ date: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch analytics', err: err.message });
  }
};

// GET SUMMARY STATS
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const q = {};
    if (startDate && endDate) {
      q.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const data = await Analytics.find(q).lean();
    
    console.log('===== ANALYTICS SUMMARY DEBUG =====');
    console.log('Records found:', data.length);
    if(data.length > 0) {
      console.log('First record:', JSON.stringify(data[0], null, 2));
    }

    // BUILD SUMMARY
    const summary = {
      totalActiveUsers: 0,
      totalNewSignups: 0,
      totalRevenue: 0,
      avgConversion: 0,
      avgEngagement: 0,
    };

    if (data.length > 0) {
      data.forEach((d) => {
        summary.totalActiveUsers += d.activeUsers;
        summary.totalNewSignups += d.newSignups;
        summary.totalRevenue += d.revenue;
        summary.avgConversion += d.conversionRate;
        summary.avgEngagement += d.userEngagement;
      });

      summary.avgConversion = (summary.avgConversion / data.length).toFixed(2);
      summary.avgEngagement = (summary.avgEngagement / data.length).toFixed(2);
    }

    res.json(summary);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch summary', err: err.message });
  }
};
