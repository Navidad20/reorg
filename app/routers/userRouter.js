const express = require('express');
const user = require('../handlers/userHandler');

const UserRouter = express.Router();

// Routes for /api/users
UserRouter.route('/')
  .get(user.allGet)
  .post(user.singlePost)
  .put(user.singlePut);

// Routes for /api/users/:user
UserRouter.route('/:user')
  .get(user.singleGet)
  .delete(user.singleDelete);

module.exports = UserRouter;