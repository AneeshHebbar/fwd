// models/Opportunity.js

const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    category: {
        type: String, // e.g., 'scholarship' or 'internship'
        required: true,
        enum: ['scholarship', 'internship']
    },
    location: {
        type: String,
        default: 'Not Specified'
    },
    salary: {
        type: String,
        default: 'Varies/Stipend'
    },
    // Useful for tracking when the admin added it
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);