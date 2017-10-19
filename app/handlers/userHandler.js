const User = require('../models/user');

module.exports = {
  singleGet,
  singlePost
};

// Get a single user
function singleGet(req, res) {
  if (true) {
    const id = req.params.artifact;
    User.find({ user: req.user.uid, _id: id }, (error, user) => {
      if (error) res.status(500).send(error);
      else if (user.length === 0) res.sendStatus(404);
      else res.json(user);
    });
  } else {
    res.sendStatus(401);
  }
}

// Post a single user
function singlePost(req, res) {
  console.log('Hi')
  if (true) {
    const newUser = req.body;
    //newUser.user = req.user.uid;
    User.create(newUser,
      (error, response) => {
        if (error) res.status(500).send(error);
        else res.status(201).json(response);
      });
  } else {
    res.sendStatus(401);
  }
}
