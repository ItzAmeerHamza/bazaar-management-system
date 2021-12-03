const passport = require("passport");
// user model
const User = require('../models/user');

//Handles the get request
exports.register = (req, res) =>
  res.render("register", {locale: {"name": '', "email": ''},
    layout: "layouts/layout"
  });

  // handles the post request
exports.registerUser = (req, res) => {
    const { name, email, password, birthdate = Date.now, user_type = 'vendor' } = req.body;
    let errors = [];
    User.findOne({ email: email }).then(user => {
        if (user) {
            console.log("Email already exists");
            res.render("register", {
            errors,
            name,
            email,
            password,
            birthdate,
            user_type
          });

        } else {
          console.log("Creating a new vendor");
          const newUser = new User({
            name,
            email,
            password,
            birthdate,
            user_type
          });
          console.log(newUser);
          newUser.save();
          console.log("Successfully saved vendor in Database")
          res.render('dashboard.ejs', {newUser});
        }
    });
};

// for get handle
exports.login = (req, res) =>
  res.render("login", {
    layout: "layouts/layout"
  });

  // for post request
exports.loginUser = (req, res, next) => {
  console.log(req.body);
  res.redirect("dashboard");
};

// Logout
exports.logout = (req, res) => {
  req.logout();
  console.log("You are logged out");
  res.redirect("/users/login");
};

