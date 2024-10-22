const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/ // Email validation
  },
  phone: {
    type: String,
    required: true,
    match: /^\+\d{10,15}$/ // Match phone numbers in international format (+1234567890)
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'qualified', 'closed'], // Only allow specific statuses
    required: true
  }
});

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
