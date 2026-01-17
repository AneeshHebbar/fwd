const jwt = require('jsonwebtoken');

// --------------------
// Protect middleware
// --------------------
const protect = (req, res, next) => {
    let token;

    // 1. Check if Authorization header exists
    if (req.headers.authorization) {
        const authHeader = req.headers.authorization;

        // 2. Check Bearer format
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
    }

    // 3. If no token found
    if (!token) {
        return res.status(401).json({
            message: 'Not authorized, token missing'
        });
    }

    try {
        // 4. Verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Attach decoded user to request
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Not authorized, token invalid'
        });
    }
};

// --------------------
// Admin middleware
// --------------------
const admin = (req, res, next) => {
    // Ensure user exists and is admin
    if (req.user && req.user.isAdmin === true) {
        next();
    } else {
        return res.status(403).json({
            message: 'Access denied: Admins only'
        });
    }
};

module.exports = { protect, admin };
