const mongoose = require('mongoose');

const OtpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  expireTime: {
    type: Number,
    required: true
  }
});

const otp = mongoose.model('otp', OtpSchema, 'otp');

module.exports = otp;
