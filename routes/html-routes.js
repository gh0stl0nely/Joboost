const path = require("path");

module.exports = function(app){

    // To Home Page
    app.get("/", (req,res) => {
        
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

}