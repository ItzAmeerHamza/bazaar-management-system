const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");// auth
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser'); // parser middleware
const flash = require('connect-flash');
const session = require('express-session');
const LocalStrategy = require("passport-local").Strategy;

const mongoStore = require('connect-mongo');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
//firebase Firestore.
const multer = require("multer");
const app = express()
const port = 3000

const db = require('./config/database').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  require("./config/passport")(passport);


  app.use(session({
    secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

  // Configure Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

  app.use(cookieParser('secret'));
  app.use(session({
    cookie: { maxAge: 60000 },
    secret: process.env.MY_SECRET || "secret",
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
      mongoUrl: 'mongodb://localhost:27017/TestDb'
  }),
    cookie: { maxAge: 60 * 60 * 1000 }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(flash()); // use connect-flash for flash messages stored in session


  // app.use(express.static(__dirname + '/public'));
  // app.use("/assets", express.static(__dirname + '/assets'));
  // app.use("/assets", express.static(__dirname + '/assets'));
  // app.use("/assets", express.static(__dirname + '/assets'));
  app.use('/static', express.static(__dirname + '/assets'));

  app.use(express.static(__dirname + '/assets'));
  app.use(express.static(__dirname + '/mailer'));

  app.use(express.static(__dirname + '/public'));
  // templating engine
  app.set('view engine', 'ejs');
  // urls
  app.use(express.urlencoded({ extended: true }));
// routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));



app.listen(port || process.env.PORT, () => {
  console.log(`Server running at http://localhost:${port}`, app.settings.env)
});