const express = require('express');
const router = express.Router();

const Login = require('../models/loginUser');

router.get("/", (req, res) => {

  const token = req.headers["x-access-token"];

  if(token) {
    Login.findOneAndUpdate({_id: token, isDeleted: false}, {$set: {isDeleted: true}},
      null, (err, sessions) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Error: Server error'
          });
        }
        res.json({
          success: true,
          message: 'verify successfully'
        })
      });
  }
  else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

module.exports = router;