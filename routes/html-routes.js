/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const path = require("path");
const util = require("util");
const fs = require("fs");
const readFilePromise = util.promisify(fs.readFile);
const db = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

function checkAuthentication(req, res, next) {
  if (req.user) {
    next();
  } else {
    console.log("Not authenticated");
    return res.redirect("/home");
  }
}

async function findAndRenderSearchResult(data, rawPostData, keyWord, res) {

  // These 4 lines are to render search option on the left hand side
  const industry_list_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
  const industry_list_data = JSON.parse(industry_list_raw);
  const city_raw = await readFilePromise(path.resolve(__dirname, "../data/city_new.json"));
  const city_data = JSON.parse(city_raw);
  ///

  // To access Employer => rawPostData[i] => This is Post => rawPostData[i].Employer

  for (let j = 0; j < rawPostData.length; j++) {
    const dataTitle = rawPostData[j].title.trim().toLowerCase(); // String to find keyWrod from
    if (dataTitle.includes(keyWord)) {
      data.push(rawPostData[j]);
    }
  }

  let mainPost; // This variable holds the main post that they will see on search result page

  // If data is not empty (positive search), then we shuffle data
  if (data.length > 0) {
    shuffle(data); // Randomize the data first
    mainPost = data[0];
    const logoPath = "../company_logo/" + mainPost.Employer.logo_path;
    res.render("search_result", {
      data: data.slice(1),
      mainPost,
      logoPath,
      mainPostDescripton: mainPost.description.split("|"),
      numberOfResult: data.length,
      isResultFound: true,
      industry_list_data,
      city_data
    });
  } else {
    // If empty then serve no result
    res.render("search_result", {
      data,
      numberOfResult: 0,
      isResultFound: false,
      industry_list_data,
      city_data
    });
  }
}

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

}

