const passport = require("passport");
// models
const User = require('../models/user');
const Shop = require('../models/shop');

exports.index = (req, res) => {
  Shop.find({}).then(data => {
    // console.log('data : ', data);
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

exports.createShop = (req, res, next) => {
  console.log('shop', req.body);
  res.redirect("/shops/index");
}

exports.myShops = (req, res) => {
  Shop.find({owner: req.user.id});
  // Shop.find({}).populate('owner', 'name email').exec(function(err, shop) {
  //   console.log('Story title: ', shop.name);
  //   console.log('Story creator', shop.owner.name);
  // });
  console.log('user -> ', req.user.id);
};