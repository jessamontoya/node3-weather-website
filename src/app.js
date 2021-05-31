const path = require("path");
const express = require("express");
const hbs = require("hbs");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const app = express();

// define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Jessa",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Jessa Mae",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is a helpful text",
    title: "Help",
    name: "Jessa Mae",
  });
});

// Update weather endpoint to accept address
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide an adress" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });

        // res.send(location);
        // res.send(forecastData);
      });
    }
  );
}); // weather page

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "you must provide a search term" });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jessa",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jessa",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});

// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// }); // app.com

// app.get("/help", (req, res) => {
//   res.send("help page");
// }); // app.com/help

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h1>");
// }); // app.com/about
