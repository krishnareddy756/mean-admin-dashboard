const mongoose = require('mongoose');
const Analytics = require('./models/Analytics');
const User = require('./models/User');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/smartwinnr';

async function seedDatabase() {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing analytics data
    await Analytics.deleteMany({});
    console.log('Cleared existing analytics data');

    // Generate sample analytics data for the last 30 days
    const analyticsData = [];
    const today = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      analyticsData.push({
        date,
        activeUsers: Math.floor(Math.random() * 3000) + 2000, // 2000-5000 users
        newSignups: Math.floor(Math.random() * 500) + 100, // 100-600 signups
        revenue: Math.floor(Math.random() * 50000) + 10000, // $10k-$60k
        conversionRate: Math.floor(Math.random() * 15) + 5, // 5%-20%
        userEngagement: Math.floor(Math.random() * 40) + 45, // 45%-85%
      });
    }

    await Analytics.insertMany(analyticsData);
    console.log(`Inserted ${analyticsData.length} analytics records`);

    // Clear existing users and create sample users
    await User.deleteMany({});
    console.log('Cleared existing users');

    const sampleUsers = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'hashed_password_1', // In real app, this would be hashed
        role: 'Admin',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'hashed_password_2',
        role: 'User',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'hashed_password_3',
        role: 'User',
      },
      {
        name: 'Alice Williams',
        email: 'alice@example.com',
        password: 'hashed_password_4',
        role: 'User',
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        password: 'hashed_password_5',
        role: 'User',
      },
      {
        name: 'Diana Prince',
        email: 'diana@example.com',
        password: 'hashed_password_6',
        role: 'Admin',
      },
      {
        name: 'Eve Davis',
        email: 'eve@example.com',
        password: 'hashed_password_7',
        role: 'User',
      },
      {
        name: 'Frank Miller',
        email: 'frank@example.com',
        password: 'hashed_password_8',
        role: 'User',
      },
    ];

    await User.insertMany(sampleUsers);
    console.log(`Inserted ${sampleUsers.length} users`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
