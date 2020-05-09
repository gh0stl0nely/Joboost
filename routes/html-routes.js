// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const util = require('util');
const fs = require("fs");
const readFilePromise = util.promisify(fs.readFile);
const db = require("../models");

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

  // To login page, if not authenticated, go to login
  app.get("/login", (req, res) => {
    if(req.user){
      return res.redirect('/dashboard');
    } else {
      return res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
    };
  });

  // To signup page, if not authenticated, go to signup, if yes go to dashboard
  app.get("/signup", (req, res) => {

    if(req.user){
      return res.redirect('/dashboard');
    } else {
      return res.sendFile(path.resolve(__dirname + "/../public/html/signup.html"));
    };
  });

  // Logs user out
  app.get('/logout', (req,res) => {
    req.logout();
    req.redirect('/login');
  });

  // Dashboard route loads dashboard.html
  app.get("/dashboard", checkAuthentication, async function (req, res) {
    const userID = req.user;
    // This will automatically display all post 
    // Need Title , published date (created at), resume received 
    // Find all post that relates to userID
    const allPosts = await db.Post.findAll({
      where: {
        employerID: userID
      },
    });

    // console.log(allPosts[0].title); {{#each allPosts}}
    // <p class="title">{{title}}</p>
    // <p>Published date: {{createdAt}}</p>
    // <p>Resume received: {{resumes}}</p>
            // {{/each }}

  
    // Edit: On click, send Post request, take $(this).attr('id'), 
    //  modal appears, fill out all  
//     <li class="collection-item avatar">
//        <a id="{{id}}" class="edit modal-trigger btn purple" href="#modalEdit"><i
//             class="material-icons white-text left">mode_edit</i>Edit</a>
//     </li>

    // View All Resume, should have postID so when click can be sent to backend for querying
//     <li class="collection-item avatar">
//        <a class="btn purple">View all resume</a>
//     </li>

// Delete, on click, get postID, go to backend, delete it and redirect(/dashboard)
  

    res.render('dashboard', {
      // Title, published date, resume received
      // Edit
      // View All
      //allPosts
    });

    // RESET THE server.js because force is not true

    // res.sendFile(path.resolve(__dirname + "/../public/html/dashboard.html"));
  });

  // Creating a job post route
  app.get("/createpost", checkAuthentication , async function (req, res) {
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