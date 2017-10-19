const express = require('express');
const user = require('../handlers/userHandler');

const UserRouter = express.Router();

// Routes for /api/users
UserRouter.route('/')
  .get(user.singleGet)
  .post(user.singlePost);
   //.put(artifact.singlePut);

// // Routes for /api/artifacts/:artifact
// TeacherRouter.route('/:artifact')
//   .get(artifact.singleGet)
//   .delete(artifact.singleDelete);

module.exports = UserRouter;