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
  course: {
    type: String,
    required: false
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
    required: false
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);
