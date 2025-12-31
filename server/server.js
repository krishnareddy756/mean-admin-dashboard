require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const User = require('./models/User');
const Analytics = require('./models/Analytics');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analytics', analyticsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Seed database endpoint
app.post('/api/seed', async (req, res) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Analytics.deleteMany({});

    const sampleUsers = [
      {
        googleId: 'google_admin_1',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'Admin',
        status: 'Active',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        googleId: 'google_user_1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'User',
        status: 'Active',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        googleId: 'google_user_2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Active',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        googleId: 'google_user_3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'User',
        status: 'Inactive',
        profilePicture: 'https://via.placeholder.com/150',
      },
      {
        googleId: 'google_user_4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'User',
        status: 'Active',
        profilePicture: 'https://via.placeholder.com/150',
      },
    ];

    await User.insertMany(sampleUsers);

    const sampleAnalytics = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      sampleAnalytics.push({
        date,
        activeUsers: Math.floor(Math.random() * 500) + 100,
        newSignups: Math.floor(Math.random() * 50) + 5,
        revenue: Math.floor(Math.random() * 10000) + 1000,
        conversionRate: (Math.random() * 5 + 2).toFixed(2),
        userEngagement: (Math.random() * 100).toFixed(2),
      });
    }

    await Analytics.insertMany(sampleAnalytics);

    res.json({
      message: 'Database seeded successfully',
      users: sampleUsers.length,
      analytics: sampleAnalytics.length,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding database', error: error.message });
  }
});


// Seed database with sample data
const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    const analyticsCount = await Analytics.countDocuments();

    if (userCount === 0) {
      const sampleUsers = [
        {
          googleId: 'google_admin_1',
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'Admin',
          status: 'Active',
          profilePicture: 'https://via.placeholder.com/150',
        },
        {
          googleId: 'google_user_1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'User',
          status: 'Active',
          profilePicture: 'https://via.placeholder.com/150',
        },
        {
          googleId: 'google_user_2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'User',
          status: 'Active',
          profilePicture: 'https://via.placeholder.com/150',
        },
        {
          googleId: 'google_user_3',
          name: 'Bob Johnson',
          email: 'bob@example.com',
          role: 'User',
          status: 'Inactive',
          profilePicture: 'https://via.placeholder.com/150',
        },
        {
          googleId: 'google_user_4',
          name: 'Alice Brown',
          email: 'alice@example.com',
          role: 'User',
          status: 'Active',
          profilePicture: 'https://via.placeholder.com/150',
        },
      ];
      await User.insertMany(sampleUsers);
      console.log('Sample users created');
    }

    if (analyticsCount === 0) {
      const sampleAnalytics = [];
      const today = new Date();

      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);

        sampleAnalytics.push({
          date,
          activeUsers: Math.floor(Math.random() * 500) + 100,
          newSignups: Math.floor(Math.random() * 50) + 5,
          revenue: Math.floor(Math.random() * 10000) + 1000,
          conversionRate: (Math.random() * 5 + 2).toFixed(2),
          userEngagement: (Math.random() * 100).toFixed(2),
        });
      }

      await Analytics.insertMany(sampleAnalytics);
      console.log('Sample analytics created');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await seedDatabase();
  console.log(`Server running on port ${PORT}`);
});
