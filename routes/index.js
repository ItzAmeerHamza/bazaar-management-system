const express = require("express");

const router = express.Router();
const User = require('../models/user');
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const userController = require('../controllers/user.controller')

router.get('/', userController.root);

router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user,
    layout: "layouts/layout"
  })
);

module.exports = router;
