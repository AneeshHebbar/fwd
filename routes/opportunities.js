// routes/opportunities.js
const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');
const { protect, admin } = require('../middleware/auth');

// ✅ Admin-only: Add opportunity
router.post('/', protect, admin, async (req, res) => {
    try {
        const opportunity = await Opportunity.create(req.body);
        res.status(201).json(opportunity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Public: Get scholarships
router.get('/scholarships', async (req, res) => {
    try {
        const data = await Opportunity.find({ category: 'scholarship' }).sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ Public: Get internships
router.get('/internships', async (req, res) => {
    try {
        const data = await Opportunity.find({ category: 'internship' }).sort({ createdAt: -1 });
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
