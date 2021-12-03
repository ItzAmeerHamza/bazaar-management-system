const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// The first page
router.get("/", function(req, res){
  res.render("home", { layout: "layouts/layout" })
});

module.exports = router;
