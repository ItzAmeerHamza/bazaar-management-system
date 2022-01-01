const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require("passport");// auth

// Load User Controller
const shopController = require('../controllers/shop.controller')
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


router.get('/index', shopController.index);

module.exports = router;
