// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const util = require('util');
const fs = require("fs");
const readFilePromise = util.promisify(fs.readFile);

function checkAuthentication(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log("Not authenticated");
    return res.redirect('/login'); // Supposed to redirect to home page :)
  }
}

// Routes
// =============================================================
module.exports = function (app) {

  // To Home Page, IF authenticated, go to dashboard page. If not go to homepage
  app.get("/", checkAuthentication, (req, res) => {
    res.redirect('/dashboard');
  });

  // To industry_data html page
  app.get("/data", async (req, res) => {
    try{
      const job_growth_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
      const job_growth_data= JSON.parse(job_growth_raw);

      res.render('industry_data', {
        job_growth_data,
      });
      
    }catch(e){
      throw e;
    }
  });

  // To login page
  app.get("/login", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
  });

  // To signup page
  app.get("/signup", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../public/html/signup.html"));
  });

  // Dashboard route loads dashboard.html
  app.get("/dashboard", checkAuthentication, function (req, res) {
    // Would have to do some database searching and data preparation here!
    // res.render('something', {data})/ 
    res.sendFile(path.resolve(__dirname + "/../public/html/dashboard.html"));
  });

  // Creating a job post route
  app.get("/createpost", async function (req, res) {
    try{
      const industry_list_raw= await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
      const industry_list_data= JSON.parse(industry_list_raw);
      const city_raw = await readFilePromise(path.resolve(__dirname, "../data/city.json"));
      const city_data = JSON.parse(city_raw);
      
      res.render('create_post', {
        industry_list_data,
        city_data,
      });
    }catch(e){
      throw e;
    }

  });


  // When all is lost, 404 
  //   app.get("*", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/index.html"));
  //   });

  // Viewing ALL resumes for a job leads to viewallresumes.html
  //   app.get("/viewall", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/viewallresumes.html"));
  //   });

  // Viewing a job post route loads jobposting.html
  //   app.get("/jobposting", function(req, res) {
  //     res.sendFile(path.join(__dirname, "../public/jobposting.html"));
  //   });

}