// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');

var cors = require('cors')

require('dotenv').config();

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        const allowed = process.env.CLIENT_URL || 'http://localhost:3000';
        // Allow any localhost port in development, or the configured CLIENT_URL in production
        if (!origin || origin === allowed || /^http:\/\/localhost:\d+$/.test(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}))

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});

app.use('/api/auth', userRoutes);
// This will handle routes like /api/auth/signup and /api/auth/login

app.use('/api/video',videoRoutes);
//This is for all the videosre lated api

const PORT = process.env.PORT || 5000;
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
