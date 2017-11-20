app = angular.module('UserCtrl', []); 

app.controller('StudentCtrl', ['$scope', '$timeout', '$mdDialog', 'Auth', 'User', 'Course', 'Task',
function($scope, $timeout, $mdDialog, Auth, User, Course, Task) {
  var vm = this;
  vm.user = Auth.getUser();
  vm.currentTask = null;
  vm.newTask = {};
  vm.courseList = [];

  vm.defaultTask = {
    title : '',
    description : '',
    rewardValue : 0
  };

  vm.getData = () => {
    User.get(vm.user.username).then(function(userData) {
      vm.userData = userData;
      vm.tasks = {}
      User.getCourses(vm.user.username).then(function(courses) {
        vm.courses = courses;
        Object.keys(vm.courses).forEach((key, index) => {
          Course.getTasks(key).then(function(tasks) {
            vm.tasks = Object.assign(vm.tasks, tasks);
          });
        });
      });
      User.getTasks(vm.user.username).then(function(tasks) {
        vm.tasks = Object.assign(vm.tasks, tasks);
      })
    });
  };

  vm.getData();

  vm.getCourses = () => {
    Course.getAll().then(function(courses) {
      vm.courseList = courses.filter(function(course) {
        return vm.userData.courses.indexOf(course._id) == -1;
      })
    });
  }

  vm.setTask = function(task) {
    vm.currentTask = vm.tasks[task];
  }
  vm.resetTask = function() {
    vm.currentTask = null;
  }

  vm.addTask = (edit=false) => {
    vm.newTask = {};
    if (edit) {
      angular.copy(vm.currentTask, vm.newTask)
    } else {
      angular.copy(vm.defaultTask, vm.newTask)
      vm.newTask.course = '';
    }
    
    $mdDialog.show(
      {
        templateUrl: "views/forms/task.html",
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        controller: function($scope) {
       },
    });
  }

  vm.submitTask = () => {
    if ('_id' in vm.newTask) {
      Task.put(vm.newTask).then(function(success) {
        vm.tasks[vm.newTask._id] = vm.newTask;
        vm.currentTask = vm.newTask;
        console.log('Updated!');
      });
    } else {
      Task.post(vm.newTask).then(function(task) {
        vm.tasks[task._id] = task;
        vm.userData.myTasks.push(task._id);
        if (vm.userData.tasks) {
          vm.userData.tasks[task._id] = false;
        } else {
          vm.userData.tasks = { [task._id] : false }
        }
        vm.updateUser();      
      });
    };
    vm.closeDialog();
  };  

  vm.addCourse = () => {
    vm.getCourses();
    $mdDialog.show(
      {
        templateUrl: "views/forms/courseList.html",
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        controller: function ($scope) {
        },
      });
  }

  vm.submitCourse = (course) => {
    vm.userData.courses.push(course._id);
    vm.courses[course._id] = course;
    Course.getTasks(course._id).then(function(tasks) {
      vm.tasks = Object.assign(vm.tasks, tasks);
    });
    vm.updateUser();
    vm.closeDialog();
  };

  vm.closeDialog = () => {
    $mdDialog.cancel();
  };



  vm.deleteTask = () => {
    let task = vm.currentTask;
    Task.delete(task._id).then(function(success) {
      console.log('Deleted Task!');
      if (task.course) {
        let index = vm.courses[task.course].tasks.indexOf(task._id)
        delete vm.tasks[task._id];
        if (index > -1) {
          let course = vm.courses[task.course]
          course.tasks.splice(index, 1);
          Course.put(course).then(function(success) {
            console.log('Course updated');
          });
        };
      } else {
        let index = vm.userData.myTasks.indexOf(task._id)
        delete vm.tasks[task._id];
        if (index > -1) {
          vm.userData.myTasks.splice(index, 1);
          vm.updateUser();
        };
      }
    });
    vm.currentTask = null;
  };

  vm.deleteCourse = (course) => {
    let index = vm.userData.courses.indexOf(course)
    delete vm.courses[course];
    if (index > -1) {
      vm.userData.courses.splice(index, 1);
      vm.updateUser();
    };
  };

  vm.checkBox = (task) => {
    if (vm.userData.tasks[task]) {
      vm.userData.totalReward += vm.tasks[task].rewardValue;
    } else {
      vm.userData.totalReward -= vm.tasks[task].rewardValue;
    }
    vm.updateUser();
  }

  vm.updateUser = () => {
    User.put(vm.userData).then(function(success) {
      console.log('Updated User!')
    });
  };
}]);

