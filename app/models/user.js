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
    type: [],
    default: []
  },
  tasks: {
    type: {},
    default: {}
  },
  myTasks: {
    type: [],
    default: []
  },
  totalReward: {
    type: Number,
    min: 0,
    default: 0
  },
  game: {
    store: {
      three: {
        type: Boolean,
        default: true
      },
      four: {
        type: Boolean,
        default: false
      },
      five: {
        type: Boolean,
        default: false
      },
      gt: {
        type: Boolean,
        default: true
      },
      edu: {
        type: Boolean,
        default: false
      },
      joyner: {
        type: Boolean,
        default: false
      }
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
