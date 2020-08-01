// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

app.post("/postData", (req, res) => {
  projectData = {
    temperature: req.body.temperature,
    date: req.body.date,
    userResponse: req.body.userResponse,
  };

  console.log("saved data successfully");
  console.log(projectData);
  res.status(200).send(projectData);
});

app.get("/everything", (req, res) => {
  console.log("request in get");
  res.status(200).send(projectData);
});

// Setup Server
const port = 8080;
const host = "localhost";
const server = http.createServer(app);
server.listen(port, host, () => {
  console.log(` server running on http://${host}:${port}`);
});
