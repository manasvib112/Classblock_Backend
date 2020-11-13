const mongoose = require('mongoose')
const today = require('./date')

const share = new mongoose.Schema({
  sharedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  comments: {
    type: [mongoose.Types.ObjectId],
    ref: 'Comment'
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'Event'
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'Class'
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

const Share = mongoose.model('Share', share)
module.exports = Share
