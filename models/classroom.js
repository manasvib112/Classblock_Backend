const mongoose = require("mongoose");
const today = require("./date.js");
const classroomschema = new mongoose.Schema({
  students: [Object],
  teachers: {
    type: [Object],
  },
  subjectName: {
    type: String,
    required: true,
  },
  datecreated: {
    type: Date,
    default: today.toLocaleDateString("en-US"),
  },
  dateupdated: {
    type: Date,
    default: today.toLocaleDateString("en-US"),
  }
});
const classroom = mongoose.model("classroom", classroomschema);

module.exports = classroom;