// Routes
// =============================================================
module.exports = function (app) {

  // To Home Page, IF authenticated, go to dashboard page. If not go to homepage
  app.get("/", checkAuthentication, (req, res) => {
    res.redirect("/dashboard");
  });

  // Home Page
  app.get("/home", async (req, res) => {
    try {
      const industry_list_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
      const industry_list_data = JSON.parse(industry_list_raw);
      const city_raw = await readFilePromise(path.resolve(__dirname, "../data/city_new.json"));
      const city_data = JSON.parse(city_raw);

      res.render("home_page", {
        industry_list_data,
        city_data,
      });
    } catch (e) {
      throw e;
    }
  });

  // Route for getting search result
  app.get("/result", async (req, res) => {
    const result = req.query;
    // In case user types in "/result" in browser
    if (!result.keyWord) {
      return res.redirect("*");
    }
    // Query result
    const keyWord = result.keyWord.toLowerCase(); // This is the key wo rd that we will try to match with the title

    const company = result.companyName == "null" ? null : result.companyName.trim().toLowerCase();
    const city = result.city == "null" ? null : result.city;
    const industry = result.industry == "All Industries" ? null : result.industry;

    let rawPostData; // This variable holds the raw data for all the posts given city and industry
    let data = []; // This list would contain only post object that CONTAINS "keyWord" in title.Lower(already in lower case)

    // We base our search on Company Name
    const allEmployer = await db.Employer.findAll();
    var correctEmployerID;

    for (let i = 0; i < allEmployer.length; i++) {
      if (company == allEmployer[i].company.trim().toLowerCase()) {
        correctEmployerID = allEmployer[i].id;
        break;
      }
    }

    if (correctEmployerID) {
      // If the user enters in company name,we take that and search Employer table for that employer object
      // Because there is no way to search case insensitive, so we need to find all employer first,
      // Loop through each and lowerCase each to find the match with company...


      // Once found that company, search by employerID, Industry and City
      rawPostData = await db.Post.findAll({
        where: {
          EmployerId: correctEmployerID,
          [Op.or]: [{
            city
          }, {
            industry
          }]
        },

        include: {
          model: db.Employer,
        },
      });

      // console.log(rawPostData[0].Employer);
      // Now we receive a list of all post that this company has given city and industry... Now we need a for loop to
      // Find which title contains the keyword... (Exact match)
      await findAndRenderSearchResult(data, rawPostData, keyWord, res);
    } else {

      // If the user does not enter in company name, we only need to search all Posts by city and industry
      // And then do the for loop to match the keyword.

      rawPostData = await db.Post.findAll({
        where: {
          [Op.or]: [{
            city
          }, {
            industry
          }]
        },

        include: {
          model: db.Employer,
        },
      });

      await findAndRenderSearchResult(data, rawPostData, keyWord, res);
    }

  });

  app.get("/nextPost", async (req, res) => {
    // console.log(req.query);
    const keyWord = req.query.keyWord;

    // Search for the post with the query. Render it as the main post
    const mainPost = await db.Post.findOne({
      where: {
        id: req.query.postID
      },
      include: [db.Employer]
    });

    // Contains data that contain either city and industry. Doesn't include company name in search criteria to give more results
    const rawPostData = await db.Post.findAll({
      where: {
        id: {
          [Op.ne]: Number(req.query.postID),
        },
        [Op.or]: [{
          city: req.query.city
        }, {
          industry: req.query.industry
        }]
      },

      include: {
        model: db.Employer,
      },
    });

    // This variable contains official posts which title contains keyword
    let data = [];

    const logoPath = "../company_logo/" + mainPost.Employer.logo_path; // Logo path of the selected post

    // Prepare scroll down data
    const industry_list_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
    const industry_list_data = JSON.parse(industry_list_raw);
    const city_raw = await readFilePromise(path.resolve(__dirname, "../data/city_new.json"));
    const city_data = JSON.parse(city_raw);

    // Filter out post that contains the keyword

    for (let j = 0; j < rawPostData.length; j++) {
      const dataTitle = rawPostData[j].title.trim().toLowerCase(); // String to find keyWrod from
      if (dataTitle.includes(keyWord)) {
        data.push(rawPostData[j]);
      }
    }

    if (data.length > 0) {
      shuffle(data); // Randomize the data first
      res.render("search_result", {
        data,
        mainPost,
        logoPath,
        mainPostDescripton: mainPost.description.split("|"),
        numberOfResult: data.length + 1,
        isResultFound: true,
        industry_list_data,
        city_data
      });
    } else {
      // No other data exists
      res.render("search_result", {
        data,
        numberOfResult: 1,
        isResultFound: true,
        industry_list_data,
        city_data
      });
    }
  });

  // To industry_data html page
  app.get("/data", async (req, res) => {
    try {
      const job_growth_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
      const job_growth_data = JSON.parse(job_growth_raw);

      res.render("industry_data", {
        job_growth_data,
      });

    } catch (e) {
      throw e;
    }
  });

  // To login page, if not authenticated, go to login
  app.get("/login", (req, res) => {
    if (req.user) {
      return res.redirect("/dashboard");
    } else {
      return res.sendFile(path.resolve(__dirname + "/../public/html/login.html"));
    }
  });

  // To signup page, if not authenticated, go to signup, if yes go to dashboard
  app.get("/signup", (req, res) => {

    if (req.user) {
      return res.redirect("/dashboard");
    } else {
      return res.sendFile(path.resolve(__dirname + "/../public/html/signup.html"));
    }
  });

  // Logs user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/login");
  });

  // Dashboard route loads dashboard.handlebars
  app.get("/dashboard", checkAuthentication, async function (req, res) {

    try {
      const userID = req.user;
      const allPosts = await db.Post.findAll({
        where: {
          employerID: userID
        },
      });

      // Render choices
      const industry_list_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
      const industry_list_data = JSON.parse(industry_list_raw);
      const city_raw = await readFilePromise(path.resolve(__dirname, "../data/city_new.json"));
      const city_data = JSON.parse(city_raw);

      res.render("dashboard", {
        allPosts,
        industry_list_data,
        city_data
      });

    } catch (e) {
      throw e;
    }

  });

  // Creating a job post route
  app.get("/createpost", checkAuthentication, async function (req, res) {
    try {
      const industry_list_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
      const industry_list_data = JSON.parse(industry_list_raw);
      const city_raw = await readFilePromise(path.resolve(__dirname, "../data/city_new.json"));
      const city_data = JSON.parse(city_raw);

      res.render("create_post", {
        industry_list_data,
        city_data,
      });
    } catch (e) {
      throw e;
    }

  });


  // Viewing all applications for certain postID
  app.get("/view_resume", checkAuthentication, async (req, res) => {
    // const postID = req.params.id;
    // console.log(req.query.postID)

    try {
      const applications = await db.Application.findAll({
        where: {
          postID: req.query.postID
        }
      });

      const post = await db.Post.findOne({
        where: {
          id: req.query.postID
        }
      });

      res.render("view_resume", {
        applications,
        postTitle: post.title
      });

    } catch (e) {
      throw e;
    }

  });

  // Get route for viewing your company profile
  app.get("/getProfile", checkAuthentication, async (req, res) => {
    const id = req.user;

    try {
      const data = await db.Employer.findOne({
        where: {
          id
        }
      });

      const logoPath = "../company_logo/" + data.logo_path;

      res.render("profile", {
        data,
        logoPath
      });

    } catch (e) {
      throw e;
    }
  });

  // Get route for downloading resume
  app.get("/download", checkAuthentication, (req, res) => {
    // console.log(req.query.filePath);
    // Change sample_pdf to designated folder that store pdf, and req.query.filePath
    res.download(__dirname + "/../public/resumes/" + req.query.filePath);
  });

  // Custom 404 Catcher
  // DELETE THIS, AND /another/* WORKS, KEEP IT AND /another/* DOES NOT WORK
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "../public/html/404page.html"));
  });

};