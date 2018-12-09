const express = require('express');
const router = express.Router();
const parseFormdata = require('parse-formdata');
const jwt = require('jsonwebtoken');
const SECRET = "userloginjsonwebtoken";
const User = require('../models/loginUser');

router.post('/', (req, res, next) => {

  let {email, password} = req.body;
  console.log('--- william login---: ', email, password)

  if (!(email && password)) {
    return res.json({
      success: false,
      message: 'Error: mandatory field is missing.'
    });
  }
  email = email.toLowerCase();

  User.find({email: email}, (err, users) => {

    if (err) {
      return res.json({
        success: false,
        message: 'Error: Server error'
      });
    }
    else if (users.length === 0) {
      res.json({
        success: false,
        message: 'Error: this email does not register yet.'
      })
    }
    else if (users.length > 1) {
      res.json({
        success: false,
        message: 'Error: this email have more than 1 accounts'
      })
    }

    //users=1
    const user = users[0];
    if (typeof user !== 'object') {
      res.json({
        success: false,
        message: 'Authentication failed. Login User is not found.'
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
        console.log('-- william user --', user)
        // if user is found and password is right, create a token
        const payload = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          location: user.location,
          role: user.role,
          team: user.team,
          comment: user.comment,
          timestamp: user.timestamp
        }
        const token = jwt.sign(payload, SECRET, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});


// for formData and Content-Type:	multipart/form-data
router.post('/:email', (req, res, next) => {
  console.log('using email to edit account.')
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

    User.find({email: email}, (err, users) => {
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

      const user = new User({
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

module.exports = router;