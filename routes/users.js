const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require("passport");// auth

// Load User Controller
const userController = require('../controllers/user.controller');
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, Date.now()+'-'+file.originalname);
    }
  });

  var upload = multer({storage: storage});

router.get('/register', forwardAuthenticated, userController.register);
// Register
router.post('/register', upload.single('user_image'), userController.registerUser);

// Login get request
router.get('/login', forwardAuthenticated, userController.login);

// Login post request
router.post('/login', userController.loginUser);

// Logout
router.get('/logout', userController.logout);

router.post('/update', upload.single('user_image'), userController.updateUser);

// Change Password post request
router.post('/change-password', userController.changePassword);

// Send Email request
router.post('/email-send', userController.emailSend);


router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
    layout: "layouts/layout"
  })
);

router.get('/forget_password', userController.forget_password);
// Forget Password

router.get('/reset_password', userController.reset_password);
// Forget Password

router.get('/active_vendors', userController.active_vendors);
// Active Vendors

router.get('/non_active_vendors', userController.non_active_vendors);
// Active Vendors

router.get('/activate_vendor', userController.activate_vendor);
//Activate Vendor
module.exports = router;
