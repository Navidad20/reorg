app = angular.module('ComponentCtrl', []);
app.controller('TeacherTaskItemCtrl', 
function() {
  var vm = this;

  vm.set = () => {
    console.log(vm.task)
    vm.onSet({item : vm.task});
  }
  vm.edit = () => {
    vm.onEdit(vm.task);
  }
  vm.delete = () => {
    vm.onDelete(vm.task);
  }
});

app.controller('SideBarCtrl', ['$scope', '$mdSidenav', '$mdDialog', 'Course',
  function ($scope, $mdSidenav, $mdDialog, Course) {
  var vm = this;
  vm.newCourse = {};

  vm.defaultCourse = {
    title: '',
    description: '',
  };
  

  vm.addCourse = () => {
    angular.copy(vm.defaultCourse, vm.newCourse)
    vm.newCourse.teacher = vm.user.username;
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
    Course.post(vm.newCourse).then(function (success) {
      vm.closeDialog();
      console.log('Course Added!')
    })
  };

  vm.closeDialog = () => {
    vm.onRefresh();
    $mdDialog.cancel();
  };

  vm.close = function () {
    $mdSidenav('left').close()
  };

  vm.set = (course) => {
    console.log(course);
    vm.onSet({item : course});
  }

}]);
