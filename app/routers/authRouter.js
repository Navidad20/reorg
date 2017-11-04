const express = require('express');

const Router = express.Router();

module.exports = function(passport) {
 
  /* Handle Login POST */
  Router.post('/login', function (req, res, next) {
    passport.authenticate('login', (error, user, info) => {
      if (error) return res.sendStatus(500);
      if (!user) return res.status(404).send('Invalid username or password.');
      req.logIn(user, function (error) {
          if (error) return res.sendStatus(500);
          console.log(req.user);
          return res.send({user : user});
      });
    })(req, res, next);
  });
 
  /* Handle Registration POST */
  Router.post('/signup', function (req, res, next) {
    passport.authenticate('signup', (error, user, info) => {
      if (error) return res.sendStatus(500);
      if (!user) return res.status(404).send('Username already in use.');
      req.logIn(user, function (error) {
          if (error) return res.sendStatus(500);
          return res.sendStatus(200);
      });
    })(req, res, next);
  });

  /* Handle Logout */
  Router.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.send(200);
  });

  return Router;
}