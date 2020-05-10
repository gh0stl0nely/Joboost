const passport = require("../config/passport.js");
const db = require("../models");
const path = require("path");
const util = require('util');
const fs = require("fs");
const readFilePromise = util.promisify(fs.readFile);


module.exports = function (app, upload) {

    // When Employer press "Login"  
    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        //If successful then redirect them back to t
        //req.user will exist here. 
        // console.log("FOUND EM! ID is " + req.user);
        // After this will direct them to to dashboard page
        res.json({
            "message": "Successfully login!"
        });
    });

    // When Employer press "Signup"
    app.post("/api/register", upload.single('logo'), async (req, res) => {
        var logoPath = req.file ? req.file.filename : null;

        const response = await db.Employer.create({
            email: req.body.email,
            password: req.body.password,
            company: req.body.companyName, // Company name
            logo_path: logoPath // Referencing the file path in 'public/uploaded_logo'
        });

        res.redirect('/login');
    });

    // End point for retrieving graph data
    app.post("/api/data", async (req, res) => {
        const selectedIndustry = req.body.selectedOption
        const job_growth_raw = await readFilePromise(path.resolve(__dirname, "../data/job_growth.json"));
        const job_growth_data = JSON.parse(job_growth_raw);
        const job_predictions_raw = await readFilePromise(path.resolve(__dirname, "../data/job_predictions.json"));
        const job_predictions_data = JSON.parse(job_predictions_raw);

        // Find the object with Industry == req.body.selectedOption
        for (let i = 0; i < job_growth_data.length; i++) {
            if (job_growth_data[i].Industry == selectedIndustry) {
                return res.json({
                    job_growth_data: job_growth_data[i],
                    job_prediction_data: job_predictions_data[i]
                });
            };
        };
    });

    // Create New Post
    app.post("/api/newpost" , async function (req, res) {
        const data = req.body;
        
        // Store to database...
        const newPostData = await db.Post.create({
            title: data.title,
            description: data.description.join('|'),
            contactEmail: data.contactEmail,
            contactNumber: data.contactNumber,
            city: data.city,
            province: data.province,
            industry: data.industry,
            employerID: req.user
        });

        res.redirect('/dashboard');
    });

    // View all post
    app.post("/api/editPost", async (req,res) => {
        const id = req.body.postID; // Post ID to be deleted

        const postData = await db.Post.findOne({
            where: {
                id: id
            }
        });

        res.json(postData);
    });

    // Update existing post

    app.post("/api/updatePost", async (req,res) => {
        console.log(req.body);

        try{
            const data = req.body;
            const post = await db.Post.findOne({
                where: {
                    id: data.postID
                }
            })
    
            post.title = data.title;
            post.description = data.description.join("|");
            post.contactEmail = data.contactEmail;
            post.contactNumber = data.contactNumber;
            post.city = data.city;
            post.province = data.province;
            post.industry = data.industry;
            post.resumes = data.resumes;
    
            await post.save();
    
            res.json({
                message: "Saved Successful",
                postID: data.postID,
                newTitle: data.title
            });
        }catch(e){
            throw e
        }
        
    });

    // Delete Post
    app.delete("/api/deletePost", async (req,res) => {
        const id = req.body.postID; // Post ID to be deleted

        const deletedData = await db.Post.findOne({
            where: {
                id: id
            }
        })

        await deletedData.destroy();

        res.end();
    });

}