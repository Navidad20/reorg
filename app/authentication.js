const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const User = require('./models/user');
const bCrypt = require('bcrypt-nodejs');
const MemoryStore = session.MemoryStore;

module.exports = (app, passport, mongoose) => {

  app.use(session({
    secret: 'reorg-pkey',
    name: 'authentication',
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    const data = { username : user.username, isTeacher: user.isTeacher }
    done(null, data);
  })

  passport.deserializeUser((id, done) => {
    done(null, id );
  });

  passport.use('login', new LocalStrategy({ passReqToCallback: true }, login));
  passport.use('signup', new LocalStrategy({ passReqToCallback: true }, signup));
};

function isValidPassword(user, password) {
  return bCrypt.compareSync(password, user.password);
}

function login(req, username, password, done) {
  User.findOne({ username: username }, (error, user) => {
    if (error) return done(error);
    // If user doesn't exist
    if (!user) {
      console.log('User not found: ' + username);
      return done(null, false, req.flash('message', 'User Not Found.'));
    }
    // User exists but wrong password, log the error 
    if (!isValidPassword(user, password)) {
      console.log('Invalid Password');
      return done(null, false, req.flash('message', 'Invalid Password'));
    }
    // User and password both match, return user from 
    // done method which will be treated like success
    return done(null, user);
  });
}

function createHash(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function signup(req, username, password, done) {
  findOrCreateUser = () => {
    User.findOne({ 'username': username }, (error, user) => {
      if (error) return done(error);
      if (user) {
        console.log('Username in use: ' + username);
        return done(null, false, req.flash('message', 'User Already Exists'));
      } else {
        const newUser = req.body;
        newUser.username = username;
        newUser.password = createHash(password);

        User.create(newUser, (error, response) => {
          if (error) return done(error);
          else {
            console.log('User Registration Successful');
            return done(null, newUser)
          }
        });
      }
    });
  }
  process.nextTick(findOrCreateUser);
}