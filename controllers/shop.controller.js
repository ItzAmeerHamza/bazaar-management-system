const passport = require("passport");
// models
const User = require('../models/user');
const Shop = require('../models/shop');

exports.index = (req, res) => {
  console.log(req.session);
  Shop.find({}).then(data => {
    if(data){
      res.render('shops/index', {layout: "layouts/layout",
          users: data
       });
    }
    else{
      console.log('Error in fetching records');
    }
  })
};
