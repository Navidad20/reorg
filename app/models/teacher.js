const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  courses: Array
}, {
  timestamps: true
});

module.exports = mongoose.model('Teacher', TeacherSchema);
