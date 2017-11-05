app = angular.module('UserCtrl', []); 

app.controller('StudentCtrl', ['$timeout', '$mdSidenav', '$mdDialog', 'Auth', 'User', 'Course', 'Task',
function($timeout, $mdSidenav, $mdDialog, Auth, User, Course, Task) {
  var vm = this;
  vm.user = Auth.getUser();
  vm.currentCourse = null;
  vm.currentTask = null;

  User.get(vm.user.username).then(function(success) {
    vm.userData = success;
  });

  vm.setCourse = function(course) {
    Course.get(course).then(function(success) {
      vm.currentCourse = success;
      vm.currentTask = null;
    });
  }

  vm.setTask = function(task) {
    vm.currentTask = task;
  }

  vm.close = function () {
    $mdSidenav('left').close()
  };
  
  vm.toggleLeft = buildDelayedToggler('left');
  
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
       var context = vm;
       var args = Array.prototype.slice.call(arguments);
       $timeout.cancel(timer);
       timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
       }, wait || 10);
    };
  };

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID).toggle();
    }, 200);
  };
}]);

app.controller('TeacherCtrl', ['$scope', '$timeout', '$mdSidenav', '$mdDialog', 'Auth', 'User', 'Course', 'Task',
function($scope, $timeout, $mdSidenav, $mdDialog, Auth, User, Course, Task) {
  var vm = this;
  vm.user = Auth.getUser();
  vm.currentCourse = null;
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

  vm.getUser = () => {
    User.get(vm.user.username).then(function(success) {
      vm.userData = success;
    });
  };

  vm.getUser();

  vm.setCourse = function(course) {
    Course.get(course).then(function(success) {
      vm.currentCourse = success;
      vm.currentTask = null;
    });
  }

  vm.setTask = function(item) {
    console.log('hit')
    vm.currentTask = item;
  }

  vm.addTask = () => {
    angular.copy(vm.defaultTask, vm.newTask)
    vm.newTask.course = vm.currentCourse._id;
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
    Task.post(vm.newTask).then(function(success) {
      Course.putTask(vm.currentCourse._id, success._id).then(function(success) {
        vm.setCourse(vm.currentCourse._id);
        vm.closeDialog();
        console.log('Task Added!')
      });
    });
  };

  vm.closeDialog = () => {
    vm.getUser();
    $mdDialog.cancel();
  };

  vm.close = function () {
    $mdSidenav('left').close()
  };
  
  vm.toggleLeft = buildDelayedToggler('left');
  
  function debounce(func, wait, context) {
    var timer;
    return function debounced() {
       var context = vm;
       var args = Array.prototype.slice.call(arguments);
       $timeout.cancel(timer);
       timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
       }, wait || 10);
    };
  };

  function buildDelayedToggler(navID) {
    return debounce(function() {
      $mdSidenav(navID).toggle();
    }, 200);
  };
}]);