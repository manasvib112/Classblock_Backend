const mongoose = require('mongoose')
const today = require('./date.js')
const post = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  content: {
    type: String,
    required: true
  },
  media: {
    type: String
  },
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment'
  },
  shares: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Share'
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
    default: Date.now
  },
  date_updated: {
    type: Date,
    default: Date.now
  }
})

const Post = mongoose.model('Post', post)

module.exports = Post
