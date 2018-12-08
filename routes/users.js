var express = require('express');
var router = express.Router();
const User = require('../models/user')

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, (err, users) => {
    res.json(users);
  })
});

module.exports = router;
