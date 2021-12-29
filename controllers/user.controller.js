//Email Transpoter
const transporter = require('../mailer/mailer.js');

const passport = require("passport");
// user model
const User = require('../models/user');
const bcrypt = require("bcrypt");

// user model
const Otp = require('../models/otp');
// const otp = require('../models/opt.js');./

//Handles the get request
exports.register = (req, res) =>
  res.render("register", {locale: {"name": '', "email": ''},
    layout: "layouts/layout"
  });

  // handles the post request
exports.registerUser = (req, res) => {
    const { name, email, password, country, gender, user_image, description, user_type = 'vendor' } = req.body;
    if(req.file){
      user_image = req.file.path;
    }
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
              user_type,
            });
            console.log(newUser);
            newUser.save().then(function(newUser) {
              req.flash('success_msg', 'Your Account Has Been Registered, you can log in now');
              res.locals.messages = req.flash();
              console.log("Successfully saved vendor in Database")
              res.redirect("/users/login");
              // res.render('login.ejs');
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
           })
           .catch(error => {
            console.log("Error Adding new User", error);
            req.flash('error_msg', 'This email already exist in our record, please go to log in page');
            res.locals.messages = req.flash();
            console.log(errors);
            res.render("register", {
            errors,
            name,
            email,
            password,
            user_type
          });
          })
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
  let errors = [];
  const {email, password} = req.body;
  User.findOne({email})
  .then(user => {
    console.log(user);
    if (!user) {
      console.log('Incorrect Email');
      errors.push({msg: "Check your email again or go to Sign up"});
      req.flash('error_msg', 'Incorrect Email');
      res.locals.messages = req.flash();
      res.render("login", {
        errors,
        email
      });
      // return done(null, false, { message: "Incorrect username" });
    }
      
    if (!bcrypt.compareSync(password, user.password)) {
      console.log('Incorrect Password');
      errors.push({msg: "Please Enter Correct Password"});
      req.flash('error_msg', 'Incorrect password');
      res.locals.messages = req.flash();
      res.render("login", {
        errors,
        email
      });
      // return done(null, false, { message: "Incorrect password" });
    }

    // done(null, user);
    res.redirect(`/users/${user.id}/dashboard`);
  })
  
  .catch(err => {
    console.log("Error In Log in process", err);
            req.flash('error_msg', 'This email already exist in our record, please go to log in page');
            res.locals.messages = req.flash();
            console.log(errors);
            res.render("login", {
            errors,
            email,
          });
  })
;
};

// Logout
exports.logout = (req, res) => {
  req.logout();
  console.log("You are logged out");
  res.redirect("/users/login");
};

exports.emailSend = (req, res) =>{
  const responseType = {};
  User.findOne({ email: req.body.email }).then(user => {
    if(user){
      let optcode = Math.floor((Math.random()*10000)+1);
      let otpData = new Otp({
        email:req.body.email,
        code:optcode,
        expireTime: new Date().getTime() + 300*1000
      })
      let otpResponse =  otpData.save();
      responseType.statusText = 'Success'
      responseType.message = 'Please Check Your Email ID';
    }else{
      responseType.statusText = 'error'
      responseType.message = 'Email ID Not Exist';
    }
    res.status(200).json(responseType);
  });
}

exports.changePassword = (req, res) =>{
  // let data = Otp.find({email:req.body.email, code: req.body.otpCode});
  const  response = {}

  Otp.findOne({ email: req.body.email, code: req.body.otpCode}).then(fetch_otp => {
  if(fetch_otp){
    let currentTime = new Date().getTime();
    let diff = fetch_otp.expireTime - currentTime;
    if(diff < 0){
      response.message = 'Token Expire'
      response.statusText = 'error'
      res.status(200).json(response);

    }else{
      User.findOne({ email:req.body.email }).then(user => {
      if (user) {
      console.log(user);
      user.password = req.body.password;
      console.log(user.password);
      user.save();
      response.message = 'Password Changed Successfully'
      response.statusText = 'Success';
      res.status(200).json(response);

      }
    });
    }
  }else{
    response.message = 'Invalid Otp'
    response.statusText = 'error'
    res.status(200).json(response);

  }
  });
}

// module.exports = {
//   emailSend,
//   changePassword
// }

exports.dashboard = (req, res) => {
  console.log('Sending to teh dash board');
  res.render("dashboard", {
  layout: "layouts/layout"
  });
}

