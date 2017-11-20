const Course = require('../models/course');
const User = require('../models/user');
const Task = require('../models/task');


module.exports = {
  allGet,
  singleGet,
  getTasks,
  singlePost,
  singlePut,
  singlePutTask,
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
    const courseID = req.params.course;
    Course.findOne({ _id: courseID }, (error, course) => {
      if (error) res.status(500).send(error);
      else res.json(course);
    });
  } else {
    res.sendStatus(401);
  }
}

function getTasks(req, res) {
  if (true) {
    const courseID = req.params.course;
    Course.findOne({ _id: courseID }, (error, course) => {
      if (error) res.status(500).send(error);
      else {
        Task.find({ _id : { $in : course.tasks } }, (error, tasks) => {
          if (error) res.status(500).send(error);
          else {
            let taskMap = {};
            for (let i = 0; i < tasks.length; i++)
              taskMap[tasks[i]._id] = tasks[i];
            res.json(taskMap);
          }
        });
      }
    });
  } else {
    res.sendStatus(401);
  }
}

// Post a single course
function singlePost(req, res) {
  if (req.user) {
    const newCourse = req.body;
    Course.create(newCourse,
      (error, response) => {
        if (error) res.status(500).send(error);
        else {
          const teacher = req.body.teacher;
          User.update(
            { username : teacher }, 
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

function singlePutTask(req, res) {
  if (req.user) {
    const course = req.body.course;
    const task = req.body.task;
    Course.update(
      { _id: course },
      { $push: { tasks: task } },
      (error, response) => {
        if (error) res.status(500).send(error);
        else if (response.n === 0) res.sendStatus(404);
        else res.sendStatus(200);
      });
  } else {
    res.sendStatus(401);
  }
}

// Update a single course
function singlePut(req, res) {
  if (req.user) {
    const courseId = req.body._id;
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
  if (req.user) {
    const courseID = req.params.course;
    Course.remove({ _id: courseID }, (error, response) => {
      if (error) res.status(500).send(error);
      else if (response.result.n === 0) res.sendStatus(404);
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
}