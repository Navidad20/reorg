const express = require('express');
const artifact = require('../handlers/teacherHandler');

const TeacherRouter = express.Router();

// Routes for /api/artifacts
// TeacherRouter.route('/')
//   .get(artifact.allGet)
//   .post(artifact.singlePost)
//   .put(artifact.singlePut);

// // Routes for /api/artifacts/:artifact
// TeacherRouter.route('/:artifact')
//   .get(artifact.singleGet)
//   .delete(artifact.singleDelete);

module.exports = TeacherRouter;