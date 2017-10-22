const express = require('express');
const task = require('../handlers/taskHandler');

const TaskRouter = express.Router();

// Routes for /api/tasks
TaskRouter.route('/')
  .get(task.allGet)
  .post(task.singlePost)
  .put(task.singlePut);

// Routes for /api/tasks/:task
TaskRouter.route('/:task')
  .get(task.singleGet)
  .delete(task.singleDelete);

module.exports = TaskRouter;