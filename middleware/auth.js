// middleware/auth.js

const jwt = require('jsonwebtoken');

// Middleware to protect routes (ensure user is logged in)
const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (Format: 'Bearer <token>')
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach decoded user info to the request object
            req.user = decoded;

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({
                message: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        res.status(401).json({
            message: 'Not authorized, no token'
        });
    }
};

// Middleware to restrict access to only administrators
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            message: 'Not authorized as an admin'
        });
    }
};

module.exports = {
    protect,
    admin
};