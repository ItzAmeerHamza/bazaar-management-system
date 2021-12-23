const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true, // constraint for uniqueness of email
    required: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user_image: {
    type: String,
    required: false
  },
  user_type: {
    type: String,
    enum : ['admin','vendor'],
    default: 'admin'
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
