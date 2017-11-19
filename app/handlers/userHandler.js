const User = require('../models/user');
const Course = require('../models/course');
const Task = require('../models/task');
const mongoose = require('mongoose');

module.exports = {
  current,
  allGet,
  singleGet,
  getCourses,
  getTasks,
  singlePost,
  singlePut,
  singlePutCourse,
  singleDelete
};

// Get current user
function current(req, res) {
  res.send(req.user);
}

// Get all users
function allGet(req, res) {
  if (true) {
    User.find({}, (error, users) => {
      if (error) res.status(500).send(error);
      else res.json(users);
    });
  } else {
    res.sendStatus(401);
  }
}

// Get a single user
function singleGet(req, res) {
  if (true) {
    const username = req.params.user;
    User.findOne({ username: username }, (error, user) => {
      if (error) res.status(500).send(error);
      else res.json(user);
    });
  } else {
    res.sendStatus(401);
  }
}

function getCourses(req, res) {
  if (true) {
    const username = req.params.user;
    User.findOne({ username: username }, (error, user) => {
      if (error) res.status(500).send(error);
      else {
        if (user) {
          Course.find({ _id : { $in : user.courses }}, (error, courses) => {
            if (error) res.status(500).send(error);
            else {
              let courseMap = {}
              for (let i = 0; i < courses.length; i++)
                courseMap[courses[i]._id] = courses[i]
              res.json(courseMap);
            }
          });
        } else {
          res.status(404).send(error);
        }
      }
    });
  } else {
    res.sendStatus(401);
  }
}

function getTasks(req, res) {
  if (true) {
    const username = req.params.user;
    User.findOne({ username: username }, (error, user) => {
      if (error) res.status(500).send(error);
      else {
        if (user) {
          Task.find({ _id : { $in : user.myTasks } }, (error, tasks) => {
            if (error) res.status(500).send(error);
            else {
              let taskMap = {};
              for (let i = 0; i < tasks.length; i++)
                taskMap[tasks[i]._id] = tasks[i];
              res.json(taskMap);
            }
          });
        } else {
          res.status(404).send(error);
        }
      }
    });
  } else {
    res.sendStatus(401);
  }
}

// Post a single user
function singlePost(req, res) {
  if (true) {
    const newUser = req.body;
    User.create(newUser,
      (error, response) => {
        if (error) res.status(500).send(error);
        else res.status(201).json(response);
      });
  } else {
    res.sendStatus(401);
  }
}

// Update a single user
function singlePut(req, res) {
  if (true) {
    const username = req.body.username;
    const user = req.body;
    User.update(
      { username: username },
      { $set: user },
      (error, response) => {
        if (error) res.status(500).send(error);
        else if (response.n === 0) res.sendStatus(404);
        else res.sendStatus(200);
      });
  } else {
    res.sendStatus(401);
  }
}

// Update a single user
function singlePutCourse(req, res) {
  if (true) {
    const username = req.body.username;
    const course = req.body.course;
    User.update(
      { username: username },
      { $push: { courses: course } },
      (error, response) => {
        if (error) res.status(500).send(error);
        else if (response.n === 0) res.sendStatus(404);
        else res.sendStatus(200);
      });
  } else {
    res.sendStatus(401);
  }
}

// Delete a single user
function singleDelete(req, res) {
  if (true) {
    const username = req.params.user;
    User.remove({ username: username }, (error, response) => {
      if (error) res.status(500).send(error);
      else if (response.result.n === 0) res.sendStatus(404);
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
}

function retrieveCourses(courses) {
  let allCourses = [];
  let prom = Course.findOne({_id: courses[0]});
  for (let i = 0; i < courses.length; i++) {
    prom = prom.then((error, course) => {
      allCourses.push(course);
      return Course.findOne({_id: courses[i+1]});
    });
  }
  return prom.then((error, course) => allCourses.push(course));
}