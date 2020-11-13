const mongoose = require('mongoose')
const today = require('./date')

const reply = new mongoose.Schema({
  postedBy: {
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
  date_created: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  },
  date_updated: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  }
})

const Reply = mongoose.model('Reply', reply)
module.exports = Reply
