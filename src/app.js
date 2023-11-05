const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const pathView = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and Views location
app.set("views", pathView);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

//Setup Static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        Email: "kuva0772756745@gmail.com",
        phone: "076-68684613",
        Address: "No221, Puttalam Road, Nochchiyagama",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            Error: "Please Enter your Address",
        });
    }

    geocode(req.query.address, (error, { latitude,longitude ,location } ={}) => {
        if (error) {
            return res.send({ error }); //error:error Shorthand Javascript code used here
        }

        forecast(latitude,longitude , (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address,
            });
        });
    });
   
});


app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Search term not found",
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage:
            "The page you're looking for can't be found.Article not Found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        errorMessage: "The page you're looking for can't be found.",
    });
});

app.listen(port, () => {
    console.log("Server is up on the port"+port);
});
