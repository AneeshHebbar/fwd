// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const path = require('path');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// --- Middleware ---

// ✅ Allow requests from ANY origin (development only)
app.use(cors());

// Parse JSON body
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));
app.use('/api/opportunities', require('./routes/opportunities'));

// --- Frontend Serving ---
// --- Frontend Serving ---
const frontendPath = path.join(__dirname, 'public');
app.use(express.static(frontendPath));

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});