const mongoose = require('mongoose')
const today = require('./date.js')

const event = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: 'String'
  },
  venue: {
    type: 'String'
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  url: {
    type: String,
    unique: true,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  organisers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Team'
  },
  status: {
    type: String,
    enum: ['planning', 'scheduled', 'osngoing', 'postponed', 'cancelled'],
    default: 'scheduled'
  },
  participants: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  invited: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  interested: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  date_created: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  },
  date_updated: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  }
})

const events = mongoose.model('events', eventschema)
module.exports = events
