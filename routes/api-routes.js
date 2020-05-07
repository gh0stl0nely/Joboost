const passport = require("../config/passport.js");
const db = require("../models");
const path = require("path");
const util = require('util');
const fs = require("fs");
const readFilePromise = util.promisify(fs.readFile);

module.exports = function(app){
    
    // When Employer press "Login" 
    app.post("/api/login", passport.authenticate("local"), (req,res)=> {
        //If successful then redirect them back to t
        //req.user will exist here. 
        // console.log("FOUND EM! ID is " + req.user);
        // After this will direct them to to dashboard page
        res.json({
            "message": "Successfully login!"
        });
    });

    // When Employer press "Signup"
    app.post("/api/register", async (req,res) => {
        const username = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const response = await db.Employer.create({
            email: email,
            password: password,
            company: username
        });

        res.end();

    });

    app.post("/api/data", async (req,res) => {
        const selectedIndustry = req.body.selectedOption
        const job_growth_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
        const job_growth_data= JSON.parse(job_growth_raw);
        const job_predictions_raw = await readFilePromise(path.resolve(__dirname, "../data/job_predictions.json"));
        const job_predictions_data= JSON.parse(job_predictions_raw);

        // Find the object with Industry == req.body.selectedOption
        for(let i = 0; i < job_growth_data.length; i++){
            if(job_growth_data[i].Industry == selectedIndustry){
                return res.json({
                    job_growth_data: job_growth_data[i],
                    job_prediction_data : job_predictions_data[i]
                });
            };
        };
    });


}