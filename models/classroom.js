const mongoose = require('mongoose')
const today = require('./date.js')
const classroomschema = new mongoose.Schema({
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
  subjectName: {
    type: String,
    required: true
  },
  datecreated: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  },
  dateupdated: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  }
})
const Classroom = mongoose.model('Classroom', classroomschema)

module.exports = Classroom
