const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', UserSchema);