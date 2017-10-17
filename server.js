const process = require('process');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

// Configure API to use BodyParser and handle json data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure passport authentication
authentication(app, mongoose);

// Setting headers to Prevent Errors from Cross Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  // Remove caching for most recent authors
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Set api routes
routes(app);

// Starts Server
if (!module.parent) { // check if within a test or not.
  app.listen(port, () => {
    console.log(`api running on port ${port}`);
  });
}