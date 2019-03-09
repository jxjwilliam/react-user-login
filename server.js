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

var dbUri;

/**
 * As a SaaS, or PaaS, there are several options to host `mongodb`.
 */


// mongodb://williamjxj:Benjamin001@cluster0-shard-00-00-rwvhp.mongodb.net:27017,cluster0-shard-00-01-rwvhp.mongodb.net:27017,cluster0-shard-00-02-rwvhp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true"
var str1 = "mongodb://williamjxj:Benjamin001@";
var atlas = [
  "cluster0-shard-00-00-rwvhp.mongodb.net",
  "cluster0-shard-00-01-rwvhp.mongodb.net",
  "cluster0-shard-00-02-rwvhp.mongodb.net"].join(":27017,")
var str2 = ":27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const MongoHostsList = {
  "local": "mongodb://localhost:27017/userlogin",
  "heroku.mlab": "mongodb://williamjxj:Benjamin001@ds133275.mlab.com:33275/heroku_sg72zngp",
  "mongodb.atlas": str1 + atlas + str2,
  "gcp": "",
}

// 1. use Heroku cloud database
if (process.env.NODE_ENV === 'production') {
  dbUri = MongoHostsList["heroku.mlab"];
}
// 2. use localhost `mongod`
else if (/dev/i.test(process.env.NODE_ENV)) {
  dbUri = MongoHostsList.local;
}
// 3. use docker container
else if (/uat/i.test(process.env.NODE_ENV)) {
  dbUri = MongoHostsList.uat;
}
// 4. use Mongo Atlas cloud replica.
else {
  dbUri = MongoHostsList["mongodb.atlas"];
}


mongoose.connect(dbUri, {useNewUrlParser: true});
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

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("./client/build"));
// }


// decouple static files to Amazon S3 ?
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://tranquil-wildwood-11956.herokuapp.com/"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   )
//   next();
// });

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

var debug = require('debug')('user-login:server');
var http = require('http');
var port = process.env.PORT || 8888;
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = app;
