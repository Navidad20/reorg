const express = require('express');
const user = require('../handlers/userHandler');

const UserRouter = express.Router();

// Routes for /api/users
UserRouter.route('/')
  .get(user.allGet)
  .post(user.singlePost)
  .put(user.singlePut);

UserRouter.route('/current')
  .get(user.current);

UserRouter.route('/course')
  .put(user.singlePutCourse);

// Routes for /api/users/:user
UserRouter.route('/:user')
  .get(user.singleGet)
  .delete(user.singleDelete);

UserRouter.route('/:user/courses')
  .get(user.getCourses);

UserRouter.route('/:user/mytasks')
  .get(user.getTasks);

module.exports = UserRouter;