// Goldsmiths University of London
// Author....: Carlos Manuel de Oliveira Alves
// Student...: cdeol003
// Created...: 18/12/2022

// declare variable for bcrypt
const bcrypt = require('bcrypt');

// declare variable for request
const request = require('request');

// --->>> Handle our routes .............................................................................................................................

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

  // --->>> REGISTER NEW USER ........................................................................................................................

  // use the Express Router to handle our routes
  app.get('/register', function (req, res) {
    // declare array initialvalues to store data
    let initialvalues = {
      username: '',
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
    };

    // pass the data to the EJS page and view it
    return renderRegisteruser(res, initialvalues, '');
  });

  // --->>> Helper function .........................................................................................................................

  // function to render the register user page
  function renderRegisteruser(res, initialvalues, errormessage) {
    // store the data in the shopData object
    let data = Object.assign({}, shopData, initialvalues, {
      errormessage: errormessage,
    });

    // render the register page
    res.render('register.ejs', data);

    // return the data
    return;
  }

  // use the Express Router to handle our routes
  app.post(
    '/registered',

    // check is a valid email
    [
      check('email')
        // use sanitize ensures the email address is in a safe and standard format
        .normalizeEmail(),
    ],

    // check if the password is not empty
    [check('password').not().notEmpty().withMessage('Password is required')],

    // check if the username is not empty and at least 5 characters
    [
      check('username')
        .notEmpty()
        // use sanitize to trim the username
        .trim()
        // use sanitize to escape the username
        .escape()
        .withMessage('Username is required')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long'),
    ],

    // check the password must be 8+ chars long and contain a number
    [
      check(
        'password',
        'The password must be 8+ chars long and contain a number'
      )
        // use sanitize to trim the password
        .trim()
        // use sanitize to escape the password
        .escape()
        .not()
        .isIn(['123', 'password', 'abc123'])
        .withMessage('Do not use a common word as the password. ')
        .isLength({ min: 8 })
        .matches(/\d/)
        .withMessage('Must contain a number. '),
    ],

    // call function request and response
    function (req, res) {
      // store the errors in a dictionary
      const errors = validationResult(req);

      // check we have errors in the dictionary
      if (!errors.isEmpty()) {
        // redirect to register page
        res.redirect('./register');

        // print errors dictionary for debug purposes
        console.log(errors);

        // check we have an invalid email
        if (errors.errors[0].param == 'email') {
          console.log(
            '>>> ERROR: Email is invalid. Please enter again the data'
          );
        }

        // check we have an invalid password length
        if (
          errors.errors[0].param == 'password' ||
          errors.errors[1].param == 'password'
        ) {
          console.log(
            '>>> ERROR: The password must be 8+ chars long and contain a number. Please enter again'
          );
        }

        // check username is different from password
        if (req.body.username == req.body.password) {
          console.log(
            '>>> ERROR: The password and username cannot be the same. Please enter again'
          );
        }

        // we have a valid input
      } else {
        // declare variables to use with the function hash of bcrypt
        const saltRounds = 10;
        const plainPassword = req.body.password;

        // hash the password
        bcrypt.hash(plainPassword, saltRounds, function (err, hashedPassword) {
          // sanitize the input
          let username = req.sanitize(req.body.username);
          let firstname = req.sanitize(req.body.firstname);
          let lastname = req.sanitize(req.body.lastname);
          let email = req.sanitize(req.body.email);

          // declare array initialvalues to store data
          var params = [
            req.body.username,
            req.body.firstname,
            req.body.lastname,
            req.body.email,
            hashedPassword,
          ];

          // query database to create a new record
          sqlquery =
            'INSERT INTO users (username, firstname, lastname, email, hashedPassword) VALUES (?,?,?,?,?)';

          // execute sql query
          db.query(sqlquery, params, (err, result) => {
            // if error
            if (err) {
              // return error
              return console.error(err.message);

              // if not error
            } else {
              // print welcome message on the console
              console.log(
                '# Hello ' +
                  req.body.firstname +
                  ' ' +
                  req.body.lastname +
                  ' you are now registered!'
              );

              // more print messages
              console.log(
                '# You will receive an email at..: ' + req.body.email
              );
              console.log(
                '# Your username is..............: ' + req.body.username
              );
              console.log(
                '# Your password is..............: ' + req.body.password
              );
              console.log(
                '# Hashed password is............: ' + hashedPassword
              );

              // store the username in a variable to be used with the EJS pages
              loggedinuser = req.body.username;

              // render the new user page
              res.render('newUser.ejs', shopData);
            }
          });
        });
      }
    }
  );

  // --->>> LOGIN ...................................................................................................................................

  // use the Express Router to handle our routes
  app.get('/login', function (req, res) {
    // render the login page
    res.render('login.ejs', shopData);
  });

  // --->>> LOGGED IN ...............................................................................................................................

  // use the Express Router to handle our routes
  app.post('/loggedin', function (req, res) {
    // declare array params to store data
    let params = [
      req.sanitize(req.body.username),
      req.sanitize(req.body.password),
    ];

    // query database to get all the books
    sqlquery = 'SELECT username FROM users WHERE username = ? ';

    // execute sql query
    db.query(sqlquery, params, (err, result) => {
      // if error
      if (err) {
        // return console.error(err.message);
        res.render('login.ejs', shopData);
      }

      // if not error
      if ((username = result[0])) {
        // print message
        console.log('Your username is correct');

        // declare variable to store password
        let password = req.body.password;

        // query database to get all the books
        sqlquery = 'SELECT hashedPassword FROM users WHERE username = ?';

        // execute sql query
        db.query(sqlquery, [req.sanitize(req.body.username)], (err, result) => {
          // declare variable to store hashed password
          let hashedPassword = result[0].hashedPassword;

          // use function compare of bcrypt to compare the password with the hashed password
          bcrypt.compare(password, hashedPassword, function (err, result) {
            // if error
            if (err) {
              // throw error
              return console.error(err.message);

              // if not error
            } else if (result == true) {
              // print message
              console.log('>>> Your password is correct');

              // store the username in a variable to be used with the EJS pages
              loggedinuser = req.sanitize(req.body.username);

              // Save user session here, when login is successful
              req.session.userId = req.sanitize(req.body.username);

              // render the logged in page
              res.render('loggedin.ejs', shopData);

              // if error
            } else {
              // print message
              console.log('>>> Your password is incorrect');

              // store the username in a variable to be used with the EJS pages
              loggedinuser = req.sanitize(req.body.username);

              // render the wrong key page
              res.render('wrongKey.ejs', shopData);
            }
          });
        });

        // if error
      } else {
        // print message
        console.log('>>> This username does not exist.');

        // store the username in a variable to be used with the EJS pages
        loggedinuser = req.sanitize(req.body.username);

        // render the logged out page
        res.render('loggedout.ejs', shopData);
      }
    });
  });

  // --->>> LOGOUT ...............................................................................................................................

  // use the Express Router to handle our routes
  app.get('/logout', redirectLogin, (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.redirect('./');
      }
      res.send('You are now logged out. <a href=' + './' + '>Main Menu</a>');
    });
  });

  // --->>> FOOD LIST ...............................................................................................................................

  // use the Express Router to handle our routes
  app.get('/foodList', function (req, res) {
    // declare variable to store sql query
    let sqlquery = 'SELECT * FROM ingredients';

    // execute sql query
    db.query(sqlquery, (err, result) => {
      // if error
      if (err) {
        // return to main menu
        res.redirect('./');
      }

      // if not error
      // store data in variable and print on the console
      let newData = Object.assign({}, shopData, {
        availableIngredients: result,
      });
      console.log(newData);

      // render the food list page
      res.render('foodList.ejs', newData);
    });
  });

  // --->>> ADD FOOD ................................................................................................................................

  // use the Express Router to handle our routes
  app.get('/addFood', redirectLogin, function (req, res) {
    // render the add food page
    res.render('addFood.ejs', shopData);
  });
  app.post(
    '/foodadded',
    [
      // validate the name
      check('ingred_name')
        // use sanitize to name
        .trim()
        // use sanitize to escape the name
        .escape()
        // use sanitize to remove any special characters
        .isAlpha()
        // use sanitize to remove any special characters
        .withMessage('Please enter a valid name')
        // use sanitize to check the length of the name
        .isLength({ min: 3 })
        // use sanitize to check the length of the name
        .withMessage('Name must be at least 3 characters long'),
    ],
    [
      // validate the value per
      check('value_per')
        // use sanitize to value per
        .trim()
        // use sanitize to escape the value per
        .escape()
        // use sanitize to check the value per
        .isNumeric()
        // use sanitize to check the value per
        .withMessage('Please enter a valid value per'),
    ],
    [
      // validate the calories
      check('carbs')
        // use sanitize to carbs
        .trim()
        // use sanitize to escape the carbs
        .escape()
        // use sanitize to check the carbs
        .isNumeric()
        // use sanitize to check the carbs
        .withMessage('Please enter a valid carbs'),
    ],
    [
      // validate the fats
      check('fats')
        // use sanitize to fats
        .trim()
        // use sanitize to escape the fats
        .escape()
        // use sanitize to check the fats
        .isNumeric()
        // use sanitize to check the fats
        .withMessage('Please enter a valid fats'),
    ],
    [
      // validate the proteins
      check('protein')
        // use sanitize to proteins
        .trim()
        // use sanitize to escape the proteins
        .escape()
        // use sanitize to check the proteins
        .isNumeric()
        // use sanitize to check the proteins
        .withMessage('Please enter a valid proteins'),
    ],
    [
      // validate the salt
      check('salt')
        // use sanitize to salt
        .trim()
        // use sanitize to escape the salt
        .escape()
        // use sanitize to check the salt
        .isNumeric()
        // use sanitize to check the salt
        .withMessage('Please enter a valid salt'),
    ],
    [
      // validate the sugar
      check('sugar')
        // use sanitize to sugar
        .trim()
        // use sanitize to escape the sugar
        .escape()
        // use sanitize to check the sugar
        .isNumeric()
        // use sanitize to check the sugar
        .withMessage('Please enter a valid sugar'),
    ],
    function (req, res) {
      // store the errors in a variable
      const errors = validationResult(req);

      // if there are errors
      if (!errors.isEmpty()) {
        // print message
        console.log('>>> ERROR: Please enter again the data');

        // render the add food page
        res.redirect('./addFood');

        // if there are no errors
      } else {
        // declare variable to store sql query
        let sqlquery =
          'INSERT INTO ingredients (username, ingred_name, value_per, unit, carbs, fats, protein, salt, sugar) VALUES (?,?,?,?,?,?,?,?,?)';

        // store the data in a array
        let newIngred = [
          loggedinuser,
          req.sanitize(req.body.ingred_name),
          req.sanitize(req.body.value_per),
          req.sanitize(req.body.unit),
          req.sanitize(req.body.carbs),
          req.sanitize(req.body.fats),
          req.sanitize(req.body.protein),
          req.sanitize(req.body.salt),
          req.sanitize(req.body.sugar),
        ];

        // execute sql query
        db.query(sqlquery, newIngred, (err, result) => {
          // if error
          if (err) {
            // print message
            console.log(err + ' ' + newIngred);
            console.log('>>> There was an error adding the food');
          }
          // if not error
          else {
            // print message
            console.log('>>> Food added successfully');
          }
        });
        // render the food list page
        res.redirect('./foodList');
      }
    }
  );

  // end of module.exports
};
