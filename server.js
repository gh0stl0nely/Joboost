// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var session = require("express-session");
const passport = require("./config/passport");
const hbs = require("express-handlebars");
const path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing (Json, string and file)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Configure multer for file upload
var multer = require("multer"); // Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files

const logoStorage = multer.diskStorage({
  destination : "./public/company_logo/",
  filename: function(req,file,next){
    next(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const resumeStorage = multer.diskStorage({
  destination : "./public/resumes/",
  filename: function(req,file,next){
    next(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

// For storing company logo
const uploadLogo = multer({
  storage: logoStorage
});

// For storing resume
const uploadResume = multer({
  storage: resumeStorage
});



const uploadOption = {
  uploadLogo,
  uploadResume
};

// Set up view engine
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));

// Use Express session for persistent login and passport
app.use(session({
  secret: "asdsadsad21313@",
  resave: false,
  saveUninitialized: false // Will only create a cookie upon authentication or logged in
}));

// Initialize passport and integrates Express session with Express-session
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app,uploadOption);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
