//Email Transpoter
const transporter = require('../mailer/mailer.js');

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
          console.log('This is user already exist');
          errors.push({msg: "User already exist please go to sign in page"});
          req.flash('error_msg', 'Your Account Already Exists, please log in to with your account');
          res.locals.messages = req.flash();
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
            newUser.save().then(function(newUser) {
              req.flash('success_msg', 'Your Account Has Been Registered, you can log in now');
              res.locals.messages = req.flash();
              console.log("Successfully saved vendor in Database")
              res.render('dashboard.ejs', {newUser});
              //Welcome Email
              const options = {
                from: process.env.AUTH_USER,
                to: email,
                subject: "Welcome to Online",
                text: "Thank you for joining us. Hope you have a bussiness with us!"
              };
    
              transporter.sendMail(options,  function(err, info){
                if(err){
                  console.log(err);
                  return;
                }
                console.log("sent:" + info.response);
              });
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