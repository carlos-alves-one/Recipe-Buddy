
// Goldsmiths University of London
// Author....: Carlos Manuel de Oliveira Alves
// Student...: cdeol003
// Created...: 18/12/2022

// declare variable for bcrypt
const bcrypt = require('bcrypt');

// declare variable for request
const request = require('request');

// --->>> Handle our routes .....................................................................................

// define the routes
module.exports = function (app, shopData) {
    // declare variable to validate email
    const { check, validationResult, Result } = require('express-validator');
  
    // declare variable to redirect login
    const redirectLogin = (req, res, next) => {
      // check the user didn't started a new session
      if (!req.session.userId) {
        // if not true redirect to login
        res.redirect('./login');
      }
      // user already started a new session
      else {
        next();
      }
    };
  
    // use the Express Router to handle our routes
    app.get('/', function (req, res) {
      // render the index page
      res.render('index.ejs', shopData);
    });
  
    // use the Express Router to handle our routes
    app.get('/about', function (req, res) {
      res.render('about.ejs', shopData);
    });