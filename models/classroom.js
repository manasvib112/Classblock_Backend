const mongoose = require('mongoose')
const today = require('./date.js')
const classroom = new mongoose.Schema({
  students: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  teachers: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  posts: {
    type: [mongoose.Types.ObjectId],
    ref: 'Post'
  },
  schedule: {
    type: [
      {
        day: String,
        time: String
      }
    ],
    required: true
  },
  assignment: {
    type: String,
    submittedBy: {
      type: [mongoose.Types.ObjectId],
      ref: 'User'
    },
    dueDate: Date,
    date_created: Date.now
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String
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
const Classroom = mongoose.model('Classroom', classroom)

module.exports = Classroom
