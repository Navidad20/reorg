const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  courses: Array,
  totalReward: Number
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
