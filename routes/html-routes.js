// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Index route 
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  // Dashboard route loads dashboard.html
//   app.get("/dashboard", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/dashboard.html"));
//   });

  // Viewing a job post route loads jobposting.html
//   app.get("/jobposting", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/jobposting.html"));
//   });

  // Creating a job post route leads to createpost.html
  //   app.get("/createpost", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/createpost.html"));
//   });

  // Viewing ALL resumes for a job leads to viewallresumes.html
  //   app.get("/viewall", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/viewallresumes.html"));
//   });

  // Viewing the Jobs graph leads to datapage.html
  //   app.get("/jobsgraph", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/jobsgraph.html"));
//   });

// When all is lost, 404 
 //   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });

};
