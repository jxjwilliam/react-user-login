const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const SECRET = "userloginjsonwebtoken";
const User = require('../models/loginUser');

router.post('/', (req, res, next) => {

  let {email, password} = req.body;

  if (!(email && password)) {
    return res.json({
      success: false,
      message: 'Error: mandatory field is missing.'
    });
  }

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
        message: 'Error: this email have more than 1, not unique.'
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

module.exports = router;