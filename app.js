const express = require("express");
const app = express();
const hbs = require("express-handlebars");

let port = process.env.PORT || 3000;

// Allow usage of static files
app.use(express.static("public"));

// Setting up handlebars view engine
app.engine("handlebars", hbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.listen(port, () => {
    console.log("Listening on port " + port);
})