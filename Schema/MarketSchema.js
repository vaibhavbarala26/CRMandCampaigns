const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  budget: {
    type: Number,
    required: true,
    min: 0 // Budget should be a positive number
  },
  clicks: {
    type: Number,
    required: true,
    min: 0 // Clicks should be a positive integer
  },
  leads_generated: {
    type: Number,
    required: true,
    min: 0 // Leads generated should be a positive integer
  },
  conversion_rate: {
    type: Number,
    required: true,
    min: 0,   // Conversion rate cannot be negative
    max: 1    // Conversion rate should be between 0 and 1 (percentage as a decimal)
  }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
