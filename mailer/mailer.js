const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: 'config.env'})

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user:  process.env.AUTH_USER,
    pass: process.env.AUTH_PASS
  }
});

  module.exports = transporter;