app.controller('TeacherCtrl', ['$scope', '$mdDialog', 'Auth', 'User', 'Course', 'Task',
function($scope, $mdDialog, Auth, User, Course, Task) {
  var vm = this;
  vm.user = Auth.getUser();
  vm.currentTask = null;
  vm.newCourse = {};
  vm.newTask = {};
  
  vm.defaultCourse = {
    title : '',
    description : '',
  };

  vm.defaultTask = {
    title : '',
    description : '',
    rewardValue : 0
  };

  vm.getData = () => {
    User.get(vm.user.username).then(function(userData) {
      vm.userData = userData;
      vm.tasks = {}
      User.getCourses(vm.user.username).then(function(courses) {
        vm.courses = courses;
        Object.keys(vm.courses).forEach((key, index) => {
          Course.getTasks(key).then(function(tasks) {
            vm.tasks = Object.assign(vm.tasks, tasks);
          });
        });
      });
      User.getTasks(vm.user.username).then(function(tasks) {
        vm.tasks = Object.assign(vm.tasks, tasks);
      })
      
    });
  };

  vm.getData();

  vm.setTask = function(task) {
    vm.currentTask = vm.tasks[task];
  }
  vm.resetTask = function() {
    vm.currentTask = null;
  }

  vm.addTask = (course_id, edit=false, myTasks=false) => {
    vm.newTask = {};
    if (myTasks) {
      angular.copy(vm.defaultTask, vm.newTask)
      vm.newTask.course = '';
    } else if (edit) {
      angular.copy(vm.currentTask, vm.newTask)
    } else {
      angular.copy(vm.defaultTask, vm.newTask)
      vm.newTask.course = course_id;
    }
    
    $mdDialog.show(
      {
        templateUrl: "views/forms/task.html",
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        controller: function($scope) {
       },
    });
  }

  vm.submitTask = () => {
    if ('_id' in vm.newTask) {
      Task.put(vm.newTask).then(function(success) {
        vm.tasks[vm.newTask._id] = vm.newTask;
        vm.currentTask = vm.newTask;
        console.log('Updated!');
      });
    } else if (!vm.newTask.course) {
      Task.post(vm.newTask).then(function(task) {
        vm.tasks[task._id] = task;
        vm.userData.myTasks.push(task._id);
        if (vm.userData.tasks) {
          vm.userData.tasks[task._id] = false;
        } else {
          vm.userData.tasks = { [task._id] : false }
        }
        vm.updateUser();      
      });
    } else {
      Task.post(vm.newTask).then(function(task) {
        vm.tasks[task._id] = task;
        Course.putTask(vm.newTask.course, task._id).then(function(success) {
          vm.courses[vm.newTask.course].tasks.push(task._id);
          console.log('Task Added!')
        });
      });
    };
    vm.closeDialog();
  };  

  vm.addCourse = (course='') => {
    vm.newCourse = {};
    if (!course) {
      angular.copy(vm.defaultCourse, vm.newCourse)
      vm.newCourse.teacher = vm.user.username;
    } else {
      angular.copy(vm.courses[course], vm.newCourse)
    }
    $mdDialog.show(
      {
        templateUrl: "views/forms/course.html",
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        controller: function ($scope) {
        },
      });
  }

  vm.submitCourse = () => {
    if ('_id' in vm.newCourse) {
      Course.put(vm.newCourse).then(function (success) {
        vm.courses[vm.newCourse._id] = vm.newCourse;
      });
    } else {
      Course.post(vm.newCourse).then(function (course) {
        vm.courses[course._id] = course;
        vm.userData.courses.push(course._id);
        console.log('Course Added!')
        vm.updateUser();
      })
    }
    vm.closeDialog();
  };

  vm.closeDialog = () => {
    $mdDialog.cancel();
  };



  vm.deleteTask = () => {
    let task = vm.currentTask;
    Task.delete(task._id).then(function(success) {
      console.log('Deleted Task!');
      if (task.course) {
        let index = vm.courses[task.course].tasks.indexOf(task._id)
        delete vm.tasks[task._id];
        if (index > -1) {
          let course = vm.courses[task.course]
          course.tasks.splice(index, 1);
          Course.put(course).then(function(success) {
            console.log('Course updated');
          });
        };
      } else {
        let index = vm.userData.myTasks.indexOf(task._id)
        delete vm.tasks[task._id];
        if (index > -1) {
          vm.userData.myTasks.splice(index, 1);
          vm.updateUser();
        };
      }
    });
    vm.currentTask = null;
  };

  vm.deleteCourse = (course) => {
    Course.delete(course).then(function(success) {
      console.log('Course deleted!');
      let index = vm.userData.courses.indexOf(course)
      delete vm.courses[course];
      if (index > -1) {
        vm.userData.courses.splice(index, 1);
        vm.updateUser();
      };
    });
  };

  vm.updateUser = () => {
    User.put(vm.userData).then(function(success) {
      console.log('Updated User!')
    });
  };

}]);