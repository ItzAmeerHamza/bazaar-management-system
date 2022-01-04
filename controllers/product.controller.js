//Email Transpoter
const transporter = require('../mailer/mailer.js');

const passport = require("passport");
// user model
const User = require('../models/user');
const bcrypt = require("bcrypt");

// user model
const Otp = require('../models/otp');
const Shop = require('../models/shop');
const Product = require('../models/product');

//Handles the get request

