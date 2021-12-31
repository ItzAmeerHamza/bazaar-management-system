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

exports.forget_password = (req, res) =>
  res.render("forget_password", {locale: {"name": '', "email": ''},
    layout: "layouts/layout"
  });

//Handles the get request
exports.reset_password = (req, res) =>
  res.render("reset_password", {locale: {"name": '', "email": ''},
    layout: "layouts/layout"
  });

//Handles the get request
exports.register = (req, res) =>
  res.render("register", {locale: {"name": '', "email": ''},
    layout: "layouts/layout"
  });


  // handles the post request
exports.registerUser = (req, res) => {
    const { name, email, password, country, gender, description, user_type = 'vendor' } = req.body;
    let user_image;
    if(req.file){
      console.log(req.file.path);
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



exports.updateStudent = async (req, res) => {
  let result = await Student.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (!result)
    return res.status(400).json({
      err: `Oops something went wrong! Cannont update student with ${req.params.id}.`
    });
  req.flash("student_update_success_msg", "Student updated successfully");
  res.redirect("/student/all");
};


exports.updateUser = async (req, res) => {

  let result = await User.updateOne(
    { _id: req.body.id },
    { $set: req.body }
  );

  if(result){
    req.flash('success', 'User Successfully updated');
  }
  else{
    req.flash('error_msg', 'Error in updating user');
  }
  res.redirect("/dashboard");
};


// for get handle
exports.login = (req, res) =>
  res.render("login", {
    layout: "layouts/layout"
  });


  exports.loginUser = (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true
    })(req, res, next);
  };

// Logout
exports.logout = (req, res) => {
  req.logout();
  req.session.destroy();
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
      //OTP email
      const options = {
        from: process.env.AUTH_USER,
        to: req.body.email,
        subject: "Reset Password Confirmation",
        text: "We Recieved Your Request For Password Reset. Your OTP IS "+ optcode
      };
      transporter.sendMail(options,  function(err, info){
        if(err){
          console.log(err);
          return;
        }
        console.log("sent:" + info.response);
      });
      responseType.statusText = 'Success'
      responseType.message = 'Please Check Your Email ID';
      res.redirect("/users/reset_password");
    }else{

      req.flash('error_msg', 'Email ID Not Exist');
      res.locals.messages = req.flash();
      res.render("forget_password");
    }
  });
}

exports.changePassword = (req, res) =>{
  const  response = {}
  Otp.findOne({ email: req.body.email, code: req.body.otpCode}).then(fetch_otp => {
    if(fetch_otp){
      let currentTime = new Date().getTime();
      let diff = fetch_otp.expireTime - currentTime;
      if(diff < 0){
        req.flash('error_msg', 'OTP Expired');
        res.locals.messages = req.flash();
        res.render("reset_password");
      }else{
        User.findOne({ email:req.body.email }).then(user => {
        if (user) {
          console.log(user);
          user.password = req.body.password;
          console.log(user.password);
          user.save();
          response.message = 'Password Changed Successfully'
          response.statusText = 'Success';
          res.redirect("/users/login");
        }
        });
      }
    }else{
      req.flash('error_msg', 'Invalid OTP');
      res.locals.messages = req.flash();
      res.render("reset_password");
    }
  });
}

exports.dashboard = (req, res) => {
  // console.log('Sending to teh dash board');
  console.log(req.session.user);
  res.render("dashboard", {
  layout: "layouts/layout"
  });
}

