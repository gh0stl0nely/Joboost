// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");

function checkAuthentication(req,res,next){
  if(req.user){
      next();
  } else {
    console.log("Not authenticated");
    return res.redirect('/login'); // Supposed to redirect to home page :)
  }
}

// Routes
// =============================================================
module.exports = function(app){

    // To Home Page, IF authenticated, go to dashboard page. If not go to homepage
    app.get("/", checkAuthentication, (req,res) => {
        console.log(req.user); // This is the ID!! 
        //Prepare data and go into dashboard page... 
    });

    // To industry_data html page
    app.get("/data", (req,res) => {
        res.sendFile(path.resolve(__dirname + "/../public/html/industry_data.html"));
    });

    // To login page
    app.get("/login", (req,res) => {
        res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
    });

    // To signup page
    app.get("/signup", (req,res) => {
        res.sendFile(path.resolve(__dirname + "/../public/html/signup.html"));
    });
  
  
// When all is lost, 404 
 //   app.get("*", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/index.html"));
//   });
  
    // Viewing ALL resumes for a job leads to viewallresumes.html
  //   app.get("/viewall", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/viewallresumes.html"));
//   });
    // Creating a job post route leads to createpost.html
  //   app.get("/createpost", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/createpost.html"));
//   });
  
  // Dashboard route loads dashboard.html
//   app.get("/dashboard", function(req, res) {
//     
//   });

  // Viewing a job post route loads jobposting.html
//   app.get("/jobposting", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/jobposting.html"));
//   });

}
