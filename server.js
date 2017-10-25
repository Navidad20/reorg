const process = require('process');
const passport = require('passport');
const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require("connect-flash");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');
const authentication = require('./app/authentication');
const routes = require('./app/routes');

// Create App
const app = express();

// Set port or check environment
const port = process.env.API_PORT || 3001;

// MongoDB Configuration
mongoose.connect(process.env.MONGO_URL || config.mongodb.localhost, {
  useMongoClient : true
});

// Set static files
app.use(express.static('./public'));

// Configure API to use BodyParser and handle json data
app.use(cookieParser());
app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Setting headers to Prevent Errors from Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Configure passport authentication
authentication(app, passport, mongoose);

// Set api routes
routes(app, passport);

// Starts Server
if (!module.parent) { // check if within a test or not.
  app.listen(port, () => {
    console.log(`api running on port ${port}`);
  });
}