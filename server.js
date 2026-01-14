// server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const path = require('path');
const cors = require('cors');


// Load environment variables from .env file
dotenv.config();

// --- Connect to the MongoDB Database ---
// NOTE: Make sure your MONGO_URI in .env is correct before running
connectDB();

const app = express();

// --- Middleware ---
// Enable CORS (useful if running frontend on a separate port/domain)
app.use(cors());

// Body parser middleware for handling JSON requests (VERY IMPORTANT for forms)
app.use(express.json());


// --- API Routes ---
// The frontend calls these endpoints (e.g., /api/auth/login)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/opportunities', require('./routes/opportunities'));

// --- Frontend Serving (Static Files) ---
// Define the path to your static files (public folder)
const frontendPath = path.join(__dirname, 'public');
app.use(express.static(frontendPath));

// For any GET request that is not an API route, serve the index.html
// This allows the frontend's hash-based routing to work (e.g., #login)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
});


// --- Start Server ---
const PORT = process.env.PORT || 5502;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));