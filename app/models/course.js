const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  teacherID: {
    type: String,
    required: true
  },
  tasks: {
    type: [String],
    default: []
  },
  students: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);
