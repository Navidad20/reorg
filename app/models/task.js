const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  courseID: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: false
  },
  rewardValue: {
    type: Number,
    min: 0,
    default: 0
  },
  teacherID: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
