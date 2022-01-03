const mongoose = require('mongoose');
const User = require('../models/user');
const Shop = require('../models/shop');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  shop:{
        type: mongoose.Types.ObjectId,
        ref: "Shop"
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
