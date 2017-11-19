const express = require('express');
const course = require('../handlers/courseHandler');

const CourseRouter = express.Router();

// Routes for /api/courses
CourseRouter.route('/')
  .get(course.allGet)
  .post(course.singlePost)
  .put(course.singlePut);

  CourseRouter.route('/task')
  .put(course.singlePutTask);

// Routes for /api/courses/:course
CourseRouter.route('/:course')
  .get(course.singleGet)
  .delete(course.singleDelete);

CourseRouter.route('/:course/tasks')
  .get(course.getTasks);

module.exports = CourseRouter;