const mongoose = require('mongoose')
const today = require('./date.js')

const comment = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'User'
  },
  body: {
    type: String,
    required: true
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  reply: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Reply'
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

//const Like = mongoose.model("like", likeschema);
const Comment = mongoose.model('Comment', comment)

module.exports = Comment
