// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(`Server is running on localhost: ${port}`);
};

// Add Post Route
app.post('/add', addData)

function addData(req, res) {
    projectData.date = req.body.date;
    projectData.temp = req.body.temp;
    projectData.userFeelings = req.body.userFeelings;
    res.send(projectData);
}

// Add Get Route
app.get('/all', getData);

function getData(req, res) {
    res.send(projectData);
}