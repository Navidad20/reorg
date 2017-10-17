const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  usernamne: String,
  password: String,
  courses: Array,
  totalReward: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
