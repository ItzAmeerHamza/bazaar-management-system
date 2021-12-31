const mongoose = require('mongoose');

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
    }
});

const Car = mongoose.model('Car', UserSchema);

module.exports = Car;
