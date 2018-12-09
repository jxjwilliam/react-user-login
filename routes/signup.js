const express = require('express');
const router = express.Router();
const User = require('../models/loginUser');

// for formData and Content-Type:	multipart/form-data
router.post('/', (req, res, next) => {

  let {email, password} = req.body;
  console.log('--- william signup ---: ', email, password)

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
    else if (users.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exist'
      })
    }

    const user = new User({email});
    user.password = user.generateHash(password);

    user.save(err => {
      if (err) throw err;

      res.json({
        success: true,
        message: 'Account is saved successfully'
      });
    });
  });
});


module.exports = router;
