const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");// auth
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const app = express()
const port = 3000 

const db = require('./config/database').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  app.use(cookieParser('secret'));
  app.use(session({
    cookie: { maxAge: 60000 },
    secret: process.env.MY_SECRET || "secret",
    resave: true,
    saveUninitialized: true
  }));
  app.use(flash()); // use connect-flash for flash messages stored in session

  app.use(express.static(__dirname + '/assets'));
  app.use(express.static(__dirname + '/mailer'));

  // templating engine
  app.set('view engine', 'ejs');
  // urls
  app.use(express.urlencoded({ extended: true }));
// routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

const multer = require("multer");


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});