const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: String,
  description: String,
  teacherID: String,
  tasks: Array,
  students: Array
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', CourseSchema);
