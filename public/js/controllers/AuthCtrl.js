app = angular.module('AuthCtrl', []);
app.controller('RegCtrl', ['$mdDialog', '$scope', 'Auth', 'User',
function($mdDialog, $scope, Auth, User) {
  var vm = this;
  
  User.get_current().then(function(success) {
    vm.user = success;
  });

  vm.userData = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  }

  vm.show = () => {
    $mdDialog.show(
      {
        templateUrl: "views/auth/registration.html",
        clickOutsideToClose: true,
        scope: $scope,
        preserveScope: true,
        controller: function($scope) {
       },
    });
  }

  vm.openStudent = function(ev) {
    vm.userData.isTeacher = false;
    vm.show();
  };

  vm.openTeacher = function(ev) {
    vm.userData.isTeacher = true;
    vm.show();
  };

  vm.submit = () => {
    User.get(vm.userData.username).then((success) => {
      if (success.data.length === 0) {
        Auth.register(vm.userData).then((success) => {
          console.log('Registered');
        });
        $mdDialog.cancel();
      }
      else {
        alert('Username in use');
      }
    });
  }

  vm.close = () => {
    $mdDialog.cancel();
  };

}]);

app.controller('LoginCtrl', ['$state', 'Auth', 'User',
function($state, Auth, User) {
  var vm = this;

  vm.userData = {
    username: '',
    password: ''
  }
  
  User.get_current().then(function(success) {
    vm.user = success;
    if (success) {
      console.log(success);
    }
  });

  vm.submit = () => {
    Auth.login(vm.userData).then(function (success) {
      console.log(success);
    }, function(error) {
      alert('Invalid Login');
    });
  }

  vm.cancel = () => {
    $state.go('home');
  };

}]);