// routes/opportunities.js
const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity'); // <-- Import the new model
const {
    protect,
    admin
} = require('../middleware/auth');
// @route   POST /api/opportunities
// @desc    Add a new scholarship/internship (Admin only)
// @access  Private/Admin
router.post('/', protect, admin, async(req, res) => {
    try {
        const opportunity = await Opportunity.create(req.body);
        res.status(201).json({
            message: `Opportunity "${opportunity.title}" added successfully!`,
            opportunity
        });
    } catch (error) {
        console.error('Error adding opportunity:', error);
        res.status(500).json({
            message: 'Failed to add opportunity to the database.',
            error: error.message
        });
    }
});
// @route   GET /api/opportunities/scholarships
// @desc    Get all scholarships (used by frontend)
// @access  Public
router.get('/scholarships', async(req, res) => {
    try {
        // Find all opportunities where category is 'scholarship', sort by newest first
        const scholarships = await Opportunity.find({ category: 'scholarship' }).sort({ createdAt: -1 });
        res.json(scholarships);
    } catch (error) {
        console.error('Error fetching scholarships:', error);
        res.status(500).json({
            message: 'Server error while fetching scholarships.'
        });
    }
});
// @route   GET /api/opportunities/internships
// @desc    Get all internships (used by frontend)
// @access  Public
router.get('/internships', async(req, res) => {
    try {
        // Find all opportunities where category is 'internship', sort by newest first
        const internships = await Opportunity.find({ category: 'internship' }).sort({ createdAt: -1 });
        res.json(internships);
    } catch (error) {
        console.error('Error fetching internships:', error);
        res.status(500).json({
            message: 'Server error while fetching internships.'
        });
    }
});

module.exports = router;