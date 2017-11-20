const Task = require('../models/task');
const Course = require('../models/course');

module.exports = {
  allGet,
  singleGet,
  singlePost,
  singlePut,
  singleDelete
};

// Get all tasks
function allGet(req, res) {
  if (true) {
    Task.find({}, (error, tasks) => {
      if (error) res.status(500).send(error);
      else res.json(tasks);
    });
  } else {
    res.sendStatus(401);
  }
}

// Get a single task
function singleGet(req, res) {
  if (true) {
    const taskId = req.params.task;
    Task.find({ _id: taskId }, (error, task) => {
      if (error) res.status(500).send(error);
      else if (task.length === 0) res.sendStatus(404);
      else res.json(task);
    });
  } else {
    res.sendStatus(401);
  }
}

// Post a single task
function singlePost(req, res) {
  if (req.user) {
    const newTask = req.body;
    Task.create(newTask,
      (error, task) => {
        if (error) res.status(500).send(error);
        else res.status(201).json(task);
      });
  } else {
    res.sendStatus(401);
  }
}

// Update a single task
function singlePut(req, res) {
  if (req.user) {
    const taskID = req.body._id;
    const task = req.body;
    Task.update(
      { _id: taskID },
      { $set: task },
      (error, response) => {
        if (error) res.status(500).send(error);
        else if (response.n === 0) res.sendStatus(404);
        else res.sendStatus(200);
      });
  } else {
    res.sendStatus(401);
  }
}

// Delete a single task
function singleDelete(req, res) {
  if (req.user) {
    const taskId = req.params.task;
    Task.remove({ _id: taskId }, (error, response) => {
      if (error) res.status(500).send(error);
      else if (response.result.n === 0) res.sendStatus(404);
      else res.sendStatus(200);
    });
  } else {
    res.sendStatus(401);
  }
}