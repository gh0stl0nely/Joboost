const passport = require("passport");
const Local_Strategy = require("passport-local").Strategy;
const db = require("../models");

passport.use(new Local_Strategy({
    usernameField: "email"
}, authenticateUser));

async function authenticateUser(username, password, done) {

    try {
        const user = await db.Employer.findOne({
            where: {
                email: username,
            }
        });

        if(!user){
            console.log("USER NOT FOUND!");
            return done(null,false, {message: "User not found"});
        }

        if(password != user.password){
            console.log("WRONG PASSWORD!");
            return done(null,false, {message: "Wrong password"});
        };

        // Passing user that was found from database ^ for serialization
        return done(null,user);
    } catch (e) {
       return done(e)
    };
}

// We would only want to serialize user.id ^
passport.serializeUser((user, done) => {
    console.log("Serializing id is " + user.id);
    done(null, user.id);
});

// Deserialize it into req.user = user.id; Basically when the user moves to another page this functionw will run
passport.deserializeUser((id, done) => {
    console.log("Deserializing id is " + id);
    done(null,id);
});

module.exports = passport;