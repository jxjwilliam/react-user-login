const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const index = require("./routes/index");
const signup = require("./routes/signup");
const login = require("./routes/login");
const user = require("./routes/user")
const list = require("./routes/list")

const app = express();
const routers = express.Router();

mongoose.connect("mongodb://localhost:27017/userlogin", {useNewUrlParser: true});
app.set("superSecret", "userloginjsonwebtoken");

// app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(logger("dev"));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());

// ./client/build
app.use(express.static(path.join(__dirname, "client", "build")));


app.use("/", index);

app.use("/api/signup", signup);

app.use('/api/login', login);

app.use('/api/list', list)

/////////////////////////////

app.use((req, res, next) => {

  //express deprecated req.param(name): Use req.params, req.body, or req.query instead
  // check header or url parameters or post parameters for token
  const token = req.body.token || req.params["token"] || req.headers["x-access-token"];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get("superSecret"), (err, decoded) => {
      if (err) {
        return res.json({success: false, message: "Failed to authenticate token."});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

app.use("/api/users", user);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found.");
  err.status = 404;
  next(err);
});


// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    "error": "error handler"
  });
});

module.exports = app;
