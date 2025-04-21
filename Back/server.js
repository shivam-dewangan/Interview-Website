// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes.js');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes);       // Authentication: login/signup
app.use('/api/uploads', uploadRoutes);  // ✅ NOT /api
// Resume uploads (e.g., /api/uploads)

// Home route (optional)
app.get('/', (req, res) => {
  res.send('🚀 Resume Upload & Auth API is running...');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
