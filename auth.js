// routes/auth.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('..//models/user');

// Helper function to generate JWT token
const generateToken = (id, name, isAdmin) => {
    return jwt.sign({
        id,
        name,
        isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token expires in 1 day
    });
};

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async(req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    // Simple validation
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Please enter all fields'
        });
    }

    try {
        // Check if user already exists
        let user = await User.findOne({
            email
        });
        if (user) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // Create new user (password is auto-hashed via pre-save middleware)
        user = new User({
            name,
            email,
            password,
            // You can manually set the first user as admin for setup purposes:
            // isAdmin: (await User.countDocuments()) === 0 ? true : false,
        });

        await user.save();

        res.status(201).json({
            name: user.name,
            email: user.email,
            message: 'User registered successfully. Please login.'
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error during signup'
        });
    }
});


// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async(req, res) => {
    const {
        email,
        password
    } = req.body;

    try {
        // 1. Check if user exists
        const user = await User.findOne({
            email
        });
        if (!user) {
            return res.status(400).json({
                message: 'Invalid Credentials'
            });
        }

        // 2. Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid Credentials'
            });
        }

        // 3. Generate and send token
        res.json({
            token: generateToken(user._id, user.name, user.isAdmin),
            name: user.name,
            isAdmin: user.isAdmin,
            message: 'Login successful'
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            message: 'Server error during login'
        });
    }
});

module.exports = router;