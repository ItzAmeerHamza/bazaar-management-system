const express = require('express');
const mongoose = require("mongoose");
const passport = require("passport");// auth
const app = express()
const port = 3000 

const db = require('./config/database').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
  
  // templating engine
  app.set('view engine', 'ejs');
  // urls
  app.use(express.urlencoded({ extended: true }));
// routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});