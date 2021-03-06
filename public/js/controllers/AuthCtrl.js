app = angular.module('AuthCtrl', []);
app.controller('RegCtrl', ['$rootScope', '$mdDialog', '$scope', 'Auth', 'User',
function($rootScope, $mdDialog, $scope, Auth, User) {
  var vm = this;
  vm.user = Auth.getUser();
  vm.userData = {}

  vm.defaultUserData = {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  };

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
    angular.copy(vm.defaultUserData, vm.userData);
    vm.userData.isTeacher = false;
    vm.show();
  };

  vm.openTeacher = function(ev) {
    angular.copy(vm.defaultUserData, vm.userData);
    vm.userData.isTeacher = true;
    vm.show();
  };

  vm.submit = () => {
    User.get(vm.userData.username).then((success) => {
      if (!success) {
        Auth.register(vm.userData).then((success) => {
          $rootScope.$broadcast('userLoggedIn');
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

app.controller('LoginCtrl', ['$state', 'Auth', 'User', '$rootScope',
function($state, Auth, User, $rootScope) {
  var vm = this;
  vm.user = Auth.getUser();

  vm.userData = {
    username: '',
    password: ''
  }

  vm.submit = () => {
    Auth.login(vm.userData).then(function (success) {
      let user = success.data.user;
      Auth.setUser(user);
      $rootScope.$broadcast('userLoggedIn');
      if (user.isTeacher) $state.go('home.teacher');
      else $state.go('home.student');
    }, function(error) {
      alert('Invalid Login');
    });
  }

  vm.cancel = () => {
    $state.go('home');
  };

}]);