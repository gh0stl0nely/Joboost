const passport = require("passport");
const Local_Strategy = require("passport-local").Strategy;

passport.use(new Local_Strategy({usernameField: "email"}, authenticateUser));

function authenticateUser(username, password, done){

    

     //Find the user here 
    //db.Employer.FindOne

    // if (err) { return done(err); }
    // if (!user) { return done(null, false); }
    // if (!user.verifyPassword(password)) { return done(null, false); }
    // return done(null, user);
}

passport.serializeUser((user, done) => {

});

passport.deserializeUser((user, done) => {

});