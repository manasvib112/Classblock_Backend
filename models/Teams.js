const mongoose = require('mongoose')
const today = require('./date')

const team = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  current_members: [
    {
      candidate: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      },
      position: {
        type: String,
        required: true
      },
      tenure: {
        type: String,
        required: true
      }
    }
  ],
  past_members: [
    {
      candidate: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
      },
      position: {
        type: String,
        required: true
      },
      tenure: {
        type: String,
        required: true
      }
    }
  ],
  date_created: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  },
  date_updated: {
    type: Date,
    default: today.toLocaleDateString('en-US')
  }
})
