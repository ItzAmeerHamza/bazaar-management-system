const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true, // constraint for uniqueness of email
    required: true
  },
  password: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user_image: {
    type: String,
    required: false
  },
  user_type: {
    type: String,
    enum : ['admin','vendor'],
    default: 'admin'
    },
  active:{
    type: Boolean,
    default: false
    },
    shops:[{
      type: mongoose.Types.ObjectId,
      ref: "Shop"
    }]
});

UserSchema.pre('save',function(next){
  var user=this;
  
  if(user.isModified('password')){
      bcrypt.genSalt(salt,function(err,salt){
          if(err)return next(err);

          bcrypt.hash(user.password,salt,function(err,hash){
              if(err) return next(err);
              user.password=hash;
              next();
          })

      })
  }
  else{
      next();
  }
});

UserSchema.methods.comparepassword=function(password,cb){
  bcrypt.compare(password,this.password,function(err,isMatch){
      if(err) return cb(next);
      cb(null,isMatch);
  });
}

// UserSchema.methods.generateToken=function(cb){
//   var user =this;
//   var token=jwt.sign(user._id.toHexString(),confiq.SECRET);

//   user.token=token;
//   user.save(function(err,user){
//       if(err) return cb(err);
//       cb(null,user);
//   })
// }


// UserSchema.statics.findByToken=function(token,cb){
//   var user=this;

//   jwt.verify(token,confiq.SECRET,function(err,decode){
//       user.findOne({"_id": decode, "token":token},function(err,user){
//           if(err) return cb(err);
//           cb(null,user);
//       })
//   })
// };

// UserSchema.methods.deleteToken=function(token,cb){
//   var user=this;

//   user.update({$unset : {token :1}},function(err,user){
//       if(err) return cb(err);
//       cb(null,user);
//   })
// }


const User = mongoose.model('User', UserSchema);

module.exports = User;
