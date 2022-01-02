const passport = require("passport");
// models
const User = require('../models/user');
const Shop = require('../models/shop');

exports.index = (req, res) => {
  Shop.find({}).then(data => {
    console.log('data : ', data);
    if(data){
      res.render('shops/index', {layout: "layouts/layout",
          shops: data
       });
    }
    else{
      console.log('Error in fetching records');
    }
  })
};
