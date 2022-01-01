//Email Transpoter
const transporter = require('../mailer/mailer.js');

const passport = require("passport");
// user model
const Shop = require('../models/shop');
const bcrypt = require("bcrypt");

exports.index = (req, res) => {
    console.log('Shop Index');

  Shop.find({}).then(data => {
    if(data){
      console.log(data);
      res.render('shops/index', {layout: "layouts/layout",
          users: data
       });
    }
    else{
      console.log('Error in fetching records');
    }
  })
};
