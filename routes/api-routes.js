const passport = require("../config/passport.js");

module.exports = function(app){
    
    // When Employer press "Login" 
    app.post("/api/login", passport.authenticate("local"), (req,res)=> {
        //If successful then redirect them back to t
        //req.user will exist here. 
    });

    // When Employer press "Signup"
    app.post("/api/register", (req,res) => {
        // Store this into the Employer thing
    });


}