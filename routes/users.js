const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require("passport");// auth

// Load User Controller
const userController = require('../controllers/user.controller')
const { forwardAuthenticated } = require('../config/auth');

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now()+'-'+file.originalname);
    }
  });

  var upload = multer({storage: storage});

router.get('/register', userController.register);
// Register
router.post('/register', upload.single('user_image'), userController.registerUser);

// Login get request
router.get('/login', userController.login);

// Login post request
router.post('/login', userController.loginUser);

// Logout
router.get('/logout', userController.logout);


module.exports = router;
