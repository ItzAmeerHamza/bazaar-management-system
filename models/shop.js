const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    unique: true, // constraint for uniqueness of email
    required: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  shop_phone: {
    type: String,
    required: false
  },
  active:{
    type: Boolean,
    default: false
    },
    owner:{
      type: mongoose.Types.ObjectId,
      ref: "User"
    },
    products:[{
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }]
});

const Shop = mongoose.model('Shop', ShopSchema);

module.exports = Shop;
