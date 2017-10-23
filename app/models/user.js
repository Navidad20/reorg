const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isTeacher: {
    type: Boolean,
    required: true
  },
  courses: {
    type: [String],
    default: []
  },
  taskList: {
    type: [{
      taskID: String,
      complete: Boolean
    }],
    default: []
  },
  totalReward: {
    type: Number,
    min: 0,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
