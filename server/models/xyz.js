// Example script to add test data
const mongoose = require('mongoose');
const User = require('./models/User');
const UserFeed = require('./models/UserFeed');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const seedDatabase = async () => {
  try {
    // Create a new user
    const user = new User({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123'
    });
    await user.save();

    // Add tags to UserFeed
    const userFeed = new UserFeed({
      userId: user._id,
      tags: ['technology', 'programming'],
      videoId: 'abcd1234'
    });
    await userFeed.save();

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
