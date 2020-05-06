const express = require("express");
const app = express();
const session = require("express-session");
const hbs = require("express-handlebars");

let port = process.env.PORT || 3000;

// Allow usage of static files
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Setting up session


// Setting up handlebars view engine
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect app to html routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Listening to port
app.listen(port, () => {
    console.log("Listening on port " + port);
})