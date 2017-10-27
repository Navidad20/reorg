const Course = require('../models/course');
const User = require('../models/user');


module.exports = {
  allGet,
  singleGet,
  singlePost,
  singlePut,
  singleDelete
};

// Get all courses
function allGet(req, res) {
  if (true) {
    Course.find({}, (error, courses) => {
      if (error) res.status(500).send(error);
      else res.json(courses);
    });
  } else {
    res.sendStatus(401);
  }
}

// Get a single course
function singleGet(req, res) {
  if (true) {
    const courseId = req.params.courseId;
    Course.find({ _id: courseId }, (error, course) => {
      if (error) res.status(500).send(error);
      else if (course.length === 0) res.sendStatus(404);
      else res.json(course);
    });
  } else {
    res.sendStatus(401);
  }
}

// Post a single course
function singlePost(req, res) {
  if (true) {
    const newCourse = req.body;
    Course.create(newCourse,
      (error, response) => {
        if (error) res.status(500).send(error);
        else {
          const teacherID = req.body.teacherID;
          User.update(
            { _id : teacherID }, 
            { $push : { courses : response._id } },
            (error, teacherResponse) => {
              if (error) res.status(500).send(error);
              else if (teacherResponse.ln === 0) res.sendStatus(404);
              else res.status(201).json(response);
          });
        };
      });
  } else {
    res.sendStatus(401);
  }
}

// Update a single course
function singlePut(req, res) {
  if (true) {
    const courseId = req.body.courseId;
    const course = req.body;
    Course.update(
      { _id: courseId },
      { $set: course },
      (error, response) => {
        if (error) res.status(500).send(error);
        else if (response.n === 0) res.sendStatus(404);
        else res.sendStatus(200);
      });
  } else {
    res.sendStatus(401);
  }
}

// Delete a single course
function singleDelete(req, res) {
  if (true) {
    const courseId = req.body.courseId;
    Course.remove({ _id: courseId }, (error, response) => {
      if (error) res.status(500).send(error);
      else if (response.result.n === 0) res.sendStatus(404);
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
}