const express = require('express');
const router = express.Router();
// Load User Controller
const userController = require('../controllers/user.controller')
const { forwardAuthenticated } = require('../config/auth');

router.get('/register', userController.register);
// Register
router.post('/register', userController.registerUser);

// Login
// Login get request
router.get('/login', userController.login);

// Login post request
router.post('/login', userController.loginUser);

// Logout
router.get('/logout', userController.logout);


module.exports = router;
