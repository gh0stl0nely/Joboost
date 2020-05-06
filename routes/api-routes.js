const passport = require("../config/passport.js");
const db = require("../models");

module.exports = function(app){
    
    // When Employer press "Login" 
    app.post("/api/login", passport.authenticate("local"), (req,res)=> {
        //If successful then redirect them back to t
        //req.user will exist here. 
        console.log("FOUND EM! ID is " + req.user);
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


}