const express = require('express');
const parseFormdata = require('parse-formdata');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Login = require('../models/login');
const User = require('../models/user');
const SECRET = "williamjiangjsonwebtoken";

// route middleware that will happen on every request
router.use((req, res, next) => {
  console.log('in route middleware:', req.method, req.url);
  next();
});

router.get('/signup', (req, res, next) => {
  return res.json({
    success: true,
    message: 'user signup'
  })
});

// for content-type: application/json
router.post('/sinup1', (req, res, next) => {
  console.log('application.json: ', req.body);
});

// for formData and Content-Type:	multipart/form-data
router.post('/signup', (req, res, next) => {

  // this is the solution for 'formData'.
  parseFormdata(req, (err, data) => {
    console.log('formData, multipart/form-data: ', data.fields, data.parts);

    let {firstName, lastName, email, password} = data.fields;

    if (!(firstName && lastName && email && password)) {
      return res.json({
        success: false,
        message: 'Error: mandatory field is missing.'
      });
    }

    email = email.toLowerCase();

    Login.find({email: email}, (err, users) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Error: Server error'
        });
      }
      else if (users.length > 0) {
        return res.json({
          success: false,
          message: 'Error: Account already exist'
        })
      }

      const user = new Login({
        firstName, lastName, email
      });
      user.password = user.generateHash(password);

      user.save(err => {
        if (err) throw err;

        res.json({
          success: true,
          message: 'Account is saved successfully'
        });
      });
    });
  })
});

router.post('/signin', (req, res, next) => {

  let {email, password} = req.body;
  if (!(email && password)) {
    return res.json({
      success: false,
      message: 'Error: mandatory field is missing.'
    });
  }

  email = email.toLowerCase();
  Login.find({email: email}, (err, users) => {

    if (err) {
      return res.json({
        success: false,
        message: 'Error: Server error'
      });
    }
    else if (users.length === 0) {
      res.json({
        success: false,
        message: 'Error: this email has no account'
      })
    }
    else if (users.length > 1) {
      res.json({
        success: false,
        message: 'Error: this email have more than 1 accounts'
      })
    }

    const user = users[0];
    if (typeof user !== 'object') {
      res.json({
        success: false,
        message: 'Authentication failed. Login not found.'
      });
    }
    else {
      if (!user.validPassword(password, user.password)) {
        res.json({
          success: false,
          message: 'Authentication failed. Password is not correct.'
        });
      }
      else {
        // Save in UserSession
        const userSession = new UserSession({
          userId: user._id,
          email,
          timestamp: Date.now()
        });

        userSession.save((err, doc) => {
          if (err) {
            return res.json({
              success: false,
              message: 'Error: Server error'
            });
          }
          // res.json({
          //   success: true,
          //   message: 'Valid Sign In',
          //   token: doc._id
          // })
          // if user is found and password is right, create a token
          const payload = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }
          const token = jwt.sign(payload, SECRET, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.json({
            success: true,
            message: 'Enjoy your token!',
            token: token
          });
        })
      }
    }
  });
});

module.exports = router;