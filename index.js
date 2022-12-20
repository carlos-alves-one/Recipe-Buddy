// Goldsmiths University of London
// Author....: Carlos Manuel de Oliveira Alves
// Student...: cdeol003
// Created...: 18/12/2022

// Import the modules we need for this project
const expressSanitizer = require('express-sanitizer');
var validator = require('express-validator');
var session = require('express-session');
var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
const mysql = require('mysql');

// Create the express application object
const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

// Create an input sanitizer
app.use(expressSanitizer());

// Set up css
app.use(express.static(__dirname + '/public'));

// Create an express session
app.use(
  session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

// Define the database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'appuser',
  password: 'app2027',
  database: 'myRecipesBuddy',
});

// Connect to the database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log(">>> Connected to the Recipe's Buddy Database");
});
global.db = db;

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory
app.set('views', __dirname + '/views');

// Tell Express that we want to use EJS as the templating engine
app.set('view engine', 'ejs');

// Tells Express how we should process html files
// We want to use EJS's rendering engine
app.engine('html', ejs.renderFile);

// Define our data
var shopData = { shopName: "Recipe Buddy" };
var loggedinuser = '';
var emailaddress_ = '';
var firstname_ = '';
var lastname_ = '';
var password_ = '';
var passwordHash = '';
var deletedUser = '';
// var temp = '';

// Requires the main.js file inside the routes folder passing in the Express app and data as arguments.  
// All the routes will go in this file
require('./routes/main')(app, shopData);

// Start the web app listening
app.listen(port, () =>
  console.log(`Recipe's Buddy App <-> Listening on port ${port}!`)
);
