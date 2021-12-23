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
    const { name, email, password, country, gender, description, user_image, user_type = 'vendor' } = req.body;
    let errors = [];
    console.log(name, email, password, country, gender, description, user_image, user_type );
    User.findOne({ email: email, name: name }).then(user => {
        if (user) {
          errors.push({msg: "User already exist please go to sign in page"});
            console.log(errors);
            res.render("register", {
            errors,
            name,
            email,
            password,
            user_type
          });

        } else {
          if(name != '' && email != '' && password != ''){
            
            console.log("Creating a new vendor");
            const newUser = new User({
              name,
              email,
              country,
              gender,
              description,
              user_image,
              password,
              user_type
            });
            console.log(newUser);
            newUser.save().then(function(product) {
              console.log("Successfully saved vendor in Database")
              res.render('dashboard.ejs', {newUser});
           });
          }
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

