const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require("passport");// auth

// Load User Controller
const userController = require('../controllers/user.controller');
const shopController = require('../controllers/shop.controller');