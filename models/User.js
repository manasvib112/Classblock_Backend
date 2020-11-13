const mongoose = require('mongoose')
const today = require('./date.js')
const user = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  uid: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  followers: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  following: {
    type: [mongoose.Types.ObjectId],
    ref: 'User'
  },
  role: {
    type: String,
    required: true,
    enum: ['super', 'admin', 'teacher', 'cr', 'student']
  },
  dob: {
    type: Date
  },
  profile: {
    resume: String,
    year_in: String,
    year_out: String,
    branch: String,
    program: String,
    skills: [String],
    experiences: [String],
    projects: [String],
    certification: [String],
    education: [String]
  },
  teams: {
    type: [mongoose.Types.ObjectId],
    ref: 'Team'
  },
  isCR: {
    type: Boolean,
    default: false
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
const User = mongoose.model('User', user)
module.exports = User
//following are to be added
//password field
//followers and following list
